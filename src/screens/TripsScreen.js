import React from "react";
import { FlatList, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";

export default function TripsScreen({ trips, onExplore }) {
  if (!trips.length) {
    return (
      <View style={styles.centerState}>
        <Ionicons name="calendar-clear-outline" size={42} color="#1e7667" />
        <Text style={styles.errorTitle}>No reservations yet</Text>
        <Text style={styles.errorText}>Book a room and your trip details will appear here.</Text>

        <Pressable onPress={onExplore} style={styles.primaryButton}>
          <Ionicons name="bed-outline" size={18} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Browse rooms</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <FlatList
      data={trips}
      keyExtractor={(item) => item.id}
      contentContainerStyle={styles.listContent}
      renderItem={({ item }) => (
        <View style={styles.tripCard}>
          <Text style={styles.tripStatus}>{item.status}</Text>
          <Text style={styles.tripTitle}>{item.room.name}</Text>

          <Text style={styles.tripDates}>
            {item.reservation.check_in} to {item.reservation.check_out}
          </Text>

          <Text style={styles.tripMeta}>
            {item.reservation.guest_name} - {item.reservation.guests} guest
            {item.reservation.guests === 1 ? "" : "s"}
          </Text>
        </View>
      )}
    />
  );
}