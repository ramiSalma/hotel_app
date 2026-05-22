import React, { useState } from "react";
import { SafeAreaView, StyleSheet, View } from "react-native";
import { StatusBar } from "expo-status-bar";
import { useNavigationContainerRef } from "@react-navigation/native";

import { colors } from "./src/styles/theme";
import useHotelReservations from "./src/hooks/useHotelReservations";
import AppTabs from "./src/navigation/AppTabs";
import WelcomeScreen from "./src/screens/WelcomeScreen";

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
            onRefresh={hotel.refreshRooms}
            onReservationChange={hotel.updateReservation}
            onReservationSubmit={hotel.submitReservation}
            onReserve={hotel.openReservation}
            refreshing={hotel.refreshing}
            reservation={hotel.reservation}
            reservationRoom={hotel.reservationRoom}
            rooms={hotel.rooms}
            savedTrips={hotel.savedTrips}
            submitting={hotel.submitting}
            usingFallback={hotel.usingFallback}
          />
        </View>
      ) : null}
    </SafeAreaView>
  );
}
