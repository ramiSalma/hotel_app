import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

import { createReservation, getRooms } from "../api/hotelApi";
import { carServiceOptions, getInitialReservation } from "../constants/reservation";
import { normalizeRoom } from "../utils/rooms";

export default function useHotelReservations(navigationRef) {
  const [rooms, setRooms] = useState([]);
  const [reservationRoom, setReservationRoom] = useState(null);
  const [reservation, setReservation] = useState(getInitialReservation);
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  const availableRooms = useMemo(() => rooms.filter((room) => room.available), [rooms]);
  const featuredRoom = availableRooms[0] || rooms[0];

  const loadRooms = useCallback(async () => {
    try {
      setError("");

      const data = await getRooms();
      const normalizedRooms = data.map(normalizeRoom);

      setRooms(normalizedRooms);
    } catch (err) {
      setRooms([]);
      setError(err.message);
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  }, []);

  useEffect(() => {
    loadRooms();
  }, [loadRooms]);

  const refreshRooms = () => {
    setRefreshing(true);
    loadRooms();
  };

  const openReservation = (room) => {
    setReservationRoom(room);
    setReservation(getInitialReservation());

    if (navigationRef.isReady()) {
      navigationRef.navigate("reservation", { room });
    }
  };

  const closeReservation = () => {
    setReservationRoom(null);
    setSubmitting(false);
  };

  const updateReservation = (key, value) => {
    setReservation((current) => ({
      ...current,
      [key]: value
    }));
  };

  const submitReservation = async () => {
    if (!reservationRoom) return;

    if (
      !reservation.first_name ||
      !reservation.last_name ||
      !reservation.email ||
      !reservation.phone ||
      !reservation.check_in ||
      !reservation.check_out
    ) {
      Alert.alert("Missing details", "Please add your name, email, phone, check-in date, and check-out date.");
      return;
    }

    if (reservation.payment_method === "online") {
      const cardDigits = String(reservation.card_number || "").replace(/\D/g, "");
      const cvvDigits = String(reservation.cvv || "").replace(/\D/g, "");

      if (!reservation.card_holder || cardDigits.length < 12 || !reservation.expiry_date || cvvDigits.length < 3) {
        Alert.alert("Payment details", "Please complete the online payment details before confirming.");
        return;
      }
    }

    const adults = Number(reservation.adults || 1);
    const children = Number(reservation.children || 0);
    const guestCount = Math.max(adults + children, 1);
    const carService = carServiceOptions.find((option) => option.id === reservation.car_service);
    const phone = `${reservation.phone_code || ""} ${reservation.phone || ""}`.trim();
    const carServiceRequest =
      carService && carService.id !== "none"
        ? `Car service: ${carService.title}. Arrival: ${reservation.arrival_time || "not provided"}. Flight: ${reservation.flight_number || "not provided"}.`
        : "Car service: no transfer requested.";
    const specialRequests = [reservation.notes, carServiceRequest].filter(Boolean).join("\n\n");

    const nextTrip = {
      id: `${reservationRoom.id}-${Date.now()}`,
      room: reservationRoom,
      reservation: {
        ...reservation,
        guest_name: `${reservation.first_name} ${reservation.last_name}`.trim(),
        guests: guestCount
      },
      status: "Request sent"
    };

    setSubmitting(true);

    try {
      const result = await createReservation({
        room_id: reservationRoom.id,
        check_in: reservation.check_in,
        check_out: reservation.check_out,
        num_guests: guestCount,
        booking_source: "direct",
        special_requests: specialRequests || null,
        guest: {
          full_name: `${reservation.first_name} ${reservation.last_name}`.trim(),
          first_name: reservation.first_name,
          last_name: reservation.last_name,
          email: reservation.email,
          phone,
          nationality: reservation.nationality
        },
        payment: {
          method: reservation.payment_method,
          transaction_ref:
            reservation.payment_method === "online"
              ? `MOBILE-${Date.now().toString(36).toUpperCase()}`
              : null
        }
      });

      nextTrip.id = result?.reservation?.id || nextTrip.id;
      nextTrip.confirmation = result?.reservation;
      nextTrip.status = result?.reservation?.status || "confirmed";

      setSavedTrips((current) => [nextTrip, ...current]);

      if (navigationRef.isReady()) {
        navigationRef.navigate("trips");
      }

      Alert.alert(
        nextTrip.status,
        "Your reservation request was sent successfully."
      );

      closeReservation();
    } catch (err) {
      Alert.alert("Reservation failed", err.message);
      setSubmitting(false);
    }
  };

  return {
    closeReservation,
    error,
    featuredRoom,
    loading,
    openReservation,
    refreshRooms,
    refreshing,
    reservation,
    reservationRoom,
    rooms,
    savedTrips,
    submitReservation,
    submitting,
    updateReservation
  };
}
