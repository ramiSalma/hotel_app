import { API_BASE_URL } from "../api/hotelApi";

const FALLBACK_IMAGES = [
  "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&w=1200&q=80",
  "https://images.unsplash.com/photo-1578683010236-d716f9a3f461?auto=format&fit=crop&w=1200&q=80"
];

export function normalizeRoom(room, index = 0) {
  const rawAmenities = room.amenities || room.features || room.services || [];
  const amenities = Array.isArray(rawAmenities)
    ? rawAmenities
    : String(rawAmenities)
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);

  return {
    id: room.id || room.room_id || index + 1,
    name: room.name || room.title || `Room ${index + 1}`,
    description: room.description || room.details || "Comfortable room with everything you need for a relaxed hotel stay.",
    price: Number(room.price || room.price_per_night || room.night_price || 0),
    capacity: Number(room.capacity || room.guests || room.max_guests || 2),
    beds: room.beds || room.bed_type || "Queen bed",
    available: room.available ?? room.is_available ?? room.status !== "booked",
    image: room.image || room.image_url || room.photo || room.photo_url || room.thumbnail,
    amenities: amenities.length ? amenities : ["Wi-Fi", "Air conditioning", "Private bathroom"]
  };
}

export function getRoomImage(room) {
  if (room.image?.startsWith("http")) return room.image;
  if (room.image?.startsWith("/")) return `${API_BASE_URL}${room.image}`;
  return FALLBACK_IMAGES[Number(room.id || 0) % FALLBACK_IMAGES.length];
}

export function formatMoney(value) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0
  }).format(Number(value || 0));
}
