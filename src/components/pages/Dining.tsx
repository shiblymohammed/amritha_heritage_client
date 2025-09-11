// src/pages/Dining.tsx

import React, { useState, useEffect, useMemo, memo } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import { menuData, getFeaturedDishes, type MenuItem, type MenuCollection } from '../data/menuData';
import { useDailySpecials } from '../hooks/useDailySpecials';
import LazyImage from '../hooks/LazyImage';
import LazyVideo from '../hooks/LazyVideo';

// --- Helper Types ---
interface DishCarouselProps {
  id: string;
  title: string;
  subtitle: string;
  dishes: any[]; // Using 'any' to accommodate both MenuItem and dailySpecials structure
  loading: boolean;
  bgColor?: string;
}

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
  menuData: MenuCollection[];
}

// --- Reusable UI Component: Dish Card for Carousels ---
const DishCard = memo(({ dish, isFeatured }: { dish: any; isFeatured: boolean }) => {
    // Placeholder logic for images - adapt if your data structure differs
    const imageUrl = isFeatured 
      ? dish.image || `/images/Dining/menu/placeholder.jpg`
      : dish.image; // Assuming dailySpecials has a full image path

    return (
        <div className="h-full flex flex-col bg-gradient-to-br from-background to-background-secondary border border-border/20 rounded-2xl shadow-soft-sunlight hover:shadow-golden-glow p-6 text-center transition-all duration-300 hover:-translate-y-2">
            <div className="w-48 h-48 rounded-full overflow-hidden -mt-16 mx-auto border-4 border-accent/20 shadow-golden-glow flex-shrink-0">
                <LazyImage
                    src={imageUrl}
                    alt={dish.name}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                />
            </div>
            <div className="flex flex-col flex-grow mt-4">
                <h3 className="font-playfair text-xl text-foreground text-glow-primary">{dish.name}</h3>
                <p className="font-cormorant text-foreground-subtle my-3 text-sm flex-grow line-clamp-3">{dish.description}</p>
                <p className="font-poppins font-semibold text-accent text-lg mt-auto text-glow-gold">
                    {typeof dish.price === 'string' ? dish.price : `₹${dish.price}`}
                </p>
                <button className="btn btn-primary btn-sm mt-4 text-xs px-4 py-2 floating-btn-sm">
                    Add to Table
                </button>
            </div>
        </div>
    );
});


// --- Section Component: Hero ---
const HeroSection = memo(({ onMenuOpen }: { onMenuOpen: () => void }) => (
    <section className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        <div className="absolute inset-0 w-full h-full">
            <LazyImage
                src="/images/hall.webp"
                alt="Elegant dining hall"
                className="w-full h-full object-cover"
                style={{ backgroundAttachment: 'fixed' }}
            />
        </div>
        <div className="absolute inset-0 bg-black/50" />
        <div className="relative z-10 text-center text-white px-6 animate-fadeInUp">
            <p className="font-poppins text-xs tracking-widest text-amber-400 uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards] text-glow-gold">
                Amritha Heritage
            </p>
            <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
                <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white animate-float glowing-title-white">
                    Culinary<br />
                    <span className="italic bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                        Excellence
                    </span>
                </h1>
            </div>
            <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
                Experience the rich flavors of Kerala and beyond in our elegant dining spaces.
            </p>
            <button
                onClick={onMenuOpen}
                className="btn btn-primary text-lg px-8 py-4 floating-btn opacity-0 animate-[fadeInUp_0.8s_ease-out_0.7s_forwards]"
            >
                ✨ Explore Our Menu
            </button>
        </div>
    </section>
));


// --- Section Component: Dish Carousel (for Specials & Featured) ---
const DishCarouselSection: React.FC<DishCarouselProps> = ({ id, title, subtitle, dishes, loading, bgColor = 'bg-background' }) => (
    <section id={id} className={`py-20 ${bgColor} overflow-hidden`}>
        <div className="max-w-7xl mx-auto px-4">
            <div className="text-center mb-16">
                <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer mb-4">{subtitle}</p>
                <h2 className="text-h2 font-playfair text-foreground relative animate-float glowing-title">{title}</h2>
            </div>
            {loading ? (
                <div className="flex justify-center items-center py-10">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent"></div>
                </div>
            ) : dishes.length === 0 ? (
                <div className="text-center py-10">
                    <p className="text-foreground-subtle text-lg font-medium">No items for today</p>
                </div>
            ) : (
                <Swiper
                    spaceBetween={16}
                    slidesPerView={'auto'}
                    className="!overflow-visible"
                    breakpoints={{
                        // Add breakpoints for more control if needed
                        320: { slidesPerView: 1.2, spaceBetween: 16 },
                        640: { slidesPerView: 2.5, spaceBetween: 20 },
                        1024: { slidesPerView: 3.5, spaceBetween: 24 },
                        1280: { slidesPerView: 4.2, spaceBetween: 32 },
                    }}
                >
                    {dishes.map((dish, index) => (
                        <SwiperSlide key={dish.id || index} className="h-auto pb-12">
                             <DishCard dish={dish} isFeatured={id === 'featured'} />
                        </SwiperSlide>
                    ))}
                </Swiper>
            )}
        </div>
    </section>
);


