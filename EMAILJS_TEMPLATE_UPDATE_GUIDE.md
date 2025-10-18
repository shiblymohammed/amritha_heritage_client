# 📧 EmailJS Template Update Guide

## 🚨 CRITICAL: Add Recipient Email Field

Your EmailJS template is missing the recipient email field. Follow these exact steps:

## 📋 Step-by-Step Instructions

### 1. **Login to EmailJS Dashboard**
   - Go to: https://www.emailjs.com/
   - Login to your account

### 2. **Navigate to Your Template**
   - Click on **"Email Templates"** in the sidebar
   - Find template: `template_0gb7w5k`
   - Click **"Edit"** button

### 3. **🎯 CRITICAL: Update the "To" Field**
   ```
   Current "To" field: (probably empty or hardcoded email)
   
   ✅ Change it to: {{to_email}}
   ```

### 4. **Verify Template Settings**
   - **Template ID:** `template_0gb7w5k`
   - **Template Name:** New Reservation Notification
   - **To:** `{{to_email}}` ← **THIS IS CRITICAL**
   - **Subject:** `New Reservation - {{customer_name}}`

### 5. **Template Variables Required**
   Make sure your template includes these variables:
   ```
   {{to_email}}           ← Recipient email (CRITICAL)
   {{customer_name}}      ← Customer name
   {{customer_phone}}     ← Customer phone
   {{reservation_date}}   ← Reservation date
   {{reservation_time}}   ← Reservation time
   {{guest_count}}        ← Number of guests
   {{ordered_items}}      ← List of ordered items
   {{total_amount}}       ← Total amount
   {{admin_email}}        ← Admin contact email
   {{current_datetime}}   ← Current date/time
   ```

### 6. **Save Template**
   - Click **"Save"** button
   - Wait for confirmation message

## 🧪 Test After Update

After updating the template, test with this console code:

```javascript
// Test with updated template
const SERVICE_ID = 'service_klu49f8';
const TEMPLATE_ID = 'template_0gb7w5k';
const PUBLIC_KEY = 'asyiqNIOeobdCBLOA';

emailjs.init(PUBLIC_KEY);

const testData = {
  to_email: 'admin@amrithaheritage.com',
  customer_name: 'Test Customer',
  customer_phone: '+91 9876543210',
  reservation_date: '15/01/2024',
  reservation_time: '7:00 PM',
  guest_count: '4',
  ordered_items: '• Test Item x1 - ₹500',
  total_amount: '₹500',
  admin_email: 'admin@amrithaheritage.com',
  current_datetime: new Date().toLocaleString()
};

emailjs.send(SERVICE_ID, TEMPLATE_ID, testData)
  .then(response => {
    console.log('✅ SUCCESS:', response);
    alert('✅ Email sent successfully!');
  })
  .catch(error => {
    console.error('❌ FAILED:', error);
    alert('❌ Email failed: ' + (error.text || error.message));
  });
```

## 🔍 Common Issues

1. **"To" field is empty** → Add `{{to_email}}`
2. **Template not saved** → Click Save button
3. **Wrong template ID** → Verify `template_0gb7w5k`
4. **Service not connected** → Check email service settings

## 📞 Need Help?

If you're still having issues:
1. Screenshot your EmailJS template settings
2. Check the "To" field specifically
3. Verify all template variables are present