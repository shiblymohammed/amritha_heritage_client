// Room Booking EmailJS Test Script
// Run this in your browser console to test the room booking email service

console.log('🏨 Room Booking EmailJS Test Script');
console.log('=====================================');

// Test room booking data
const testRoomBookingData = {
  customerName: "John Doe",
  customerEmail: "john.doe@example.com",
  customerPhone: "+91 9876543210",
  checkInDate: "2024-02-15",
  checkOutDate: "2024-02-17",
  numberOfNights: 2,
  numberOfGuests: 2,
  roomType: "Deluxe Room",
  roomNumber: "101",
  totalAmount: 5000,
  specialRequests: "Late check-in requested, extra pillows needed",
  bookingId: "RB" + Date.now()
};

console.log('📋 Test Booking Data:');
console.log(testRoomBookingData);

// Check if EmailJS is loaded
if (typeof emailjs === 'undefined') {
  console.error('❌ EmailJS library not found. Make sure it\'s loaded in your HTML.');
  console.log('Add this to your HTML head:');
  console.log('<script src="https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js"></script>');
} else {
  console.log('✅ EmailJS library loaded');
  
  // Test room booking email service
  const testRoomBookingEmail = async () => {
    try {
      console.log('🚀 Testing room booking email service...');
      
      // Configuration from environment variables
      const config = {
        serviceId: 'service_203a0r9', // Your actual service ID
        templateId: 'template_uyc0u4c', // Your actual template ID
        publicKey: 'TcEB-1Gv2KjVf2gJD' // Your actual public key
      };
      
      console.log('🔧 Configuration:', config);
      
      // Initialize EmailJS
      emailjs.init(config.publicKey);
      
      // Calculate stay duration
      const checkIn = new Date(testRoomBookingData.checkInDate);
      const checkOut = new Date(testRoomBookingData.checkOutDate);
      const stayDuration = Math.ceil((checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24));
      
      // Prepare template parameters
      const templateParams = {
        to_email: 'shibilymohammed75@gmail.com',
        customer_name: testRoomBookingData.customerName,
        customer_email: testRoomBookingData.customerEmail,
        customer_phone: testRoomBookingData.customerPhone,
        check_in_date: checkIn.toLocaleDateString('en-GB'),
        check_out_date: checkOut.toLocaleDateString('en-GB'),
        number_of_nights: stayDuration.toString(),
        number_of_guests: testRoomBookingData.numberOfGuests.toString(),
        room_type: testRoomBookingData.roomType,
        room_number: testRoomBookingData.roomNumber || 'To be assigned',
        total_amount: `₹${testRoomBookingData.totalAmount}`,
        special_requests: testRoomBookingData.specialRequests || 'None',
        booking_id: testRoomBookingData.bookingId,
        admin_email: 'shibilymohammed75@gmail.com',
        current_datetime: new Date().toLocaleString(),
        stay_duration: `${stayDuration} night${stayDuration > 1 ? 's' : ''}`
      };
      
      console.log('📧 Template Parameters:');
      console.log(templateParams);
      
      // Send email
      const response = await emailjs.send(
        config.serviceId,
        config.templateId,
        templateParams
      );
      
      console.log('✅ Room booking email sent successfully!');
      console.log('📬 Response:', response);
      alert('✅ Room booking test email sent successfully!');
      
    } catch (error) {
      console.error('❌ Room booking email test failed:', error);
      
      if (error.status) {
        switch (error.status) {
          case 400:
            console.error('❌ Bad Request: Check template parameters');
            break;
          case 401:
            console.error('❌ Unauthorized: Check your Public Key');
            break;
          case 404:
            console.error('❌ Not Found: Check Service ID and Template ID');
            break;
          case 422:
            console.error('❌ Template Error: Check template variables');
            break;
          default:
            console.error('❌ Unknown error:', error.text || error.message);
        }
      }
      
      alert('❌ Room booking test failed: ' + (error.text || error.message));
    }
  };
  
  // Run the test
  console.log('🎯 Starting room booking email test...');
  testRoomBookingEmail();
}

// Instructions
console.log('\n📝 Instructions:');
console.log('1. Update the serviceId and templateId in the config object above');
console.log('2. Make sure your EmailJS template has all the required variables');
console.log('3. Check that the "To" field in your template is set to {{to_email}}');
console.log('4. Run this script again after updating the configuration');
console.log('\n🔗 EmailJS Dashboard: https://www.emailjs.com/');