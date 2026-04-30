import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";
import { formatMoney, getRoomImage } from "../utils/rooms";

const styles = StyleSheet.create({
  compactRoomCard: {
    ...shadows.soft,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
    padding: 12
  },
  compactRoomImage: {
    borderRadius: radii.md,
    height: 92,
    width: 98
  },
  compactRoomBody: {
    flex: 1
  },
  roomName: {
    color: colors.text,
    flex: 1,
    fontSize: 18,
    fontWeight: "900"
  },
  roomDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7
  },
  roomMeta: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12
  },
  roomPrice: {
    color: colors.burgundy,
    fontSize: 16,
    fontWeight: "900",
    marginLeft: "auto"
  },
  miniButton: {
    alignItems: "center",
    backgroundColor: colors.burgundy,
    borderColor: colors.gold,
    borderRadius: radii.md,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 42
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    opacity: 0.75
  }
});

export default function CompactRoomCard({ room, onPress, onReserve }) {
  return (
    <Pressable onPress={onPress} style={styles.compactRoomCard}>
      <Image source={{ uri: getRoomImage(room) }} style={styles.compactRoomImage} />

      <View style={styles.compactRoomBody}>
        <Text style={styles.roomName}>{room.name}</Text>
        <Text numberOfLines={1} style={styles.roomDescription}>
          {room.description}
        </Text>

        <View style={styles.roomMeta}>
          <Text style={styles.roomPrice}>{formatMoney(room.price)}</Text>

          <Pressable
            disabled={!room.available}
            onPress={onReserve}
            style={[styles.miniButton, !room.available && styles.disabledButton]}
          >
            <Ionicons name="calendar-outline" size={15} color={colors.gold} />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
