import React, { useState, useEffect, useCallback, useMemo, memo } from "react";
import { useSearchParams, useNavigate, useLocation } from "react-router-dom";

// =================================================================
// == 1. TYPE DEFINITIONS
// =================================================================
interface Room {
  id: number;
  name: string;
  description: string;
  amenities: string[];
  capacity: number;
  category: "Deluxe" | "Executive";
  pricing: {
    single: number;
    double: number;
  };
  image: string;
}

interface BookingDetails {
  checkIn: string;
  checkOut: string;
  adults: number;
  children: number;
}

interface GuestInfo {
  name: string;
  email: string;
  phone: string;
  requests: string;
}

interface PriceSummary {
  nights: number;
  roomTotal: number;
  taxes: number;
  total: number;
}

interface Errors {
  room?: string;
  checkIn?: string;
  checkOut?: string;
  name?: string;
  email?: string;
  phone?: string;
}

// =================================================================
// == 2. SVG ICONS (Self-contained for portability)
// =================================================================
const CalendarIcon = () => (
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
    className="w-5 h-5 text-foreground-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
    <line x1="16" y1="2" x2="16" y2="6"></line>
    <line x1="8" y1="2" x2="8" y2="6"></line>
    <line x1="3" y1="10" x2="21" y2="10"></line>
  </svg>
);
const UserIcon = () => (
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
    className="w-5 h-5 text-foreground-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"
  >
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);
const CheckCircleIcon = () => (
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
    className="w-5 h-5 mr-2"
  >
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
    <polyline points="22 4 12 14.01 9 11.01"></polyline>
  </svg>
);

// =================================================================
// == 3. DUMMY DATA (Simulating API response for rooms)
// =================================================================
const roomsData: Room[] = [
  {
    id: 1,
    name: "Royal's Chamber",
    description:
      "A refined deluxe chamber with heritage aesthetics, curated furnishings, and modern comforts.",
    amenities: [
      "King Bed",
      "Garden View",
      "Wi-Fi",
      "Air Conditioned",
      "Mini Bar",
      "Flat-screen TV",
    ],
    capacity: 2,
    category: "Deluxe",
    pricing: { single: 5000, double: 7000 },
    image: "/images/room1-desktop.webp",
  },
  {
    id: 2,
    name: "The Magistrate's Chamber",
    description:
      "Deluxe class elegance with generous space and period details for a serene stay.",
    amenities: [
      "King Bed + Sofa Bed",
      "Work Desk",
      "Wi-Fi",
      "Air Conditioned",
      "Coffee Maker",
      "Flat-screen TV",
    ],
    capacity: 2,
    category: "Deluxe",
    pricing: { single: 5000, double: 7000 },
    image: "/images/Accommodation/magistratechamber.jpeg",
  },
  {
    id: 3,
    name: "The Collector's Chamber",
    description:
      "Deluxe comfort with curated antique accents and a calm, sophisticated ambiance.",
    amenities: [
      "King Bed",
      "Traditional Artwork",
      "Wi-Fi",
      "Air Conditioned",
      "Mini Bar",
    ],
    capacity: 2,
    category: "Deluxe",
    pricing: { single: 5000, double: 7000 },
    image: "/images/room3-desktop.webp",
  },
  {
    id: 4,
    name: "The Residency Room",
    description:
      "Deluxe refinement with heritage textures, ideal for business and leisure travelers.",
    amenities: [
      "King Bed",
      "Quiet Wing",
      "Wi-Fi",
      "Air Conditioned",
      "Flat-screen TV",
    ],
    capacity: 2,
    category: "Deluxe",
    pricing: { single: 5000, double: 7000 },
    image: "/images/Accommodation/residencyroom.jpeg",
  },
  {
    id: 5,
    name: "The Plantation Room",
    description:
      "Executive room inspired by plantation-era charm with tranquil tones and modern amenities.",
    amenities: [
      "King Bed",
      "Garden View",
      "Wi-Fi",
      "Air Conditioned",
      "Mini Bar",
    ],
    capacity: 2,
    category: "Executive",
    pricing: { single: 4000, double: 6000 },
    image: "/images/room5-desktop.webp",
  },
];

const whyBookWithUs = [
  {
    title: "Best Rate Guarantee",
    description:
      "We guarantee the lowest price when you book directly with us.",
  },
  {
    title: "Exclusive Offers",
    description:
      "Access special packages and deals only available on our website.",
  },
  {
    title: "Direct Support",
    description:
      "Our dedicated concierge team is available 24/7 for any assistance.",
  },
];

