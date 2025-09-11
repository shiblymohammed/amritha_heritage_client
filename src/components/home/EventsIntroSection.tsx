import React, { useCallback, useMemo, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import LazyImage from '../hooks/LazyImage';

// Optimized ArrowRightIcon component (Unchanged)
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
    className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1"
    aria-hidden="true"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
));
ArrowRightIcon.displayName = 'ArrowRightIcon';


// Optimized SectionHeader with shimmer animation restored for consistency
const SectionHeader = memo<{ subtitle: string; title: string; description: string; }>(({ subtitle, title, description }) => (
  <div className="text-center mb-16">
    <div className="flex items-center justify-center gap-3 mb-6">
      <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent" />
      <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer">
        {subtitle}
      </p>
      <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent" />
    </div>
    <div className="animate-float">
      <h2 className="text-h2 font-playfair text-foreground mb-6 relative inline-block">
        {title}
        <span className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
      </h2>
    </div>
    <p className="text-body font-cormorant text-foreground-subtle max-w-3xl mx-auto leading-relaxed mt-8">
      {description}
    </p>
  </div>
));
SectionHeader.displayName = 'SectionHeader';

// Event category interface
interface EventCategory {
  id: string;
  title: string;
  description: string;
  images: {
    desktop: string;
    mobile: string;
  };
  highlight: string;
}

// Optimized Event Card Component (Unchanged)
const EventCard = memo<{ category: EventCategory; index: number; onNavigate: (id: string) => void }>(({ category, index, onNavigate }) => {
  const handleClick = useCallback(() => {
    onNavigate(category.id);
  }, [category.id, onNavigate]);

  return (
    <div className="group relative bg-background-secondary rounded-2xl lg:rounded-3xl shadow-soft-sunlight-lg overflow-hidden hover:shadow-golden-glow transition-all duration-300 hover:-translate-y-2 will-change-transform">
      {/* Image Container */}
      <div className="relative h-56 lg:h-72 overflow-hidden">
        {/* Desktop Image */}
        <LazyImage 
          src={category.images.desktop} 
          alt={category.title} 
          className="hidden lg:block w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          width={600}
          height={400}
          quality={85}
        />
        {/* Mobile Image */}
        <LazyImage 
          src={category.images.mobile} 
          alt={category.title} 
          className="lg:hidden w-full h-full object-cover transition-transform duration-300 ease-out group-hover:scale-105"
          width={400}
          height={300}
          quality={80}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        {/* Highlight Badge */}
        <div className="absolute top-4 left-4 bg-accent px-3 py-1.5 rounded-full shadow-lg">
          <p className="font-poppins text-xs font-semibold text-white tracking-wide">{category.highlight}</p>
        </div>
      </div>

      {/* Content */}
      <div className="p-5 lg:p-6 flex flex-col flex-grow">
        <h3 className="font-playfair text-xl lg:text-2xl font-bold text-foreground mb-3 group-hover:text-accent transition-colors duration-300">
          {category.title}
        </h3>
        <p className="font-cormorant text-foreground-subtle leading-relaxed mb-4 flex-grow">
          {category.description}
        </p>
        
        {/* Learn More Button */}
        <button 
          onClick={handleClick}
          className="inline-flex items-center gap-2 font-poppins text-accent hover:text-accent-gold font-medium transition-all duration-300 group/btn hover:scale-105 active:scale-95 mt-auto"
        >
          Learn More
          <ArrowRightIcon />
        </button>
      </div>
    </div>
  );
});
EventCard.displayName = 'EventCard';

