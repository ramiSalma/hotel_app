import React from "react";
import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import { colors } from "../styles/theme";

const styles = StyleSheet.create({
  centerState: {
    alignItems: "center",
    flex: 1,
    gap: 12,
    justifyContent: "center",
    padding: 24
  },
  mutedText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 21,
    textAlign: "center"
  }
});

export default function LoadingState({ message = "Loading rooms..." }) {
  return (
    <View style={styles.centerState}>
      <ActivityIndicator color={colors.gold} size="large" />
      <Text style={styles.mutedText}>{message}</Text>
    </View>
  );
}
