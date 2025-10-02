import emailjs from '@emailjs/browser';

// =================================================================
// EmailJS Configuration
// =================================================================
const SERVICE_ID = 'service_arz46ex';
const PUBLIC_KEY = 'gPBcWSxjGAy5MMQa-';

// Template IDs for different email types
const TEMPLATES = {
  CONTACT: 'template_lxili2s',           // Contact form template (existing)
  BOOKING: 'template_38qmxzj',    // Room booking template - UPDATE THIS after creating in EmailJS
  RESERVATION: 'template_12ygcgw' // Dining reservation template - UPDATE THIS after creating in EmailJS
};

// =================================================================
// TypeScript Interfaces
// =================================================================
interface ContactFormData {
  fullName: string;
  email: string;
  contactNumber: string;
  message: string;
  specialOccasion?: string;
}

interface RoomBookingDetail {
  roomId: number;
  roomName: string;
  roomCategory: string;
  occupancy: 'single' | 'double';
  price: number;
}

interface BookingEmailData {
  guestName: string;
  guestEmail: string;
  guestPhone: string;
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
  rooms: RoomBookingDetail[];
  specialRequests?: string;
  nights: number;
  roomTotal: number;
  taxes: number;
  totalAmount: number;
  bookingDate: string;
}

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface ReservationEmailData {
  customerName: string;
  customerPhone: string;
  reservationDate: string;
  reservationTime: string;
  guestCount: number;
  selectedItems: CartItem[];
  totalAmount: number;
  totalItems: number;
}

// =================================================================
// Email Service Functions
// =================================================================

/**
 * Initializes EmailJS
 */
export const initEmailJS = () => {
  console.log('Initializing EmailJS with PUBLIC_KEY:', PUBLIC_KEY);
  emailjs.init(PUBLIC_KEY);
  console.log('EmailJS initialized successfully');
};

/**
 * Sends a contact form email
 * @param formData - Contact form data
 * @returns Promise that resolves when the email is sent
 */
export const sendContactEmail = async (formData: ContactFormData) => {
  try {
    console.log('Sending contact email...');
    console.log('SERVICE_ID:', SERVICE_ID);
    console.log('TEMPLATE_ID:', TEMPLATES.CONTACT);

    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      message: formData.message,
      specialOccasion: formData.specialOccasion || 'None',
      submissionDate: new Date().toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    console.log('Sending with template params:', templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATES.CONTACT,
      templateParams,
      PUBLIC_KEY
    );

    console.log('Contact email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};

/**
 * Sends a room booking confirmation email
 * @param bookingData - Room booking data
 * @returns Promise that resolves when the email is sent
 */
export const sendBookingEmail = async (bookingData: BookingEmailData) => {
  try {
    console.log('Sending booking confirmation email...');
    console.log('SERVICE_ID:', SERVICE_ID);
    console.log('TEMPLATE_ID:', TEMPLATES.BOOKING);

    // Format rooms list for email
    const roomsList = bookingData.rooms.map((room, index) =>
      `${index + 1}. ${room.roomName} (${room.roomCategory}) - ${room.occupancy === 'single' ? 'Single' : 'Double'} Occupancy - ₹${room.price.toLocaleString()}`
    ).join('\n');

    // Format dates
    const checkInFormatted = new Date(bookingData.checkIn).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const checkOutFormatted = new Date(bookingData.checkOut).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    const templateParams = {
      guestName: bookingData.guestName,
      guestEmail: bookingData.guestEmail,
      guestPhone: bookingData.guestPhone,
      checkIn: checkInFormatted,
      checkOut: checkOutFormatted,
      nights: bookingData.nights,
      adults: bookingData.adults,
      children: bookingData.children,
      roomsList: roomsList,
      roomCount: bookingData.rooms.length,
      specialRequests: bookingData.specialRequests || 'None',
      roomTotal: `₹${bookingData.roomTotal.toLocaleString()}`,
      taxes: `₹${bookingData.taxes.toLocaleString()}`,
      totalAmount: `₹${bookingData.totalAmount.toLocaleString()}`,
      bookingDate: bookingData.bookingDate,
      // Individual room details for template flexibility
      room1Name: bookingData.rooms[0]?.roomName || '',
      room1Price: bookingData.rooms[0] ? `₹${bookingData.rooms[0].price.toLocaleString()}` : '',
      room2Name: bookingData.rooms[1]?.roomName || '',
      room2Price: bookingData.rooms[1] ? `₹${bookingData.rooms[1].price.toLocaleString()}` : '',
    };

    console.log('Sending booking email with params:', templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATES.BOOKING,
      templateParams,
      PUBLIC_KEY
    );

    console.log('Booking email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending booking email:', error);
    throw error;
  }
};

/**
 * Sends a dining reservation confirmation email
 * @param reservationData - Dining reservation data
 * @returns Promise that resolves when the email is sent
 */
export const sendReservationEmail = async (reservationData: ReservationEmailData) => {
  try {
    console.log('Sending reservation confirmation email...');
    console.log('SERVICE_ID:', SERVICE_ID);
    console.log('TEMPLATE_ID:', TEMPLATES.RESERVATION);

    // Format items list for email
    const itemsList = reservationData.selectedItems.map((item, index) =>
      `${index + 1}. ${item.name} x${item.quantity} - ₹${(item.price * item.quantity).toLocaleString()}`
    ).join('\n');

    // Format date
    const reservationDateFormatted = new Date(reservationData.reservationDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });

    // Convert 24-hour time to 12-hour format
    const [hours, minutes] = reservationData.reservationTime.split(':');
    const hour = parseInt(hours);
    const ampm = hour >= 12 ? 'PM' : 'AM';
    const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
    const timeFormatted = `${hour12}:${minutes} ${ampm}`;

    const templateParams = {
      customerName: reservationData.customerName,
      customerPhone: reservationData.customerPhone,
      reservationDate: reservationDateFormatted,
      reservationTime: timeFormatted,
      guestCount: reservationData.guestCount,
      itemsList: itemsList,
      totalItems: reservationData.totalItems,
      totalAmount: `₹${reservationData.totalAmount.toLocaleString()}`,
      submissionDate: new Date().toLocaleString('en-GB', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      })
    };

    console.log('Sending reservation email with params:', templateParams);

    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATES.RESERVATION,
      templateParams,
      PUBLIC_KEY
    );

    console.log('Reservation email sent successfully:', response);
    return response;
  } catch (error) {
    console.error('Error sending reservation email:', error);
    throw error;
  }
};