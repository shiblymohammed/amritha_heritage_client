// src/services/reservationService.ts

// Define a type for the data we're sending for better code quality
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface ReservationDetails {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

interface ReservationPayload {
  reservation: ReservationDetails;
  items: CartItem[];
  totalAmount: number;
}

/**
 * Sends reservation data to the backend.
 * Backend handles storage and optional notifications (e.g., Slack).
 * @param payload The reservation data from the cart state.
 */
export const sendReservationRequest = async (
  payload: ReservationPayload
): Promise<void> => {
  const API_URL =
    import.meta.env.VITE_API_BASE_URL || "http://127.0.0.1:8000/api";

  const response = await fetch(`${API_URL}/menu/make-reservation/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to send reservation request.");
  }
};
