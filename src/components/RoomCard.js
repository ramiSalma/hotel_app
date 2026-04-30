import React from "react";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";
import { formatMoney, getRoomImage } from "../utils/rooms";

const styles = StyleSheet.create({
  roomCard: {
    ...shadows.soft,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    marginBottom: 18,
    overflow: "hidden"
  },
  roomImage: {
    height: 186,
    width: "100%"
  },
  roomBody: {
    padding: 18
  },
  roomTitleRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  roomName: {
    color: colors.text,
    flex: 1,
    fontSize: 18,
    fontWeight: "900"
  },
  statusPill: {
    backgroundColor: colors.amberSoft,
    borderColor: colors.gold,
    borderRadius: 999,
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  statusPillMuted: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border
  },
  statusText: {
    color: colors.burgundy,
    fontSize: 12,
    fontWeight: "900"
  },
  statusTextMuted: {
    color: colors.muted
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
  roomMetaText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  roomPrice: {
    color: colors.burgundy,
    fontSize: 16,
    fontWeight: "900",
    marginLeft: "auto"
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.burgundy,
    borderColor: colors.gold,
    borderRadius: radii.md,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 15,
    fontWeight: "900"
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: radii.md,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 14
  },
  secondaryButtonText: {
    color: colors.gold,
    fontSize: 15,
    fontWeight: "900"
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    opacity: 0.75
  }
});

export default function RoomCard({ room, onDetails, onReserve }) {
  return (
    <Pressable onPress={onDetails} style={styles.roomCard}>
      <Image source={{ uri: getRoomImage(room) }} style={styles.roomImage} />

      <View style={styles.roomBody}>
        <View style={styles.roomTitleRow}>
          <Text style={styles.roomName}>{room.name}</Text>

          <View style={[styles.statusPill, !room.available && styles.statusPillMuted]}>
            <Text style={[styles.statusText, !room.available && styles.statusTextMuted]}>
              {room.available ? "Open" : "Booked"}
            </Text>
          </View>
        </View>

        <Text numberOfLines={2} style={styles.roomDescription}>
          {room.description}
        </Text>

        <View style={styles.roomMeta}>
          <Text style={styles.roomMetaText}>
            <Ionicons name="people-outline" size={15} color={colors.gold} /> {room.capacity} guests
          </Text>

          <Text style={styles.roomMetaText}>
            <Ionicons name="bed-outline" size={15} color={colors.gold} /> {room.beds}
          </Text>

          <Text style={styles.roomPrice}>{formatMoney(room.price)}</Text>
        </View>

        <View style={styles.cardActions}>
          <Pressable onPress={onDetails} style={styles.secondaryButton}>
            <Ionicons name="eye-outline" size={17} color={colors.gold} />
            <Text style={styles.secondaryButtonText}>Details</Text>
          </Pressable>

          <Pressable
            disabled={!room.available}
            onPress={onReserve}
            style={[styles.primaryButton, !room.available && styles.disabledButton]}
          >
            <Ionicons name="calendar-outline" size={17} color={colors.white} />
            <Text style={styles.primaryButtonText}>Reserve</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}
