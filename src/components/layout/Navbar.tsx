import React, { useState, useLayoutEffect, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

// =================================================================
// == SVG ICONS (Unchanged)
// =================================================================
const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);
const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);

// =================================================================
// == OPTIMIZED NAVBAR COMPONENT
// =================================================================
const NavBar: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [isNavVisible, setIsNavVisible] = useState(true);
  const lastScrollY = useRef(0);
  const location = useLocation();

  // Check if current page is booking page
  const isBookingPage = location.pathname === "/booking";

  // Switched to useLayoutEffect for smoother scroll-based DOM updates.
  useLayoutEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setHasScrolled(currentScrollY > 50);

      if (currentScrollY > lastScrollY.current && currentScrollY > 100) {
        setIsNavVisible(false); // Scrolling down
      } else {
        setIsNavVisible(true); // Scrolling up
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll(); // Set initial state
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Effect to prevent body scroll when the full-screen menu is open.
  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    // Cleanup function to reset overflow when component unmounts
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  // --- Dynamic Class and Source Logic ---
  const getNavClass = () => {
    if (isMenuOpen) {
      return "bg-primary"; // Match menu background when open
    }
    if (hasScrolled) {
      return "bg-background shadow-soft-sunlight-lg border-b border-border/20";
    }
    return "bg-transparent";
  };

  // Show white logo if menu is open or if user hasn't scrolled
  const logoSrc =
    hasScrolled && !isMenuOpen ? "/logoBlack.png" : "/logoWhite.png";
  const hamburgerColor =
    hasScrolled && !isMenuOpen ? "bg-foreground" : "bg-foreground-on-color";

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Heritage Rooms", href: "accommodation" },
    { name: "Kohinoor Dining", href: "dining" },
    { name: "About Us", href: "about" },
    { name: "Contact", href: "contact" },
    { name: "Events", href: "events" },
    { name: "Explore Our Gallery", href: "gallery" },
    { name: "Nearby Locations", href: "destinations" },
  ];

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-400 ease-out ${getNavClass()} ${
          isNavVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div className="container mx-auto px-6 lg:px-8">
          <div className="relative flex items-center justify-between h-20 md:h-24">
            <button
              onClick={toggleMenu}
              className="relative z-50 w-8 h-8 flex flex-col justify-center items-center transition-transform duration-300 ease-out group"
              aria-label="Toggle menu"
              aria-expanded={isMenuOpen}
              aria-controls="site-menu"
            >
              <span
                className={`block absolute h-0.5 w-full transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "bg-text-on-color rotate-45"
                    : `${hamburgerColor} -translate-y-1.5`
                }`}
              ></span>
              <span
                className={`block absolute h-0.5 w-full transition-all duration-300 ease-out ${
                  isMenuOpen
                    ? "bg-text-on-color -rotate-45"
                    : `${hamburgerColor} translate-y-1.5`
                }`}
              ></span>
            </button>

            <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
              <a href="/" aria-label="Go to Homepage">
                <img
                  src={logoSrc}
                  alt="Amritha Heritage Logo"
                  className="h-10 md:h-12 transition-all duration-300" // Increased logo size
                  onError={(e) => {
                    e.currentTarget.src =
                      "https://placehold.co/240x60/3A4A3E/FBF9F6?text=Amritha+Heritage&font=cinzel";
                  }}
                />
              </a>
            </div>

            {!isBookingPage && (
              <a
                href="booking"
                className={`shadow-soft-sunlight hover:shadow-golden-glow-sm transform hover:scale-105 text-xs px-4 py-2 md:text-sm md:px-6 md:py-2.5 animate-float ${
                  hasScrolled
                    ? "btn btn-primary"
                    : "btn bg-transparent border-2 border-white text-white hover:bg-white/10"
                }`}
              >
                Book Now
              </a>
            )}
          </div>
        </div>
      </nav>

      <div
        className={`fixed inset-0 z-40 w-full h-full bg-primary transition-transform duration-500 ease-out ${
          isMenuOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        id="site-menu"
        role="dialog"
        aria-modal="true"
      >
        <div className="container mx-auto px-6 lg:px-8 h-full grid grid-cols-1 lg:grid-cols-2 items-center">
          <nav className="flex flex-col items-center lg:items-start">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                className={`font-playfair text-2xl md:text-4xl lg:text-5xl my-1 md:my-2 leading-tight text-text-on-color transition-all duration-300 ease-out hover:text-white hover:tracking-wide ${
                  isMenuOpen
                    ? "opacity-100 translate-y-0"
                    : "opacity-0 translate-y-6"
                }`}
                style={{ transitionDelay: `${100 * (index + 1)}ms` }} // Faster stagger
                onClick={() => setIsMenuOpen(false)}
              >
                {link.name}
              </a>
            ))}

            {!isBookingPage && (
              <div className="mt-8 lg:hidden">
                <a
                  href="booking"
                  onClick={() => setIsMenuOpen(false)}
                  className="btn btn-primary w-full text-center animate-float"
                >
                  Book Now
                </a>
              </div>
            )}
          </nav>

          <div
            className={`hidden lg:flex flex-col items-start text-left transition-opacity duration-500 ease-out ${
              isMenuOpen ? "opacity-100" : "opacity-0"
            }`}
            style={{ transitionDelay: "400ms" }}
          >
            <h3 className="font-playfair text-h3 text-text-on-color/90 mb-4">
              About Amritha
            </h3>
            <p className="font-cormorant text-text-on-color/70 leading-relaxed max-w-md mb-8">
              Once known as Essenden Bungalow, our heritage landmark offers a
              nostalgic journey through Thiruvananthapuram's glorious past,
              blending colonial elegance with modern luxury.
            </p>
            <div className="w-24 h-px bg-text-on-color/20 mb-6"></div>
            <div className="flex justify-center space-x-6 text-text-on-color/70">
              <a
                href="https://www.instagram.com/amrithaheritage/"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <InstagramIcon />
              </a>
              <a
                href="https://www.facebook.com/amrithaheritagetvm"
                className="hover:text-white transition-colors"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FacebookIcon />
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default NavBar;
