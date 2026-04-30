import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";

const styles = StyleSheet.create({
  statCard: {
    ...shadows.soft,
    backgroundColor: colors.surface,
    borderColor: colors.borderGoldSoft,
    borderRadius: radii.lg,
    borderWidth: 1,
    flex: 1,
    gap: 6,
    padding: 16
  },
  statValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  statLabel: {
    color: colors.burgundy,
    fontSize: 13,
    fontWeight: "700"
  }
});

export default function StatCard({ label, value, icon }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={21} color={colors.gold} />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}
