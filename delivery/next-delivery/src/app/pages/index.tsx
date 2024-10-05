// src/pages/index.tsx
import dynamic from 'next/dynamic';
import React from 'react';

// Dynamically import MapComponent without SSR
const MapComponent = dynamic(() => import('../components/features/MapComponent'), { ssr: false });

const Home: React.FC = () => {
  return (
    <div>
      <h1>Welcome to the Leaflet Map Page</h1>
      <MapComponent /> {/* Render the map component */}
    </div>
  );
};

export default Home;
