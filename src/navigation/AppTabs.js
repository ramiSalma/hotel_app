import React from "react";
import { StyleSheet, Platform } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { colors } from "../styles/theme";
import HomeScreen from "../screens/HomeScreen";
import RoomsScreen from "../screens/RoomsScreen";
import TripsScreen from "../screens/TripsScreen";
import ProfileScreen from "../screens/ProfileScreen";
import MenuScreen from "../screens/MenuScreen";
import RoomDetailsScreen from "../screens/RoomDetailsScreen";
import LoadingState from "../components/LoadingState";

const Tab = createBottomTabNavigator();

const luxuryColors = {
  gold: "#AF944F", // More muted, champagne gold
  black: "#1A1A1A", // Off-black is more premium than pure black
  muted: "#999999",
  white: "#FFFFFF",
};

// Reordered: Menu is now the 3rd link (Center anchor)
const tabScreens = {
  home: { label: "HOME", icon: "home-outline", activeIcon: "home-sharp" },
  rooms: { label: "SUITES", icon: "bed-outline", activeIcon: "bed-sharp" },
  menu: { label: "MENU", icon: "grid-outline", activeIcon: "grid-sharp" },
  trips: { label: "TRIPS", icon: "calendar-outline", activeIcon: "calendar-sharp" },
  profile: { label: "PROFILE", icon: "person-outline", activeIcon: "person-sharp" }
};

export default function AppTabs({
  availableCount,
  bestPrice,
  error,
  featuredRoom,
  loading,
  navigationRef,
  onReserve,
  rooms,
  savedTrips,
  usingFallback
}) {
  const openDetails = (navigation, room) => {
    navigation.navigate("roomDetails", { room });
  };

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        initialRouteName="home"
        screenOptions={({ route }) => {
          const screen = tabScreens[route.name];

          // Hide Tab Bar for Details screen
          if (!screen) {
            return {
              headerShown: false,
              tabBarButton: () => null,
              tabBarStyle: { display: "none" }
            };
          }

          return {
            headerShown: false,
            tabBarActiveTintColor: luxuryColors.gold,
            tabBarInactiveTintColor: luxuryColors.muted,
            tabBarStyle: styles.tabBar,
            tabBarLabelStyle: styles.tabBarLabel,
            tabBarIcon: ({ focused, color }) => (
              <Ionicons
                name={focused ? screen.activeIcon : screen.icon}
                size={20}
                color={color}
              />
            ),
            tabBarLabel: screen.label
          };
        }}
      >
        {/* Order matters here for the physical layout */}
        <Tab.Screen name="home">
          {({ navigation }) => (
            loading ? <LoadingState /> : (
              <HomeScreen
                availableCount={availableCount}
                bestPrice={bestPrice}
                error={error}
                featuredRoom={featuredRoom}
                rooms={rooms.slice(0, 3)}
                usingFallback={usingFallback}
                onDetails={(room) => openDetails(navigation, room)}
                onReserve={onReserve}
                onViewRooms={() => navigation.navigate("rooms")}
              />
            )
          )}
        </Tab.Screen>

        <Tab.Screen name="rooms">
          {({ navigation }) => (
            loading ? <LoadingState /> : (
              <RoomsScreen
                rooms={rooms}
                onDetails={(room) => openDetails(navigation, room)}
                onReserve={onReserve}
              />
            )
          )}
        </Tab.Screen>

        {/* Third Link: Menu */}
        <Tab.Screen name="menu" component={MenuScreen} />

        <Tab.Screen name="trips">
          {({ navigation }) => (
            loading ? <LoadingState /> : (
              <TripsScreen trips={savedTrips} onExplore={() => navigation.navigate("rooms")} />
            )
          )}
        </Tab.Screen>

        <Tab.Screen name="profile" component={ProfileScreen} />

        <Tab.Screen name="roomDetails">
          {(props) => <RoomDetailsScreen {...props} onReserve={onReserve} />}
        </Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: luxuryColors.black,
    borderTopWidth: 0,
    position: "absolute",
    bottom: 34,
    left: 20,
    right: 20,
    height: 72,
    borderRadius: 20,
    // Luxury padding adjustment
    paddingBottom: Platform.OS === 'ios' ? 20 : 12,
    paddingTop: 12,
    // Sophisticated shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 10,
  },
  tabBarLabel: {
    fontSize: 9,
    fontWeight: "600",
    letterSpacing: 1.5,
    marginTop: 2,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'sans-serif-medium',
  }
});