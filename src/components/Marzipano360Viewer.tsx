import React, { useEffect, useRef, useState, useCallback } from "react";
import type { MarzipanoScene, Virtual360Room } from "../types";
import { getSceneById } from "../data/marzipano-config";
import "./Marzipano360Viewer.css";

interface Marzipano360ViewerProps {
  room: Virtual360Room;
  isOpen: boolean;
  onClose: () => void;
}

interface MarzipanoViewer {
  switchScene: (scene: any) => void;
  destroy: () => void;
}

const Marzipano360Viewer: React.FC<Marzipano360ViewerProps> = ({
  room,
  isOpen,
  onClose,
}) => {
  // Early return if room or primaryScene is not available
  if (!room || !room.primaryScene) {
    console.error("Marzipano360Viewer: Invalid room data", room);
    return null;
  }

  const viewerRef = useRef<HTMLDivElement>(null);
  const marzipanoViewerRef = useRef<MarzipanoViewer | null>(null);
  const [currentScene, setCurrentScene] = useState<MarzipanoScene>(
    room.primaryScene
  );
  const [isLoading, setIsLoading] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Check if mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Initialize Marzipano viewer
  const initializeViewer = useCallback(() => {
    if (!viewerRef.current || !window.Marzipano) return;

    try {
      setIsLoading(true);

      // Create viewer
      const viewer = new window.Marzipano.Viewer(viewerRef.current, {
        controls: {
          mouseViewMode: "drag",
        },
      });

      // Create scene
      const createScene = (sceneData: MarzipanoScene) => {
        const urlPrefix = `/images/360/tiles/${sceneData.id}`;
        const source = window.Marzipano.ImageUrlSource.fromString(
          `${urlPrefix}/{z}/{f}/{y}/{x}.jpg`,
          { cubeMapPreviewUrl: `${urlPrefix}/preview.jpg` }
        );

        const geometry = new window.Marzipano.CubeGeometry(sceneData.levels);
        const limiter = window.Marzipano.RectilinearView.limit.traditional(
          sceneData.faceSize,
          (100 * Math.PI) / 180,
          (120 * Math.PI) / 180
        );
        const view = new window.Marzipano.RectilinearView(
          sceneData.initialViewParameters,
          limiter
        );

        const scene = viewer.createScene({
          source: source,
          geometry: geometry,
          view: view,
          pinFirstLevel: true,
        });

        // Add hotspots
        sceneData.linkHotspots.forEach((hotspot) => {
          const hotspotElement = createHotspotElement(() => {
            const targetScene = getSceneById(hotspot.target);
            if (targetScene) {
              switchToScene(targetScene);
            }
          });

          scene.hotspotContainer().createHotspot(hotspotElement, {
            yaw: hotspot.yaw,
            pitch: hotspot.pitch,
          });
        });

        return scene;
      };

      const scene = createScene(currentScene);
      viewer.switchScene(scene);

      marzipanoViewerRef.current = {
        switchScene: (newScene: any) => viewer.switchScene(newScene),
        destroy: () => viewer.destroy(),
      };

      setIsLoading(false);
    } catch (error) {
      console.error("Error initializing Marzipano viewer:", error);
      setIsLoading(false);
    }
  }, [currentScene]);

  // Switch to different scene
  const switchToScene = useCallback((newScene: MarzipanoScene) => {
    if (!marzipanoViewerRef.current) return;

    try {
      setIsLoading(true);
      setCurrentScene(newScene);

      const urlPrefix = `/images/360/tiles/${newScene.id}`;
      const source = window.Marzipano.ImageUrlSource.fromString(
        `${urlPrefix}/{z}/{f}/{y}/{x}.jpg`,
        { cubeMapPreviewUrl: `${urlPrefix}/preview.jpg` }
      );

      const geometry = new window.Marzipano.CubeGeometry(newScene.levels);
      const limiter = window.Marzipano.RectilinearView.limit.traditional(
        newScene.faceSize,
        (100 * Math.PI) / 180,
        (120 * Math.PI) / 180
      );
      const view = new window.Marzipano.RectilinearView(
        newScene.initialViewParameters,
        limiter
      );

      const scene = new window.Marzipano.Scene({
        source: source,
        geometry: geometry,
        view: view,
        pinFirstLevel: true,
      });

      // Add hotspots
      newScene.linkHotspots.forEach((hotspot) => {
        const hotspotElement = createHotspotElement(() => {
          const targetScene = getSceneById(hotspot.target);
          if (targetScene) {
            switchToScene(targetScene);
          }
        });

        scene.hotspotContainer().createHotspot(hotspotElement, {
          yaw: hotspot.yaw,
          pitch: hotspot.pitch,
        });
      });

      marzipanoViewerRef.current.switchScene(scene);
      setIsLoading(false);
    } catch (error) {
      console.error("Error switching scene:", error);
      setIsLoading(false);
    }
  }, []);

  // Create hotspot element
  const createHotspotElement = (onClick: () => void) => {
    const wrapper = document.createElement("div");
    wrapper.className = "hotspot";
    wrapper.innerHTML = `
      <div class="hotspot-icon">
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="12" r="10" fill="rgba(255,255,255,0.9)" stroke="#007bff" stroke-width="2"/>
          <path d="M12 8l4 4-4 4" stroke="#007bff" stroke-width="2" fill="none"/>
        </svg>
      </div>
    `;
    wrapper.addEventListener("click", onClick);
    return wrapper;
  };

  // Load Marzipano scripts
  useEffect(() => {
    if (!isOpen) return;

    const loadScript = (src: string): Promise<void> => {
      return new Promise((resolve, reject) => {
        if (document.querySelector(`script[src="${src}"]`)) {
          resolve();
          return;
        }

        const script = document.createElement("script");
        script.src = src;
        script.onload = () => resolve();
        script.onerror = reject;
        document.head.appendChild(script);
      });
    };



    const initializeMarzipano = async () => {
      try {
        await Promise.all([
          // loadCSS('/360/marzipano-style.css'), // Removed to avoid global overflow:hidden on html/body
          loadScript("/360/vendor/screenfull.min.js"),
          loadScript("/360/vendor/bowser.min.js"),
          loadScript("/360/vendor/marzipano.js"),
        ]);

        // Wait a bit for scripts to be ready
        setTimeout(initializeViewer, 100);
      } catch (error) {
        console.error("Error loading Marzipano scripts:", error);
        setIsLoading(false);
      }
    };

    initializeMarzipano();
  }, [isOpen, initializeViewer]);

  // Cleanup on unmount or close
  useEffect(() => {
    return () => {
      if (marzipanoViewerRef.current) {
        marzipanoViewerRef.current.destroy();
        marzipanoViewerRef.current = null;
      }
    };
  }, []);

  // Handle fullscreen
  const toggleFullscreen = useCallback(async () => {
    try {
      const element = viewerRef.current;
      if (!element) {
        console.warn("Viewer element not found");
        return;
      }

      // Try native fullscreen API first
      if (document.fullscreenElement) {
        await document.exitFullscreen();
        setIsFullscreen(false);
      } else {
        await element.requestFullscreen();
        setIsFullscreen(true);
      }

      // Fallback to screenfull if available
      if (window.screenfull && window.screenfull.isEnabled) {
        if (window.screenfull.isFullscreen) {
          await window.screenfull.exit();
          setIsFullscreen(false);
        } else {
          await window.screenfull.request(element);
          setIsFullscreen(true);
        }
      }
    } catch (error) {
      console.error("Error toggling fullscreen:", error);
      setIsFullscreen(false);
    }
  }, []);

  // Listen for fullscreen changes
  useEffect(() => {
    const handleFullscreenChange = () => {
      if (window.screenfull && window.screenfull.isEnabled) {
        setIsFullscreen(window.screenfull.isFullscreen);
      } else {
        // Fallback to native fullscreen API
        setIsFullscreen(!!document.fullscreenElement);
      }
    };

    // Add native fullscreen event listeners as fallback
    const handleNativeFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement);
    };

    if (window.screenfull && window.screenfull.isEnabled) {
      window.screenfull.on("change", handleFullscreenChange);
      window.screenfull.on("error", (event: any) => {
        console.error("Fullscreen error:", event);
        setIsFullscreen(false);
      });
    } else {
      // Use native fullscreen events
      document.addEventListener(
        "fullscreenchange",
        handleNativeFullscreenChange
      );
      document.addEventListener("fullscreenerror", () => {
        console.error("Native fullscreen error");
        setIsFullscreen(false);
      });
    }

    return () => {
      if (window.screenfull && window.screenfull.isEnabled) {
        window.screenfull.off("change", handleFullscreenChange);
        window.screenfull.off("error");
      } else {
        // Remove native fullscreen event listeners
        document.removeEventListener(
          "fullscreenchange",
          handleNativeFullscreenChange
        );
        document.removeEventListener("fullscreenerror", () => {
          console.error("Native fullscreen error");
          setIsFullscreen(false);
        });
      }
    };
  }, [isOpen]);

  // Handle keyboard events and body scroll lock
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      const scrollY = window.scrollY || window.pageYOffset || 0;

      document.addEventListener("keydown", handleKeyDown);

      // Robust scroll lock: fix body to prevent layout shift and preserve scroll
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.left = "0";
      document.body.style.right = "0";
      document.body.style.width = "100%";
      document.body.style.overflow = "hidden";

      return () => {
        document.removeEventListener("keydown", handleKeyDown);

        const y = -parseInt(document.body.style.top || "0", 10) || 0;

        document.body.style.position = "";
        document.body.style.top = "";
        document.body.style.left = "";
        document.body.style.right = "";
        document.body.style.width = "";
        // Fully clear any inline overflow locks on body and html
        document.body.style.overflow = "";
        (document.body.style as any).overflowY = "";
        (document.body.style as any).overflowX = "";
        (document.documentElement.style as any).overflow = "";
        (document.documentElement.style as any).overflowY = "";
        (document.documentElement.style as any).overflowX = "";

        // Exit any lingering fullscreen state
        try {
          if (document.fullscreenElement) {
            document.exitFullscreen?.();
          }
          // screenfull fallback if available
          if (
            (window as any).screenfull?.isEnabled &&
            (window as any).screenfull.isFullscreen
          ) {
            (window as any).screenfull.exit();
          }
        } catch {}

        // Restore scroll position
        window.scrollTo(0, y);
      };
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  // Ensure global Marzipano CSS is removed and overflow restored when closing viewer
  useEffect(() => {
    if (!isOpen) {
      // Remove dynamically added Marzipano stylesheet to avoid global overflow: hidden on html, body
      const marzipanoLink = document.querySelector(
        'link[href="/360/marzipano-style.css"]'
      );
      if (marzipanoLink && marzipanoLink.parentNode) {
        marzipanoLink.parentNode.removeChild(marzipanoLink);
      }
      // Restore scrollability defensively across browsers
      document.body.style.overflow = "";
      (document.body.style as any).overflowY = "";
      (document.body.style as any).overflowX = "";
      (document.documentElement.style as any).overflow = "";
      (document.documentElement.style as any).overflowY = "";
      (document.documentElement.style as any).overflowX = "";
    }
  }, [isOpen]);

  // Additional cleanup on component unmount
  useEffect(() => {
    return () => {
      // Ensure any body-level locks are cleared on unmount
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.left = "";
      document.body.style.right = "";
      document.body.style.width = "";
      document.body.style.overflow = "";
      (document.body.style as any).overflowY = "";
      (document.body.style as any).overflowX = "";
      (document.documentElement.style as any).overflow = "";
      (document.documentElement.style as any).overflowY = "";
      (document.documentElement.style as any).overflowX = "";

      // Remove marzipano stylesheet if still present
      const marzipanoLink = document.querySelector(
        'link[href="/360/marzipano-style.css"]'
      );
      if (marzipanoLink && marzipanoLink.parentNode) {
        marzipanoLink.parentNode.removeChild(marzipanoLink);
      }

      // Exit any lingering fullscreen state
      try {
        if (document.fullscreenElement) {
          document.exitFullscreen?.();
        }
        if (
          (window as any).screenfull?.isEnabled &&
          (window as any).screenfull.isFullscreen
        ) {
          (window as any).screenfull.exit();
        }
      } catch {}
    };
  }, []);

  if (!isOpen) return null;

  return (
    <div className="marzipano-modal-overlay">
      <div className="marzipano-modal">
        {/* Header */}
        <div className="marzipano-header">
          <div className="marzipano-title">
            <h3 className="font-playfair text-xl lg:text-2xl text-white font-bold tracking-wide">
              {room.name}
            </h3>
            <p className="font-cormorant text-sm lg:text-base text-white/80 mt-1">
              {currentScene.name}
            </p>
          </div>
          <div className="marzipano-controls">
            <button
              className="btn btn-ghost text-sm px-4 py-2 bg-background-secondary/90 hover:bg-background-tertiary/90 border-border/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-accent/50"
              onClick={toggleFullscreen}
              title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
              aria-label="Toggle fullscreen mode"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2"
              >
                {isFullscreen ? (
                  <path
                    d="M8 3v3a2 2 0 0 1-2 2H3m18 0h-3a2 2 0 0 1-2-2V3m0 18v-3a2 2 0 0 1 2-2h3M3 16h3a2 2 0 0 1 2 2v3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                ) : (
                  <path
                    d="M8 3H5a2 2 0 0 0-2 2v3m18 0V5a2 2 0 0 0-2-2h-3m0 18h3a2 2 0 0 0 2-2v-3M3 16v3a2 2 0 0 0 2 2h3"
                    stroke="currentColor"
                    strokeWidth="2"
                  />
                )}
              </svg>
              <span className="font-poppins font-medium">
                {isFullscreen ? "Exit Fullscreen" : "Fullscreen"}
              </span>
            </button>
            <button
              className="btn btn-ghost text-sm px-4 py-2 bg-background-secondary/90 hover:bg-background-tertiary/90 border-border/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-accent/50"
              onClick={onClose}
              title="Close"
              aria-label="Close viewer"
            >
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                className="mr-2"
              >
                <path
                  d="M18 6L6 18M6 6l12 12"
                  stroke="currentColor"
                  strokeWidth="2"
                />
              </svg>
              <span className="font-poppins font-medium">Close</span>
            </button>
          </div>
        </div>

        {/* Viewer */}
        <div className="marzipano-viewer-container">
          <div ref={viewerRef} className="marzipano-viewer" />

          {isLoading && (
            <div className="marzipano-loading">
              <div className="loading-spinner"></div>
              <p className="font-poppins text-white font-medium">
                Loading 360° View...
              </p>
            </div>
          )}
        </div>

        {/* Scene Navigation */}
        {room.scenes.length > 1 && (
          <div className="marzipano-navigation">
            <h4 className="font-playfair text-lg text-white font-semibold tracking-wide mb-4">
              Explore Areas
            </h4>
            <div className="scene-buttons">
              {room.scenes.map((scene) => (
                <button
                  key={scene.id}
                  className={`btn text-sm px-4 py-2 font-poppins font-medium transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-accent/50 ${
                    currentScene.id === scene.id
                      ? "btn-primary bg-accent text-white border-accent shadow-lg"
                      : "btn-secondary bg-background-secondary hover:bg-background-tertiary border-border"
                  }`}
                  onClick={() => switchToScene(scene)}
                >
                  {scene.name}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Mobile Instructions */}
        {isMobile && (
          <div className="mobile-instructions">
            <p className="font-poppins text-sm text-white/70 font-medium">
              Drag to look around • Pinch to zoom
            </p>
          </div>
        )}

        {/* Fullscreen Close Button */}
        {isFullscreen && (
          <button
            className="btn btn-ghost fixed top-4 right-4 z-50 p-3 bg-background-secondary/90 hover:bg-background-tertiary/90 border-border/50 backdrop-blur-sm transition-all duration-300 hover:scale-105 focus:ring-2 focus:ring-accent/50 rounded-full"
            onClick={toggleFullscreen}
            title="Exit Fullscreen"
            aria-label="Exit fullscreen mode"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M18 6L6 18M6 6l12 12"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default Marzipano360Viewer;
