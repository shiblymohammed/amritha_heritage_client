import React, { useState, useRef } from 'react';
import { useInView } from 'react-intersection-observer';
import { CSSTransition } from 'react-transition-group';
import { ChevronRight, Star, MapPin, Clock, Users, Wifi, Coffee, Car, Utensils, Dumbbell } from 'lucide-react';

interface RoomType {
  id: string;
  name: string;
  description: string;
  image: string;
  price: string;
  capacity: number;
  size: string;
  features: string[];
  amenities: string[];
}

const roomTypes: RoomType[] = [
  {
    id: 'president-deluxe',
    name: "The President's Chamber — Deluxe",
    description: 'A refined deluxe chamber with heritage aesthetics, curated furnishings, and modern comforts',
    image: '/images/Accommodation/room (2).webp',
    price: '₹8,500',
    capacity: 2,
    size: '450 sq ft',
    features: ['Colonial Style', 'Period Furniture', 'Natural Lighting', 'Complimentary Breakfast'],
    amenities: ['King Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free WiFi', 'Room Service']
  },
  {
    id: 'magistrate-executive',
    name: "The Magistrate's Chamber — Executive",
    description: 'Executive class elegance with generous space and period details for a serene stay',
    image: '/images/Accommodation/room (3).webp',
    price: '₹10,500',
    capacity: 3,
    size: '520 sq ft',
    features: ['Extra Space', 'Work Area', 'Lounge Space', 'Premium Amenities'],
    amenities: ['King Bed + Sofa Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free WiFi', 'Work Desk', 'Coffee Maker']
  },
  {
    id: 'collector-deluxe',
    name: "The Collector's Chamber — Deluxe",
    description: 'Deluxe comfort with curated antique accents and a calm, sophisticated ambiance',
    image: '/images/Accommodation/room (4).webp',
    price: '₹7,500',
    capacity: 2,
    size: '480 sq ft',
    features: ['Classic Wooden Decor', 'City View', 'Traditional Artwork', 'Complimentary Breakfast'],
    amenities: ['Queen Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free WiFi', 'Mini Bar']
  },
  {
    id: 'residency-executive',
    name: 'The Residency Room — Executive',
    description: 'Executive refinement with heritage textures, ideal for business and leisure travelers',
    image: '/images/Accommodation/room (5).webp',
    price: '₹9,500',
    capacity: 3,
    size: '520 sq ft',
    features: ['Spacious Layout', 'Quiet Wing', 'Premium Bedding', 'Desk & Seating Area'],
    amenities: ['King Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free WiFi', 'Room Service']
  },
  {
    id: 'plantation-deluxe',
    name: 'The Plantation Room — Deluxe',
    description: 'Deluxe room inspired by plantation-era charm with tranquil tones and modern amenities',
    image: '/images/Accommodation/room (6).webp',
    price: '₹6,500',
    capacity: 2,
    size: '460 sq ft',
    features: ['Heritage Design', 'Garden View', 'Natural Lighting', 'Complimentary Breakfast'],
    amenities: ['Queen Bed', 'En-suite Bathroom', 'Air Conditioning', 'Free WiFi', 'Mini Bar']
  }
];

