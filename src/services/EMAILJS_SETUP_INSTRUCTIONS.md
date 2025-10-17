# 📧 EmailJS Setup Instructions for Amritha Heritage

## Step 1: Create EmailJS Account

1. Go to [https://www.emailjs.com/](https://www.emailjs.com/)
2. Click "Sign Up" and create a free account
3. Verify your email address

## Step 2: Add Email Service

1. In your EmailJS dashboard, click "Email Services"
2. Click "Add New Service"
3. Choose your email provider (Gmail, Outlook, etc.)
4. Follow the setup instructions for your provider
5. **Copy the Service ID** - you'll need this later

## Step 3: Create Email Template

1. In your EmailJS dashboard, click "Email Templates"
2. Click "Create New Template"
3. **Template Name**: `Amritha Heritage - New Reservation`
4. **Subject Line**: 
   ```
   🏛️ New Reservation - {{customer_name}} - {{reservation_date}}
   ```

5. **Template Content**: 
   - Copy the entire HTML content from `emailjs-template-setup.html`
   - Paste it into the "Content" section of your EmailJS template
   - Make sure to select "HTML" format, not plain text

6. **Template Variables** (these are automatically filled by our code):
   - `{{customer_name}}`
   - `{{customer_phone}}`
   - `{{reservation_date}}`
   - `{{reservation_time}}`
   - `{{guest_count}}`
   - `{{ordered_items}}`
   - `{{total_amount}}`
   - `{{admin_email}}`
   - `{{current_datetime}}`

7. Click "Save" and **copy the Template ID**

## Step 4: Get Public Key

1. In your EmailJS dashboard, go to "Account" → "General"
2. Find your **Public Key** and copy it

## Step 5: Update Environment Variables

Update your `.env` file with the actual values:

```env
# EmailJS Configuration for Admin Notifications
VITE_EMAILJS_SERVICE_ID=service_xxxxxxx
VITE_EMAILJS_TEMPLATE_ID=template_xxxxxxx
VITE_EMAILJS_PUBLIC_KEY=your_public_key_here
```

**Replace:**
- `service_xxxxxxx` with your actual Service ID
- `template_xxxxxxx` with your actual Template ID  
- `your_public_key_here` with your actual Public Key

## Step 6: Test the Setup

1. Save your `.env` file
2. Restart your development server:
   ```bash
   npm run dev
   ```
3. Go to your website and make a test reservation
4. Check your email inbox for the notification

## Step 7: Configure Admin Email

In the EmailJS template, make sure to set the recipient email address to where you want to receive notifications.

## Troubleshooting

### Common Issues:

1. **Emails not sending:**
   - Check that all environment variables are correct
   - Verify your email service is properly connected in EmailJS
   - Check browser console for error messages

2. **Template variables not showing:**
   - Make sure variable names match exactly (case-sensitive)
   - Verify the template is saved in EmailJS dashboard

3. **Emails going to spam:**
   - Add your domain to EmailJS allowed origins
   - Consider using a custom domain email service

### Testing Tips:

- Use your own email for testing first
- Check both inbox and spam folders
- Test with different reservation scenarios
- Verify all template variables are populated correctly

## Security Notes

- Never commit your actual EmailJS credentials to version control
- Keep your `.env` file in `.gitignore`
- Use environment variables for all sensitive data
- Consider rate limiting for production use

## Template Features

✅ **Professional Design**: Branded with Amritha Heritage colors  
✅ **Mobile Responsive**: Looks great on all devices  
✅ **Complete Information**: All reservation and order details  
✅ **Action Prompts**: Clear next steps for admin  
✅ **Contact Integration**: Easy customer contact options  
✅ **Timestamp**: When the reservation was made  

Your email notifications will now be professional, informative, and actionable!