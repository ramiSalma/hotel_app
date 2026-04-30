import React, { useState } from "react";
import {
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  Dimensions,
  FlatList,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

const { width } = Dimensions.get("window");

// Using the warm, luxury palette from your image
const localColors = {
  bgLight: "#F5F0EB", 
  textDark: "#2D2926",
  textMuted: "#7A726A",
  white: "#FFFFFF",
  pillActive: "#EAE2D9", 
  pillInactive: "#DED3C6",
  searchBg: "rgba(255, 255, 255, 0.4)", // Translucent search bar
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: localColors.bgLight,
  },
  // --- Header Section ---
  headerWrapper: {
    width: width,
    height: 400,
    backgroundColor: localColors.bgLight,
  },
  heroImage: {
    width: width,
    height: 380,
    // Creating the curve using a massive border radius at the bottom
    borderBottomRightRadius: width * 0.6,
  },
  searchContainer: {
    position: "absolute",
    top: 60,
    left: 20,
    right: 20,
    zIndex: 10,
  },
  searchBar: {
    height: 50,
    backgroundColor: localColors.searchBg,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.3)",
  },
  searchInput: {
    flex: 1,
    marginLeft: 10,
    color: localColors.white,
    fontSize: 16,
    fontWeight: "500",
  },
  // --- Content Section ---
  title: {
    fontSize: 26,
    fontWeight: "700",
    color: localColors.textDark,
    paddingHorizontal: 20,
    marginTop: -10, // Pulls text up slightly toward the curve
    marginBottom: 15,
  },
  categoryList: {
    paddingLeft: 20,
    marginBottom: 25,
  },
  pill: {
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 25,
    marginRight: 12,
    flexDirection: 'row',
    alignItems: 'center'
  },
  pillActive: {
    backgroundColor: localColors.pillActive,
  },
  pillInactive: {
    backgroundColor: localColors.pillInactive,
  },
  pillText: {
    fontWeight: "600",
    fontSize: 14,
    color: localColors.textDark,
  },
  dot: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: "#E63946",
    marginLeft: 4,
    position: 'absolute',
    top: 10,
    right: 15
  },
  // --- Product Grid ---
  grid: {
    paddingHorizontal: 15,
  },
  card: {
    flex: 1,
    margin: 8,
    backgroundColor: localColors.white,
    borderRadius: 20,
    padding: 10,
    // Soft luxury shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 15,
    backgroundColor: "#EEE",
  },
  heartIcon: {
    position: "absolute",
    top: 15,
    right: 15,
    backgroundColor: "rgba(255,255,255,0.8)",
    padding: 6,
    borderRadius: 15,
  },
  cardName: {
    fontSize: 14,
    fontWeight: "600",
    color: localColors.textDark,
    marginTop: 10,
  },
  cardPrice: {
    fontSize: 15,
    fontWeight: "700",
    color: localColors.textDark,
    marginTop: 4,
  }
});

export default function HomeScreen({ rooms = [] }) {
  const [category, setCategory] = useState("Bedroom");
  
  // The image link you provided
  const heroImage = "https://i.pinimg.com/736x/3e/2d/10/3e2d108cfff6369ce50f13fb5a0ade83.jpg";

  const categories = ["Bedroom", "Living Room", "Kitchen"];

  const renderProduct = ({ item }) => (
    <View style={styles.card}>
      <Image source={{ uri: item.image || 'https://via.placeholder.com/150' }} style={styles.cardImage} />
      <View style={styles.heartIcon}>
        <Ionicons name="heart" size={16} color="black" />
      </View>
      <Text style={styles.cardName} numberOfLines={1}>{item.name}</Text>
      <Text style={styles.cardPrice}>$ {item.price}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      {/* Search Header */}
      <View style={styles.searchContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color="white" />
          <TextInput 
            placeholder="Search" 
            placeholderTextColor="white" 
            style={styles.searchInput} 
          />
        </View>
      </View>

      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.headerWrapper}>
              <Image source={{ uri: heroImage }} style={styles.heroImage} />
            </View>
            
            <Text style={styles.title}>Home Decor</Text>

            <ScrollView 
              horizontal 
              showsHorizontalScrollIndicator={false} 
              style={styles.categoryList}
            >
              {categories.map((cat) => (
                <Pressable 
                  key={cat} 
                  onPress={() => setCategory(cat)}
                  style={[styles.pill, category === cat ? styles.pillActive : styles.pillInactive]}
                >
                  <Text style={styles.pillText}>{cat}</Text>
                  {cat === "Kitchen" && <View style={styles.dot} />}
                </Pressable>
              ))}
            </ScrollView>
          </>
        }
        data={rooms}
        renderItem={renderProduct}
        keyExtractor={(item) => item.id.toString()}
        numColumns={2}
        contentContainerStyle={styles.grid}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}