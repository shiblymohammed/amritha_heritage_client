# EmailJS Troubleshooting Guide

## Current Issue: Emails Not Sending

The EmailJS integration is failing to send emails. Here's how to diagnose and fix the issue:

## Step 1: Check Environment Variables

Your `.env` file currently has these values:
```
VITE_EMAILJS_SERVICE_ID=service_klu49f8
VITE_EMAILJS_TEMPLATE_ID=template_0gb7w5k
VITE_EMAILJS_PUBLIC_KEY=asyiqNIOeobdCBLOA
```

**These are likely placeholder/invalid values!** You need to:

1. **Create EmailJS Account**: Go to https://www.emailjs.com/
2. **Create a Service**: Add an email service (Gmail, Outlook, etc.)
3. **Create a Template**: Use the template from `src/services/emailjs-template-setup.html`
4. **Get Real Credentials**: Replace the placeholder values with actual ones

## Step 2: Create EmailJS Service

1. Go to https://dashboard.emailjs.com/admin
2. Click "Add New Service"
3. Choose your email provider (Gmail recommended)
4. Follow the setup instructions
5. Copy the **Service ID** (starts with `service_`)

## Step 3: Create EmailJS Template

1. Go to "Email Templates" in EmailJS dashboard
2. Click "Create New Template"
3. Use this template content:

**Subject:** `New Reservation - {{customer_name}} - {{reservation_date}}`

**Content:** Copy from `src/services/emailjs-template-setup.html`

**Template Variables:**
- `customer_name`
- `customer_phone`
- `reservation_date`
- `reservation_time`
- `guest_count`
- `ordered_items`
- `total_amount`
- `admin_email`
- `current_datetime`

4. Save and copy the **Template ID** (starts with `template_`)

## Step 4: Get Public Key

1. Go to "Account" → "General" in EmailJS dashboard
2. Copy your **Public Key**

## Step 5: Update .env File

Replace the placeholder values in `.env`:
```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Step 6: Test Again

1. Restart your development server
2. Make a test reservation
3. Check browser console for detailed error messages
4. Check EmailJS dashboard for send history

## Common Error Messages

- **"Missing environment variables"**: Your .env values aren't loading
- **"Service or template not found (404)"**: Invalid service/template IDs
- **"Unauthorized (401)"**: Invalid public key
- **"Bad request (400)"**: Template variable mismatch

## Quick Test

You can test EmailJS directly in browser console:
```javascript
emailjs.send('your_service_id', 'your_template_id', {
  customer_name: 'Test User',
  customer_phone: '1234567890',
  reservation_date: '2024-01-15',
  reservation_time: '7:00 PM',
  guest_count: 2,
  ordered_items: 'Test Item x1 - ₹500',
  total_amount: '₹500',
  admin_email: 'admin@amrithaheritage.com',
  current_datetime: new Date().toLocaleString()
});
```

## Need Help?

If you're still having issues:
1. Check the browser console for specific error messages
2. Verify your EmailJS account is active
3. Make sure your email service is properly configured
4. Check if you've exceeded free tier limits (200 emails/month)