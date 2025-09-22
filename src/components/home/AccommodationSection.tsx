import React, { useState, useRef, useCallback, memo } from 'react';
import { useNavigate } from 'react-router-dom';
import { rooms, facilities } from '../data/AccommodationData';
import type { Room } from '../data/AccommodationData';
import LazyImage from '../hooks/LazyImage';

// Optimized SectionHeader component with memo
const SectionHeader = memo<{ title: string; subtitle: string; children: React.ReactNode }>(({ title, subtitle, children }) => (
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
));

SectionHeader.displayName = 'SectionHeader';

// Optimized RoomSlide component with memo and useCallback
const RoomSlide = memo<{ room: Room; isCurrent: boolean }>(({ room, isCurrent }) => {
    const navigate = useNavigate();
    
    const handleBooking = useCallback(() => {
        navigate(`/booking?room=${room.id}`);
    }, [navigate, room.id]);
    
    const handleViewDetails = useCallback(() => {
        navigate(`/accommodation?roomId=${room.id}`);
    }, [navigate, room.id]);
    
    return (
        <div className="flex-shrink-0 w-full lg:grid lg:grid-cols-12 lg:items-center lg:gap-8">
            {/* Image */}
            <div className="lg:col-span-8 xl:col-span-7 aspect-[16/9] card-base shadow-soft-sunlight-lg overflow-hidden">
                <LazyImage
                    src={room.images.desktop}
                    alt={room.title}
                    width={1280}
                    height={720}
                    priority={isCurrent}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                    quality={80}
                />
            </div>
            {/* Details Card */}
            <div className="lg:col-span-6 xl:col-span-5 lg:-ml-32 xl:-ml-40 z-10 mt-4 lg:mt-0">
                <div className="card-base p-6 lg:p-8 shadow-soft-sunlight-lg transition-all duration-200 hover:shadow-golden-glow hover:-translate-y-1 glassmorphic">
                    <p className="font-poppins text-sm tracking-widest text-accent uppercase mb-3 animate-text-shimmer">{room.type}</p>
                    <div className="animate-float" style={{ animationDelay: '0.2s' }}>
                        <h3 className="font-playfair text-2xl lg:text-4xl mb-3 leading-tight text-foreground">{room.title}</h3>
                    </div>
                    <p className="font-cormorant text-base lg:text-lg mb-6 text-foreground-subtle h-24">{room.description}</p>
                    <div className="flex flex-col sm:flex-row gap-3">
                        <button onClick={handleBooking} className="btn btn-primary w-full text-base py-3 transition-transform hover:scale-105 active:scale-95">Book Now</button>
                        <button onClick={handleViewDetails} className="btn btn-ghost w-full text-base py-3 transition-transform hover:scale-105 active:scale-95">View Details</button>
                    </div>
                </div>
            </div>
        </div>
    );
});

RoomSlide.displayName = 'RoomSlide';

