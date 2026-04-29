import { Platform } from "react-native";

const platformDefaultHost = Platform.select({
  android: "http://10.0.2.2:8000",
  ios: "http://127.0.0.1:8000",
  web: "http://localhost:8000",
  default: "http://127.0.0.1:8000"
});

export const API_BASE_URL = (process.env.EXPO_PUBLIC_API_BASE_URL || platformDefaultHost).replace(/\/$/, "");

const ROOM_ENDPOINTS = ["/api/rooms", "/api/room", "/rooms"];
const RESERVATION_ENDPOINTS = ["/api/reservations", "/api/reservation", "/api/bookings", "/reservations"];

async function request(path, options = {}) {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), 12000);

  try {
    const response = await fetch(`${API_BASE_URL}${path}`, {
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
      const message =
        payload?.message ||
        payload?.error ||
        (typeof payload === "string" && payload) ||
        `Request failed with status ${response.status}`;

      throw new Error(message);
    }

    return payload;
  } catch (error) {
    if (error.name === "AbortError") {
      throw new Error(`API timeout while calling ${API_BASE_URL}${path}`);
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
    }
  }

  throw new Error(errors.join("\n"));
}

function unwrapCollection(payload) {
  if (Array.isArray(payload)) return payload;
  if (Array.isArray(payload?.data)) return payload.data;
  if (Array.isArray(payload?.rooms)) return payload.rooms;
  if (Array.isArray(payload?.data?.data)) return payload.data.data;
  return [];
}

export async function getRooms() {
  const payload = await firstWorkingEndpoint(ROOM_ENDPOINTS);
  return unwrapCollection(payload);
}

export async function createReservation(reservation) {
  return firstWorkingEndpoint(RESERVATION_ENDPOINTS, {
    method: "POST",
    body: JSON.stringify(reservation)
  });
}
