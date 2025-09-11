import React, { useState, useEffect, useCallback, useMemo, memo } from 'react';
import { useSearchParams } from 'react-router-dom';

// =================================================================
// == 1. TYPE DEFINITIONS
// =================================================================
interface Room {
    id: number;
    name: string;
    description: string;
    amenities: string[];
    capacity: number;
    price: number;
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
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-foreground-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg>;
const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 text-foreground-subtle absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none"><path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path><circle cx="12" cy="7" r="4"></circle></svg>;
const CheckCircleIcon = () => <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5 mr-2"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

// =================================================================
// == 3. DUMMY DATA (Simulating API response for rooms)
// =================================================================
const roomsData: Room[] = [
    { id: 1, name: "The President's Chamber — Deluxe", description: "A refined deluxe chamber with heritage aesthetics, curated furnishings, and modern comforts.", amenities: ["King Bed", "Garden View", "Wi-Fi", "Air Conditioned", "Room Service", "Mini Bar", "Flat-screen TV"], capacity: 2, price: 8500, image: "/images/Accommodation/room (2).webp" },
    { id: 2, name: "The Magistrate's Chamber — Executive", description: "Executive class elegance with generous space and period details for a serene stay.", amenities: ["King Bed + Sofa Bed", "Work Desk", "Wi-Fi", "Air Conditioned", "Room Service", "Coffee Maker", "Flat-screen TV"], capacity: 3, price: 10500, image: "/images/Accommodation/room (3).webp" },
    { id: 3, name: "The Collector's Chamber — Deluxe", description: "Deluxe comfort with curated antique accents and a calm, sophisticated ambiance.", amenities: ["Queen Bed", "Traditional Artwork", "Wi-Fi", "Air Conditioned", "Room Service", "Mini Bar"], capacity: 2, price: 7500, image: "/images/Accommodation/room (4).webp" },
    { id: 4, name: "The Residency Room — Executive", description: "Executive refinement with heritage textures, ideal for business and leisure travelers.", amenities: ["King Bed", "Quiet Wing", "Wi-Fi", "Air Conditioned", "Room Service", "Flat-screen TV"], capacity: 3, price: 9500, image: "/images/Accommodation/room (5).webp" },
    { id: 5, name: "The Plantation Room — Deluxe", description: "Deluxe room inspired by plantation-era charm with tranquil tones and modern amenities.", amenities: ["Queen Bed", "Garden View", "Wi-Fi", "Air Conditioned", "Room Service", "Mini Bar"], capacity: 2, price: 6500, image: "/images/Accommodation/room (6).webp" },
];

const whyBookWithUs = [
    { title: "Best Rate Guarantee", description: "We guarantee the lowest price when you book directly with us." },
    { title: "Exclusive Offers", description: "Access special packages and deals only available on our website." },
    { title: "Direct Support", description: "Our dedicated concierge team is available 24/7 for any assistance." },
];

// =================================================================
// == 4. HELPER COMPONENTS (Memoized for Performance)
// =================================================================
// Enhanced Room Showcase Card
const RoomShowcaseCard = memo<{ room: Room; }>(({ room }) => (
    <div
        className="card-tilt group relative overflow-hidden rounded-2xl shadow-heritage-lg hover:shadow-golden-glow transition-all duration-300 hover-3d animate-fade-in-up"
        style={{ animationDelay: `${room.id * 0.1}s` }}
    >
        {/* Enhanced Image with Overlay */}
        <div className="relative aspect-[4/3] overflow-hidden img-overlay">
            <img src={room.image} alt={room.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" loading="lazy" />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
            
            {/* Floating Room Number */}
            <div className="absolute top-4 right-4 text-white/20 font-cinzel text-3xl font-bold pointer-events-none select-none rotate-12 animate-float">
                {room.id.toString().padStart(2, '0')}
            </div>
        </div>
        
        {/* Enhanced Content Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
            <div className="flex items-center gap-2 mb-3">
                <span className="glassmorphic px-3 py-1 rounded-full text-xs font-poppins font-medium border border-accent-gold/40 animate-float">
                    ✨ Heritage Suite
                </span>
            </div>
            <div className="animate-float" style={{ animationDelay: '0.2s' }}>
                <h3 className="font-playfair text-xl font-semibold mb-2 group-hover:text-accent-gold transition-colors duration-300 text-glow-gold">
                    {room.name}
                </h3>
            </div>
            <p className="font-cormorant text-sm opacity-90 mb-3 line-clamp-2 leading-relaxed">
                {room.description}
            </p>
            <div className="flex justify-between items-center">
                <div className="flex gap-2">
                    {room.amenities.slice(0, 2).map((amenity) => (
                        <span key={amenity} className="text-xs glassmorphic px-2 py-1 rounded-full border border-white/20 hover:border-accent-gold/40 transition-colors duration-300">
                            {amenity}
                        </span>
                    ))}
                </div>
                <div className="text-right">
                    <p className="font-poppins font-bold text-accent-gold text-lg group-hover:scale-105 transition-transform duration-300 text-glow-gold animate-text-shimmer">
                        ₹{room.price.toLocaleString()}
                    </p>
                    <p className="text-xs opacity-75">per night</p>
            </div>
        </div>
            
            {/* Hover Overlay Effect */}
            <div className="absolute inset-0 bg-gradient-to-t from-accent-gold/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            </div>
                </div>
));

// Room Dropdown Option
const RoomDropdownOption = memo<{ room: Room; onSelect: () => void; }>(({ room, onSelect }) => (
    <div 
        onClick={onSelect}
        className="flex items-center gap-4 p-4 hover:bg-accent/10 transition-colors cursor-pointer border-b border-accent/10 last:border-b-0 hover-lift"
    >
        <img src={room.image} alt={room.name} className="w-16 h-16 rounded-lg object-cover" loading="lazy" />
        <div className="flex-1">
            <h4 className="font-playfair font-semibold text-foreground">{room.name}</h4>
            <p className="text-sm text-foreground-subtle">{room.amenities.slice(0, 2).join(', ')}</p>
            <p className="font-poppins font-bold text-accent">₹{room.price.toLocaleString()}/night</p>
                </div>
    </div>
));

// Enhanced Selected Room Card
const SelectedRoomCard = memo<{ room: Room; quantity: number; onRemove: () => void; }>(({ room, quantity, onRemove }) => (
    <div className="card-interactive flex items-center gap-3 glassmorphic border border-accent/20 rounded-xl p-4 hover-lift animate-fade-in-up">
        <img src={room.image} alt={room.name} className="w-14 h-14 rounded-lg object-cover img-overlay" loading="lazy" />
        <div className="flex-1">
            <h5 className="font-playfair font-semibold text-sm text-foreground">{room.name}</h5>
            <p className="text-xs text-foreground-subtle">Quantity: <span className="text-accent font-medium">{quantity}</span></p>
        </div>
        <div className="text-right">
            <p className="font-poppins font-bold text-accent text-sm text-glow-primary">₹{(room.price * quantity).toLocaleString()}</p>
            <button onClick={onRemove} className="text-xs text-red-500 hover:text-red-700 transition-colors hover-bounce font-medium">
                ✕ Remove
            </button>
            </div>
        </div>
));

const ConfirmationModal = memo<{ bookingDetails: GuestInfo & BookingDetails & PriceSummary; onClose: () => void; }>(({ bookingDetails, onClose }) => (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4 animate-fade-in">
        <div className="card-base glassmorphic w-full max-w-lg p-8 text-center hover-glow animate-fade-in-up">
            <div className="animate-float">
                <h2 className="font-playfair text-h2 text-accent mb-4 text-glow-gold">🎉 Booking Confirmed!</h2>
            </div>
            <p className="text-body text-foreground mb-6">Thank you, <span className="text-accent-gold font-semibold">{bookingDetails.name}</span>. Your heritage stay is confirmed. A confirmation email has been sent to <span className="text-accent">{bookingDetails.email}</span>.</p>
            <div className="text-left glassmorphic p-4 rounded-lg border border-accent/20 mb-6 space-y-2">
                <p className="text-foreground"><strong className="text-foreground">Check-in:</strong> {new Date(bookingDetails.checkIn).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-foreground"><strong className="text-foreground">Check-out:</strong> {new Date(bookingDetails.checkOut).toLocaleDateString('en-GB', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
                <p className="text-foreground"><strong className="text-foreground">Total Paid:</strong> <span className="text-accent-gold font-bold text-glow-gold">₹{bookingDetails.total.toLocaleString()}</span></p>
            </div>
            <div className="animate-float" style={{ animationDelay: '0.2s' }}>
                <button onClick={onClose} className="btn btn-primary w-full hover-lift shadow-golden-glow">✨ Continue Exploring</button>
            </div>
            </div>
    </div>
));

// =================================================================
// == 5. MAIN BOOKING PAGE COMPONENT (Performance Optimized)
// =================================================================
const BookingPage = memo(() => {
    const [selectedRooms, setSelectedRooms] = useState<Record<number, number>>({});
    const [bookingDetails, setBookingDetails] = useState<BookingDetails>({ checkIn: '', checkOut: '', adults: 2, children: 0 });
    const [guestInfo, setGuestInfo] = useState<GuestInfo>({ name: '', email: '', phone: '', requests: '' });
    const [priceSummary, setPriceSummary] = useState<PriceSummary>({ nights: 0, roomTotal: 0, taxes: 0, total: 0 });
    const [errors, setErrors] = useState<Errors>({});
    const [isConfirmed, setIsConfirmed] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [searchParams] = useSearchParams();
    const [isRoomDropdownOpen, setIsRoomDropdownOpen] = useState(false);
    const [currentSlide, setCurrentSlide] = useState(0);

    // Handle URL parameters for pre-selecting rooms
    useEffect(() => {
        const roomParam = searchParams.get('room');
        if (roomParam) {
            const roomId = parseInt(roomParam);
            if (roomId && roomId >= 1 && roomId <= roomsData.length) {
                setSelectedRooms({ [roomId]: 1 });
            }
        }
    }, [searchParams]);

    // Memoized price calculation
    const calculatedPriceSummary = useMemo(() => {
        const { checkIn, checkOut } = bookingDetails;
        if (checkIn && checkOut && new Date(checkOut) > new Date(checkIn) && Object.keys(selectedRooms).length > 0) {
            const date1 = new Date(checkIn);
            const date2 = new Date(checkOut);
            const timeDiff = date2.getTime() - date1.getTime();
            const nights = Math.max(1, Math.ceil(timeDiff / (1000 * 3600 * 24)));
            
            const roomTotal = Object.entries(selectedRooms).reduce((total, [roomId, quantity]) => {
                const room = roomsData.find(r => r.id === parseInt(roomId));
                return total + (room ? room.price * quantity : 0);
            }, 0) * nights;

            const taxes = roomTotal * 0.18;
            const total = roomTotal + taxes;
            return { nights, roomTotal, taxes, total };
        } else {
            return { nights: 0, roomTotal: 0, taxes: 0, total: 0 };
        }
    }, [bookingDetails, selectedRooms]);

    // Update price summary when calculated values change
    useEffect(() => {
        setPriceSummary(calculatedPriceSummary);
    }, [calculatedPriceSummary]);

    // Memoized handlers for performance
    const handleAddRoom = useCallback((roomId: number, quantity: number = 1) => {
        setSelectedRooms(prev => ({ ...prev, [roomId]: quantity }));
        setIsRoomDropdownOpen(false);
    }, []);
    
    const handleRemoveRoom = useCallback((roomId: number) => {
        setSelectedRooms(prev => {
            const newRooms = { ...prev };
            delete newRooms[roomId];
            return newRooms;
        });
    }, []);
    
    const handleBookingChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setBookingDetails(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);
    
    const handleGuestInfoChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setGuestInfo(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }, []);

    // Memoized form validation
    const validateForm = useCallback(() => {
        const newErrors: Errors = {};
        if (Object.keys(selectedRooms).length === 0) newErrors.room = 'Please select at least one room.';
        if (!bookingDetails.checkIn) newErrors.checkIn = 'Check-in date is required.';
        if (!bookingDetails.checkOut) newErrors.checkOut = 'Check-out date is required.';
        if (new Date(bookingDetails.checkOut) <= new Date(bookingDetails.checkIn)) newErrors.checkOut = 'Check-out must be after check-in.';
        if (!guestInfo.name.trim()) newErrors.name = 'Full name is required.';
        if (!guestInfo.email || !/\S+@\S+\.\S+/.test(guestInfo.email)) newErrors.email = 'A valid email is required.';
        if (!guestInfo.phone.trim()) newErrors.phone = 'Phone number is required.';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    }, [selectedRooms, bookingDetails, guestInfo]);

    // Memoized submit handler
    const handleSubmit = useCallback(async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) {
            document.getElementById('booking-summary')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }
        setIsSubmitting(true);

        const bookingData = {
            full_name: guestInfo.name,
            email: guestInfo.email,
            phone: guestInfo.phone,
            special_requests: guestInfo.requests,
            check_in: bookingDetails.checkIn,
            check_out: bookingDetails.checkOut,
            adults: bookingDetails.adults,
            children: bookingDetails.children,
            selected_rooms: selectedRooms,
            total_price: priceSummary.total,
            nights: priceSummary.nights,
        };

        try {
            const response = await fetch('http://127.0.0.1:8000/api/room-bookings/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(bookingData),
            });

            if (!response.ok) {
                throw new Error('Booking failed. Please try again later.');
            }

            setIsConfirmed(true);

        } catch (error: any) {
            alert(error.message);
        } finally {
            setIsSubmitting(false);
        }
    }, [validateForm, guestInfo, bookingDetails, selectedRooms, priceSummary]);

