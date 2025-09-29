
import { useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import LazyImage from '../hooks/LazyImage';

// Optimized gallery component with CSS animations and mobile-first design
type GalleryItem = { id: number; url: string; alt: string; category: string };

const Gallery = () => {
  // State for the currently selected image and its index.
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  
  // State for modal visibility.
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [zoom, setZoom] = useState(1);
  const [isPanning, setIsPanning] = useState(false);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [startPan, setStartPan] = useState<{ x: number; y: number } | null>(null);

  // State for the active filter category.
  const [activeFilter, setActiveFilter] = useState('All');

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
  const handleImageClick = useCallback((image: GalleryItem, index: number) => {
    setSelectedImage(image);
    setSelectedIndex(index);
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setIsModalOpen(true);
  }, []);

  // Function to navigate to the next image in the filtered list.
  const handleNext = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    const nextIndex = (selectedIndex + 1) % filteredImages.length;
    setSelectedImage(filteredImages[nextIndex]);
    setSelectedIndex(nextIndex);
  }, [selectedIndex, filteredImages]);

  // Function to navigate to the previous image.
  const handlePrev = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (selectedIndex === null) return;
    const prevIndex = (selectedIndex - 1 + filteredImages.length) % filteredImages.length;
    setSelectedImage(filteredImages[prevIndex]);
    setSelectedIndex(prevIndex);
  }, [selectedIndex, filteredImages]);

  // Function to close the modal.
  const handleCloseModal = useCallback(() => {
    setIsModalOpen(false);
    setSelectedImage(null);
    setSelectedIndex(null);
  }, []);

  // Zoom controls
  const zoomIn = useCallback(() => setZoom((z) => Math.min(z + 0.25, 4)), []);
  const zoomOut = useCallback(() => setZoom((z) => Math.max(z - 0.25, 0.5)), []);
  const resetZoom = useCallback(() => { setZoom(1); setPan({ x: 0, y: 0 }); }, []);

  // Pan handlers
  const onMouseDown = useCallback((e: React.MouseEvent) => {
    if (zoom <= 1) return;
    setIsPanning(true);
    setStartPan({ x: e.clientX - pan.x, y: e.clientY - pan.y });
  }, [zoom, pan]);
  
  const onMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning || !startPan) return;
    setPan({ x: e.clientX - startPan.x, y: e.clientY - startPan.y });
  }, [isPanning, startPan]);
  
  const onMouseUp = useCallback(() => setIsPanning(false), []);
  const onMouseLeave = useCallback(() => setIsPanning(false), []);

  // Effect hook to disable body scrolling for the modal.
  useEffect(() => {
    // Disable body scroll when modal is open.
    document.body.style.overflow = isModalOpen ? 'hidden' : '';
    return () => { 
      document.body.style.overflow = '';
    };
  }, [isModalOpen]);

  return (
    <div className="bg-background min-h-screen">
      {/* CSS Keyframes for animations */}
      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          @keyframes fadeIn {
            from { opacity: 0; }
            to { opacity: 1; }
          }
          @keyframes slideInUp {
            from {
              opacity: 0;
              transform: translateY(20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
          }
          .animate-fadeIn {
            animation: fadeIn 0.6s ease-out forwards;
          }
          .animate-slideInUp {
            animation: slideInUp 0.6s ease-out forwards;
          }
          .animate-delay-100 {
            animation-delay: 0.1s;
          }
          .animate-delay-200 {
            animation-delay: 0.2s;
          }
          .animate-delay-300 {
            animation-delay: 0.3s;
          }
        `
      }} />
      
      {/* ===== Hero Section ===== */}
      <div className="w-full bg-background">
        {/* Hero Section */}
        <section className="relative h-[60vh] sm:h-[70vh] overflow-hidden flex items-center justify-center">
          {/* Background Image */}
          <div 
            className="absolute inset-0 w-full h-full"
            style={{
              backgroundImage: `url(${heroImage})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          
          {/* Overlay */}
          <div className="absolute inset-0 bg-black/40" />
          
          {/* Content */}
          <div className="relative z-10 text-center text-foreground-on-color px-4 sm:px-6">
            <p className="font-poppins text-xs sm:text-sm tracking-widest text-accent-gold uppercase mb-4 font-medium opacity-0 animate-fadeInUp animate-delay-100">
              Visual Journey
            </p>
            <h1 className="font-cinzel text-3xl sm:text-4xl md:text-5xl lg:text-6xl mb-4 sm:mb-6 opacity-0 animate-fadeInUp animate-delay-200">
              Gallery
            </h1>
            <p className="font-cormorant text-base sm:text-lg md:text-xl mb-6 sm:mb-8 max-w-2xl sm:max-w-3xl mx-auto opacity-0 animate-fadeInUp animate-delay-300">
              Discover the beauty and elegance of our heritage property through stunning visuals
            </p>
          </div>
        </section>

        {/* Introduction Section */}
        <section className="max-w-6xl mx-auto px-4 sm:px-6 md:px-12 pt-12 sm:pt-20 pb-8 sm:pb-16">
          <div className="text-center mb-8 sm:mb-16">
            <p className="font-poppins text-xs sm:text-sm tracking-[0.2em] text-action-accent uppercase mb-4 font-medium animate-slideInUp">
              Visual Stories
            </p>
            <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-cinzel text-text-heading mb-4 sm:mb-6 relative animate-slideInUp animate-delay-100">
              Heritage Gallery & Visual Tales
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-16 sm:w-24 h-0.5 bg-gradient-to-r from-transparent via-action-accent to-transparent"></div>
            </h1>
            <p className="text-lg sm:text-xl font-cormorant text-text-subtle max-w-3xl sm:max-w-4xl mx-auto leading-relaxed animate-slideInUp animate-delay-200">
              Where tradition meets celebration in an authentic Kerala setting.
            </p>
          </div>
        </section>
      </div>

      {/* ===== Mobile-Optimized Filter Buttons ===== */}
      <div className="w-full px-4 sm:px-6 py-4 sm:py-8">
        <div className="flex flex-wrap justify-center gap-2 sm:gap-3 lg:gap-4 mb-6 sm:mb-8">
          <button
            onClick={() => setActiveFilter('All')}
            className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-poppins text-xs sm:text-sm font-medium transition-all duration-200 ease-out transform hover:scale-105 opacity-0 animate-slideInUp ${
              activeFilter === 'All'
                ? 'bg-action-accent text-foreground-on-color shadow-lg scale-105'
                : 'bg-background-secondary text-text-subtle hover:bg-action-accent/10 hover:text-action-accent'
            }`}
            style={{ animationDelay: '0ms' }}
          >
            All
          </button>
          {categories.map((category, index) => (
            <button
              key={category}
              onClick={() => setActiveFilter(category)}
              className={`px-3 sm:px-4 lg:px-6 py-2 sm:py-3 rounded-full font-poppins text-xs sm:text-sm font-medium transition-all duration-200 ease-out transform hover:scale-105 opacity-0 animate-slideInUp ${
                activeFilter === category
                  ? 'bg-action-accent text-foreground-on-color shadow-lg scale-105'
                  : 'bg-background-secondary text-text-subtle hover:bg-action-accent/10 hover:text-action-accent'
              }`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* ===== Optimized Mobile-First Gallery Grid ===== */}
      <div className="w-full px-2 sm:px-4 py-4 sm:py-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 sm:gap-3 lg:gap-4">
          {filteredImages.map((image, index) => (
            <div 
              key={image.id} 
              className="relative overflow-hidden cursor-pointer rounded-xl sm:rounded-2xl border border-border bg-background-secondary group transform transition-all duration-300 ease-out hover:scale-[1.02] hover:shadow-lg opacity-0 animate-slideInUp"
              style={{ 
                animationDelay: `${index * 50}ms`,
                aspectRatio: '4/3'
              }}
              onClick={() => handleImageClick(image, index)}
            >
              <LazyImage 
                src={image.url} 
                alt={image.alt} 
                className="absolute inset-0 w-full h-full object-cover rounded-xl sm:rounded-2xl transition-transform duration-500 ease-out group-hover:scale-105"
                style={{ aspectRatio: '4/3' }}
                quality={70}
              />
              {/* Mobile-optimized overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-3 sm:p-4">
                <div className="w-full flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                  <p className="text-foreground-on-color font-playfair text-sm sm:text-lg lg:text-xl">
                    {image.alt}
                  </p>
                  <span className="font-poppins text-xs text-foreground-on-color/80 bg-black/40 rounded-full px-2 sm:px-3 py-1 self-start sm:self-auto">
                    Tap to view
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ===== Optimized Mobile Modal (Updated with Navigation & Zoom) ===== */}
      {isModalOpen && selectedImage && (
        <div 
          className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4 bg-black/95 opacity-0 animate-fadeIn"
          onClick={handleCloseModal}
        >
          <div 
            className="relative w-full max-w-6xl max-h-[95vh] sm:max-h-[90vh] rounded-xl sm:rounded-2xl overflow-hidden shadow-heritage-lg transform opacity-0 animate-slideInUp animate-delay-100 bg-background"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Mobile-Optimized Toolbar */}
            <div className="absolute top-2 sm:top-3 left-2 sm:left-3 right-2 sm:right-3 z-20 flex items-center justify-between">
              <div className="flex items-center gap-1 sm:gap-2">
                <button onClick={zoomOut} className="bg-black/60 hover:bg-black/80 text-white rounded-full px-2 sm:px-3 py-1 text-xs transition-colors">-</button>
                <button onClick={resetZoom} className="bg-black/60 hover:bg-black/80 text-white rounded-full px-2 sm:px-3 py-1 text-xs transition-colors">Reset</button>
                <button onClick={zoomIn} className="bg-black/60 hover:bg-black/80 text-white rounded-full px-2 sm:px-3 py-1 text-xs transition-colors">+</button>
              </div>
              <button 
                onClick={handleCloseModal} 
                className="bg-action-primary hover:bg-action-primary-hover text-white rounded-full px-2 sm:px-3 py-1 text-xs transition-colors"
                aria-label="Close"
              >
                Close
              </button>
            </div>

            {/* Image Stage - Mobile Optimized */}
            <div 
              className="relative w-full h-[75vh] sm:h-[80vh] bg-background-secondary cursor-move touch-pan-x touch-pan-y"
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

            {/* Mobile-Optimized Navigation Buttons */}
            <button 
              onClick={handlePrev} 
              className="absolute left-2 sm:left-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 shadow-soft-sunlight"
              aria-label="Previous image"
            >
              <ChevronLeft size={16} className="sm:w-5 sm:h-5" />
            </button>
            <button 
              onClick={handleNext} 
              className="absolute right-2 sm:right-4 top-1/2 -translate-y-1/2 p-2 sm:p-3 rounded-full bg-black/60 hover:bg-black/80 text-white transition-all duration-200 shadow-soft-sunlight"
              aria-label="Next image"
            >
              <ChevronRight size={16} className="sm:w-5 sm:h-5" />
            </button>

            {/* Mobile-Optimized Image Info */}
            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 to-transparent p-3 sm:p-4 rounded-b-xl sm:rounded-b-2xl">
              <h3 className="text-white font-playfair text-sm sm:text-lg lg:text-xl mb-1 sm:mb-2">{selectedImage.alt}</h3>
              <p className="text-white/80 font-poppins text-xs sm:text-sm">
                {selectedIndex !== null ? selectedIndex + 1 : 1} of {filteredImages.length}
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Gallery;