const EventsIntroSection: React.FC = () => {
  const navigate = useNavigate();

  // Memoized data - updated with mobile and desktop image sources
  const eventCategories = useMemo<EventCategory[]>(() => [
    { 
      id: 'weddings', 
      title: 'Traditional Kerala décor on contract', 
      description: 'Transform your special day into an unforgettable celebration with our authentic Kerala heritage backdrop.', 
      images: {
        desktop: '/images/weddings-desktop.webp',
        mobile: '/images/weddings-mobile.webp'
      },
      highlight: 'Heritage Venue' 
    },
    { 
      id: 'corporate', 
      title: 'Heritage architecture backdrop on contract', 
      description: 'Host professional gatherings in a unique heritage environment that impresses clients and motivates teams.', 
      images: {
        desktop: '/images/corporate-desktop.webp',
        mobile: '/images/corporate-mobile.webp'
      },
      highlight: 'Professional' 
    },
    { 
      id: 'cultural', 
      title: 'In-house catering', 
      description: 'Showcase traditional performances and cultural celebrations in an authentic heritage setting.', 
      images: {
        desktop: '/images/cultural-desktop.webp',
        mobile: '/images/cultural-mobile.webp'
      },
      highlight: 'Traditional' 
    }
  ], []);

  const features = useMemo(() => [
    { icon: '🎭', title: 'Versatile Venues', description: 'Multiple spaces for different event types and sizes' },
    { icon: '🍽️', title: 'Catering Services', description: 'Traditional Kerala & multi-cuisine options' },
    { icon: '📸', title: 'Professional Support', description: 'Event coordination and photography services' },
    { icon: '🌿', title: 'Heritage Ambiance', description: 'Authentic colonial architecture and gardens' }
  ], []);

  // Optimized event handlers - no changes needed, already optimal
  const handleExploreEvents = useCallback(() => navigate('/events'), [navigate]);
  const handleContactUs = useCallback(() => navigate('/contact'), [navigate]);
  const handleCategoryNavigate = useCallback((categoryId: string) => navigate(`/events#${categoryId}`), [navigate]);

  return (
    <div className="bg-gradient-to-b from-background via-background-secondary to-background py-16 md:py-24">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader 
          subtitle="Host Your Special Moments"
          title="Celebrate in a Heritage Setting"
          description="Amritha Heritage is the perfect venue for intimate weddings, family gatherings, cultural events, or corporate meetings. Our indoor spaces and open lawn offer a charming and elegant setting for any occasion."
        />

        {/* =================================================================== */}
        {/* == NEW: DEDICATED MOBILE/TABLET CAROUSEL FOR EVENT CATEGORIES == */}
        {/* =================================================================== */}
        <div className="md:hidden flex overflow-x-auto space-x-4 pb-6 snap-x snap-mandatory hide-scrollbar -mx-4 px-4">
          {eventCategories.map((category, index) => (
            <div key={category.id} className="flex-shrink-0 w-[80vw] sm:w-[60vw] snap-center">
              <EventCard
                category={category}
                index={index}
                onNavigate={handleCategoryNavigate}
              />
            </div>
          ))}
        </div>

        {/* =================================================================== */}
        {/* == DESKTOP GRID FOR EVENT CATEGORIES == */}
        {/* =================================================================== */}
        <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 mb-16">
          {eventCategories.map((category, index) => (
            <EventCard
              key={category.id}
              category={category}
              index={index}
              onNavigate={handleCategoryNavigate}
            />
          ))}
        </div>

        {/* =================================================================== */}
        {/* == OPTIMIZED 2x2 KEY FEATURES GRID FOR MOBILE == */}
        {/* =================================================================== */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6 my-16">
          {features.map((feature, index) => (
            <div
              key={index}
              className="text-center p-4 bg-background-secondary rounded-xl shadow-soft-sunlight hover:shadow-golden-glow transition-all duration-300 hover:-translate-y-1 will-change-transform"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h4 className="font-playfair text-lg font-bold text-foreground mb-2">
                {feature.title}
              </h4>
              <p className="font-cormorant text-sm text-foreground-subtle leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Call to Action (Unchanged) */}
        <div className="text-center mt-16">
            <div className="bg-background-secondary border border-accent/20 rounded-2xl p-6 lg:p-10">
                <h3 className="font-playfair text-2xl lg:text-3xl font-bold text-foreground mb-4 animate-float">
                  Ready to Create Your Perfect Event?
                </h3>
                <p className="font-cormorant text-lg text-foreground-subtle max-w-2xl mx-auto mb-8">
                  Let us help you plan and execute an unforgettable celebration in our heritage venue. 
                  From intimate gatherings to grand celebrations, we have the perfect space.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <button 
                      onClick={handleExploreEvents}
                      className="btn btn-secondary shadow-golden-glow text-lg px-8 py-4 hover:shadow-golden-glow hover:animate-hover-pulse hover:text-accent-gold transition-all duration-300"
                    >
                      Explore All Events
                    </button>
                    <button 
                      onClick={handleContactUs}
                      className="btn btn-ghost floating-btn"
                    >
                      Contact Us
                    </button>
                </div>
            </div>
        </div>
      </div>
    </div>
  );
};

export default memo(EventsIntroSection);