import React, { useState } from 'react';
import { useCart } from '../../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';

const StickyCart: React.FC = () => {
  const { state, removeItem, updateQuantity, updateReservation, clearCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Generate time slots from 7:30 AM to 10:30 PM
  const generateTimeSlots = () => {
    const slots = [];
    for (let hour = 7; hour <= 22; hour++) {
      for (let minute = 0; minute < 60; minute += 30) {
        if (hour === 22 && minute > 30) break; // Stop at 10:30 PM
        if (hour === 7 && minute === 0) continue; // Start from 7:30 AM
        
        const time24 = `${hour.toString().padStart(2, '0')}:${minute.toString().padStart(2, '0')}`;
        const hour12 = hour > 12 ? hour - 12 : hour === 0 ? 12 : hour;
        const ampm = hour >= 12 ? 'PM' : 'AM';
        const time12 = `${hour12}:${minute.toString().padStart(2, '0')} ${ampm}`;
        
        slots.push({ value: time24, label: time12 });
      }
    }
    return slots;
  };

  const timeSlots = generateTimeSlots();

  const handleReservation = async () => {
    if (state.items.length === 0) {
      alert('Please add items to your cart before making a reservation.');
      return;
    }

    if (!state.reservation.time) {
      alert('Please select a time for your reservation.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const reservationData = {
        items: state.items,
        reservation: state.reservation,
        totalAmount: state.totalAmount,
        totalItems: state.totalItems,
      };

      // TODO: Replace with actual API call
      const response = await fetch('/api/reservations/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reservationData),
      });

      if (response.ok) {
        alert('Table reserved successfully! You will receive a confirmation email shortly.');
        clearCart();
        setIsExpanded(false);
      } else {
        throw new Error('Failed to make reservation');
      }
    } catch (error) {
      console.error('Reservation error:', error);
      alert('Failed to make reservation. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (state.totalItems === 0) {
    return null; // Don't show cart if empty
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50">
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ opacity: 0, y: 100 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 100 }}
            className="bg-background border-t border-border/20 shadow-2xl max-h-[70vh] overflow-hidden"
          >
            <div className="max-w-4xl mx-auto p-6">
              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-playfair font-bold text-foreground">
                  Your Order
                </h3>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="p-2 hover:bg-background-secondary rounded-full transition-colors"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Cart Items */}
                <div className="space-y-4 max-h-80 overflow-y-auto">
                  <h4 className="font-semibold text-lg text-foreground mb-4">Selected Dishes</h4>
                  {state.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex items-center gap-4 p-4 bg-background-secondary rounded-lg border border-border/20"
                    >
                      <div className="flex-1">
                        <h5 className="font-playfair font-semibold text-foreground">{item.name}</h5>
                        <p className="text-sm text-foreground-subtle">₹{item.price}</p>
                      </div>
                      
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-full bg-background-tertiary hover:bg-accent/20 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <span className="w-8 text-center font-semibold">{item.quantity}</span>
                        
                        <button
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-full bg-background-tertiary hover:bg-accent/20 flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.id)}
                        className="p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>

                {/* Reservation Details */}
                <div className="space-y-6">
                  <h4 className="font-semibold text-lg text-foreground">Reservation Details</h4>
                  
                  {/* Date Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Date</label>
                    <input
                      type="date"
                      value={state.reservation.date}
                      min={new Date().toISOString().split('T')[0]}
                      onChange={(e) => updateReservation({ date: e.target.value })}
                      className="w-full p-3 border border-border/20 rounded-lg bg-background-secondary focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    />
                  </div>

                  {/* Time Selection */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Time</label>
                    <select
                      value={state.reservation.time}
                      onChange={(e) => updateReservation({ time: e.target.value })}
                      className="w-full p-3 border border-border/20 rounded-lg bg-background-secondary focus:ring-2 focus:ring-accent/50 focus:border-accent"
                    >
                      <option value="">Select time</option>
                      {timeSlots.map((slot) => (
                        <option key={slot.value} value={slot.value}>
                          {slot.label}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Guest Count */}
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Number of Guests</label>
                    <div className="flex items-center gap-4">
                      <button
                        onClick={() => updateReservation({ guests: Math.max(1, state.reservation.guests - 1) })}
                        className="w-10 h-10 rounded-full bg-background-tertiary hover:bg-accent/20 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                        </svg>
                      </button>
                      
                      <span className="text-xl font-semibold w-12 text-center">{state.reservation.guests}</span>
                      
                      <button
                        onClick={() => updateReservation({ guests: Math.min(20, state.reservation.guests + 1) })}
                        className="w-10 h-10 rounded-full bg-background-tertiary hover:bg-accent/20 flex items-center justify-center transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                        </svg>
                      </button>
                    </div>
                  </div>

                  {/* Total */}
                  <div className="border-t border-border/20 pt-4">
                    <div className="flex justify-between items-center text-lg font-semibold">
                      <span>Total ({state.totalItems} items)</span>
                      <span className="text-accent text-glow-gold">₹{state.totalAmount}</span>
                    </div>
                  </div>

                  {/* Reserve Button */}
                  <button
                    onClick={handleReservation}
                    disabled={isSubmitting || !state.reservation.time}
                    className="w-full btn btn-primary py-4 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Reserving...' : 'Reserve Table'}
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Bar */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-accent text-white shadow-2xl"
      >
        <div className="max-w-4xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-white/20 rounded-full flex items-center justify-center">
                  <span className="text-sm font-bold">{state.totalItems}</span>
                </div>
                <span className="font-semibold">
                  {state.totalItems} {state.totalItems === 1 ? 'item' : 'items'}
                </span>
              </div>
              <div className="text-lg font-bold">₹{state.totalAmount}</div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-lg transition-colors"
              >
                <span className="font-semibold">
                  {isExpanded ? 'Hide' : 'View Cart'}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default StickyCart;