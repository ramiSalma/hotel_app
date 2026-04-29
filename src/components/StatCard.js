import React from "react";
import { Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";

export default function StatCard({ label, value, icon }) {
  return (
    <View style={styles.statCard}>
      <Ionicons name={icon} size={20} color="#1e7667" />
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}