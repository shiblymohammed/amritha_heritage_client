import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

// =================================================================
// == ATOMIC COMPONENTS for a Cleaner Structure
// =================================================================

// Re-usable Social Icon component
const SocialIcon = ({ href, title, children }: { href: string; title: string; children: React.ReactNode }) => (
  <a
    href={href}
    title={title}
    className="text-foreground-subtle hover:text-accent-gold transition-all duration-300 transform hover:-translate-y-1 hover:scale-110 shadow-soft-sunlight hover:shadow-golden-glow-sm rounded-full p-3 bg-background-tertiary hover:bg-background animate-float"
  >
    {children}
  </a>
);

// Re-usable Footer Link component
const FooterLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <li>
    <Link to={to} className="font-poppins text-foreground-subtle relative inline-block after:content-[''] after:absolute after:w-full after:h-[1px] after:bg-accent-gold after:bottom-0 after:left-0 after:scale-x-0 after:origin-left hover:after:scale-x-100 after:transition-transform hover:text-accent-gold transition-colors duration-300">
      {children}
    </Link>
  </li>
);

// A dedicated component for the link columns
const FooterLinkGroup = ({ title, links }: { title: string; links: { name: string; path: string }[] }) => (
  <div>
    <h3 className="font-playfair text-h4 text-foreground mb-6">{title}</h3>
    <ul className="space-y-4">
      {links.map((link) => (
        <FooterLink key={link.name} to={link.path}>{link.name}</FooterLink>
      ))}
    </ul>
  </div>
);