    // Memoized slider handlers
    const handlePreviousSlide = useCallback(() => {
        setCurrentSlide(prev => prev > 0 ? prev - 1 : roomsData.length - 1);
    }, []);

    const handleNextSlide = useCallback(() => {
        setCurrentSlide(prev => prev < roomsData.length - 1 ? prev + 1 : 0);
    }, []);

    const handleSlideSelect = useCallback((index: number) => {
        setCurrentSlide(index);
    }, []);

    // Memoized dropdown toggle
    const toggleRoomDropdown = useCallback(() => {
        setIsRoomDropdownOpen(prev => !prev);
    }, []);

    return (
        <div className="bg-background font-cormorant text-foreground">
                {isConfirmed && <ConfirmationModal bookingDetails={{...guestInfo, ...bookingDetails, ...priceSummary}} onClose={() => setIsConfirmed(false)} />}
            
            <main>
                <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
                    {/* Background Image */}
                    <div 
                        className="absolute inset-0 w-full h-full"
                        style={{
                            backgroundImage: 'url(https://images.unsplash.com/photo-1561501900-3701fa6a0864?w=1600&h=900&fit=crop)',
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            backgroundAttachment: 'fixed'
                        }}
                    />
                    
                    {/* Enhanced Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/60" />
                    
                    {/* Content */}
                    <div className="relative z-10 text-center text-white px-6">
                        <div className="animate-float" style={{ animationDelay: '0.1s' }}>
                            <h1 
                                className="font-cinzel text-h1 mb-6 text-white text-glow-gold"
                            >
                                Heritage Booking
                            </h1>
                        </div>
                        <div className="animate-float" style={{ animationDelay: '0.2s' }}>
                            <p 
                                className="text-body text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed"
                        >
                            Select your preferred suite and embark on a journey through time and luxury.
                                <br />
                                <span className="text-accent-gold/80 text-lg">Experience colonial grandeur reimagined</span>
                            </p>
                        </div>
                        <div
                            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
                        >
                            <div className="animate-float" style={{ animationDelay: '0.3s' }}>
                                <button className="btn btn-primary hover-glow shadow-golden-glow">
                                    ✨ Begin Your Journey
                                </button>
                            </div>
                            <div className="animate-float" style={{ animationDelay: '0.4s' }}>
                                <button className="btn btn-ghost text-white border-white/30 hover:border-accent-gold hover:text-accent-gold">
                                    View Suites
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
                                <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">Heritage Suites</p>
                                <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent" />
                            </div>
                            <div className="animate-float">
                                <h2 className="text-h2 font-playfair text-foreground mb-6 relative">
                                    <span className="inline-block">Our Signature</span>{' '}
                                    <span className="inline-block text-accent-gold">Accommodations</span>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
                                </h2>
                            </div>
                            <p className="text-body text-foreground-subtle max-w-3xl mx-auto leading-relaxed">
                                Experience the grandeur of colonial heritage in our carefully curated collection of premium suites and rooms.
                                <br />
                                <span className="text-accent-gold/70 text-lg mt-2 block">Where history meets modern luxury</span>
                            </p>
                        </div>

                        {/* Desktop Grid */}
                        <div className="hidden md:grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {roomsData.map(room => (
                                <RoomShowcaseCard key={room.id} room={room} />
                            ))}
                        </div>

                        {/* Mobile/Tablet Slider */}
                        <div className="md:hidden relative">
                            <div className="overflow-hidden rounded-2xl">
                                <div 
                                    className="flex transition-transform duration-500 ease-out"
                                    style={{ transform: `translateX(-${currentSlide * 100}%)` }}
                                >
                        {roomsData.map(room => (
                                        <div key={room.id} className="w-full flex-shrink-0 px-2">
                                            <RoomShowcaseCard room={room} />
                                        </div>
                                    ))}
                                </div>
                            </div>
                            
                            {/* Slider Navigation */}
                            <div className="flex justify-center items-center gap-4 mt-6">
                                <button 
                                    onClick={handlePreviousSlide}
                                    className="w-10 h-10 rounded-full bg-accent/20 backdrop-blur-sm flex items-center justify-center hover:bg-accent/30 transition-colors"
                                >
                                    ←
                                </button>
                                <div className="flex gap-2">
                                    {roomsData.map((_, index) => (
                                        <button
                                            key={index}
                                            onClick={() => handleSlideSelect(index)}
                                            className={`w-3 h-3 rounded-full transition-all ${
                                                currentSlide === index ? 'bg-accent scale-125' : 'bg-accent/30'
                                            }`}
                            />
                        ))}
                    </div>
                                <button 
                                    onClick={handleNextSlide}
                                    className="w-10 h-10 rounded-full bg-accent/20 backdrop-blur-sm flex items=center justify-center hover:bg-accent/30 transition-colors"
                                >
                                    →
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Enhanced Booking Form Section */}
                <section className="py-16 md:py-24 bg-background relative overflow-hidden">
                    {/* Background Decorative Elements */}
                    <div className="absolute top-20 left-10 w-72 h-72 bg-gradient-to-br from-accent/5 to-transparent rounded-full blur-3xl animate-scale-breath" />
                    <div className="absolute bottom-10 right-10 w-64 h-64 bg-gradient-to-tl from-accent-gold/8 to-transparent rounded-full blur-2xl animate-float" />
                    
                    <div className="container mx-auto px-6 md:px-12 relative z-10">
                        <div className="max-w-4xl mx-auto">
                        <div 
                            className="card-base glassmorphic p-10 rounded-3xl shadow-heritage-lg border-2 border-accent/20 relative overflow-hidden hover-glow"
                        >
                            {/* Enhanced Decorative elements */}
                            <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full animate-pulse" />
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-accent-gold/10 to-transparent rounded-tr-full animate-pulse" style={{ animationDelay: '1s' }} />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-radial from-accent/5 to-transparent rounded-full animate-scale-breath" />
                            
                            {/* Multiple Animated border elements */}
                            <div className="absolute inset-0 rounded-3xl border border-accent-gold/30 opacity-50 animate-pulse" />
                            <div className="absolute inset-2 rounded-2xl border border-accent/20 opacity-30 animate-pulse" style={{ animationDelay: '0.5s' }} />
                            
                            {/* Enhanced Header */}
                            <div className="relative z-10 text-center mb-8">
                                <div className="flex items-center justify-center gap-3 mb-6">
                                    <div className="w-12 h-0.5 bg-gradient-to-r from-transparent to-accent animate-shimmer" />
                                    <span className="font-poppins text-sm tracking-widest text-accent uppercase font-medium">Heritage Booking</span>
                                    <div className="w-12 h-0.5 bg-gradient-to-l from-transparent to-accent animate-shimmer" style={{ animationDelay: '0.5s' }} />
                                </div>
                                <h3 className="font-playfair text-h3 text-foreground-heading relative text-glow-gold">
                                    <span className="inline-block">Reserve Your</span>{' '}
                                    <span className="inline-block text-accent-gold">Heritage Experience</span>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
                                </h3>
                                <p className="text-body text-foreground-subtle mt-4 max-w-2xl mx-auto leading-relaxed">
                                    Select your preferred dates, guests, and heritage suites for an unforgettable colonial experience.
                                    <br />
                                    <span className="text-accent-gold/70 text-lg mt-2 block">Creating memories that transcend time</span>
                                </p>
                            </div>
                            <form onSubmit={handleSubmit} className="relative z-10 space-y-8">
                                {/* Booking Details Grid */}
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                    {/* Left Column - Dates & Guests */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">Check-in Date</label>
                                            <div className="relative">
                                                <input type="date" name="checkIn" value={bookingDetails.checkIn} onChange={handleBookingChange} className="w-full p-4 pl-12 glassmorphic border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 text-base text-foreground"/>
                                                <CalendarIcon />
                                            </div>
                                            {errors.checkIn && <p className="text-red-500 text-sm mt-2">{errors.checkIn}</p>}
                                            </div>
                                            <div>
                                                <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">Check-out Date</label>
                                                <div className="relative">
                                                    <input type="date" name="checkOut" value={bookingDetails.checkOut} onChange={handleBookingChange} className="w-full p-4 pl-12 bg-background/80 backdrop-blur-sm border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 text-base"/>
                                                    <CalendarIcon />
                                                </div>
                                                {errors.checkOut && <p className="text-red-500 text-sm mt-2">{errors.checkOut}</p>}
                                            </div>
                                        </div>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            <div>
                                                <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">Adults</label>
                                            <div className="relative">
                                                <select name="adults" value={bookingDetails.adults} onChange={handleBookingChange} className="w-full p-4 pl-12 glassmorphic border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 appearance-none text-base text-foreground">
                                                    <option>1</option><option>2</option><option>3</option><option>4</option>
                                                </select>
                                                <UserIcon />
                                            </div>
                                            </div>
                                            <div>
                                                <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">Children</label>
                                            <div className="relative">
                                                <select name="children" value={bookingDetails.children} onChange={handleBookingChange} className="w-full p-4 pl-12 glassmorphic border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 appearance-none text-base text-foreground">
                                                    <option>0</option><option>1</option><option>2</option>
                                                </select>
                                                <UserIcon />
                                            </div>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Right Column - Room Selection */}
                                    <div className="space-y-6">
                                        <div>
                                            <label className="font-poppins text-sm font-medium text-foreground-heading block mb-3">Select Heritage Suites</label>
                                            <div className="relative">
                                                <button
                                                    type="button"
                                                    onClick={toggleRoomDropdown}
                                                    className="w-full p-4 glassmorphic border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 text-left flex justify-between items-center hover-lift"
                                                >
                                                    <span className="text-foreground">
                                                        {Object.keys(selectedRooms).length > 0 
                                                            ? `${Object.keys(selectedRooms).length} suite(s) selected`
                                                            : 'Choose your heritage suites'
                                                        }
                                                    </span>
                                                    <span className={`transform transition-transform ${isRoomDropdownOpen ? 'rotate-180' : ''}`}>▼</span>
                                                </button>
                                                
                                                {/* Room Dropdown */}
                                                {isRoomDropdownOpen && (
                                                    <div
                                                        className="absolute top-full left-0 right-0 mt-2 glassmorphic border-2 border-accent/20 rounded-xl shadow-heritage-lg z-50 max-h-80 overflow-y-auto"
                                                    >
                                                        {roomsData.map(room => (
                                                            <div key={room.id} className="border-b border-accent/10 last:border-b-0">
                                                                <RoomDropdownOption 
                                                                    room={room} 
                                                                    onSelect={() => {
                                                                        const quantity = prompt(`How many ${room.name} rooms would you like?`, '1');
                                                                        if (quantity && parseInt(quantity) > 0) {
                                                                            handleAddRoom(room.id, parseInt(quantity));
                                                                        }
                                                                    }}
                                                                />
                                                            </div>
                                                        ))}
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        {/* Selected Rooms Display */}
                                        {Object.keys(selectedRooms).length > 0 && (
                                            <div
                                                className="space-y-3 overflow-hidden"
                                            >
                                                <h4 className="font-poppins text-sm font-medium text-foreground-heading">Selected Suites:</h4>
                                                {Object.entries(selectedRooms).map(([roomId, quantity]) => {
                                                    const room = roomsData.find(r => r.id === parseInt(roomId));
                                                    return room ? (
                                                        <SelectedRoomCard
                                                            key={roomId}
                                                            room={room}
                                                            quantity={quantity}
                                                            onRemove={() => handleRemoveRoom(parseInt(roomId))}
                                                        />
                                                    ) : null;
                                                })}
                                            </div>
                                        )}
                                    </div>
                                </div>
                                
                                {/* Price Summary */}
                                {Object.keys(selectedRooms).length > 0 && (
                                    <div 
                                        className="bg-gradient-to-r from-accent/10 to-accent-gold/10 border border-accent/20 rounded-xl p-6 space-y-4 overflow-hidden"
                                    >
                                        <h4 className="font-playfair text-h4 text-foreground-heading text-center mb-4 text-glow-gold">Booking Summary</h4>
                                        {Object.entries(selectedRooms).map(([roomId, quantity]) => {
                                            const room = roomsData.find(r => r.id === parseInt(roomId));
                                            return room ? (
                                                <div key={roomId} className="flex justify-between items-center py-3 border-b border-accent/10 last:border-b-0 hover-lift">
                                                    <span className="font-cormorant text-foreground-subtle">{quantity} x {room.name}</span>
                                                    <span className="font-poppins font-semibold text-accent text-glow-primary">₹{(room.price * quantity).toLocaleString()}</span>
                                                </div>
                                            ) : null;
                                        })}
                                        <div className="flex justify-between text-base pt-2">
                                            <span className="font-cormorant text-foreground-subtle">Subtotal ({priceSummary.nights} nights)</span>
                                            <span className="font-poppins font-semibold">₹{priceSummary.roomTotal.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-base">
                                            <span className="font-cormorant text-foreground-subtle">Taxes & Fees (18%)</span>
                                            <span className="font-poppins font-semibold">₹{priceSummary.taxes.toLocaleString()}</span>
                                        </div>
                                        <div className="flex justify-between text-xl font-bold pt-4 border-t border-accent/20 hover-lift">
                                            <span className="font-playfair text-foreground-heading">Total Amount</span>
                                            <span className="font-poppins text-accent text-glow-gold">₹{priceSummary.total.toLocaleString()}</span>
                                        </div>
                                    </div>
                                )}
                                {errors.room && <p className="text-red-500 text-sm mt-2 text-center glassmorphic border border-red-200 rounded-lg p-3 animate-bounce-gentle" id="booking-summary">{errors.room}</p>}
                                
                                <div className="pt-6 border-t border-accent/20">
                                    <div className="text-center mb-6">
                                        <h4 className="font-playfair text-h4 text-foreground-heading relative inline-block text-glow-gold">
                                            Guest Information
                                            <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-12 h-0.5 bg-gradient-to-r from-transparent via-accent-gold to-transparent shadow-golden-glow" />
                                        </h4>
                                    </div>
                                    <div className="space-y-4">
                                        <div>
                                            <input type="text" name="name" placeholder="Full Name" value={guestInfo.name} onChange={handleGuestInfoChange} className="w-full p-4 glassmorphic border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 placeholder:text-foreground-subtle text-foreground hover-lift"/>
                                            {errors.name && <p className="text-red-500 text-sm mt-2">{errors.name}</p>}
                                        </div>
                                        <div>
                                            <input type="email" name="email" placeholder="Email Address" value={guestInfo.email} onChange={handleGuestInfoChange} className="w-full p-4 glassmorphic border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 placeholder:text-foreground-subtle text-foreground hover-lift"/>
                                            {errors.email && <p className="text-red-500 text-sm mt-2">{errors.email}</p>}
                                        </div>
                                        <div>
                                            <input type="tel" name="phone" placeholder="Phone Number" value={guestInfo.phone} onChange={handleGuestInfoChange} className="w-full p-4 glassmorphic border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 placeholder:text-foreground-subtle text-foreground hover-lift"/>
                                            {errors.phone && <p className="text-red-500 text-sm mt-2">{errors.phone}</p>}
                                        </div>
                                        <div>
                                            <textarea name="requests" placeholder="Special Requests (optional)" value={guestInfo.requests} onChange={handleGuestInfoChange} className="w-full p-4 glassmorphic border-2 border-accent/20 rounded-xl focus:border-accent focus:outline-none transition-all duration-300 hover:border-accent/40 placeholder:text-foreground-subtle text-foreground h-24 resize-none hover-lift"></textarea>
                                        </div>
                                    </div>
                                </div>
                                
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
                                            <>
                                                ✨ Confirm Heritage Booking
                                            </>
                                        )}
                                    </span>
                                    {!isSubmitting && <span className="absolute inset-0 bg-white/10 animate-shimmer" style={{ backgroundSize: '200% 100%', backgroundImage: 'linear-gradient(100deg, transparent 20%, rgba(255,255,255,0.2) 50%, transparent 80%)'}}></span>}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
                </section>
                
                <section className="py-16 md:py-24 px-6 md:px-12 border-t border-border bg-gradient-to-br from-background-secondary to-background">
                    <div className="container mx-auto">
                        <div className="animate-float">
                            <h2 className="font-playfair text-h2 text-foreground text-center mb-12 text-glow-gold">Why Book With Us?</h2>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                            {whyBookWithUs.map((item, index) => (
                                <div key={index} className="card-tilt hover-lift animate-float" style={{ animationDelay: `${index * 0.2}s` }}>
                                     <div className="bg-accent/10 p-4 inline-block rounded-full mb-4 hover-pulse glassmorphic shadow-soft-sunlight"><CheckCircleIcon /></div>
                                     <div className="animate-float" style={{ animationDelay: `${index * 0.3}s` }}>
                                         <h3 className="font-playfair text-h4 text-foreground text-glow-gold">{item.title}</h3>
                                     </div>
                                     <p className="text-body text-foreground-subtle mt-2">{item.description}</p>
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