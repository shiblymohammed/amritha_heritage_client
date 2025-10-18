import emailjs from '@emailjs/browser';

// Room Booking EmailJS Configuration
const ROOM_BOOKING_SERVICE_ID = import.meta.env.VITE_ROOM_BOOKING_EMAILJS_SERVICE_ID;
const ROOM_BOOKING_TEMPLATE_ID = import.meta.env.VITE_ROOM_BOOKING_EMAILJS_TEMPLATE_ID;
const ROOM_BOOKING_PUBLIC_KEY = import.meta.env.VITE_ROOM_BOOKING_EMAILJS_PUBLIC_KEY;

// Room Booking Data Interface
interface RoomBookingData {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  checkInDate: string;
  checkOutDate: string;
  numberOfNights: number;
  numberOfGuests: number;
  roomType: string;
  roomNumber?: string;
  totalAmount: number;
  specialRequests?: string;
  bookingId?: string;
}

// Initialize EmailJS for Room Bookings
if (ROOM_BOOKING_PUBLIC_KEY) {
  emailjs.init(ROOM_BOOKING_PUBLIC_KEY);
  console.log('🏨 Room Booking EmailJS initialized');
} else {
  console.error('❌ Room Booking EmailJS Public Key not found');
}

export const sendRoomBookingNotification = async (bookingData: RoomBookingData): Promise<boolean> => {
  try {
    // Validate required environment variables
    if (!ROOM_BOOKING_SERVICE_ID) {
      throw new Error('Room Booking Service ID is missing. Please check VITE_ROOM_BOOKING_EMAILJS_SERVICE_ID in .env file');
    }
    
    if (!ROOM_BOOKING_TEMPLATE_ID) {
      throw new Error('Room Booking Template ID is missing. Please check VITE_ROOM_BOOKING_EMAILJS_TEMPLATE_ID in .env file');
    }
    
    if (!ROOM_BOOKING_PUBLIC_KEY) {
      throw new Error('Room Booking Public Key is missing. Please check VITE_ROOM_BOOKING_EMAILJS_PUBLIC_KEY in .env file');
    }

    console.log('🏨 Room Booking EmailJS Configuration:');
    console.log('Service ID:', ROOM_BOOKING_SERVICE_ID);
    console.log('Template ID:', ROOM_BOOKING_TEMPLATE_ID);
    console.log('Public Key:', ROOM_BOOKING_PUBLIC_KEY);

    // Calculate stay duration
    const checkIn = new Date(bookingData.checkInDate);
    const checkOut = new Date(bookingData.checkOutDate);
    const stayDuration = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));

    // Prepare email template parameters
    const templateParams = {
      to_email: 'shibilymohammed75@gmail.com', // Room booking admin email
      customer_name: bookingData.customerName,
      customer_email: bookingData.customerEmail,
      customer_phone: bookingData.customerPhone,
      check_in_date: checkIn.toLocaleDateString('en-GB'),
      check_out_date: checkOut.toLocaleDateString('en-GB'),
      number_of_nights: stayDuration.toString(),
      number_of_guests: bookingData.numberOfGuests.toString(),
      room_type: bookingData.roomType,
      room_number: bookingData.roomNumber || 'To be assigned',
      total_amount: `₹${bookingData.totalAmount}`,
      special_requests: bookingData.specialRequests || 'None',
      booking_id: bookingData.bookingId || `RB${Date.now()}`,
      admin_email: 'shibilymohammed75@gmail.com',
      current_datetime: new Date().toLocaleString(),
      stay_duration: `${stayDuration} night${stayDuration > 1 ? 's' : ''}`
    };

    console.log('📧 Room Booking Template Parameters:');
    console.log(templateParams);

    // Send email via EmailJS
    const response = await emailjs.send(
      ROOM_BOOKING_SERVICE_ID,
      ROOM_BOOKING_TEMPLATE_ID,
      templateParams
    );

    console.log('✅ Room booking notification sent successfully:', response);
    alert('✅ Room booking notification sent successfully!');
    return true;

  } catch (error: any) {
    console.error('❌ Failed to send room booking notification:', error);
    
    // Enhanced error handling
    if (error.status) {
      switch (error.status) {
        case 400:
          console.error('❌ Bad Request: Check your template parameters');
          alert('❌ Room booking email failed: Invalid template parameters');
          break;
        case 401:
          console.error('❌ Unauthorized: Check your Public Key');
          alert('❌ Room booking email failed: Invalid credentials');
          break;
        case 404:
          console.error('❌ Not Found: Check your Service ID and Template ID');
          alert('❌ Room booking email failed: Service or template not found');
          break;
        case 422:
          console.error('❌ Template Error: Check template variables match exactly');
          alert('❌ Room booking email failed: Template variable mismatch');
          break;
        default:
          console.error('❌ Unknown error:', error.text || error.message);
          alert('❌ Room booking email failed: ' + (error.text || error.message));
      }
    } else {
      console.error('❌ Network or configuration error:', error.message);
      alert('❌ Room booking email failed: ' + error.message);
    }
    
    return false;
  }
};

// Export configuration for testing
export const getRoomBookingEmailConfig = () => ({
  serviceId: ROOM_BOOKING_SERVICE_ID,
  templateId: ROOM_BOOKING_TEMPLATE_ID,
  publicKey: ROOM_BOOKING_PUBLIC_KEY
});