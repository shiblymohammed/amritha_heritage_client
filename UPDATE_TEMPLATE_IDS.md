# 🔧 How to Update Template IDs

## 📍 Location

**File:** `amritha_heritage_client/src/services/emailService.ts`

**Lines:** 10-14

---

## 🎯 What to Update

```typescript
const TEMPLATES = {
  CONTACT: 'template_lxili2s',              // ✅ Keep this (already working)
  BOOKING: 'YOUR_BOOKING_TEMPLATE_ID',      // 🔧 UPDATE THIS
  RESERVATION: 'YOUR_RESERVATION_TEMPLATE_ID' // 🔧 UPDATE THIS
};
```

---

## 📋 Step-by-Step Process

### Step 1: Create Booking Template in EmailJS

1. Go to https://dashboard.emailjs.com/
2. Click "Email Templates"
3. Click "Create New Template"
4. Copy HTML from `EMAILJS_SETUP_GUIDE.md` (Template 2)
5. **Copy the Template ID** (e.g., `template_abc123`)
6. Save template

### Step 2: Update Booking Template ID

Open `src/services/emailService.ts` and replace:

```typescript
BOOKING: 'YOUR_BOOKING_TEMPLATE_ID',  // Replace with actual ID
```

With:

```typescript
BOOKING: 'template_abc123',  // Your actual template ID from EmailJS
```

### Step 3: Create Reservation Template in EmailJS

1. Click "Create New Template" again
2. Copy HTML from `EMAILJS_SETUP_GUIDE.md` (Template 3)
3. **Copy the Template ID** (e.g., `template_xyz789`)
4. Save template

### Step 4: Update Reservation Template ID

In the same file, replace:

```typescript
RESERVATION: 'YOUR_RESERVATION_TEMPLATE_ID'  // Replace with actual ID
```

With:

```typescript
RESERVATION: 'template_xyz789'  // Your actual template ID from EmailJS
```

---

## ✅ Final Result

After updating, your TEMPLATES object should look like:

```typescript
const TEMPLATES = {
  CONTACT: 'template_lxili2s',      // ✅ Existing (working)
  BOOKING: 'template_abc123',       // ✅ Your booking template ID
  RESERVATION: 'template_xyz789'    // ✅ Your reservation template ID
};
```

---

## 🔍 Where to Find Template IDs in EmailJS

1. Log into EmailJS dashboard
2. Go to "Email Templates"
3. You'll see a list of templates
4. Each template shows its ID below the name
5. Copy the ID (format: `template_xxxxxxx`)

**Example:**
```
Template Name: Room Booking Confirmation
Template ID: template_h8k2m9p  ← Copy this
```

---

## ⚠️ Important Notes

1. **Case Sensitive** - Template IDs are case-sensitive
2. **No Spaces** - Don't add spaces around the ID
3. **Keep Quotes** - Keep the single quotes around the ID
4. **Save File** - Save the file after updating
5. **Restart Dev Server** - Restart your dev server if running

---

## 🧪 Testing After Update

1. **Test Booking:**
   - Go to Booking page
   - Fill form and submit
   - Check console for errors
   - Check email inbox

2. **Test Reservation:**
   - Go to Dining page
   - Add items to cart
   - Fill reservation form
   - Submit
   - Check email inbox

---

## 🐛 Troubleshooting

### Error: "Template not found"
- **Cause:** Template ID doesn't match
- **Fix:** Double-check the ID in EmailJS dashboard
- **Fix:** Ensure no typos in `emailService.ts`

### Error: "Invalid template"
- **Cause:** Template not published/saved
- **Fix:** Go to EmailJS and save the template
- **Fix:** Ensure template is active

### No email received
- **Cause:** Wrong template ID
- **Fix:** Verify ID matches exactly
- **Fix:** Check EmailJS dashboard for errors

---

## 📞 Need Help?

1. Check EmailJS dashboard for template IDs
2. Look at browser console for error messages
3. Verify template IDs match exactly
4. Test templates in EmailJS dashboard first

---

## ✨ Quick Reference

| Email Type | Current ID | Update To |
|------------|------------|-----------|
| Contact | `template_lxili2s` | ✅ Keep as is |
| Booking | `YOUR_BOOKING_TEMPLATE_ID` | 🔧 Your booking template ID |
| Reservation | `YOUR_RESERVATION_TEMPLATE_ID` | 🔧 Your reservation template ID |

**File to edit:** `src/services/emailService.ts` (lines 10-14)

---

**That's it! Just update those 2 template IDs and you're done! 🎉**