// --- Section Component: Menu (triggers Modal) ---
const MenuSection = memo(({ onMenuOpen }: { onMenuOpen: () => void }) => (
    <section className="py-10 bg-background-secondary">
        <div className="max-w-4xl mx-auto px-4 text-center">
            <button 
                onClick={onMenuOpen} 
                className="btn btn-primary text-lg px-8 py-4 floating-btn mx-auto"
            >
                Explore The Full Menu
            </button>
        </div>
    </section>
));


// --- UI Component: Menu Modal ---
const MenuItemCard = memo(({ item }: { item: MenuItem }) => (
    <div className="text-left p-4 rounded-xl bg-background-secondary/50 border border-border/20 transition-all duration-300 hover:border-accent/50 hover:bg-background-tertiary">
        <div className="flex justify-between items-start gap-4">
            <div className="flex-1">
                <h4 className="font-playfair font-bold text-foreground">{item.name}</h4>
                {item.description && <p className="font-cormorant text-sm text-foreground-subtle mt-1">{item.description}</p>}
            </div>
            <p className="font-poppins font-semibold text-accent whitespace-nowrap text-glow-gold">
                 {typeof item.price === 'string' ? item.price : `₹${item.price}`}
            </p>
        </div>
    </div>
));

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, menuData }) => {
    const [selectedCollection, setSelectedCollection] = useState(menuData[0]?.collection || '');
    const [selectedCategory, setSelectedCategory] = useState(menuData[0]?.categories[0]?.category || '');

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
            // Set initial state when opening
            if (menuData.length > 0) {
                setSelectedCollection(menuData[0].collection);
                setSelectedCategory(menuData[0].categories[0]?.category || '');
            }
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => { document.body.style.overflow = 'auto'; };
    }, [isOpen, menuData]);

    const currentCollection = useMemo(() =>
        menuData.find(c => c.collection === selectedCollection),
        [menuData, selectedCollection]
    );

    const currentItems = useMemo(() => {
        const items = currentCollection?.categories.find(cat => cat.category === selectedCategory)?.items || [];
        // Flatten variants into the main list
        return items.flatMap(item => {
            if (item.variants && item.variants.length > 0) {
                return item.variants.map(variant => ({
                    ...item,
                    name: `${item.name} - ${variant.name}`,
                    price: variant.price,
                    description: item.description || '', // Ensure description exists
                    variants: [], // Clear variants to prevent recursion
                }));
            }
            return item;
        });
    }, [currentCollection, selectedCategory]);
    
    useEffect(() => {
        if (currentCollection && currentCollection.categories.length > 0) {
            setSelectedCategory(currentCollection.categories[0].category);
        }
    }, [currentCollection]);

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-lg z-50 animate-fade-in" role="dialog" aria-modal="true">
            <div className="flex flex-col h-full w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
                {/* Header */}
                <div className="flex justify-between items-center mb-6 flex-shrink-0">
                    <h2 className="text-3xl md:text-4xl font-playfair text-foreground glowing-title">Our Culinary Collection</h2>
                    <button onClick={onClose} className="btn btn-ghost p-3 rounded-full hover:bg-foreground/10" aria-label="Close menu">
                        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </div>

                {/* Collection Tabs */}
                <div className="mb-6 overflow-x-auto hide-scrollbar flex-shrink-0">
                    <div className="flex space-x-2 pb-2">
                        {menuData.map(collection => (
                            <button
                                key={collection.collection}
                                onClick={() => setSelectedCollection(collection.collection)}
                                className={`px-4 py-2 rounded-lg font-poppins font-semibold text-sm whitespace-nowrap transition-all duration-300 ${selectedCollection === collection.collection ? 'bg-accent text-white shadow-golden-glow-sm text-glow-white' : 'bg-background-secondary hover:bg-background-tertiary'}`}
                            >
                                {collection.collection}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Category Tabs */}
                <div className="mb-6 overflow-x-auto hide-scrollbar flex-shrink-0">
                    <div className="flex space-x-2 pb-2 border-b border-border/20">
                        {currentCollection?.categories.map(category => (
                            <button
                                key={category.category}
                                onClick={() => setSelectedCategory(category.category)}
                                className={`px-4 py-2 rounded-t-lg font-poppins text-sm whitespace-nowrap transition-all duration-300 border-b-2 ${selectedCategory === category.category ? 'border-accent text-accent font-bold text-glow-gold' : 'border-transparent text-foreground-subtle hover:text-foreground'}`}
                            >
                                {category.category}
                            </button>
                        ))}
                    </div>
                </div>
                
                {/* Menu Items */}
                <div className="overflow-y-auto hide-scrollbar flex-grow">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 animate-fadeInUp">
                        {currentItems.length > 0 ? (
                            currentItems.map((item, index) => <MenuItemCard key={`${item.name}-${index}`} item={item} />)
                        ) : (
                            <p className="font-cormorant text-foreground-subtle col-span-full text-center py-10">No items in this category.</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};


// --- Section Component: Testimonials ---
const TestimonialsSection = memo(() => {
    const testimonials = [
      { name: "Sarah Johnson", location: "London, UK", text: "The authentic Kerala flavors transported me back to my travels. The fish curry was absolutely divine!", rating: 5 },
      { name: "Rajesh Kumar", location: "Mumbai, India", text: "Amritha's heritage dishes are unmatched. The traditional preparation methods make all the difference.", rating: 5 },
      { name: "Emily Chen", location: "Singapore", text: "From appetizers to desserts, every dish was a masterpiece. The service was impeccable too.", rating: 5 }
    ];

    return (
        <section className="py-20 bg-background-secondary">
            <div className="max-w-6xl mx-auto px-4">
                <div className="text-center mb-16">
                    <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium mb-4">Guest Experiences</p>
                    <h2 className="text-h2 font-playfair text-foreground relative animate-float glowing-title">What Our Guests Say</h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {testimonials.map((testimonial, index) => (
                        <div key={index} className="card-base hover-lift p-8 text-center">
                            <div className="flex justify-center mb-6">
                                {[...Array(testimonial.rating)].map((_, i) => <span key={i} className="text-accent text-xl text-glow-gold">★</span>)}
                            </div>
                            <p className="font-cormorant text-text-subtle leading-relaxed text-base italic mb-6">"{testimonial.text}"</p>
                            <div className="border-t border-border pt-4">
                                <div className="font-cinzel font-bold text-text-heading text-lg mb-1">{testimonial.name}</div>
                                <div className="font-poppins text-text-subtle text-sm">{testimonial.location}</div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});

// --- Section Component: Video Highlights ---
const VideoHighlightsSection = memo(() => {
    // Google Drive video IDs (replace these with your actual video IDs)
    const videoData = [
        { 
            title: "Beef With Onion", 
            description: "Watch our master chef prepare the authentic Beef With Onion using traditional methods passed down through generations.", 
            videoId: "1sutB7iou9hUW1hHGmhpOEZ2y7hR7lv1S", // Replace with your Google Drive video ID
            price: "600", 
            poster: "/images/Dining/menu/kerala-main-course.jpg", 
            align: "right" 
        },
        { 
            title: "Ginger Chicken", 
            description: "Discover the secret behind our signature ginger chicken, prepared with a blend of aromatic spices and slow-cooked to perfection.", 
            videoId: "1intfMm95m-2T_-R-wzHk8hZSS2H3ATyp", // Replace with your Google Drive video ID
            price: "450", 
            poster: "/images/Dining/menu/heritage-dishes.avif", 
            align: "left" 
        },
        { 
            title: "Chef's Special Fish Curry", 
            description: "Experience the traditional fish curry with our special fish curry. Watch as layers of fragrant fish and succulent vegetables come together.", 
            videoId: "1_IswhDRTjluVVIRbDKp6ndnOW9g3DXUP", // Replace with your Google Drive video ID
            price: "650", 
            poster: "/images/Dining/menu/regional.webp", 
            align: "right" 
        }
    ];

    return (
        <section className="py-20 bg-background">
            <div className="max-w-7xl mx-auto px-4 space-y-20">
                {videoData.map((video, index) => (
                    <div key={index} className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                        <div className={`space-y-6 ${video.align === 'left' ? 'lg:order-2' : ''}`}>
                            <h2 className="text-4xl font-playfair font-bold text-foreground glowing-title">
                                {video.title}
                            </h2>
                            <p className="text-lg text-foreground-subtle leading-relaxed">
                                {video.description}
                            </p>
                            <div className="flex items-center gap-4">
                                <span className="text-2xl font-bold text-accent text-glow-gold">
                                    ₹{video.price}
                                </span>
                                <button className="btn btn-primary px-6 py-3 floating-btn">
                                    Order Now
                                </button>
                            </div>
                        </div>
                        <div className={`relative rounded-2xl overflow-hidden shadow-heritage-lg aspect-video ${
                            video.align === 'left' ? 'lg:order-1' : ''
                        }`}>
                            <iframe
                                src={`https://drive.google.com/file/d/${video.videoId}/preview`}
                                className="w-full h-full"
                                allow="autoplay"
                                loading="lazy"
                            ></iframe>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
});


// --- Section Component: Special Occasions ---
const SpecialOccasionsSection = memo(() => {
    const occasions = [
        { title: "Candlelight Dinner", description: "Romantic dining experience with soft candlelight and intimate ambiance.", image: "/images/Dining/varanda1.jpg", price: "From ₹2,500 per couple" },
        { title: "Private Dining Room", description: "Exclusive private dining for special celebrations and business meetings.", image: "/images/Dining/hall2.jpg", price: "From ₹5,000 for 8 people" },
        { title: "Chef's Table Experience", description: "Interactive dining experience with our master chef preparing dishes live.", image: "/images/Dining/kitcheninside.jpg", price: "From ₹3,500 per person" }
    ];
    
    return (
        <div className="relative">
            <section className="py-20 bg-primary text-foreground-on-color pb-32">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-16">
                        <h2 className="text-5xl font-playfair font-bold mb-4 glowing-title-white">Special Occasions</h2>
                        <p className="text-xl text-foreground-on-color/80">Create unforgettable memories with our exclusive dining experiences.</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {occasions.map((occasion, index) => (
                            <div key={index} className="bg-background-tertiary rounded-2xl overflow-hidden border-2 border-border hover:border-accent transition-all duration-300 shadow-soft-sunlight hover:shadow-golden-glow hover:-translate-y-2">
                                <div className="h-64 relative">
                                    <LazyImage src={occasion.image} alt={occasion.title} className="w-full h-full object-cover" />
                                    <div className="absolute inset-0 bg-black/20" />
                                </div>
                                <div className="p-6">
                                    <h3 className="text-2xl font-bold mb-3 text-foreground">{occasion.title}</h3>
                                    <p className="text-foreground-subtle mb-4 leading-relaxed">{occasion.description}</p>
                                    <div className="flex items-center justify-between">
                                        <span className="text-accent font-semibold text-glow-gold">{occasion.price}</span>
                                        <button className="btn btn-primary px-6 py-2 floating-btn-sm">Book Now</button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 h-32 bg-primary -z-10"></div>
            </section>
        </div>
    );
});


// --- Main Page Component ---
const DiningPage: React.FC = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [featuredDishes, setFeaturedDishes] = useState<MenuItem[]>([]);
    const { dailySpecials, loading: dailySpecialsLoading } = useDailySpecials();

    useEffect(() => {
        setFeaturedDishes(getFeaturedDishes());
    }, []);

    return (
        <div className="min-h-screen bg-background">
            <HeroSection onMenuOpen={() => setIsMenuOpen(true)} />

            <DishCarouselSection
                id="specials"
                title="Today's Specials"
                subtitle="Chef's Selection"
                dishes={dailySpecials}
                loading={dailySpecialsLoading}
                bgColor="bg-background-secondary"
            />
            
            <DishCarouselSection
                id="featured"
                title="Featured Dishes"
                subtitle="Menu Highlights"
                dishes={featuredDishes}
                loading={featuredDishes.length === 0}
                bgColor="bg-background"
            />

            <MenuSection onMenuOpen={() => setIsMenuOpen(true)} />
            
            <VideoHighlightsSection />

            <TestimonialsSection />

            <SpecialOccasionsSection />

            <MenuModal 
                isOpen={isMenuOpen} 
                onClose={() => setIsMenuOpen(false)} 
                menuData={menuData} 
            />
        </div>
    );
};

export default DiningPage;