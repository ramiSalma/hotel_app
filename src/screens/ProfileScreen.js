import React from "react";
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  ScrollView, 
  SafeAreaView 
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors } from "../styles/theme";

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
        
        <View style={styles.header}>
          <View style={styles.imageContainer}>
            <View style={styles.profileImage}>
              <Ionicons name="person-outline" size={42} color={luxuryColors.gold} />
            </View>
          </View>
          <Text style={styles.userName}>GUEST PROFILE</Text>
          <Text style={styles.userTier}>Account details will appear when the backend provides them.</Text>
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
    alignItems: "center",
    justifyContent: "center"
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
    lineHeight: 18,
    paddingHorizontal: 30,
    textAlign: "center",
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