// Mobile-friendly scroll-snap slider
const MobileRoomSlider = memo(({ rooms }: { rooms: Room[] }) => {
  const navigate = useNavigate();
  const handleBooking = useCallback((id: number) => navigate(`/booking?room=${id}`), [navigate]);
  const handleViewDetails = useCallback((id: number) => navigate(`/accommodation?roomId=${id}`), [navigate]);
  return (
    <div className="lg:hidden">
      <div className="flex gap-4 overflow-x-auto snap-x snap-mandatory px-4 pb-2 hide-scrollbar">
        {rooms.map((room) => (
          <div key={room.id} className="snap-center shrink-0 w-[85vw] card-base border border-border hover-lift hover-glow overflow-hidden">
            <div className="h-56 overflow-hidden">
              <LazyImage src={room.images.mobile} alt={room.title} width={800} height={600} className="w-full h-full object-cover" quality={75} />
            </div>
            <div className="p-4">
              <p className="font-poppins text-xs tracking-widest text-accent uppercase mb-1">{room.type}</p>
              <h3 className="font-playfair text-xl text-foreground mb-2">{room.title}</h3>
              <p className="font-cormorant text-sm text-foreground-subtle line-clamp-3 mb-3">{room.description}</p>
              <div className="flex gap-2">
                <button onClick={() => handleBooking(room.id)} className="btn btn-primary flex-1 py-2 text-sm">Book Now</button>
                <button onClick={() => handleViewDetails(room.id)} className="btn btn-ghost flex-1 py-2 text-sm">View Details</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
});

MobileRoomSlider.displayName = 'MobileRoomSlider';

// The main slider component (desktop with smoother drag)
const RoomSlider = ({ rooms, currentIndex, setCurrentIndex, onNavigateToAccommodation }: { 
    rooms: Room[]; 
    currentIndex: number; 
    setCurrentIndex: (index: number) => void;
    onNavigateToAccommodation: () => void;
}) => {
    const [isDragging, setIsDragging] = useState(false);
    const [dragOffset, setDragOffset] = useState(0);
    const dragStartRef = useRef(0);
    const containerRef = useRef<HTMLDivElement>(null);
    const rafRef = useRef<number | null>(null);
    const queuedX = useRef<number | null>(null);

    const paginate = useCallback((newIndex: number) => {
        if (newIndex < 0) newIndex = rooms.length - 1;
        else if (newIndex >= rooms.length) newIndex = 0;
        setCurrentIndex(newIndex);
    }, [rooms.length]);

    const handleDragStart = (clientX: number) => {
        dragStartRef.current = clientX;
        setIsDragging(true);
        document.body.style.userSelect = 'none';
    };

    const updateDrag = (clientX: number) => {
        const drag = clientX - dragStartRef.current;
        setDragOffset(drag);
    };

    const onRaf = () => {
        if (queuedX.current !== null) {
            updateDrag(queuedX.current);
            queuedX.current = null;
        }
        rafRef.current = requestAnimationFrame(onRaf);
    };

    const handleDragMove = (clientX: number) => {
        if (!isDragging) return;
        queuedX.current = clientX;
        if (rafRef.current === null) rafRef.current = requestAnimationFrame(onRaf);
    };

    const endRaf = () => {
        if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
        rafRef.current = null;
        queuedX.current = null;
    };

    const handleDragEnd = () => {
        setIsDragging(false);
        document.body.style.userSelect = '';
        endRaf();
        const width = containerRef.current ? containerRef.current.clientWidth : 300;
        const swipeThreshold = width * 0.15; // lower threshold for snappier response
        if (Math.abs(dragOffset) > swipeThreshold) {
            paginate(dragOffset > 0 ? currentIndex - 1 : currentIndex + 1);
        }
        setDragOffset(0);
    };

    const onMouseDown = (e: React.MouseEvent) => handleDragStart(e.clientX);
    const onMouseMove = (e: React.MouseEvent) => handleDragMove(e.clientX);
    const onMouseUp = () => handleDragEnd();
    const onMouseLeave = () => { if (isDragging) handleDragEnd(); };
    const onTouchStart = (e: React.TouchEvent) => handleDragStart(e.touches[0].clientX);
    const onTouchMove = (e: React.TouchEvent) => handleDragMove(e.touches[0].clientX);
    const onTouchEnd = () => handleDragEnd();

    return (
        <div role="region" aria-roledescription="carousel" aria-label="Select a room">
            {/* Mobile slider */}
            <MobileRoomSlider rooms={rooms} />

            {/* Desktop slider */}
            <div
                ref={containerRef}
                className="relative overflow-hidden cursor-grab active:cursor-grabbing hidden lg:block"
                onMouseDown={onMouseDown}
                onMouseMove={onMouseMove}
                onMouseUp={onMouseUp}
                onMouseLeave={onMouseLeave}
                onTouchStart={onTouchStart}
                onTouchMove={onTouchMove}
                onTouchEnd={onTouchEnd}
            >
                <div
                    className="flex"
                    style={{
                        transform: `translateX(calc(-${currentIndex * 100}% + ${dragOffset}px))`,
                        transition: isDragging ? 'none' : 'transform 360ms cubic-bezier(0.22, 0.61, 0.36, 1)',
                        willChange: 'transform'
                    }}
                >
                    {rooms.map((room, index) => (
                        <RoomSlide key={room.id} room={room} isCurrent={index === currentIndex} />
                    ))}
                </div>
            </div>

            {/* Navigation Controls (desktop) */}
            <div className="hidden lg:flex justify-center items-center gap-4 mt-8">
                <button onClick={() => paginate(currentIndex - 1)} aria-label="Previous room" className="btn btn-ghost p-3 rounded-full transition-transform hover:scale-105 active:scale-95">&#10094;</button>
                <div className="flex justify-center gap-3">
                    {rooms.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setCurrentIndex(index)}
                            aria-label={`Go to room ${index + 1}`}
                            className={`w-3 h-3 rounded-full transition-all duration-300 ${currentIndex === index ? 'bg-accent scale-125 shadow-golden-glow' : 'bg-foreground-subtle/30 hover:bg-accent/50'}`}
                        />
                    ))}
                </div>
                <button onClick={() => paginate(currentIndex + 1)} aria-label="Next room" className="btn btn-ghost p-3 rounded-full transition-transform hover:scale-105 active:scale-95">&#10095;</button>
            </div>

            <div className="text-center mt-12 animate-fadeInUp">
                <div className="animate-float" style={{ animationDelay: '0.8s' }}>
                    <button onClick={onNavigateToAccommodation} className="btn btn-secondary shadow-golden-glow text-lg px-8 py-4 hover:shadow-golden-glow hover:animate-hover-pulse hover:text-accent-gold transition-all duration-300">
                        Explore All Rooms
                    </button>
                </div>
            </div>
        </div>
    );
};

// Optimized FacilitiesGrid component with memo
const FacilitiesGrid = memo(() => (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 md:gap-6">
      {facilities.map((facility, index) => (
        <div
          key={facility.title}
          className="card-base group relative text-center p-4 transition-all duration-200 hover:-translate-y-1 animate-fadeInUp animate-float"
          style={{ 
            animationDelay: `${index * 100}ms`,
            '--float-delay': `${index * 0.2}s`
          } as React.CSSProperties & { '--float-delay': string }}
        >
          <div className="flex justify-center mb-4">
            <div className="relative p-3 bg-gradient-to-br from-accent/10 to-primary/10 rounded-xl shadow-soft-sunlight group-hover:shadow-golden-glow transition-all duration-300">
              <facility.icon className="w-7 h-7 text-accent group-hover:text-accent-gold transition-colors duration-300 group-hover:animate-pulse"/>
            </div>
          </div>
          <h4 className="text-sm md:text-base font-playfair text-foreground group-hover:text-accent transition-colors duration-300 animate-text-shimmer">
            {facility.title}
          </h4>
          <div className="absolute inset-0 rounded-2xl border border-accent-gold/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none shadow-golden-glow animate-scale-breath"></div>
        </div>
      ))}
    </div>
));

FacilitiesGrid.displayName = 'FacilitiesGrid';


const AccommodationSection: React.FC = () => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const navigate = useNavigate();
    
    // Optimized navigation handler
    const handleNavigateToAccommodation = useCallback(() => {
        navigate('/accommodation');
    }, [navigate]);

    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-background via-background-secondary to-background-tertiary">
            
            <div className="relative z-10 container mx-auto px-4 sm:px-6 py-16 md:py-24 lg:py-32">
                <SectionHeader title="Stay in Colonial Elegance" subtitle="Heritage Stays">
                    Our rooms are more than places to sleep—they are a journey into history, uniquely designed with period furniture and modern amenities.
                </SectionHeader>
                <RoomSlider rooms={rooms} currentIndex={currentIndex} setCurrentIndex={setCurrentIndex} onNavigateToAccommodation={handleNavigateToAccommodation} />
            </div>

            <div className="relative z-10 bg-background-secondary py-16 md:py-24 lg:py-32">
                <div className="container mx-auto px-4 sm:px-6">
                    <SectionHeader title="Exceptional Facilities" subtitle="Premium Amenities">
                        Every amenity is thoughtfully designed to enhance your heritage experience with modern luxury and traditional charm.
                    </SectionHeader>
                    <FacilitiesGrid />
                </div>
            </div>
        </section>
    );
};

// Memoize the entire component to prevent unnecessary re-renders
export default memo(AccommodationSection);