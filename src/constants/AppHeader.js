import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";

export default function AppHeader({ activeRoute, onRefresh }) {
  const titles = {
    home: ["Hotel booking", "Choose your stay"],
    rooms: ["Available rooms", "Browse stays"],
    trips: ["Reservations", "Your trips"],
    info: ["Connection", "App info"]
  };

  const [eyebrow, title] = titles[activeRoute] || titles.home;

  return (
    <View style={styles.header}>
      <View>
        <Text style={styles.eyebrow}>{eyebrow}</Text>
        <Text style={styles.title}>{title}</Text>
      </View>

      <Pressable accessibilityLabel="Refresh rooms" onPress={onRefresh} style={styles.iconButton}>
        <Ionicons name="refresh" size={20} color="#213f39" />
      </Pressable>
    </View>
  );
}