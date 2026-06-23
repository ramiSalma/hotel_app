import React, { useMemo, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  KeyboardAvoidingView,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View
} from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { getAvailableRooms } from "../api/hotelApi";
import FormInput from "../components/FormInput";
import { calculateNights, carServiceOptions } from "../constants/reservation";
import { colors, radii, shadows } from "../styles/theme";
import { formatMoney, normalizeRoom } from "../utils/rooms";

const steps = [
  { key: "stay", label: "Stay" },
  { key: "guest", label: "Guest" },
  { key: "service", label: "Service" },
  { key: "payment", label: "Guarantee" }
];

const countryOptions = ["Morocco", "United States", "United Kingdom", "France", "Spain"];
const phoneCodes = ["+212", "+1", "+33", "+34", "+44"];

export default function ReservationScreen({
  navigation,
  route,
  room,
  value,
  submitting,
  onChange,
  onRoomChange,
  onSubmit
}) {
  const activeRoom = room || route.params?.room;
  const [stepIndex, setStepIndex] = useState(0);
  const [availabilityRooms, setAvailabilityRooms] = useState([]);
  const [availabilitySearched, setAvailabilitySearched] = useState(false);
  const [availabilityError, setAvailabilityError] = useState("");
  const [searchingAvailability, setSearchingAvailability] = useState(false);
  const currentStep = steps[stepIndex];
  const nights = calculateNights(value.check_in, value.check_out);
  const adults = Number(value.adults || 1);
  const children = Number(value.children || 0);
  const guestCount = Math.max(adults + children, 1);
  const carService = carServiceOptions.find((option) => option.id === value.car_service) || carServiceOptions[0];
  const roomTotal = Number(activeRoom?.price || activeRoom?.base_price || 0) * nights;
  const taxes = roomTotal * 0.1;
  const total = roomTotal + taxes + carService.price;
  const progress = stepIndex / (steps.length - 1);

  const canAccessStep = (targetIndex) => {
    if (targetIndex <= 0) return true;
    if (!activeRoom || !value.check_in || !value.check_out) return false;
    if (targetIndex === 1) return true;
    if (!value.first_name || !value.last_name || !value.email || !value.phone) return false;
    return true;
  };

  const canGoNext = useMemo(() => {
    if (currentStep.key === "stay") return value.check_in && value.check_out && activeRoom;
    if (currentStep.key === "guest") return value.first_name && value.last_name && value.email && value.phone;
    if (currentStep.key === "service") return true;
    return true;
  }, [activeRoom, currentStep.key, value]);

  const goNext = () => {
    if (stepIndex < steps.length - 1) {
      setStepIndex((current) => current + 1);
    }
  };

  const searchAvailability = async () => {
    if (!value.check_in || !value.check_out) {
      Alert.alert("Choose dates", "Add a check-in and check-out date before searching.");
      return;
    }

    setSearchingAvailability(true);
    setAvailabilityError("");
    setAvailabilitySearched(true);

    try {
      const data = await getAvailableRooms({
        checkIn: value.check_in,
        checkOut: value.check_out,
        guests: guestCount
      });
      const normalizedRooms = data.map(normalizeRoom);

      setAvailabilityRooms(normalizedRooms);

      if (!activeRoom || !normalizedRooms.some((availableRoom) => String(availableRoom.id) === String(activeRoom.id))) {
        onRoomChange?.(normalizedRooms[0] || null);
      }
    } catch (error) {
      setAvailabilityRooms([]);
      setAvailabilityError(error.message || "Unable to search available rooms.");
    } finally {
      setSearchingAvailability(false);
    }
  };

  return (
    <KeyboardAvoidingView behavior={Platform.OS === "ios" ? "padding" : undefined} style={styles.screen}>
      <ScrollView contentContainerStyle={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.hero}>
          <Pressable onPress={() => navigation.goBack()} style={styles.backButton}>
            <Ionicons name="chevron-back" size={22} color={colors.text} />
          </Pressable>
          <Text style={styles.eyebrow}>Make Your Reservation</Text>
          <Text style={styles.title}>Complete your stay at DALYA Hotel</Text>
        </View>

        <View style={styles.summaryPanel}>
          <SummaryItem icon="calendar-outline" label="Arrival & Departure">
            <View style={styles.inlineInputs}>
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
          </SummaryItem>

          <SummaryItem icon="people-outline" label="Guest Accommodations">
            <View style={styles.inlineInputs}>
              <FormInput
                keyboardType="number-pad"
                label="Adults"
                value={String(value.adults)}
                onChangeText={(text) => onChange("adults", text)}
              />
              <FormInput
                keyboardType="number-pad"
                label="Children"
                value={String(value.children)}
                onChangeText={(text) => onChange("children", text)}
              />
            </View>
          </SummaryItem>
        </View>

        <View style={styles.progressWrap}>
          <View style={styles.progressTrack}>
            <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
          </View>
          <View style={styles.stepRow}>
            {steps.map((step, index) => {
              const active = index === stepIndex;
              const complete = index < stepIndex;

              return (
                <Pressable
                  key={step.key}
                  disabled={!canAccessStep(index)}
                  onPress={() => setStepIndex(index)}
                  style={styles.stepButton}
                >
                  <View style={[styles.stepDot, active && styles.activeStepDot, complete && styles.completeStepDot]} />
                  <Text style={[styles.stepLabel, active && styles.activeStepLabel, !canAccessStep(index) && styles.lockedStepLabel]}>
                    {step.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          {currentStep.key === "stay" ? (
            <StayStep
              room={activeRoom}
              nights={nights}
              guestCount={guestCount}
              rooms={availabilityRooms}
              searched={availabilitySearched}
              searching={searchingAvailability}
              error={availabilityError}
              onSearch={searchAvailability}
              onSelectRoom={onRoomChange}
            />
          ) : null}

          {currentStep.key === "guest" ? (
            <GuestStep value={value} onChange={onChange} />
          ) : null}

          {currentStep.key === "service" ? (
            <ServiceStep value={value} onChange={onChange} />
          ) : null}

          {currentStep.key === "payment" ? (
            <PaymentStep
              value={value}
              onChange={onChange}
              room={activeRoom}
              nights={nights}
              taxes={taxes}
              total={total}
              carService={carService}
            />
          ) : null}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <View>
          <Text style={styles.totalLabel}>Estimated Total</Text>
          <Text style={styles.totalValue}>{formatMoney(total)}</Text>
        </View>
        {stepIndex > 0 ? (
          <Pressable onPress={() => setStepIndex((current) => current - 1)} style={styles.secondaryButton}>
            <Ionicons name="chevron-back" size={18} color={colors.text} />
          </Pressable>
        ) : null}
        <Pressable
          disabled={!canGoNext || submitting}
          onPress={stepIndex === steps.length - 1 ? onSubmit : goNext}
          style={[styles.primaryButton, (!canGoNext || submitting) && styles.disabledButton]}
        >
          {submitting ? <ActivityIndicator color={colors.white} /> : null}
          <Text style={styles.primaryButtonText}>
            {stepIndex === steps.length - 1 ? "Create Invitation" : "Continue"}
          </Text>
          {!submitting ? <Ionicons name="arrow-forward" size={18} color={colors.white} /> : null}
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  );
}

function SummaryItem({ icon, label, children }) {
  return (
    <View style={styles.summaryItem}>
      <View style={styles.summaryHeader}>
        <View style={styles.summaryIcon}>
          <Ionicons name={icon} size={18} color={colors.gold} />
        </View>
        <Text style={styles.summaryLabel}>{label}</Text>
      </View>
      {children}
    </View>
  );
}

function StayStep({
  room,
  nights,
  guestCount,
  rooms,
  searched,
  searching,
  error,
  onSearch,
  onSelectRoom
}) {
  return (
    <View>
      <Text style={styles.sectionEyebrow}>Rooms & Rates</Text>
      <Text style={styles.sectionTitle}>{room?.name || "Search available rooms"}</Text>
      <Text style={styles.bodyText}>
        {room?.description || "Choose dates and guests, then search the backend for available rooms."}
      </Text>
      <View style={styles.detailGrid}>
        <Detail label="Stay" value={`${nights} night${nights === 1 ? "" : "s"}`} />
        <Detail label="Guests" value={`${guestCount} guest${guestCount === 1 ? "" : "s"}`} />
        <Detail label="Rate" value={room ? `${formatMoney(room.price)} / night` : "Select room"} />
      </View>

      <Pressable disabled={searching} onPress={onSearch} style={[styles.searchButton, searching && styles.disabledButton]}>
        {searching ? <ActivityIndicator color={colors.white} /> : <Ionicons name="search" size={18} color={colors.white} />}
        <Text style={styles.searchButtonText}>{searching ? "Searching..." : "Search available rooms"}</Text>
      </Pressable>

      {error ? <Text style={styles.inlineError}>{error}</Text> : null}

      {searched && !searching ? (
        <View style={styles.availableList}>
          <Text style={styles.availableTitle}>
            {rooms.length ? "Available for these dates" : "No rooms available for these dates"}
          </Text>

          {rooms.map((availableRoom) => {
            const selected = room && String(availableRoom.id) === String(room.id);

            return (
              <Pressable
                key={availableRoom.id}
                onPress={() => onSelectRoom?.(availableRoom)}
                style={[styles.availableRoom, selected && styles.availableRoomSelected]}
              >
                <View style={styles.availableRoomText}>
                  <Text style={styles.availableRoomName}>{availableRoom.name}</Text>
                  <Text style={styles.availableRoomMeta}>
                    {availableRoom.capacity} guest{availableRoom.capacity === 1 ? "" : "s"} - {formatMoney(availableRoom.price)} / night
                  </Text>
                </View>
                <Ionicons
                  name={selected ? "checkmark-circle" : "ellipse-outline"}
                  size={21}
                  color={selected ? colors.gold : colors.placeholder}
                />
              </Pressable>
            );
          })}
        </View>
      ) : null}
    </View>
  );
}

function GuestStep({ value, onChange }) {
  return (
    <View>
      <Text style={styles.sectionEyebrow}>Personal Details</Text>
      <Text style={styles.sectionTitle}>Tell us who is arriving</Text>
      <View style={styles.inlineInputs}>
        <FormInput label="First name" value={value.first_name} onChangeText={(text) => onChange("first_name", text)} />
        <FormInput label="Last name" value={value.last_name} onChangeText={(text) => onChange("last_name", text)} />
      </View>
      <FormInput
        autoCapitalize="none"
        keyboardType="email-address"
        label="Email"
        value={value.email}
        onChangeText={(text) => onChange("email", text)}
      />
      <View style={styles.inlineInputs}>
        <OptionPicker label="Code" value={value.phone_code} options={phoneCodes} onSelect={(text) => onChange("phone_code", text)} />
        <FormInput keyboardType="phone-pad" label="Phone" value={value.phone} onChangeText={(text) => onChange("phone", text)} />
      </View>
      <OptionPicker
        label="Country"
        value={value.nationality}
        options={countryOptions}
        onSelect={(text) => onChange("nationality", text)}
      />
      <FormInput
        label="Special requests"
        multiline
        value={value.notes}
        onChangeText={(text) => onChange("notes", text)}
        style={styles.notesInput}
      />
    </View>
  );
}

function ServiceStep({ value, onChange }) {
  return (
    <View>
      <Text style={styles.sectionEyebrow}>Car Service</Text>
      <Text style={styles.sectionTitle}>Shape your arrival</Text>
      {carServiceOptions.map((option) => {
        const active = option.id === value.car_service;

        return (
          <Pressable
            key={option.id}
            onPress={() => onChange("car_service", option.id)}
            style={[styles.choiceCard, active && styles.activeChoice]}
          >
            <View style={[styles.choiceDot, active && styles.activeChoiceDot]} />
            <View style={styles.choiceText}>
              <Text style={styles.choiceTitle}>{option.title}</Text>
              <Text style={styles.choiceDetail}>{option.detail}</Text>
            </View>
            <Text style={styles.choicePrice}>{option.price ? formatMoney(option.price) : "Included"}</Text>
          </Pressable>
        );
      })}

      {value.car_service !== "none" ? (
        <>
          <FormInput label="Arrival time" placeholder="HH:MM" value={value.arrival_time} onChangeText={(text) => onChange("arrival_time", text)} />
          <FormInput label="Flight number" value={value.flight_number} onChangeText={(text) => onChange("flight_number", text)} />
        </>
      ) : null}
    </View>
  );
}

function PaymentStep({ value, onChange, room, nights, taxes, total, carService }) {
  const roomTotal = Number(room.price || 0) * nights;

  return (
    <View>
      <Text style={styles.sectionEyebrow}>Guarantee</Text>
      <Text style={styles.sectionTitle}>Secure your reservation</Text>
      <View style={styles.detailGrid}>
        <Detail label="Room" value={formatMoney(roomTotal)} />
        <Detail label="Taxes" value={formatMoney(taxes)} />
        <Detail label="Car" value={formatMoney(carService.price)} />
        <Detail label="Total" value={formatMoney(total)} />
      </View>

      <View style={styles.paymentChoices}>
        <Pressable
          onPress={() => onChange("payment_method", "online")}
          style={[styles.paymentChoice, value.payment_method === "online" && styles.activeChoice]}
        >
          <Ionicons name="card-outline" size={20} color={colors.gold} />
          <Text style={styles.choiceTitle}>Pay Online</Text>
        </Pressable>
      </View>

      {value.payment_method === "online" ? (
        <>
          <FormInput label="Cardholder name" value={value.card_holder} onChangeText={(text) => onChange("card_holder", text)} />
          <FormInput
            keyboardType="number-pad"
            label="Card number"
            value={value.card_number}
            onChangeText={(text) => onChange("card_number", text)}
          />
          <View style={styles.inlineInputs}>
            <FormInput label="Expiry" placeholder="MM/YY" value={value.expiry_date} onChangeText={(text) => onChange("expiry_date", text)} />
            <FormInput keyboardType="number-pad" label="CVV" value={value.cvv} onChangeText={(text) => onChange("cvv", text)} />
          </View>
        </>
      ) : null}
    </View>
  );
}

function OptionPicker({ label, value, options, onSelect }) {
  return (
    <View style={styles.optionGroup}>
      <Text style={styles.optionLabel}>{label}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.optionRow}>
          {options.map((option) => (
            <Pressable
              key={option}
              onPress={() => onSelect(option)}
              style={[styles.optionPill, value === option && styles.activeOptionPill]}
            >
              <Text style={[styles.optionText, value === option && styles.activeOptionText]}>{option}</Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function Detail({ label, value }) {
  return (
    <View style={styles.detailItem}>
      <Text style={styles.detailLabel}>{label}</Text>
      <Text style={styles.detailValue}>{value}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    backgroundColor: colors.background,
    flex: 1
  },
  content: {
    paddingBottom: 130
  },
  hero: {
    backgroundColor: colors.burgundy,
    paddingBottom: 56,
    paddingHorizontal: 24,
    paddingTop: 58
  },
  backButton: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 24,
    height: 42,
    justifyContent: "center",
    marginBottom: 34,
    width: 42
  },
  eyebrow: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: "800",
    letterSpacing: 3,
    textTransform: "uppercase"
  },
  title: {
    color: colors.white,
    fontFamily: Platform.OS === "ios" ? "Times New Roman" : "serif",
    fontSize: 34,
    fontWeight: "300",
    lineHeight: 40,
    marginTop: 12
  },
  summaryPanel: {
    ...shadows.deep,
    backgroundColor: colors.white,
    borderColor: colors.borderGoldSoft,
    borderWidth: 1,
    marginHorizontal: 18,
    marginTop: -34,
    padding: 18
  },
  summaryItem: {
    borderBottomColor: colors.border,
    borderBottomWidth: 1,
    paddingBottom: 14,
    paddingTop: 2
  },
  summaryHeader: {
    alignItems: "center",
    flexDirection: "row",
    gap: 12
  },
  summaryIcon: {
    alignItems: "center",
    borderColor: colors.borderGoldSoft,
    borderRadius: 20,
    borderWidth: 1,
    height: 38,
    justifyContent: "center",
    width: 38
  },
  summaryLabel: {
    color: colors.burgundy,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  inlineInputs: {
    flexDirection: "row",
    gap: 12
  },
  progressWrap: {
    marginHorizontal: 24,
    marginTop: 34
  },
  progressTrack: {
    backgroundColor: colors.border,
    height: 1
  },
  progressFill: {
    backgroundColor: colors.gold,
    height: 1
  },
  stepRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: -5
  },
  stepButton: {
    alignItems: "center",
    flex: 1
  },
  stepDot: {
    backgroundColor: colors.border,
    borderRadius: 6,
    height: 11,
    width: 11
  },
  activeStepDot: {
    backgroundColor: colors.burgundy,
    transform: [{ scale: 1.25 }]
  },
  completeStepDot: {
    backgroundColor: colors.gold
  },
  stepLabel: {
    color: colors.placeholder,
    fontSize: 8,
    fontWeight: "800",
    letterSpacing: 1,
    marginTop: 12,
    textAlign: "center",
    textTransform: "uppercase"
  },
  activeStepLabel: {
    color: colors.burgundy
  },
  lockedStepLabel: {
    opacity: 0.35
  },
  card: {
    backgroundColor: colors.white,
    borderColor: colors.border,
    borderWidth: 1,
    marginHorizontal: 18,
    marginTop: 42,
    padding: 20
  },
  sectionEyebrow: {
    color: colors.gold,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 3,
    textTransform: "uppercase"
  },
  sectionTitle: {
    color: colors.burgundy,
    fontFamily: Platform.OS === "ios" ? "Times New Roman" : "serif",
    fontSize: 28,
    fontWeight: "300",
    marginTop: 8
  },
  bodyText: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 24,
    marginTop: 14
  },
  detailGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 22
  },
  detailItem: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    minWidth: "46%",
    padding: 14
  },
  detailLabel: {
    color: colors.placeholder,
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  detailValue: {
    color: colors.burgundy,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 6
  },
  searchButton: {
    alignItems: "center",
    backgroundColor: colors.burgundy,
    borderRadius: radii.sm,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 22,
    minHeight: 48,
    paddingHorizontal: 16
  },
  searchButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  inlineError: {
    color: colors.error,
    fontSize: 12,
    fontWeight: "700",
    lineHeight: 18,
    marginTop: 12
  },
  availableList: {
    marginTop: 22
  },
  availableTitle: {
    color: colors.placeholder,
    fontSize: 10,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  availableRoom: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    marginTop: 10,
    padding: 14
  },
  availableRoomSelected: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.gold
  },
  availableRoomText: {
    flex: 1
  },
  availableRoomName: {
    color: colors.burgundy,
    fontSize: 15,
    fontWeight: "900"
  },
  availableRoomMeta: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4
  },
  notesInput: {
    minHeight: 96,
    textAlignVertical: "top"
  },
  optionGroup: {
    marginTop: 14
  },
  optionLabel: {
    color: colors.burgundy,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 8
  },
  optionRow: {
    flexDirection: "row",
    gap: 8
  },
  optionPill: {
    borderColor: colors.border,
    borderRadius: 18,
    borderWidth: 1,
    paddingHorizontal: 14,
    paddingVertical: 9
  },
  activeOptionPill: {
    backgroundColor: colors.burgundy,
    borderColor: colors.burgundy
  },
  optionText: {
    color: colors.muted,
    fontSize: 12,
    fontWeight: "800"
  },
  activeOptionText: {
    color: colors.white
  },
  choiceCard: {
    alignItems: "flex-start",
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginTop: 14,
    padding: 15
  },
  activeChoice: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.gold
  },
  choiceDot: {
    borderColor: colors.placeholder,
    borderRadius: 8,
    borderWidth: 1,
    height: 16,
    marginTop: 3,
    width: 16
  },
  activeChoiceDot: {
    backgroundColor: colors.burgundy,
    borderColor: colors.burgundy
  },
  choiceText: {
    flex: 1
  },
  choiceTitle: {
    color: colors.burgundy,
    fontSize: 15,
    fontWeight: "900"
  },
  choiceDetail: {
    color: colors.muted,
    fontSize: 12,
    lineHeight: 18,
    marginTop: 4
  },
  choicePrice: {
    color: colors.gold,
    fontSize: 11,
    fontWeight: "900"
  },
  paymentChoices: {
    flexDirection: "row",
    gap: 12,
    marginTop: 18
  },
  paymentChoice: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    flex: 1,
    gap: 8,
    padding: 14
  },
  footer: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderTopColor: colors.border,
    borderTopWidth: 1,
    bottom: 0,
    flexDirection: "row",
    gap: 12,
    justifyContent: "space-between",
    left: 0,
    paddingBottom: Platform.OS === "ios" ? 34 : 18,
    paddingHorizontal: 18,
    paddingTop: 16,
    position: "absolute",
    right: 0
  },
  totalLabel: {
    color: colors.placeholder,
    fontSize: 9,
    fontWeight: "900",
    letterSpacing: 2,
    textTransform: "uppercase"
  },
  totalValue: {
    color: colors.burgundy,
    fontSize: 20,
    fontWeight: "900",
    marginTop: 3
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.burgundy,
    borderRadius: radii.sm,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 48,
    paddingHorizontal: 18
  },
  primaryButtonText: {
    color: colors.white,
    fontSize: 12,
    fontWeight: "900",
    letterSpacing: 1,
    textTransform: "uppercase"
  },
  secondaryButton: {
    alignItems: "center",
    borderColor: colors.border,
    borderRadius: radii.sm,
    borderWidth: 1,
    height: 48,
    justifyContent: "center",
    width: 48
  },
  disabledButton: {
    opacity: 0.45
  },
  centerState: {
    alignItems: "center",
    backgroundColor: colors.background,
    flex: 1,
    gap: 14,
    justifyContent: "center",
    padding: 24
  },
  centerTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  }
});
