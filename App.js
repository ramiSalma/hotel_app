import React, { useCallback, useEffect, useMemo, useState } from "react";
import { ActivityIndicator, Alert, SafeAreaView, Text, View } from "react-native";
import { StatusBar } from "expo-status-bar";

import { API_BASE_URL, createReservation, getRooms } from "./src/api/hotelApi";
import { styles } from "./src/styles/styles";
import { normalizeRoom } from "./src/utils/rooms";

import { fallbackRooms } from "./src/constants/rooms";
import { initialReservation } from "./src/constants/reservation";

import AppHeader from "./src/components/AppHeader";
import BottomNav from "./src/components/BottomNav";

import HomeScreen from "./src/screens/HomeScreen";
import RoomsScreen from "./src/screens/RoomsScreen";
import TripsScreen from "./src/screens/TripsScreen";
import InfoScreen from "./src/screens/InfoScreen";

import RoomDetails from "./src/modals/RoomDetails";
import ReservationModal from "./src/modals/ReservationModal";

export default function App() {
  const [activeRoute, setActiveRoute] = useState("home");
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
      setActiveRoute("trips");

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

  const renderScreen = () => {
    if (loading) {
      return (
        <View style={styles.centerState}>
          <ActivityIndicator color="#1e7667" size="large" />
          <Text style={styles.mutedText}>Loading rooms...</Text>
        </View>
      );
    }

    if (activeRoute === "rooms") {
      return (
        <RoomsScreen
          rooms={visibleRooms}
          refreshing={refreshing}
          onRefresh={refreshRooms}
          onDetails={setSelectedRoom}
          onReserve={openReservation}
        />
      );
    }

    if (activeRoute === "trips") {
      return <TripsScreen trips={savedTrips} onExplore={() => setActiveRoute("rooms")} />;
    }

    if (activeRoute === "info") {
      return (
        <InfoScreen
          apiBaseUrl={API_BASE_URL}
          error={error}
          usingFallback={usingFallback}
          onRefresh={refreshRooms}
        />
      );
    }

    return (
      <HomeScreen
        availableCount={availableRooms.length}
        bestPrice={Number.isFinite(bestPrice) ? bestPrice : 0}
        error={error}
        featuredRoom={featuredRoom}
        rooms={visibleRooms.slice(0, 3)}
        usingFallback={usingFallback}
        onDetails={setSelectedRoom}
        onReserve={openReservation}
        onViewRooms={() => setActiveRoute("rooms")}
      />
    );
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style="dark" />

      <View style={styles.appFrame}>
        <AppHeader activeRoute={activeRoute} onRefresh={refreshRooms} />
        <View style={styles.screen}>{renderScreen()}</View>
        <BottomNav activeRoute={activeRoute} onChange={setActiveRoute} />
      </View>

      <RoomDetails
        room={selectedRoom}
        onClose={() => setSelectedRoom(null)}
        onReserve={() => {
          openReservation(selectedRoom);
          setSelectedRoom(null);
        }}
      />

      <ReservationModal
        room={reservationRoom}
        value={reservation}
        submitting={submitting}
        onChange={(key, value) =>
          setReservation((current) => ({
            ...current,
            [key]: value
          }))
        }
        onClose={closeReservation}
        onSubmit={submitReservation}
      />
    </SafeAreaView>
  );
}