import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// =================================================================
// == SVG ICONS
// =================================================================

const MapPinIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5 ml-2"
  >
    <path
      fillRule="evenodd"
      d="M9.69 18.933l.003.001C9.89 19.02 10 19 10 19s.11.02.308-.066l.002-.001.006-.003.018-.008a5.741 5.741 0 00.281-.14c.186-.1.42-.25.692-.455.272-.204.57-.478.868-.818.297-.34.594-.734.886-1.164.293-.43.582-.9.865-1.399.283-.499.56-1.03.82-1.594.26-.564.504-1.16.73-1.782C15.818 10.31 16 9.647 16 9c0-3.314-2.686-6-6-6S4 5.686 4 9c0 .647.182 1.31.513 1.947.226.621.47 1.218.73 1.782.26.564.537 1.095.82 1.594.283.499.572.969.865 1.399.293.43.59.79.886 1.164.298.34.596.614.868.818.272.206.506.355.692.455a5.741 5.741 0 00.281.14l.018.008.006.003zM10 11.25a2.25 2.25 0 100-4.5 2.25 2.25 0 000 4.5z"
      clipRule="evenodd"
    />
  </svg>
);

// == NEW ICONS FOR DETAILS & ACCESSIBILITY ==
const ClockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M10 18a8 8 0 100-16 8 8 0 000 16zm.75-13a.75.75 0 00-1.5 0v5c0 .414.336.75.75.75h4a.75.75 0 000-1.5h-3.25V5z"
      clipRule="evenodd"
    />
  </svg>
);
const ShirtIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path d="M7.75 3.5H4.25a1.25 1.25 0 00-1.25 1.25v10.5c0 .69.56 1.25 1.25 1.25h11.5c.69 0 1.25-.56 1.25-1.25v-10.5a1.25 1.25 0 00-1.25-1.25h-3.5V2.25a.75.75 0 00-1.5 0V3.5h-1V2.25a.75.75 0 00-1.5 0V3.5z" />
  </svg>
);
const InfoIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-5 h-5"
  >
    <path
      fillRule="evenodd"
      d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a.75.75 0 000 1.5h.253a.25.25 0 01.244.304l-.459 2.066A1.75 1.75 0 0010.747 15H11a.75.75 0 000-1.5h-.253a.25.25 0 01-.244-.304l.459-2.066A1.75 1.75 0 009.253 9H9z"
      clipRule="evenodd"
    />
  </svg>
);
const AirportIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-8 h-8 text-action-primary"
  >
    <path d="M3.105 2.289a.75.75 0 00-.826.92l1.445 4.335A9.003 9.003 0 001 10c0 4.968 4.032 9 9 9s9-4.032 9-9A9.003 9.003 0 0016.276 7.524l1.445-4.335a.75.75 0 00-.826-.92L10 5.132 3.105 2.289z" />
  </svg>
);
const TrainIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-8 h-8 text-action-primary"
  >
    <path
      fillRule="evenodd"
      d="M1 4a2 2 0 012-2h14a2 2 0 012 2v2a2 2 0 01-2 2H3a2 2 0 01-2-2V4zm2 10a2 2 0 012-2h10a2 2 0 012 2v2a2 2 0 01-2 2H5a2 2 0 01-2-2v-2zM5 15a1 1 0 11-2 0 1 1 0 012 0zm11 1a1 1 0 100-2 1 1 0 000 2zM5 5a1 1 0 11-2 0 1 1 0 012 0zm11 1a1 1 0 100-2 1 1 0 000 2z"
      clipRule="evenodd"
    />
  </svg>
);
const BusIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
    className="w-8 h-8 text-action-primary"
  >
    <path
      fillRule="evenodd"
      d="M10 2a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5A.75.75 0 0110 2zM5.28 4.22a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0zM14.72 4.22a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10zM4.22 14.72a.75.75 0 011.06 0l1.06 1.06a.75.75 0 11-1.06 1.06l-1.06-1.06a.75.75 0 010-1.06zM15.78 14.72a.75.75 0 010 1.06l-1.06 1.06a.75.75 0 01-1.06-1.06l1.06-1.06a.75.75 0 011.06 0z"
      clipRule="evenodd"
    />
  </svg>
);

// =================================================================
// == DATA STRUCTURES
// =================================================================
interface Detail {
  icon: React.ComponentType;
  label: string;
  value: string;
}

