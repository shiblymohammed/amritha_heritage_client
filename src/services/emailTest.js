// EmailJS Test Script
// Copy and paste this into your browser console to test EmailJS directly

// Test EmailJS configuration
console.log('🧪 Testing EmailJS Configuration...');

// Your current credentials (replace with actual values)
const SERVICE_ID = 'service_klu49f8';
const TEMPLATE_ID = 'template_0gb7w5k';
const PUBLIC_KEY = 'asyiqNIOeobdCBLOA';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

// Test data
const testData = {
  customer_name: 'Test Customer',
  customer_phone: '+91 9876543210',
  reservation_date: '15/01/2024',
  reservation_time: '7:00 PM',
  guest_count: 4,
  ordered_items: '• Butter Chicken x2 - ₹800\n• Naan x4 - ₹200\n• Biryani x1 - ₹350',
  total_amount: '₹1,350',
  admin_email: 'admin@amrithaheritage.com',
  current_datetime: new Date().toLocaleString('en-IN', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  })
};

// Send test email
console.log('📧 Sending test email...');
console.log('Data:', testData);

emailjs.send(SERVICE_ID, TEMPLATE_ID, testData)
  .then((response) => {
    console.log('✅ SUCCESS!', response.status, response.text);
    alert('✅ Test email sent successfully!');
  })
  .catch((error) => {
    console.error('❌ FAILED:', error);
    alert('❌ Test email failed: ' + (error.text || error.message));
  });

// Instructions:
// 1. Open browser console (F12)
// 2. Go to your website (localhost:5173)
// 3. Copy and paste this entire script
// 4. Press Enter
// 5. Check the results