import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { formatMoney, getRoomImage } from "../utils/rooms";

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
            <Ionicons name="people-outline" size={15} color="#60726b" /> {room.capacity} guests
          </Text>

          <Text style={styles.roomMetaText}>
            <Ionicons name="bed-outline" size={15} color="#60726b" /> {room.beds}
          </Text>

          <Text style={styles.roomPrice}>{formatMoney(room.price)}</Text>
        </View>

        <View style={styles.cardActions}>
          <Pressable onPress={onDetails} style={styles.secondaryButton}>
            <Ionicons name="eye-outline" size={17} color="#1e7667" />
            <Text style={styles.secondaryButtonText}>Details</Text>
          </Pressable>

          <Pressable
            disabled={!room.available}
            onPress={onReserve}
            style={[styles.primaryButton, !room.available && styles.disabledButton]}
          >
            <Ionicons name="calendar-outline" size={17} color="#ffffff" />
            <Text style={styles.primaryButtonText}>Reserve</Text>
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}