interface Destination {
  id: number;
  title: string;
  tagline: string;
  description: string;
  longDescription: string;
  gallery: string[];
  category: "Heritage" | "Beach" | "Nature" | "Adventure";
  coordinates: { lat: number; lng: number };
  details: Detail[];
  conciergeTip: string;
}

// =================================================================
// == MOCK DATA (Re-architected for the new design)
// =================================================================
const allDestinations: Destination[] = [
  {
    id: 1,
    title: "Sree Padmanabhaswamy Temple",
    tagline: "A Divine Marvel of Gold and Granite",
    description:
      "An architectural marvel and spiritual epicenter, famed for its intricate Dravidian style and immense, mysterious treasures.",
    longDescription:
      "A breathtaking blend of Kerala and Dravidian styles of architecture, the Sree Padmanabhaswamy Temple is a site of immense spiritual significance and historical intrigue. Dedicated to Lord Vishnu, it is one of the 108 Divya Desams. The temple's gopuram stands tall over the city, and its hallowed halls contain priceless treasures within its ancient vaults, making it not just a place of worship but a monument of legendary wealth and mystery.",
    gallery: ["/images/padmanabhaswamy-desktop.jpg"],
    category: "Heritage",
    coordinates: { lat: 8.4828, lng: 76.9437 },
    details: [
      { icon: ClockIcon, label: "Best Time to Visit", value: "Sept to March" },
      { icon: ShirtIcon, label: "Dress Code", value: "Strict (Mundu/Saree)" },
      {
        icon: InfoIcon,
        label: "Architectural Style",
        value: "Dravidian & Kerala",
      },
    ],
    conciergeTip:
      "Visit during the evening 'deeparadhana' for a truly magical experience as the temple is lit by thousands of oil lamps.",
  },
  {
    id: 2,
    title: "Kovalam & Lighthouse Beach",
    tagline: "Where Azure Waves Kiss Golden Sands",
    description:
      "A world-famous coastline of three crescent beaches, offering a tranquil haven of golden sands and azure waters.",
    longDescription:
      "Kovalam is a breathtakingly beautiful beach destination. It comprises three adjacent crescent-shaped beaches, each separated by rocky outcroppings. The largest, Lighthouse Beach, is a hub of activity with its iconic red-and-white striped lighthouse offering panoramic views. The calm waters are ideal for swimming and water sports, and the coastline is dotted with ayurvedic resorts and excellent seafood restaurants.",
    gallery: ["/images/kovalam-desktop.jpg"],
    category: "Beach",
    coordinates: { lat: 8.3999, lng: 76.9788 },
    details: [
      { icon: ClockIcon, label: "Best Time to Visit", value: "Oct to Feb" },
      { icon: ShirtIcon, label: "What to Wear", value: "Beachwear, Cottons" },
      { icon: InfoIcon, label: "Main Attraction", value: "Lighthouse Climb" },
    ],
    conciergeTip:
      "Climb the lighthouse just before sunset. The view of the coastline bathed in golden light is an unforgettable memory.",
  },
  {
    id: 4,
    title: "Poovar Island Backwaters",
    tagline: "The Serene Confluence of River and Sea",
    description:
      "An ethereal estuary where the river, lake, and sea converge, creating a rare and serene ecosystem of backwaters.",
    longDescription:
      "Poovar is a rare gem—a tranquil estuary where the Neyyar River meets the Arabian Sea. This beautiful expanse of backwaters is a network of lakes, rivers, and canals, fringed by lush mangrove forests and coconut groves. Accessible only by boat, it's a secluded paradise perfect for bird watching, exploring the golden sand beach that separates the backwater from the sea, and staying in unique floating cottages.",
    gallery: ["/images/poovar1.jpg"],
    category: "Nature",
    coordinates: { lat: 8.3151, lng: 77.0731 },
    details: [
      { icon: ClockIcon, label: "Best Time to Visit", value: "Aug to March" },
      { icon: ShirtIcon, label: "What to Wear", value: "Light, Breathable" },
      { icon: InfoIcon, label: "Activity", value: "Mangrove Boating" },
    ],
    conciergeTip:
      "Request a silent, early morning boat tour. The tranquility and the sound of waking birds in the mangroves is pure bliss.",
  },
  {
    id: 4,
    title: "Lulu Mall Trivandrum",
    tagline: "Shopping Paradise",
    description:
      "One of India's largest shopping malls offering world-class shopping, dining, and entertainment experiences.",
    longDescription:
      "Lulu Mall stands as one of India's largest and most impressive shopping destinations, offering an unparalleled retail and entertainment experience. Spanning over 1.7 million square feet, this architectural marvel houses more than 225 international and domestic brands, making it a shopper's paradise. The mall features multiple floors of diverse shopping options, from high-end fashion boutiques to electronics stores, home décor, and specialty shops. Beyond shopping, Lulu Mall offers world-class dining experiences with its expansive food court and fine dining restaurants serving cuisines from around the globe. The entertainment zone includes a state-of-the-art multiplex cinema, gaming arcade, and family entertainment areas, making it a complete destination for leisure and recreation.",
    gallery: ["/images/lulu.jpg"],
    category: "Adventure",
    coordinates: { lat: 8.5241, lng: 76.9366 },
    details: [
      { icon: ClockIcon, label: "Opening Hours", value: "10 AM to 10 PM" },
      { icon: ShirtIcon, label: "Dress Code", value: "Casual" },
      {
        icon: InfoIcon,
        label: "Facilities",
        value: "Food Court, Cinema, Gaming",
      },
    ],
    conciergeTip:
      "Visit during weekdays for a more relaxed shopping experience. The food court offers excellent local and international cuisine.",
  },
  {
    id: 5,
    title: "Ponmudi",
    tagline: "Hill Station Retreat",
    description:
      "A picturesque hill station known for its winding pathways, tea gardens, and breathtaking mountain views.",
    longDescription:
      "Nestled in the Western Ghats at an altitude of 1,100 meters, Ponmudi is a serene hill station that offers a perfect escape from the tropical heat. The name 'Ponmudi' literally means 'golden peak', and true to its name, this destination is crowned with mist-covered peaks and lush green valleys. The winding roads leading to Ponmudi are an adventure in themselves, offering spectacular views of tea plantations, spice gardens, and dense forests. The cool climate, pristine nature, and tranquil atmosphere make it an ideal destination for nature lovers, trekkers, and those seeking peace and rejuvenation.",
    gallery: ["/images/ponmudi.jpg"],
    category: "Nature",
    coordinates: { lat: 8.7642, lng: 77.1077 },
    details: [
      { icon: ClockIcon, label: "Best Time to Visit", value: "Oct to March" },
      {
        icon: ShirtIcon,
        label: "What to Wear",
        value: "Light Jacket, Comfortable Shoes",
      },
      { icon: InfoIcon, label: "Activities", value: "Trekking, Photography" },
    ],
    conciergeTip:
      "Start early morning to catch the sunrise from the viewpoint. The winding roads offer spectacular views but can be challenging.",
  },
  {
    id: 6,
    title: "Kanyakumari",
    tagline: "Land's End",
    description:
      "The southernmost tip of India where three seas meet, famous for its stunning sunrises and sunsets.",
    longDescription:
      "Kanyakumari, formerly known as Cape Comorin, holds the unique distinction of being the southernmost point of mainland India where the Arabian Sea, Bay of Bengal, and Indian Ocean converge. This sacred town is not only a geographical marvel but also a spiritual center dedicated to Goddess Kanyakumari. The iconic Vivekananda Rock Memorial, standing majestically in the sea, commemorates Swami Vivekananda's meditation here. The 133-foot tall Thiruvalluvar Statue honors the great Tamil poet and philosopher. Visitors are mesmerized by the spectacular sunrise and sunset views, making it one of the few places on earth where you can witness both phenomena over the ocean.",
    gallery: ["/images/kanyakumari.jpg"],
    category: "Heritage",
    coordinates: { lat: 8.0883, lng: 77.5385 },
    details: [
      { icon: ClockIcon, label: "Best Time to Visit", value: "Oct to March" },
      {
        icon: ShirtIcon,
        label: "What to Wear",
        value: "Light Cotton, Sun Hat",
      },
      {
        icon: InfoIcon,
        label: "Must See",
        value: "Vivekananda Rock, Thiruvalluvar Statue",
      },
    ],
    conciergeTip:
      "Book ferry tickets in advance for Vivekananda Rock. The sunset view from the beach is absolutely magical.",
  },
  {
    id: 7,
    title: "Varkala",
    tagline: "Cliff Beach Paradise",
    description:
      "A stunning coastal town with dramatic red cliffs, pristine beaches, and vibrant beach culture.",
    longDescription:
      "Varkala is a mesmerizing coastal paradise that perfectly blends natural beauty with spiritual significance. The town is famous for its dramatic red laterite cliffs that rise majestically from the Arabian Sea, creating one of India's most spectacular coastlines. The main beach, known as Papanasam Beach, is believed to have holy waters that wash away sins. The cliff-top area has evolved into a vibrant hub with restaurants, cafes, and shops offering stunning ocean views. Varkala is also renowned as a center for Ayurvedic treatments and yoga, attracting wellness seekers from around the world. The natural spring at the beach, combined with the therapeutic sea breeze and pristine environment, makes it a perfect destination for relaxation and rejuvenation.",
    gallery: ["/images/varkala.jpg"],
    category: "Beach",
    coordinates: { lat: 8.7379, lng: 76.7163 },
    details: [
      { icon: ClockIcon, label: "Best Time to Visit", value: "Nov to March" },
      { icon: ShirtIcon, label: "What to Wear", value: "Beachwear, Sunscreen" },
      { icon: InfoIcon, label: "Activities", value: "Surfing, Yoga, Ayurveda" },
    ],
    conciergeTip:
      "Try the cliff-top restaurants for sunset dining. The natural spring at Papanasam Beach is believed to have healing properties.",
  },
  {
    id: 8,
    title: "Padmanabhapuram Palace",
    tagline: "Wooden Architecture Marvel",
    description:
      "An exquisite example of traditional Kerala architecture, this wooden palace showcases intricate craftsmanship.",
    longDescription:
      "Padmanabhapuram Palace stands as a magnificent testament to the architectural brilliance of ancient Kerala. Built in the 16th century, this wooden palace complex was once the seat of the former Travancore rulers. The palace is renowned for its intricate woodwork, elaborate carvings, and traditional Kerala architectural elements that have been preserved for over 400 years. The complex includes several buildings with unique features like the four-storied mansion with its famous council chamber, the ornate dance hall with polished black floors, and the meditation chamber with its rosewood ceiling. The palace museum houses an impressive collection of antique furniture, paintings, and artifacts that provide insights into the royal lifestyle and cultural heritage of the region. The craftsmanship displayed in every corner reflects the skill and artistry of ancient Kerala artisans.",
    gallery: ["/images/Padmanabhapuram_Palace.jpg"],
    category: "Heritage",
    coordinates: { lat: 8.2441, lng: 77.3274 },
    details: [
      { icon: ClockIcon, label: "Visiting Hours", value: "9 AM to 5 PM" },
      { icon: ShirtIcon, label: "Dress Code", value: "Modest Clothing" },
      {
        icon: InfoIcon,
        label: "Highlights",
        value: "Wooden Architecture, Museum",
      },
    ],
    conciergeTip:
      "Hire a guide to fully appreciate the intricate woodwork and historical significance. Photography inside may be restricted.",
  },
];

