import { StyleSheet } from "react-native";

export const colors = {
  background: "#f4f1ea",
  surface: "#ffffff",
  surfaceSoft: "#fbfaf6",
  text: "#213f39",
  muted: "#60726b",
  border: "#dfd7ca",
  primary: "#1e7667",
  primaryDark: "#145247",
  accent: "#b76e34",
  amberSoft: "#f8e8d5",
  error: "#9a4d3d"
};

export const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: colors.background
  },
  appFrame: {
    flex: 1,
    backgroundColor: colors.background
  },
  screen: {
    flex: 1
  },
  header: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 20,
    paddingTop: 14,
    paddingBottom: 12
  },
  eyebrow: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "800",
    letterSpacing: 0,
    textTransform: "uppercase"
  },
  title: {
    color: colors.text,
    fontSize: 29,
    fontWeight: "900",
    marginTop: 2
  },
  iconButton: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    height: 42,
    justifyContent: "center",
    shadowColor: "#20342f",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    width: 42,
    elevation: 2
  },
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
  },
  errorTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  errorText: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 21,
    textAlign: "center"
  },
  compactError: {
    backgroundColor: "#fff1eb",
    borderColor: "#edc6b8",
    borderRadius: 8,
    borderWidth: 1,
    color: colors.error,
    fontSize: 12,
    lineHeight: 18,
    marginBottom: 12,
    padding: 11
  },
  scrollContent: {
    paddingBottom: 108,
    paddingHorizontal: 20
  },
  listContent: {
    paddingBottom: 108,
    paddingHorizontal: 20
  },
  notice: {
    alignItems: "center",
    backgroundColor: colors.amberSoft,
    borderColor: "#e1bd8f",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 14,
    padding: 12
  },
  noticeText: {
    color: "#744427",
    flex: 1,
    fontSize: 13,
    fontWeight: "700",
    lineHeight: 18
  },
  hero: {
    borderRadius: 8,
    height: 292,
    marginBottom: 18,
    overflow: "hidden",
    shadowColor: "#152924",
    shadowOffset: { width: 0, height: 14 },
    shadowOpacity: 0.2,
    shadowRadius: 24,
    elevation: 6
  },
  heroImage: {
    height: "100%",
    width: "100%"
  },
  heroShade: {
    backgroundColor: "rgba(12, 26, 23, 0.42)",
    bottom: 0,
    left: 0,
    position: "absolute",
    right: 0,
    top: 0
  },
  heroOverlay: {
    bottom: 0,
    left: 0,
    padding: 18,
    position: "absolute",
    right: 0
  },
  heroLabel: {
    color: "#f8d7a7",
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 6,
    textTransform: "uppercase"
  },
  heroTitle: {
    color: "#ffffff",
    fontSize: 31,
    fontWeight: "900",
    lineHeight: 36
  },
  heroPrice: {
    color: "#ffffff",
    fontSize: 16,
    fontWeight: "800",
    marginTop: 5
  },
  heroButton: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    marginTop: 14,
    minHeight: 44,
    paddingHorizontal: 16
  },
  statsRow: {
    flexDirection: "row",
    gap: 12,
    marginBottom: 18
  },
  statCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flex: 1,
    gap: 5,
    padding: 14
  },
  statValue: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  statLabel: {
    color: colors.muted,
    fontSize: 13,
    fontWeight: "700"
  },
  sectionHeader: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 12,
    marginTop: 4
  },
  sectionTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  sectionCount: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  linkText: {
    color: colors.primary,
    fontSize: 14,
    fontWeight: "900"
  },
  roomCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 14,
    overflow: "hidden",
    shadowColor: "#20342f",
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 18,
    elevation: 2
  },
  roomImage: {
    height: 168,
    width: "100%"
  },
  roomBody: {
    padding: 14
  },
  roomTitleRow: {
    alignItems: "flex-start",
    flexDirection: "row",
    gap: 10,
    justifyContent: "space-between"
  },
  roomName: {
    color: colors.text,
    flex: 1,
    fontSize: 18,
    fontWeight: "900"
  },
  statusPill: {
    backgroundColor: "#dff3ec",
    borderRadius: 8,
    paddingHorizontal: 10,
    paddingVertical: 5
  },
  statusPillMuted: {
    backgroundColor: "#eee8df"
  },
  statusText: {
    color: colors.primaryDark,
    fontSize: 12,
    fontWeight: "900"
  },
  statusTextMuted: {
    color: colors.muted
  },
  roomDescription: {
    color: colors.muted,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 7
  },
  roomMeta: {
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 12,
    marginTop: 12
  },
  roomMetaText: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700"
  },
  roomPrice: {
    color: colors.text,
    fontSize: 16,
    fontWeight: "900",
    marginLeft: "auto"
  },
  compactRoomCard: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 12,
    marginBottom: 12,
    padding: 10
  },
  compactRoomImage: {
    borderRadius: 8,
    height: 84,
    width: 92
  },
  compactRoomBody: {
    flex: 1
  },
  miniButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 34,
    justifyContent: "center",
    width: 38
  },
  cardActions: {
    flexDirection: "row",
    gap: 10,
    marginTop: 14
  },
  primaryButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 16
  },
  wideButton: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    marginTop: 16,
    minHeight: 50,
    paddingHorizontal: 16
  },
  primaryButtonText: {
    color: "#ffffff",
    fontSize: 15,
    fontWeight: "900"
  },
  secondaryButton: {
    alignItems: "center",
    backgroundColor: "#eaf6f1",
    borderRadius: 8,
    flex: 1,
    flexDirection: "row",
    gap: 8,
    justifyContent: "center",
    minHeight: 44,
    paddingHorizontal: 14
  },
  secondaryButtonText: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900"
  },
  disabledButton: {
    backgroundColor: "#9aa7a1",
    opacity: 0.75
  },
  searchBox: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 10,
    marginBottom: 12,
    paddingHorizontal: 13
  },
  searchInput: {
    color: colors.text,
    flex: 1,
    fontSize: 15,
    minHeight: 50
  },
  filterChip: {
    alignItems: "center",
    alignSelf: "flex-start",
    backgroundColor: "#eaf6f1",
    borderColor: "#cae4dc",
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 8,
    marginBottom: 14,
    paddingHorizontal: 12,
    paddingVertical: 9
  },
  filterChipActive: {
    backgroundColor: colors.primary,
    borderColor: colors.primary
  },
  filterChipText: {
    color: colors.primary,
    fontSize: 13,
    fontWeight: "900"
  },
  filterChipTextActive: {
    color: "#ffffff"
  },
  emptyState: {
    alignItems: "center",
    gap: 10,
    padding: 28
  },
  emptyTitle: {
    color: colors.text,
    fontSize: 18,
    fontWeight: "900"
  },
  tripCard: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    marginBottom: 12,
    padding: 16
  },
  tripStatus: {
    color: colors.accent,
    fontSize: 12,
    fontWeight: "900",
    marginBottom: 8,
    textTransform: "uppercase"
  },
  tripTitle: {
    color: colors.text,
    fontSize: 20,
    fontWeight: "900"
  },
  tripDates: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "800",
    marginTop: 8
  },
  tripMeta: {
    color: colors.muted,
    fontSize: 14,
    fontWeight: "700",
    marginTop: 6
  },
  infoPanel: {
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    padding: 18
  },
  infoIcon: {
    alignItems: "center",
    backgroundColor: colors.primary,
    borderRadius: 8,
    height: 52,
    justifyContent: "center",
    marginBottom: 14,
    width: 52
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
  modalBackdrop: {
    backgroundColor: "rgba(20, 28, 26, 0.45)",
    flex: 1,
    justifyContent: "flex-end"
  },
  detailsSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxHeight: "88%",
    overflow: "hidden"
  },
  detailsImage: {
    height: 250,
    width: "100%"
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
  detailsName: {
    color: colors.text,
    fontSize: 24,
    fontWeight: "900"
  },
  detailsPrice: {
    color: colors.primary,
    fontSize: 16,
    fontWeight: "900",
    marginTop: 4
  },
  detailsDescription: {
    color: colors.muted,
    fontSize: 15,
    lineHeight: 23,
    marginTop: 14
  },
  amenityGrid: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
    marginTop: 18
  },
  amenityPill: {
    alignItems: "center",
    backgroundColor: "#f1f6f3",
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    flexDirection: "row",
    gap: 7,
    paddingHorizontal: 10,
    paddingVertical: 8
  },
  amenityText: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "800"
  },
  formSheet: {
    backgroundColor: colors.surface,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    maxHeight: "92%"
  },
  formTitle: {
    color: colors.text,
    fontSize: 22,
    fontWeight: "900"
  },
  formSubtitle: {
    color: colors.primary,
    fontSize: 15,
    fontWeight: "900",
    marginTop: 4
  },
  inputGroup: {
    flex: 1,
    marginTop: 14
  },
  inputLabel: {
    color: colors.text,
    fontSize: 13,
    fontWeight: "900",
    marginBottom: 7
  },
  input: {
    backgroundColor: colors.surfaceSoft,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    color: colors.text,
    fontSize: 15,
    minHeight: 48,
    paddingHorizontal: 13,
    paddingVertical: 10
  },
  inputRow: {
    flexDirection: "row",
    gap: 12
  },
  notesInput: {
    minHeight: 88,
    textAlignVertical: "top"
  },
  bottomNav: {
    alignItems: "center",
    backgroundColor: colors.surface,
    borderColor: colors.border,
    borderRadius: 8,
    borderWidth: 1,
    bottom: 16,
    flexDirection: "row",
    gap: 6,
    left: 16,
    padding: 7,
    position: "absolute",
    right: 16,
    shadowColor: "#20342f",
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.14,
    shadowRadius: 22,
    elevation: 8
  },
  navItem: {
    alignItems: "center",
    borderRadius: 8,
    flex: 1,
    gap: 3,
    justifyContent: "center",
    minHeight: 56
  },
  navItemActive: {
    backgroundColor: colors.primary
  },
  navLabel: {
    color: "#63736e",
    fontSize: 11,
    fontWeight: "900"
  },
  navLabelActive: {
    color: "#ffffff"
  }
});
