// src/components/DiningSection.tsx

import React, { useMemo, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import SignatureDishesSlider from './SignatureDishSlider'; // Import the new slider
import LazyImage from '../../hooks/LazyImage';

// Local SectionHeader component
const SectionHeader = ({ title, subtitle, children }: { title: string; subtitle: string; children: React.ReactNode }) => (
  <div className="text-center mb-16 md:mb-24 animate-fadeInUp">
    <div className="flex items-center justify-center gap-3 mb-6 animate-fadeIn">
      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent" />
      <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer">{subtitle}</p>
      <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent" />
    </div>
    <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
      <h2 className="text-h2 font-playfair text-foreground mb-6 relative animate-float">
        {title}
        <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
      </h2>
    </div>
    <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
      {children}
    </p>
  </div>
);

// Interface can be shared or defined here
export interface Dish {
  id: number;
  name: string;
  description: string;
  price: string;
  image: string;
}

const DiningSection: React.FC = () => {
  const navigate = useNavigate();

  const signatureDishes = useMemo<Dish[]>(() => [
    // ... your dish data remains unchanged
    { id: 1, name: "Chicken Mushroom Varutharathathu", description: "A classic Keralan curry with toasted coconut.", price: "₹420", image: "/images/chickenmushroom.jpg" },
    { id: 2, name: "Niagara Chicken", description: "A fiery and tangy dry chicken preparation.", price: "₹380", image: "/images/niagrachicken.jpg" },
    { id: 3, name: "Beef Ularthiyathu", description: "Slow-roasted beef with fried coconut slivers.", price: "₹450", image: "/images/beefularthiyathu.jpg" },
    { id: 4, name: "Meen Pollichathu", description: "Spiced fish wrapped in banana leaf and pan-fried.", price: "₹520", image: "/images/meenpollichathu.jpg" },
    { id: 5, name: "Prawn Mango Curry", description: "A coastal curry balancing sweet and tangy flavors.", price: "₹480", image: "/images/prawnmango.jpg" },
  ], []);

  const handleOrderNow = useCallback((dish: Dish) => {
    navigate('/dining', { state: { preSelectedDish: dish, fromSection: 'signature-dishes' } });
  }, [navigate]);

  const handleViewMenu = useCallback(() => {
    navigate('/dining');
  }, [navigate]);

  return (
    <div className="bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-x-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-t from-accent/5 via-transparent to-accent-gold/3" />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/3 via-transparent to-secondary/2" />

      {/* ======================= HERO SECTION ======================= */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div className="absolute inset-0">
          {/* Desktop Image */}
          <LazyImage
            src="/images/dining-hero-desktop.webp"
            alt="Heritage dining experience at Amritha Heritage"
            className="hidden md:block w-full h-full object-cover"
            width={1920}
            height={1080}
            priority={true}
            quality={85}
          />
          {/* Mobile Image */}
          <LazyImage
            src="/images/dining-hero-mobile.webp"
            alt="Heritage dining experience at Amritha Heritage"
            className="md:hidden w-full h-full object-cover"
            width={800}
            height={600}
            priority={true}
            quality={80}
          />
        </div>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />
        
        {/* Content */}
        <div className="relative z-10 text-center text-white px-6 max-w-4xl mx-auto">
          <p className="font-poppins text-sm md:text-base tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]">
            The Kohinoor Restaurant
          </p>
          
          <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
            <h1 className="font-cinzel text-3xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white animate-float">
              Heritage Flavors,<br />
              <span className="italic bg-gradient-to-r from-accent-gold via-accent to-secondary bg-clip-text text-transparent">
                Modern Elegance
              </span>
            </h1>
          </div>
          
          <p className="font-cormorant text-base md:text-lg lg:text-xl mb-8 text-white/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
            Experience authentic Kerala cuisine in our beautifully restored heritage dining hall, where traditional recipes meet contemporary presentation.
          </p>
          
          <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]">
            <button
              onClick={handleViewMenu}
              className="btn btn-secondary shadow-golden-glow text-lg px-8 py-4 hover:shadow-golden-glow hover:animate-hover-pulse hover:text-accent-gold transition-all duration-300"
            >
              View Our Menu
            </button>
          </div>
        </div>
      </section>
      
      {/* ======================= SIGNATURE DISHES SECTION ======================= */}
      <div className="py-24 md:py-32 relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-accent/3 to-accent-gold/2" />
        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <SectionHeader 
            subtitle="A Taste of Heritage"
            title="A Culinary Journey at The Kohinoor Restaurant"
          >
            Once a culinary landmark in Thiruvananthapuram, the Kohinoor brand returns with heritage-style dining at Amritha Heritage. Enjoy authentic Kerala dishes, chef's specials, and seasonal menus served in our classic dining hall or open-air lawn
          </SectionHeader>
          
          {/* RENDER THE NEW, OPTIMIZED SLIDER COMPONENT */}
          <SignatureDishesSlider dishes={signatureDishes} onOrderNow={handleOrderNow} />

        </div>
        
        <div className="text-center mt-16 relative z-10">
          <div className="animate-float" style={{ animationDelay: '0.8s' }}>
            <button 
              onClick={handleViewMenu} 
              className="btn btn-secondary shadow-golden-glow text-lg px-8 py-4 hover:shadow-golden-glow hover:animate-hover-pulse hover:text-accent-gold transition-all duration-300"
            >
              Explore Dining
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(DiningSection);