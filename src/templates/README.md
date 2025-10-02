# 📧 Email Templates for Amritha Heritage

This folder contains professional HTML email templates for the booking and reservation systems.

---

## 📁 Templates

### 1. `booking-email-template.html`
**Purpose:** Room booking confirmation emails

**Features:**
- ✅ Professional heritage-themed design
- ✅ Responsive layout (mobile-friendly)
- ✅ Complete booking details
- ✅ Room information with pricing breakdown
- ✅ Check-in/check-out times
- ✅ Amenities list
- ✅ Contact buttons (call & email)
- ✅ Important guest information

**Variables Used:**
```
{{guestName}}        - Guest's full name
{{guestEmail}}       - Guest's email address
{{guestPhone}}       - Guest's phone number
{{checkIn}}          - Check-in date (formatted)
{{checkOut}}         - Check-out date (formatted)
{{nights}}           - Number of nights
{{adults}}           - Number of adults
{{children}}         - Number of children
{{roomsList}}        - List of booked rooms (formatted)
{{roomCount}}        - Number of rooms
{{specialRequests}}  - Special requests from guest
{{roomTotal}}        - Room subtotal (formatted with ₹)
{{taxes}}            - Taxes and fees (formatted with ₹)
{{totalAmount}}      - Total amount (formatted with ₹)
{{bookingDate}}      - Date and time of booking
```

---

### 2. `reservation-email-template.html`
**Purpose:** Dining table reservation confirmation emails

**Features:**
- ✅ Professional restaurant-themed design
- ✅ Responsive layout (mobile-friendly)
- ✅ Reservation date and time highlight
- ✅ Pre-ordered menu items list
- ✅ Restaurant hours information
- ✅ Dining experience details
- ✅ Contact button
- ✅ Important reservation policies

**Variables Used:**
```
{{customerName}}      - Customer's name
{{customerPhone}}     - Customer's phone number
{{reservationDate}}   - Reservation date (formatted)
{{reservationTime}}   - Reservation time (formatted)
{{guestCount}}        - Number of guests
{{itemsList}}         - List of pre-ordered items (formatted)
{{totalItems}}        - Total number of items
{{totalAmount}}       - Total amount (formatted with ₹)
{{submissionDate}}    - Date and time of reservation
```

---

## 🚀 How to Use These Templates in EmailJS

### Step 1: Copy Template Content

1. Open the HTML file you want to use
2. Copy the entire HTML content (Ctrl+A, Ctrl+C)

### Step 2: Create Template in EmailJS

1. Log into https://dashboard.emailjs.com/
2. Go to "Email Templates"
3. Click "Create New Template"
4. Give it a name (e.g., "Room Booking Confirmation")

### Step 3: Paste HTML Content

1. In the EmailJS template editor, switch to "HTML" mode
2. Delete any default content
3. Paste your copied HTML template
4. Click "Save"

### Step 4: Get Template ID

1. After saving, you'll see the Template ID (e.g., `template_abc123`)
2. Copy this ID

### Step 5: Update Your Code

1. Open `src/services/emailService.ts`
2. Update the TEMPLATES object:

```typescript
const TEMPLATES = {
  CONTACT: 'template_lxili2s',
  BOOKING: 'template_abc123',      // Your booking template ID
  RESERVATION: 'template_xyz789'   // Your reservation template ID
};
```

---

## 🎨 Design Features

### Color Scheme
- **Primary:** `#8B7355` (Heritage Brown)
- **Secondary:** `#6B5344` (Dark Brown)
- **Accent:** `#D4AF37` (Gold)
- **Success:** `#4caf50` (Green)
- **Warning:** `#ffc107` (Amber)

### Typography
- **Font Family:** Georgia, Times New Roman (serif)
- **Headings:** Bold, larger sizes
- **Body:** Regular weight, comfortable line-height

### Layout
- **Max Width:** 600px (email-safe)
- **Responsive:** Mobile-friendly breakpoints
- **Sections:** Clearly separated with backgrounds and borders

---

## 📱 Mobile Responsive

Both templates are fully responsive and will look great on:
- ✅ Desktop email clients (Outlook, Thunderbird, etc.)
- ✅ Web email (Gmail, Yahoo, Outlook.com)
- ✅ Mobile devices (iOS Mail, Gmail app, etc.)

