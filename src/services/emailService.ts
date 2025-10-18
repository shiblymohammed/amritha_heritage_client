// src/services/emailService.ts
import emailjs from "@emailjs/browser";

// EmailJS configuration - these should be set in your .env file
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
const CONTACT_TEMPLATE_ID = import.meta.env.VITE_CONTACT_EMAILJS_TEMPLATE_ID;

// Initialize EmailJS with your public key
if (EMAILJS_PUBLIC_KEY) {
  emailjs.init(EMAILJS_PUBLIC_KEY);
}

// Define types for reservation data
interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
}

interface ReservationDetails {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
}

interface ReservationData {
  reservation: ReservationDetails;
  items: CartItem[];
  totalAmount: number;
}

// Define types for contact form data
interface ContactFormData {
  name: string;
  email: string;
  phone?: string;
  subject: string;
  message: string;
}

/**
 * Sends email notification to admin when a new reservation is made
 * @param reservationData - The reservation details and cart items
 * @returns Promise<void>
 */
export const sendAdminNotification = async (
  reservationData: ReservationData
): Promise<void> => {
  try {
    // Check if EmailJS is properly configured
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      const missingVars = [];
      if (!EMAILJS_SERVICE_ID) missingVars.push("VITE_EMAILJS_SERVICE_ID");
      if (!EMAILJS_TEMPLATE_ID) missingVars.push("VITE_EMAILJS_TEMPLATE_ID");
      if (!EMAILJS_PUBLIC_KEY) missingVars.push("VITE_EMAILJS_PUBLIC_KEY");

      const errorMsg = `❌ EmailJS not configured! Missing environment variables: ${missingVars.join(
        ", "
      )}`;
      console.error(errorMsg);
      alert(
        errorMsg +
          "\n\nPlease set up your EmailJS credentials in the .env file."
      );
      return;
    }

    console.log("🔧 EmailJS Configuration:");
    console.log("Service ID:", EMAILJS_SERVICE_ID);
    console.log("Template ID:", EMAILJS_TEMPLATE_ID);
    console.log("Public Key:", EMAILJS_PUBLIC_KEY?.substring(0, 10) + "...");

    // Format the cart items for email display
    const itemsList = reservationData.items
      .map(
        (item) =>
          `• ${item.name} x${item.quantity} - ₹${(
            item.price * item.quantity
          ).toLocaleString()}`
      )
      .join("\n");

    // Get current date and time for timestamp
    const currentDateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Prepare email template parameters
    const templateParams = {
      to_email: "info@amrithaheritage.com",
      customer_name: reservationData.reservation.name,
      customer_phone: reservationData.reservation.phone,
      reservation_date: new Date(
        reservationData.reservation.date
      ).toLocaleDateString("en-GB"),
      reservation_time: reservationData.reservation.time,
      guest_count: reservationData.reservation.guests.toString(),
      ordered_items: itemsList,
      total_amount: `₹${reservationData.totalAmount.toLocaleString()}`,
      admin_email: "info@amrithaheritage.com",
      current_datetime: currentDateTime,
    };

    console.log("📧 Sending email with parameters:", templateParams);
    console.log("📧 Template variables being sent:");
    Object.keys(templateParams).forEach((key) => {
      console.log(
        `  ${key}: ${templateParams[key as keyof typeof templateParams]}`
      );
    });

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      EMAILJS_TEMPLATE_ID,
      templateParams
    );

    console.log(
      "✅ Admin notification sent successfully:",
      response.status,
      response.text
    );
    console.log("✅ Response details:", response);
    alert(
      "✅ Email sent successfully! Check EmailJS dashboard for confirmation."
    );
  } catch (error: any) {
    console.error("❌ Failed to send admin notification:", error);
    console.error("❌ Error details:", {
      status: error.status,
      text: error.text,
      message: error.message,
      stack: error.stack,
    });

    // Provide more specific error messages
    let errorMessage = "Email sending failed: ";
    if (error.status === 400) {
      errorMessage +=
        "Bad request - Check your template variables and service configuration";
    } else if (error.status === 401) {
      errorMessage += "Unauthorized - Check your public key";
    } else if (error.status === 404) {
      errorMessage +=
        "Service or template not found - Check your service ID and template ID";
    } else if (error.status === 422) {
      errorMessage +=
        "Template variable mismatch - Check your template variables";
    } else if (error.text) {
      errorMessage += error.text;
    } else {
      errorMessage += error.message || "Unknown error occurred";
    }

    alert(
      `❌ ${errorMessage}\n\nPlease check the browser console for more details.`
    );
  }
};

