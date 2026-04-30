import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { colors, radii } from "../styles/theme";

const styles = StyleSheet.create({
  inputGroup: {
    flex: 1,
    marginTop: 14
  },
  inputLabel: {
    color: colors.burgundy,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 7
  },
  input: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: radii.md,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    minHeight: 52,
    paddingHorizontal: 15,
    paddingVertical: 12
  }
});

export default function FormInput({ label, style, ...props }) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.inputLabel}>{label}</Text>
      <TextInput placeholderTextColor={colors.placeholder} style={[styles.input, style]} {...props} />
    </View>
  );
}