// Helper component for scroll animations
const AnimateOnScroll: React.FC<{ children: React.ReactNode; className?: string; delay?: number; threshold?: number }> = ({ children, className, delay = 0, threshold = 0.1 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold,
  });

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${inView ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AccommodationPage: React.FC = () => {
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const modalRef = useRef(null); // Ref for CSSTransition

  const handleViewDetails = (room: RoomType) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);
  };

  const handleCloseDetails = () => {
    setShowRoomDetails(false);
    // Let animation finish before clearing data
    setTimeout(() => setSelectedRoom(null), 300); 
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/images/Accommodation/room (1).webp')",
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
          <div className="relative z-10 text-center text-foreground-on-color px-6 animate-fadeInUp">
            <p className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]">
              Amritha Heritage
            </p>
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
              <h1 className="font-cinzel text-5xl md:text-6xl lg:text-7xl mb-6 leading-tight text-foreground-on-color animate-float">
                Accommodation<br />
                <span className="italic bg-gradient-to-r from-accent-gold to-accent bg-clip-text text-transparent">
                  Rooms & Suites
                </span>
              </h1>
            </div>
            <p className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
              Experience the timeless elegance of our heritage rooms, thoughtfully designed with period charm and modern comfort.
            </p>
            <button className="btn btn-primary text-lg px-8 py-4 shadow-golden-glow hover:shadow-golden-glow-sm transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]">
              View Our Rooms
            </button>
          </div>
        </section>

        {/* Room Types Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimateOnScroll className="text-center mb-16 space-y-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Heritage Experience
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                Stay in Colonial Elegance
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              </h2>
              <p className="font-cormorant text-xl text-foreground-subtle max-w-2xl mx-auto">
                Our rooms are more than just places to sleep — they are a journey into history. Each room is uniquely designed with period furniture, natural lighting, and modern amenities.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roomTypes.map((room, index) => (
                <AnimateOnScroll key={room.id} delay={index * 100}>
                  <div className="card-base border border-border hover-lift hover-glow h-full flex flex-col">
                    <div className="relative h-80 md:h-96 overflow-hidden rounded-t-2xl img-overlay">
                      <img 
                        src={room.image} 
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-accent text-foreground-on-color px-3 py-1 rounded-full text-sm font-poppins font-semibold shadow-golden-glow-sm">
                        {room.price}
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-grow">
                      <h3 className="font-playfair text-2xl text-text-heading mb-3">
                        {room.name}
                      </h3>
                      <p className="font-cormorant text-foreground-subtle mb-4 leading-relaxed flex-grow">
                        {room.description}
                      </p>
                      <div className="flex items-center gap-6 mb-6 text-sm text-foreground-subtle">
                        <div className="flex items-center gap-2">
                          <Users className="w-5 h-5" />
                          <span>{room.capacity}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin className="w-5 h-5" />
                          <span>{room.size}</span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <button
                          onClick={() => handleViewDetails(room)}
                          className="w-full btn btn-primary flex items-center justify-center gap-2"
                        >
                          View Details
                          <ChevronRight className="w-4 h-4" />
                        </button>
                        <button
                          onClick={() => window.open(room.image, '_blank')}
                          className="w-full btn btn-secondary flex items-center justify-center gap-2"
                          title="Open 360° view"
                        >
                          View 360°
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials Section */}
        <section className="py-24 bg-background-secondary">
            <div className="container mx-auto px-6 lg:px-8">
                <AnimateOnScroll className="text-center mb-16 space-y-6">
                <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                    <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                    Guest Voices
                    </span>
                    <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
                </div>
                <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                    What Our Guests Say
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
                </h2>
                <p className="font-cormorant text-xl text-foreground-subtle max-w-2xl mx-auto">
                    Discover why travelers choose Amritha for their heritage experience
                </p>
                </AnimateOnScroll>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {[
                    { name: "Sarah Mitchell", room: "Heritage Premium Room", rating: 5, text: "Absolutely stunning room with perfect blend of heritage and comfort. The attention to detail is remarkable!" },
                    { name: "Rajesh Kumar", room: "Executive Room", rating: 5, text: "Perfect for business travel. Spacious, elegant, and all the modern amenities I needed." },
                    { name: "Emma Thompson", room: "Deluxe Room", rating: 5, text: "The colonial charm is incredible. Felt like stepping back in time while enjoying modern luxury." }
                ].map((testimonial, index) => (
                    <AnimateOnScroll key={index} delay={index * 100}>
                    <div className="bg-background rounded-2xl p-8 border border-border hover:shadow-soft-sunlight transition-all duration-300 h-full">
                        <div className="flex items-center gap-2 mb-4">
                        {[...Array(testimonial.rating)].map((_, i) => (
                            <Star key={i} className="w-5 h-5 text-accent" />
                        ))}
                        </div>
                        <p className="font-cormorant text-foreground-subtle italic mb-6 leading-relaxed">
                        "{testimonial.text}"
                        </p>
                        <div>
                        <p className="font-poppins font-semibold text-text-heading">{testimonial.name}</p>
                        <p className="font-cormorant text-sm text-foreground-subtle">{testimonial.room}</p>
                        </div>
                    </div>
                    </AnimateOnScroll>
                ))}
                </div>
            </div>
        </section>
        
        {/* Gallery Section */}
        <section className="py-24 bg-background">
            <div className="container mx-auto px-2 md:px-4 lg:px-6">
                <AnimateOnScroll className="text-center mb-8 md:mb-12 space-y-6">
                <div className="flex items-center justify-center gap-3">
                    <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                    <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                    Visual Journey
                    </span>
                    <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
                </div>
                <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                    Accommodation Gallery
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
                </h2>
                <p className="font-cormorant text-xl text-foreground-subtle max-w-2xl mx-auto">
                    Take a visual journey through our heritage rooms and discover the elegance that awaits you
                </p>
                </AnimateOnScroll>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
                {[
                    '/images/Accommodation/room (1).webp', '/images/Accommodation/room (2).webp', '/images/Accommodation/room (3).webp',
                    '/images/Accommodation/room (4).webp', '/images/Accommodation/room (5).webp', '/images/Accommodation/room (6).webp',
                    '/images/Accommodation/room (7).webp', '/images/Accommodation/room (8).webp', '/images/Accommodation/room (9).webp',
                    '/images/Accommodation/room (10).webp',
                ].map((image, index) => (
                    <AnimateOnScroll key={index} delay={index * 50} className="h-[90vh]">
                        <div className="relative overflow-hidden cursor-pointer rounded-lg border border-border-soft h-full w-full">
                        <img 
                            src={image} 
                            alt={`Accommodation ${index + 1}`}
                            className="w-full h-full object-cover rounded-lg"
                            onError={(e) => { (e.target as HTMLImageElement).src = '/images/Accommodation/room (1).webp'; }}
                        />
                        <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-4">
                            <p className="text-foreground-on-color font-playfair text-xl">Room {index + 1}</p>
                        </div>
                        </div>
                    </AnimateOnScroll>
                ))}
                </div>
            </div>
        </section>

        {/* Outro Section */}
        <section className="py-24 bg-background-secondary">
          <div className="container mx-auto px-6 lg:px-8 text-center">
            <AnimateOnScroll className="max-w-3xl mx-auto space-y-6">
              <div className="flex items-center justify-center gap-3">
                 <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                 <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                   Plan Your Stay
                 </span>
                 <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                Ready to Experience Heritage?
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              </h2>
              <p className="font-cormorant text-xl text-foreground-subtle mb-8 leading-relaxed">
                Book your stay and immerse yourself in the colonial elegance of Amritha. Our team is ready to make your experience unforgettable.
              </p>
              <button className="btn btn-primary px-10 py-4 text-lg shadow-soft-sunlight hover:shadow-golden-glow transition-transform duration-200 hover:scale-105 active:scale-95">
                Book Your Stay
              </button>
            </AnimateOnScroll>
          </div>
        </section>

      </div>

      {/* Room Details Modal */}
      {selectedRoom && (
        <CSSTransition
          in={showRoomDetails}
          timeout={300}
          classNames={{
            enter: 'modal-backdrop-enter',
            enterActive: 'modal-backdrop-enter-active',
            exit: 'modal-backdrop-exit',
            exitActive: 'modal-backdrop-exit-active',
          }}
          unmountOnExit
          nodeRef={modalRef}
        >
          <RoomDetailsModal 
            ref={modalRef}
            room={selectedRoom}
            onClose={handleCloseDetails} 
            show={showRoomDetails}
          />
        </CSSTransition>
      )}
    </>
  );
};