/**
 * Sends contact form email to admin from contact page or home page contact section
 * @param contactData - The contact form details
 * @returns Promise<boolean> - Returns true if email sent successfully
 */
export const sendContactFormEmail = async (
  contactData: ContactFormData
): Promise<boolean> => {
  try {
    // Check if EmailJS is properly configured for contact form
    if (!EMAILJS_SERVICE_ID || !CONTACT_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      const missingVars = [];
      if (!EMAILJS_SERVICE_ID) missingVars.push("VITE_EMAILJS_SERVICE_ID");
      if (!CONTACT_TEMPLATE_ID)
        missingVars.push("VITE_CONTACT_EMAILJS_TEMPLATE_ID");
      if (!EMAILJS_PUBLIC_KEY) missingVars.push("VITE_EMAILJS_PUBLIC_KEY");

      const errorMsg = `❌ Contact form EmailJS not configured! Missing: ${missingVars.join(
        ", "
      )}`;
      console.error(errorMsg);
      alert(
        errorMsg +
          "\n\nPlease set up your EmailJS credentials in the .env file."
      );
      return false;
    }

    console.log("📧 Contact Form EmailJS Configuration:");
    console.log("Service ID:", EMAILJS_SERVICE_ID);
    console.log("Contact Template ID:", CONTACT_TEMPLATE_ID);
    console.log("Public Key:", EMAILJS_PUBLIC_KEY?.substring(0, 10) + "...");

    // Get current date and time for timestamp
    const currentDateTime = new Date().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });

    // Prepare contact form email template parameters
    const templateParams = {
      to_email: "info@amrithaheritage.com", // Admin email
      from_name: contactData.name,
      from_email: contactData.email,
      from_phone: contactData.phone || "Not provided",
      subject: contactData.subject,
      message: contactData.message,
      admin_email: "info@amrithaheritage.com",
      current_datetime: currentDateTime,
      reply_to: contactData.email,
    };

    console.log("📧 Sending contact form email with parameters:");
    console.log("📧 Template variables being sent:");
    Object.keys(templateParams).forEach((key) => {
      console.log(
        `  ${key}: ${templateParams[key as keyof typeof templateParams]}`
      );
    });

    // Send email using EmailJS
    const response = await emailjs.send(
      EMAILJS_SERVICE_ID,
      CONTACT_TEMPLATE_ID,
      templateParams
    );

    console.log(
      "✅ Contact form email sent successfully:",
      response.status,
      response.text
    );
    console.log("✅ Response details:", response);
    alert(
      "✅ Your message has been sent successfully! We'll get back to you soon."
    );
    return true;
  } catch (error: any) {
    console.error("❌ Failed to send contact form email:", error);
    console.error("❌ Error details:", {
      status: error.status,
      text: error.text,
      message: error.message,
      stack: error.stack,
    });

    // Provide specific error messages for contact form
    let errorMessage = "Contact form submission failed: ";
    if (error.status === 400) {
      errorMessage +=
        "Bad request - Check your template variables and service configuration";
    } else if (error.status === 401) {
      errorMessage += "Unauthorized - Check your public key";
    } else if (error.status === 404) {
      errorMessage +=
        "Service or template not found - Check your service ID and template ID";
    } else if (error.status === 422) {
      errorMessage +=
        "Template variable mismatch - Check your contact template variables";
    } else if (error.text) {
      errorMessage += error.text;
    } else {
      errorMessage += error.message || "Unknown error occurred";
    }

    alert(`❌ ${errorMessage}\n\nPlease try again or contact us directly.`);
    return false;
  }
};
