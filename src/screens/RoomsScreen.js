import React, { useState } from "react";
import { FlatList, Pressable, RefreshControl, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import RoomCard from "../components/RoomCard";

export default function RoomsScreen({ rooms, refreshing, onRefresh, onDetails, onReserve }) {
  const [query, setQuery] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredRooms = rooms.filter((room) => {
    const matchesQuery = `${room.name} ${room.description} ${room.amenities.join(" ")}`
      .toLowerCase()
      .includes(query.toLowerCase());

    return matchesQuery && (!showAvailableOnly || room.available);
  });

  return (
    <FlatList
      data={filteredRooms}
      keyExtractor={(item) => String(item.id)}
      ListHeaderComponent={
        <View>
          <View style={styles.searchBox}>
            <Ionicons name="search" size={20} color="#6a7b76" />
            <TextInput
              autoCapitalize="none"
              placeholder="Search rooms, beds, amenities"
              placeholderTextColor="#8a9893"
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
            />
          </View>

          <Pressable
            onPress={() => setShowAvailableOnly((current) => !current)}
            style={[styles.filterChip, showAvailableOnly && styles.filterChipActive]}
          >
            <Ionicons
              name={showAvailableOnly ? "checkbox" : "square-outline"}
              size={18}
              color={showAvailableOnly ? "#ffffff" : "#1e7667"}
            />
            <Text style={[styles.filterChipText, showAvailableOnly && styles.filterChipTextActive]}>
              Available rooms only
            </Text>
          </Pressable>

          <View style={styles.sectionHeader}>
            <Text style={styles.sectionTitle}>Rooms</Text>
            <Text style={styles.sectionCount}>{filteredRooms.length} options</Text>
          </View>
        </View>
      }
      contentContainerStyle={styles.listContent}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#1e7667" />
      }
      renderItem={({ item }) => (
        <RoomCard room={item} onDetails={() => onDetails(item)} onReserve={() => onReserve(item)} />
      )}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="bed-outline" size={34} color="#8a9893" />
          <Text style={styles.emptyTitle}>No rooms match your search</Text>
          <Text style={styles.mutedText}>
            Try another name, amenity, or turn off the availability filter.
          </Text>
        </View>
      }
    />
  );
}