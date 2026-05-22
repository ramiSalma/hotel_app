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

  const roomType = room.type ? String(room.type).replace(/_/g, " ") : "room";
  const roomNumber = room.room_number || room.number;
  const name = room.name || room.title || (roomNumber ? `${roomType} ${roomNumber}` : `Room ${index + 1}`);
  const status = String(room.status || "").toLowerCase();
  const unavailableStatuses = ["booked", "occupied", "maintenance", "unavailable", "reserved"];
  const rawImages = Array.isArray(room.images)
    ? room.images
    : [
        room.image,
        room.image_url,
        room.photo,
        room.photo_url,
        room.thumbnail,
        room.cover_image
      ].filter(Boolean);
  const image = rawImages[0];
  const price = Number(room.price || room.price_per_night || room.night_price || room.base_price || 0);

  return {
    id: room.id || room.room_id || index + 1,
    room_number: roomNumber,
    type: String(room.type || room.category || "room").toLowerCase(),
    name: name.charAt(0).toUpperCase() + name.slice(1),
    description:
      room.description ||
      room.details ||
      `A refined ${roomType} stay with ${room.bed_type || room.beds || "premium bedding"} on floor ${room.floor || "the hotel"}.`,
    price,
    base_price: price,
    capacity: Number(room.capacity || room.guests || room.max_guests || 2),
    beds: room.beds || room.bed_type || "Queen bed",
    available: room.available ?? room.is_available ?? !unavailableStatuses.includes(status),
    image: image || room.image_url || room.photo || room.photo_url || room.thumbnail,
    images: rawImages.length ? rawImages : [],
    status: status || (room.available || room.is_available ? "available" : "unavailable"),
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
