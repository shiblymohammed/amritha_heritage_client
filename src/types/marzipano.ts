// TypeScript interfaces for Marzipano 360 viewer

interface MarzipanoLevel {
  tileSize: number;
  size: number;
  fallbackOnly?: boolean;
}

interface MarzipanoViewParameters {
  yaw: number;
  pitch: number;
  fov: number;
}

interface MarzipanoHotspot {
  yaw: number;
  pitch: number;
  rotation: number;
  target: string;
}

interface MarzipanoInfoHotspot {
  yaw: number;
  pitch: number;
  text: string;
}

interface MarzipanoScene {
  id: string;
  name: string;
  levels: MarzipanoLevel[];
  faceSize: number;
  initialViewParameters: MarzipanoViewParameters;
  linkHotspots: MarzipanoHotspot[];
  infoHotspots: MarzipanoInfoHotspot[];
}

interface MarzipanoSettings {
  mouseViewMode: string;
}

interface MarzipanoData {
  scenes: MarzipanoScene[];
  settings: MarzipanoSettings;
}

interface RoomMapping {
  id: string;
  name: string;
  description: string;
  sceneIds: string[];
  primarySceneId: string;
  category: 'bedroom' | 'bathroom' | 'living' | 'portico';
}

interface Virtual360Room {
  id: string;
  name: string;
  description: string;
  scenes: MarzipanoScene[];
  primaryScene: MarzipanoScene;
  thumbnail?: string;
}

// Export all interfaces
export type {
  MarzipanoLevel,
  MarzipanoViewParameters,
  MarzipanoHotspot,
  MarzipanoInfoHotspot,
  MarzipanoScene,
  MarzipanoSettings,
  MarzipanoData,
  RoomMapping,
  Virtual360Room
};

// Marzipano library types (for window object)
declare global {
  interface Window {
    Marzipano: any;
    screenfull: any;
    bowser: any;
  }
}
