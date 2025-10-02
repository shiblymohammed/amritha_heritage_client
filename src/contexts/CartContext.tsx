import React, { createContext, useContext, useReducer, type ReactNode } from 'react';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  description?: string;
  image?: string;
  type: 'menu' | 'special';
}

export interface ReservationDetails {
  name: string;
  phone: string;
  time: string;
  guests: number;
  date: string;
}

interface CartState {
  items: CartItem[];
  isVisible: boolean;
  reservation: ReservationDetails;
  totalAmount: number;
  totalItems: number;
}

type CartAction =
  | { type: 'ADD_ITEM'; payload: Omit<CartItem, 'quantity'> }
  | { type: 'REMOVE_ITEM'; payload: string }
  | { type: 'UPDATE_QUANTITY'; payload: { id: string; quantity: number } }
  | { type: 'CLEAR_CART' }
  | { type: 'TOGGLE_VISIBILITY' }
  | { type: 'SET_VISIBILITY'; payload: boolean }
  | { type: 'UPDATE_RESERVATION'; payload: Partial<ReservationDetails> };

const initialState: CartState = {
  items: [],
  isVisible: false,
  reservation: {
    name: '',
    phone: '',
    time: '',
    guests: 2,
    date: new Date().toISOString().split('T')[0],
  },
  totalAmount: 0,
  totalItems: 0,
};

const calculateTotals = (items: CartItem[]) => {
  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalAmount = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  return { totalItems, totalAmount };
};

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(item => item.id === action.payload.id);
      let newItems: CartItem[];

      if (existingItemIndex >= 0) {
        // Item exists, increase quantity
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        // New item, add to cart
        newItems = [...state.items, { ...action.payload, quantity: 1 }];
      }

      const { totalItems, totalAmount } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
        isVisible: true, // Show cart when item is added
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(item => item.id !== action.payload);
      const { totalItems, totalAmount } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };
    }

    case 'UPDATE_QUANTITY': {
      const { id, quantity } = action.payload;
      if (quantity <= 0) {
        // Remove item if quantity is 0 or less
        const newItems = state.items.filter(item => item.id !== id);
        const { totalItems, totalAmount } = calculateTotals(newItems);
        return {
          ...state,
          items: newItems,
          totalItems,
          totalAmount,
        };
      }

      const newItems = state.items.map(item =>
        item.id === id ? { ...item, quantity } : item
      );
      const { totalItems, totalAmount } = calculateTotals(newItems);
      return {
        ...state,
        items: newItems,
        totalItems,
        totalAmount,
      };
    }

    case 'CLEAR_CART':
      return {
        ...state,
        items: [],
        totalItems: 0,
        totalAmount: 0,
      };

    case 'TOGGLE_VISIBILITY':
      return {
        ...state,
        isVisible: !state.isVisible,
      };

    case 'SET_VISIBILITY':
      return {
        ...state,
        isVisible: action.payload,
      };

    case 'UPDATE_RESERVATION':
      return {
        ...state,
        reservation: {
          ...state.reservation,
          ...action.payload,
        },
      };

    default:
      return state;
  }
};

interface CartContextType {
  state: CartState;
  addItem: (item: Omit<CartItem, 'quantity'>) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleCartVisibility: () => void;
  setCartVisibility: (visible: boolean) => void;
  updateReservation: (details: Partial<ReservationDetails>) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addItem = (item: Omit<CartItem, 'quantity'>) => {
    dispatch({ type: 'ADD_ITEM', payload: item });
  };

  const removeItem = (id: string) => {
    dispatch({ type: 'REMOVE_ITEM', payload: id });
  };

  const updateQuantity = (id: string, quantity: number) => {
    dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
  };

  const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const toggleCartVisibility = () => {
    dispatch({ type: 'TOGGLE_VISIBILITY' });
  };

  const setCartVisibility = (visible: boolean) => {
    dispatch({ type: 'SET_VISIBILITY', payload: visible });
  };

  const updateReservation = (details: Partial<ReservationDetails>) => {
    dispatch({ type: 'UPDATE_RESERVATION', payload: details });
  };

  const value: CartContextType = {
    state,
    addItem,
    removeItem,
    updateQuantity,
    clearCart,
    toggleCartVisibility,
    setCartVisibility,
    updateReservation,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};