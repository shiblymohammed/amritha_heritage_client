// src/components/MarzipanoViewer.tsx
import React, { useEffect, useRef } from 'react';
import { panoData } from '../data/panoData'; // Import our scene data

interface MarzipanoViewerProps {
  initialSceneId: string;
  onClose: () => void;
}

const MarzipanoViewer: React.FC<MarzipanoViewerProps> = ({ initialSceneId, onClose }) => {
  const panoRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Make scene data available on the window object, like the original script expects
    window.APP_DATA = panoData;
    const data = window.APP_DATA;
    const Marzipano = (window as any).Marzipano;

    if (!panoRef.current || !Marzipano) return;

    const panoElement = panoRef.current;
    
    // This is the logic adapted from your index.js file
    const viewerOpts = { controls: { mouseViewMode: data.settings.mouseViewMode } };
    const viewer = new Marzipano.Viewer(panoElement, viewerOpts);

    const scenes = data.scenes.map((sceneData: any) => {
      const urlPrefix = "/tiles"; // From the public folder
      const source = Marzipano.ImageUrlSource.fromString(
        `${urlPrefix}/${sceneData.id}/{z}/{f}/{y}/{x}.jpg`,
        { cubeMapPreviewUrl: `${urlPrefix}/${sceneData.id}/preview.jpg` }
      );
      const geometry = new Marzipano.CubeGeometry(sceneData.levels);
      const limiter = Marzipano.RectilinearView.limit.traditional(sceneData.faceSize, 100 * Math.PI / 180, 120 * Math.PI / 180);
      const view = new Marzipano.RectilinearView(sceneData.initialViewParameters, limiter);
      const scene = viewer.createScene({ source, geometry, view, pinFirstLevel: true });
      return { data: sceneData, scene, view };
    });

    const findSceneById = (id: string) => scenes.find((s: any) => s.data.id === id) || scenes[0];

    const initialScene = findSceneById(initialSceneId);
    initialScene.scene.switchTo();

    // Cleanup function to run when the component unmounts
    return () => {
      viewer.destroy();
      delete window.APP_DATA;
    };

  }, [initialSceneId]); // Rerun effect if the initial scene changes

  return (
    <div className="fixed inset-0 bg-black z-[100] flex items-center justify-center">
      <div id="pano" ref={panoRef} className="absolute top-0 left-0 w-full h-full"></div>
      
      {/* Close Button */}
      <button 
        onClick={onClose} 
        className="absolute top-4 right-4 z-50 bg-black/50 text-white rounded-full p-2 hover:bg-black/80 transition-colors"
        aria-label="Close 360 view"
      >
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>

      {/* You can add other UI controls here if needed, like scene lists, etc. */}
    </div>
  );
};

export default MarzipanoViewer;