# Hotel Reservations Expo App

React Native JavaScript app built with Expo for browsing hotel rooms and sending room reservation requests to the same Laravel API used by `hotel_website_react`.

## Setup

1. Install dependencies:

   ```bash
   npm install
   ```

2. Copy the environment example:

   ```bash
   copy .env.example .env
   ```

3. Update `.env` with your Laravel API URL:

   ```bash
   EXPO_PUBLIC_API_BASE_URL=http://localhost:8000
   ```

   If you test on an Android emulator, the app now defaults to `http://10.0.2.2:8000`. If you test on a physical phone, use your computer LAN IP, for example `http://192.168.1.20:8000`.

4. Start Expo:

   ```bash
   npm run start
   ```

   If Expo cannot reach its version metadata service, use:

   ```bash
   npm run start:offline
   ```

## Expected Laravel Endpoints

The app reads rooms from:

```text
GET /api/rooms
```

It also tries `/api/room` and `/rooms` if the first endpoint is unavailable.

It sends reservations to:

```text
POST /api/reservations
```

It also tries `/api/reservation`, `/api/bookings`, and `/reservations` if the first endpoint is unavailable.

Reservation payload:

```json
{
  "room_id": 1,
  "guest_name": "Guest Name",
  "email": "guest@example.com",
  "phone": "0600000000",
  "check_in": "2026-05-01",
  "check_out": "2026-05-05",
  "guests": 2,
  "notes": "Optional notes"
}
```

The room parser accepts common Laravel response shapes, including plain arrays, `{ "data": [] }`, `{ "rooms": [] }`, and paginated `{ "data": { "data": [] } }`.

## Main Files

- `App.js` contains the routed app screens, bottom navigation, details modal, and reservation form.
- `src/api/hotelApi.js` contains Laravel API calls.
- `src/styles/styles.js` contains the CSS-like React Native styles.
- `src/utils/rooms.js` normalizes room data from the API.
"# hotel_app" 
