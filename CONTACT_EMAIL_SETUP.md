# 📧 Contact Form Email Setup (Separate EmailJS Account)

## Overview

The contact form uses a **separate EmailJS account** with its own service ID, public key, and template. This allows you to have 3 templates total across 2 EmailJS accounts:

- **Account 1** (Main): Booking + Reservation templates
- **Account 2** (Contact): Contact form template

---

## 📁 Files Structure

```
src/services/
├── emailService.ts       ← Main account (Booking + Reservation)
└── emailService2.ts      ← Contact account (Contact form only)
```

---

## 🔧 Setup Instructions

### Step 1: Create Second EmailJS Account

1. Go to https://www.emailjs.com/
2. Sign up with a **different email address** (or use same email if allowed)
3. Create a new service
4. Note down:
   - Service ID (e.g., `service_contact123`)
   - Public Key (e.g., `abc123xyz`)

### Step 2: Create Contact Template

1. In your second EmailJS account, go to "Email Templates"
2. Click "Create New Template"
3. Name it: "Contact Form Submission"
4. Use the template HTML below
5. Save and copy the Template ID (e.g., `template_contact456`)

### Step 3: Update emailService2.ts

Open `src/services/emailService2.ts` and update these lines:

```typescript
const SERVICE_ID = 'service_contact123';      // Your second service ID
const PUBLIC_KEY = 'abc123xyz';               // Your second public key
const CONTACT_TEMPLATE_ID = 'template_contact456'; // Your contact template ID
```

### Step 4: Test

1. Go to Contact page
2. Fill out the form
3. Submit
4. Check email inbox

---

## 📧 Contact Form Email Template

### Template HTML

**Location:** `src/templates/contact-email-template.html`

**To Use:**
1. Open `src/templates/contact-email-template.html`
2. Copy all content (Ctrl+A, Ctrl+C)
3. Paste into EmailJS template editor
4. Save

**Features:**
- ✅ Amritha Heritage branding (green, brown, gold colors)
- ✅ Logo placeholder (replace with your logo URL)
- ✅ Mobile responsive design
- ✅ Admin-focused layout
- ✅ 4 action buttons (Call, Email, WhatsApp, SMS)
- ✅ Special occasion highlighted
- ✅ Message content formatted
- ✅ Action checklist included

