// src/components/SignatureDishesSlider.tsx (Example Path)

import React, { useState, useCallback, useRef } from 'react';
import DishCard from './DishCard';
import { type Dish } from './DiningSection';

interface SignatureDishesSliderProps {
  dishes: Dish[];
  onOrderNow: (dish: Dish) => void;
}

const SignatureDishesSlider: React.FC<SignatureDishesSliderProps> = ({ dishes, onOrderNow }) => {
  const [currentIndex, setCurrentIndex] = useState(Math.floor(dishes.length / 2)); // Start in the middle
  
  // State for mobile swipe functionality
  const [isDragging, setIsDragging] = useState(false);
  const [dragOffset, setDragOffset] = useState(0);
  const dragStartRef = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleDotClick = useCallback((index: number) => {
    setCurrentIndex(index);
  }, []);

  // --- Mobile Drag Handlers ---
  const handleDragStart = (clientX: number) => {
    setIsDragging(true);
    dragStartRef.current = clientX;
    setDragOffset(0); // Reset offset
  };

  const handleDragMove = (clientX: number) => {
    if (!isDragging) return;
    const drag = clientX - dragStartRef.current;
    setDragOffset(drag);
  };

  const handleDragEnd = () => {
    if (!isDragging) return;
    setIsDragging(false);
    const swipeThreshold = (containerRef.current?.clientWidth ?? window.innerWidth) * 0.2; // 20% swipe threshold

    if (Math.abs(dragOffset) > swipeThreshold) {
      const newIndex = dragOffset > 0 ? currentIndex - 1 : currentIndex + 1;
      // Clamp the index within bounds
      setCurrentIndex(Math.max(0, Math.min(dishes.length - 1, newIndex)));
    }
    setDragOffset(0); // Snap back if not swiped far enough
  };

  // --- Desktop Card Position Logic ---
  const getCardPosition = useCallback((index: number) => {
    const offset = index - currentIndex;
    const total = dishes.length;
    const normalizedOffset = ((offset % total) + total) % total;
    
    if (normalizedOffset === 0) return 'center';
    if (normalizedOffset === 1) return 'right1';
    if (normalizedOffset === 2) return 'right2';
    if (normalizedOffset === total - 1) return 'left1';
    if (normalizedOffset === total - 2) return 'left2';
    return 'hidden';
  }, [currentIndex, dishes.length]);


  return (
    <>
      {/* ======================= DESKTOP SLIDER (Deck of Cards) ======================= */}
      <div className="hidden md:flex justify-center items-center h-[550px] relative max-w-7xl mx-auto mt-24">
        <div className="flex items-center justify-center relative w-full h-full perspective-1000">
          {dishes.map((dish, index) => {
            const position = getCardPosition(index);
            if (position === 'hidden') return null;

            const transforms = {
              center: 'translate-x-0 scale-100 z-40 opacity-100',
              left1: '-translate-x-[65%] scale-90 z-30 opacity-70',
              left2: '-translate-x-[120%] scale-80 z-20 opacity-50',
              right1: 'translate-x-[65%] scale-90 z-30 opacity-70',
              right2: 'translate-x-[120%] scale-80 z-20 opacity-50',
            };
            
            return (
              <DishCard
                key={dish.id}
                dish={dish}
                onClick={() => setCurrentIndex(index)}
                onOrderNow={onOrderNow}
                className={`absolute cursor-pointer transition-[transform,opacity] duration-500 ease-out will-change-[transform,opacity] ${transforms[position as keyof typeof transforms]}`}
                isCenter={position === 'center'}
              />
            );
          })}
        </div>
      </div>

      {/* ======================= MOBILE & TABLET SLIDER (Swipeable) ======================= */}
      <div 
        ref={containerRef}
        className="md:hidden mt-16 h-[500px] relative overflow-hidden cursor-grab active:cursor-grabbing"
        onTouchStart={(e) => handleDragStart(e.touches[0].clientX)}
        onTouchMove={(e) => handleDragMove(e.touches[0].clientX)}
        onTouchEnd={handleDragEnd}
        onMouseDown={(e) => handleDragStart(e.clientX)}
        onMouseMove={(e) => handleDragMove(e.clientX)}
        onMouseUp={handleDragEnd}
        onMouseLeave={handleDragEnd}
      >
        <div
          className="flex h-full items-center"
          style={{
            transform: `translateX(calc(-${currentIndex * 85}vw + ${(100 - 85) / 2}vw + ${dragOffset}px))`,
            transition: isDragging ? 'none' : 'transform 500ms cubic-bezier(0.4, 0, 0.2, 1)',
            willChange: 'transform',
          }}
        >
          {dishes.map((dish) => (
            <DishCard
              key={dish.id}
              dish={dish}
              onClick={() => {}} // Click is disabled on mobile in favor of swipe
              onOrderNow={onOrderNow}
            />
          ))}
        </div>
      </div>

      {/* ======================= UNIFIED NAVIGATION DOTS ======================= */}
      <div className="flex justify-center space-x-3 mt-12">
        {dishes.map((_, index) => (
          <button
            key={index}
            onClick={() => handleDotClick(index)}
            className={`rounded-full transition-all duration-300 ${
              index === currentIndex 
                ? 'w-6 h-2 bg-accent shadow-golden-glow-sm' 
                : 'w-2 h-2 bg-accent/30 hover:bg-accent/50'
            }`}
            aria-label={`Go to dish ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default SignatureDishesSlider;