import React from "react";
import { Image, Modal, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { formatMoney, getRoomImage } from "../utils/rooms";

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
                  <Ionicons name="close" size={20} color="#213f39" />
                </Pressable>
              </View>

              <Text style={styles.detailsDescription}>{room.description}</Text>

              <View style={styles.amenityGrid}>
                {room.amenities.map((amenity) => (
                  <View key={amenity} style={styles.amenityPill}>
                    <Ionicons name="checkmark-circle-outline" size={16} color="#1e7667" />
                    <Text style={styles.amenityText}>{amenity}</Text>
                  </View>
                ))}
              </View>

              <Pressable
                disabled={!room.available}
                onPress={onReserve}
                style={[styles.wideButton, !room.available && styles.disabledButton]}
              >
                <Ionicons name="calendar" size={18} color="#ffffff" />
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