// src/data/accommodationTypes.ts
import { 
  WifiIcon, 
  SpaIcon, 
  PoolIcon, 
  ServiceIcon, 
  RestaurantIcon, 
  GymIcon, 
  TransportIcon 
} from './AccommodationData';

export interface Room {
  id: number;
  type: string;
  title: string;
  description: string;
  images: string[];
  features: string[];
  size: string;
}

export interface Facility {
  icon: React.FC<{ className?: string }>;
  title: string;
}

export const rooms: Room[] = [
  {
    id: 1,
    type: 'Deluxe',
    title: "The President's Chamber",
    description: 'A refined deluxe chamber with heritage aesthetics, curated furnishings, and modern comforts.',
    size: '450 sq ft',
    features: ['Colonial Style', 'Complimentary Breakfast', 'Air Conditioned', 'Room Service', 'Free Wi-Fi', 'Mini Bar'],
    images: ['/images/room1.webp']
  },
  {
    id: 2,
    type: 'Executive',
    title: "The Magistrate's Chamber",
    description: 'Executive class elegance with generous space and period details for a serene stay.',
    size: '500 sq ft',
    features: ['Classic Wooden Decor', 'Complimentary Breakfast', 'Air Conditioned', 'Room Service', 'Free Wi-Fi', 'Mini Bar'],
    images: ['/images/room2.webp']
  },
  {
    id: 3,
    type: 'Deluxe',
    title: "The Collector's Chamber",
    description: 'Deluxe comfort with curated antique accents and a calm, sophisticated ambiance.',
    size: '480 sq ft',
    features: ['Extra Space & Style', 'Complimentary Breakfast', 'Air Conditioned', 'Room Service', 'Free Wi-Fi', 'Mini Bar'],
    images: ['/images/room3.webp']
  },
  {
    id: 4,
    type: 'Executive',
    title: 'The Residency Room',
    description: 'Executive refinement with heritage textures, ideal for business and leisure travelers.',
    size: '520 sq ft',
    features: ['Wheelchair Friendly Access', 'Roll-in Shower (on request)', 'Enhanced Space', 'Safety Features'],
    images: ['/images/room4.webp']
  },
  {
    id: 5,
    type: 'Deluxe',
    title: 'The Plantation Room',
    description: 'Deluxe room inspired by plantation-era charm with tranquil tones and modern amenities.',
    size: '460 sq ft',
    features: ['Heritage Design', 'Complimentary Breakfast', 'Air Conditioned', 'Room Service', 'Free Wi-Fi', 'Mini Bar'],
    images: ['/images/room5.webp']
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
