import React from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";

const styles = StyleSheet.create({
  scrollContent: {
    paddingBottom: 118,
    paddingHorizontal: 20,
    paddingTop: 18
  },
  infoPanel: {
    ...shadows.soft,
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: radii.xl,
    borderWidth: 1,
    padding: 18
  },
  infoIcon: {
    alignItems: "center",
    backgroundColor: colors.burgundy,
    borderColor: colors.gold,
    borderRadius: radii.lg,
    borderWidth: 1,
    height: 56,
    justifyContent: "center",
    marginBottom: 14,
    width: 56
  },
  infoTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900",
    marginBottom: 8
  },
  infoText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    marginBottom: 12
  },
  compactError: {
    backgroundColor: colors.errorSoft,
    borderColor: colors.errorBorder,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.error,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
    padding: 11
  },
  wideButton: {
    ...shadows.gold,
    alignItems: "center",
    backgroundColor: colors.gold,
    borderRadius: radii.lg,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 16,
    minHeight: 50,
    paddingHorizontal: 16
  },
  primaryButtonText: {
    color: colors.black,
    fontSize: 15,
    fontWeight: "900"
  }
});

export default function InfoScreen({ apiBaseUrl, error, usingFallback, onRefresh }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.infoPanel}>
        <View style={styles.infoIcon}>
          <Ionicons
            name={usingFallback ? "cloud-offline-outline" : "cloud-done-outline"}
            size={26}
            color={colors.gold}
          />
        </View>

        <Text style={styles.infoTitle}>
          {usingFallback ? "API fallback active" : "API connected"}
        </Text>

        <Text style={styles.infoText}>Base URL: {apiBaseUrl}</Text>

        {error ? <Text style={styles.compactError}>{error}</Text> : null}

        <Pressable onPress={onRefresh} style={styles.wideButton}>
          <Ionicons name="reload" size={18} color={colors.black} />
          <Text style={styles.primaryButtonText}>Check connection</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
