import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { formatMoney, getRoomImage } from "../utils/rooms";

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
            <Ionicons name="calendar-outline" size={15} color="#ffffff" />
          </Pressable>
        </View>
      </View>
    </Pressable>
  );
}