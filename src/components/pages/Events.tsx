import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Calendar,
  Users,
  MapPin,
  Phone,
  Mail,
  Star,
  Heart,
  Camera,
  Music,
  Utensils,
  Gift,
  Clock,
} from "lucide-react";
import { motion } from "framer-motion";

const Events = () => {
  const navigate = useNavigate();
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const parallaxOffset = scrollY * 0.3;

  // Scroll to top on component mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const eventTypes = [
    {
      id: "weddings",
      title: "Weddings & Receptions",
      icon: Heart,
      description:
        "Transform your special day into an unforgettable celebration with our authentic Kerala heritage backdrop. Our traditional architecture, lush gardens, and elegant interiors create the perfect ambiance for your wedding ceremony and reception.",
      features: [
        "Traditional Kerala Architecture with Authentic Wooden Pillars",
        "Beautiful Garden Ceremonies with Tropical Landscaping",
        "Indoor & Outdoor Venue Options Available",
        "Professional Catering with Kerala & Multi-cuisine",
        "Bridal Suite for Pre-wedding Preparations",
        "Decorated Mandap Setup Arrangements",
      ],
      capacity: "maximum 200 guests",
      duration: "Half Day & Full Day",
      priceRange: "₹2,00,000 - ₹8,00,000",
      image: "/images/weddings-desktop.webp",
      color: "from-action-primary to-action-accent",
      highlights: ["Heritage Architecture", "Garden Venues", "Full Service"],
    },
    {
      id: "pre-wedding",
      title: "Pre-Wedding Photography",
      icon: Camera,
      description:
        "Capture your love story against our stunning heritage architecture and scenic landscapes. Multiple photogenic locations within the property offer diverse backdrops for your pre-wedding shoot, from traditional courtyards to romantic garden settings.",
      features: [
        "Multiple Scenic Photography Locations Available",
        "Traditional Heritage Backdrops & Courtyards",
        "Lush Garden Settings with Natural Lighting",
        "Authentic Kerala Interiors with Wooden Details",
        "Professional Photography Coordination Support",
        "Costume Change Areas and Makeup Facilities",
      ],
      capacity: "Intimate couple sessions",
      duration: "Half Day & Full Day",
      priceRange: "₹15,000 - ₹50,000",
      image: "/images/Events/SAJAN-33.webp",
      color: "from-action-accent to-action-primary",
      highlights: [
        "Multiple Locations",
        "Heritage Backdrops",
        "Professional Support",
      ],
    },
    {
      id: "engagement",
      title: "Engagement Ceremonies",
      icon: Gift,
      description:
        "Celebrate your commitment in an elegant heritage setting that combines tradition with sophistication. Our intimate venues provide the perfect atmosphere for ring ceremonies, with beautifully decorated spaces and personalized service.",
      features: [
        "Intimate Decorated Venues with Traditional Elements",
        "Customized Floral Arrangements & Decorations",
        "Professional Photography & Videography Support",
        "Welcome Drinks & Traditional Refreshments",
        "Music System & Lighting Arrangements",
        "Personalized Setup Based on Your Preferences",
      ],
      capacity: "maximum 200 guests",
      duration: "Half Day & Full Day",
      priceRange: "₹50,000 - ₹2,00,000",
      image: "/images/cultural-desktop.webp",
      color: "from-action-primary to-text-heading",
      highlights: ["Intimate Setting", "Custom Decor", "Full Service"],
    },
    {
      id: "birthday",
      title: "Birthday Celebrations",
      icon: Gift,
      description:
        "Make birthdays truly memorable with our charming celebration spaces and personalized party planning. From children's themed parties to milestone birthday celebrations, we create magical experiences for all ages.",
      features: [
        "Themed Party Decorations & Balloon Arrangements",
        "Customized Birthday Cake & Dessert Options",
        "Entertainment Options for All Age Groups",
        "Custom Catering Menus & Snack Counters",
        "Photography Services for Special Moments",
        "Party Games & Activity Coordination",
      ],
      capacity: "maximum 200 guests",
      duration: "3–4 hours",
      priceRange: "₹25,000 - ₹1,50,000",
      image: "/images/wedding-desktop.webp",
      color: "from-action-accent to-action-primary",
      highlights: ["All Ages Welcome", "Themed Parties", "Entertainment"],
    },
    {
      id: "corporate",
      title: "Corporate Events & Conferences",
      icon: Users,
      description:
        "Host professional gatherings in a unique heritage environment that impresses clients and motivates teams. Our facilities combine modern amenities with traditional charm for memorable corporate experiences.",
      features: [
        "Professional Conference Facilities with Modern Tech",
        "Team Building Activities in Natural Settings",
        "Business Lunch & Dinner Arrangements",
        "Private Meeting Rooms with Audio-Visual Support",
        "Welcome Reception & Networking Areas",
        "Accommodation Packages for Outstation Guests",
      ],
      capacity: "maximum 200 guests",
      duration: "Half Day & Full Day",
      priceRange: "₹30,000 - ₹3,00,000",
      image: "/images/corporate-desktop.webp",
      color: "from-text-heading to-action-primary",
      highlights: ["Modern Facilities", "Team Building", "Professional"],
    },
    {
      id: "cultural",
      title: "Cultural Programs & Performances",
      icon: Music,
      description:
        "Showcase traditional performances and cultural celebrations in an authentic heritage setting. Our venues provide the perfect ambiance for classical music concerts, dance performances, and cultural festivals.",
      features: [
        "Traditional Performance Stages with Proper Acoustics",
        "Authentic Cultural Settings & Backdrops",
        "Professional Audio-Visual & Lighting Support",
        "Seating Arrangements for Various Audience Sizes",
        "Artist Green Rooms & Preparation Areas",
        "Cultural Ambiance with Heritage Architecture",
      ],
      capacity: "maximum 200 guests",
      duration: "Half Day & Full Day",
      priceRange: "₹40,000 - ₹2,50,000",
      image: "/images/Events/SAJAN-39.webp",
      color: "from-action-primary to-action-accent",
      highlights: [
        "Traditional Stages",
        "Cultural Ambiance",
        "Professional Setup",
      ],
    },
  ];

  const amenities = [
    {
      icon: Utensils,
      title: "Catering Services",
      desc: "Traditional Kerala & Multi-cuisine options with experienced chefs",
    },
    {
      icon: Users,
      title: "Event Coordination",
      desc: "Dedicated team for seamless planning and execution",
    },
    {
      icon: Camera,
      title: "Photography Support",
      desc: "Professional photography arrangements and coordination",
    },
    {
      icon: Music,
      title: "Audio Visual",
      desc: "Modern sound and lighting systems with technical support",
    },
    {
      icon: MapPin,
      title: "Scenic Locations",
      desc: "Multiple picturesque venues within the heritage property",
    },
    {
      icon: Gift,
      title: "Custom Packages",
      desc: "Tailored solutions and personalized service for every celebration",
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative h-[90vh] overflow-hidden flex items-center justify-center">
        {/* Background Image */}
        <div
          className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-300 ease-out"
          style={{
            backgroundImage: "url('/images/Events/SAJAN-40.webp')",
            transform: `translateY(${parallaxOffset * 0.2}px)`,
          }}
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-black/40" />

        {/* Content */}
        <div className="relative z-10 text-center text-foreground-on-color px-6 animate-fadeInUp">
          <motion.p
            className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            Events & Celebrations
          </motion.p>
          <motion.h1
            className="text-4xl md:text-6xl font-playfair font-bold mb-6 leading-tight opacity-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            Create Unforgettable Moments
          </motion.h1>
          <motion.p
            className="max-w-2xl mx-auto text-lg md:text-xl text-gray-100 mb-8 opacity-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Celebrate life's special occasions in the timeless elegance of our
            heritage property. From intimate gatherings to grand celebrations,
            we provide the perfect backdrop for your memorable events.
          </motion.p>
          <motion.div
            className="opacity-0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <a
              href="#event-types"
              className="inline-flex items-center px-8 py-3 bg-accent-gold text-dark-900 font-medium rounded-full hover:bg-accent-gold/90 transition-colors"
            >
              Explore Event Options
              <svg
                className="w-4 h-4 ml-2"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </a>
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
          <div className="w-6 h-10 border-2 border-gray-300 rounded-full flex justify-center items-start p-1">
            <motion.div
              className="w-1 h-2 bg-accent-gold rounded-full"
              animate={{ y: [0, 12, 0] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16 md:py-24">
        {/* Introduction Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-16">
          <div className="text-center mb-16">
            <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium animate-fade-in-up">
              Events at Amritha Heritage
            </p>
            <h1 className="text-h1 font-cinzel text-text-heading mb-6 relative animate-fade-in-up">
              Heritage Events & Celebrations
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h1>
            <p className="text-xl font-cormorant text-text-subtle leading-relaxed">
              From intimate gatherings to grand celebrations, our heritage
              property in Thycaud, Thiruvananthapuram provides the perfect
              backdrop for life's most precious moments. Where tradition meets
              celebration in an authentic Kerala setting.
            </p>
          </div>
        </section>

        {/* Event Types - Alternating Layout */}
        <section className="max-w-7xl mx-auto px-6 md:px-12 pb-20">
          <div className="space-y-20">
            {eventTypes.map((event, index) => {
              const isEven = index % 2 === 0;
              return (
                <div
                  key={event.id}
                  className="group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.2}s` }}
                >
                  <div
                    className={`grid lg:grid-cols-2 gap-12 lg:gap-16 items-center ${
                      !isEven ? "lg:grid-flow-col-dense" : ""
                    }`}
                  >
                    {/* Image Section */}
                    <div
                      className={`relative ${!isEven ? "lg:col-start-2" : ""}`}
                    >
                      <div className="relative h-96 lg:h-[28rem] rounded-2xl overflow-hidden shadow-heritage group-hover:shadow-heritage-lg transition-all duration-500">
                        <img
                          src={event.image}
                          alt={event.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        />
                        {/* Removed gradient overlay to make image clearer */}

                        {/* Icon and Highlights Overlay */}
                        <div className="absolute top-6 left-6">
                          <div className="bg-text-on-color/20 backdrop-blur-sm rounded-full p-4">
                            <event.icon className="w-8 h-8 text-text-on-color" />
                          </div>
                        </div>

                        <div className="absolute bottom-6 left-6 right-6">
                          <div className="flex flex-wrap gap-2">
                            {event.highlights.map((highlight, idx) => (
                              <span
                                key={idx}
                                className="bg-text-on-color/25 backdrop-blur-sm text-text-on-color text-sm px-3 py-1 rounded-full font-poppins font-medium"
                              >
                                {highlight}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Decorative Element */}
                        <div className="absolute -top-4 -right-4 w-24 h-24 bg-action-accent/20 rounded-full blur-xl"></div>
                        <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-action-primary/20 rounded-full blur-xl"></div>
                      </div>
                    </div>

                    {/* Content Section */}
                    <div className={`${!isEven ? "lg:col-start-1" : ""}`}>
                      <div className="space-y-6">
                        {/* Header */}
                        <div>
                          <h3 className="text-3xl lg:text-4xl font-playfair text-text-heading mb-4 leading-tight">
                            {event.title}
                          </h3>
                          <p className="text-lg font-cormorant text-text-subtle leading-relaxed">
                            {event.description}
                          </p>
                        </div>

                        {/* Quick Info */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                          <div className="flex items-center p-4 bg-background-secondary rounded-xl">
                            <Users className="w-5 h-5 text-action-accent mr-3 flex-shrink-0" />
                            <div>
                              <p className="font-poppins text-xs text-text-subtle uppercase tracking-wide">
                                Capacity
                              </p>
                              <p className="font-poppins text-sm font-medium text-text-heading">
                                {event.capacity}
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center p-4 bg-background-secondary rounded-xl">
                            <Clock className="w-5 h-5 text-action-accent mr-3 flex-shrink-0" />
                            <div>
                              <p className="font-poppins text-xs text-text-subtle uppercase tracking-wide">
                                Duration
                              </p>
                              <p className="font-poppins text-sm font-medium text-text-heading">
                                {event.duration}
                              </p>
                            </div>
                          </div>
                        </div>

                        {/* Features */}
                        <div>
                          <h4 className="font-playfair text-xl text-text-heading mb-4">
                            What's Included
                          </h4>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {event.features.slice(0, 6).map((feature, idx) => (
                              <div key={idx} className="flex items-start">
                                <Star className="w-4 h-4 text-action-accent mr-3 flex-shrink-0 mt-1" />
                                <span className="font-poppins text-sm text-text-subtle leading-relaxed">
                                  {feature}
                                </span>
                              </div>
                            ))}
                          </div>
                          {event.features.length > 6 && (
                            <div className="mt-3">
                              <span className="text-sm font-poppins text-action-accent font-medium">
                                +{event.features.length - 6} more premium
                                features included
                              </span>
                            </div>
                          )}
                        </div>

                        {/* Action Buttons */}
                        <div className="flex flex-col sm:flex-row gap-4 pt-4">
                          <button
                            onClick={() => navigate("/gallery")}
                            className="bg-background-secondary hover:bg-background-tertiary text-action-primary border-2 border-action-primary/20 hover:border-action-primary font-poppins font-medium py-4 px-8 rounded-xl transition-all duration-300 hover:shadow-lg"
                          >
                            View Gallery
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Divider */}
                  {index < eventTypes.length - 1 && (
                    <div className="mt-20">
                      <div className="w-full h-px bg-gradient-to-r from-transparent via-action-accent/30 to-transparent"></div>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>

        {/* Amenities Section */}
        <section className="bg-background-secondary py-20">
          <div className="max-w-6xl mx-auto px-6 md:px-12">
            <div className="text-center mb-16">
              <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
                Event Amenities
              </p>
              <h2 className="text-h2 font-playfair text-text-heading mb-6 relative">
                Everything You Need for Perfect Events
                <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {amenities.map((amenity, index) => (
                <div
                  key={index}
                  className="text-center group animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="bg-background rounded-full w-20 h-20 mx-auto mb-6 flex items-center justify-center shadow-heritage group-hover:shadow-heritage-lg transition-all duration-300">
                    <amenity.icon className="w-8 h-8 text-action-accent" />
                  </div>
                  <h3 className="text-xl font-playfair text-text-heading mb-3">
                    {amenity.title}
                  </h3>
                  <p className="font-cormorant text-text-subtle leading-relaxed">
                    {amenity.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-4xl mx-auto px-6 md:px-12 py-20">
          <div className="bg-background-tertiary rounded-2xl p-8 md:p-12 shadow-heritage">
            <div className="text-center mb-8">
              <h2 className="text-h2 font-playfair text-text-heading mb-4">
                Plan Your Event
              </h2>
              <p className="font-cormorant text-lg text-text-subtle leading-relaxed">
                Let our experienced team help you create the perfect
                celebration. Contact us to discuss your requirements and get a
                customized quote.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6 mb-8">
              <div className="text-center">
                <div className="bg-action-accent/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Phone className="w-6 h-6 text-action-accent" />
                </div>
                <h4 className="font-playfair text-text-heading mb-2">
                  Call Us
                </h4>
                <a 
                  href="tel:+918714653336"
                  className="inline-block font-poppins text-sm text-action-primary hover:text-action-accent transition-colors duration-300"
                >
                  +91 87146 53336
                </a>
              </div>
              <div className="text-center">
                <div className="bg-action-accent/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Mail className="w-6 h-6 text-action-accent" />
                </div>
                <h4 className="font-playfair text-text-heading mb-2">Email</h4>
                <p className="font-poppins text-sm text-text-subtle">
                  info@amrithaheritage.com
                </p>
              </div>
              <div className="text-center">
                <div className="bg-action-accent/10 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-action-accent" />
                </div>
                <h4 className="font-playfair text-text-heading mb-2">
                  Book Now
                </h4>
                <p className="font-poppins text-sm text-text-subtle">
                  Schedule a visit
                </p>
              </div>
            </div>

            <div className="text-center">
              
              <button className="bg-background hover:bg-background-secondary text-action-primary border-2 border-action-primary font-poppins font-medium py-4 px-8 rounded-lg transition-colors duration-300 mb-4">
                Contact us
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Events;