// Room Details Modal Component
interface RoomDetailsModalProps {
  room: RoomType;
  onClose: () => void;
  show: boolean;
}

const RoomDetailsModal = React.forwardRef<HTMLDivElement, RoomDetailsModalProps>(({ room, onClose, show }, ref) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const contentRef = useRef(null);
  
  const roomImages = [
    room.image,
    'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1571896349842-33c89424de2d?w=800&h=600&fit=crop',
    'https://images.unsplash.com/photo-1552321554-5fefe8c9ef14?w=800&h=600&fit=crop'
  ];

  const nextImage = () => setCurrentImageIndex((prev) => (prev + 1) % roomImages.length);
  const prevImage = () => setCurrentImageIndex((prev) => (prev - 1 + roomImages.length) % roomImages.length);

  return (
    <div
      ref={ref}
      className="fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4 overflow-y-auto"
      onClick={onClose}
    >
      <CSSTransition
        in={show}
        timeout={300}
        classNames={{
          enter: 'modal-content-enter',
          enterActive: 'modal-content-enter-active',
          exit: 'modal-content-exit',
          exitActive: 'modal-content-exit-active',
        }}
        nodeRef={contentRef}
      >
        <div
          ref={contentRef}
          className="bg-background-tertiary rounded-3xl max-w-6xl w-full max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="sticky top-0 bg-background-tertiary rounded-t-3xl p-6 border-b border-border-soft z-10">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="font-playfair text-3xl md:text-4xl text-text-heading mb-2">{room.name}</h2>
                <p className="font-cormorant text-lg text-text-subtle">{room.description}</p>
              </div>
              <button onClick={onClose} className="text-text-subtle hover:text-text-heading transition-colors p-2">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          <div className="p-6">
             {/* Image Carousel */}
            <div className="relative mb-8">
                <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                    <img 
                    src={roomImages[currentImageIndex]} 
                    alt={`${room.name} - Image ${currentImageIndex + 1}`}
                    className="w-full h-full object-cover"
                    />
                
                    <button
                    onClick={prevImage}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                    </button>
                    <button
                    onClick={nextImage}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                    >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                    </button>
                </div>
                <div className="flex justify-center mt-4 gap-2">
                    {roomImages.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentImageIndex(index)}
                        className={`w-3 h-3 rounded-full transition-colors ${
                        index === currentImageIndex ? 'bg-action-accent' : 'bg-border-soft'
                        }`}
                    />
                    ))}
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                <div className="lg:col-span-2 space-y-8">
                <div>
                    <h3 className="font-playfair text-2xl text-text-heading mb-4">Room Description</h3>
                    <p className="font-cormorant text-text-subtle leading-relaxed">
                    Experience the perfect blend of colonial heritage and modern comfort in our {room.name.toLowerCase()}. 
                    This thoughtfully designed space features {room.features.join(', ').toLowerCase()}, 
                    creating an atmosphere that transports you to a bygone era while providing all the conveniences of today.
                    </p>
                </div>
                <div>
                    <h3 className="font-playfair text-2xl text-text-heading mb-4">Key Features</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {room.features.map((feature, index) => (
                        <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-action-accent rounded-full"></div>
                        <span className="font-cormorant text-text-subtle">{feature}</span>
                        </div>
                    ))}
                    </div>
                </div>
                <div>
                    <h3 className="font-playfair text-2xl text-text-heading mb-4">Amenities & Services</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room.amenities.map((amenity, index) => (
                        <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-background-secondary rounded-lg flex items-center justify-center">
                            <Wifi className="w-4 h-4 text-action-accent" />
                        </div>
                        <span className="font-cormorant text-text-subtle">{amenity}</span>
                        </div>
                    ))}
                    </div>
                </div>
                </div>

                <div className="space-y-6">
                <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                    <h3 className="font-playfair text-2xl text-text-heading mb-4">Room Details</h3>
                    
                    <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                        <span className="font-cormorant text-text-subtle">Price per night</span>
                        <span className="font-poppins font-semibold text-action-accent text-xl">{room.price}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-cormorant text-text-subtle">Room size</span>
                        <span className="font-poppins text-text-heading">{room.size}</span>
                    </div>
                    <div className="flex justify-between items-center">
                        <span className="font-cormorant text-text-subtle">Capacity</span>
                        <span className="font-poppins text-text-heading">{room.capacity} guests</span>
                    </div>
                    </div>

                    <button className="w-full btn btn-primary py-4">
                    Book Now
                    </button>
                </div>

                <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                    <h3 className="font-playfair text-xl text-text-heading mb-4">Check-in & Check-out</h3>
                    
                    <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-action-accent" />
                        <div>
                        <p className="font-poppins font-medium text-text-heading">Check-in</p>
                        <p className="font-cormorant text-sm text-text-subtle">2:00 PM onwards</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-3">
                        <Clock className="w-5 h-5 text-action-accent" />
                        <div>
                        <p className="font-poppins font-medium text-text-heading">Check-out</p>
                        <p className="font-cormorant text-sm text-text-subtle">11:00 AM</p>
                        </div>
                    </div>
                    </div>
                </div>

                <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                    <h3 className="font-playfair text-xl text-text-heading mb-4">Hotel Services</h3>
                    
                    <div className="space-y-3">
                    <div className="flex items-center gap-3">
                        <Coffee className="w-5 h-5 text-action-accent" />
                        <span className="font-cormorant text-text-subtle">24/7 Room Service</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Car className="w-5 h-5 text-action-accent" />
                        <span className="font-cormorant text-text-subtle">Valet Parking</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Utensils className="w-5 h-5 text-action-accent" />
                        <span className="font-cormorant text-text-subtle">Restaurant</span>
                    </div>
                    <div className="flex items-center gap-3">
                        <Dumbbell className="w-5 h-5 text-action-accent" />
                        <span className="font-cormorant text-text-subtle">Fitness Center</span>
                    </div>
                    </div>
                </div>
                </div>
            </div>
          </div>
        </div>
      </CSSTransition>
    </div>
  );
});

export default AccommodationPage;