import React from "react";
import { Pressable, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { routes } from "../constants/navigation";
import { styles } from "../styles/styles";

export default function BottomNav({ activeRoute, onChange }) {
  return (
    <View style={styles.bottomNav}>
      {routes.map((route) => {
        const active = route.key === activeRoute;

        return (
          <Pressable
            key={route.key}
            onPress={() => onChange(route.key)}
            style={[styles.navItem, active && styles.navItemActive]}
          >
            <Ionicons
              name={active ? route.activeIcon : route.icon}
              size={22}
              color={active ? "#ffffff" : "#63736e"}
            />
            <Text style={[styles.navLabel, active && styles.navLabelActive]}>
              {route.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}