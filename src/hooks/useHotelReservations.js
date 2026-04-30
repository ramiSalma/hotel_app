import { useCallback, useEffect, useMemo, useState } from "react";
import { Alert } from "react-native";

import { createReservation, getRooms } from "../api/hotelApi";
import { fallbackRooms } from "../constants/rooms";
import { initialReservation } from "../constants/reservation";
import { normalizeRoom } from "../utils/rooms";

export default function useHotelReservations(navigationRef) {
  const [rooms, setRooms] = useState([]);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [reservationRoom, setReservationRoom] = useState(null);
  const [reservation, setReservation] = useState(initialReservation);
  const [savedTrips, setSavedTrips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [usingFallback, setUsingFallback] = useState(false);

  const normalizedFallbackRooms = useMemo(() => fallbackRooms.map(normalizeRoom), []);
  const visibleRooms = rooms.length ? rooms : normalizedFallbackRooms;
  const availableRooms = visibleRooms.filter((room) => room.available);
  const featuredRoom = availableRooms[0] || visibleRooms[0];

  const bestPrice = visibleRooms.reduce(
    (lowest, room) => Math.min(lowest, Number(room.price || 0)),
    Infinity
  );

  const loadRooms = useCallback(async () => {
    try {
      setError("");

      const data = await getRooms();
      const normalizedRooms = data.map(normalizeRoom);

      setRooms(normalizedRooms);
      setUsingFallback(!normalizedRooms.length);
    } catch (err) {
      setRooms([]);
      setUsingFallback(true);
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
    setReservation(initialReservation);
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

    if (!reservation.guest_name || !reservation.email || !reservation.check_in || !reservation.check_out) {
      Alert.alert("Missing details", "Please add your name, email, check-in date, and check-out date.");
      return;
    }

    const nextTrip = {
      id: `${reservationRoom.id}-${Date.now()}`,
      room: reservationRoom,
      reservation: {
        ...reservation,
        guests: Number(reservation.guests || 1)
      },
      status: usingFallback ? "Saved offline" : "Request sent"
    };

    setSubmitting(true);

    try {
      if (!usingFallback) {
        await createReservation({
          ...nextTrip.reservation,
          room_id: reservationRoom.id
        });
      }

      setSavedTrips((current) => [nextTrip, ...current]);

      if (navigationRef.isReady()) {
        navigationRef.navigate("trips");
      }

      Alert.alert(
        nextTrip.status,
        usingFallback
          ? "The API is offline, so this trip was saved in the app."
          : "Your reservation request was sent successfully."
      );

      closeReservation();
    } catch (err) {
      Alert.alert("Reservation failed", err.message);
      setSubmitting(false);
    }
  };

  return {
    availableCount: availableRooms.length,
    bestPrice: Number.isFinite(bestPrice) ? bestPrice : 0,
    closeReservation,
    error,
    featuredRoom,
    loading,
    openReservation,
    refreshRooms,
    refreshing,
    reservation,
    reservationRoom,
    rooms: visibleRooms,
    savedTrips,
    selectedRoom,
    setSelectedRoom,
    submitReservation,
    submitting,
    updateReservation,
    usingFallback
  };
}
