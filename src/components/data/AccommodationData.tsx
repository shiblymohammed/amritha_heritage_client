// src/components/Home/AccommodationData.ts

import React from 'react';

// =================================================================
// == ICONS
// =================================================================
// Note: It's often better to use a library like lucide-react and tree-shake icons,
// but for self-contained components, this is fine.
export const WifiIcon = ({ className = "w-8 h-8 text-accent" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M12 20h.01"/><path d="M2 8.82a15 15 0 0 1 20 0"/><path d="M5 12.859a10 10 0 0 1 14 0"/><path d="M8.5 16.429a5 5 0 0 1 7 0"/>
  </svg>
);
// ... (Include other icon components: SpaIcon, PoolIcon, etc.)
export const SpaIcon = ({ className = "w-8 h-8 text-accent" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/><path d="M19 3v4"/><path d="M21 5h-4"/>
    </svg>
);
export const PoolIcon = ({ className = "w-8 h-8 text-accent" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"/><path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"/><path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"/><path d="M10 6h4"/><path d="M10 10h4"/><path d="M10 14h4"/><path d="M10 18h4"/>
    </svg>
);
export const ServiceIcon = ({ className = "w-8 h-8 text-accent" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="m22 2-5 10-5-10h10Z"/>
    </svg>
);
export const RestaurantIcon = ({ className = "w-8 h-8 text-accent" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2"/><path d="M7 2v20"/><path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Z"/>
    </svg>
);
export const GymIcon = ({ className = "w-8 h-8 text-accent" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <path d="M7.01 10.99h10c0-2.76-2.24-5-5-5s-5 2.24-5 5z"/><path d="M12 2v3"/><path d="M8 22h8"/><path d="M12 19v3"/><path d="M7 22a5 5 0 0 1-5-5c0-2.76 2.24-5 5-5v10z"/><path d="M17 12a5 5 0 0 1 5 5c0 2.76-2.24 5-5 5v-10z"/>
    </svg>
);
export const TransportIcon = ({ className = "w-8 h-8 text-accent" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
        <circle cx="12" cy="12" r="2"/><path d="M12 1v6m6 6h6m-6 6v6m-6-6H1"/><circle cx="12" cy="12" r="10"/>
    </svg>
);

// =================================================================
// == DATA STRUCTURES
// =================================================================
export interface Room {
  id: number;
  type: string;
  title: string;
  description: string;
  images: {
    desktop: string;
    mobile: string;
  };
  features: string[];
  size: string;
  price?: number;
  doublePrice?: number;
}

export interface Facility {
  icon: React.FC<{ className?: string }>;
  title: string;
}

export const rooms: Room[] = [
  {
    id: 1,
    type: 'Deluxe',
    title: "Royal's Chamber",
    description: 'A refined deluxe chamber with heritage aesthetics, curated furnishings, and modern comforts.',
    size: '450 sq ft',
    features: ['Colonial Style', 'Complimentary Breakfast', 'Air Conditioned', 'Room Service', 'Free Wi-Fi', 'Mini Bar'],
    images: {
      desktop: '/images/room1-desktop.webp',
      mobile: '/images/room1-mobile.webp'
    }
  },
  {
    id: 2,
    type: 'Deluxe',
    title: "The Magistrate's Chamber",
    description: 'Deluxe class elegance with generous space and period details for a serene stay.',
    size: '500 sq ft',
    price: 7000,
    doublePrice: 9000,
    features: ['Classic Wooden Decor', 'Complimentary Breakfast', 'Air Conditioned', 'Room Service', 'Free Wi-Fi', 'Mini Bar'],
    images: {
      desktop: '/images/Accommodation/magistratechamber.jpeg',
      mobile: '/images/Accommodation/magistratechamber.jpeg'
    }
  },
  {
    id: 3,
    type: 'Deluxe',
    title: "The Collector's Chamber",
    description: 'Deluxe comfort with curated antique accents and a calm, sophisticated ambiance.',
    size: '480 sq ft',
    price: 7000,
    doublePrice: 9000,
    features: ['King Bed', 'Extra Space & Style', 'Complimentary Breakfast', 'Air Conditioned', 'Room Service', 'Free Wi-Fi', 'Mini Bar'],
    images: {
      desktop: '/images/room3-desktop.webp',
      mobile: '/images/room3-mobile.webp'
    }
  },
  {
    id: 4,
    type: 'Deluxe',
    title: 'The Residency Room',
    description: 'Deluxe refinement with heritage textures, ideal for business and leisure travelers.',
    size: '520 sq ft',
    features: ['Wheelchair Friendly Access', 'Roll-in Shower (on request)', 'Enhanced Space', 'Safety Features'],
    images: {
      desktop: '/images/Accommodation/residencyroom.jpeg',
      mobile: '/images/Accommodation/residencyroom.jpeg'
    }
  },
  {
    id: 5,
    type: 'Executive',
    title: 'The Plantation Room',
    description: 'Executive room inspired by plantation-era charm with tranquil tones and modern amenities.',
    size: '460 sq ft',
    features: ['Heritage Design', 'Complimentary Breakfast', 'Air Conditioned', 'Room Service', 'Free Wi-Fi', 'Mini Bar'],
    images: {
      desktop: '/images/room5-desktop.webp',
      mobile: '/images/room5-mobile.webp'
    }
  }
];

export const facilities: Facility[] = [
  { icon: WifiIcon, title: 'Air-conditioned' },
  { icon: SpaIcon, title: 'Complimentary Breakfast' },
  { icon: PoolIcon, title: 'Free Wi-Fi' },
  { icon: ServiceIcon, title: 'Mini Bar' },
  { icon: RestaurantIcon, title: 'Flat-screen TV' },
  { icon: GymIcon, title: 'Room Service' },
  { icon: TransportIcon, title: 'Heritage Design' }
];