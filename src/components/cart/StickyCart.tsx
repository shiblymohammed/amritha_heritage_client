import React, { useState, useEffect } from 'react';
import { useCart } from '../../contexts/CartContext';
import { motion, AnimatePresence } from 'framer-motion';
import { sendReservationEmail, initEmailJS } from '../../services/emailService';

const StickyCart: React.FC = () => {
  const { state, removeItem, updateQuantity, updateReservation, clearCart } = useCart();
  const [isExpanded, setIsExpanded] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize EmailJS when component mounts
  useEffect(() => {
    initEmailJS();
  }, []);

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

    if (!state.reservation.name.trim()) {
      alert('Please enter your full name.');
      return;
    }

    if (!state.reservation.phone.trim()) {
      alert('Please enter your phone number.');
      return;
    }

    if (!state.reservation.time) {
      alert('Please select a time for your reservation.');
      return;
    }

    setIsSubmitting(true);
    
    try {
      const reservationData = {
        customerName: state.reservation.name,
        customerPhone: state.reservation.phone,
        reservationDate: state.reservation.date,
        reservationTime: state.reservation.time,
        guestCount: state.reservation.guests,
        selectedItems: state.items,
        totalAmount: state.totalAmount,
        totalItems: state.totalItems,
      };

      console.log('Sending reservation email with data:', reservationData);
      
      // Send reservation email using EmailJS
      const response = await sendReservationEmail(reservationData);
      console.log('EmailJS reservation response:', response);
      
      // Show success message
      alert(`Table reserved successfully! 
      
Reservation Details:
• Name: ${state.reservation.name}
• Phone: ${state.reservation.phone}
• Date: ${new Date(state.reservation.date).toLocaleDateString('en-GB')}
• Time: ${state.reservation.time}
• Guests: ${state.reservation.guests}
• Total: ₹${state.totalAmount.toLocaleString()}

A confirmation email has been sent to the restaurant. They will contact you shortly to confirm your reservation.`);
      
      // Clear cart and close modal
      clearCart();
      setIsExpanded(false);
      
    } catch (error) {
      console.error('Reservation email error:', error);
      alert('Failed to send reservation email. Please try again or call us directly at +91 96335 55199.');
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
            className="bg-background border-t border-border shadow-heritage-lg backdrop-blur-xl h-screen overflow-hidden flex flex-col"
          >
            <div className="max-w-7xl mx-auto p-6 flex-1 flex flex-col">
              {/* Compact Header */}
              <div className="flex justify-between items-center mb-6 pb-4 border-b border-border flex-shrink-0">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center">
                    <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-xl font-playfair font-bold text-text-heading">
                      Your Order & Reservation
                    </h3>
                    <p className="text-foreground-subtle font-poppins text-sm">
                      Complete your dining experience
                    </p>
                  </div>
                </div>
                <button
                  onClick={() => setIsExpanded(false)}
                  className="w-10 h-10 bg-background-secondary hover:bg-background-tertiary rounded-xl transition-all duration-300 flex items-center justify-center group"
                >
                  <svg className="w-5 h-5 text-foreground group-hover:text-text-heading transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 flex-1 min-h-0">
                {/* Cart Items - Compact Design */}
                <div className="space-y-3 overflow-y-auto pr-2 custom-scrollbar flex-1 min-h-0">
                  <div className="flex items-center justify-between mb-4 sticky top-0 bg-background z-10 pb-2">
                    <h4 className="text-lg font-playfair font-bold text-text-heading">
                      Selected Dishes
                    </h4>
                    <span className="text-sm text-foreground-subtle font-poppins">
                      {state.totalItems} {state.totalItems === 1 ? 'item' : 'items'}
                    </span>
                  </div>
                  
                  {state.items.map((item, index) => (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      className="bg-background-secondary rounded-xl p-4 border border-border hover:border-accent/50 transition-all duration-300"
                    >
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex-1">
                          <h5 className="font-playfair font-semibold text-foreground leading-tight mb-1">
                            {item.name}
                          </h5>
                          <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-accent font-poppins">
                              ₹{item.price.toLocaleString()}
                            </span>
                            <span className="text-foreground-subtle text-xs font-poppins">
                              each
                            </span>
                          </div>
                        </div>
                        
                        <button
                          onClick={() => removeItem(item.id)}
                          className="w-8 h-8 bg-red-50 hover:bg-red-100 text-red-500 rounded-lg transition-all duration-300 flex items-center justify-center"
                          title="Remove item"
                        >
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-1 bg-background-tertiary rounded-lg p-1">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-8 h-8 bg-background hover:bg-border rounded-md flex items-center justify-center transition-colors"
                          >
                            <svg className="w-3 h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                            </svg>
                          </button>
                          
                          <div className="w-12 h-8 flex items-center justify-center">
                            <span className="font-bold text-foreground font-poppins">
                              {item.quantity}
                            </span>
                          </div>
                          
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-8 h-8 bg-background hover:bg-border rounded-md flex items-center justify-center transition-colors"
                          >
                            <svg className="w-3 h-3 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                            </svg>
                          </button>
                        </div>
                        
                        <div className="text-right">
                          <p className="text-xs text-foreground-subtle font-poppins">Subtotal</p>
                          <p className="font-bold text-foreground font-poppins">
                            ₹{(item.price * item.quantity).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>

                {/* Reservation Form - Compact Design */}
                <div className="bg-background-secondary rounded-xl p-5 border border-border h-fit flex flex-col">
                  <div className="flex items-center gap-2 mb-4 flex-shrink-0">
                    <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                      <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3a2 2 0 012-2h4a2 2 0 012 2v4m-6 4v10m6-10v10m-6-4h6" />
                      </svg>
                    </div>
                    <h4 className="text-lg font-playfair font-bold text-text-heading">
                      Reservation Details
                    </h4>
                  </div>
                  
                  <div className="flex-1 space-y-4 overflow-y-auto">
                    {/* Name and Phone - Side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-poppins font-medium text-foreground-subtle mb-1">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          value={state.reservation.name}
                          onChange={(e) => updateReservation({ name: e.target.value })}
                          placeholder="Enter your name"
                          className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 text-foreground font-poppins text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-poppins font-medium text-foreground-subtle mb-1">
                          Phone Number *
                        </label>
                        <input
                          type="tel"
                          value={state.reservation.phone}
                          onChange={(e) => updateReservation({ phone: e.target.value })}
                          placeholder="Enter phone number"
                          className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 text-foreground font-poppins text-sm"
                        />
                      </div>
                    </div>

                    {/* Date and Time - Side by side */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-poppins font-medium text-foreground-subtle mb-1">
                          Date *
                        </label>
                        <input
                          type="date"
                          value={state.reservation.date}
                          min={new Date().toISOString().split('T')[0]}
                          onChange={(e) => updateReservation({ date: e.target.value })}
                          className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 text-foreground font-poppins text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs font-poppins font-medium text-foreground-subtle mb-1">
                          Time *
                        </label>
                        <select
                          value={state.reservation.time}
                          onChange={(e) => updateReservation({ time: e.target.value })}
                          className="w-full p-3 border border-border rounded-lg bg-background focus:ring-2 focus:ring-accent/50 focus:border-accent transition-all duration-300 text-foreground font-poppins text-sm"
                        >
                          <option value="">Select time</option>
                          {timeSlots.map((slot) => (
                            <option key={slot.value} value={slot.value}>
                              {slot.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    {/* Guest Count */}
                    <div>
                      <label className="block text-xs font-poppins font-medium text-foreground-subtle mb-1">
                        Number of Guests
                      </label>
                      <div className="flex items-center gap-3 bg-background-tertiary rounded-lg p-2">
                        <button
                          onClick={() => updateReservation({ guests: Math.max(1, state.reservation.guests - 1) })}
                          className="w-8 h-8 bg-background hover:bg-border rounded-md flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 12H4" />
                          </svg>
                        </button>
                        
                        <div className="flex-1 text-center">
                          <div className="text-xl font-bold text-foreground font-poppins">
                            {state.reservation.guests}
                          </div>
                          <div className="text-xs text-foreground-subtle font-poppins">
                            {state.reservation.guests === 1 ? 'Guest' : 'Guests'}
                          </div>
                        </div>
                        
                        <button
                          onClick={() => updateReservation({ guests: Math.min(20, state.reservation.guests + 1) })}
                          className="w-8 h-8 bg-background hover:bg-border rounded-md flex items-center justify-center transition-colors"
                        >
                          <svg className="w-4 h-4 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                          </svg>
                        </button>
                      </div>
                    </div>

                    {/* Order Summary */}
                    <div className="bg-background-tertiary rounded-lg p-4 border border-border">
                      <h5 className="font-playfair font-bold text-foreground mb-3">
                        Order Summary
                      </h5>
                      
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between items-center">
                          <span className="text-foreground-subtle font-poppins">
                            Items ({state.totalItems})
                          </span>
                          <span className="text-foreground font-poppins font-semibold">
                            ₹{state.totalAmount.toLocaleString()}
                          </span>
                        </div>
                        
                        <div className="border-t border-border pt-2">
                          <div className="flex justify-between items-center">
                            <span className="font-playfair font-bold text-foreground">
                              Total Amount
                            </span>
                            <span className="text-xl font-bold text-accent font-poppins">
                              ₹{state.totalAmount.toLocaleString()}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reserve Button - Always visible at bottom */}
                  <div className="flex-shrink-0 pt-4 border-t border-border">
                    <button
                      onClick={handleReservation}
                      disabled={isSubmitting || !state.reservation.time || !state.reservation.name || !state.reservation.phone}
                      className="w-full btn btn-primary py-3 text-sm font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                          <span>Processing...</span>
                        </>
                      ) : (
                        <>
                          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Reserve Table</span>
                        </>
                      )}
                    </button>
                    
                    {(!state.reservation.time || !state.reservation.name || !state.reservation.phone) && (
                      <p className="text-center text-xs text-accent font-poppins mt-2">
                        Please fill all required fields to proceed
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Sticky Bottom Bar - Using Tailwind Config Colors */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        className="bg-primary text-foreground-on-color shadow-heritage-lg backdrop-blur-xl border-t border-border"
      >
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left Side - Cart Info */}
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-accent rounded-xl flex items-center justify-center shadow-lg">
                  <span className="text-sm font-bold text-white font-poppins">{state.totalItems}</span>
                </div>
                <div>
                  <div className="text-foreground-on-color font-poppins font-semibold">
                    {state.totalItems} {state.totalItems === 1 ? 'Dish' : 'Dishes'} Selected
                  </div>
                  <div className="text-foreground-on-color/80 font-poppins text-sm">
                    Ready for reservation
                  </div>
                </div>
              </div>
              
              <div className="hidden sm:block w-px h-10 bg-foreground-on-color/20"></div>
              
              <div className="hidden sm:block">
                <div className="text-foreground-on-color/80 font-poppins text-sm">Total Amount</div>
                <div className="text-xl font-bold text-accent-gold font-poppins">
                  ₹{state.totalAmount.toLocaleString()}
                </div>
              </div>
            </div>

            {/* Right Side - Actions */}
            <div className="flex items-center gap-3">
              <div className="sm:hidden">
                <div className="text-lg font-bold text-accent-gold font-poppins">
                  ₹{state.totalAmount.toLocaleString()}
                </div>
              </div>
              
              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="flex items-center gap-2 bg-accent hover:bg-accent-hover px-4 py-2 rounded-lg transition-all duration-300 shadow-md hover:shadow-lg font-poppins font-semibold text-white"
              >
                <span className="hidden sm:inline text-sm">
                  {isExpanded ? 'Hide Cart' : 'View Cart & Reserve'}
                </span>
                <span className="sm:hidden text-sm">
                  {isExpanded ? 'Hide' : 'Reserve'}
                </span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} 
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