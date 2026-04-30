import React, { useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";
import RoomCard from "../components/RoomCard";

const styles = StyleSheet.create({
  searchBox: {
    ...shadows.soft,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.lg,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
    paddingHorizontal: 15
  },
  searchInput: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    minHeight: 50
  },
  filterChip: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.amberSoft,
    borderColor: colors.gold,
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  filterChipActive: {
    backgroundColor: colors.burgundy,
    borderColor: colors.gold
  },
  filterChipText: {
    color: colors.burgundy,
    fontSize: 13,
    fontWeight: "900"
  },
  filterChipTextActive: {
    color: colors.gold
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 4
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  sectionCount: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  listContent: {
    paddingBottom: 118,
    paddingHorizontal: 20,
    paddingTop: 18
  },
  emptyState: {
    ...shadows.soft,
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    gap: 10,
    padding: 28
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  mutedText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center"
  }
});

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
            <Ionicons name="search" size={20} color={colors.gold} />
            <TextInput
              autoCapitalize="none"
              placeholder="Search rooms, beds, amenities"
              placeholderTextColor={colors.placeholder}
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
              color={showAvailableOnly ? colors.gold : colors.burgundy}
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
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor={colors.gold} />
      }
      renderItem={({ item }) => (
        <RoomCard room={item} onDetails={() => onDetails(item)} onReserve={() => onReserve(item)} />
      )}
      ListEmptyComponent={
        <View style={styles.emptyState}>
          <Ionicons name="bed-outline" size={34} color={colors.gold} />
          <Text style={styles.emptyTitle}>No rooms match your search</Text>
          <Text style={styles.mutedText}>
            Try another name, amenity, or turn off the availability filter.
          </Text>
        </View>
      }
    />
  );
}
