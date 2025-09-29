// This is a simple test script to verify that EmailJS is working correctly
// Run this in your browser console after setting up your EmailJS credentials

// Use your actual EmailJS credentials
const SERVICE_ID = 'service_arz46ex';
const TEMPLATE_ID = 'template_lxili2s';
const PUBLIC_KEY = 'gPBcWSxjGAy5MMQa-';

// Sample test data
const testData = {
  fullName: "Test User",
  email: "test@example.com",
  contactNumber: "1234567890",
  message: "This is a test message from the EmailJS test script.",
  specialOccasion: "Test Occasion"
};

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

// Send a test email
emailjs.send(SERVICE_ID, TEMPLATE_ID, testData)
  .then(function(response) {
    console.log('SUCCESS!', response.status, response.text);
    alert('Test email sent successfully! Check your inbox.');
  }, function(error) {
    console.log('FAILED...', error);
    alert('Failed to send test email. Check console for details.');
  });

// Instructions:
// 1. Open your website in a browser
// 2. Open the browser console (F12 or right-click > Inspect > Console)
// 3. Copy and paste this entire script into the console
// 4. Press Enter to run the script
// 5. Check your email inbox for the test email