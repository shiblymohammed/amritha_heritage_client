# EmailJS Setup Guide for Amritha Heritage

This guide will help you set up the EmailJS templates for the booking and reservation systems.

## Overview

The application now uses EmailJS for three types of emails:
1. **Contact Form** - General inquiries (Already configured: `template_lxili2s`)
2. **Room Booking** - Room booking confirmations (New: `template_booking_new`)
3. **Dining Reservation** - Table reservations (New: `template_reservation_new`)

## Prerequisites

- EmailJS account (https://www.emailjs.com/)
- Service ID: `service_arz46ex`
- Public Key: `gPBcWSxjGAy5MMQa-`

---

## Template 1: Contact Form (Already Configured)

**Template ID:** `template_lxili2s`

**Variables:**
- `{{fullName}}` - Customer's full name
- `{{email}}` - Customer's email
- `{{contactNumber}}` - Customer's phone number
- `{{message}}` - Customer's message
- `{{specialOccasion}}` - Special occasion (if any)
- `{{submissionDate}}` - Date and time of submission

---

## Template 2: Room Booking Confirmation (NEW)

**Template ID:** `template_booking_new`

### Step 1: Create New Template in EmailJS

1. Log in to EmailJS dashboard
2. Go to "Email Templates"
3. Click "Create New Template"
4. Name it: "Room Booking Confirmation"
5. Template ID: `template_booking_new`

### Step 2: Email Template Content

**Subject Line:**
```
🏨 Booking Confirmation - Amritha Heritage | {{guestName}}
```

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Georgia', serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B7355 0%, #6B5344 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .booking-details { background: #f9f6f3; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0d5c7; }
        .detail-label { font-weight: bold; color: #8B7355; }
        .rooms-section { margin: 20px 0; }
        .room-item { background: white; padding: 15px; margin: 10px 0; border-left: 4px solid #8B7355; }
        .total-section { background: #8B7355; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .button { background: #8B7355; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🏨 Booking Confirmed!</h1>
            <p>Amritha Heritage - Where History Meets Luxury</p>
        </div>
        
        <div class="content">
            <h2>Dear {{guestName}},</h2>
            <p>Thank you for choosing Amritha Heritage! We are delighted to confirm your reservation.</p>
            
            <div class="booking-details">
                <h3>📋 Booking Details</h3>
                
                <div class="detail-row">
                    <span class="detail-label">Guest Name:</span>
                    <span>{{guestName}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Email:</span>
                    <span>{{guestEmail}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span>{{guestPhone}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Check-in:</span>
                    <span>{{checkIn}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Check-out:</span>
                    <span>{{checkOut}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Duration:</span>
                    <span>{{nights}} night(s)</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Guests:</span>
                    <span>{{adults}} Adult(s), {{children}} Child(ren)</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Booking Date:</span>
                    <span>{{bookingDate}}</span>
                </div>
            </div>
            
            <div class="rooms-section">
                <h3>🛏️ Selected Rooms ({{roomCount}})</h3>
                <pre style="white-space: pre-wrap; font-family: 'Georgia', serif; background: #f9f6f3; padding: 15px; border-radius: 8px;">{{roomsList}}</pre>
            </div>
            
            <div class="booking-details">
                <h3>💬 Special Requests</h3>
                <p>{{specialRequests}}</p>
            </div>
            
            <div class="total-section">
                <h3>💰 Payment Summary</h3>
                <div style="margin: 15px 0;">
                    <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                        <span>Room Total:</span>
                        <span>{{roomTotal}}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; padding: 5px 0;">
                        <span>Taxes & Fees:</span>
                        <span>{{taxes}}</span>
                    </div>
                    <hr style="border: 1px solid rgba(255,255,255,0.3); margin: 10px 0;">
                    <div style="display: flex; justify-content: space-between; padding: 10px 0; font-size: 24px; font-weight: bold;">
                        <span>Total Amount:</span>
                        <span>{{totalAmount}}</span>
                    </div>
                </div>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <strong>⏰ Check-in Time:</strong> 2:00 PM<br>
                <strong>⏰ Check-out Time:</strong> 12:00 PM (Noon)
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="tel:+919633555199" class="button">📞 Call Us: +91 96335 55199</a>
                <a href="mailto:info@amrithaheritage.com" class="button">✉️ Email Us</a>
            </div>
            
            <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <h4>✨ What to Expect:</h4>
                <ul>
                    <li>Complimentary Wi-Fi throughout the property</li>
                    <li>24/7 front desk service</li>
                    <li>Heritage dining experience</li>
                    <li>Concierge services</li>
                    <li>Free parking</li>
                </ul>
            </div>
            
            <p>We look forward to welcoming you to Amritha Heritage and providing you with an unforgettable heritage experience.</p>
            
            <p><strong>Important:</strong> Please arrive with a valid government-issued photo ID and this confirmation email.</p>
        </div>
        
        <div class="footer">
            <p><strong>Amritha Heritage</strong></p>
            <p>Thycaud, Thiruvananthapuram – 695014, Kerala, India</p>
            <p>📞 +91 96335 55199 | ✉️ info@amrithaheritage.com</p>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
                This is an automated confirmation email. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
```

### Step 3: Template Variables

Make sure these variables are configured in EmailJS:

- `{{guestName}}` - Guest's full name
- `{{guestEmail}}` - Guest's email address
- `{{guestPhone}}` - Guest's phone number
- `{{checkIn}}` - Check-in date (formatted)
- `{{checkOut}}` - Check-out date (formatted)
- `{{nights}}` - Number of nights
- `{{adults}}` - Number of adults
- `{{children}}` - Number of children
- `{{roomsList}}` - List of selected rooms (formatted)
- `{{roomCount}}` - Number of rooms booked
- `{{specialRequests}}` - Special requests from guest
- `{{roomTotal}}` - Room subtotal
- `{{taxes}}` - Taxes and fees
- `{{totalAmount}}` - Total amount
- `{{bookingDate}}` - Date and time of booking

---

## Template 3: Dining Reservation Confirmation (NEW)

**Template ID:** `template_reservation_new`

### Step 1: Create New Template in EmailJS

1. Log in to EmailJS dashboard
2. Go to "Email Templates"
3. Click "Create New Template"
4. Name it: "Dining Reservation Confirmation"
5. Template ID: `template_reservation_new`

### Step 2: Email Template Content

**Subject Line:**
```
🍽️ Table Reserved - Amritha Heritage | {{customerName}}
```

**Email Body:**
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: 'Georgia', serif; color: #333; line-height: 1.6; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: linear-gradient(135deg, #8B7355 0%, #6B5344 100%); color: white; padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
        .content { background: #fff; padding: 30px; border: 1px solid #ddd; }
        .reservation-details { background: #f9f6f3; padding: 20px; border-radius: 8px; margin: 20px 0; }
        .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #e0d5c7; }
        .detail-label { font-weight: bold; color: #8B7355; }
        .menu-section { margin: 20px 0; }
        .menu-item { background: white; padding: 10px; margin: 5px 0; border-left: 3px solid #8B7355; }
        .total-section { background: #8B7355; color: white; padding: 20px; border-radius: 8px; margin: 20px 0; text-align: center; }
        .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
        .button { background: #8B7355; color: white; padding: 12px 30px; text-decoration: none; border-radius: 5px; display: inline-block; margin: 10px 0; }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🍽️ Table Reserved!</h1>
            <p>Amritha Heritage - Culinary Excellence</p>
        </div>
        
        <div class="content">
            <h2>Dear {{customerName}},</h2>
            <p>Thank you for choosing to dine with us! Your table has been reserved.</p>
            
            <div class="reservation-details">
                <h3>📋 Reservation Details</h3>
                
                <div class="detail-row">
                    <span class="detail-label">Name:</span>
                    <span>{{customerName}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Phone:</span>
                    <span>{{customerPhone}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Date:</span>
                    <span>{{reservationDate}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Time:</span>
                    <span>{{reservationTime}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Number of Guests:</span>
                    <span>{{guestCount}}</span>
                </div>
                
                <div class="detail-row">
                    <span class="detail-label">Reservation Made:</span>
                    <span>{{submissionDate}}</span>
                </div>
            </div>
            
            <div class="menu-section">
                <h3>🍴 Pre-ordered Items ({{totalItems}})</h3>
                <pre style="white-space: pre-wrap; font-family: 'Georgia', serif; background: #f9f6f3; padding: 15px; border-radius: 8px;">{{itemsList}}</pre>
            </div>
            
            <div class="total-section">
                <h3>💰 Estimated Total</h3>
                <div style="font-size: 28px; font-weight: bold; margin-top: 10px;">
                    {{totalAmount}}
                </div>
                <p style="font-size: 14px; margin-top: 10px; opacity: 0.9;">
                    Final bill may vary based on additional orders
                </p>
            </div>
            
            <div style="background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <strong>⏰ Restaurant Hours:</strong><br>
                Breakfast: 7:00 AM - 10:30 AM<br>
                Lunch: 12:00 PM - 3:00 PM<br>
                Dinner: 7:00 PM - 10:30 PM
            </div>
            
            <div style="text-align: center; margin: 30px 0;">
                <a href="tel:+919633555199" class="button">📞 Call Us: +91 96335 55199</a>
            </div>
            
            <div style="background: #e8f5e9; border-left: 4px solid #4caf50; padding: 15px; margin: 20px 0; border-radius: 5px;">
                <h4>✨ Dining Experience Includes:</h4>
                <ul>
                    <li>Authentic Kerala cuisine</li>
                    <li>Heritage ambiance</li>
                    <li>Attentive service</li>
                    <li>Chef's special recommendations</li>
                    <li>Complimentary water</li>
                </ul>
            </div>
            
            <p>We look forward to serving you an unforgettable culinary experience at Amritha Heritage.</p>
            
            <p><strong>Note:</strong> Please arrive on time. We will hold your table for 15 minutes past your reservation time.</p>
        </div>
        
        <div class="footer">
            <p><strong>Amritha Heritage Restaurant</strong></p>
            <p>Thycaud, Thiruvananthapuram – 695014, Kerala, India</p>
            <p>📞 +91 96335 55199 | ✉️ info@amrithaheritage.com</p>
            <p style="margin-top: 20px; font-size: 12px; color: #999;">
                This is an automated confirmation email. Please do not reply to this email.
            </p>
        </div>
    </div>
</body>
</html>
```

### Step 3: Template Variables

Make sure these variables are configured in EmailJS:

- `{{customerName}}` - Customer's name
- `{{customerPhone}}` - Customer's phone number
- `{{reservationDate}}` - Reservation date (formatted)
- `{{reservationTime}}` - Reservation time (formatted)
- `{{guestCount}}` - Number of guests
- `{{itemsList}}` - List of pre-ordered items (formatted)
- `{{totalItems}}` - Total number of items
- `{{totalAmount}}` - Total amount
- `{{submissionDate}}` - Date and time of reservation

---

## Testing the Templates

### Test Booking Email
1. Go to the Booking page
2. Fill in all required fields
3. Select a room
4. Submit the form
5. Check the email inbox (both customer and admin)

### Test Reservation Email
1. Go to the Dining page
2. Add items to cart
3. Fill in reservation details
4. Submit the reservation
5. Check the email inbox

---

## Troubleshooting

### Email Not Sending
1. Check EmailJS dashboard for quota limits
2. Verify template IDs match exactly
3. Check browser console for errors
4. Ensure PUBLIC_KEY is correct

### Template Variables Not Showing
1. Verify variable names match exactly (case-sensitive)
2. Check EmailJS template editor for proper variable syntax
3. Test with EmailJS template tester

### Emails Going to Spam
1. Add your domain to EmailJS allowed domains
2. Configure SPF/DKIM records (if using custom domain)
3. Ask recipients to whitelist your email

---

## Next Steps

1. ✅ Create `template_booking_new` in EmailJS dashboard
2. ✅ Create `template_reservation_new` in EmailJS dashboard
3. ✅ Test both templates thoroughly
4. ✅ Configure email recipients in EmailJS settings
5. ✅ Set up email notifications for admin

---

## Support

For EmailJS support: https://www.emailjs.com/docs/
For Amritha Heritage support: info@amrithaheritage.com
