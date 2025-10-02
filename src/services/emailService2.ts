import emailjs from '@emailjs/browser';

// =================================================================
// EmailJS Configuration for Contact Form (Separate Account)
// =================================================================
const SERVICE_ID = 'service_hw1udl2';      // Replace with your second EmailJS service ID
const PUBLIC_KEY = 'uxaU2B9JW0Gt0COBy';      // Replace with your second EmailJS public key
const CONTACT_TEMPLATE_ID = 'template_o3e56ac'; // Replace with your contact template ID

// =================================================================
// TypeScript Interface
// =================================================================
interface ContactFormData {
    fullName: string;
    email: string;
    contactNumber: string;
    message: string;
    specialOccasion?: string;
}

// =================================================================
// Email Service Functions
// =================================================================

/**
 * Initializes EmailJS for Contact Form
 */
export const initContactEmailJS = () => {
    console.log('Initializing Contact EmailJS with PUBLIC_KEY:', PUBLIC_KEY);
    emailjs.init(PUBLIC_KEY);
    console.log('Contact EmailJS initialized successfully');
};

/**
 * Sends a contact form email
 * @param formData - Contact form data
 * @returns Promise that resolves when the email is sent
 */
export const sendContactEmail = async (formData: ContactFormData) => {
    try {
        console.log('Sending contact email...');
        console.log('SERVICE_ID:', SERVICE_ID);
        console.log('TEMPLATE_ID:', CONTACT_TEMPLATE_ID);

        const templateParams = {
            fullName: formData.fullName,
            email: formData.email,
            contactNumber: formData.contactNumber,
            message: formData.message,
            specialOccasion: formData.specialOccasion || 'None',
            submissionDate: new Date().toLocaleString('en-GB', {
                day: 'numeric',
                month: 'long',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit'
            })
        };

        console.log('Sending contact email with params:', templateParams);

        const response = await emailjs.send(
            SERVICE_ID,
            CONTACT_TEMPLATE_ID,
            templateParams,
            PUBLIC_KEY
        );

        console.log('Contact email sent successfully:', response);
        return response;
    } catch (error) {
        console.error('Error sending contact email:', error);
        throw error;
    }
};
