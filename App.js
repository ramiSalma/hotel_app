import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigationContainerRef } from "@react-navigation/native";

import { colors } from "./src/styles/theme";
import useHotelReservations from "./src/hooks/useHotelReservations";
import AppTabs from "./src/navigation/AppTabs";
import WelcomeScreen from "./src/screens/WelcomeScreen";
import RoomDetails from "./src/modals/RoomDetails";
import ReservationModal from "./src/modals/ReservationModal";

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  appFrame: {
    flex: 1,
    backgroundColor: colors.background
  }
});

export default function App() {
  const navigationRef = useNavigationContainerRef();
  const [enteredApp, setEnteredApp] = useState(false);
  const hotel = useHotelReservations(navigationRef);

  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar style={enteredApp ? "dark" : "light"} />

      {!enteredApp ? <WelcomeScreen onEnter={() => setEnteredApp(true)} /> : null}

      {enteredApp ? (
        <View style={styles.appFrame}>
          <AppTabs
            availableCount={hotel.availableCount}
            bestPrice={hotel.bestPrice}
            error={hotel.error}
            featuredRoom={hotel.featuredRoom}
            loading={hotel.loading}
            navigationRef={navigationRef}
            onDetails={hotel.setSelectedRoom}
            onRefresh={hotel.refreshRooms}
            onReserve={hotel.openReservation}
            refreshing={hotel.refreshing}
            rooms={hotel.rooms}
            savedTrips={hotel.savedTrips}
            usingFallback={hotel.usingFallback}
          />
        </View>
      ) : null}

      <RoomDetails
        room={hotel.selectedRoom}
        onClose={() => hotel.setSelectedRoom(null)}
        onReserve={() => {
          hotel.openReservation(hotel.selectedRoom);
          hotel.setSelectedRoom(null);
        }}
      />

      <ReservationModal
        room={hotel.reservationRoom}
        value={hotel.reservation}
        submitting={hotel.submitting}
        onChange={hotel.updateReservation}
        onClose={hotel.closeReservation}
        onSubmit={hotel.submitReservation}
      />
    </SafeAreaView>
  );
}
