import React, { useEffect, useRef } from "react";
import { Animated, ImageBackground, StyleSheet, Text, View, Image, Dimensions } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";
import { FancyButton } from "../components/fancy_button/Fancy_button";
import { logo } from "../images/logo.png";

const { height } = Dimensions.get('window');
const welcomeImage = "https://i.pinimg.com/1200x/12/4e/15/124e15acd8edeeb203d82316e8a19c13.jpg";

export default function WelcomeScreen({ onEnter }) {
  // Animation values
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;
  const screenExitAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // 1. Sequence: Fade in -> Wait 3s -> Slide page up
    Animated.sequence([
      // Initial Entrance
      Animated.parallel([
        Animated.timing(fadeAnim, {
          toValue: 1,
          duration: 1200,
          useNativeDriver: true,
        }),
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 1200,
          useNativeDriver: true,
        }),
      ]),
      // 2. Wait for 3 seconds as requested
      Animated.delay(3000),
      // 3. Auto-exit animation (Slide whole page up)
      Animated.timing(screenExitAnim, {
        toValue: -height,
        duration: 800,
        useNativeDriver: true,
      })
    ]).start(() => {
      // Trigger the parent navigation/state change after animation finishes
      if (onEnter) onEnter();
    });
  }, []);

  return (
    <Animated.View 
      style={[
        styles.screen, 
        { transform: [{ translateY: screenExitAnim }] }
      ]}
    >
      <ImageBackground
        source={{ uri: welcomeImage }}
        style={styles.image}
        imageStyle={styles.imageStyle}
      >
        <View style={styles.shade} />
        <View style={styles.topAccent} />

        <Animated.View
          style={[
            styles.content,
            { opacity: fadeAnim, transform: [{ translateY: slideAnim }] },
          ]}
        >
          <View style={styles.centerAlign}>
            <View style={styles.crest}>
               <Image source={logo} style={styles.logoStyle} />
              {/* <Ionicons name="diamond-outline" size={24} color={colors.gold} /> */}
            </View>

            <Text style={styles.eyebrow}>Est. 1924 • Luxury Hospitality</Text>
            
            {/* Calligraphic/Serif Title */}
            <Text style={styles.title}>Hestia</Text>
            
            <Text style={styles.tagline}>
              Where timeless elegance meets modern sophistication in the heart of the city.
            </Text>

            <View style={styles.buttonWrapper}>
              <FancyButton text="discover" onPress={onEnter} />
            </View>
          </View>
        </Animated.View>
      </ImageBackground>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#000",
    zIndex: 100,
  },
  image: {
    flex: 1,
    justifyContent: "flex-end",
  },
  imageStyle: {
    opacity: 0.75,
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  topAccent: {
    backgroundColor: colors.gold,
    height: 1,
    left: 40,
    right: 40,
    position: "absolute",
    top: 60,
    opacity: 0.6,
  },
  content: {
    paddingBottom: 100,
    paddingHorizontal: 30,
  },
  centerAlign: {
    alignItems: "center",
  },
  crest: {
    alignItems: "center",
    justifyContent: "center",
    borderColor: colors.gold,
    borderRadius: 100,
    borderWidth: 1,
    height: 80,
    width: 80,
    marginBottom: 25,
    backgroundColor: "rgba(0,0,0,0.3)",
  },
  logoStyle: {
    width: 40,
    height: 40,
    // position: 'absolute',
    // opacity: 0.8
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "500",
    letterSpacing: 4,
    marginBottom: 15,
    textTransform: "uppercase",
  },
  title: {
    color: colors.white,
    fontSize: 64, // Increased size for calligraphic impact
    textAlign: "center",
    marginBottom: 15,
    // Using system serif for calligraphic feel. 
    // On iOS 'Times New Roman' or 'Georgia' provide luxury calligraphic vibes.
    fontFamily: 'Georgia', 
    fontStyle: 'italic',
  },
  tagline: {
    color: "rgba(255,255,255,0.8)",
    fontSize: 15,
    lineHeight: 24,
    textAlign: "center",
    marginBottom: 40,
    paddingHorizontal: 20,
    fontFamily: 'Georgia',
  },
  buttonWrapper: {
    width: "100%",
    alignItems: "center",
    marginTop: 10,
  },
});