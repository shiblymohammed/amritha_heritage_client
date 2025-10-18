# Contact Form EmailJS Setup Guide

This guide will help you set up the EmailJS template for the contact form functionality that works for both the contact page and the home page contact section.

## 📋 Prerequisites

- EmailJS account (same as used for reservations)
- Access to your EmailJS dashboard
- The contact form email template HTML file

## 🚀 Step 1: Create EmailJS Template

1. **Login to EmailJS Dashboard**
   - Go to [EmailJS Dashboard](https://dashboard.emailjs.com/)
   - Navigate to your existing service (the same one used for reservations)

2. **Create New Template**
   - Click on "Email Templates" in the sidebar
   - Click "Create New Template"
   - Give it a name like "Contact Form Notifications"

3. **Configure Template Settings**
   - **To Email**: `{{admin_email}}` (or your admin email directly)
   - **From Name**: `{{from_name}}`
   - **From Email**: `{{from_email}}`
   - **Reply To**: `{{reply_to}}`
   - **Subject**: `New Contact Form Submission: {{subject}}`

4. **Template Content**
   - Copy the HTML content from `CONTACT_FORM_EMAIL_TEMPLATE.html`
   - Paste it into the template editor
   - Save the template

5. **Get Template ID**
   - Copy the template ID (e.g., `template_xyz123`)
   - You'll need this for the environment variables

## 🔧 Step 2: Update Environment Variables

Update your `.env` file with the contact form template ID:

```env
# Contact Form EmailJS Configuration
VITE_CONTACT_EMAILJS_TEMPLATE_ID=your_contact_template_id_here
```

**Example:**
```env
VITE_CONTACT_EMAILJS_TEMPLATE_ID=template_abc123
```

## 📧 Step 3: Template Variables Reference

The contact form uses these template variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `{{from_name}}` | Customer's name | "John Doe" |
| `{{from_email}}` | Customer's email | "john@example.com" |
| `{{from_phone}}` | Customer's phone | "+91 9876543210" |
| `{{subject}}` | Contact subject/topic | "General Inquiry" |
| `{{message}}` | Customer's message | "I would like to..." |
| `{{admin_email}}` | Admin notification email | "admin@amrithaheritage.com" |
| `{{reply_to}}` | Reply-to email | Same as from_email |
| `{{current_datetime}}` | Submission timestamp | "2024-01-15 14:30:25" |

## 🧪 Step 4: Test the Setup

### Method 1: Browser Console Test

1. **Open your website** in the browser
2. **Open Developer Tools** (F12)
3. **Go to Console tab**
4. **Run this test script:**

```javascript
// Test Contact Form Email
import { sendContactFormEmail } from './src/services/emailService.js';

const testContactData = {
  name: "Test User",
  email: "test@example.com", 
  phone: "+91 9876543210",
  subject: "Test Contact Form",
  message: "This is a test message from the contact form setup."
};

sendContactFormEmail(testContactData)
  .then(result => {
    if (result) {
      console.log("✅ Contact form email sent successfully!");
    } else {
      console.log("❌ Contact form email failed to send");
    }
  })
  .catch(error => {
    console.error("❌ Error:", error);
  });
```

### Method 2: Use the Contact Forms

1. **Test Contact Page Form:**
   - Go to `/contact` page
   - Fill out the contact form
   - Submit and check for success message

2. **Test Home Page Contact Section:**
   - Go to home page
   - Scroll to contact section
   - Fill out the form and submit

## 🔍 Step 5: Verify Email Delivery

1. **Check Admin Email Inbox**
   - Look for emails with subject: "New Contact Form Submission: [Subject]"
   - Verify all customer details are included
   - Check that reply-to is set to customer's email

2. **Verify Template Variables**
   - Customer name, email, phone should display correctly
   - Message content should be formatted properly
   - Timestamp should show submission time

## 🛠️ Troubleshooting

### Common Issues:

1. **Template ID Error (404)**
   - Verify `VITE_CONTACT_EMAILJS_TEMPLATE_ID` in `.env`
   - Check template ID in EmailJS dashboard
   - Restart development server after `.env` changes

2. **Template Variable Mismatch (422)**
   - Ensure all variables in template match the ones sent from code
   - Check for typos in variable names (case-sensitive)

3. **Service/Public Key Issues**
   - Uses same service and public key as reservation system
   - Verify these are correctly set in `.env`

4. **Form Validation Issues**
   - Contact page: All fields except "Special Occasion" are required
   - Home page: Name, email, and message are required
   - Phone is optional for home page contact

### Debug Steps:

1. **Check Browser Console** for error messages
2. **Verify Environment Variables** are loaded correctly
3. **Test EmailJS Service** with a simple test first
4. **Check Network Tab** for failed API calls

## 📱 Features

### Contact Page Form:
- Full name, email, contact number (all required)
- Special occasion (optional dropdown)
- Message (required)
- Form validation and loading states
- Success/error feedback

### Home Page Contact Section:
- Name, email, message (all required)
- Phone is optional (empty string sent)
- Subject defaults to "Contact from Home Page"
- Loading states and form reset

## 🎯 Next Steps

After successful setup:

1. **Customize Email Template** styling if needed
2. **Set up Email Filters** in your admin inbox
3. **Configure Auto-Responses** (optional)
4. **Monitor Email Delivery** and response times

## 📞 Support

If you encounter issues:
1. Check the browser console for error messages
2. Verify all environment variables are set correctly
3. Test with the EmailJS dashboard test feature
4. Ensure your EmailJS service has sufficient quota

---

**Note:** This contact form system uses the same EmailJS service as your reservation system but with a separate template for better organization and customization.