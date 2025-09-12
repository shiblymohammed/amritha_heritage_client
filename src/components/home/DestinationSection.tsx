import { useState, useCallback, useMemo, memo, useRef } from 'react';
import LazyImage from '../hooks/LazyImage';

// = anSVG ICONS (Unchanged)
const ArrowRightIcon = memo(() => (
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
    className="w-4 h-4 ml-1 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
));
ArrowRightIcon.displayName = 'ArrowRightIcon';

// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Destination {
  id: number;
  title: string;
  description: string;
  images: {
    desktop: string;
    mobile: string;
  };
  distance: string;
  category: string;
}

// =================================================================
// == OPTIMIZED SECTION HEADER (Unchanged)
// =================================================================
const SectionHeader = memo(() => (
  <div className="text-center mb-16">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent" />
      <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer">
        Explore Our Surroundings
      </p>
      <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent" />
    </div>
    <div className="animate-float">
      <h2 className="text-h2 font-playfair text-foreground mb-6 relative inline-block">
        Find Us in the Heart of Thiruvananthapuram
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </h2>
    </div>
    <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed mt-8">
      Nestled in Thycaud, Amritha Heritage is just minutes from key cultural and historical landmarks.
    </p>
  </div>
));
SectionHeader.displayName = 'SectionHeader';

// =================================================================
// == OPTIMIZED DESTINATION CARD (Refined for reuse)
// =================================================================
const DestinationCard = memo<{ destination: Destination }>(({ destination }) => {
  return (
    <div className="group h-full flex flex-col bg-background-secondary rounded-2xl lg:rounded-3xl shadow-soft-sunlight-lg overflow-hidden hover:shadow-golden-glow transition-all duration-300 lg:hover:-translate-y-2 will-change-transform">
      {/* Image Container */}
      <div className="h-56 lg:h-64 overflow-hidden flex-shrink-0">
        {/* Desktop Image */}
        <LazyImage 
          src={destination.images.desktop} 
          alt={destination.title} 
          className="hidden lg:block w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          width={600}
          height={400}
          quality={85}
        />
        {/* Mobile Image */}
        <LazyImage 
          src={destination.images.mobile} 
          alt={destination.title} 
          className="lg:hidden w-full h-full object-cover transition-transform duration-500 ease-out group-hover:scale-110"
          width={400}
          height={300}
          quality={80}
        />
      </div>
      
      {/* Content */}
      <div className="p-5 lg:p-6 flex flex-col flex-grow">
        <span className="font-poppins text-xs md:text-sm text-accent uppercase tracking-wide font-medium">
          {destination.category}
        </span>
        <h3 className="font-playfair text-xl lg:text-2xl font-bold text-foreground mt-2 group-hover:text-accent transition-colors duration-300">
          {destination.title}
        </h3>
        <p className="font-cormorant text-foreground-subtle my-4 leading-relaxed flex-grow">
          {destination.description}
        </p>
        <div className="inline-flex items-center gap-1 text-sm text-accent font-medium mt-auto group-hover:scale-105 transition-transform duration-300">
          <span>{destination.distance} away</span>
          <ArrowRightIcon />
        </div>
      </div>
    </div>
  );
});
DestinationCard.displayName = 'DestinationCard';


