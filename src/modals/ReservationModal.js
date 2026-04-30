import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { colors, radii, shadows } from "../styles/theme";
import { formatMoney } from "../utils/rooms";
import FormInput from "../components/FormInput";

const styles = StyleSheet.create({
  modalBackdrop: {
    backgroundColor: "rgba(0, 0, 0, 0.62)",
    flex: 1,
    justifyContent: "flex-end"
  },
  formSheet: {
    backgroundColor: colors.surface,
    borderColor: colors.gold,
    borderTopLeftRadius: radii.xl,
    borderTopRightRadius: radii.xl,
    borderWidth: 1,
    maxHeight: "92%"
  },
  sheetContent: {
    padding: 20
  },
  sheetTopRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 14,
    justifyContent: "space-between"
  },
  sheetTitleBlock: {
    flex: 1
  },
  formTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  formSubtitle: {
    color: colors.burgundy,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 4
  },
  iconButton: {
    ...shadows.soft,
    alignItems: "center",
    backgroundColor: colors.black,
    borderColor: colors.gold,
    borderRadius: radii.md,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    width: 42
  },
  inputRow: {
    flexDirection: "row",
    gap: 12
  },
  notesInput: {
    minHeight: 88,
    textAlignVertical: "top"
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
  },
  disabledButton: {
    backgroundColor: colors.disabled,
    opacity: 0.75
  }
});

export default function ReservationModal({ room, value, submitting, onChange, onClose, onSubmit }) {
  if (!room) return null;

  return (
    <Modal animationType="slide" visible transparent onRequestClose={onClose}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : undefined}
        style={styles.modalBackdrop}
      >
        <View style={styles.formSheet}>
          <View style={styles.sheetContent}>
            <View style={styles.sheetTopRow}>
              <View style={styles.sheetTitleBlock}>
                <Text style={styles.formTitle}>Reserve {room.name}</Text>
                <Text style={styles.formSubtitle}>{formatMoney(room.price)} / night</Text>
              </View>

              <Pressable accessibilityLabel="Close reservation form" onPress={onClose} style={styles.iconButton}>
                <Ionicons name="close" size={20} color={colors.gold} />
              </Pressable>
            </View>

            <ScrollView keyboardShouldPersistTaps="handled" showsVerticalScrollIndicator={false}>
              <FormInput
                label="Full name"
                value={value.guest_name}
                onChangeText={(text) => onChange("guest_name", text)}
              />

              <FormInput
                autoCapitalize="none"
                keyboardType="email-address"
                label="Email"
                value={value.email}
                onChangeText={(text) => onChange("email", text)}
              />

              <FormInput
                keyboardType="phone-pad"
                label="Phone"
                value={value.phone}
                onChangeText={(text) => onChange("phone", text)}
              />

              <View style={styles.inputRow}>
                <FormInput
                  label="Check in"
                  placeholder="YYYY-MM-DD"
                  value={value.check_in}
                  onChangeText={(text) => onChange("check_in", text)}
                />

                <FormInput
                  label="Check out"
                  placeholder="YYYY-MM-DD"
                  value={value.check_out}
                  onChangeText={(text) => onChange("check_out", text)}
                />
              </View>

              <FormInput
                keyboardType="number-pad"
                label="Guests"
                value={value.guests}
                onChangeText={(text) => onChange("guests", text)}
              />

              <FormInput
                label="Notes"
                multiline
                value={value.notes}
                onChangeText={(text) => onChange("notes", text)}
                style={styles.notesInput}
              />

              <Pressable
                disabled={submitting}
                onPress={onSubmit}
                style={[styles.wideButton, submitting && styles.disabledButton]}
              >
                {submitting ? (
                  <ActivityIndicator color={colors.black} />
                ) : (
                  <Ionicons name="send" size={18} color={colors.black} />
                )}

                <Text style={styles.primaryButtonText}>
                  {submitting ? "Sending..." : "Send reservation"}
                </Text>
              </Pressable>
            </ScrollView>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
}
