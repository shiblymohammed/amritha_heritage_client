// src/data/panoData.ts

// This tells TypeScript that a global variable APP_DATA might exist.
// We will create it in our component before the viewer needs it.
declare global {
  interface Window {
    APP_DATA: any;
  }
}

export const panoData = {
  "settings": {
    "mouseViewMode": "drag",
    "autorotateEnabled": true,
    "fullscreenButton": true
  },
  "scenes": [
    {
      "id": "0-president-deluxe",
      "name": "Royal's Chamber — Bedroom",
      "levels": [/* Add level data from Marzipano tool */],
      "faceSize": 1642,
      "initialViewParameters": { "pitch": 0, "yaw": 0, "fov": 1.57 },
      "linkHotspots": [],
      "infoHotspots": []
    },
    {
      "id": "1-magistrate-executive",
      "name": "The Magistrate's Chamber — Living Area",
      "levels": [/* Add level data from Marzipano tool */],
      "faceSize": 1642,
      "initialViewParameters": { "pitch": 0, "yaw": 0, "fov": 1.57 },
      "linkHotspots": [],
      "infoHotspots": []
    },
    {
      "id": "2-collector-deluxe",
      "name": "The Collector's Chamber — Bedroom",
      "levels": [/* Add level data from Marzipano tool */],
      "faceSize": 1642,
      "initialViewParameters": { "pitch": 0, "yaw": 0, "fov": 1.57 },
      "linkHotspots": [],
      "infoHotspots": []
    },
    // ... Add scenes for your other rooms
  ]
};