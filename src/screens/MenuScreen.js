import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
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
  return (
    <ScrollView style={styles.screen} contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
      <View style={styles.hero}>
        <View style={styles.crest}>
          <Ionicons name="diamond" size={24} color={colors.gold} />
        </View>
        <Text style={styles.eyebrow}>Royal Atlas Hotel</Text>
        <Text style={styles.title}>Guest Menu</Text>
        <Text style={styles.subtitle}>Curated access to suites, stays, and signature services.</Text>
      </View>

      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Navigate</Text>
        <View style={styles.goldLine} />
      </View>

      <View style={styles.menuCard}>
        {menuItems.map((item, index) => (
          <Pressable
            key={item.route}
            onPress={() => navigation.navigate(item.route)}
            style={[styles.menuRow, index === menuItems.length - 1 && styles.lastRow]}
          >
            <View style={styles.iconWrap}>
              <Ionicons name={item.icon} size={20} color={colors.gold} />
            </View>
            <View style={styles.rowText}>
              <Text style={styles.rowTitle}>{item.label}</Text>
              <Text style={styles.rowSubtitle}>{item.text}</Text>
            </View>
            <Ionicons name="chevron-forward" size={18} color={colors.mutedGold} />
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
              <Ionicons name="sparkles-outline" size={14} color={colors.gold} />
              <Text style={styles.pillText}>{item}</Text>
            </View>
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: colors.white
  },
  content: {
    paddingBottom: 130,
    paddingHorizontal: 22,
    paddingTop: 58
  },
  hero: {
    ...shadows.deep,
    backgroundColor: colors.black,
    borderColor: colors.gold,
    borderRadius: radii.xl,
    borderWidth: 1,
    overflow: "hidden",
    padding: 24
  },
  crest: {
    alignItems: "center",
    backgroundColor: colors.burgundy,
    borderColor: colors.gold,
    borderRadius: 999,
    borderWidth: 1,
    height: 54,
    justifyContent: "center",
    marginBottom: 22,
    width: 54
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2.6,
    marginBottom: 8,
    textTransform: "uppercase"
  },
  title: {
    color: colors.white,
    fontSize: 38,
    fontWeight: "900",
    lineHeight: 44
  },
  subtitle: {
    color: colors.ivoryText,
    fontSize: 15,
    fontWeight: "600",
    lineHeight: 23,
    marginTop: 12
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 14,
    marginBottom: 14,
    marginTop: 28
  },
  sectionTitle: {
    color: colors.burgundy,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  goldLine: {
    backgroundColor: colors.borderGoldSoft,
    flex: 1,
    height: 1
  },
  menuCard: {
    ...shadows.soft,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    overflow: "hidden"
  },
  menuRow: {
    alignItems: "center",
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    flexDirection: "row",
    gap: 14,
    minHeight: 76,
    paddingHorizontal: 16,
    paddingVertical: 14
  },
  lastRow: {
    borderBottomWidth: 0
  },
  iconWrap: {
    alignItems: "center",
    backgroundColor: colors.black,
    borderRadius: radii.md,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  rowText: {
    flex: 1
  },
  rowTitle: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900"
  },
  rowSubtitle: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "600",
    lineHeight: 18,
    marginTop: 3
  },
  conciergeCard: {
    ...shadows.gold,
    backgroundColor: colors.burgundy,
    borderColor: colors.gold,
    borderRadius: radii.xl,
    borderWidth: 1,
    marginTop: 22,
    padding: 22
  },
  conciergeEyebrow: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  conciergeTitle: {
    color: colors.white,
    fontSize: 23,
    fontWeight: "900",
    marginTop: 8
  },
  conciergeText: {
    color: colors.ivoryText,
    fontSize: 14,
    fontWeight: "600",
    lineHeight: 22,
    marginTop: 8
  },
  pillGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18
  },
  pill: {
    alignItems: "center",
    backgroundColor: "rgba(255, 255, 255, 0.08)",
    borderColor: "rgba(224, 170, 62, 0.55)",
    borderRadius: 999,
    borderWidth: 1,
    flexDirection: "row",
    gap: 6,
    paddingHorizontal: 11,
    paddingVertical: 8
  },
  pillText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "800"
  }
});
