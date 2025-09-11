import React, { useState, useRef, useEffect } from 'react';

interface LazyVideoProps extends Omit<React.VideoHTMLAttributes<HTMLVideoElement>, 'src'> {
  src: string[];
  poster?: string;
  className?: string;
  priority?: boolean;
  onLoadStart?: () => void;
  onCanPlay?: () => void;
}

const LazyVideo: React.FC<LazyVideoProps> = ({
  src,
  poster,
  className = '',
  priority = false,
  onLoadStart,
  onCanPlay,
  ...props
}) => {
  const [isInView, setIsInView] = useState(priority);
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const videoRef = useRef<HTMLDivElement>(null);
  const videoElementRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (priority) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { 
        threshold: 0.1,
        rootMargin: '100px' // Start loading 100px before video enters viewport
      }
    );

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoadStart = () => {
    setHasError(false);
    onLoadStart?.();
  };

  const handleCanPlay = () => {
    setIsLoaded(true);
    onCanPlay?.();
  };

  const handleError = () => {
    setHasError(true);
    setIsLoaded(false);
  };

  return (
    <div 
      ref={videoRef}
      className={`relative overflow-hidden ${className}`}
    >
      {/* Poster/Placeholder */}
      {poster && (!isLoaded || hasError) && (
        <img
          src={poster}
          alt="Video placeholder"
          className="absolute inset-0 w-full h-full object-cover"
          loading={priority ? 'eager' : 'lazy'}
        />
      )}

      {/* Loading indicator */}
      {isInView && !isLoaded && !hasError && (
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Actual Video */}
      {(isInView || priority) && !hasError && (
        <video
          ref={videoElementRef}
          onLoadStart={handleLoadStart}
          onCanPlay={handleCanPlay}
          onError={handleError}
          className={`
            transition-opacity duration-500 
            ${isLoaded ? 'opacity-100' : 'opacity-0'}
            w-full h-full object-cover
          `}
          poster={poster}
          preload={priority ? 'auto' : 'none'}
          {...props}
        >
          {src.map((source, index) => {
            const format = source.includes('.webm') ? 'video/webm' : 
                          source.includes('.mp4') ? 'video/mp4' : 
                          'video/mp4';
            return (
              <source key={index} src={source} type={format} />
            );
          })}
          Your browser does not support the video tag.
        </video>
      )}

      {/* Error fallback */}
      {hasError && (
        <div className="absolute inset-0 bg-gray-900 flex items-center justify-center">
          <div className="text-white text-center">
            <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 6a2 2 0 012-2h6l2 2h6a2 2 0 012 2v6a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 12l4-4m0 4l-4-4" />
            </svg>
            <p className="text-sm">Failed to load video</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default LazyVideo;
