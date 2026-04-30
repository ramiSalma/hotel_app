import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

// Luxury colors fallback
const luxuryColors = {
  gold: "#D4AF37",
  black: "#0D0D0D",
  darkGrey: "#1A1A1A",
  white: "#FFFFFF",
  muted: "#707070"
};

const ProfileOption = ({ icon, label, onPress, showBorder = true }) => (
  <TouchableOpacity 
    style={[styles.optionRow, showBorder && styles.borderBottom]} 
    onPress={onPress}
  >
    <View style={styles.optionLeft}>
      <Ionicons name={icon} size={20} color={colors.gold || luxuryColors.gold} />
      <Text style={styles.optionLabel}>{label}</Text>
    </View>
    <Ionicons name="chevron-forward" size={18} color={luxuryColors.muted} />
  </TouchableOpacity>
);

export default function ProfileScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scrollContent}>
        
        {/* Profile Header */}
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <Image 
              source={{ uri: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200' }} 
              style={styles.profileImage}
            />
            <View style={styles.goldBadge}>
              <Ionicons name="checkmark-circle" size={16} color={luxuryColors.black} />
            </View>
          </View>
          <Text style={styles.userName}>JULIAN VANCE</Text>
          <Text style={styles.userTier}>PLATINUM MEMBER</Text>
        </View>

        {/* Stats Section */}
        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>12</Text>
            <Text style={styles.statLabel}>STAYS</Text>
          </View>
          <View style={[styles.statItem, styles.sideBorder]}>
            <Text style={styles.statValue}>4</Text>
            <Text style={styles.statLabel}>AWARDS</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statValue}>2.4k</Text>
            <Text style={styles.statLabel}>POINTS</Text>
          </View>
        </View>

        {/* Menu Options */}
        <View style={styles.menuContainer}>
          <Text style={styles.sectionTitle}>PREFERENCES</Text>
          <ProfileOption icon="person-outline" label="Personal Details" />
          <ProfileOption icon="card-outline" label="Payment Methods" />
          <ProfileOption icon="notifications-outline" label="Notifications" />
          <ProfileOption icon="shield-checkmark-outline" label="Privacy & Security" />
          
          <Text style={[styles.sectionTitle, { marginTop: 30 }]}>SUPPORT</Text>
          <ProfileOption icon="chatbubble-ellipses-outline" label="Concierge Chat" />
          <ProfileOption icon="help-circle-outline" label="FAQs" />
          <ProfileOption icon="log-out-outline" label="Sign Out" showBorder={false} />
        </View>

      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: luxuryColors.black,
  },
  scrollContent: {
    paddingBottom: 120, // Space for the floating bottom tab
    paddingTop: 60,
  },
  header: {
    alignItems: "center",
    marginBottom: 40,
  },
  imageContainer: {
    position: "relative",
    marginBottom: 15,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: luxuryColors.gold,
  },
  goldBadge: {
    position: "absolute",
    bottom: 0,
    right: 0,
    backgroundColor: luxuryColors.gold,
    borderRadius: 12,
    padding: 2,
  },
  userName: {
    color: luxuryColors.white,
    fontSize: 22,
    fontWeight: "900",
    letterSpacing: 2,
  },
  userTier: {
    color: luxuryColors.gold,
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 3,
    marginTop: 5,
  },
  statsContainer: {
    flexDirection: "row",
    backgroundColor: luxuryColors.darkGrey,
    marginHorizontal: 20,
    borderRadius: 20,
    paddingVertical: 20,
    marginBottom: 40,
    borderWidth: 1,
    borderColor: "rgba(212, 175, 55, 0.2)",
  },
  statItem: {
    flex: 1,
    alignItems: "center",
  },
  sideBorder: {
    borderLeftWidth: 1,
    borderRightWidth: 1,
    borderColor: "rgba(112, 112, 112, 0.3)",
  },
  statValue: {
    color: luxuryColors.white,
    fontSize: 18,
    fontWeight: "800",
  },
  statLabel: {
    color: luxuryColors.muted,
    fontSize: 10,
    letterSpacing: 1.5,
    marginTop: 4,
  },
  menuContainer: {
    paddingHorizontal: 25,
  },
  sectionTitle: {
    color: luxuryColors.muted,
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.5,
    marginBottom: 15,
  },
  optionRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 18,
  },
  optionLeft: {
    flexDirection: "row",
    alignItems: "center",
  },
  optionLabel: {
    color: luxuryColors.white,
    fontSize: 15,
    marginLeft: 15,
    fontWeight: "500",
  },
  borderBottom: {
    borderBottomWidth: 1,
    borderBottomColor: "rgba(112, 112, 112, 0.1)",
  }
});