// =================================================================
// == 4. HELPER COMPONENTS (Memoized for Performance)
// =================================================================
// Enhanced Room Showcase Card
const RoomShowcaseCard = memo<{ room: Room }>(({ room }) => (
  <div
    className="group relative overflow-hidden rounded-3xl shadow-2xl hover:shadow-3xl transition-all duration-500 bg-white dark:bg-gray-800 min-h-[600px] w-full max-w-lg mx-auto"
    style={{ animationDelay: `${room.id * 0.1}s` }}
  >
    <div className="relative h-80 overflow-hidden">
      <img
        src={room.image}
        alt={room.name}
        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

      {/* Category Badge */}
      <div className="absolute top-4 left-4">
        <span className="bg-accent-gold/90 text-white px-3 py-1 rounded-full text-sm font-semibold backdrop-blur-sm">
          {room.category}
        </span>
      </div>

      {/* Capacity Badge */}
      <div className="absolute top-4 right-4">
        <span className="bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium backdrop-blur-sm">
          Up to {room.capacity} guests
        </span>
      </div>
    </div>

    <div className="p-8">
      <div className="mb-6">
        <h3 className="font-playfair text-3xl font-bold text-gray-800 dark:text-white mb-3 leading-tight">
          {room.name}
        </h3>
        <p className="font-cormorant text-base text-gray-600 dark:text-gray-300 leading-relaxed">
          {room.description}
        </p>
      </div>

      {/* Amenities */}
      <div className="mb-6">
        <div className="flex flex-wrap gap-2">
          {room.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              className="bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-xs font-medium"
            >
              {amenity}
            </span>
          ))}
        </div>
      </div>

      {/* Pricing Section - Accommodation Page Style */}
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
    </div>
  </div>
));

// Room Dropdown Option
const RoomDropdownOption = memo<{ room: Room; onSelect: () => void }>(
  ({ room, onSelect }) => (
    <div
      onClick={onSelect}
      className="flex items-center gap-4 p-4 hover:bg-accent/10 transition-colors cursor-pointer border-b border-accent/10 last:border-b-0 hover-lift"
    >
      <img
        src={room.image}
        alt={room.name}
        className="w-16 h-16 rounded-lg object-cover"
        loading="lazy"
      />
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <h4 className="font-playfair font-semibold text-foreground">
            {room.name}
          </h4>
          <div className="text-xs bg-accent/10 text-accent px-2 py-1 rounded-full font-medium">
            {room.category}
          </div>
        </div>
        <p className="text-sm text-foreground-subtle">
          {room.amenities.slice(0, 2).join(", ")}
        </p>
        <div className="flex gap-4 mt-1">
          <p className="font-poppins font-bold text-accent text-sm">
            Single: ₹{room.pricing.single.toLocaleString()}
          </p>
          <p className="font-poppins font-bold text-accent text-sm">
            Double: ₹{room.pricing.double.toLocaleString()}
          </p>
        </div>
      </div>
    </div>
  )
);