// =================================================================
// == MAIN COMPONENT (WITH NEW SLIDER LOGIC)
// =================================================================
const DestinationSection: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // --- State for new swipe functionality ---
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const destinations = useMemo<Destination[]>(() => [
    { 
      id: 1, 
      title: "Sree Padmanabhaswamy Temple", 
      description: "A stunning example of Dravidian architecture, this temple is a spiritual heart of the city.", 
      images: {
        desktop: "/images/padmanabhaswamy-desktop.jpg",
        mobile: "/images/padmanabhaswamy-mobile.jpg"
      },
      distance: "5 km", 
      category: "Heritage" 
    },
    { 
      id: 2, 
      title: "Kovalam Beach", 
      description: "Famous for its three crescent-shaped beaches, offering a serene escape with golden sands.", 
      images: {
        desktop: "/images/kovalam-desktop.jpg",
        mobile: "/images/kovalam-mobile.jpg"
      },
      distance: "16 km", 
      category: "Beach" 
    },
    { 
      id: 3, 
      title: "Veli Tourist Village", 
      description: "A picturesque spot where the Veli Lake meets the Arabian Sea, offering boating and gardens.", 
      images: {
        desktop: "/images/veli-desktop.jpg",
        mobile: "/images/veli-mobile.jpg"
      },
      distance: "8 km", 
      category: "Leisure" 
    },
  ], []);

  // --- Optimized Handlers for new slider ---
  const handleIndexChange = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartRef.current = clientX;
    setDragOffset(0);
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const drag = clientX - dragStartRef.current;
    setDragOffset(drag);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const swipeThreshold = (containerRef.current?.clientWidth ?? 0) * 0.2;

    if (Math.abs(dragOffset) > swipeThreshold) {
      const newIndex = dragOffset > 0 ? currentIndex - 1 : currentIndex + 1;
      setCurrentIndex(Math.max(0, Math.min(destinations.length - 1, newIndex)));
    }
    setDragOffset(0);
  };

  return (
    <section className="bg-gradient-to-b from-background via-background-secondary/30 to-background py-16 md:py-24 overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader />

        {/* =================================================================== */}
        {/* == NEW: SWIPEABLE CAROUSEL FOR MOBILE & TABLETS == */}
        {/* =================================================================== */}
        <div 
          ref={containerRef}
          className="lg:hidden cursor-grab active:cursor-grabbing -mx-4"
          onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
          onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
          onTouchEnd={handleDragEnd}
          onMouseDown={(e) => handleDragStart(e.clientX)}
          onMouseMove={(e) => handleDragMove(e.clientX)}
          onMouseUp={handleDragEnd}
          onMouseLeave={handleDragEnd}
        >
          <div
            className="flex items-stretch" // items-stretch ensures all cards are same height
            style={{
              // This calculation centers the card (80vw width) in the viewport
              transform: `translateX(calc(-${currentIndex * 80}vw + 10vw + ${dragOffset}px))`,
              transition: isDragging ? 'none' : 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
              willChange: 'transform',
            }}
          >
            {destinations.map((destination) => (
              <div key={destination.id} className="flex-shrink-0 w-[80vw] p-2">
                <DestinationCard destination={destination} />
              </div>
            ))}
          </div>
        </div>

        {/* Navigation Dots for Mobile/Tablet Carousel */}
        <div className="lg:hidden flex justify-center gap-3 mt-8 mb-12">
          {destinations.map((_, i) => (
            <button
              key={i}
              onClick={() => handleIndexChange(i)}
              className={`rounded-full transition-all duration-300 ${
                i === currentIndex ? 'w-6 h-2 bg-accent' : 'w-2 h-2 bg-foreground/20 hover:bg-foreground/40'
              }`}
              aria-label={`Go to destination ${i + 1}`}
            />
          ))}
        </div>
        
        {/* =================================================================== */}
        {/* == DESKTOP GRID (Refined) == */}
        {/* =================================================================== */}
        <div className="hidden lg:grid grid-cols-3 gap-8 mb-16">
          {destinations.map((destination) => (
            <DestinationCard
              key={destination.id}
              destination={destination}
            />
          ))}
        </div>

        {/* Explore All Destinations Button */}
        <div className="text-center">
          <div className="animate-float" style={{ animationDelay: '0.8s' }}>
            <button
              onClick={() => window.open('/destinations', '_self')}
              className="btn btn-secondary shadow-golden-glow text-lg px-8 py-4 hover:shadow-golden-glow hover:animate-hover-pulse hover:text-accent-gold transition-all duration-300"
            >
              Explore All Destinations
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default memo(DestinationSection);