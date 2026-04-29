import React from "react";
import {
  ActivityIndicator,
  KeyboardAvoidingView,
  Modal,
  Platform,
  Pressable,
  ScrollView,
  Text,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { styles } from "../styles/styles";
import { formatMoney } from "../utils/rooms";
import FormInput from "../components/FormInput";

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
                <Ionicons name="close" size={20} color="#213f39" />
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
                  <ActivityIndicator color="#ffffff" />
                ) : (
                  <Ionicons name="send" size={18} color="#ffffff" />
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