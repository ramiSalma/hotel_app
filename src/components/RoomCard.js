import React from "react";
import { Image, Pressable, StyleSheet, Text, View, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { formatMoney, getRoomImage } from "../utils/rooms";

const styles = StyleSheet.create({
  roomCard: {
    backgroundColor: "transparent", // Remove card container for a cleaner look
    marginBottom: 48, // More space between items creates a premium feel
  },
  imageWrapper: {
    position: 'relative',
    overflow: "hidden",
    borderRadius: 2, // Almost sharp corners are more "architectural"
  },
  roomImage: {
    height: 320, // Much taller image to emphasize the "Sanctuary"
    width: "100%",
    backgroundColor: '#F7F7F7',
  },
  imagePlaceholder: {
    alignItems: "center",
    justifyContent: "center"
  },
  availabilityOverlay: {
    position: 'absolute',
    top: 16,
    right: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 1,
  },
  availabilityText: {
    fontSize: 10,
    letterSpacing: 2,
    fontWeight: '600',
    textTransform: 'uppercase',
    color: '#1A1A1A',
  },
  roomBody: {
    paddingTop: 20,
    paddingHorizontal: 4, // Align slightly inward from the image
  },
  categoryText: {
    fontSize: 10,
    letterSpacing: 3,
    color: "#AF944F",
    fontWeight: "600",
    textTransform: "uppercase",
    marginBottom: 8,
  },
  roomTitleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "baseline",
    marginBottom: 12,
  },
  roomName: {
    color: "#1A1A1A",
    fontSize: 26,
    fontWeight: "300",
    fontFamily: Platform.OS === 'ios' ? 'Times New Roman' : 'serif', 
    flex: 1,
  },
  roomPrice: {
    color: "#1A1A1A",
    fontSize: 16,
    fontWeight: "400",
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-Light' : 'sans-serif-light',
  },
  roomDescription: {
    color: "#777",
    fontSize: 15,
    lineHeight: 24,
    fontWeight: "300",
    fontFamily: Platform.OS === 'ios' ? 'Georgia' : 'serif',
    fontStyle: 'italic',
    marginBottom: 24,
  },
  footerActionRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderTopWidth: 0.5,
    borderTopColor: "#EEE",
    paddingTop: 16,
  },
  metaContainer: {
    flexDirection: "row",
    gap: 16,
  },
  metaText: {
    fontSize: 11,
    letterSpacing: 1,
    color: "#999",
    textTransform: "uppercase",
  },
  reserveAction: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  reserveText: {
    fontSize: 12,
    letterSpacing: 1.5,
    fontWeight: "700",
    color: "#1A1A1A",
    textTransform: "uppercase",
  }
});

export default function RoomCard({ room, onDetails, onReserve }) {
  const isAvailable = room.available;
  const roomImage = getRoomImage(room);

  return (
    <View style={styles.roomCard}>
      {/* Image Section */}
      <Pressable onPress={onDetails} style={styles.imageWrapper}>
        {roomImage ? (
          <Image 
            source={{ uri: roomImage }} 
            style={styles.roomImage} 
            resizeMode="cover"
          />
        ) : (
          <View style={[styles.roomImage, styles.imagePlaceholder]}>
            <Ionicons name="image-outline" size={28} color="#AF944F" />
          </View>
        )}
        {!isAvailable && (
          <View style={styles.availabilityOverlay}>
            <Text style={styles.availabilityText}>Fully Booked</Text>
          </View>
        )}
      </Pressable>

      {/* Content Section */}
      <View style={styles.roomBody}>
        <Text style={styles.categoryText}>The Residence</Text>
        
        <View style={styles.roomTitleRow}>
          <Text style={styles.roomName}>{room.name}</Text>
          <Text style={styles.roomPrice}>{formatMoney(room.price)}</Text>
        </View>

        <Text numberOfLines={2} style={styles.roomDescription}>
          "{room.description}"
        </Text>

        <View style={styles.footerActionRow}>
          <View style={styles.metaContainer}>
            <Text style={styles.metaText}>{room.capacity} Guests</Text>
            <Text style={styles.metaText}>|</Text>
            <Text style={styles.metaText}>{room.beds} Beds</Text>
          </View>

          <Pressable 
            onPress={isAvailable ? onReserve : null} 
            style={({pressed}) => [
                styles.reserveAction, 
                { opacity: isAvailable ? (pressed ? 0.5 : 1) : 0.3 }
            ]}
          >
            <Text style={styles.reserveText}>
              {isAvailable ? "Enquire" : "Unavailable"}
            </Text>
            {isAvailable && <Ionicons name="arrow-forward-sharp" size={16} color="#1A1A1A" />}
          </Pressable>
        </View>
      </View>
    </View>
  );
}
