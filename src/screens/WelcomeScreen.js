import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground, Pressable, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";

const welcomeImage =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&w=1400&q=85";

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.black
  },
  image: {
    flex: 1,
    justifyContent: "flex-end"
  },
  imageStyle: {
    opacity: 0.82
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.42)"
  },
  topAccent: {
    backgroundColor: colors.gold,
    height: 3,
    left: 28,
    position: "absolute",
    right: 28,
    top: 22
  },
  content: {
    paddingBottom: 58,
    paddingHorizontal: 28
  },
  crest: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "rgba(56, 1, 22, 0.78)",
    borderColor: colors.gold,
    borderRadius: 999,
    borderWidth: 1,
    height: 58,
    justifyContent: "center",
    marginBottom: 22,
    width: 58
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    marginBottom: 10,
    textTransform: "uppercase"
  },
  title: {
    color: colors.white,
    fontSize: 44,
    fontWeight: "900",
    lineHeight: 48,
    marginBottom: 14
  },
  tagline: {
    color: colors.ivoryText,
    fontSize: 17,
    fontWeight: "600",
    lineHeight: 26,
    marginBottom: 28
  },
  cta: {
    ...shadows.gold,
    alignItems: "center",
    alignSelf: "stretch",
    backgroundColor: colors.gold,
    borderRadius: radii.lg,
    flexDirection: "row",
    gap: 10,
    justifyContent: "center",
    minHeight: 58,
    paddingHorizontal: 18
  },
  ctaText: {
    color: colors.black,
    fontSize: 16,
    fontWeight: "900"
  }
});

export default function WelcomeScreen({ onEnter }) {
  const opacity = useRef(new Animated.Value(0)).current;
  const translateY = useRef(new Animated.Value(28)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(opacity, {
        toValue: 1,
        duration: 850,
        useNativeDriver: true
      }),
      Animated.timing(translateY, {
        toValue: 0,
        duration: 850,
        useNativeDriver: true
      })
    ]).start();
  }, [opacity, translateY]);

  return (
    <View style={styles.screen}>
      <ImageBackground source={{ uri: welcomeImage }} style={styles.image} imageStyle={styles.imageStyle}>
        <View style={styles.shade} />
        <View style={styles.topAccent} />

        <Animated.View style={[styles.content, { opacity, transform: [{ translateY }] }]}>
          <View style={styles.crest}>
            <Ionicons name="diamond" size={25} color={colors.gold} />
          </View>

          <Text style={styles.eyebrow}>Luxury hospitality</Text>
          <Text style={styles.title}>Royal Atlas Hotel</Text>
          <Text style={styles.tagline}>Experience elegance, comfort, and unforgettable stays.</Text>

          <Pressable onPress={onEnter} style={styles.cta}>
            <Text style={styles.ctaText}>Explore Rooms</Text>
            <Ionicons name="arrow-forward" size={20} color={colors.black} />
          </Pressable>
        </Animated.View>
      </ImageBackground>
    </View>
  );
}
