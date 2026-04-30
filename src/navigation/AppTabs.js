import React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { API_BASE_URL } from "../api/hotelApi";
import { colors } from "../styles/theme";
import HomeScreen from "../screens/HomeScreen";
import RoomsScreen from "../screens/RoomsScreen";
import TripsScreen from "../screens/TripsScreen";
import InfoScreen from "../screens/InfoScreen";
import LoadingState from "../components/LoadingState";

const Tab = createBottomTabNavigator();

const tabScreens = {
  home: {
    label: "Home",
    icon: "home-outline",
    activeIcon: "home"
  },
  rooms: {
    label: "Rooms",
    icon: "bed-outline",
    activeIcon: "bed"
  },
  trips: {
    label: "Trips",
    icon: "calendar-outline",
    activeIcon: "calendar"
  },
  info: {
    label: "Info",
    icon: "information-circle-outline",
    activeIcon: "information-circle"
  }
};

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: colors.black,
    borderColor: colors.gold,
    borderRadius: 24,
    borderTopWidth: 1,
    bottom: 16,
    height: 74,
    left: 16,
    paddingBottom: 8,
    paddingTop: 8,
    position: "absolute",
    right: 16,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.26,
    shadowRadius: 28,
    elevation: 8
  },
  tabBarItem: {
    borderRadius: 18,
    minHeight: 56
  },
  tabBarLabel: {
    fontSize: 11,
    fontWeight: "900"
  }
});

export default function AppTabs({
  availableCount,
  bestPrice,
  error,
  featuredRoom,
  loading,
  navigationRef,
  onDetails,
  onRefresh,
  onReserve,
  refreshing,
  rooms,
  savedTrips,
  usingFallback
}) {
  const renderHome = (navigation) => {
    if (loading) return <LoadingState />;

    return (
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
    );
  };

  const renderRooms = () => {
    if (loading) return <LoadingState />;

    return (
      <RoomsScreen
        rooms={rooms}
        refreshing={refreshing}
        onRefresh={onRefresh}
        onDetails={onDetails}
        onReserve={onReserve}
      />
    );
  };

  const renderTrips = (navigation) => {
    if (loading) return <LoadingState />;

    return <TripsScreen trips={savedTrips} onExplore={() => navigation.navigate("rooms")} />;
  };

  const renderInfo = () => (
    <InfoScreen
      apiBaseUrl={API_BASE_URL}
      error={error}
      usingFallback={usingFallback}
      onRefresh={onRefresh}
    />
  );

  return (
    <NavigationContainer ref={navigationRef}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveBackgroundColor: colors.burgundy,
          tabBarActiveTintColor: colors.gold,
          tabBarInactiveTintColor: colors.mutedGold,
          tabBarHideOnKeyboard: true,
          tabBarItemStyle: styles.tabBarItem,
          tabBarLabelStyle: styles.tabBarLabel,
          tabBarStyle: styles.tabBar,
          tabBarIcon: ({ focused, color, size }) => {
            const screen = tabScreens[route.name];

            return (
              <Ionicons
                name={focused ? screen.activeIcon : screen.icon}
                size={size}
                color={color}
              />
            );
          },
          tabBarLabel: tabScreens[route.name].label
        })}
      >
        <Tab.Screen name="home">{({ navigation }) => renderHome(navigation)}</Tab.Screen>
        <Tab.Screen name="rooms">{renderRooms}</Tab.Screen>
        <Tab.Screen name="trips">{({ navigation }) => renderTrips(navigation)}</Tab.Screen>
        <Tab.Screen name="info">{renderInfo}</Tab.Screen>
      </Tab.Navigator>
    </NavigationContainer>
  );
}
