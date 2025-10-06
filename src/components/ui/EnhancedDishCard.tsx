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
      className="group relative h-full flex flex-col bg-gradient-to-br from-background via-background-secondary to-background border border-accent/20 rounded-3xl shadow-soft-sunlight hover:shadow-golden-glow transition-all duration-500 hover:-translate-y-3 hover:scale-[1.02] overflow-hidden"
      style={{
        animationDelay: `${index * 0.1}s`,
        animation: 'fadeInUp 0.8s ease-out forwards'
      }}
    >
      {/* Special Badge */}
      <div className="absolute top-4 left-4 z-10">
        <span className="px-3 py-1 bg-accent/90 text-background text-xs font-poppins font-medium rounded-full backdrop-blur-sm border border-accent/20 text-glow-gold">
          ✨ Today's Special
        </span>
      </div>

      {/* Image Container with Overlay Effects */}
      <div className="relative w-full h-64 overflow-hidden rounded-t-3xl">
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <LazyImage
          src={imageUrl}
          alt={dish.name}
          className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110 group-hover:brightness-110"
        />
        
        {/* Floating Price Tag */}
        <div className="absolute bottom-4 right-4 z-20 opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
          <div className="bg-accent/95 text-background px-4 py-2 rounded-full backdrop-blur-sm border border-accent/30 shadow-golden-glow">
            <span className="font-poppins font-bold text-lg text-glow-gold">
              {typeof dish.price === "string" ? dish.price : `₹${dish.price}`}
            </span>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="flex flex-col flex-grow p-6 relative">
        {/* Decorative Element */}
        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-1 bg-gradient-to-r from-transparent via-accent to-transparent opacity-60" />
        
        <div className="text-center mb-4">
          <h3 className="font-playfair text-xl lg:text-2xl text-foreground mb-2 text-glow-primary group-hover:text-accent transition-colors duration-300">
            {dish.name}
          </h3>
          <div className="w-16 h-0.5 bg-gradient-to-r from-transparent via-accent to-transparent mx-auto opacity-60" />
        </div>

        <p className="font-cormorant text-foreground-subtle text-center text-sm lg:text-base leading-relaxed flex-grow mb-6 line-clamp-3">
          {dish.description}
        </p>

        {/* Action Section */}
        <div className="mt-auto space-y-4">
          <div className="text-center">
            <span className="font-poppins font-bold text-2xl text-accent text-glow-gold">
              {typeof dish.price === "string" ? dish.price : `₹${dish.price}`}
            </span>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="w-full btn btn-primary py-3 text-sm font-medium floating-btn group-hover:shadow-golden-glow transition-all duration-300 transform hover:scale-105"
          >
            Add to Table
          </button>
        </div>
      </div>

      {/* Decorative Corner Elements */}
      <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-bl from-accent/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-0 left-0 w-20 h-20 bg-gradient-to-tr from-accent/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </div>
  );
});

EnhancedDishCard.displayName = 'EnhancedDishCard';

export default EnhancedDishCard;