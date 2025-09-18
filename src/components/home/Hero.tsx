import React, { useEffect, useRef, useCallback, memo } from "react";

/**
 * A highly optimized Hero component.
 *
 * Key Optimizations:
 * 1.  **Direct DOM Manipulation for Parallax:** Instead of using React state (`useState`) to track scroll position,
 * which causes the entire component to re-render on every scroll event, we now directly manipulate the video's
 * transform style using a `ref`. This is massively more performant as it completely bypasses React's render cycle
 * for the parallax effect, offloading the work to the browser's compositor for GPU-accelerated smoothness.
 *
 * 2.  **Content Fade on Scroll:** Added a subtle fade-out effect for the content as the user scrolls down. This also uses
 * a `ref` and direct style manipulation to ensure it doesn't trigger re-renders, creating a more polished and
 * performant user experience.
 *
 * 3.  **Efficient Scroll Handling:** The `requestAnimationFrame` and `{ passive: true }` listener are retained as they
 * are best practices for creating non-blocking, efficient scroll handlers.
 *
 * 4.  **Memoization:** The component remains wrapped in `React.memo` to prevent unnecessary re-renders from parent
 * components, ensuring it only re-renders if its props were to change.
 */
const Hero: React.FC<{ onScrollDown: () => void }> = ({ onScrollDown }) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  // Optimized scroll handler that bypasses React's render cycle
  const handleScroll = useCallback(() => {
    const lastScrollY = window.scrollY;
    if (!ticking.current) {
      requestAnimationFrame(() => {
        // Apply parallax to the video directly
        if (videoRef.current) {
          videoRef.current.style.transform = `translate3d(0, ${lastScrollY * 0.3}px, 0)`;
        }
        // Apply fade-out to the content directly
        if (contentRef.current) {
            // Fades the content out over the first 500px of scrolling
            contentRef.current.style.opacity = `${Math.max(0, 1 - lastScrollY / 500)}`;
        }
        ticking.current = false;
      });
      ticking.current = true;
    }
  }, []); // Empty dependency array as refs don't need to be listed

  useEffect(() => {
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  return (
    <section className="relative h-screen overflow-hidden flex items-center justify-center bg-background">
      {/* Background Video: Using translate3d to ensure it's GPU-accelerated. */}
      <video
        ref={videoRef}
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        muted
        loop
        playsInline
        preload="metadata" // Only load video metadata initially for faster page load
        poster="/images/hero2.jpg" // Poster image for fast initial render and non-supporting browsers
        style={{ willChange: 'transform' }} // Hint to the browser to optimize for transform changes
      >
        {/* Updated video sources to point to your local files */}
        <source src="/videos/Hero.webm" type="video/webm" />
        <source src="/videos/Hero.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Optimized Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

      {/* Content Container with Performance-Optimized Animations */}
      <div
        ref={contentRef}
        className="relative z-10 text-center text-foreground-on-color px-6"
        style={{ willChange: 'opacity' }} // Hint to the browser to optimize for opacity changes
      >
        <p
          className="font-poppins text-xs tracking-widest text-accent uppercase mb-4 font-medium opacity-0 animate-[fade-in-up_0.8s_ease-out_0.1s_forwards]"
        >
          Amritha Heritage
        </p>

        <div className="opacity-0 animate-[fade-in-up_0.8s_ease-out_0.3s_forwards]">
          <h1
            className="font-cinzel text-4xl md:text-5xl lg:text-6xl mb-6 leading-tight text-foreground-on-color text-glow-gold animate-float"
          >
            Heritage Reborn,<br />
            <span className="italic bg-gradient-to-r from-accent-gold via-accent to-secondary bg-clip-text text-transparent">
              Luxury Renewed
            </span>
          </h1>
        </div>

        <p
          className="font-cormorant text-lg md:text-xl mb-8 max-w-3xl mx-auto text-foreground-on-color/90 leading-relaxed opacity-0 animate-[fade-in-up_0.8s_ease-out_0.5s_forwards]"
        >
          Experience the timeless elegance of colonial Travancore in the heart of Thiruvananthapuram.
        </p>

        <button
          onClick={onScrollDown}
          className="btn btn-secondary shadow-golden-glow text-lg px-8 py-4 hover:shadow-golden-glow hover:animate-hover-pulse hover:text-accent-gold"
        >
          Explore Heritage
        </button>
      </div>
    </section>
  );
};

// Memoize the component to prevent unnecessary re-renders from its parent
export default memo(Hero);

