import React, { useState, useRef, useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { useNavigate, useSearchParams } from "react-router-dom";
import { CSSTransition } from "react-transition-group";
import {
  ChevronRight,
  Star,
  Clock,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Eye,
} from "lucide-react";
import Marzipano360Viewer from "../Marzipano360Viewer";
import { getVirtual360Rooms, getRoomById } from "../../data/marzipano-config";


interface RoomType {
  id: string;
  name: string;
  description: string;
  image: string;
  category: "Deluxe" | "Executive";
  pricing: {
    single: number;
    double: number;
  };
  capacity: number;
  size: string;
  features: string[];
  amenities: string[];
}

const roomTypes: RoomType[] = [
  {
    id: "president-deluxe",
    name: "Royal's Chamber",
    description:
      "A refined deluxe chamber with heritage aesthetics, curated furnishings, and modern comforts",
    image: "/images/room1-desktop.webp",
    category: "Deluxe",
    pricing: { single: 5000, double: 7000 },
    capacity: 2,
    size: "450 sq ft",
    features: [
      "Colonial Style",
      "Period Furniture",
      "Natural Lighting",
      "Complimentary Breakfast",
    ],
    amenities: [
      "King Bed",
      "En-suite Bathroom",
      "Air Conditioning",
      "Free WiFi",
    ],
  },
  {
    id: "magistrate-deluxe",
    name: "The Magistrate's Chamber",
    description:
      "Deluxe class elegance with generous space and period details for a serene stay",
    image: "/images/Accommodation/magistratechamber.jpeg",
    category: "Deluxe",
    pricing: { single: 5000, double: 7000 },
    capacity: 3,
    size: "520 sq ft",
    features: ["Extra Space", "Work Area", "Lounge Space", "Premium Amenities"],
    amenities: [
      "King Bed + Sofa Bed",
      "En-suite Bathroom",
      "Air Conditioning",
      "Free WiFi",
      "Work Desk",
      "Coffee Maker",
    ],
  },
  {
    id: "collector-deluxe",
    name: "The Collector's Chamber",
    description:
      "Deluxe comfort with curated antique accents and a calm, sophisticated ambiance",
    image: "/images/room3-desktop.webp",
    category: "Deluxe",
    pricing: { single: 5000, double: 7000 },
    capacity: 2,
    size: "480 sq ft",
    features: [
      "Classic Wooden Decor",
      "City View",
      "Traditional Artwork",
      "Complimentary Breakfast",
    ],
    amenities: [
      "King Bed",
      "En-suite Bathroom",
      "Air Conditioning",
      "Free WiFi",
      "Mini Bar",
    ],
  },
  {
    id: "residency-deluxe",
    name: "The Residency Room",
    description:
      "Deluxe refinement with heritage textures, ideal for business and leisure travelers",
    image: "/images/Accommodation/residencyroom.jpeg",
    category: "Deluxe",
    pricing: { single: 5000, double: 7000 },
    capacity: 3,
    size: "520 sq ft",
    features: [
      "Spacious Layout",
      "Quiet Wing",
      "Premium Bedding",
      "Desk & Seating Area",
    ],
    amenities: [
      "King Bed",
      "En-suite Bathroom",
      "Air Conditioning",
      "Free WiFi",
    ],
  },
  {
    id: "plantation-executive",
    name: "The Plantation Room",
    description:
      "Executive room inspired by plantation-era charm with tranquil tones and modern amenities",
    image: "/images/room5-desktop.webp",
    category: "Executive",
    pricing: { single: 4000, double: 6000 },
    capacity: 2,
    size: "460 sq ft",
    features: [
      "Heritage Design",
      "Garden View",
      "Natural Lighting",
      "Complimentary Breakfast",
    ],
    amenities: [
      "King Bed",
      "En-suite Bathroom",
      "Air Conditioning",
      "Free WiFi",
      "Mini Bar",
    ],
  },
];

// Helper component for scroll animations
const AnimateOnScroll: React.FC<{
  children: React.ReactNode;
  className?: string;
  delay?: number;
  threshold?: number;
}> = ({ children, className, delay = 0, threshold = 0.1 }) => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: threshold,
  });

  return (
    <div
      ref={ref}
      className={`${className} transition-all duration-700 ease-out ${
        inView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
};

const AccommodationPage: React.FC = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedRoom, setSelectedRoom] = useState<RoomType | null>(null);
  const [showRoomDetails, setShowRoomDetails] = useState(false);
  const [show360Viewer, setShow360Viewer] = useState(false);
  const [selected360Room, setSelected360Room] = useState<string | null>(null);
  const modalRef = useRef(null);
  const roomTypesRef = useRef<HTMLElement>(null);

  // Mapping between numeric room IDs (from AccommodationSection) and string room IDs (AccommodationPage)
  const roomIdMapping: { [key: string]: string } = {
    "1": "president-deluxe",
    "2": "magistrate-deluxe",
    "3": "collector-deluxe",
    "4": "residency-deluxe",
    "5": "plantation-executive",
  };

  // Handle room ID from URL parameters
  useEffect(() => {
    const roomId = searchParams.get("roomId");
    if (roomId) {
      // Map numeric ID to string ID if needed
      const mappedRoomId = roomIdMapping[roomId] || roomId;
      const room = roomTypes.find((r) => r.id === mappedRoomId);
      if (room) {
        setSelectedRoom(room);
        setShowRoomDetails(true);
        // Remove the roomId parameter from URL after opening modal
        setSearchParams({});
      }
    }
  }, [searchParams, setSearchParams]);

  const handleViewDetails = (room: RoomType) => {
    setSelectedRoom(room);
    setShowRoomDetails(true);
  };

  const handleCloseDetails = () => {
    setShowRoomDetails(false);
    setTimeout(() => setSelectedRoom(null), 300);
  };

  const handleBookNow = (room: RoomType) => {
    // Navigate to booking page with room pre-selected
    navigate("/booking", { state: { selectedRoom: room } });
  };

  const scrollToRooms = () => {
    roomTypesRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handle360View = (roomId: string) => {
    setSelected360Room(roomId);
    setShow360Viewer(true);
  };

  const handleClose360Viewer = () => {
    setShow360Viewer(false);
    // Immediately restore scrolling
    document.body.style.overflow = 'auto';
    setTimeout(() => setSelected360Room(null), 300);
  };

  return (
    <>
      <div className="min-h-screen bg-background">
        {/* Hero Section */}
        <section className="relative h-[90vh] overflow-hidden flex items-center justify-center">
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url('/images/hero.webp')",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />
          <div className="relative z-10 text-center text-foreground-on-color px-6 animate-fadeInUp">
            <p className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]">
              Amritha Heritage
            </p>
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
              <h1 className="font-cinzel text-3xl sm:text-4xl md:text-6xl lg:text-7xl mb-4 sm:mb-6 leading-tight text-foreground-on-color animate-float">
                Accommodation
                <br />
                <span className="italic bg-gradient-to-r from-accent-gold to-accent bg-clip-text text-transparent">
                  Rooms & Suites
                </span>
              </h1>
            </div>
            <p className="font-cormorant text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
              Experience the timeless elegance of our heritage rooms,
              thoughtfully designed with period charm and modern comfort.
            </p>
            <button
              onClick={scrollToRooms}
              className="btn btn-primary text-sm sm:text-base lg:text-lg px-4 sm:px-6 lg:px-8 py-2 sm:py-3 lg:py-4 shadow-golden-glow hover:shadow-golden-glow-sm transition-all duration-300 hover:scale-105 active:scale-95 opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]"
            >
              View Our Rooms
            </button>
          </div>
        </section>

        {/* Room Types Section */}
        <section ref={roomTypesRef} className="py-24 bg-background">
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
                Our rooms are more than just places to sleep — they are a
                journey into history. Each room is uniquely designed with period
                furniture, natural lighting, and modern amenities.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {roomTypes.map((room, index) => (
                <AnimateOnScroll key={room.id} delay={index * 100}>
                  <div className="card-base border border-border hover-lift hover-glow h-full flex flex-col">
                    <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-2xl img-overlay">
                      <img
                        src={room.image}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute top-4 right-4 bg-accent text-foreground-on-color px-3 py-1 rounded-full text-sm font-poppins font-semibold shadow-golden-glow-sm">
                        {room.category}
                      </div>
                    </div>
                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                      <h3 className="font-playfair text-lg md:text-xl lg:text-2xl text-text-heading mb-2">
                        {room.name}
                      </h3>
                      <p className="font-cormorant text-sm md:text-base text-foreground-subtle mb-3 leading-relaxed flex-grow line-clamp-3">
                        {room.description}
                      </p>
                      <div className="mb-4 space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-cormorant text-foreground-subtle">
                            Single Occupancy:
                          </span>
                          <span className="font-poppins font-semibold text-accent">
                            ₹{room.pricing.single.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="font-cormorant text-foreground-subtle">
                            Double Occupancy:
                          </span>
                          <span className="font-poppins font-semibold text-accent">
                            ₹{room.pricing.double.toLocaleString()}
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-3 mt-auto">
                        <button
                          onClick={() => handleViewDetails(room)}
                          className="w-full btn btn-primary flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3"
                        >
                          <span className="hidden sm:inline">View Details</span>
                          <span className="sm:hidden">Details</span>
                          <ChevronRight className="w-3 h-3 sm:w-4 sm:h-4" />
                        </button>
                        <button
                          onClick={() => handleBookNow(room)}
                          className="w-full btn btn-secondary flex items-center justify-center gap-1 sm:gap-2 text-xs sm:text-sm py-2 sm:py-3"
                          title="Book this room"
                        >
                          <span className="hidden sm:inline">Book Now</span>
                          <span className="sm:hidden">Book</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </AnimateOnScroll>
              ))}
            </div>
          </div>
        </section>

        {/* Virtual 360 Tour Section */}
        <section className="py-24 bg-background">
          <div className="container mx-auto px-6 lg:px-8">
            <AnimateOnScroll className="text-center mb-16 space-y-6">
              <div className="flex items-center justify-center gap-3">
                <div className="w-8 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Immersive Experience
                </span>
                <div className="w-8 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>
              <h2 className="font-playfair text-4xl md:text-5xl text-text-heading mb-2 relative animate-float">
                Virtual 360° Tour
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent" />
              </h2>
              <p className="font-cormorant text-xl text-foreground-subtle max-w-2xl mx-auto">
                Step inside our heritage rooms with immersive 360° virtual tours. 
                Experience the colonial elegance and intricate details before your visit.
              </p>
            </AnimateOnScroll>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {getVirtual360Rooms().map((room, index) => (
                <AnimateOnScroll key={room.id} delay={index * 100}>
                  <div className="card-base border border-border hover-lift hover-glow h-full flex flex-col">
                    <div className="relative h-48 md:h-56 lg:h-64 overflow-hidden rounded-t-2xl img-overlay">
                      <img
                        src={room.thumbnail}
                        alt={room.name}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      <div className="absolute inset-0 bg-black/20 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity duration-300">
                        <div className="bg-accent/90 text-foreground-on-color px-4 py-2 rounded-full flex items-center gap-2 font-poppins font-semibold">
                          <Eye className="w-4 h-4" />
                          <span>360° View</span>
                        </div>
                      </div>
                      <div className="absolute top-4 right-4 bg-accent text-foreground-on-color px-3 py-1 rounded-full text-sm font-poppins font-semibold shadow-golden-glow-sm">
                        Virtual Tour
                      </div>
                    </div>
                    <div className="p-4 md:p-5 flex flex-col flex-grow">
                      <h3 className="font-playfair text-lg md:text-xl lg:text-2xl text-text-heading mb-2">
                        {room.name}
                      </h3>
                      <p className="font-cormorant text-sm md:text-base text-foreground-subtle mb-4 leading-relaxed flex-grow line-clamp-3">
                        {room.description}
                      </p>
                      <div className="mb-4">
                        <div className="flex items-center gap-2 text-sm text-foreground-subtle">
                          <Eye className="w-4 h-4 text-accent" />
                          <span className="font-cormorant">
                            {room.scenes.length} interactive scenes
                          </span>
                        </div>
                      </div>
                      <button
                        onClick={() => handle360View(room.id)}
                        className="w-full btn btn-primary flex items-center justify-center gap-2 text-sm py-3"
                      >
                        <Eye className="w-4 h-4" />
                        <span>Start 360° Tour</span>
                      </button>
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
                Discover why travelers choose Amritha for their heritage
                experience
              </p>
            </AnimateOnScroll>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[
                {
                  name: "Sarah Mitchell",
                  room: "Heritage Premium Room",
                  rating: 5,
                  text: "Absolutely stunning room with perfect blend of heritage and comfort. The attention to detail is remarkable!",
                },
                {
                  name: "Rajesh Kumar",
                  room: "Executive Room",
                  rating: 5,
                  text: "Perfect for business travel. Spacious, elegant, and all the modern amenities I needed.",
                },
                {
                  name: "Emma Thompson",
                  room: "Deluxe Room",
                  rating: 5,
                  text: "The colonial charm is incredible. Felt like stepping back in time while enjoying modern luxury.",
                },
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
                      <p className="font-poppins font-semibold text-text-heading">
                        {testimonial.name}
                      </p>
                      <p className="font-cormorant text-sm text-foreground-subtle">
                        {testimonial.room}
                      </p>
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
                Take a visual journey through our heritage rooms and discover
                the elegance that awaits you
              </p>
            </AnimateOnScroll>
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 lg:gap-4">
              {[
                "/images/Accommodation/roomgallery (1).webp",
                "/images/Accommodation/roomgallery (2).webp",
                "/images/Accommodation/roomgallery (3).webp",
                "/images/Accommodation/roomgallery (4).webp",
                "/images/Accommodation/roomgallery (5).webp",
                "/images/Accommodation/roomgallery (6).webp",
                "/images/Accommodation/roomgallery (7).webp",
                "/images/Accommodation/roomgallery (8).webp",
                "/images/Accommodation/roomgallery (9).webp",
                "/images/Accommodation/roomgallery (10).webp",
              ].map((image, index) => (
                <AnimateOnScroll key={index} delay={index * 50}>
                  <div
                    className="relative overflow-hidden cursor-pointer rounded-lg border border-border-soft w-full transition-transform duration-300 hover:scale-105"
                    style={{ aspectRatio: "4/3" }}
                    onClick={() => {}}
                  >
                    <img
                      src={image}
                      alt={`Accommodation ${index + 1}`}
                      className="w-full h-full object-cover rounded-lg"
                      style={{ aspectRatio: "4/3" }}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src =
                          "/images/Accommodation/roomgallery (1).webp";
                      }}
                    />
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
                Book your stay and immerse yourself in the colonial elegance of
                Amritha. Our team is ready to make your experience
                unforgettable.
              </p>
              <button className="btn btn-primary px-4 sm:px-6 lg:px-10 py-2 sm:py-3 lg:py-4 text-sm sm:text-base lg:text-lg shadow-soft-sunlight hover:shadow-golden-glow transition-transform duration-200 hover:scale-105 active:scale-95">
                <span className="hidden sm:inline">Book Your Stay</span>
                <span className="sm:hidden">Book Now</span>
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
            enter: "modal-backdrop-enter",
            enterActive: "modal-backdrop-enter-active",
            exit: "modal-backdrop-exit",
            exitActive: "modal-backdrop-exit-active",
          }}
          unmountOnExit
          nodeRef={modalRef}
        >
          <RoomDetailsModal
            ref={modalRef}
            room={selectedRoom}
            onClose={handleCloseDetails}
            show={showRoomDetails}
            onBookNow={handleBookNow}
          />
        </CSSTransition>
      )}

      {/* 360 Viewer */}
      {show360Viewer && selected360Room && getRoomById(selected360Room) && (
        <Marzipano360Viewer
          room={getRoomById(selected360Room)!}
          isOpen={show360Viewer}
          onClose={handleClose360Viewer}
        />
      )}

    </>
  );
};

// Room Details Modal Component
interface RoomDetailsModalProps {
  room: RoomType;
  onClose: () => void;
  show: boolean;
  onBookNow: (room: RoomType) => void;
}

const RoomDetailsModal = React.forwardRef<
  HTMLDivElement,
  RoomDetailsModalProps
>(({ room, onClose, show, onBookNow }, ref) => {
  const contentRef = useRef(null);

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
          enter: "modal-content-enter",
          enterActive: "modal-content-enter-active",
          exit: "modal-content-exit",
          exitActive: "modal-content-exit-active",
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
                <h2 className="font-playfair text-3xl md:text-4xl text-text-heading mb-2">
                  {room.name}
                </h2>
                <p className="font-cormorant text-lg text-text-subtle">
                  {room.description}
                </p>
              </div>
              <button
                onClick={onClose}
                className="text-text-subtle hover:text-text-heading transition-colors p-2"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>
          </div>
          <div className="p-6">
            <div className="relative mb-8">
              <div className="relative h-80 md:h-96 rounded-2xl overflow-hidden">
                <img
                  src={room.image}
                  alt={room.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-8">
                <div>
                  <h3 className="font-playfair text-2xl text-text-heading mb-4">
                    Room Description
                  </h3>
                  <p className="font-cormorant text-text-subtle leading-relaxed">
                    Experience the perfect blend of colonial heritage and modern
                    comfort in our {room.name.toLowerCase()}. This thoughtfully
                    designed space features{" "}
                    {room.features.join(", ").toLowerCase()}, creating an
                    atmosphere that transports you to a bygone era while
                    providing all the conveniences of today.
                  </p>
                </div>
                <div>
                  <h3 className="font-playfair text-2xl text-text-heading mb-4">
                    Key Features
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {room.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-action-accent rounded-full"></div>
                        <span className="font-cormorant text-text-subtle">
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h3 className="font-playfair text-2xl text-text-heading mb-4">
                    Amenities & Services
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {room.amenities.map((amenity, index) => (
                      <div key={index} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-background-secondary rounded-lg flex items-center justify-center">
                          <Wifi className="w-4 h-4 text-action-accent" />
                        </div>
                        <span className="font-cormorant text-text-subtle">
                          {amenity}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                  <h3 className="font-playfair text-2xl text-text-heading mb-4">
                    Room Details
                  </h3>
                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between items-center">
                      <span className="font-cormorant text-text-subtle">
                        Category
                      </span>
                      <span className="font-poppins font-semibold text-action-accent text-xl">
                        {room.category}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-cormorant text-text-subtle">
                        Single Occupancy
                      </span>
                      <span className="font-poppins text-text-heading">
                        ₹{room.pricing.single.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="font-cormorant text-text-subtle">
                        Double Occupancy
                      </span>
                      <span className="font-poppins text-text-heading">
                        ₹{room.pricing.double.toLocaleString()}
                      </span>
                    </div>

                    <div className="flex justify-between items-center">
                      <span className="font-cormorant text-text-subtle">
                        Capacity
                      </span>
                      <span className="font-poppins text-text-heading">
                        {room.capacity} guests
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => onBookNow(room)}
                    className="w-full btn btn-primary py-4"
                  >
                    Book Now
                  </button>
                </div>
                <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                  <h3 className="font-playfair text-xl text-text-heading mb-4">
                    Check-in & Check-out
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-action-accent" />
                      <div>
                        <p className="font-poppins font-medium text-text-heading">
                          Check-in
                        </p>
                        <p className="font-cormorant text-sm text-text-subtle">
                          12:00 PM onwards
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-action-accent" />
                      <div>
                        <p className="font-poppins font-medium text-text-heading">
                          Check-out
                        </p>
                        <p className="font-cormorant text-sm text-text-subtle">
                          11:00 AM
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-background-secondary rounded-2xl p-6 border border-border-soft">
                  <h3 className="font-playfair text-xl text-text-heading mb-4">
                    Hotel Services
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <Car className="w-5 h-5 text-action-accent" />
                      <span className="font-cormorant text-text-subtle">
                        Valet Parking
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Utensils className="w-5 h-5 text-action-accent" />
                      <span className="font-cormorant text-text-subtle">
                        Restaurant
                      </span>
                    </div>
                    <div className="flex items-center gap-3">
                      <Dumbbell className="w-5 h-5 text-action-accent" />
                      <span className="font-cormorant text-text-subtle">
                        Lawn
                      </span>
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