---

## 🧪 Testing Templates

### Test in EmailJS Dashboard

1. Open your template in EmailJS
2. Click "Test It" button
3. Fill in sample data for all variables
4. Send test email to yourself
5. Check how it looks in your email client

### Test Variables

**For Booking Template:**
```
guestName: John Doe
guestEmail: john@example.com
guestPhone: +91 98765 43210
checkIn: 15 January 2025
checkOut: 18 January 2025
nights: 3
adults: 2
children: 1
roomsList: 1. Royal's Chamber (Deluxe) - Double Occupancy - ₹7,000
roomCount: 1
specialRequests: Early check-in if possible
roomTotal: ₹21,000
taxes: ₹1,050
totalAmount: ₹22,050
bookingDate: 10 January 2025, 10:30 AM
```

**For Reservation Template:**
```
customerName: Jane Smith
customerPhone: +91 98765 43210
reservationDate: 20 January 2025
reservationTime: 7:30 PM
guestCount: 4
itemsList: 1. Beef With Onion x2 - ₹840
2. Amritha Roast Chicken x1 - ₹450
totalItems: 3
totalAmount: ₹1,290
submissionDate: 15 January 2025, 2:45 PM
```

---

## 🔧 Customization

### Changing Colors

Find and replace color codes in the HTML:
- `#8B7355` → Your primary color
- `#6B5344` → Your secondary color
- `#D4AF37` → Your accent color

### Changing Logo/Branding

Update the footer section:
```html
<div class="footer-logo">Your Hotel Name</div>
```

### Adding Images

To add images (like logo), use absolute URLs:
```html
<img src="https://yourdomain.com/logo.png" alt="Logo" style="max-width: 200px;">
```

### Modifying Content

Edit the HTML directly to:
- Add/remove sections
- Change text content
- Modify layout
- Add more information

---

## ⚠️ Important Notes

### Email Client Compatibility

These templates are designed to work with most email clients, but:
- Some advanced CSS may not work in older Outlook versions
- Always test in multiple email clients
- Keep layouts simple for best compatibility

### Variable Names

- Variable names are **case-sensitive**
- Must match exactly between template and code
- Use double curly braces: `{{variableName}}`

### File Size

- Keep HTML under 100KB for best deliverability
- Optimize images if you add them
- Avoid large embedded files

---

## 📊 Template Structure

```
┌─────────────────────────────────────┐
│           HEADER                     │
│  (Gradient background, title)        │
├─────────────────────────────────────┤
│           CONTENT                    │
│  ├─ Greeting                        │
│  ├─ Intro text                      │
│  ├─ Details box                     │
│  ├─ Items/Rooms list                │
│  ├─ Total section                   │
│  ├─ Info boxes                      │
│  ├─ Contact buttons                 │
│  └─ Additional info                 │
├─────────────────────────────────────┤
│           FOOTER                     │
│  (Contact info, disclaimer)          │
└─────────────────────────────────────┘
```

---

## 🎯 Best Practices

1. **Test Thoroughly:** Always test emails before going live
2. **Keep It Simple:** Don't overcomplicate the design
3. **Mobile First:** Check mobile view first
4. **Clear CTAs:** Make contact buttons prominent
5. **Readable Text:** Use good contrast and font sizes
6. **Professional Tone:** Maintain brand voice
7. **Include Contact:** Always provide contact information

---

## 📞 Support

If you need help with these templates:
1. Check EmailJS documentation: https://www.emailjs.com/docs/
2. Test in EmailJS template tester
3. Verify all variables are correctly mapped
4. Check browser console for errors

---

## ✅ Checklist

Before using templates in production:

- [ ] Copied HTML to EmailJS
- [ ] Saved template and got Template ID
- [ ] Updated `emailService.ts` with Template ID
- [ ] Tested with sample data in EmailJS
- [ ] Sent test email to yourself
- [ ] Checked email on desktop
- [ ] Checked email on mobile
- [ ] Verified all variables display correctly
- [ ] Confirmed links work (phone, email)
- [ ] Reviewed content for accuracy
- [ ] Got approval from stakeholders

---

**Templates created for Amritha Heritage**
**Last updated:** January 2025
