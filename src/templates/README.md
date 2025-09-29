# Setting Up EmailJS for Contact Form

This guide will help you set up EmailJS to send emails from your contact form.

## Step 1: Create an EmailJS Account

1. Go to [EmailJS](https://www.emailjs.com/) and sign up for an account.
2. After signing up, log in to your dashboard.

## Step 2: Add an Email Service

1. In your EmailJS dashboard, go to "Email Services" and click "Add New Service".
2. Choose your email provider (Gmail, Outlook, etc.) and follow the instructions to connect your email account.
3. Give your service a name (e.g., "Amritha Heritage Contact") and save it.
4. Note down the Service ID for later use.

## Step 3: Create an Email Template

1. In your EmailJS dashboard, go to "Email Templates" and click "Create New Template".
2. Give your template a name (e.g., "Contact Form Template").
3. Design your email template using the EmailJS template editor.
   - You can use the HTML template provided in `contact-email-template.html` as a reference.
   - Make sure to use the correct variable names in your template:
     - `{{fullName}}` - The user's full name
     - `{{email}}` - The user's email address
     - `{{contactNumber}}` - The user's contact number
     - `{{specialOccasion}}` - The special occasion (if any)
     - `{{message}}` - The user's message
4. Save your template and note down the Template ID.

## Step 4: Get Your Public Key

1. In your EmailJS dashboard, go to "Account" > "API Keys".
2. Copy your Public Key.

## Step 5: Update Your Code

1. Open `src/services/emailService.ts`.
2. Replace the placeholder values with your actual EmailJS credentials:
   ```typescript
   const SERVICE_ID = 'your_service_id';
   const TEMPLATE_ID = 'your_template_id';
   const PUBLIC_KEY = 'your_public_key';
   ```

## Step 6: Test Your Implementation

1. Fill out the contact form on your website.
2. Submit the form and check if you receive the email.
3. If you encounter any issues, check the browser console for error messages.

## Additional Resources

- [EmailJS Documentation](https://www.emailjs.com/docs/)
- [EmailJS React Integration](https://www.emailjs.com/docs/examples/reactjs/)