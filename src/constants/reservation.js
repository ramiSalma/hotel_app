function dateInput(offsetDays = 0) {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString().slice(0, 10);
}

export function getInitialReservation() {
  return {
    title: "",
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    nationality: "Morocco",
    phone_code: "+212",
    check_in: dateInput(),
    check_out: dateInput(1),
    adults: "1",
    children: "0",
    car_service: "none",
    arrival_time: "",
    flight_number: "",
    notes: "",
    payment_method: "online",
    card_holder: "",
    card_number: "",
    expiry_date: "",
    cvv: ""
  };
}

export const carServiceOptions = [
  {
    id: "none",
    title: "No Transfer",
    price: 0,
    detail: "I will arrange my own arrival transport."
  },
  {
    id: "airport",
    title: "Airport Welcome",
    price: 45,
    detail: "Private pickup with luggage assistance."
  },
  {
    id: "chauffeur",
    title: "Chauffeur Arrival",
    price: 120,
    detail: "Luxury car service for a polished arrival."
  }
];

export function calculateNights(checkIn, checkOut) {
  if (!checkIn || !checkOut) return 1;

  const start = new Date(`${checkIn}T00:00:00`);
  const end = new Date(`${checkOut}T00:00:00`);
  const nights = Math.round((end - start) / (1000 * 60 * 60 * 24));

  return Math.max(nights, 1);
}
