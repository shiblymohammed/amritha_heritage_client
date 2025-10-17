// src/services/emailService.ts
import emailjs from '@emailjs/browser';

// EmailJS configuration - these should be set in your .env file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID || 'your_service_id';
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || 'your_template_id';
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY || 'your_public_key';

// Initialize EmailJS with your public key
emailjs.init(EMAILJS_PUBLIC_KEY);

// Define types for reservation data
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

interface ReservationData {
  reservation: ReservationDetails;
  items: CartItem[];
  totalAmount: number;
}

/**
 * Sends email notification to admin when a new reservation is made
 * @param reservationData - The reservation details and cart items
 * @returns Promise<void>
 */
export const sendAdminNotification = async (reservationData: ReservationData): Promise<void> => {
  try {
    // Format the cart items for email display
    const itemsList = reservationData.items
      .map(item => `• ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`)
      .join('\n');

    // Prepare email template parameters
    const templateParams = {
      customer_name: reservationData.reservation.name,
      customer_phone: reservationData.reservation.phone,
      reservation_date: new Date(reservationData.reservation.date).toLocaleDateString('en-GB'),
      reservation_time: reservationData.reservation.time,
      guest_count: reservationData.reservation.guests,
      ordered_items: itemsList,
      total_amount: `₹${reservationData.totalAmount.toLocaleString()}`,
      admin_email: 'admin@amrithaheritage.com', // Admin email to receive notifications
    };

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log('Admin notification sent successfully:', response.status, response.text);
  } catch (error) {
    console.error('Failed to send admin notification:', error);
    // Don't throw error to prevent reservation flow from breaking
    // Just log the error and continue
  }
};