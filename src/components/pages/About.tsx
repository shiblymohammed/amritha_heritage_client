import { useEffect, useState } from 'react';

const About = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const _parallaxOffset = scrollY * 0.3;

  // Public images
  const heroImage = "/images/Intro/intro3.webp";
  const storyImage = "/images/Intro/intro4.jpg";
  const visionImage = "/images/home2.webp";

  return (
    <div className="w-full bg-background">
      {/* Hero - 90vh with overlay and themed typography */}
      <div className="relative h-[90vh] overflow-hidden img-overlay">
        <img
          src={heroImage}
          alt="Heritage facade"
          className="absolute top-0 left-0 w-full h-full object-cover animate-scale-breath"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40"></div>
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center animate-fade-in-up px-6 text-foreground-on-color">
            <p className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]">
              Amritha Heritage
            </p>
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
              <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight animate-float">
                About Us
                <br />
                <span className="italic bg-gradient-to-r from-accent-gold to-accent bg-clip-text text-transparent">
                  Our Story & Legacy
                </span>
              </h1>
            </div>
            <p className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
              From historic Essenden Bungalow to a boutique heritage stay—preserving the soul of the past while embracing modern hospitality.
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-12 pt-16 pb-20 relative overflow-hidden">
        {/* Decorative Background */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
        </div>

        <div className="text-center mb-16 relative z-10 animate-fade-in-up">
          <div className="flex items-center justify-center gap-3 mb-6">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent"></div>
            <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
              About Amritha Heritage
            </p>
            <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent"></div>
          </div>
          <h2 className="text-h2 font-playfair text-foreground mb-6 relative animate-float">
            Our Story: From Bungalow to Boutique Heritage
            <span className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent"></span>
          </h2>
          <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto animate-fade-in">
            Once known as the historic Essenden Bungalow, this beautiful residence was home to Eunice Gomez and T. Shivaramasethu Pillai. It later became part of the famed Amritha Hotel, hosting film stars and dignitaries in the 1970s.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-center relative z-10">
          <div className="animate-fade-in-up">
            <p className="text-body font-cormorant text-foreground leading-relaxed mb-6">
              In 2024, it was restored and relaunched as Amritha Heritage — preserving the soul of the past while embracing modern hospitality. With Portuguese–Travancore architecture and antique aesthetics, we offer a stay that feels like stepping into living history.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="card-base p-6 hover:shadow-golden-glow-sm">
                <h3 className="text-h4 font-playfair text-foreground mb-2">Mission</h3>
                <p className="font-cormorant text-foreground-subtle">To offer guests a peaceful, heritage-rich experience with modern-day comforts.</p>
              </div>
              <div className="card-base p-6 hover:shadow-golden-glow-sm">
                <h3 className="text-h4 font-playfair text-foreground mb-2">Vision</h3>
                <p className="font-cormorant text-foreground-subtle">To become Kerala’s leading heritage hospitality destination.</p>
              </div>
            </div>
          </div>
          <div className="relative animate-fade-in-up">
            <div className="card-base overflow-hidden img-overlay hover:shadow-golden-glow-sm group">
              <img
                src={storyImage}
                alt="Amritha Heritage story"
                className="w-full h-96 object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-accent-gold rounded-lg -z-10 opacity-20 animate-float"></div>
          </div>
        </div>
      </section>

      {/* Architecture & Character (repurposed for philosophy) */}
      <section className="bg-background-secondary py-20 relative overflow-hidden">
        <div className="absolute inset-0 heritage-pattern opacity-5"></div>
        <div className="max-w-6xl mx-auto px-6 md:px-12 relative z-10">
          <div className="text-center mb-16">
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent"></div>
              <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                Heritage Ethos
              </p>
              <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent"></div>
            </div>
            <h2 className="text-h2 font-playfair text-foreground mb-6 animate-float">
              Architecture & Character
            </h2>
            <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto">
              Portuguese–Travancore influences, antique aesthetics, and thoughtful restoration define our spaces.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="card-base text-center group p-8 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-sunlight animate-float">
                🏛️
              </div>
              <h3 className="text-h4 font-playfair text-foreground mb-4">Colonial Grammar</h3>
              <p className="font-cormorant text-foreground-subtle leading-relaxed">Symmetry, verandas and courtyards that echo Travancore’s legacy.</p>
            </div>
            <div className="card-base text-center group p-8 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-sunlight animate-float">
                🕯️
              </div>
              <h3 className="text-h4 font-playfair text-foreground mb-4">Antique Aesthetics</h3>
              <p className="font-cormorant text-foreground-subtle leading-relaxed">Period furniture and curated objects narrate a living history.</p>
            </div>
            <div className="card-base text-center group p-8 hover:shadow-golden-glow-sm transition-all duration-300 hover:-translate-y-2">
              <div className="w-20 h-20 bg-background-tertiary rounded-full flex items-center justify-center mx-auto mb-6 shadow-soft-sunlight animate-float">
                🌿
              </div>
              <h3 className="text-h4 font-playfair text-foreground mb-4">Tranquil Setting</h3>
              <p className="font-cormorant text-foreground-subtle leading-relaxed">Old trees and gardens create a calming sense of place.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Closing Visual */}
      <section className="py-20">
        <div className="max-w-6xl mx-auto px-6 md:px-12 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1 animate-fade-in-up">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent"></div>
              <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                Looking Ahead
              </p>
            </div>
            <h2 className="text-h2 font-playfair text-foreground mb-6 animate-float">
              A Vision for Heritage Hospitality
            </h2>
            <p className="text-body font-cormorant text-foreground leading-relaxed mb-6">
              We envision becoming Kerala’s leading heritage hospitality destination — a place where guests find peace, culture and comfort in equal measure.
            </p>
          </div>
          <div className="relative order-1 md:order-2">
            <img
              src={visionImage}
              alt="Courtyard and heritage details"
              className="w-full h-96 object-cover rounded-lg shadow-heritage-lg"
            />
            <div className="absolute -top-6 -right-6 w-32 h-32 bg-background-tertiary rounded-lg -z-10"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;