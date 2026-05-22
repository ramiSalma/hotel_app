import { NativeModules, Platform } from "react-native";

const platformDefaultHost = Platform.select({
  android: "http://10.0.2.2:8000",
  ios: "http://127.0.0.1:8000",
  web: "http://localhost:8000",
  default: "http://127.0.0.1:8000"
});

function getExpoDevServerApiUrl() {
  const scriptURL = NativeModules?.SourceCode?.scriptURL || "";
  const host = scriptURL.match(/^https?:\/\/([^/:]+)/)?.[1];

  if (!host || host === "localhost" || host === "127.0.0.1") return "";

  return `http://${host}:8000`;
}

function resolveApiBaseUrl() {
  const configuredUrl = process.env.EXPO_PUBLIC_API_BASE_URL?.trim();
  const devServerUrl = Platform.OS === "web" ? "" : getExpoDevServerApiUrl();
  const baseUrl = configuredUrl || devServerUrl || platformDefaultHost;

  if (Platform.OS !== "web" && configuredUrl?.match(/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?/)) {
    return (devServerUrl || platformDefaultHost).replace(/\/$/, "");
  }

  return baseUrl.replace(/\/$/, "");
}

export const API_BASE_URL = resolveApiBaseUrl();

const ROOM_ENDPOINTS = ["/api/rooms", "/rooms"];
const AVAILABLE_ROOM_ENDPOINTS = ["/api/rooms/available", "/rooms/available"];
const RESERVATION_ENDPOINTS = ["/api/reservations", "/reservations"];

function buildApiUrl(path) {
  const baseUrl = API_BASE_URL.replace(/\/$/, "");
  const endpoint = path.startsWith("/") ? path : `/${path}`;

  if (baseUrl.endsWith("/api") && endpoint.startsWith("/api/")) {
    return `${baseUrl}${endpoint.replace(/^\/api/, "")}`;
  }

  return `${baseUrl}${endpoint}`;
}

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);
  const url = buildApiUrl(path);

  try {
    const response = await fetch(url, {
      ...options,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers
      },
      signal: controller.signal
    });

    const isJson = response.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await response.json() : await response.text();

    if (!response.ok) {
      const firstValidationError =
        payload?.errors && typeof payload.errors === "object"
          ? Object.values(payload.errors).flat()[0]
          : null;
      const message =
        firstValidationError ||
        payload?.message ||
        payload?.error ||
        (typeof payload === "string" && payload) ||
        `Request failed with status ${response.status}`;

      const error = new Error(message);
      error.status = response.status;
      throw error;
    }

    return payload;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`API timeout while calling ${url}`);
    }

    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

async function firstWorkingEndpoint(paths, options) {
  const errors = [];

  for (const path of paths) {
    try {
      return await request(path, options);
    } catch (error) {
      errors.push(`${path}: ${error.message}`);

      if (![404, 405].includes(error.status)) {
        throw error;
      }
    }
  }

  throw new Error(errors.join("\n"));
}

function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.rooms)) return payload.rooms;
  if (Array.isArray(payload?.room)) return payload.room;
  if (Array.isArray(payload?.results)) return payload.results;
  if (Array.isArray(payload?.data?.rooms)) return payload.data.rooms;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

export async function getRooms() {
  const payload = await firstWorkingEndpoint(ROOM_ENDPOINTS);
  return unwrapCollection(payload);
}

export async function getAvailableRooms({ checkIn, checkOut, guests } = {}) {
  const params = new URLSearchParams();

  if (checkIn) params.set("check_in", checkIn);
  if (checkOut) params.set("check_out", checkOut);
  if (guests) params.set("guests", String(guests));

  const suffix = params.toString() ? `?${params.toString()}` : "";
  const payload = await firstWorkingEndpoint(AVAILABLE_ROOM_ENDPOINTS.map((path) => `${path}${suffix}`));
  return unwrapCollection(payload);
}

export async function createReservation(reservation) {
  return firstWorkingEndpoint(RESERVATION_ENDPOINTS, {
    method: "POST",
    body: JSON.stringify(reservation)
  });
}
