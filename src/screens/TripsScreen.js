import React from "react";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";

const styles = StyleSheet.create({
  centerState: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    gap: 12,
    justifyContent: "center",
    padding: 24
  },
  errorTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  errorText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center"
  },
  primaryButton: {
    ...shadows.gold,
    alignItems: "center",
    backgroundColor: colors.gold,
    borderRadius: radii.lg,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16
  },
  primaryButtonText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "900"
  },
  listContent: {
    paddingBottom: 118,
    paddingHorizontal: 20,
    paddingTop: 18
  },
  tripCard: {
    ...shadows.soft,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16
  },
  tripStatus: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase"
  },
  tripTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  tripDates: {
    color: colors.burgundy,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 8
  },
  tripMeta: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6
  }
});

export default function TripsScreen({ trips, onExplore }) {
  if (!trips.length) {
    return (
      <View style={styles.centerState}>
        <Ionicons name="calendar-clear-outline" size={42} color={colors.gold} />
        <Text style={styles.errorTitle}>No reservations yet</Text>
        <Text style={styles.errorText}>Book a room and your trip details will appear here.</Text>

        <Pressable onPress={onExplore} style={styles.primaryButton}>
          <Ionicons name="bed-outline" size={18} color={colors.black} />
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
            {item.reservation.guest_name ||
              `${item.reservation.first_name || ""} ${item.reservation.last_name || ""}`.trim()} - {item.reservation.guests} guest
            {item.reservation.guests === 1 ? "" : "s"}
          </Text>
        </View>
      )}
    />
  );
}
