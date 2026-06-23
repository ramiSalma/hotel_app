import React, { useState, useMemo } from "react";
import { 
  FlatList, 
  Pressable, 
  StyleSheet, 
  Text, 
  TextInput, 
  View, 
  ScrollView, 
  ActivityIndicator,
  RefreshControl
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import RoomCard from "../components/RoomCard";

const ROOM_TYPES = ["all", "single", "double", "suite", "penthouse"];

// default rooms to empty array to prevent the .filter error
export default function RoomsScreen({ rooms = [], error, refreshing, onRefresh, onDetails, onReserve }) {
  const [query, setQuery] = useState("");
  const [selectedType, setSelectedType] = useState("all");

  // SAFETY: Handle case where rooms might be null despite default param
  const data = rooms || [];

  const filteredRooms = useMemo(() => {
    return data.filter((room) => {
      if (!room) return false;
      
      // Safety checks for properties before calling .toLowerCase()
      const roomNum = room.room_number ? String(room.room_number) : "";
      const roomType = room.type ? String(room.type).toLowerCase() : "";
      const searchQuery = query.toLowerCase();

      const matchesQuery = roomNum.includes(searchQuery) || roomType.includes(searchQuery);
      const matchesType = selectedType === "all" || room.type === selectedType;
      
      return matchesQuery && matchesType;
    });
  }, [data, query, selectedType]);

  return (
    <View style={styles.container}>
      <FlatList
        data={filteredRooms}
        keyExtractor={(item) => item.id || Math.random().toString()}
        contentContainerStyle={styles.listContent}
        refreshControl={
          onRefresh ? (
            <RefreshControl refreshing={Boolean(refreshing)} onRefresh={onRefresh} tintColor="#AF944F" />
          ) : undefined
        }
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.header}>
            <Text style={styles.brandTitle}>The Collection</Text>
            <View style={styles.searchBox}>
              <Ionicons name="search-outline" size={16} color="#AF944F" />
              <TextInput
                placeholder="Find your sanctuary..."
                placeholderTextColor="#BBB"
                style={styles.searchInput}
                value={query}
                onChangeText={setQuery}
              />
            </View>
          </View>
        }
        renderItem={({ item }) => (
          <RoomCard 
            room={item} 
            onDetails={() => onDetails?.(item)} 
            onReserve={() => onReserve?.(item)} 
          />
        )}
        ListEmptyComponent={
          <View style={styles.emptyState}>
            {error ? <Ionicons name="cloud-offline-outline" size={34} color="#AF944F" /> : null}
            <Text style={styles.emptyText}>
              {error || "No residences match your criteria."}
            </Text>
            {onRefresh ? (
              <Pressable onPress={onRefresh} style={styles.retryButton}>
                {refreshing ? <ActivityIndicator color="#FFF" /> : <Ionicons name="reload" size={16} color="#FFF" />}
                <Text style={styles.retryText}>{refreshing ? "Loading" : "Retry backend"}</Text>
              </Pressable>
            ) : null}
          </View>
        }
      />
      
      {/* Floating Filter Navigation */}
      <View style={styles.filterWrapper}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.filterScroll}>
          {ROOM_TYPES.map((type) => (
            <Pressable key={type} onPress={() => setSelectedType(type)} style={styles.filterTab}>
              <Text style={[styles.filterTabText, selectedType === type && styles.activeFilterText]}>
                {type}
              </Text>
              {selectedType === type && <View style={styles.activeDot} />}
            </Pressable>
          ))}
        </ScrollView>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  listContent: { paddingHorizontal: 24, paddingTop: 60, paddingBottom: 140 },
  header: { marginBottom: 30 },
  brandTitle: { fontSize: 10, letterSpacing: 6, textAlign: 'center', textTransform: 'uppercase', color: '#AF944F', marginBottom: 32 },
  searchBox: { flexDirection: 'row', alignItems: 'center', borderBottomWidth: 0.5, borderBottomColor: '#EEE', paddingVertical: 12 },
  searchInput: { flex: 1, marginLeft: 12, fontSize: 13, letterSpacing: 1, fontWeight: '300', color: '#1A1A1A' },
  filterWrapper: {
    position: 'absolute',
    bottom: 40,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.98)',
    borderRadius: 40,
    height: 64,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 15,
    elevation: 8,
  },
  filterScroll: { paddingHorizontal: 20, alignItems: 'center' },
  filterTab: { paddingHorizontal: 18, alignItems: 'center' },
  filterTabText: { fontSize: 10, letterSpacing: 2, textTransform: 'uppercase', color: '#AAA' },
  activeFilterText: { color: '#1A1A1A', fontWeight: '700' },
  activeDot: { width: 4, height: 4, borderRadius: 2, backgroundColor: '#AF944F', marginTop: 6 },
  emptyState: { marginTop: 100, alignItems: 'center', paddingHorizontal: 18 },
  emptyText: { color: '#999', letterSpacing: 1.5, fontSize: 11, lineHeight: 18, textAlign: "center", textTransform: 'uppercase' },
  retryButton: {
    alignItems: "center",
    backgroundColor: "#1A1A1A",
    borderRadius: 4,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 18,
    minHeight: 44,
    paddingHorizontal: 18
  },
  retryText: { color: "#FFF", fontSize: 11, fontWeight: "700", letterSpacing: 1.5, textTransform: "uppercase" }
});
