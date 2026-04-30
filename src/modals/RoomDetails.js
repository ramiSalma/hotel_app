import React from "react";
import { Image, Modal, Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";
import { formatMoney, getRoomImage } from "../utils/rooms";

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.62)",
    flex: 1,
    justifyContent: "flex-end"
  },
  detailsSheet: {
    backgroundColor: colors.surface,
    borderColor: colors.gold,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    borderWidth: 1,
    maxHeight: "88%",
    overflow: "hidden"
  },
  detailsImage: {
    height: 270,
    width: "100%"
  },
  sheetContent: {
    padding: 20
  },
  sheetTopRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between"
  },
  sheetTitleBlock: {
    flex: 1
  },
  detailsName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  detailsPrice: {
    color: colors.burgundy,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 4
  },
  detailsDescription: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14
  },
  amenityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18
  },
  amenityPill: {
    alignItems: "center",
    backgroundColor: colors.amberSoft,
    borderColor: colors.gold,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  amenityText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800"
  },
  iconButton: {
    ...shadows.soft,
    alignItems: "center",
    backgroundColor: colors.black,
    borderColor: colors.gold,
    borderRadius: radii.md,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  wideButton: {
    ...shadows.gold,
    alignItems: "center",
    backgroundColor: colors.gold,
    borderRadius: radii.lg,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 16,
    minHeight: 50,
    paddingHorizontal: 16
  },
  primaryButtonText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "900"
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    opacity: 0.75
  }
});

export default function RoomDetails({ room, onClose, onReserve }) {
  if (!room) return null;

  return (
    <Modal animationType="slide" visible transparent onRequestClose={onClose}>
      <View style={styles.modalBackdrop}>
        <View style={styles.detailsSheet}>
          <ScrollView showsVerticalScrollIndicator={false}>
            <Image source={{ uri: getRoomImage(room) }} style={styles.detailsImage} />

            <View style={styles.sheetContent}>
              <View style={styles.sheetTopRow}>
                <View style={styles.sheetTitleBlock}>
                  <Text style={styles.detailsName}>{room.name}</Text>
                  <Text style={styles.detailsPrice}>{formatMoney(room.price)} / night</Text>
                </View>

                <Pressable accessibilityLabel="Close details" onPress={onClose} style={styles.iconButton}>
                  <Ionicons name="close" size={20} color={colors.gold} />
                </Pressable>
              </View>

              <Text style={styles.detailsDescription}>{room.description}</Text>

              <View style={styles.amenityGrid}>
                {room.amenities.map((amenity) => (
                  <View key={amenity} style={styles.amenityPill}>
                    <Ionicons name="checkmark-circle-outline" size={16} color={colors.gold} />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>

              <Pressable
                disabled={!room.available}
                onPress={onReserve}
                style={[styles.wideButton, !room.available && styles.disabledButton]}
              >
                <Ionicons name="calendar" size={18} color={colors.black} />
                <Text style={styles.primaryButtonText}>
                  {room.available ? "Reserve this room" : "Currently booked"}
                </Text>
              </Pressable>
            </View>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}
