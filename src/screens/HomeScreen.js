import React from "react";
import {
  ImageBackground,
  StyleSheet,
  Text,
  View,
  Dimensions,
  Pressable,
  StatusBar,
  ScrollView
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const { width, height } = Dimensions.get("window");

const bookingOptions = [
  {
    key: "stay",
    title: "Book a Stay",
    desc: "Rooms & Private Riads",
    icon: "bed-outline"
  },
  {
    key: "table",
    title: "Book a Table",
    desc: "Culinary Excellence",
    icon: "restaurant-outline"
  },
  {
    key: "spa",
    title: "Wellness Stays",
    desc: "Spa & Hammam",
    icon: "leaf-outline"
  },
  {
    key: "events",
    title: "Signature Occasions",
    desc: "Weddings & Bespoke Events",
    icon: "sparkles-outline"
  }
];

export default function HomeScreen({
  onBookStay,
  onBookTable,
  onBookSpa,
  onEvents
}) {
  const insets = useSafeAreaInsets();

  const handleBookingPress = (key) => {
    if (key === "stay") return onBookStay?.();
    if (key === "table") return onBookTable?.();
    if (key === "spa") return onBookSpa?.();
    if (key === "events") return onEvents?.();
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" translucent backgroundColor="transparent" />

      <ImageBackground
        source={{
          uri: "https://i.pinimg.com/736x/3e/2d/10/3e2d108cfff6369ce50f13fb5a0ade83.jpg"
        }}
        style={styles.heroImage}
        resizeMode="cover"
      >
        {/* Soft atmospheric gradient shielding the artwork */}
        <View style={styles.shade} />
        <View style={styles.vignetteShade} />

        <ScrollView
          contentContainerStyle={[
            styles.content,
            {
              paddingTop: Math.max(insets.top, 24),
              paddingBottom: Math.max(insets.bottom, 24) + 20
            }
          ]}
          showsVerticalScrollIndicator={false}
        >
          {/* Header Branding Row */}
          <View style={styles.headerBranding}>
            <View style={styles.crestLine} />
            <Ionicons name="diamond-outline" size={14} color="#C5A059" style={styles.crestIcon} />
            <View style={styles.crestLine} />
          </View>

          <View style={styles.heroTextContainer}>
            <Text style={styles.eyebrow}>Welcome to Hestia</Text>
            <Text style={styles.mainTitle}>What would you like to reserve?</Text>
            <Text style={styles.subtitle}>
              Choose your luxury experience and continue your tailored reservation.
            </Text>
          </View>

          {/* Upgraded Floating Container Architecture */}
          <View style={styles.bookingPanel}>
            {bookingOptions.map((option, index) => {
              const isLast = index === bookingOptions.length - 1;
              return (
                <Pressable
                  key={option.key}
                  style={({ pressed }) => [
                    styles.bookingOption,
                    pressed && styles.bookingOptionPressed,
                    isLast && styles.lastBookingOption
                  ]}
                  onPress={() => handleBookingPress(option.key)}
                >
                  <View style={styles.bookingIconBox}>
                    <Ionicons name={option.icon} size={20} color="#C5A059" />
                  </View>

                  <View style={styles.bookingTextBox}>
                    <Text style={styles.bookingTitle}>{option.title}</Text>
                    <Text style={styles.bookingDesc}>{option.desc}</Text>
                  </View>

                  <View style={styles.arrowBox}>
                    <Ionicons
                      name="chevron-forward"
                      size={14}
                      color="#C5A059"
                    />
                  </View>
                </Pressable>
              );
            })}
          </View>

          <View style={styles.footerTextBox}>
            <Text style={styles.footerText}>
              Luxury Stays • Fine Dining • Wellness Experiences • Private Events
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0A0A0A"
  },
  heroImage: {
    flex: 1,
    width: width,
    height: height
  },
  shade: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(10, 10, 10, 0.45)"
  },
  vignetteShade: {
    ...StyleSheet.absoluteFillObject,
    // Emulates a rich radial drop gradient down to the inputs
    backgroundColor: "transparent",
    borderBottomWidth: height * 0.65,
    borderBottomColor: "rgba(10, 10, 10, 0.92)",
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0
  },
  content: {
    flexGrow: 1,
    paddingHorizontal: 24,
    justifyContent: "space-between"
  },
  headerBranding: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 16,
    marginBottom: 32,
    opacity: 0.7
  },
  crestLine: {
    flex: 0.15,
    height: 1,
    backgroundColor: "rgba(197, 160, 89, 0.3)"
  },
  crestIcon: {
    paddingHorizontal: 12
  },
  heroTextContainer: {
    marginBottom: 28,
    marginTop: "auto" // Pushes the hero content gracefully down toward the actionable cards
  },
  eyebrow: {
    color: "#C5A059",
    fontSize: 11,
    letterSpacing: 4,
    textTransform: "uppercase",
    marginBottom: 12,
    fontWeight: "700"
  },
  mainTitle: {
    color: "#FFF",
    fontSize: 38,
    lineHeight: 46,
    fontFamily: "Georgia",
    marginBottom: 14,
    letterSpacing: -0.3
  },
  subtitle: {
    color: "rgba(245, 240, 230, 0.75)",
    fontSize: 14,
    lineHeight: 22,
    fontWeight: "400"
  },
  bookingPanel: {
    backgroundColor: "rgba(20, 20, 20, 0.75)",
    backdropFilter: "blur(20px)", // Prepared layout layer for iOS engine extensions
    borderRadius: 16,
    borderWidth: 1,
    borderColor: "rgba(197, 160, 89, 0.22)",
    overflow: "hidden",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 16,
    elevation: 12,
    marginBottom: 24
  },
  bookingOption: {
    minHeight: 80,
    paddingHorizontal: 18,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "rgba(255, 255, 255, 0.05)"
  },
  lastBookingOption: {
    borderBottomWidth: 0
  },
  bookingOptionPressed: {
    backgroundColor: "rgba(197, 160, 89, 0.08)"
  },
  bookingIconBox: {
    width: 40,
    height: 40,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(197, 160, 89, 0.07)",
    borderWidth: 1,
    borderColor: "rgba(197, 160, 89, 0.2)",
    marginRight: 16
  },
  bookingTextBox: {
    flex: 1,
    justifyContent: "center"
  },
  bookingTitle: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "600",
    letterSpacing: 0.2
  },
  bookingDesc: {
    color: "rgba(245, 240, 230, 0.45)",
    fontSize: 12,
    marginTop: 3,
    fontWeight: "500"
  },
  arrowBox: {
    width: 28,
    height: 28,
    borderRadius: 99,
    backgroundColor: "rgba(255, 255, 255, 0.03)",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "rgba(255, 255, 255, 0.04)"
  },
  footerTextBox: {
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 16,
    borderTopWidth: 1,
    borderTopColor: "rgba(255, 255, 255, 0.06)"
  },
  footerText: {
    color: "rgba(197, 160, 89, 0.5)",
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.2,
    textAlign: "center",
    fontWeight: "600"
  }
});