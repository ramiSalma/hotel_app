import React, { useState } from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
  Pressable,
  StatusBar
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

const { width, height } = Dimensions.get("window");

export default function HomeScreen({ rooms = [], onDetails }) {
  const [activeTab, setActiveTab] = useState("Suites");
  const categories = ["Suites", "Deluxe", "Penthouses", "Executive"];

  const renderRoom = ({ item }) => (
    <Pressable style={styles.card} onPress={() => onDetails(item)}>
      <ImageBackground 
        source={{ uri: item.image }} 
        style={styles.cardImage}
        imageStyle={{ borderRadius: 2 }}
      >
        <View style={styles.cardOverlay} />
        <View style={styles.cardContent}>
          <View style={styles.ratingRow}>
            {[1, 2, 3, 4, 5].map((s) => (
              <Ionicons key={s} name="star" size={10} color="#C5A059" />
            ))}
          </View>
          <Text style={styles.cardTitle}>{item.name}</Text>
          <Text style={styles.cardPrice}>${item.price} <Text style={styles.perNight}>/ NIGHT</Text></Text>
        </View>
        <View style={styles.favIcon}>
          <Ionicons name="heart-outline" size={18} color="white" />
        </View>
      </ImageBackground>
    </Pressable>
  );

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      
      {/* Background stays static or scrolls with ListHeader */}
      <FlatList
        data={rooms}
        renderItem={renderRoom}
        keyExtractor={(item) => item.id.toString()}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View style={styles.headerWrapper}>
            {/* Full Width Luxury Hero */}
            <ImageBackground
              source={{ uri: "https://i.pinimg.com/736x/3e/2d/10/3e2d108cfff6369ce50f13fb5a0ade83.jpg" }}
              style={styles.heroImage}
            >
              <View style={styles.shade} />
              
              {/* Minimalist Glass Search */}
              <View style={styles.searchBar}>
                <Ionicons name="search-outline" size={18} color="rgba(255,255,255,0.6)" />
                <TextInput 
                  placeholder="FIND YOUR SANCTUARY" 
                  placeholderTextColor="rgba(255,255,255,0.5)"
                  style={styles.searchInput}
                />
              </View>

              <View style={styles.heroTextContainer}>
                <Text style={styles.eyebrow}>Exclusive Residences</Text>
                <Text style={styles.mainTitle}>The Hestia Experience</Text>
                
                {/* Horizontal Category Selector */}
                <View style={styles.categoryScroll}>
                  {categories.map((cat) => (
                    <Pressable 
                      key={cat} 
                      onPress={() => setActiveTab(cat)}
                      style={[styles.catItem, activeTab === cat && styles.activeCatItem]}
                    >
                      <Text style={[styles.catText, activeTab === cat && styles.activeCatText]}>
                        {cat}
                      </Text>
                    </Pressable>
                  ))}
                </View>
              </View>
            </ImageBackground>
          </View>
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
  },
  headerWrapper: {
    width: width,
    height: height * 0.65, // Takes up more than half the screen
  },
  heroImage: {
    flex: 1,
    width: width,
    justifyContent: "space-between",
    paddingBottom: 30,
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  searchBar: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(255,255,255,0.1)",
    marginHorizontal: 20,
    marginTop: 60,
    paddingHorizontal: 15,
    height: 45,
    borderRadius: 2,
    borderWidth: 0.5,
    borderColor: "rgba(255,255,255,0.2)",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: "#FFF",
    fontSize: 12,
    letterSpacing: 2,
  },
  heroTextContainer: {
    paddingHorizontal: 25,
  },
  eyebrow: {
    color: "#C5A059",
    fontSize: 10,
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 8,
    fontWeight: "700",
  },
  mainTitle: {
    color: "#FFF",
    fontSize: 42,
    fontFamily: "Georgia",
    fontStyle: "italic",
    marginBottom: 25,
  },
  categoryScroll: {
    flexDirection: "row",
    marginTop: 10,
  },
  catItem: {
    marginRight: 25,
    paddingBottom: 5,
  },
  activeCatItem: {
    borderBottomWidth: 1,
    borderBottomColor: "#C5A059",
  },
  catText: {
    color: "rgba(255,255,255,0.5)",
    fontSize: 12,
    fontWeight: "600",
    letterSpacing: 1.5,
    textTransform: "uppercase",
  },
  activeCatText: {
    color: "#FFF",
  },
  // --- Room Cards ---
  card: {
    width: width,
    height: 300,
    marginBottom: 2, // Fine line separation
  },
  cardImage: {
    flex: 1,
    justifyContent: "flex-end",
    padding: 25,
  },
  cardOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  cardContent: {
    zIndex: 2,
  },
  ratingRow: {
    flexDirection: "row",
    gap: 2,
    marginBottom: 8,
  },
  cardTitle: {
    color: "#FFF",
    fontFamily: "Georgia",
    fontSize: 24,
    marginBottom: 5,
  },
  cardPrice: {
    color: "#C5A059",
    fontSize: 14,
    fontWeight: "700",
  },
  perNight: {
    fontSize: 10,
    color: "rgba(255,255,255,0.6)",
    letterSpacing: 1,
  },
  favIcon: {
    position: "absolute",
    top: 20,
    right: 20,
  }
});