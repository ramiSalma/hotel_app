import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { colors, radii, shadows } from "../styles/theme";

const menuItems = [
  {
    icon: "home-outline",
    label: "Explore",
    route: "home",
    text: "Return to the hotel experience"
  },
  {
    icon: "bed-outline",
    label: "Suites",
    route: "rooms",
    text: "Browse rooms and residences"
  },
  {
    icon: "calendar-outline",
    label: "Trips",
    route: "trips",
    text: "Review saved reservations"
  },
  {
    icon: "person-outline",
    label: "Account",
    route: "profile",
    text: "Manage guest preferences"
  }
];

const conciergeItems = [
  "Private dining",
  "Spa appointments",
  "Airport transfer",
  "Butler service"
];

export default function MenuScreen({ navigation }) {
  const insets = useSafeAreaInsets();

  const handleNavigation = (route) => {
    if (navigation) {
      navigation.navigate(route);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={[
          styles.content,
          {
            paddingTop: Math.max(insets.top, 24),
            paddingBottom: insets.bottom + 150
          }
        ]}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.crest}>
            <Ionicons name="diamond-outline" size={18} color={colors.gold} />
          </View>

          <Text style={styles.eyebrow}>Royal Atlas Hotel</Text>
          <Text style={styles.title}>Guest Menu</Text>
          <Text style={styles.subtitle}>
            Curated access to suites, stays, and signature services.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Navigate</Text>
          <View style={styles.goldLine} />
        </View>

        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <Pressable
              key={item.route}
              onPress={() => handleNavigation(item.route)}
              style={({ pressed }) => [
                styles.menuRow,
                pressed && styles.rowPressed,
                index === menuItems.length - 1 && styles.lastRow
              ]}
            >
              <View style={styles.iconWrap}>
                <Ionicons name={item.icon} size={18} color={colors.gold} />
              </View>

              <View style={styles.rowText}>
                <Text style={styles.rowTitle}>{item.label}</Text>
                <Text style={styles.rowSubtitle}>{item.text}</Text>
              </View>

              <Ionicons
                name="chevron-forward"
                size={14}
                color={colors.gold}
                style={styles.chevron}
              />
            </Pressable>
          ))}
        </View>

        <View style={styles.conciergeCard}>
          <Text style={styles.conciergeEyebrow}>Concierge</Text>
          <Text style={styles.conciergeTitle}>Need something special?</Text>
          <Text style={styles.conciergeText}>
            Our guest team can arrange elevated details for your stay.
          </Text>

          <View style={styles.pillGrid}>
            {conciergeItems.map((item) => (
              <View key={item} style={styles.pill}>
                <Ionicons name="sparkles-outline" size={11} color={colors.gold} />
                <Text style={styles.pillText}>{item}</Text>
              </View>
            ))}
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white
  },

  screen: {
    flex: 1
  },

  content: {
    paddingHorizontal: 22
  },

  hero: {
    ...shadows.deep,
    backgroundColor: colors.black,
    borderColor: colors.gold,
    borderRadius: radii.xl,
    borderWidth: 1,
    overflow: "hidden",
    padding: 24,
    marginTop: 16
  },

  crest: {
    alignItems: "center",
    backgroundColor: colors.burgundy,
    borderColor: colors.gold,
    borderRadius: 999,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    marginBottom: 16,
    width: 42
  },

  eyebrow: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 3,
    marginBottom: 6,
    textTransform: "uppercase"
  },

  title: {
    color: colors.white,
    fontSize: 30,
    fontWeight: "bold",
    lineHeight: 36
  },

  subtitle: {
    color: colors.ivoryText,
    fontSize: 13,
    fontWeight: "400",
    lineHeight: 19,
    marginTop: 8,
    opacity: 0.9
  },

  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12,
    marginBottom: 14,
    marginTop: 32
  },

  sectionTitle: {
    color: colors.burgundy,
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 2,
    textTransform: "uppercase"
  },

  goldLine: {
    backgroundColor: "rgba(224, 170, 62, 0.2)",
    flex: 1,
    height: 1
  },

  menuCard: {
    ...shadows.soft,
    backgroundColor: colors.surface || colors.white,
    borderColor: colors.border || "#EBEBEB",
    borderRadius: radii.xl,
    borderWidth: 1,
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    paddingHorizontal: 10,
    paddingVertical: 12
  },

  menuRow: {
    alignItems: "center",
    borderColor: colors.border || "#EBEBEB",
    borderRadius: radii.lg,
    borderWidth: 1,
    gap: 8,
    justifyContent: "center",
    marginVertical: 8,
    minHeight: 112,
    paddingHorizontal: 12,
    paddingVertical: 14,
    width: "44%"
  },

  rowPressed: {
    backgroundColor: "rgba(0,0,0,0.025)"
  },

  lastRow: {
    borderBottomWidth: 1
  },

  iconWrap: {
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: radii.md,
    height: 36,
    justifyContent: "center",
    width: 36
  },

  rowText: {
    alignItems: "center"
  },

  rowTitle: {
    color: colors.text,
    fontSize: 15,
    fontWeight: "700",
    textAlign: "center"
  },

  rowSubtitle: {
    color: colors.muted || "#666",
    fontSize: 11,
    lineHeight: 15,
    marginTop: 3,
    textAlign: "center"
  },

  conciergeCard: {
    ...shadows.gold,
    backgroundColor: colors.burgundy,
    borderColor: colors.gold,
    borderRadius: radii.xl,
    borderWidth: 1,
    marginTop: 24,
    padding: 20
  },

  conciergeEyebrow: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: "700",
    letterSpacing: 2.5,
    textTransform: "uppercase"
  },

  conciergeTitle: {
    color: colors.white,
    fontSize: 19,
    fontWeight: "700",
    marginTop: 6
  },

  conciergeText: {
    color: colors.ivoryText,
    fontSize: 13,
    lineHeight: 19,
    marginTop: 6,
    opacity: 0.9
  },

  pillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 16
  },

  pill: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.06)",
    borderColor: "rgba(224, 170, 62, 0.25)",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 12,
    paddingVertical: 6
  },

  pillText: {
    color: colors.white,
    fontSize: 11,
    fontWeight: "600"
  },
  chevron: {
    opacity: 0.45
  }
});
