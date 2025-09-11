import React, { useState, useCallback, memo } from 'react';

interface FormData {
  name: string;
  email: string;
  message: string;
}

// Optimized Section Header Component
const SectionHeader = memo(() => (
  <div className="text-center mb-16 animate-fade-in-up">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-gradient-flow" />
      <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer bg-gradient-to-r from-accent via-accent-gold to-accent bg-[length:400%] bg-clip-text text-transparent">Stay Connected</p>
      <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-gradient-flow" />
    </div>
    <h2 className="text-h2 font-playfair text-foreground mb-6 relative animate-float">
      Get in Touch with Heritage
      <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
    </h2>
    <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed animate-fade-in">
      Experience the warmth of Kerala hospitality. Let us help you plan your perfect heritage getaway.
    </p>
  </div>
));

SectionHeader.displayName = 'SectionHeader';

// Optimized Contact Form Component
const ContactForm = memo<{ formData: FormData; onInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void; onSubmit: () => void }>(({ formData, onInputChange, onSubmit }) => (
  <div className="group animate-fade-in-up">
    <div className="card-base relative h-[500px] md:h-[600px] p-6 md:p-8 flex flex-col justify-center hover:shadow-golden-glow-sm animate-float">
      {/* Heritage pattern overlay */}
      <div className="absolute inset-0 opacity-5 heritage-pattern rounded-2xl" />
      
      {/* Form content */}
      <div className="relative z-10 space-y-8">
        <div className="text-center mb-8">
          <h3 className="font-playfair text-h3 text-foreground mb-4 animate-text-shimmer bg-gradient-to-r from-foreground via-accent to-foreground bg-[length:400%] bg-clip-text">Send Us a Message</h3>
          <div className="w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent mx-auto shadow-golden-glow animate-gradient-flow" />
        </div>
        
        <div className="space-y-4 md:space-y-6">
          <div className="transform transition-all duration-500 hover:translate-x-2 animate-fade-in">
            <input
              type="text"
              name="name"
              required
              value={formData.name}
              onChange={onInputChange}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-background-secondary border border-border text-foreground placeholder-foreground-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 hover:bg-background-tertiary hover:border-accent/50 shadow-soft-sunlight text-sm md:text-base"
              placeholder="Your Name"
            />
          </div>

          <div className="transform transition-all duration-500 hover:translate-x-2 animate-fade-in">
            <input
              type="email"
              name="email"
              required
              value={formData.email}
              onChange={onInputChange}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-background-secondary border border-border text-foreground placeholder-foreground-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 hover:bg-background-tertiary hover:border-accent/50 shadow-soft-sunlight text-sm md:text-base"
              placeholder="Your Email"
            />
          </div>

          <div className="transform transition-all duration-500 hover:translate-x-2 animate-fade-in">
            <textarea
              name="message"
              rows={4}
              value={formData.message}
              onChange={onInputChange}
              className="w-full px-4 py-3 md:px-6 md:py-4 bg-background-secondary border border-border text-foreground placeholder-foreground-subtle rounded-xl focus:outline-none focus:ring-2 focus:ring-accent/30 focus:border-accent transition-all duration-300 hover:bg-background-tertiary hover:border-accent/50 resize-none shadow-soft-sunlight text-sm md:text-base"
              placeholder="Your Message"
            />
          </div>

          <div className="transform transition-all duration-500 hover:scale-105 animate-fade-in">
            <button
              type="button"
              onClick={onSubmit}
              className="btn btn-primary w-full py-3 md:py-4 px-6 md:px-8 text-sm md:text-lg font-semibold shadow-soft-sunlight-lg hover:shadow-golden-glow animate-float transform hover:-translate-y-1 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-accent active:scale-95 transition-all duration-300"
            >
              <span className="hidden md:inline">✨ Send Heritage Message</span>
              <span className="md:hidden">Send Message</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
));

ContactForm.displayName = 'ContactForm';

// Optimized Map Component
const MapSection = memo(() => (
  <div className="group animate-fade-in-up">
    <div className="card-base relative h-[300px] md:h-[600px] overflow-hidden hover:shadow-golden-glow-sm animate-float">
      {/* Map content */}
      <div className="relative h-full rounded-2xl overflow-hidden">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3946.4919!2d76.9555987!3d8.489801!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3b05bbb3cc8055af%3A0x529436fb75bb4d06!2sAmritha%20Heritage!5e0!3m2!1sen!2sin!4v1642000000000!5m2!1sen!2sin"
          width="100%"
          height="100%"
          style={{ border: 0, pointerEvents: 'auto' }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          title="Amritha Heritage Location"
          className="transition-all duration-700 group-hover:brightness-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
      </div>

      {/* Floating Heritage Label */}
      <div className="glassmorphic absolute top-6 left-6 rounded-xl px-4 py-2 shadow-golden-glow-sm animate-float">
        <span className="text-foreground font-poppins font-medium text-sm">🏛️ Find Our Heritage</span>
      </div>
    </div>
  </div>
));

MapSection.displayName = 'MapSection';

const ContactSection: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    message: ''
  });

  // Optimized event handlers
  const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  }, []);

  const handleSubmit = useCallback(() => {
    console.log('Form submitted:', formData);
    alert('Thank you for your message!');
    // Reset form after submission
    setFormData({ name: '', email: '', message: '' });
  }, [formData]);

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-background min-h-screen flex items-center relative overflow-hidden">
      {/* Optimized Decorative Background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-accent-gold rounded-full mix-blend-multiply filter blur-2xl animate-float" />
      </div>

      <div className="max-w-7xl mx-auto w-full relative z-10">
        <SectionHeader />

        <div className="grid lg:grid-cols-2 gap-12">
          <MapSection />
          <ContactForm 
            formData={formData} 
            onInputChange={handleInputChange} 
            onSubmit={handleSubmit} 
          />
        </div>
      </div>
    </section>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(ContactSection);