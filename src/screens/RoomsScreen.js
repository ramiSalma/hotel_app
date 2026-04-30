import React, { useState } from "react";
import { FlatList, Pressable, RefreshControl, StyleSheet, Text, TextInput, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";
import RoomCard from "../components/RoomCard";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF", // Pure white for a gallery feel
  },
  listContent: {
    paddingHorizontal: 24,
    paddingTop: 40, // Deep top padding for a grand entrance
    paddingBottom: 120,
  },
  headerContainer: {
    marginBottom: 32,
  },
  brandTitle: {
    fontSize: 10,
    letterSpacing: 4,
    fontWeight: "300",
    color: colors.gold || "#AF944F",
    textTransform: "uppercase",
    marginBottom: 8,
    textAlign: "center",
  },
  searchSection: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F9F9F9", // Subtle off-white
    borderRadius: 12,
    paddingHorizontal: 16,
    height: 52,
    marginBottom: 24,
    ...Platform.select({
      ios: { shadowColor: "#000", shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.05, shadowRadius: 8 },
      android: { elevation: 2 },
    }),
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontWeight: "300",
    color: "#1A1A1A",
    letterSpacing: 0.5,
  },
  filterRow: {
    flexDirection: "row",
    justifyContent: "center",
    marginBottom: 40,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "#E5E5E5",
  },
  filterButtonActive: {
    backgroundColor: "#1A1A1A",
    borderColor: "#1A1A1A",
  },
  filterText: {
    fontSize: 12,
    fontWeight: "500",
    color: "#666",
    letterSpacing: 0.5,
  },
  filterTextActive: {
    color: "#FFF",
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "space-between",
    borderBottomWidth: 1,
    borderBottomColor: "#F0F0F0",
    paddingBottom: 12,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: "400", // "Light" font weights look more expensive than bold
    color: "#1A1A1A",
    fontFamily: Platform.OS === 'ios' ? 'Optima' : 'serif', // Use serif if available
  },
  sectionCount: {
    fontSize: 12,
    color: "#999",
    fontWeight: "300",
    marginBottom: 4,
  },
  emptyState: {
    alignItems: "center",
    marginTop: 80,
  },
  emptyText: {
    fontSize: 14,
    color: "#999",
    fontWeight: "300",
    letterSpacing: 0.5,
    marginTop: 12,
  }
});

export default function RoomsScreen({ rooms, refreshing, onRefresh, onDetails, onReserve }) {
  const [query, setQuery] = useState("");
  const [showAvailableOnly, setShowAvailableOnly] = useState(false);

  const filteredRooms = rooms.filter((room) => {
    const matchesQuery = `${room.name} ${room.description}`.toLowerCase().includes(query.toLowerCase());
    return matchesQuery && (!showAvailableOnly || room.available);
  });

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => String(item.id)}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} tintColor="#AF944F" />
        }
        ListHeaderComponent={
          <View style={styles.headerContainer}>
            <Text style={styles.brandTitle}>The Collection</Text>
            
            <View style={styles.searchSection}>
              <Ionicons name="search-outline" size={18} color="#AF944F" />
              <TextInput
                placeholder="Search by destination or amenity"
                placeholderTextColor="#BBB"
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
              />
            </View>

            <View style={styles.filterRow}>
              <Pressable
                onPress={() => setShowAvailableOnly(!showAvailableOnly)}
                style={[styles.filterButton, showAvailableOnly && styles.filterButtonActive]}
              >
                <Text style={[styles.filterText, showAvailableOnly && styles.filterTextActive]}>
                  {showAvailableOnly ? "Showing Available" : "Filter by Availability"}
                </Text>
              </Pressable>
            </View>

            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>Residences</Text>
              <Text style={styles.sectionCount}>{filteredRooms.length} Total</Text>
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <RoomCard room={item} onDetails={() => onDetails(item)} onReserve={() => onReserve(item)} />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            <Ionicons name="ellipsis-horizontal" size={30} color="#E5E5E5" />
            <Text style={styles.emptyText}>No matches found in the collection.</Text>
          </View>
        }
      />
    </View>
  );
}