**Preview:** (Simplified version below)

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>New Contact Form Submission - Amritha Heritage</title>
    <style>
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
        }
        
        body {
            font-family: 'Georgia', 'Cormorant Garamond', serif;
            color: #435547;
            line-height: 1.7;
            background-color: #FBF9F6;
        }
        
        .email-container {
            max-width: 700px;
            margin: 0 auto;
            background-color: #ffffff;
        }
        
        .header {
            background: linear-gradient(135deg, #3A4A3E 0%, #435547 100%);
            color: #FBF9F6;
            padding: 40px 30px;
            text-align: center;
            border-bottom: 4px solid #DAA520;
        }
        
        .header h1 {
            font-family: 'Cinzel', 'Georgia', serif;
            font-size: 28px;
            margin-bottom: 10px;
            font-weight: 600;
        }
        
        .header .subtitle {
            font-family: 'Poppins', sans-serif;
            font-size: 13px;
            opacity: 0.95;
            text-transform: uppercase;
            letter-spacing: 2px;
        }
        
        .alert-banner {
            background: linear-gradient(135deg, #DAA520 0%, #B8860B 100%);
            color: #FBF9F6;
            padding: 18px 30px;
            text-align: center;
            font-weight: bold;
            font-size: 16px;
        }
        
        .content {
            padding: 35px 30px;
        }
        
        .section-title {
            background: #F5F0E6;
            padding: 14px 20px;
            margin: 30px -30px 25px -30px;
            border-left: 5px solid #A57156;
            font-size: 18px;
            font-weight: bold;
            color: #3A4A3E;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .info-box {
            background: linear-gradient(135deg, #F5F0E6 0%, #EDE8DA 100%);
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
            border: 2px solid #DCD7C9;
        }
        
        .info-row {
            display: flex;
            justify-content: space-between;
            padding: 12px 0;
            border-bottom: 1px solid #DCD7C9;
        }
        
        .info-row:last-child {
            border-bottom: none;
        }
        
        .info-label {
            font-weight: 600;
            color: #5A594D;
            font-size: 14px;
        }
        
        .info-value {
            color: #435547;
            font-size: 14px;
            font-weight: 600;
        }
        
        .message-box {
            background: #ffffff;
            border: 2px solid #A57156;
            padding: 25px;
            border-radius: 12px;
            margin-bottom: 25px;
        }
        
        .message-box h3 {
            color: #3A4A3E;
            font-size: 17px;
            margin-bottom: 15px;
            text-transform: uppercase;
            letter-spacing: 1px;
        }
        
        .message-content {
            color: #435547;
            font-size: 15px;
            line-height: 1.8;
            white-space: pre-wrap;
        }
        
        .action-buttons {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 15px;
            margin: 30px 0;
        }
        
        .action-button {
            display: block;
            padding: 16px 25px;
            text-align: center;
            text-decoration: none;
            border-radius: 10px;
            font-weight: bold;
            font-size: 14px;
            transition: all 0.3s ease;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
        
        .action-button.call {
            background: linear-gradient(135deg, #3A4A3E 0%, #435547 100%);
            color: #FBF9F6;
        }
        
        .action-button.email {
            background: linear-gradient(135deg, #A57156 0%, #8D7555 100%);
            color: #FBF9F6;
        }
        
        .footer {
            background: linear-gradient(135deg, #3A4A3E 0%, #2C3E50 100%);
            color: #FBF9F6;
            text-align: center;
            padding: 30px;
        }
        
        .footer-title {
            font-size: 20px;
            font-weight: bold;
            margin-bottom: 12px;
            color: #DAA520;
        }
        
        .timestamp {
            background: #435547;
            color: #DCD7C9;
            padding: 16px;
            text-align: center;
            font-size: 12px;
            font-family: 'Courier New', monospace;
        }
        
        @media only screen and (max-width: 600px) {
            .content {
                padding: 25px 15px !important;
            }
            
            .section-title {
                margin-left: -15px !important;
                margin-right: -15px !important;
            }
            
            .action-buttons {
                grid-template-columns: 1fr !important;
            }
            
            .info-row {
                flex-direction: column;
                gap: 5px;
            }
        }
    </style>
</head>
<body>
    <div class="email-container">
        <div class="header">
            <h1>📬 NEW CONTACT FORM SUBMISSION</h1>
            <div class="subtitle">Amritha Heritage - Contact Inquiry</div>
        </div>
        
        <div class="alert-banner">
            ⚡ NEW INQUIRY - Response needed
        </div>
        
        <div class="content">
            <div class="section-title">👤 Contact Information</div>
            <div class="info-box">
                <div class="info-row">
                    <span class="info-label">Full Name:</span>
                    <span class="info-value">{{fullName}}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Email Address:</span>
                    <span class="info-value">{{email}}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Phone Number:</span>
                    <span class="info-value">{{contactNumber}}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Special Occasion:</span>
                    <span class="info-value">{{specialOccasion}}</span>
                </div>
                
                <div class="info-row">
                    <span class="info-label">Submitted On:</span>
                    <span class="info-value">{{submissionDate}}</span>
                </div>
            </div>
            
            <div class="action-buttons">
                <a href="tel:{{contactNumber}}" class="action-button call">
                    📞 Call Customer
                </a>
                <a href="mailto:{{email}}" class="action-button email">
                    ✉️ Reply via Email
                </a>
            </div>
            
            <div class="section-title">💬 Message</div>
            <div class="message-box">
                <h3>Customer Message</h3>
                <div class="message-content">{{message}}</div>
            </div>
        </div>
        
        <div class="timestamp">
            Inquiry received on: {{submissionDate}} | System: Amritha Heritage Contact Form
        </div>
        
        <div class="footer">
            <div class="footer-title">Amritha Heritage</div>
            <div style="font-size: 13px; line-height: 1.9; opacity: 0.9;">
                This is an automated notification for contact form submissions.<br>
                Please respond to the customer within 24 hours.<br>
                <br>
                Thycaud, Thiruvananthapuram – 695014, Kerala, India<br>
                📞 +91 96335 55199 | ✉️ info@amrithaheritage.com
            </div>
        </div>
    </div>
</body>
</html>
```

### Template Variables

Make sure these variables are configured in EmailJS:

- `{{fullName}}` - Customer's full name
- `{{email}}` - Customer's email address
- `{{contactNumber}}` - Customer's phone number
- `{{message}}` - Customer's message
- `{{specialOccasion}}` - Special occasion (if any)
- `{{submissionDate}}` - Date and time of submission

---

## 🔍 How It Works

### File: `emailService2.ts`

```typescript
// Separate configuration for contact form
const SERVICE_ID = 'YOUR_CONTACT_SERVICE_ID';
const PUBLIC_KEY = 'YOUR_CONTACT_PUBLIC_KEY';
const CONTACT_TEMPLATE_ID = 'YOUR_CONTACT_TEMPLATE_ID';

// Dedicated function for contact emails
export const sendContactEmail = async (formData) => {
  // Sends email using second EmailJS account
};
```

### File: `Contact.tsx`

```typescript
// Imports from emailService2 instead of emailService
import { sendContactEmail, initContactEmailJS } from "../../services/emailService2";

// Uses the separate service
useEffect(() => {
  initContactEmailJS(); // Initializes second account
}, []);
```

---

## 📊 Email Accounts Summary

| Account | Service | Templates | File |
|---------|---------|-----------|------|
| **Account 1** | Main | Booking, Reservation | `emailService.ts` |
| **Account 2** | Contact | Contact Form | `emailService2.ts` |

---

## ✅ Setup Checklist

### Account 2 Setup
- [ ] Create second EmailJS account
- [ ] Create new service
- [ ] Copy Service ID
- [ ] Copy Public Key
- [ ] Create contact template
- [ ] Copy Template ID

### Code Update
- [ ] Update `emailService2.ts` with credentials
- [ ] Verify `Contact.tsx` imports from `emailService2`
- [ ] Test contact form submission

### Testing
- [ ] Fill out contact form
- [ ] Submit form
- [ ] Check email received
- [ ] Verify all fields display correctly
- [ ] Test on mobile

---

## 🐛 Troubleshooting

### "Template not found" error
- **Fix:** Verify Template ID in `emailService2.ts` matches EmailJS dashboard
- **Fix:** Ensure you're using the correct EmailJS account

### Email not received
- **Fix:** Check spam folder
- **Fix:** Verify Service ID and Public Key are correct
- **Fix:** Check EmailJS dashboard for errors
- **Fix:** Verify quota not exceeded (200 emails/month free)

### Wrong account being used
- **Fix:** Ensure `Contact.tsx` imports from `emailService2`, not `emailService`
- **Fix:** Clear browser cache and reload

---

## 💡 Why Separate Accounts?

**EmailJS Free Tier Limitation:**
- Free tier allows only 2 email templates per account
- You need 3 templates total:
  1. Booking confirmation
  2. Dining reservation
  3. Contact form

**Solution:**
- Account 1: Booking + Reservation (2 templates)
- Account 2: Contact form (1 template)
- Total: 3 templates across 2 free accounts

---

## 🎯 Benefits

✅ **No Template Limit** - Use as many templates as needed
✅ **Separate Quotas** - 200 emails/month per account = 400 total
✅ **Isolated Services** - Contact form issues won't affect bookings
✅ **Easy Management** - Clear separation of concerns
✅ **Cost Effective** - Both accounts can be free tier

---

## 📞 Support

**EmailJS Issues:**
- Dashboard: https://dashboard.emailjs.com/
- Docs: https://www.emailjs.com/docs/

**Code Issues:**
- Check console logs for errors
- Verify all credentials are correct
- Test in EmailJS dashboard first

---

**Your contact form is now set up with a separate EmailJS account! 🎉**
