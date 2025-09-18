import React, { memo } from 'react';
import LazyImage from '../hooks/LazyImage';
import { useNavigate } from 'react-router-dom';

// Simplified component without intersection observer for better performance

const TextContent = () => {
  const navigate = useNavigate();

  const handleBookingClick = () => {
    navigate('/booking');
  };

  return (
  <div className="space-y-8 flex flex-col items-center">
    {/* Elegant Subtitle */}
    <div className="flex items-center justify-center gap-3">
      <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
      <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
        Heritage Experience
      </span>
      <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
    </div>

    {/* Main Heading with floating animation */}
    <div>
      <h2 
        id="welcome-heading" 
        className="text-h1 font-cinzel text-foreground text-center relative font-bold leading-tight"
      >
        Welcome to Amritha Heritage
        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
      </h2>
    </div>

    {/* Description */}
    <p className="font-cormorant text-lg text-foreground leading-relaxed text-center max-w-2xl mb-8 font-medium">
      A century-old colonial bungalow transformed into a boutique hotel in the heart of Thycaud, Thiruvananthapuram. A space where timeless architecture, lush courtyards, and refined hospitality come together for an unforgettable stay.
    </p>
    
    {/* Features List */}
    <div className="max-w-3xl mx-auto mb-12">
      <ul className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-center">
        <li className="relative">
          <h3 className="font-playfair text-xl font-bold text-foreground relative mb-2">
            Premium Heritage Rooms
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent"></div>
          </h3>
          <p className="font-cormorant text-foreground-subtle text-base">With antique furniture and period details</p>
        </li>
        <li className="relative">
          <h3 className="font-playfair text-xl font-bold text-foreground relative mb-2">
            Authentic Dining
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent"></div>
          </h3>
          <p className="font-cormorant text-foreground-subtle text-base">Kerala & multi-cuisine culinary experiences</p>
        </li>
        <li className="relative">
          <h3 className="font-playfair text-xl font-bold text-foreground relative mb-2">
            Central Location
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent"></div>
          </h3>
          <p className="font-cormorant text-foreground-subtle text-base">Near major attractions and landmarks</p>
        </li>
        <li className="relative">
          <h3 className="font-playfair text-xl font-bold text-foreground relative mb-2">
            Event Hosting
            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-16 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent"></div>
          </h3>
          <p className="font-cormorant text-foreground-subtle text-base">In authentic heritage settings</p>
        </li>
      </ul>
    </div>
    
    {/* Content Wrapper */}
    <div className="flex flex-col items-center space-y-6">
      {/* Testimonial Card */}
      <div className="max-w-lg mx-auto">
        <div className="card-base p-6 md:p-8 relative overflow-hidden hover:shadow-golden-glow transition-all duration-300">
          {/* Decorative background pattern */}
          <div className="absolute top-0 right-0 w-16 h-16 bg-gradient-to-br from-accent-gold/10 to-transparent rounded-bl-full"></div>
          <div className="absolute bottom-0 left-0 w-12 h-12 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full"></div>
          
          <div className="relative z-10">
            {/* Quote icon */}
            <div className="flex justify-center mb-4">
              <svg className="text-accent-gold w-8 h-8 opacity-60" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
              </svg>
            </div>
            
            {/* Testimonial text */}
            <blockquote className="font-cormorant italic text-foreground text-lg md:text-xl leading-relaxed text-center mb-4">
              "Spacious rooms, traditional decor, delicious food — an authentic heritage experience!"
            </blockquote>
            
            {/* Author */}
            <div className="text-center">
              <div className="w-12 h-px bg-gradient-to-r from-transparent via-accent-gold to-transparent mx-auto mb-2"></div>
              <cite className="font-poppins text-sm text-accent font-medium not-italic">— Happy Guest</cite>
            </div>
          </div>
        </div>
      </div>
      
      {/* Book Button */}
      <button onClick={handleBookingClick} className="btn btn-primary text-lg px-8 py-4 shadow-soft-sunlight-lg hover:shadow-golden-glow hover:animate-hover-pulse hover:text-accent-gold transition-all duration-300 mt-6">
        Book Your Stay
      </button>
    </div>
  </div>
);};

const ImageGallery = () => (
  <div className="relative w-full hidden md:block">
    {/* Main Heritage Image with lazy loading */}
    <div className="group card-base w-full max-w-lg mx-auto aspect-[2/3] overflow-visible transition-transform duration-300 hover:scale-105">
      <div className="w-full h-full flex items-center justify-center">
        <LazyImage
          src="/images/start1.webp"
          alt="The stately facade of Amritha Heritage bungalow"
          priority={true}
          width={600}
          height={900}
          className="max-w-full max-h-full w-auto h-auto object-contain transition-transform duration-500 group-hover:scale-110"
          quality={85}
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
    </div>
    
    {/* Secondary Image with lazy loading */}
    <div className="group hidden sm:block absolute -bottom-6 -left-6 sm:-bottom-8 sm:-left-8 lg:-bottom-10 lg:-left-10 w-40 sm:w-52 lg:w-64 card-base overflow-visible transition-transform duration-300 hover:scale-105">
      <div className="w-full aspect-[2/3] overflow-hidden relative">
        <LazyImage
          src="/images/start2.webp"
          alt="A detailed view of a lush courtyard at Amritha Heritage"
          width={300}
          height={450}
          className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-110"
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-accent/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
      </div>
    </div>

    {/* Decorative Golden Accent - simplified */}
    <div className="absolute -top-4 -right-4 w-20 h-20 border-2 border-accent-gold rounded-full opacity-30" />
  </div>
);

const StartSection: React.FC = () => {
  return (
    <section 
      aria-labelledby="welcome-heading"
      className="min-h-[120vh] bg-background-secondary flex items-center relative overflow-hidden py-20"
    >
      {/* Simplified Decorative Background Elements */}
      <div className="absolute inset-0 opacity-10" aria-hidden="true">
        <div className="absolute top-20 left-20 w-32 h-32 border border-accent rounded-full" />
        <div className="absolute bottom-20 right-20 w-24 h-24 border border-accent-gold rounded-full" />
        <div className="absolute top-1/2 left-1/3 w-16 h-16 border border-primary rounded-full" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <TextContent />
          <ImageGallery />
        </div>
      </div>
    </section>
  );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(StartSection);