import React, { useRef } from "react";
import { Animated, Pressable, StyleSheet, Text, View } from "react-native";

export const FancyButton = ({ text, onPress }) => {
  // Animation values for the "hover/press" effect
  const animatedValue = useRef(new Animated.Value(0)).current;

  const handlePressIn = () => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 300,
      useNativeDriver: false, // Color and shadow animations don't support native driver
    }).start();
  };

  const handlePressOut = () => {
    Animated.timing(animatedValue, {
      toValue: 0,
      duration: 300,
      useNativeDriver: false,
    }).start();
  };

  // Interpolations for luxury effects
  const backgroundColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["transparent", "#E0AA3E"],
  });

  const textColor = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: ["#E0AA3E", "#000000"],
  });

  const shadowOpacity = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.8],
  });

  return (
    <View style={styles.container}>
      <Pressable
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        onPress={onPress}
      >
        <Animated.View
          style={[
            styles.fancyBtn,
            {
              backgroundColor,
              shadowOpacity,
              shadowColor: "#E0AA3E",
            },
          ]}
        >
          {/* Top-Right Decorative Square (CSS i::before) */}
          <Animated.View 
            style={[
              styles.cornerSquare, 
              styles.topRight,
              { borderColor: "#E0AA3E" }
            ]} 
          />

          <Animated.Text style={[styles.btnText, { color: textColor }]}>
            {text}
          </Animated.Text>

          {/* Bottom-Left Decorative Square (CSS i::after) */}
          <Animated.View 
            style={[
              styles.cornerSquare, 
              styles.bottomLeft,
              { borderColor: "#E0AA3E" }
            ]} 
          />
        </Animated.View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 20,
  },
  fancyBtn: {
    position: "relative",
    width: 190,
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: "#E0AA3E",
    alignItems: "center",
    justifyContent: "center",
    // iOS Shadow for the "glow" effect
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    // Android Shadow
    elevation: 5,
  },
  btnText: {
    fontSize: 16,
    fontWeight: "700",
    textTransform: "uppercase",
    letterSpacing: 1.5,
    zIndex: 2,
  },
  cornerSquare: {
    position: "absolute",
    width: 10,
    height: 10,
    borderWidth: 2,
    backgroundColor: "transparent",
    zIndex: 1,
  },
  topRight: {
    top: -6,
    right: -6,
  },
  bottomLeft: {
    bottom: -6,
    left: -6,
  },
});