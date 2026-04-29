import React from "react";
import { Pressable, ScrollView, Text, View } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";

export default function InfoScreen({ apiBaseUrl, error, usingFallback, onRefresh }) {
  return (
    <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
      <View style={styles.infoPanel}>
        <View style={styles.infoIcon}>
          <Ionicons
            name={usingFallback ? "cloud-offline-outline" : "cloud-done-outline"}
            size={26}
            color="#ffffff"
          />
        </View>

        <Text style={styles.infoTitle}>
          {usingFallback ? "API fallback active" : "API connected"}
        </Text>

        <Text style={styles.infoText}>Base URL: {apiBaseUrl}</Text>

        {error ? <Text style={styles.compactError}>{error}</Text> : null}

        <Pressable onPress={onRefresh} style={styles.wideButton}>
          <Ionicons name="reload" size={18} color="#ffffff" />
          <Text style={styles.primaryButtonText}>Check connection</Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}