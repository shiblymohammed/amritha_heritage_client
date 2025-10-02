# 🚀 Quick Start - EmailJS Setup

## What You Need to Do Right Now

### Step 1: Log into EmailJS
1. Go to https://dashboard.emailjs.com/
2. Log in with your account
3. Select your service: `service_arz46ex`

---

### Step 2: Create Booking Template

1. Click **"Email Templates"** in sidebar
2. Click **"Create New Template"**
3. Set Template ID: `template_booking_new`
4. Copy the HTML from `EMAILJS_SETUP_GUIDE.md` (Template 2)
5. Click **"Save"**

**Quick Test:**
- Click "Test It" button
- Fill in sample data
- Send test email
- Check your inbox

---

### Step 3: Create Reservation Template

1. Click **"Create New Template"** again
2. Set Template ID: `template_reservation_new`
3. Copy the HTML from `EMAILJS_SETUP_GUIDE.md` (Template 3)
4. Click **"Save"**

**Quick Test:**
- Click "Test It" button
- Fill in sample data
- Send test email
- Check your inbox

---

### Step 4: Test Your Application

**Test Booking:**
1. Open your app
2. Go to Booking page
3. Fill in all fields
4. Select a room
5. Click "Confirm Heritage Booking"
6. Check email inbox

**Test Reservation:**
1. Go to Dining page
2. Add items to cart
3. Click cart at bottom
4. Fill in reservation details
5. Click "Reserve Table"
6. Check email inbox

---

## ⚠️ Common Issues

### "Template not found" error
- **Fix:** Check template ID spelling exactly matches
- Booking: `template_booking_new`
- Reservation: `template_reservation_new`

### Email not received
- **Fix:** Check spam folder
- **Fix:** Verify EmailJS quota (200/month free)
- **Fix:** Check EmailJS dashboard for errors

### Variables not showing in email
- **Fix:** Ensure variable names match exactly (case-sensitive)
- **Fix:** Use double curly braces: `{{variableName}}`

---

## 📋 Template IDs Reference

| Email Type | Template ID | Status |
|------------|-------------|--------|
| Contact Form | `template_lxili2s` | ✅ Working |
| Room Booking | `template_booking_new` | 🔧 Create This |
| Dining Reservation | `template_reservation_new` | 🔧 Create This |

---

## 🎯 Success Checklist

- [ ] Logged into EmailJS dashboard
- [ ] Created `template_booking_new`
- [ ] Created `template_reservation_new`
- [ ] Tested booking email
- [ ] Tested reservation email
- [ ] Verified emails look good
- [ ] Checked spam folders
- [ ] Tested on mobile

---

## 📞 Need Help?

1. **Read Full Guide:** `EMAILJS_SETUP_GUIDE.md`
2. **Check Changes:** `BOOKING_EMAIL_CHANGES.md`
3. **View Status:** `IMPLEMENTATION_COMPLETE.md`
4. **EmailJS Docs:** https://www.emailjs.com/docs/

---

## ⏱️ Time Estimate

- Creating templates: **15-20 minutes**
- Testing: **10 minutes**
- **Total: ~30 minutes**

---

## 🎉 You're Done When...

✅ Booking form sends email successfully
✅ Reservation form sends email successfully
✅ Emails look professional
✅ No console errors

**That's it! Your email system is ready to go! 🚀**
