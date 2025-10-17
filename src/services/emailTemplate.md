# EmailJS Template Configuration

This file contains the email template configuration for admin notifications when new reservations are made.

## Template Setup Instructions

1. Go to [EmailJS Dashboard](https://www.emailjs.com/)
2. Create a new email template
3. Use the following template content:

## Email Template Content

### Subject Line:
```
New Reservation - {{customer_name}} - {{reservation_date}}
```

### Email Body:
```html
<!DOCTYPE html>
<html>
<head>
    <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .header { background-color: #8B4513; color: white; padding: 20px; text-align: center; }
        .content { padding: 20px; }
        .reservation-details { background-color: #f9f9f9; padding: 15px; border-left: 4px solid #8B4513; margin: 15px 0; }
        .items-list { background-color: #fff; border: 1px solid #ddd; padding: 15px; margin: 15px 0; }
        .total { font-weight: bold; font-size: 18px; color: #8B4513; }
        .footer { background-color: #f4f4f4; padding: 15px; text-align: center; font-size: 12px; }
    </style>
</head>
<body>
    <div class="header">
        <h1>🏛️ Amritha Heritage - New Reservation</h1>
    </div>
    
    <div class="content">
        <h2>New Reservation Alert</h2>
        <p>A new reservation has been made on your website. Please find the details below:</p>
        
        <div class="reservation-details">
            <h3>📋 Reservation Details</h3>
            <p><strong>Customer Name:</strong> {{customer_name}}</p>
            <p><strong>Phone Number:</strong> {{customer_phone}}</p>
            <p><strong>Date:</strong> {{reservation_date}}</p>
            <p><strong>Time:</strong> {{reservation_time}}</p>
            <p><strong>Number of Guests:</strong> {{guest_count}}</p>
        </div>
        
        <div class="items-list">
            <h3>🍽️ Ordered Items</h3>
            <pre>{{ordered_items}}</pre>
        </div>
        
        <div class="total">
            💰 Total Amount: {{total_amount}}
        </div>
        
        <p><strong>Action Required:</strong> Please contact the customer to confirm the reservation and arrange payment.</p>
    </div>
    
    <div class="footer">
        <p>This is an automated notification from Amritha Heritage reservation system.</p>
        <p>Admin Email: {{admin_email}}</p>
    </div>
</body>
</html>
```

## Template Variables Used

The following variables are automatically populated by the EmailJS service:

- `{{customer_name}}` - Customer's full name
- `{{customer_phone}}` - Customer's phone number
- `{{reservation_date}}` - Formatted reservation date
- `{{reservation_time}}` - Selected time slot
- `{{guest_count}}` - Number of guests
- `{{ordered_items}}` - List of ordered items with quantities and prices
- `{{total_amount}}` - Total amount formatted with currency
- `{{admin_email}}` - Admin email address

## Environment Variables to Configure

After setting up your EmailJS service and template, update the `.env` file with:

```
VITE_EMAILJS_SERVICE_ID=your_actual_service_id
VITE_EMAILJS_TEMPLATE_ID=your_actual_template_id
VITE_EMAILJS_PUBLIC_KEY=your_actual_public_key
```

## Testing

Once configured, test the email functionality by making a reservation through the frontend. The admin should receive an email with all the reservation details formatted nicely.