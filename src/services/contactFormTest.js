// Contact Form EmailJS Test Script
// Run this in the browser console to test contact form email functionality

console.log("🧪 Starting Contact Form Email Test...");

// Test data for contact form
const testContactData = {
  name: "Test Customer",
  email: "test.customer@example.com",
  phone: "+91 9876543210",
  subject: "Test Contact Form Submission",
  message: "This is a test message to verify that the contact form email functionality is working correctly. Please ignore this test email."
};

console.log("📋 Test Data:", testContactData);

// Import the email service (adjust path if needed)
import('./emailService.js').then(({ sendContactFormEmail }) => {
  console.log("📧 Sending contact form email...");
  
  sendContactFormEmail(testContactData)
    .then(result => {
      if (result) {
        console.log("✅ SUCCESS: Contact form email sent successfully!");
        console.log("📬 Check your admin email inbox for the notification");
        console.log("🔍 Expected subject: 'New Contact Form Submission: Test Contact Form Submission'");
      } else {
        console.log("❌ FAILED: Contact form email was not sent");
        console.log("🔧 Check your EmailJS configuration and template ID");
      }
    })
    .catch(error => {
      console.error("❌ ERROR sending contact form email:", error);
      console.log("🔧 Troubleshooting tips:");
      console.log("1. Check VITE_CONTACT_EMAILJS_TEMPLATE_ID in .env file");
      console.log("2. Verify EmailJS template exists and is active");
      console.log("3. Ensure template variables match the ones being sent");
      console.log("4. Check EmailJS service quota and status");
    });
}).catch(error => {
  console.error("❌ ERROR importing email service:", error);
  console.log("🔧 Make sure you're running this from the correct directory");
});

// Alternative test for different scenarios
console.log("\n🔄 You can also test with different data:");
console.log("Copy and paste this code with your own test data:");
console.log(`
// Test with minimal data (home page style)
const homePageTestData = {
  name: "Home Page User",
  email: "homepage@example.com",
  phone: "", // Empty for home page
  subject: "Contact from Home Page",
  message: "Test message from home page contact section."
};

import('./emailService.js').then(({ sendContactFormEmail }) => {
  sendContactFormEmail(homePageTestData).then(console.log);
});
`);

console.log(`
// Test with contact page data (full form)
const contactPageTestData = {
  name: "Contact Page User",
  email: "contactpage@example.com", 
  phone: "+91 9876543210",
  subject: "Wedding Reception", // From special occasion dropdown
  message: "I would like to inquire about hosting a wedding reception at your heritage property."
};

import('./emailService.js').then(({ sendContactFormEmail }) => {
  sendContactFormEmail(contactPageTestData).then(console.log);
});
`);