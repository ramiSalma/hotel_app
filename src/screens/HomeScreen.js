import React from "react";
import { Image, Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { formatMoney, getRoomImage } from "../utils/rooms";
import StatCard from "../components/StatCard";
import CompactRoomCard from "../components/CompactRoomCard";

export default function HomeScreen({
  availableCount,
  bestPrice,
  error,
  featuredRoom,
  rooms,
  usingFallback,
  onDetails,
  onReserve,
  onViewRooms
}) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      {usingFallback ? (
        <View style={styles.notice}>
          <Ionicons name="cloud-offline-outline" size={20} color="#8f4d2d" />
          <Text style={styles.noticeText}>
            Showing sample rooms while the API connection is unavailable.
          </Text>
        </View>
      ) : null}

      {featuredRoom ? (
        <Pressable onPress={() => onDetails(featuredRoom)} style={styles.hero}>
          <Image source={{ uri: getRoomImage(featuredRoom) }} style={styles.heroImage} />
          <View style={styles.heroShade} />

          <View style={styles.heroOverlay}>
            <Text style={styles.heroLabel}>Featured stay</Text>
            <Text style={styles.heroTitle}>{featuredRoom.name}</Text>
            <Text style={styles.heroPrice}>{formatMoney(featuredRoom.price)} / night</Text>

            <Pressable
              disabled={!featuredRoom.available}
              onPress={() => onReserve(featuredRoom)}
              style={styles.heroButton}
            >
              <Ionicons name="calendar" size={18} color="#ffffff" />
              <Text style={styles.primaryButtonText}>Reserve</Text>
            </Pressable>
          </View>
        </Pressable>
      ) : null}

      <View style={styles.statsRow}>
        <StatCard label="Available" value={availableCount} icon="checkmark-circle-outline" />
        <StatCard label="From" value={formatMoney(bestPrice)} icon="pricetag-outline" />
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Popular rooms</Text>
        <Pressable onPress={onViewRooms}>
          <Text style={styles.linkText}>View all</Text>
        </Pressable>
      </View>

      {error ? <Text style={styles.compactError}>{error}</Text> : null}

      {rooms.map((room) => (
        <CompactRoomCard
          key={room.id}
          room={room}
          onPress={() => onDetails(room)}
          onReserve={() => onReserve(room)}
        />
      ))}
    </ScrollView>
  );
}