// Enhanced Selected Room Card
const SelectedRoomCard = memo<{
  room: Room;
  occupancy: "single" | "double";
  onRemove: () => void;
  onOccupancyChange: (occupancy: "single" | "double") => void;
}>(({ room, occupancy, onRemove, onOccupancyChange }) => (
  <div className="card-interactive glass-card border border-accent/20 rounded-xl p-4 hover-lift animate-fade-in-up">
    <div className="flex items-center gap-3 mb-3">
      <img
        src={room.image}
        alt={room.name}
        className="w-14 h-14 rounded-lg object-cover img-overlay"
        loading="lazy"
      />
      <div className="flex-1">
        <h5 className="font-playfair font-semibold text-sm text-foreground">
          {room.name}
        </h5>
        <p className="text-xs text-foreground-subtle">
          {room.category} Room
        </p>
      </div>
      <div className="text-right">
        <p className="font-poppins font-bold text-accent text-sm text-glow-primary">
          ₹{room.pricing[occupancy].toLocaleString()}
        </p>
        <button
          onClick={onRemove}
          className="text-xs text-red-500 hover:text-red-700 transition-colors hover-bounce font-medium"
        >
          ✕ Remove
        </button>
      </div>
    </div>
    <div className="flex gap-2">
      <button
        onClick={() => onOccupancyChange("single")}
        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
          occupancy === "single"
            ? "bg-accent text-white"
            : "bg-accent/10 text-accent hover:bg-accent/20"
        }`}
      >
        Single (₹{room.pricing.single.toLocaleString()})
      </button>
      <button
        onClick={() => onOccupancyChange("double")}
        className={`flex-1 px-3 py-2 rounded-lg text-xs font-medium transition-colors ${
          occupancy === "double"
            ? "bg-accent text-white"
            : "bg-accent/10 text-accent hover:bg-accent/20"
        }`}
      >
        Double (₹{room.pricing.double.toLocaleString()})
      </button>
    </div>
  </div>
));

const ConfirmationModal = memo<{
  bookingDetails: GuestInfo & BookingDetails & PriceSummary;
  onClose: () => void;
}>(({ bookingDetails, onClose }) => (
  <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
    <div className="card-base glass-card w-full max-w-lg p-8 text-center hover-glow animate-fade-in-up">
      <div className="animate-float">
        <h2 className="font-playfair text-h2 text-accent mb-4 text-glow-gold">
          🎉 Booking Confirmed!
        </h2>
      </div>
      <p className="text-body text-foreground mb-6">
        Thank you,{" "}
        <span className="text-accent-gold font-semibold">
          {bookingDetails.name}
        </span>
        . Your heritage stay is confirmed.
      </p>
      <div className="text-left glass-card p-4 rounded-lg border border-accent/20 mb-6 space-y-2">
        <p className="text-foreground">
          <strong className="text-foreground">Check-in:</strong>{" "}
          {new Date(bookingDetails.checkIn).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-foreground">
          <strong className="text-foreground">Check-out:</strong>{" "}
          {new Date(bookingDetails.checkOut).toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })}
        </p>
        <p className="text-foreground">
          <strong className="text-foreground">Total Paid:</strong>{" "}
          <span className="text-accent-gold font-bold text-glow-gold">
            ₹{bookingDetails.total.toLocaleString()}
          </span>
        </p>
      </div>
      <div className="animate-float" style={{ animationDelay: "0.2s" }}>
        <button
          onClick={onClose}
          className="btn btn-primary w-full hover-lift shadow-golden-glow"
        >
          ✨ Continue Exploring
        </button>
      </div>
    </div>
  </div>
));

// =================================================================
// == 5. MAIN BOOKING PAGE COMPONENT (Performance Optimized)
// =================================================================
const BookingPage = memo(() => {
  const [selectedRooms, setSelectedRooms] = useState<Set<number>>(
    new Set()
  );
  const [roomOccupancy, setRoomOccupancy] = useState<
    Record<number, "single" | "double">
  >({});
  const [bookingDetails, setBookingDetails] = useState<BookingDetails>({
    checkIn: "",
    checkOut: "",
    adults: 0,
    children: 0,
  });
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({
    name: "",
    email: "",
    phone: "",
    requests: "",
  });
  const [priceSummary, setPriceSummary] = useState<PriceSummary>({
    nights: 0,
    roomTotal: 0,
    taxes: 0,
    total: 0,
  });
  const [errors, setErrors] = useState<Errors>({});
  const [isConfirmed, setIsConfirmed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string>("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    // Check if we have a selectedRoom from navigation state
    const selectedRoom = location.state?.selectedRoom;
    if (selectedRoom) {
      // Scroll to booking form instead of top
      setTimeout(() => {
        const bookingForm = document.getElementById('booking-form');
        if (bookingForm) {
          bookingForm.scrollIntoView({ behavior: 'smooth' });
        }
      }, 100);
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.state]);

  // Handle room pre-selection from navigation state or URL parameters
  useEffect(() => {
    const selectedRoom = location.state?.selectedRoom;
    if (selectedRoom) {
      // Find room by name since AccommodationPage uses string names
      const room = roomsData.find(r => r.name === selectedRoom.name);
      if (room) {
        setSelectedRooms(new Set([room.id]));
        setRoomOccupancy({ [room.id]: 'single' });
      }
    } else {
      // Fallback to URL parameters
      const roomParam = searchParams.get("room");
      if (roomParam) {
        const roomId = parseInt(roomParam);
        if (roomId && roomId >= 1 && roomId <= roomsData.length) {
          setSelectedRooms(new Set([roomId]));
          setRoomOccupancy({ [roomId]: 'single' });
        }
      }
    }
  }, [searchParams, location.state]);

  // Memoized price calculation
  const calculatedPriceSummary = useMemo(() => {
    const { checkIn, checkOut } = bookingDetails;
    if (
      checkIn &&
      checkOut &&
      new Date(checkOut) > new Date(checkIn) &&
      selectedRooms.size > 0
    ) {
      // Use UTC dates to avoid timezone issues
      const date1 = new Date(checkIn + "T00:00:00.000Z");
      const date2 = new Date(checkOut + "T00:00:00.000Z");
      const timeDiff = date2.getTime() - date1.getTime();
      const nights = Math.max(1, Math.floor(timeDiff / (1000 * 3600 * 24)));

      const roomTotal =
        Array.from(selectedRooms).reduce((total, roomId) => {
          const room = roomsData.find((r) => r.id === roomId);
          const occupancy = roomOccupancy[roomId] || "single";
          const price = room ? room.pricing[occupancy] : 0;
          return total + price;
        }, 0) * nights;

      const taxes = roomTotal * 0.05;
      const total = roomTotal + taxes;
      return { nights, roomTotal, taxes, total };
    } else {
      return { nights: 0, roomTotal: 0, taxes: 0, total: 0 };
    }
  }, [bookingDetails, selectedRooms, roomOccupancy]);

  // Update price summary when calculated values change
  useEffect(() => {
    setPriceSummary(calculatedPriceSummary);
  }, [calculatedPriceSummary]);

  // Memoized handlers for performance
  const handleAddRoom = useCallback((roomId: number) => {
    setSelectedRooms((prev) => new Set(prev).add(roomId));
    setRoomOccupancy((prev) => ({ ...prev, [roomId]: "single" }));
    setIsRoomDropdownOpen(false);
  }, []);

  const handleRemoveRoom = useCallback((roomId: number) => {
    setSelectedRooms((prev) => {
      const newSet = new Set(prev);
      newSet.delete(roomId);
      return newSet;
    });
    setRoomOccupancy((prev) => {
      const newOccupancy = { ...prev };
      delete newOccupancy[roomId];
      return newOccupancy;
    });
  }, []);

  const handleBookingChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      const { name, value } = e.target;
      setBookingDetails((prev) => ({
        ...prev,
        [name]: name === 'adults' || name === 'children' ? parseInt(value, 10) : value,
      }));
    },
    []
  );

  const handleGuestInfoChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setGuestInfo((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    },
    []
  );

  const handleOccupancyChange = useCallback(
    (roomId: number, occupancy: "single" | "double") => {
      setRoomOccupancy((prev) => ({ ...prev, [roomId]: occupancy }));
    },
    []
  );

  // Memoized form validation
  const validateForm = useCallback(() => {
    const newErrors: Errors = {};
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time to start of day for accurate comparison

    // Room selection validation
    if (selectedRooms.size === 0)
      newErrors.room = "Please select at least one room.";

    // Date validations
    if (!bookingDetails.checkIn) {
      newErrors.checkIn = "Check-in date is required.";
    } else {
      // Use UTC dates to avoid timezone issues
      const checkInDate = new Date(bookingDetails.checkIn + "T00:00:00.000Z");
      const todayUTC = new Date(
        new Date().toISOString().split("T")[0] + "T00:00:00.000Z"
      );
      if (checkInDate < todayUTC) {
        newErrors.checkIn = "Check-in date cannot be in the past.";
      }
    }

    if (!bookingDetails.checkOut) {
      newErrors.checkOut = "Check-out date is required.";
    } else if (bookingDetails.checkIn) {
      // Use UTC dates to avoid timezone issues
      const checkInDate = new Date(bookingDetails.checkIn + "T00:00:00.000Z");
      const checkOutDate = new Date(bookingDetails.checkOut + "T00:00:00.000Z");

      if (checkOutDate <= checkInDate) {
        newErrors.checkOut = "Check-out must be at least 1 day after check-in.";
      }
    }

    // Room capacity validation (only count adults, children don't require separate beds)
    const totalAdults = bookingDetails.adults;
    const totalCapacity = Array.from(selectedRooms).reduce(
      (total, roomId) => {
        const room = roomsData.find((r) => r.id === roomId);
        return total + (room ? room.capacity : 0);
      },
      0
    );

    if (totalAdults > totalCapacity) {
      newErrors.room = `Selected rooms can accommodate ${totalCapacity} adults, but you have ${totalAdults} adults.`;
    }

    // Guest info validations
    if (!guestInfo.name.trim()) newErrors.name = "Full name is required.";
    if (!guestInfo.email || !/\S+@\S+\.\S+/.test(guestInfo.email))
      newErrors.email = "A valid email is required.";
    if (!guestInfo.phone.trim()) newErrors.phone = "Phone number is required.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [selectedRooms, bookingDetails, guestInfo]);

  // Memoized submit handler
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();
      setSubmitError(""); // Clear previous errors

      if (!validateForm()) {
        document
          .getElementById("booking-summary")
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
        return;
      }
      setIsSubmitting(true);

      try {
        // Show confirmation modal
        setIsConfirmed(true);
      } catch (error: any) {
        console.error('Booking error:', error);
        
        setSubmitError(
          error.message || "An unexpected error occurred while processing your booking. Please try again or contact us directly."
        );
        
        // Scroll to error message
        setTimeout(() => {
          document
            .getElementById("submit-error")
            ?.scrollIntoView({ behavior: "smooth", block: "center" });
        }, 100);
      } finally {
        setIsSubmitting(false);
      }
    },
    [validateForm, guestInfo, bookingDetails, selectedRooms, roomOccupancy, priceSummary]
  );

  // Memoized slider handlers
  const handlePreviousSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev > 0 ? prev - 1 : roomsData.length - 1));
  }, []);

  const handleNextSlide = useCallback(() => {
    setCurrentSlide((prev) => (prev < roomsData.length - 1 ? prev + 1 : 0));
  }, []);

  const handleSlideSelect = useCallback((index: number) => {
    setCurrentSlide(index);
  }, []);

  // Memoized dropdown toggle
  const toggleRoomDropdown = useCallback(() => {
    setIsRoomDropdownOpen((prev) => !prev);
  }, []);

  return (
    <div className="bg-background font-cormorant text-foreground">
      {isConfirmed && (
        <ConfirmationModal
          bookingDetails={{ ...guestInfo, ...bookingDetails, ...priceSummary }}
          onClose={() => setIsConfirmed(false)}
        />
      )}

      <main>
        <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
          {/* Background Image */}
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: "url(/images/Gallery/walkway.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
              backgroundAttachment: "fixed",
            }}
          />

          {/* Enhanced Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60" />

          {/* Content */}
          <div className="relative z-10 text-center text-white px-6">
            <div className="animate-float" style={{ animationDelay: "0.1s" }}>
              <h1 className="font-cinzel text-h1 mb-6 text-white text-glow-gold">
                Heritage Booking
              </h1>
            </div>
            <div className="animate-float" style={{ animationDelay: "0.2s" }}>
              <p className="text-body text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
                Select your preferred room and embark on a journey through time
                and luxury.
                <br />
                <span className="text-accent-gold/80 text-lg">
                  Experience colonial grandeur reimagined
                </span>
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <div className="animate-float" style={{ animationDelay: "0.3s" }}>
                <button
                  onClick={() =>
                    document
                      .getElementById("booking-form")
                      ?.scrollIntoView({ behavior: "smooth", block: "start" })
                  }
                  className="btn btn-primary hover-glow shadow-golden-glow"
                >
                  ✨ Begin Your Journey
                </button>
              </div>
              <div className="animate-float" style={{ animationDelay: "0.4s" }}>
                <button
                  onClick={() => navigate("/accommodation")}
                  className="btn btn-ghost text-white border-white/30 hover:border-accent-gold hover:text-accent-gold"
                >
                  View Rooms
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Rooms Showcase Section */}
        <section className="py-16 md:py-24 bg-gradient-to-br from-background via-background-secondary to-background-tertiary relative overflow-hidden">
          {/* Decorative Elements */}
          <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-accent/10 to-transparent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-tl from-accent-gold/10 to-transparent rounded-full blur-2xl animate-scale-breath" />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            {/* Enhanced Section Header */}
            <div className="text-center mb-16">
              <div className="flex items-center justify-center gap-3 mb-6">
                <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent" />
                <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                  Heritage Rooms
                </p>
                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent" />
              </div>
              <div className="animate-float">
                <h2 className="text-h2 font-playfair text-foreground mb-6 relative">
                  <span className="inline-block">Our Signature</span>{" "}
                  <span className="inline-block text-accent-gold">
                    Accommodations
                  </span>
                  <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
                </h2>
              </div>
              <p className="text-body text-foreground-subtle max-w-3xl mx-auto leading-relaxed">
                Experience the grandeur of colonial heritage in our carefully
                curated collection of premium rooms.
                <br />
                <span className="text-accent-gold/70 text-lg mt-2 block">
                  Where history meets modern luxury
                </span>
              </p>
            </div>

            {/* Carousel Slider for All Devices */}
            <div className="relative max-w-6xl mx-auto">
              <div className="overflow-hidden rounded-3xl">
                <div
                  className="flex transition-transform duration-700 ease-out"
                  style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                >
                  {roomsData.map((room) => (
                    <div
                      key={room.id}
                      className="w-full flex-shrink-0 px-4 md:px-6"
                    >
                      <div className="flex justify-center">
                        <RoomShowcaseCard room={room} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Enhanced Navigation Buttons */}
              <button
                onClick={handlePreviousSlide}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 p-4 rounded-full shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 z-10 border border-gray-200 dark:border-gray-700"
                aria-label="Previous room"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 19l-7-7 7-7"
                  />
                </svg>
              </button>
              <button
                onClick={handleNextSlide}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/95 dark:bg-gray-800/95 p-4 rounded-full shadow-xl hover:bg-white dark:hover:bg-gray-800 transition-all duration-300 hover:scale-110 z-10 border border-gray-200 dark:border-gray-700"
                aria-label="Next room"
              >
                <svg
                  className="w-6 h-6 text-gray-800 dark:text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
              </button>

              {/* Enhanced Slide Indicators */}
              <div className="flex justify-center items-center gap-4 mt-8">
                <div className="flex gap-3">
                  {roomsData.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => handleSlideSelect(index)}
                      className={`w-4 h-4 rounded-full transition-all duration-300 ${
                        currentSlide === index
                          ? "bg-accent scale-125 shadow-lg"
                          : "bg-gray-300 dark:bg-gray-600 hover:bg-gray-400 dark:hover:bg-gray-500"
                      }`}
                      aria-label={`Go to room ${index + 1}`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Enhanced Booking Form Section */}
        <section
          id="booking-form"
          className="py-16 md:py-24 bg-background relative overflow-hidden"
        >
          {/* Background Decorative Elements */}
          <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl animate-scale-breath" />
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-tl from-accent-gold/8 to-transparent rounded-full blur-2xl animate-float" />

          <div className="container mx-auto px-6 md:px-12 relative z-10">
            <div className="max-w-4xl mx-auto">
              <div className="card-base glass-card p-10 rounded-3xl shadow-heritage-lg border-2 border-accent/20 relative overflow-hidden hover-glow">
                {/* Enhanced Decorative elements */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full animate-pulse" />
                <div
                  className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-gold/10 to-transparent rounded-tr-full animate-pulse"
                  style={{ animationDelay: "1s" }}
                />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-accent/5 to-transparent rounded-full animate-scale-breath" />

                {/* Multiple Animated border elements */}
                <div className="absolute inset-0 rounded-3xl border border-accent-gold/30 opacity-50 animate-pulse" />
                <div
                  className="absolute inset-2 rounded-2xl border border-accent/20 opacity-30 animate-pulse"
                  style={{ animationDelay: "0.5s" }}
                />

                {/* Enhanced Header */}
                <div className="relative z-10 text-center mb-8">
                  <div className="flex items-center justify-center gap-3 mb-6">
                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-shimmer" />
                    <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">
                      Heritage Booking
                    </span>
                    <div
                      className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-shimmer"
                      style={{ animationDelay: "0.5s" }}
                    />
                  </div>
                  <h3 className="font-playfair text-h3 text-foreground-heading relative text-glow-gold">
                    <span className="inline-block">Reserve Your</span>{" "}
                    <span className="inline-block text-accent-gold">
                      Heritage Experience
                    </span>
                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
                  </h3>
                  <p className="text-body text-foreground-subtle mt-4 max-w-2xl mx-auto leading-relaxed">
                    Select your preferred dates, guests, and heritage rooms for
                    an unforgettable colonial experience.
                    <br />
                    <span className="text-accent-gold/70 text-lg mt-2 block">
                      Creating memories that transcend time
                    </span>
                  </p>
                </div>
                <form
                  onSubmit={handleSubmit}
                  className="relative z-10 space-y-8"
                >
                  {/* Booking Details Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Left Column - Dates & Guests */}
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">
                            Check-in Date
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="checkIn"
                              value={bookingDetails.checkIn}
                              onChange={handleBookingChange}
                              className="w-full p-4 pl-12 glass-card border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 text-base text-foreground"
                            />
                            <CalendarIcon />
                          </div>
                          {errors.checkIn && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.checkIn}
                            </p>
                          )}
                        </div>
                        <div>
                          <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">
                            Check-out Date
                          </label>
                          <div className="relative">
                            <input
                              type="date"
                              name="checkOut"
                              value={bookingDetails.checkOut}
                              onChange={handleBookingChange}
                              className="w-full p-4 pl-12 bg-background/80 backdrop-blur-sm border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 text-base"
                            />
                            <CalendarIcon />
                          </div>
                          {errors.checkOut && (
                            <p className="text-red-500 text-sm mt-2">
                              {errors.checkOut}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">
                            Adults
                          </label>
                          <div className="relative">
                            <select
                              name="adults"
                              value={bookingDetails.adults}
                              onChange={handleBookingChange}
                              className="w-full p-4 pl-12 glass-card border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 appearance-none text-base text-foreground"
                            >
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                              <option>3</option>
                              <option>4</option>
                            </select>
                            <UserIcon />
                          </div>
                        </div>
                        <div>
                          <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">
                            Children
                          </label>
                          <div className="relative">
                            <select
                              name="children"
                              value={bookingDetails.children}
                              onChange={handleBookingChange}
                              className="w-full p-4 pl-12 glass-card border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 appearance-none text-base text-foreground"
                            >
                              <option>0</option>
                              <option>1</option>
                              <option>2</option>
                            </select>
                            <UserIcon />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Right Column - Room Selection */}
                    <div className="space-y-6">
                      <div>
                        <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">
                          Select Heritage Rooms
                        </label>
                        <div className="relative">
                          <button
                            type="button"
                            onClick={toggleRoomDropdown}
                            className="w-full p-4 glass-card border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 text-left flex justify-between items-center hover-lift"
                          >
                            <span className="text-foreground">
                              {Object.keys(selectedRooms).length > 0
                                ? `${
                                    Object.keys(selectedRooms).length
                                  } room(s) selected`
                                : "Choose your heritage rooms"}
                            </span>
                            <span
                              className={`transform transition-transform ${
                                isRoomDropdownOpen ? "rotate-180" : ""
                              }`}
                            >
                              ▼
                            </span>
                          </button>

                          {/* Room Dropdown */}
                          {isRoomDropdownOpen && (
                            <div className="absolute top-full left-0 right-0 mt-2 glass-card border-2 border-accent/20 rounded-xl shadow-heritage-lg z-50 max-h-80 overflow-y-auto">
                              {roomsData.map((room) => (
                                <div
                                  key={room.id}
                                  className="border-b border-accent/10 last:border-b-0"
                                >
                                  <RoomDropdownOption
                                    room={room}
                                    onSelect={() => {
                                      handleAddRoom(room.id);
                                    }}
                                  />
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      </div>

                      {/* Selected Rooms Display */}
                      {selectedRooms.size > 0 && (
                        <div className="space-y-3 overflow-hidden">
                          <h4 className="font-poppins text-sm font-medium text-foreground-heading">
                            Selected Rooms:
                          </h4>
                          {Array.from(selectedRooms).map((roomId) => {
                              const room = roomsData.find(
                                (r) => r.id === roomId
                              );
                              return room ? (
                                <SelectedRoomCard
                                  key={roomId}
                                  room={room}
                                  occupancy={
                                    roomOccupancy[roomId] || "single"
                                  }
                                  onRemove={() =>
                                    handleRemoveRoom(roomId)
                                  }
                                  onOccupancyChange={(occupancy) =>
                                    handleOccupancyChange(
                                      roomId,
                                      occupancy
                                    )
                                  }
                                />
                              ) : null;
                            }
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Price Summary */}
                  {selectedRooms.size > 0 && (
                    <div className="bg-gradient-to-r from-accent/10 to-accent-gold/10 border border-accent/20 rounded-xl p-6 space-y-4 overflow-hidden">
                      <h4 className="font-playfair text-h4 text-foreground-heading text-center mb-4 text-glow-gold">
                        Booking Summary
                      </h4>
                      {Array.from(selectedRooms).map((roomId) => {
                          const room = roomsData.find(
                            (r) => r.id === roomId
                          );
                          const occupancy =
                            roomOccupancy[roomId] || "single";
                          return room ? (
                            <div
                              key={roomId}
                              className="flex justify-between items-center py-3 border-b border-accent/10 last:border-b-0 hover-lift"
                            >
                              <span className="font-cormorant text-foreground-subtle">
                                {room.name}
                              </span>
                              <span className="font-poppins font-semibold text-accent text-glow-primary">
                                ₹{room.pricing[occupancy].toLocaleString()}
                              </span>
                            </div>
                          ) : null;
                        }
                      )}
                      <div className="flex justify-between text-base pt-2">
                        <span className="font-cormorant text-foreground-subtle">
                          Subtotal ({priceSummary.nights} nights)
                        </span>
                        <span className="font-poppins font-semibold">
                          ₹{priceSummary.roomTotal.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-base">
                        <span className="font-cormorant text-foreground-subtle">
                          Taxes & Fees (5%)
                        </span>
                        <span className="font-poppins font-semibold">
                          ₹{priceSummary.taxes.toLocaleString()}
                        </span>
                      </div>
                      <div className="flex justify-between text-xl font-bold pt-4 border-t border-accent/20 hover-lift">
                        <span className="font-playfair text-foreground-heading">
                          Total Amount
                        </span>
                        <span className="font-poppins text-accent text-glow-gold">
                          ₹{priceSummary.total.toLocaleString()}
                        </span>
                      </div>
                    </div>
                  )}
                  {errors.room && (
                    <p
                      className="text-red-500 text-sm mt-2 text-center glass-card border border-red-200 rounded-lg p-3 animate-bounce-gentle"
                      id="booking-summary"
                    >
                      {errors.room}
                    </p>
                  )}

                  <div className="pt-6 border-t border-accent/20">
                    <div className="text-center mb-6">
                      <h4 className="font-playfair text-h4 text-foreground-heading relative inline-block text-glow-gold">
                        Guest Information
                        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
                      </h4>
                    </div>
                    <div className="space-y-4">
                      <div>
                        <input
                          type="text"
                          name="name"
                          placeholder="Full Name"
                          value={guestInfo.name}
                          onChange={handleGuestInfoChange}
                          className="w-full p-4 glass-card border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 placeholder:text-foreground-subtle text-foreground hover-lift"
                        />
                        {errors.name && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.name}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="email"
                          name="email"
                          placeholder="Email Address"
                          value={guestInfo.email}
                          onChange={handleGuestInfoChange}
                          className="w-full p-4 glass-card border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 placeholder:text-foreground-subtle text-foreground hover-lift"
                        />
                        {errors.email && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.email}
                          </p>
                        )}
                      </div>
                      <div>
                        <input
                          type="tel"
                          name="phone"
                          placeholder="Phone Number"
                          value={guestInfo.phone}
                          onChange={handleGuestInfoChange}
                          className="w-full p-4 glass-card border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 placeholder:text-foreground-subtle text-foreground hover-lift"
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-sm mt-2">
                            {errors.phone}
                          </p>
                        )}
                      </div>
                      <div>
                        <textarea
                          name="requests"
                          placeholder="Special Requests (optional)"
                          value={guestInfo.requests}
                          onChange={handleGuestInfoChange}
                          className="w-full p-4 glass-card border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 placeholder:text-foreground-subtle text-foreground h-24 resize-none hover-lift"
                        ></textarea>
                      </div>
                    </div>
                  </div>

                  {submitError && (
                    <div
                      id="submit-error"
                      className="mt-4 p-4 bg-red-500/10 border border-red-500/30 rounded-xl text-red-400 text-sm animate-fade-in-up"
                    >
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-5 h-5 flex-shrink-0"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span>{submitError}</span>
                      </div>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="btn btn-primary w-full mt-6 py-4 text-lg font-semibold relative overflow-hidden disabled:opacity-70 hover:shadow-golden-glow transform hover:scale-105 active:scale-95 animate-gradient-flow"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                          Processing...
                        </>
                      ) : (
                        <>✨ Confirm Heritage Booking</>
                      )}
                    </span>
                    {!isSubmitting && (
                      <span
                        className="absolute inset-0 bg-white/10 animate-shimmer"
                        style={{
                          backgroundSize: "200% 100%",
                          backgroundImage:
                            "linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)",
                        }}
                      ></span>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        <section className="py-16 md:py-24 px-6 md:px-12 border-t border-border bg-gradient-to-br from-background-secondary to-background">
          <div className="container mx-auto">
            <div className="animate-float">
              <h2 className="font-playfair text-h2 text-foreground text-center mb-12 text-glow-gold">
                Why Book With Us?
              </h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
              {whyBookWithUs.map((item, index) => (
                <div
                  key={index}
                  className="card-tilt hover-lift animate-float"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div className="bg-accent/10 p-4 inline-block rounded-full mb-4 hover-pulse glass-card shadow-soft-sunlight">
                    <CheckCircleIcon />
                  </div>
                  <div
                    className="animate-float"
                    style={{ animationDelay: `${index * 0.3}s` }}
                  >
                    <h3 className="font-playfair text-h4 text-foreground text-glow-gold">
                      {item.title}
                    </h3>
                  </div>
                  <p className="text-body text-foreground-subtle mt-2">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
});

export default BookingPage;
