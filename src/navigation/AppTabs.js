import React, { useEffect, useRef } from "react";
import { StyleSheet, Platform, Animated, View } from "react-native";
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
import ReservationScreen from "../screens/ReservationScreen";
import LoadingState from "../components/LoadingState";

const Tab = createBottomTabNavigator();

const luxuryColors = {
  gold: "#AF944F",
  black: "#1A1A1A",
  muted: "#777777", // Slightly darker for better contrast
  white: "#FFFFFF",
};

const tabScreens = {
  home: { label: "HOME", icon: "home-outline", activeIcon: "home-sharp" },
  rooms: { label: "SUITES", icon: "bed-outline", activeIcon: "bed-sharp" },
  menu: { label: "MENU", icon: "grid-outline", activeIcon: "grid-sharp" },
  trips: { label: "TRIPS", icon: "calendar-outline", activeIcon: "calendar-sharp" },
  profile: { label: "PROFILE", icon: "person-outline", activeIcon: "person-sharp" }
};

// --- LUXURY ANIMATED ICON COMPONENT ---
function TabBarIcon({ focused, color, name }) {
  const scaleValue = useRef(new Animated.Value(focused ? 1.2 : 1)).current;

  useEffect(() => {
    Animated.spring(scaleValue, {
      toValue: focused ? 1.15 : 1,
      useNativeDriver: true,
      friction: 8,
      tension: 100,
    }).start();
  }, [focused]);

  return (
    <Animated.View style={{ transform: [{ scale: scaleValue }], alignItems: 'center' }}>
      <Ionicons name={name} size={20} color={color} />
      {focused && <View style={styles.activeIndicator} />}
    </Animated.View>
  );
}

export default function AppTabs({
  availableCount,
  bestPrice,
  error,
  featuredRoom,
  loading,
  navigationRef,
  onReserve,
  onReservationChange,
  onReservationSubmit,
  rooms,
  reservation,
  reservationRoom,
  savedTrips,
  submitting,
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
              <TabBarIcon 
                focused={focused} 
                color={color} 
                name={focused ? screen.activeIcon : screen.icon} 
              />
            ),
            tabBarLabel: screen.label
          };
        }}
      >
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

        <Tab.Screen name="reservation">
          {(props) => (
            <ReservationScreen
              {...props}
              room={reservationRoom || props.route.params?.room}
              value={reservation}
              submitting={submitting}
              onChange={onReservationChange}
              onSubmit={onReservationSubmit}
            />
          )}
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
    
    // Architectural Spacing
    bottom: Platform.OS === 'ios' ? 38 : 28,
    marginHorizontal: 24, // Luxury margin-x
    height: 74,
    borderRadius: 26,
    
    // Padding logic to keep icons centered
    paddingBottom: Platform.OS === 'ios' ? 24 : 12,
    paddingTop: 14,

    // Deep Onyx Shadow
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 20 },
    shadowOpacity: 0.5,
    shadowRadius: 25,
    elevation: 15,
  },
  tabBarLabel: {
    fontSize: 8,
    fontWeight: "700",
    letterSpacing: 2, // Wider tracking for luxury feel
    marginTop: 6,
    fontFamily: Platform.OS === 'ios' ? 'HelveticaNeue-Medium' : 'sans-serif-medium',
  },
  activeIndicator: {
    position: 'absolute',
    bottom: -8,
    width: 3,
    height: 3,
    borderRadius: 1.5,
    backgroundColor: luxuryColors.gold,
  }
});
