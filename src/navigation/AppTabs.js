import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { colors } from "../styles/theme";
import HomeScreen from "../screens/HomeScreen";
import RoomsScreen from "../screens/RoomsScreen";
import TripsScreen from "../screens/TripsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MenuScreen from "../screens/MenuScreen"; // You can create a simple drawer-style list here

const Tab = createBottomTabNavigator();

const luxuryColors = {
  gold: "#D4AF37",
  black: "#0D0D0D",
  muted: "#707070",
};

// Updated screens with Menu at the start
const tabScreens = {
  menu: { label: "MENU", icon: "menu-outline", activeIcon: "menu" },
  home: { label: "EXPLORE", icon: "home-outline", activeIcon: "home" },
  rooms: { label: "SUITES", icon: "bed-outline", activeIcon: "bed" },
  trips: { label: "TRIPS", icon: "calendar-outline", activeIcon: "calendar" },
  profile: { label: "ACCOUNT", icon: "person-outline", activeIcon: "person" }
};

export default function AppTabs({
  availableCount,
  bestPrice,
  error,
  featuredRoom,
  loading,
  navigationRef,
  onDetails,
  onReserve,
  rooms,
  savedTrips,
  usingFallback
}) {

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        initialRouteName="home" // Default to Home even though Menu is first in list
        screenOptions={({ route }) => ({
          headerShown: false, // COMPLETELY REMOVED HEADER
          tabBarActiveTintColor: colors.gold || luxuryColors.gold,
          tabBarInactiveTintColor: luxuryColors.muted,
          tabBarStyle: styles.tabBar,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarIcon: ({ focused, color }) => {
            const screen = tabScreens[route.name];
            return (
              <Ionicons
                name={focused ? screen.activeIcon : screen.icon}
                size={22}
                color={color}
              />
            );
          },
          tabBarLabel: tabScreens[route.name].label
        })}
      >
        <Tab.Screen name="menu" component={MenuScreen} />
        
        <Tab.Screen name="home">
          {({ navigation }) => (
            <HomeScreen
              availableCount={availableCount}
              bestPrice={bestPrice}
              error={error}
              featuredRoom={featuredRoom}
              rooms={rooms.slice(0, 3)}
              usingFallback={usingFallback}
              onDetails={onDetails}
              onReserve={onReserve}
              onViewRooms={() => navigation.navigate("rooms")}
            />
          )}
        </Tab.Screen>
        
        <Tab.Screen name="rooms">
          {(props) => <RoomsScreen {...props} rooms={rooms} />}
        </Tab.Screen>
        
        <Tab.Screen name="trips">
          {({ navigation }) => (
            <TripsScreen trips={savedTrips} onExplore={() => navigation.navigate("rooms")} />
          )}
        </Tab.Screen>

        <Tab.Screen name="profile" component={ProfileScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: '#0D0D0D',
    borderTopWidth: 0,
    bottom: 30,
    height: 75,
    left: 15,
    right: 15,
    position: "absolute",
    borderRadius: 35,
    paddingBottom: 12,
    paddingTop: 12,
    // Soft glow shadow for luxury feel
    shadowColor: luxuryColors.gold,
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15, 
    shadowRadius: 20,
    elevation: 20,
  },
  tabBarLabel: {
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1.2,
    marginTop: 4,
  }
});