import React from "react";
import { Text, TextInput, View } from "react-native";
import { styles } from "../styles/styles";

export default function FormInput({ label, style, ...props }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput placeholderTextColor="#9aa7a1" style={[styles.input, style]} {...props} />
    </View>
  );
}