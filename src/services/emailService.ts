// src/services/emailService.ts

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
 * Sends the reservation data to the secure backend API.
 * The backend will then handle sending the email notification.
 * @param payload The reservation data from the cart state.
 * @returns A promise that resolves if the request is successful.
 */
export const sendReservationRequest = async (
  payload: ReservationPayload
): Promise<void> => {
  // Use an environment variable for your API URL
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
    // If the server responds with an error, throw an error to be caught by the component
    const errorData = await response.json();
    throw new Error(errorData.error || "Failed to send reservation request.");
  }

  // No need to return anything if successful, the component will handle the UI
};
