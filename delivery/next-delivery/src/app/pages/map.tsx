import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import MapComponent without SSR (important for Leaflet)
const MapComponent = dynamic(() => import('../components/features/MapComponent'), { ssr: false });

const MapPage: React.FC = () => {
  return (
    <div>
      <h1>Interactive Map</h1>
      <MapComponent /> {/* Your Leaflet map will render here */}
    </div>
  );
};

export default MapPage;