// SVG Icons with complete paths
const FacebookIcon = () => ( <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z" clipRule="evenodd" /></svg> );
const InstagramIcon = () => ( <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path fillRule="evenodd" d="M12 2C9.243 2 8.971.011 7.828.062 6.685.112 5.992.298 5.333.567a4.686 4.686 0 00-1.64 1.086A4.686 4.686 0 002.607 5.333c-.27.66-.455 1.352-.505 2.495C2.05 8.972 2 9.243 2 12s.05 3.028.102 4.172c.05.143.236.835.505 2.495a4.686 4.686 0 001.086 1.64 4.686 4.686 0 001.64 1.086c.66.27 1.352.455 2.495.505C8.972 21.95 9.243 22 12 22s3.028-.05 4.172-.102c1.143-.05 1.835-.236 2.495-.505a4.686 4.686 0 001.64-1.086 4.686 4.686 0 001.086-1.64c.27-.66.455-1.352.505-2.495C21.95 15.028 22 14.757 22 12s-.05-3.028-.102-4.172c-.05-1.143-.236-1.835-.505-2.495a4.686 4.686 0 00-1.086-1.64A4.686 4.686 0 0018.667 2.607c-.66-.27-1.352-.455-2.495-.505C15.028 2.05 14.757 2 12 2zm0 1.622c2.72 0 3.056.012 4.122.06 1.011.046 1.517.21 1.844.338a2.903 2.903 0 011.087.777 2.903 2.903 0 01.777 1.087c.128.327.292.833.338 1.844.048 1.066.06 1.402.06 4.122s-.012 3.056-.06 4.122c-.046 1.011-.21 1.517-.338 1.844a2.903 2.903 0 01-.777 1.087 2.903 2.903 0 01-1.087.777c-.327.128-.833.292-1.844.338-1.066.048-1.402.06-4.122.06s-3.056-.012-4.122-.06c-1.011-.046-1.517-.21-1.844-.338a2.903 2.903 0 01-1.087-.777 2.903 2.903 0 01-.777-1.087c-.128-.327-.292-.833-.338-1.844C3.632 15.056 3.62 14.72 3.62 12s.012-3.056.06-4.122c.046-1.011.21-1.517.338-1.844a2.903 2.903 0 01.777-1.087 2.903 2.903 0 011.087-.777c.327-.128.833-.292 1.844-.338C8.944 3.632 9.28 3.62 12 3.622zM12 7.182a4.818 4.818 0 100 9.636 4.818 4.818 0 000-9.636zm0 7.909a3.091 3.091 0 110-6.182 3.091 3.091 0 010 6.182zm4.364-8.091a1.182 1.182 0 100-2.364 1.182 1.182 0 000 2.364z" clipRule="evenodd" /></svg> );
const TwitterIcon = () => ( <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg> );


// =================================================================
// == MAIN FOOTER COMPONENT
// =================================================================

function Footer() {
  const [isVisible, setIsVisible] = useState(false);
  const footerRef = useRef(null);

  // Intersection Observer to trigger animations on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { rootMargin: '0px 0px -150px 0px' }
    );

    const currentRef = footerRef.current;
    if (currentRef) observer.observe(currentRef);
    return () => { if (currentRef) observer.unobserve(currentRef); };
  }, []);

  // Helper function for staggered fade-in animations
  const getAnimClass = (_delay: number) => 
    `transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`;

  return (
    <>
      {/* CSS for responsive clip-path and custom pattern */}
      <style>{`
        .heritage-pattern {
          background-image:
            linear-gradient(45deg, rgb(var(--color-border) / 0.1) 25%, transparent 25%),
            linear-gradient(-45deg, rgb(var(--color-border) / 0.1) 25%, transparent 25%),
            linear-gradient(45deg, transparent 75%, rgb(var(--color-border) / 0.1) 75%),
            linear-gradient(-45deg, transparent 75%, rgb(var(--color-border) / 0.1) 75%);
          background-size: 20px 20px;
        }
        @media (min-width: 1024px) {
          .footer-wave-clip {
            clip-path: url(#footer-wave);
          }
        }
      `}</style>
      
      {/* Hidden SVG for the clip-path definition */}
      <svg height="0" width="0" className="absolute">
        <defs>
          <clipPath id="footer-wave" clipPathUnits="objectBoundingBox">
            <path d="M0,0.2 C0.1,0.1,0.3,0,0.5,0 S0.9,0.1,1,0.2 V1 H0 Z" />
          </clipPath>
        </defs>
      </svg>

      <footer ref={footerRef} className="relative bg-background pt-24 lg:pt-40 -mt-20 overflow-hidden">
        {/* Decorative Background Blobs */}
        <div className="absolute inset-0 opacity-5 dark:opacity-10">
          <div className="absolute top-20 left-20 w-64 h-64 bg-accent rounded-full mix-blend-multiply filter blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-96 h-96 bg-primary rounded-full mix-blend-multiply filter blur-3xl animate-float animation-delay-2000"></div>
        </div>
        
        {/* Main Content Area */}
        <div 
          className="relative bg-background-secondary pt-20 lg:pt-32 pb-12 px-6 md:px-8 footer-wave-clip"
        >
          <div className="max-w-7xl mx-auto">
            {/* Top Section: Grid for Links and Newsletter */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 text-center md:text-left">
              
              {/* Column 1: Brand & Ethos */}
              <div className="md:col-span-2 lg:col-span-1" style={{ transitionDelay: '100ms' }}>
                <div className={getAnimClass(100)}>
                  <Link to="/" className="inline-block mb-6 animate-float">
                    <h2 className="text-3xl font-cinzel tracking-widest text-foreground text-glow-gold">AMRITHA HERITAGE</h2>
                    <p className="text-sm font-poppins tracking-wider text-accent uppercase">THIRUVANANTHAPURAM</p>
                  </Link>
                  <p className="font-cormorant text-foreground-subtle leading-relaxed max-w-sm mx-auto md:mx-0">
                    A sanctuary of timeless elegance, preserving rich colonial history for the modern discerning traveler.
                  </p>
                </div>
              </div>
              
              {/* Column 2 & 3: Navigation Links */}
              <div style={{ transitionDelay: '200ms' }} className={getAnimClass(200)}>
                <FooterLinkGroup title="Explore" links={[
                  { name: 'Accommodations', path: '/accommodations' },
                  { name: 'Dining', path: '/dining' },
                  { name: 'Destinations', path: '/destinations' },
                  { name: 'Gallery', path: '/gallery' }
                ]} />
              </div>
              <div style={{ transitionDelay: '300ms' }} className={getAnimClass(300)}>
                <FooterLinkGroup title="Company" links={[
                  { name: 'About Us', path: '/about' },
                  { name: 'Events', path: '/events' },
                  { name: 'Contact', path: '/contact' },
                  { name: 'Booking', path: '/booking' }
                ]} />
              </div>

              {/* Column 4: Newsletter */}
              <div style={{ transitionDelay: '400ms' }} className={getAnimClass(400)}>
                <h3 className="font-playfair text-h4 text-foreground mb-6">Stay Connected</h3>
                <p className="font-cormorant text-foreground-subtle mb-4">Receive heritage insights and exclusive offers.</p>
                <form className="flex max-w-sm mx-auto md:mx-0">
                  <input
                    type="email"
                    placeholder="Your email address"
                    className="w-full px-4 py-3 bg-background border border-border rounded-l-md font-poppins text-sm focus:outline-none focus:ring-2 focus:ring-accent-gold transition"
                  />
                  <button type="submit" className="btn btn-primary px-5 rounded-r-md rounded-l-none animate-float">Join</button>
                </form>
              </div>

            </div>

            {/* Bottom Section: Copyright & Socials */}
            <div className={`mt-16 pt-8 border-t border-border/50 flex flex-col lg:flex-row justify-between items-center gap-8 ${getAnimClass(500)}`}>
              <p className="text-sm font-poppins text-foreground-subtle text-center lg:text-left">
                © {new Date().getFullYear()} Amritha Heritage. All Rights Reserved.
              </p>
              <div className="flex items-center space-x-3">
                <SocialIcon href="#" title="Facebook"><FacebookIcon /></SocialIcon>
                <SocialIcon href="#" title="Instagram"><InstagramIcon /></SocialIcon>
                <SocialIcon href="#" title="Twitter"><TwitterIcon /></SocialIcon>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}

export default Footer;
