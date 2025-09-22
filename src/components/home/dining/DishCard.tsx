// src/components/DishCard.tsx (Example Path)

import React, { memo, useCallback } from 'react';
import LazyImage from '../../hooks/LazyImage';
import { type Dish } from './DiningSection'; // Assuming you export the type

interface DishCardProps {
  dish: Dish;
  onClick: () => void;
  onOrderNow: (dish: Dish) => void;
  className?: string;
  isCenter?: boolean;
}

const DishCard = memo<DishCardProps>(({ dish, onClick, onOrderNow, className = '', isCenter = false }) => {
  const handleOrderClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    onOrderNow(dish);
  }, [dish, onOrderNow]);

  return (
    // The main container for a single card in the slider
    <div 
      className={`flex-shrink-0 w-[85vw] md:w-[450px] transition-transform duration-300 ${isCenter ? 'md:hover:scale-[1.05]' : 'md:hover:scale-105'} ${className}`}
      onClick={onClick}
    >
      <div className="bg-gradient-to-br from-background via-background-secondary to-background-tertiary border border-border/20 rounded-2xl shadow-soft-sunlight-lg hover:shadow-golden-glow p-6 lg:p-8 flex flex-col items-center text-center transition-all duration-300 backdrop-blur-sm h-full">
        
        {/* Image with optimized responsive sizing */}
        <div className="w-48 h-48 md:w-56 md:h-56 rounded-full overflow-hidden -mt-12 md:-mt-16 border-4 border-accent-gold/20 shadow-golden-glow flex-shrink-0">
          <LazyImage 
            src={dish.image} 
            alt={dish.name} 
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
            quality={80}
          />
        </div>
        
        <h3 className="font-playfair text-xl md:text-2xl text-foreground mt-4 lg:mt-6 animate-text-shimmer">
          {dish.name}
        </h3>
        
        <p className="font-cormorant text-foreground-subtle my-3 lg:my-4 text-sm md:text-base flex-grow leading-relaxed max-w-sm line-clamp-3 md:line-clamp-none">
          {dish.description}
        </p>

        <div className="font-poppins font-semibold text-accent text-lg md:text-xl my-2 lg:my-3">
          {dish.price}
        </div>
        
        <button
          onClick={handleOrderClick}
          className="btn btn-primary text-sm px-6 py-2 shadow-soft-sunlight hover:shadow-golden-glow transition-all duration-300 hover:scale-105 active:scale-95 focus:outline-none focus:ring-2 focus:ring-accent animate-text-shimmer"
        >
          Reserve Your Table
        </button>
      </div>
    </div>
  );
});

DishCard.displayName = 'DishCard';
export default DishCard;