// =================================================================
// == DESTINATION SECTION COMPONENT
// =================================================================

// =================================================================
// == NEW Destination Section Component
// =================================================================
interface DestinationSectionProps {
  destination: Destination;
  isReversed?: boolean;
}

const DestinationSection = ({
  destination,
  isReversed = false,
}: DestinationSectionProps) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImageIndex(
        (prevIndex) => (prevIndex + 1) % destination.gallery.length
      );
    }, 5000); // Change image every 5 seconds
    return () => clearInterval(timer);
  }, [destination.gallery.length]);

  return (
    <motion.section
      className="container mx-auto px-6 lg:px-8 py-16 md:py-24"
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div
        className={`flex flex-col ${
          isReversed ? "md:flex-row-reverse" : "md:flex-row"
        } gap-10 lg:gap-16 items-center`}
      >
        {/* Image Gallery Side */}
        <div className="w-full md:w-1/2">
          <div className="relative aspect-square rounded-2xl shadow-heritage-lg overflow-hidden">
            <AnimatePresence>
              <motion.img
                key={currentImageIndex}
                src={destination.gallery[currentImageIndex]}
                alt={`${destination.title} gallery image ${
                  currentImageIndex + 1
                }`}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 1.5, ease: "easeInOut" }}
                className="absolute inset-0 w-full h-full object-cover"
              />
            </AnimatePresence>
            <div className="absolute bottom-0 left-0 w-full p-4 flex justify-center gap-2">
              {destination.gallery.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    index === currentImageIndex
                      ? "bg-white scale-125"
                      : "bg-white/50"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>

        {/* Content Side */}
        <div className="w-full md:w-1/2">
          <p className="font-poppins text-sm text-action-accent uppercase tracking-widest">
            {destination.category}
          </p>
          <h2 className="font-playfair text-h2-sm md:text-h2 text-text-heading mt-2">
            {destination.title}
          </h2>
          <p className="font-cinzel text-lg text-text-subtle mt-1 italic">
            "{destination.tagline}"
          </p>
          <p className="font-cormorant text-body text-text mt-6 leading-relaxed">
            {destination.longDescription}
          </p>

          <div className="mt-8 border-t border-border-soft pt-6">
            <h4 className="font-playfair text-h4 text-text-heading mb-4">
              At a Glance
            </h4>
            <div className="space-y-3">
              {destination.details.map((detail, index) => (
                <div key={index} className="flex items-center gap-4 text-text">
                  <span className="text-action-primary">
                    <detail.icon />
                  </span>
                  <span className="font-poppins text-sm font-medium w-32">
                    {detail.label}
                  </span>
                  <span className="font-cormorant text-base">
                    {detail.value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <blockquote className="mt-8 border-l-4 border-action-accent bg-background-secondary p-4 rounded-r-lg">
            <p className="font-cormorant italic text-text-subtle">
              "{destination.conciergeTip}"
            </p>
            <cite className="block font-poppins text-xs text-right mt-2 not-italic">
              - Your Heritage Concierge
            </cite>
          </blockquote>

          <div className="mt-8">
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${destination.coordinates.lat},${destination.coordinates.lng}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 font-poppins text-sm font-medium bg-action-primary text-text-on-color px-6 py-3.5 rounded-lg hover:bg-action-primary-hover transition-all duration-300 shadow-heritage group"
            >
              Get Directions <MapPinIcon />
            </a>
          </div>
        </div>
      </div>
    </motion.section>
  );
};

// =================================================================
// == MAIN PAGE COMPONENT
// =================================================================
const DestinationsPage = () => {
  return (
    <main className="bg-background">
      {/* HERO SECTION */}
      <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full"
          style={{
            backgroundImage: "url('/images/hero.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundAttachment: "fixed",
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-white px-6">
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-playfair text-4xl md:text-5xl lg:text-6xl mb-6 text-white"
          >
            Destinations
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-white"
          >
            Embark on a journey through time and nature. Discover the soul of
            Thiruvananthapuram, from its sacred temples and sun-drenched shores
            to its tranquil backwaters.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="bg-action-accent hover:bg-action-accent-hover text-white font-poppins font-semibold px-6 py-3 rounded-xl text-base transition-all duration-300 transform hover:scale-105"
          >
            Explore Destinations
          </motion.button>
        </div>
      </section>

      {/* DESTINATIONS LIST */}
      <div className="divide-y divide-border-soft">
        {allDestinations.map((destination, index) => (
          <DestinationSection
            key={destination.id}
            destination={destination}
            isReversed={index % 2 !== 0}
          />
        ))}
      </div>

      {/* ACCESSIBILITY HUB SECTION */}
      <section className="bg-background-secondary py-20 md:py-24">
        <div className="container mx-auto px-6 lg:px-8">
          <motion.div
            className="text-center mb-12"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.7, ease: "easeOut" }}
          >
            <h2 className="text-h2 font-playfair text-text-heading">
              Seamless Accessibility
            </h2>
            <p className="text-lg font-cormorant text-text-subtle max-w-2xl mx-auto mt-4">
              Your journey to and from Amritha Heritage is as effortless as your
              stay. We are conveniently located near all major transport hubs.
            </p>
          </motion.div>
          <motion.div
            className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ staggerChildren: 0.2, delayChildren: 0.2 }}
          >
            {[
              {
                icon: AirportIcon,
                name: "Trivandrum Int'l Airport",
                distance: "10 km",
              },
              {
                icon: TrainIcon,
                name: "Central Railway Station",
                distance: "1 km",
              },
              { icon: BusIcon, name: "Central Bus Terminal", distance: "1 km" },
            ].map((point, index) => (
              <motion.div
                key={index}
                className="bg-background border border-border-soft rounded-2xl p-8 text-center flex flex-col items-center shadow-heritage"
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ duration: 0.6, ease: "easeOut" }}
              >
                <point.icon />
                <h4 className="font-playfair text-h4 text-text-heading mt-4">
                  {point.name}
                </h4>
                <p className="font-poppins text-xl font-medium text-action-primary mt-2">
                  {point.distance}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default DestinationsPage;
