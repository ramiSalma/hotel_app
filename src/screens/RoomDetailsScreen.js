import React from "react";
import { Image, Pressable, ScrollView, StyleSheet, Text, View, Platform, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatMoney } from "../utils/rooms";

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },
  headerContainer: {
    position: 'relative',
    height: SCREEN_HEIGHT * 0.45,
  },
  detailsImage: {
    ...StyleSheet.absoluteFillObject,
    width: "100%",
  },
  imageOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.15)",
  },
  backButton: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.9)",
    borderRadius: 100,
    height: 48,
    justifyContent: "center",
    left: 20,
    position: "absolute",
    top: 60,
    width: 48,
  },
  content: {
    backgroundColor: "#FFFFFF",
    borderTopLeftRadius: 32,
    borderTopRightRadius: 32,
    marginTop: -32, // Overlaps the image for an integrated look
    paddingHorizontal: 28,
    paddingTop: 40,
    paddingBottom: 140,
  },
  eyebrow: {
    color: "#AF944F",
    fontSize: 10,
    fontWeight: "600",
    letterSpacing: 4,
    marginBottom: 12,
    textTransform: "uppercase",
  },
  detailsName: {
    color: "#1A1A1A",
    fontSize: 34,
    fontWeight: "300",
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif',
    lineHeight: 40,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'baseline',
    marginTop: 12,
    borderBottomWidth: 0.5,
    borderBottomColor: '#EEE',
    paddingBottom: 24,
  },
  detailsPrice: {
    color: "#1A1A1A",
    fontSize: 22,
    fontWeight: "500",
  },
  priceSub: {
    color: "#999",
    fontSize: 14,
    marginLeft: 4,
    fontWeight: "300",
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#1A1A1A",
    textTransform: "uppercase",
    marginTop: 32,
    marginBottom: 16,
  },
  detailsDescription: {
    color: "#555",
    fontSize: 16,
    lineHeight: 28,
    fontWeight: "300",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
  },
  amenityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    marginTop: 8,
  },
  amenityItem: {
    width: '50%', // Two column grid
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  amenityText: {
    color: "#666",
    fontSize: 14,
    marginLeft: 10,
    fontWeight: "400",
  },
  floatingFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 28,
    paddingTop: 20,
    paddingBottom: Platform.OS === 'ios' ? 40 : 24,
    borderTopWidth: 0.5,
    borderTopColor: '#EEE',
  },
  reserveButton: {
    backgroundColor: "#1A1A1A",
    borderRadius: 4,
    height: 60,
    alignItems: "center",
    justifyContent: "center",
  },
  reserveText: {
    color: "#FFFFFF",
    fontSize: 13,
    fontWeight: "600",
    letterSpacing: 2,
    textTransform: "uppercase",
  },
  disabledButton: {
    backgroundColor: "#F5F5F5",
  },
  disabledText: {
    color: "#BBB",
  }
});

export default function RoomDetailsScreen({ navigation, route, onReserve }) {
  const room = route.params?.room;

  if (!room) return null;

  const handleReserve = () => {
    onReserve(room);
    navigation.goBack();
  };

  const isAvailable = room.status === "available" || room.available;

  return (
    <View style={styles.screen}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Header Section */}
        <View style={styles.headerContainer}>
          <Image source={{ uri: room.images?.[0] }} style={styles.detailsImage} />
          <View style={styles.imageOverlay} />
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={24} color="#1A1A1A" />
          </Pressable>
        </View>

        {/* Content Section */}
        <View style={styles.content}>
          <Text style={styles.eyebrow}>Private Residence</Text>
          <Text style={styles.detailsName}>Residence {room.room_number || room.name}</Text>
          
          <View style={styles.priceRow}>
            <Text style={styles.detailsPrice}>{formatMoney(room.base_price || room.price)}</Text>
            <Text style={styles.priceSub}>per night</Text>
          </View>

          <Text style={styles.sectionTitle}>The Experience</Text>
          <Text style={styles.detailsDescription}>{room.description}</Text>

          <Text style={styles.sectionTitle}>Amenities</Text>
          <View style={styles.amenityGrid}>
            {room.amenities.map((amenity) => (
              <View key={amenity} style={styles.amenityItem}>
                <Ionicons name="radio-button-on-outline" size={14} color="#AF944F" />
                <Text style={styles.amenityText}>
                    {amenity.replace('_', ' ').replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Floating Action Bar */}
      <View style={styles.floatingFooter}>
        <Pressable
          disabled={!isAvailable}
          onPress={handleReserve}
          style={[styles.reserveButton, !isAvailable && styles.disabledButton]}
        >
          <Text style={[styles.reserveText, !isAvailable && styles.disabledText]}>
            {isAvailable ? "Request Reservation" : "Currently Unavailable"}
          </Text>
        </Pressable>
      </View>
    </View>
  );
}