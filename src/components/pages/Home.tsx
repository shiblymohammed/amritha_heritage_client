import React, { Suspense, lazy, useRef } from 'react';

// Lazy load the Hero and Start components for code splitting
const Hero = lazy(() => import('../home/Hero'));
const Start = lazy(() => import('../home/Start'));
const AccommodationSection = lazy(() => import('../home/AccommodationSection'));
const DiningSection = lazy(() => import('../home/dining/DiningSection'))
const EventsIntroSection = lazy(() => import('../home/EventsIntroSection'))
const DestinationSection = lazy(() => import('../home/DestinationSection'))
const ContactSection = lazy(() => import('../home/ContactSection'))

const Home: React.FC = () => {
  const startSectionRef = useRef<HTMLDivElement>(null);

  const handleScrollToStart = () => {
    startSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <main className="min-h-screen">
      {/* Lazy-loaded Hero component */}
      <Suspense fallback={null}>
        <Hero onScrollDown={handleScrollToStart} />
      </Suspense>
      {/* Lazy-loaded Start section */}
      <div ref={startSectionRef}>
        <Suspense fallback={null}>
          <Start />
        </Suspense>
      </div>
      {/* Lazy-loaded Accommodation section */}
      <Suspense fallback={null}>
        <AccommodationSection />
      </Suspense>
      <Suspense fallback={null}>
        <DiningSection />
      </Suspense>
      <Suspense fallback={null}>
        <EventsIntroSection />
      </Suspense>
      <Suspense fallback={null}>
        <DestinationSection />
      </Suspense>
      <Suspense fallback={null}>
        <ContactSection />
      </Suspense>
    
    </main>
  );
};

export default Home;