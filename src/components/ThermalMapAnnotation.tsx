import { Flame, Snowflake } from "lucide-react";

interface HotSpot {
  id: string;
  x: number; // percentage from left (0-100)
  y: number; // percentage from top (0-100)
  temperature: number;
  label?: string;
}

interface ColdSpot {
  id: string;
  x: number;
  y: number;
  temperature: number;
  label?: string;
}

interface ThermalMapAnnotationProps {
  hotSpots?: HotSpot[];
  coldSpots?: ColdSpot[];
  showLabels?: boolean;
}

const ThermalMapAnnotation = ({ 
  hotSpots = [], 
  coldSpots = [],
  showLabels = true 
}: ThermalMapAnnotationProps) => {
  // Default hot spots (high temperature zones)
  const defaultHotSpots: HotSpot[] = hotSpots.length > 0 ? hotSpots : [
    { id: "hot1", x: 25, y: 30, temperature: 32.4, label: "Hot Zone" },
    { id: "hot2", x: 75, y: 20, temperature: 31.8, label: "Heat Stress" },
  ];

  // Default cold spots (low temperature zones)
  const defaultColdSpots: ColdSpot[] = coldSpots.length > 0 ? coldSpots : [
    { id: "cold1", x: 15, y: 70, temperature: 26.1, label: "Cool Zone" },
    { id: "cold2", x: 85, y: 80, temperature: 27.2, label: "Optimal" },
  ];

  return (
    <>
      {/* Hot Spot Annotations */}
      {defaultHotSpots.map((spot) => (
        <div
          key={spot.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
          }}
        >
          {/* Hot Spot Marker */}
          <div className="relative">
            <Flame className="h-6 w-6 text-red-500 drop-shadow-lg animate-pulse" />
            {/* Temperature Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-red-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {spot.temperature.toFixed(1)}°C
            </div>
            {/* Label */}
            {showLabels && spot.label && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-red-500/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {spot.label}
              </div>
            )}
          </div>
          {/* Ripple Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-8 w-8 border-2 border-red-500 rounded-full animate-ping opacity-75"></div>
          </div>
        </div>
      ))}

      {/* Cold Spot Annotations */}
      {defaultColdSpots.map((spot) => (
        <div
          key={spot.id}
          className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
          style={{
            left: `${spot.x}%`,
            top: `${spot.y}%`,
          }}
        >
          {/* Cold Spot Marker */}
          <div className="relative">
            <Snowflake className="h-6 w-6 text-blue-400 drop-shadow-lg" />
            {/* Temperature Tooltip */}
            <div className="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white text-xs px-2 py-1 rounded whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
              {spot.temperature.toFixed(1)}°C
            </div>
            {/* Label */}
            {showLabels && spot.label && (
              <div className="absolute top-8 left-1/2 transform -translate-x-1/2 bg-blue-500/90 text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                {spot.label}
              </div>
            )}
          </div>
          {/* Subtle Glow Effect */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-6 w-6 border border-blue-400 rounded-full opacity-50"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default ThermalMapAnnotation;

