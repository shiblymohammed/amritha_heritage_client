
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { X as CloseIcon, ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from '../hooks/LazyImage';

// This is the main gallery page component.
// It includes a hero section, a filterable image grid, and an expanded modal with navigation.
const Gallery = () => {
  // State for the parallax offset of the hero image.
  const [parallaxOffset, setParallaxOffset] = useState(0);

  // State for the currently selected image and its index.
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // State for modal visibility.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState<{ x: number; y: number } | null>(null);

  // State for the active filter category.
  const [activeFilter, _setActiveFilter] = useState('All');

  // Local public image paths (random sources across public/images)
  const sourcePool = [
    '/images/home.webp',
    '/images/home2.webp',
    '/images/Intro/intro2.jpg',
    '/images/Intro/intro3.webp',
    '/images/Accommodation/room (1).webp',
    '/images/Accommodation/room (2).webp',
    '/images/Accommodation/room (3).webp',
    '/images/Accommodation/room (4).webp',
    '/images/Accommodation/room (5).webp',
    '/images/Accommodation/room (6).webp',
    '/images/Accommodation/room (7).webp',
    '/images/Accommodation/room (8).webp',
    '/images/Accommodation/room (9).webp',
    '/images/Accommodation/room (10).webp',
    '/images/Dining/hall.jpg',
    '/images/Dining/hall2.jpg',
    '/images/Dining/hall3.jpg',
    '/images/Dining/hall4.jpg',
    '/images/Dining/hall5.jpg',
    '/images/Dining/kitcheninside.jpg',
    '/images/Dining/varanda1.jpg',
    '/images/Dining/varanda2.jpg',
    '/images/Events/SAJAN-31.webp',
    '/images/Events/SAJAN-33.webp',
    '/images/Events/SAJAN-34.webp',
    '/images/Events/SAJAN-37.webp',
    '/images/Events/SAJAN-38.webp',
    '/images/Events/SAJAN-39.webp',
    '/images/Events/SAJAN-40.webp',
  ];

  const categories = ['Interiors', 'Outdoors', 'Amenities', 'Dining', 'Events'] as const;

  type GalleryItem = { id: number; url: string; alt: string; category: string };

  const [allImages, setAllImages] = useState<GalleryItem[]>([]);

  // Shuffle helper
  const shuffle = <T,>(arr: T[]): T[] => {
    const a = [...arr];
    for (let i = a.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [a[i], a[j]] = [a[j], a[i]];
    }
    return a;
  };

  useEffect(() => {
    // Build randomized gallery list from local public images
    const shuffled = shuffle(sourcePool).slice(0, 18);
    const generated: GalleryItem[] = shuffled.map((url, idx) => ({
      id: idx + 1,
      url,
      alt: `Gallery Image ${idx + 1}`,
      category: categories[idx % categories.length]
    }));
    setAllImages(generated);
  }, []);

  // Placeholder URL for the hero background image.
  const heroImage = "/images/Intro/intro3.webp";

  // Filter images based on the active category (UI not shown; keep for future)
  const filteredImages = activeFilter === 'All'
    ? allImages
    : allImages.filter(img => img.category === activeFilter);

  // Function to open the modal with a specific image and its index.
  const handleImageClick = (image: any, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsModalOpen(true);
  };

  // Function to navigate to the next image in the filtered list.
  const handleNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setSelectedIndex(nextIndex);
  };

  // Function to navigate to the previous image.
  const handlePrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setSelectedIndex(prevIndex);
  };

  // Function to close the modal.
  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setSelectedIndex(null);
  };

  // Zoom controls
  const zoomIn = () => setZoom((z) => Math.min(z + 0.25, 4));
  const zoomOut = () => setZoom((z) => Math.max(z - 0.25, 0.5));
  const resetZoom = () => { setZoom(1); setPan({ x: 0, y: 0 }); };

  // Pan handlers
  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!isPanning || !startPan) return;
    setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
  };
  const onMouseUp = () => setIsPanning(false);
  const onMouseLeave = () => setIsPanning(false);

  // Effect hook to handle parallax and disable body scrolling for the modal.
  useEffect(() => {
    // Parallax scroll effect for the hero image.
    const handleScroll = () => {
      setParallaxOffset(window.scrollY * 0.5); // Adjust multiplier for effect intensity
    };
    window.addEventListener('scroll', handleScroll);

    // Disable body scroll when modal is open.
    document.body.style.overflow = isModalOpen ? 'hidden' : 'unset';

    return () => { 
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'unset';
    };
  }, [isModalOpen]);

  return (
    <div className="bg-background min-h-screen">
      {/* ===== Hero Section ===== */}
      <div className="w-full bg-background">
        {/* Hero Section */}
        <section className="relative h-[70vh] overflow-hidden flex items-center justify-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundAttachment: 'fixed'
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="relative z-10 text-center text-foreground-on-color px-6 animate-fadeInUp">
            <p className="font-poppins text-xs tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-[fadeInUp_0.8s_ease-out_0.1s_forwards]">
              Visual Journey
            </p>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-6"
            >
              Gallery
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto"
            >
              Discover the beauty and elegance of our heritage property through stunning visuals
            </motion.p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="max-w-6xl mx-auto px-6 md:px-12 pt-20 pb-16">
          <div className="text-center mb-16 animate-fade-in-up">
            <p className="font-poppins text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium">
              Visual Stories
            </p>
            <h1 className="text-h1 font-cinzel text-text-heading mb-6 relative animate-float">
              Heritage Gallery & Visual Tales
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h1>
            <p className="text-xl font-cormorant text-text-subtle max-w-4xl mx-auto leading-relaxed">
              Where tradition meets celebration in an authentic Kerala setting.
            </p>
          </div>
        </section>
      </div>

      {/* ===== Gallery Grid (Animated, Randomized) ===== */}
      <div className="w-full px-2 py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden cursor-pointer rounded-2xl border border-border card-base hover-lift hover-glow animate-fade-in-up group"
              style={{ animationDelay: `${index * 50}ms`, height: '90vh' }}
              onClick={() => handleImageClick(image, index)}
            >
              <LazyImage 
                src={image.url} 
                alt={image.alt} 
                className="absolute inset-0 w-full h-full object-cover rounded-2xl transition-transform duration-700 group-hover:scale-110"
                quality={70}
              />
              {/* Overlay with gradient, caption and hint */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="w-full flex items-center justify-between">
                  <p className="text-foreground-on-color font-playfair text-xl animate-fade-in">
                    {image.alt}
                  </p>
                  <span className="font-poppins text-xs text-foreground-on-color/80 bg-black/30 rounded-full px-3 py-1 animate-fade-in">
                    Click to view
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Image Modal (Updated with Navigation & Zoom) ===== */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-menu-overlay/90 animate-fade-in"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-6xl max-h-[90vh] rounded-2xl overflow-hidden shadow-heritage-lg transform animate-fade-in-up bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Toolbar */}
            <div className="absolute top-3 left-3 right-3 z-20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <button onClick={zoomOut} className="btn btn-secondary px-3 py-1 text-xs">-</button>
                <button onClick={resetZoom} className="btn btn-secondary px-3 py-1 text-xs">Reset</button>
                <button onClick={zoomIn} className="btn btn-secondary px-3 py-1 text-xs">+</button>
              </div>
              <button 
                onClick={handleCloseModal} 
                className="btn btn-primary px-3 py-1 text-xs"
                aria-label="Close"
              >
                Close
              </button>
            </div>

            {/* Image Stage */}
            <div 
              className="relative w-full h-[80vh] bg-background-secondary cursor-move"
              onMouseDown={onMouseDown}
              onMouseMove={onMouseMove}
              onMouseUp={onMouseUp}
              onMouseLeave={onMouseLeave}
            >
              <LazyImage 
                src={selectedImage.url} 
                alt={selectedImage.alt} 
                className="absolute top-1/2 left-1/2 rounded-lg shadow-soft-sunlight object-contain"
                style={{
                  transform: `translate(-50%, -50%) scale(${zoom}) translate(${pan.x / zoom}px, ${pan.y / zoom}px)`,
                  transition: isPanning ? 'none' : 'transform 200ms ease-out',
                  maxWidth: zoom === 1 ? '100%' : 'none',
                  maxHeight: zoom === 1 ? '100%' : 'none'
                }}
                quality={80}
              />
            </div>

            {/* Modal Navigation Buttons */}
            <button 
              onClick={handlePrev} 
              className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-action-primary text-text-on-color hover:bg-action-primary-hover transition-colors shadow-soft-sunlight"
              aria-label="Previous image"
            >
              <ChevronLeft size={20} />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-action-primary text-text-on-color hover:bg-action-primary-hover transition-colors shadow-soft-sunlight"
              aria-label="Next image"
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
