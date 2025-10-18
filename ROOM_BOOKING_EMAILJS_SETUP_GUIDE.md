# Room Booking EmailJS Setup Guide

## Overview
This guide will help you set up a separate EmailJS service for room booking notifications at Amritha Heritage.

## Step 1: Create New EmailJS Service

1. **Login to EmailJS Dashboard**
   - Go to [https://www.emailjs.com/](https://www.emailjs.com/)
   - Login to your account

2. **Create New Email Service**
   - Go to "Email Services" section
   - Click "Add New Service"
   - Choose your email provider (Gmail, Outlook, etc.)
   - Name it something like "Amritha Heritage Room Bookings"
   - Configure your email settings
   - **Copy the Service ID** (e.g., `service_xyz123`)

## Step 2: Create Room Booking Email Template

1. **Go to Email Templates**
   - Click "Email Templates" in the dashboard
   - Click "Create New Template"

2. **Configure Template Settings**
   - **Template Name:** `Room Booking Notification`
   - **To:** `{{to_email}}`
   - **From:** Your hotel email (e.g., `bookings@amrithaheritage.com`)
   - **Subject:** `🏨 New Room Booking - {{customer_name}} - {{booking_id}}`

3. **Template Content**
   - Copy the HTML content from `ROOM_BOOKING_EMAIL_TEMPLATE.html`
   - Paste it into the template editor
   - **Copy the Template ID** (e.g., `template_abc456`)

## Step 3: Update Environment Variables

Update your `.env` file with the new credentials:

```env
# Room Booking EmailJS Configuration
VITE_ROOM_BOOKING_EMAILJS_SERVICE_ID=your_actual_service_id_here
VITE_ROOM_BOOKING_EMAILJS_TEMPLATE_ID=your_actual_template_id_here
VITE_ROOM_BOOKING_EMAILJS_PUBLIC_KEY=your_public_key_here
```

## Step 4: Template Variables Reference

Make sure your EmailJS template includes these variables:

### Customer Information
- `{{customer_name}}` - Customer's full name
- `{{customer_email}}` - Customer's email address
- `{{customer_phone}}` - Customer's phone number

### Booking Details
- `{{check_in_date}}` - Check-in date (formatted)
- `{{check_out_date}}` - Check-out date (formatted)
- `{{stay_duration}}` - Number of nights
- `{{number_of_guests}}` - Number of guests
- `{{room_type}}` - Type of room booked
- `{{room_number}}` - Assigned room number
- `{{total_amount}}` - Total booking amount
- `{{booking_id}}` - Unique booking identifier

### Additional Information
- `{{special_requests}}` - Any special requests from customer
- `{{to_email}}` - Admin email (recipient)
- `{{admin_email}}` - Admin email for display
- `{{current_datetime}}` - Current date and time

## Step 5: Test the Setup

### Browser Console Test
```javascript
// Test Room Booking Email Service
const testRoomBooking = {
  customerName: "John Doe",
  customerEmail: "john@example.com",
  customerPhone: "+91 9876543210",
  checkInDate: "2024-02-15",
  checkOutDate: "2024-02-17",
  numberOfNights: 2,
  numberOfGuests: 2,
  roomType: "Deluxe Room",
  roomNumber: "101",
  totalAmount: 5000,
  specialRequests: "Late check-in requested",
  bookingId: "RB123456"
};

// Import and test (run in browser console)
import('./src/services/emailService2.js').then(module => {
  module.sendRoomBookingNotification(testRoomBooking);
});
```

### Integration Test
```javascript
// Add this to your room booking form submission
import { sendRoomBookingNotification } from './services/emailService2';

const handleRoomBooking = async (bookingData) => {
  try {
    const emailSent = await sendRoomBookingNotification(bookingData);
    if (emailSent) {
      console.log('✅ Room booking notification sent successfully');
    }
  } catch (error) {
    console.error('❌ Failed to send room booking notification:', error);
  }
};
```

## Step 6: Common Issues & Solutions

### Issue: "Service not found"
- **Solution:** Check `VITE_ROOM_BOOKING_EMAILJS_SERVICE_ID` in .env file
- Verify the service ID in EmailJS dashboard

### Issue: "Template not found"
- **Solution:** Check `VITE_ROOM_BOOKING_EMAILJS_TEMPLATE_ID` in .env file
- Verify the template ID in EmailJS dashboard

### Issue: "Recipients address is empty"
- **Solution:** Ensure `{{to_email}}` is set in the template's "To" field
- Check that `to_email` parameter is being sent

### Issue: "Template variable mismatch"
- **Solution:** Verify all template variables match exactly
- Check spelling and case sensitivity

## Step 7: Email Delivery

Room booking notifications will be sent to:
- **Primary:** `shibilymohammed75@gmail.com`
- **Format:** Professional HTML email with booking details
- **Timing:** Immediately after successful booking

## Files Created

1. `src/services/emailService2.ts` - Room booking email service
2. `ROOM_BOOKING_EMAIL_TEMPLATE.html` - HTML email template
3. This setup guide

## Next Steps

1. Create the EmailJS service and template
2. Update the `.env` file with actual credentials
3. Test the functionality
4. Integrate with your room booking form
5. Monitor email delivery in EmailJS dashboard

## Support

If you encounter issues:
1. Check the browser console for detailed error messages
2. Verify all environment variables are set correctly
3. Test with the provided console script
4. Check EmailJS dashboard for service status and limits