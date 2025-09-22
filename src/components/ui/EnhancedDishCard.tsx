// src/components/ui/EnhancedDishCard.tsx

import { memo } from "react";
import LazyImage from "../hooks/LazyImage";
import { useCart } from "../../contexts/CartContext";

interface EnhancedDishCardProps {
  dish: any;
  index: number;
}

const EnhancedDishCard = memo(({ dish, index }: EnhancedDishCardProps) => {
  const { addItem } = useCart();

  // Use the dish image or a placeholder
  const imageUrl = dish.image || `/images/Dining/menu/placeholder.jpg`;

  const handleAddToCart = () => {
    // Extract price as number for cart calculations
    const price = typeof dish.price === "string" 
      ? parseFloat(dish.price.replace(/[^\d.]/g, '')) || 0
      : dish.price;
    
    addItem({
      id: dish.id || `${dish.name}-${Date.now()}`,
      name: dish.name,
      price: price,
      image: imageUrl,
      description: dish.description || '',
      type: 'menu'
    });
  };

  return (
    <div 
      className="group relative h-full flex flex-col bg-gradient-to-br from-background via-background-secondary to-background border border-accent/20 rounded-3xl shadow-soft-sunlight hover:shadow-golden-glow transition-all duration-500 hover:-translate-y-4 hover:scale-[1.03] overflow-hidden"
      style={{
        animationDelay: `${index * 0.15}s`,
        animation: 'fadeInUp 0.8s ease-out forwards'
      }}
    >
      {/* Special Badge */}
      <div className="absolute top-4 left-4 z-10">
        <div className="flex items-center gap-2">
          <span className="px-3 py-1 bg-gradient-to-r from-accent to-accent-gold text-background text-xs font-poppins font-medium rounded-full backdrop-blur-sm border border-accent/30 text-glow-gold animate-pulse">
            ✨ Today's Special
          </span>
        </div>
      </div>

      {/* Availability Indicator */}
      <div className="absolute top-4 right-4 z-10">
        <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse shadow-lg border-2 border-background" />
      </div>

      {/* Image Container with Advanced Overlay Effects */}
      <div className="relative w-full h-72 overflow-hidden rounded-t-3xl">
        {/* Gradient Overlays */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="absolute inset-0 bg-gradient-to-br from-accent/20 via-transparent to-accent-gold/20 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Main Image */}
        <LazyImage
          src={imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-115 group-hover:brightness-110 group-hover:contrast-110"
        />
        
        {/* Floating Elements */}
        <div className="absolute inset-0 z-20 opacity-0 group-hover:opacity-100 transition-all duration-500">
          {/* Sparkle Effects */}
          <div className="absolute top-6 left-6 w-2 h-2 bg-accent rounded-full animate-ping" style={{ animationDelay: '0.5s' }} />
          <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-accent-gold rounded-full animate-ping" style={{ animationDelay: '1s' }} />
          <div className="absolute bottom-8 left-8 w-1 h-1 bg-accent rounded-full animate-ping" style={{ animationDelay: '1.5s' }} />
        </div>

        {/* Floating Price Tag with Enhanced Animation */}
        <div className="absolute bottom-6 right-6 z-30 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-4 group-hover:translate-y-0 rotate-3 group-hover:rotate-0">
          <div className="relative">
            <div className="absolute inset-0 bg-accent/20 rounded-2xl blur-lg animate-pulse" />
            <div className="relative bg-gradient-to-r from-accent via-accent-gold to-accent text-background px-5 py-3 rounded-2xl backdrop-blur-sm border border-accent/40 shadow-golden-glow">
              <div className="flex items-center gap-2">
                <span className="text-xl">💰</span>
                <span className="font-poppins font-bold text-lg text-glow-gold">
                  {typeof dish.price === "string" ? dish.price : `₹${dish.price}`}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content Section with Enhanced Layout */}
      <div className="flex flex-col flex-grow p-8 relative">
        {/* Decorative Top Border */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className="flex items-center gap-2">
            <div className="w-8 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
            <div className="w-2 h-2 bg-accent rounded-full animate-pulse" />
            <div className="w-8 h-0.5 bg-gradient-to-r from-accent via-transparent to-transparent opacity-60" />
          </div>
        </div>
        
        {/* Title Section */}
        <div className="text-center mb-6 mt-4">
          <h3 className="font-playfair text-2xl lg:text-3xl text-foreground mb-3 text-glow-primary group-hover:text-accent transition-all duration-500 leading-tight">
            {dish.name}
          </h3>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="w-12 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
            <span className="text-accent text-lg">✨</span>
            <div className="w-12 h-0.5 bg-gradient-to-r from-accent via-transparent to-transparent opacity-60" />
          </div>
        </div>

        {/* Description */}
        <p className="font-cormorant text-foreground-subtle text-center text-base lg:text-lg leading-relaxed flex-grow mb-8 line-clamp-4 group-hover:text-foreground transition-colors duration-300">
          {dish.description}
        </p>

        {/* Action Section with Enhanced Styling */}
        <div className="mt-auto space-y-6">
          {/* Price Display */}
          <div className="text-center">
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-gradient-to-r from-accent/10 via-accent/20 to-accent/10 rounded-full border border-accent/30 backdrop-blur-sm">
              <span className="text-accent text-xl animate-pulse">💎</span>
              <span className="font-poppins font-bold text-2xl text-accent text-glow-gold">
                {typeof dish.price === "string" ? dish.price : `₹${dish.price}`}
              </span>
              <span className="text-accent text-xl animate-pulse" style={{ animationDelay: '0.5s' }}>💎</span>
            </div>
          </div>
          
          {/* Action Button */}
          <button 
            onClick={handleAddToCart}
            className="w-full btn btn-primary py-4 text-base font-medium floating-btn group-hover:shadow-golden-glow transition-all duration-500 transform hover:scale-105 active:scale-95 relative overflow-hidden"
          >
            {/* Button Background Animation */}
            <div className="absolute inset-0 bg-gradient-to-r from-accent/20 via-accent-gold/20 to-accent/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse" />
            
            Add to Table
          </button>
        </div>
      </div>

      {/* Enhanced Decorative Corner Elements */}
      <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-accent/15 via-accent-gold/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" />
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-accent/15 via-accent-gold/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-all duration-500 animate-pulse" style={{ animationDelay: '0.3s' }} />
      
      {/* Floating Glow Effect */}
      <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-accent/5 via-transparent to-accent-gold/5 animate-pulse" />
      </div>
    </div>
  );
});

EnhancedDishCard.displayName = 'EnhancedDishCard';

export default EnhancedDishCard;