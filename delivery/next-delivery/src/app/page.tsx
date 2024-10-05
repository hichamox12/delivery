import dynamic from 'next/dynamic';
import Layout from './components/layout/Navbar/layout';  // Correct import path

const MapComponent = dynamic(() => import('./components/features/MapComponent'), { ssr: false });

const Home = () => {
  return (
    <Layout>
      <div className="bg-blue-500 text-white p-4">
        <h1>Interactive Map</h1>
        <MapComponent /> {/* Render the map component */}
      </div>
    </Layout>
  );
};

export default Home;
