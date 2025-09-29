import type { MarzipanoData, Virtual360Room, RoomMapping } from '../types';

export const MARZIPANO_DATA: MarzipanoData = {
  scenes: [
    {
      id: "0-room-1-bedroom",
      name: "Residency Bedroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: -1.5392359776575244,
        pitch: 0.026235966454196458,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: -1.5486551890064213,
          pitch: 0.6135335244580826,
          rotation: 0,
          target: "1-room-1---bathroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "1-room-1---bathroom",
      name: "Residency Bathroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3016.5,
      initialViewParameters: {
        yaw: -2.869700919883778,
        pitch: -0.004949604224481874,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: -2.8986571755653507,
          pitch: 0.5845540007276817,
          rotation: 0,
          target: "0-room-1-bedroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "2-room-2-living",
      name: "Plantation Living Area",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: 0.7641265394046606,
        pitch: 0.05467399488328972,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: 0.7387433117489923,
          pitch: 0.6421812170605374,
          rotation: 0,
          target: "3-room-2-bedroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "3-room-2-bedroom",
      name: "Plantation Bedroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: -1.4136199112167596,
        pitch: 0,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: -1.4259735016117752,
          pitch: 0.5891046756333473,
          rotation: 0,
          target: "4-room-2-bathroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "4-room-2-bathroom",
      name: "Plantation Bathroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: -0.47004867739178735,
        pitch: 0.13802102045064402,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: -0.5612651261503974,
          pitch: 0.7266838008263878,
          rotation: 0,
          target: "3-room-2-bedroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "5-room-3-living",
      name: "Magistrate Living Area",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: 0.31281670439590137,
        pitch: -0.056219516032234296,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: 0.2390505141555721,
          pitch: 0.5280412165959643,
          rotation: 0,
          target: "6-room3---bedroom"
        },
        {
          yaw: -0.5,
          pitch: 0.5,
          rotation: 0,
          target: "8-room-4-portico"
        }
      ],
      infoHotspots: []
    },
    {
      id: "6-room3---bedroom",
      name: "Magistrate Bedroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: 1.1891947343367768,
        pitch: 0.1143138538361459,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: 1.1577797596721986,
          pitch: 0.7062677915793003,
          rotation: 0,
          target: "7-room-3---bathrrom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "7-room-3---bathrrom",
      name: "Magistrate Bathroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: 0.025508658298381448,
        pitch: 0.018739976038713024,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: -0.005471359070496007,
          pitch: 0.5827452226978309,
          rotation: 0,
          target: "6-room3---bedroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "8-room-4-portico",
      name: "Magistrate's Portico",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: -1.9121238674590053,
        pitch: 0.03697998158660987,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: -1.9212419429747705,
          pitch: 0.6260778726647498,
          rotation: 0,
          target: "5-room-3-living"
        }
      ],
      infoHotspots: []
    },
    {
      id: "9-room-4---living",
      name: "Collector's Living Area",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: 0.7786853585820825,
        pitch: 0.0599679233238799,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: 0.7763701665704392,
          pitch: 0.6476279555713873,
          rotation: 0,
          target: "10-room-4--bedroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "10-room-4--bedroom",
      name: "Collector's Bedroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: 0.23360560757463134,
        pitch: 0.05434593051226777,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: 0.22437437198505528,
          pitch: 0.6435223599125788,
          rotation: 0,
          target: "11-room-4-bathroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "11-room-4-bathroom",
      name: "Collector's Bathroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: 0.3395035412458771,
        pitch: 0.03747995207742605,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: 0.3349440720920125,
          pitch: 0.6282064796326985,
          rotation: 0,
          target: "10-room-4--bedroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "12-room-5-bedroom",
      name: "Royal Bedroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: -0.029651637017771293,
        pitch: -0.048427905295564955,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: 0.051643582628351226,
          pitch: 0.4953547636274962,
          rotation: 0,
          target: "13-room-5-bathroom"
        }
      ],
      infoHotspots: []
    },
    {
      id: "13-room-5-bathroom",
      name: "Royal Bathroom",
      levels: [
        { tileSize: 256, size: 256, fallbackOnly: true },
        { tileSize: 512, size: 512 },
        { tileSize: 512, size: 1024 },
        { tileSize: 512, size: 2048 },
        { tileSize: 512, size: 4096 }
      ],
      faceSize: 3012,
      initialViewParameters: {
        yaw: 0.20004289327208546,
        pitch: 0.04497594249291126,
        fov: 1.3474042771833745
      },
      linkHotspots: [
        {
          yaw: 0.20004353131530728,
          pitch: 0.6326373626918667,
          rotation: 0,
          target: "12-room-5-bedroom"
        }
      ],
      infoHotspots: []
    }
  ],
  settings: {
    mouseViewMode: "drag"
  }
};

// Room mappings for the heritage accommodation
export const ROOM_MAPPINGS: RoomMapping[] = [
  {
    id: "room-1-residency",
    name: "The Residency Room",
    description: "A comfortable bedroom with attached bathroom, perfect for a peaceful stay.",
    sceneIds: ["0-room-1-bedroom", "1-room-1---bathroom"],
    primarySceneId: "0-room-1-bedroom",
    category: "bedroom"
  },
  {
    id: "room-2-plantation",
    name: "The Plantation",
    description: "Spacious living area with bedroom and bathroom, ideal for extended stays.",
    sceneIds: ["2-room-2-living", "3-room-2-bedroom", "4-room-2-bathroom"],
    primarySceneId: "2-room-2-living",
    category: "living"
  },
  {
    id: "room-3-magistrate",
    name: "The Magistrate's Chamber",
    description: "Elegant living space with portico, bedroom and bathroom, featuring traditional decor.",
    sceneIds: ["8-room-4-portico", "5-room-3-living", "6-room3---bedroom", "7-room-3---bathrrom"],
    primarySceneId: "8-room-4-portico",
    category: "portico"
  },
  {
    id: "room-4-collectors",
    name: "The Collector's",
    description: "Premium suite with living area, bedroom and bathroom.",
    sceneIds: ["9-room-4---living", "10-room-4--bedroom", "11-room-4-bathroom"],
    primarySceneId: "9-room-4---living",
    category: "living"
  },
  {
    id: "room-5-royal",
    name: "The Royal",
    description: "Luxurious royal suite with bedroom and bathroom, the finest accommodation.",
    sceneIds: ["12-room-5-bedroom", "13-room-5-bathroom"],
    primarySceneId: "12-room-5-bedroom",
    category: "bedroom"
  }
];

// Helper function to get virtual 360 rooms
export const getVirtual360Rooms = (): Virtual360Room[] => {
  return ROOM_MAPPINGS.map(mapping => {
    const scenes = MARZIPANO_DATA.scenes.filter(scene => 
      mapping.sceneIds.includes(scene.id)
    );
    const primaryScene = scenes.find(scene => scene.id === mapping.primarySceneId)!;
    
    return {
      id: mapping.id,
      name: mapping.name,
      description: mapping.description,
      scenes,
      primaryScene,
      thumbnail: `/images/360/tiles/${mapping.primarySceneId}/preview.jpg`
    };
  });
};

// Helper function to get scene by ID
export const getSceneById = (sceneId: string) => {
  return MARZIPANO_DATA.scenes.find(scene => scene.id === sceneId);
};

// Helper function to get room by ID
export const getRoomById = (roomId: string) => {
  return getVirtual360Rooms().find(room => room.id === roomId);
};