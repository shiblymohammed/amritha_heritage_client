import emailjs from '@emailjs/browser';

// Replace these with your actual EmailJS credentials
const SERVICE_ID = 'service_arz46ex';
const TEMPLATE_ID = 'template_lxili2s';
const PUBLIC_KEY = 'gPBcWSxjGAy5MMQa-';

/**
 * Sends an email using EmailJS
 * @param formData - The form data to send
 * @returns Promise that resolves when the email is sent
 */
export const sendContactEmail = async (formData: any) => {
  try {
    console.log('EmailJS credentials being used:');
    console.log('SERVICE_ID:', SERVICE_ID);
    console.log('TEMPLATE_ID:', TEMPLATE_ID);
    console.log('PUBLIC_KEY:', PUBLIC_KEY);
    
    // Make sure the form data has the correct field names
    const templateParams = {
      fullName: formData.fullName,
      email: formData.email,
      contactNumber: formData.contactNumber,
      message: formData.message,
      specialOccasion: formData.specialOccasion || 'None',
    };
    
    console.log('Sending with template params:', templateParams);
    
    const response = await emailjs.send(
      SERVICE_ID,
      TEMPLATE_ID,
      templateParams,
      PUBLIC_KEY
    );
    return response;
  } catch (error) {
    console.error('Error sending email:', error);
    throw error;
  }
};

/**
 * Initializes EmailJS
 */
export const initEmailJS = () => {
  console.log('Initializing EmailJS with PUBLIC_KEY:', PUBLIC_KEY);
  emailjs.init(PUBLIC_KEY);
  console.log('EmailJS initialized successfully');
};