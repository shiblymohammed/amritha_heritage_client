// src/pages/Dining.tsx

import { useState, useEffect, useMemo, memo } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/swiper-bundle.css";
import {
  menuData,
  getFeaturedDishes,
  type MenuItem,
  type MenuCollection,
} from "../data/menuData";
import { useDailySpecials } from "../hooks/useDailySpecials";
import LazyImage from "../hooks/LazyImage";
import { useCart } from "../../contexts/CartContext";
import FeaturedDishCard from "../ui/FeaturedDishCard";
import EnhancedDishCard from "../ui/EnhancedDishCard";

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



// --- Section Component: Hero ---
const HeroSection = memo(({ onMenuOpen }: { onMenuOpen: () => void }) => (
  <section className="relative h-[90vh] overflow-hidden flex items-center justify-center">
    <div className="absolute inset-0 w-full h-full">
      <LazyImage
        src="/images/hall.webp"
        alt="Elegant dining hall"
        className="w-full h-full object-cover"
        style={{ backgroundAttachment: "fixed" }}
      />
    </div>
    <div className="absolute inset-0 bg-black/50" />
    <div className="relative z-10 text-center text-white px-6 animate-fadeInUp">
      <p className="font-poppins text-xs tracking-widest text-amber-400 uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards] text-glow-gold">
        Amritha Heritage
      </p>
      <div className="opacity-0 animate-[fadeInUp_0.8s_ease-out_0.3s_forwards]">
        <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-white animate-float glowing-title-white">
          Culinary
          <br />
          <span className="italic bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            Excellence
          </span>
        </h1>
      </div>
      <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white/90 leading-relaxed opacity-0 animate-[fadeInUp_0.8s_ease-out_0.5s_forwards]">
        Experience the rich flavors of Kerala and beyond in our elegant dining
        spaces.
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

// --- Enhanced Section Component: Dish Carousel (for Specials & Featured) ---
const DishCarouselSection: React.FC<DishCarouselProps> = ({
  id,
  title,
  subtitle,
  dishes,
  loading,
  bgColor = "bg-background",
}) => (
  <section id={id} className={`py-24 ${bgColor} relative overflow-hidden`}>
    {/* Enhanced Background Decorative Elements */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute top-16 left-8 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-16 right-8 w-48 h-48 bg-accent-gold rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      <div className="absolute top-1/3 left-1/3 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-1/3 right-1/3 w-36 h-36 bg-accent-gold rounded-full blur-3xl animate-pulse" style={{ animationDelay: '3s' }} />
    </div>

    {/* Floating Particles */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-20 w-2 h-2 bg-accent rounded-full animate-float opacity-60" style={{ animationDelay: '0s' }} />
      <div className="absolute top-40 right-32 w-1.5 h-1.5 bg-accent-gold rounded-full animate-float opacity-60" style={{ animationDelay: '1s' }} />
      <div className="absolute bottom-32 left-40 w-1 h-1 bg-accent rounded-full animate-float opacity-60" style={{ animationDelay: '2s' }} />
      <div className="absolute bottom-20 right-20 w-2.5 h-2.5 bg-accent-gold rounded-full animate-float opacity-60" style={{ animationDelay: '3s' }} />
    </div>

    <div className="max-w-7xl mx-auto px-4 relative z-10">
      {/* Enhanced Header Section */}
      <div className="text-center mb-20">
        <div className="inline-flex items-center gap-3 mb-6">
          <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent" />
          <span className="text-accent text-2xl animate-pulse">✨</span>
          <div className="w-12 h-0.5 bg-gradient-to-r from-accent via-transparent to-transparent" />
        </div>
        
        <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium animate-text-shimmer mb-6">
          {subtitle}
        </p>
        
        <h2 className="text-h2 font-playfair text-foreground relative animate-float glowing-title mb-6">
          {title}
        </h2>
        
        <div className="max-w-2xl mx-auto">
          <p className="font-cormorant text-lg text-foreground-subtle leading-relaxed">
            Discover our chef's carefully curated selection of today's finest dishes, 
            prepared with the freshest ingredients and traditional techniques.
          </p>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="relative">
            <div className="animate-spin rounded-full h-16 w-16 border-4 border-accent/20 border-t-accent"></div>
            <div className="absolute inset-0 animate-ping rounded-full h-16 w-16 border-4 border-accent/10"></div>
          </div>
        </div>
      ) : dishes.length === 0 ? (
        <div className="text-center py-20">
          <div className="inline-flex items-center gap-4 px-8 py-6 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 rounded-full border border-accent/30 backdrop-blur-sm">
            <span className="text-accent text-2xl">🍽️</span>
            <p className="text-foreground-subtle text-lg font-medium">
              No special items available today
            </p>
            <span className="text-accent text-2xl">✨</span>
          </div>
        </div>
      ) : (
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
            <button className="specials-nav-prev w-12 h-12 bg-gradient-to-r from-accent to-accent-gold text-background rounded-full shadow-golden-glow hover:shadow-golden-glow hover:scale-110 transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-accent/30">
              <span className="text-xl">←</span>
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
            <button className="specials-nav-next w-12 h-12 bg-gradient-to-r from-accent to-accent-gold text-background rounded-full shadow-golden-glow hover:shadow-golden-glow hover:scale-110 transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-accent/30">
              <span className="text-xl">→</span>
            </button>
          </div>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            className="!overflow-visible specials-swiper"
            loop={true}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: '.specials-nav-prev',
              nextEl: '.specials-nav-next',
            }}
            breakpoints={{
              320: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
          >
            {dishes.map((dish, index) => (
              <SwiperSlide key={dish.id || index} className="h-auto pb-12">
                <EnhancedDishCard dish={dish} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      {/* Call to Action Section */}
      <div className="text-center mt-20">
        <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 rounded-full border border-accent/30 backdrop-blur-sm">
          <span className="font-cormorant text-lg text-foreground-subtle">
            Fresh ingredients, authentic flavors, unforgettable experiences
          </span>
        </div>
      </div>
    </div>
  </section>
);

// --- Section Component: Featured Dishes ---
const FeaturedSection = memo(() => {
  const featuredDishes = getFeaturedDishes();

  return (
    <section className="py-24 bg-gradient-to-br from-background via-background-secondary to-background relative overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-60 h-60 bg-accent rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <div className="inline-block mb-6">
            <span className="font-poppins text-sm tracking-[0.3em] text-accent uppercase font-medium animate-text-shimmer">
              ✨ Signature Collection ✨
            </span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-playfair text-foreground mb-6 relative animate-float glowing-title">
            Featured
            <br />
            <span className="italic bg-gradient-to-r from-accent via-amber-400 to-accent bg-clip-text text-transparent">
              Delicacies
            </span>
          </h2>
          
          <div className="w-24 h-1 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto mb-6" />
          
          <p className="text-lg md:text-xl text-foreground-subtle max-w-3xl mx-auto leading-relaxed font-cormorant">
            Discover our chef's handpicked selection of extraordinary dishes, each crafted with passion and presented with artistry
          </p>
        </div>

        {/* Enhanced Carousel */}
        <div className="relative">
          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 left-4 z-20">
            <button className="featured-nav-btn featured-nav-prev w-12 h-12 bg-accent/90 hover:bg-accent text-background rounded-full shadow-golden-glow hover:shadow-xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-accent/30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
          </div>
          
          <div className="absolute top-1/2 -translate-y-1/2 right-4 z-20">
            <button className="featured-nav-btn featured-nav-next w-12 h-12 bg-accent/90 hover:bg-accent text-background rounded-full shadow-golden-glow hover:shadow-xl transition-all duration-300 flex items-center justify-center backdrop-blur-sm border border-accent/30">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>

          <Swiper
            modules={[Autoplay, Navigation]}
            spaceBetween={24}
            slidesPerView="auto"
            className="!overflow-visible featured-swiper"
            loop={true}
            autoplay={{
              delay: 4000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            navigation={{
              prevEl: '.featured-nav-prev',
              nextEl: '.featured-nav-next',
            }}
            breakpoints={{
              320: { slidesPerView: 1.1, spaceBetween: 16 },
              640: { slidesPerView: 2.2, spaceBetween: 20 },
              1024: { slidesPerView: 3.2, spaceBetween: 24 },
              1280: { slidesPerView: 4, spaceBetween: 32 },
            }}
          >
            {featuredDishes.map((dish, index) => (
              <SwiperSlide key={dish.id} className="h-auto pb-8">
                <FeaturedDishCard dish={dish} index={index} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center gap-4 px-8 py-4 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 rounded-full border border-accent/30 backdrop-blur-sm">
          <span className="font-cormorant text-lg text-foreground-subtle">
            Each dish tells a story of tradition and innovation
          </span>
        </div>
        </div>
      </div>
    </section>
  );
});

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
const MenuItemCard = memo(({ item }: { item: MenuItem }) => {
  const { addItem } = useCart();

  const handleAddToCart = () => {
    // Extract price as number for cart calculations
    const price = typeof item.price === "string" 
      ? parseFloat(item.price.replace(/[^\d.]/g, '')) || 0
      : item.price;
    
    addItem({
      id: item.id || `${item.name}-${Date.now()}`,
      name: item.name,
      price: price,
      image: item.image || '/images/Dining/menu/placeholder.jpg',
      description: item.description || '',
      type: 'menu'
    });
  };

  return (
    <div className="bg-background-secondary border border-border/30 rounded-xl p-5 hover:shadow-lg transition-all duration-300 hover:border-accent/50 group">
      <div className="flex justify-between items-start mb-3">
        <h4 className="font-playfair font-bold text-lg text-foreground group-hover:text-accent transition-colors duration-300 leading-tight">
          {item.name}
        </h4>
        <div className="bg-accent text-white px-3 py-1 rounded-full font-poppins font-bold text-sm">
          {typeof item.price === "string" ? item.price : `₹${item.price}`}
        </div>
      </div>
      
      {item.description && (
        <p className="text-foreground text-sm mb-4 font-cormorant leading-relaxed">
          {item.description}
        </p>
      )}
      
      <div className="flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1">
            <span className="text-yellow-400 text-sm">★★★★★</span>
            <span className="text-foreground text-xs font-medium">(4.8)</span>
          </div>
          <span className="text-green-600 text-xs font-semibold bg-green-100 px-2 py-1 rounded-full">Fresh</span>
        </div>
        
        <button
          onClick={handleAddToCart}
          className="bg-accent hover:bg-accent-dark text-white px-5 py-2.5 rounded-lg font-poppins font-semibold text-sm transition-all duration-300 flex items-center space-x-2"
          aria-label={`Add ${item.name} to cart`}
        >
          <span>Add to Cart</span>
          <svg 
            className="w-4 h-4" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M12 4v16m8-8H4" 
            />
          </svg>
        </button>
      </div>
    </div>
  );
});

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose, menuData }) => {
  const [selectedCollection, setSelectedCollection] = useState(
    menuData[0]?.collection || ""
  );
  const [selectedCategory, setSelectedCategory] = useState(
    menuData[0]?.categories[0]?.category || ""
  );

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      // Set initial state when opening
      if (menuData.length > 0) {
        setSelectedCollection(menuData[0].collection);
        setSelectedCategory(menuData[0].categories[0]?.category || "");
      }
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen, menuData]);

  const currentCollection = useMemo(
    () => menuData.find((c) => c.collection === selectedCollection),
    [menuData, selectedCollection]
  );

  const currentItems = useMemo(() => {
    const items =
      currentCollection?.categories.find(
        (cat) => cat.category === selectedCategory
      )?.items || [];
    // Flatten variants into the main list
    return items.flatMap((item) => {
      if (item.variants && item.variants.length > 0) {
        return item.variants.map((variant) => ({
          ...item,
          name: `${item.name} - ${variant.name}`,
          price: variant.price,
          description: item.description || "", // Ensure description exists
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
    <div
      className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 animate-fade-in"
      role="dialog"
      aria-modal="true"
    >
      <div className="flex flex-col h-full w-full max-w-7xl mx-auto p-4 sm:p-6 md:p-8">
        {/* Simplified Header */}
        <div className="flex justify-between items-center mb-8 flex-shrink-0 p-6 bg-background-secondary rounded-2xl border border-border/20">
          <div className="flex items-center space-x-4">
            <span className="text-4xl">🍽️</span>
            <div>
              <h2 className="text-4xl font-playfair font-bold text-foreground">
                Our Exquisite Menu
              </h2>
              <p className="text-foreground-subtle font-poppins text-lg">
                Discover our culinary delights
              </p>
            </div>
          </div>
          
          <button
            onClick={onClose}
            className="w-12 h-12 rounded-full bg-background-tertiary hover:bg-accent hover:text-white transition-all duration-300 flex items-center justify-center shadow-lg"
            aria-label="Close menu"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
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

        {/* Simplified Collection Tabs */}
        <div className="mb-8 overflow-x-auto hide-scrollbar flex-shrink-0">
          <div className="flex space-x-3 pb-2">
            {menuData.map((collection) => (
              <button
                key={collection.collection}
                onClick={() => setSelectedCollection(collection.collection)}
                className={`px-6 py-3 rounded-xl font-poppins font-semibold text-sm whitespace-nowrap transition-all duration-300 ${
                  selectedCollection === collection.collection
                    ? "bg-accent text-white shadow-lg"
                    : "bg-background-secondary hover:bg-background-tertiary text-foreground hover:text-accent border border-border/30 hover:border-accent/50"
                }`}
              >
                <span className="flex items-center space-x-2">
                  <span>{collection.collection}</span>
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Simplified Category Tabs */}
        <div className="mb-8 overflow-x-auto hide-scrollbar flex-shrink-0">
          <div className="flex space-x-4 pb-4 border-b border-border/30">
            {currentCollection?.categories.map((category) => (
              <button
                key={category.category}
                onClick={() => setSelectedCategory(category.category)}
                className={`px-5 py-3 rounded-lg font-poppins text-sm whitespace-nowrap transition-all duration-300 ${
                  selectedCategory === category.category
                    ? "bg-accent text-white font-bold border border-accent"
                    : "text-white hover:text-white hover:bg-accent/50 border border-transparent hover:border-accent/30"
                }`}
              >
                {category.category}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items */}
        <div className="overflow-y-auto hide-scrollbar flex-grow">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentItems.length > 0 ? (
              currentItems.map((item, index) => (
                <MenuItemCard key={`${item.name}-${index}`} item={item} />
              ))
            ) : (
              <div className="col-span-full text-center py-16">
                <div className="text-6xl mb-4">🍽️</div>
                <p className="font-cormorant text-foreground-subtle text-xl">
                  No items in this category.
                </p>
                <p className="font-poppins text-foreground-subtle text-sm mt-2">
                  Please select a different category to explore our menu.
                </p>
              </div>
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
    {
      name: "Sarah Johnson",
      location: "London, UK",
      text: "The authentic Kerala flavors transported me back to my travels. The fish curry was absolutely divine!",
      rating: 5,
    },
    {
      name: "Rajesh Kumar",
      location: "Mumbai, India",
      text: "Amritha's heritage dishes are unmatched. The traditional preparation methods make all the difference.",
      rating: 5,
    },
    {
      name: "Emily Chen",
      location: "Singapore",
      text: "From appetizers to desserts, every dish was a masterpiece. The service was impeccable too.",
      rating: 5,
    },
  ];

  return (
    <section className="py-20 bg-background-secondary">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-16">
          <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium mb-4">
            Guest Experiences
          </p>
          <h2 className="text-h2 font-playfair text-foreground relative animate-float glowing-title">
            What Our Guests Say
          </h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.name} className="card-base hover-lift p-8 text-center">
              <div className="flex justify-center mb-6">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <span key={i} className="text-accent text-xl text-glow-gold">
                    ★
                  </span>
                ))}
              </div>
              <p className="font-cormorant text-text-subtle leading-relaxed text-base italic mb-6">
                "{testimonial.text}"
              </p>
              <div className="border-t border-border pt-4">
                <div className="font-cinzel font-bold text-text-heading text-lg mb-1">
                  {testimonial.name}
                </div>
                <div className="font-poppins text-text-subtle text-sm">
                  {testimonial.location}
                </div>
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
  const { addItem } = useCart();

  // Google Drive video IDs with correct prices from menu data
  const videoData = [
    {
      id: "video-beef-onion",
      title: "Beef With Onion",
      description:
        "Watch our master chef prepare the authentic Beef With Onion using traditional methods passed down through generations.",
      videoId: "1sutB7iou9hUW1hHGmhpOEZ2y7hR7lv1S",
      price: 420, // Updated from menu data
      poster: "/images/Dining/menu/kerala-main-course.jpg",
      align: "right",
      image: "/images/Dining/featured/BEEF WITH ONION copy.jpg"
    },
    {
      id: "video-amritha-roast-chicken",
      title: "Amritha Roast Chicken",
      description:
        "Discover the secret behind our signature Amritha-style roast chicken, prepared with a blend of aromatic spices and slow-cooked to perfection.",
      videoId: "1intfMm95m-2T_-R-wzHk8hZSS2H3ATyp",
      price: 450, // Updated from menu data
      poster: "/images/Dining/menu/heritage-dishes.avif",
      align: "left",
      image: "/images/Dining/featured/amritha roast chicken copy.jpg"
    },
    {
      id: "video-fish-curry",
      title: "Chef's Special Fish Curry",
      description:
        "Experience the traditional fish curry with our special preparation. Watch as layers of fragrant fish and succulent spices come together.",
      videoId: "1_IswhDRTjluVVIRbDKp6ndnOW9g3DXUP",
      price: 600, // Updated from menu data
      poster: "/images/Dining/menu/regional.webp",
      align: "right",
      image: "/images/Dining/featured/amritha FISH MALABARI copy.jpg"
    },
  ];

  const handleAddToCart = (video: typeof videoData[0]) => {
    addItem({
      id: video.id,
      name: video.title,
      price: video.price,
      image: video.image,
      description: video.description,
      type: 'special'
    });
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <p className="font-poppins text-sm tracking-widest text-accent uppercase font-medium mb-4">
            Recipe Videos
          </p>
          <h2 className="text-h2 font-playfair text-foreground relative animate-float glowing-title">
            Watch Our Chefs in Action
          </h2>
          <p className="text-lg md:text-xl text-foreground-subtle max-w-3xl mx-auto leading-relaxed font-cormorant mt-6">
            Get an exclusive behind-the-scenes look at how our master chefs prepare these signature dishes
          </p>
        </div>

        <div className="space-y-20">
          {videoData.map((video) => (
            <div
              key={video.id}
              className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
            >
              <div
                className={`space-y-6 ${
                  video.align === "left" ? "lg:order-2" : ""
                }`}
              >
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
                  <button 
                    onClick={() => handleAddToCart(video)}
                    className="btn btn-primary px-6 py-3 floating-btn"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
              <div
                className={`relative rounded-2xl overflow-hidden shadow-heritage-lg aspect-video ${
                  video.align === "left" ? "lg:order-1" : ""
                }`}
              >
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
      </div>
    </section>
  );
});

// --- Section Component: Special Occasions ---
const SpecialOccasionsSection = memo(() => {
  const navigate = useNavigate();
  
  const occasions = [
    {
      title: "Candlelight Dinner",
      description:
        "Romantic dining experience with soft candlelight and intimate ambiance.",
      image: "/images/Dining/varanda1.jpg",
      price: "From ₹2,500 per couple",
    },
    {
      title: "Private Dining Room",
      description:
        "Exclusive private dining for special celebrations and business meetings.",
      image: "/images/Dining/hall2.jpg",
      price: "From ₹5,000 for 8 people",
    },
    {
      title: "Chef's Table Experience",
      description:
        "Interactive dining experience with our master chef preparing dishes live.",
      image: "/images/Dining/kitcheninside.jpg",
      price: "From ₹3,500 per person",
    },
  ];

  const handleContactClick = (occasionTitle: string) => {
    navigate(`/contact?occasion=${encodeURIComponent(occasionTitle)}`);
  };

  return (
    <div className="relative">
      <section className="py-20 bg-primary text-foreground-on-color pb-32">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-playfair font-bold mb-4 glowing-title-white">
              Special Occasions
            </h2>
            <p className="text-xl text-foreground-on-color/80">
              Create unforgettable memories with our exclusive dining
              experiences.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {occasions.map((occasion) => (
              <div
                key={occasion.title}
                className="bg-background-tertiary rounded-2xl overflow-hidden border-2 border-border hover:border-accent transition-all duration-300 shadow-soft-sunlight hover:shadow-golden-glow hover:-translate-y-2"
              >
                <div className="h-64 relative">
                  <LazyImage
                    src={occasion.image}
                    alt={occasion.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold mb-3 text-foreground">
                    {occasion.title}
                  </h3>
                  <p className="text-foreground-subtle mb-4 leading-relaxed">
                    {occasion.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-accent font-semibold text-glow-gold">
                      {occasion.price}
                    </span>
                    <button 
                      onClick={() => handleContactClick(occasion.title)}
                      className="btn btn-primary px-6 py-2 floating-btn-sm"
                    >
                      Contact us
                    </button>
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
  const [searchParams, setSearchParams] = useSearchParams();
  const { dailySpecials, loading: dailySpecialsLoading } = useDailySpecials();

  useEffect(() => {
    window.scrollTo(0, 0);
    
    // Check if menu parameter is present in URL
    if (searchParams.get('menu') === 'open') {
      setIsMenuOpen(true);
      // Remove the parameter from URL after opening the modal
      setSearchParams({});
    }
  }, [searchParams, setSearchParams]);

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

      <FeaturedSection />

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
