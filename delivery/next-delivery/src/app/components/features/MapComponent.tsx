'use client'; // Ensure this is a client component

import { useEffect, useState } from 'react';
import axios from 'axios';
import L from 'leaflet';
import 'leaflet-routing-machine';
import 'leaflet/dist/leaflet.css'; // Import Leaflet CSS
import './MapComponent.css';

// Fixing Leaflet's default marker icons
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const MapComponent: React.FC = () => {
  const [map, setMap] = useState<L.Map | null>(null); // State to store the map instance
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null); // State for the user's location (`point_a`)
  const [destination, setDestination] = useState<string>(''); // State for the destination address
  const [destinationCoords, setDestinationCoords] = useState<[number, number] | null>(null); // Destination coordinates (`point_b`)
  const [distance, setDistance] = useState<number | null>(null); // State to store the distance
  const [routeInstructions, setRouteInstructions] = useState<string[]>([]); // State to store the route instructions

  useEffect(() => {
    const mapContainer = document.getElementById('map');
    if (!mapContainer) {
      console.error('Map container is missing!');
      return;
    }

    // Initialize the map
    const mapInstance = L.map(mapContainer, { zoomControl: false }).fitWorld();
    setMap(mapInstance);

    // Add tile layer
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 19,
    }).addTo(mapInstance);

    // Get user's current location (point_a)
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const location = [latitude, longitude] as [number, number];

          // Set user's location state as `point_a`
          setUserLocation(location);

          // Set the map view to the user's location
          mapInstance.setView(location, 13);

          // Add a marker for the user's current location
          L.marker(location).addTo(mapInstance)
            .bindPopup('Vous êtes ici')
            .openPopup();
        },
        (error) => {
          console.error('Error getting location:', error);
        },
        {
          enableHighAccuracy: true, // Ensure high-accuracy location
          timeout: 30000, // Maximum time to wait for a position (10 seconds)
          maximumAge: 0, // Don't use a cached location
        }
      );
    } else {
      console.error('La géolocalisation n\'est pas supportée par ce navigateur.');
    }

    // Clean up map on component unmount
    return () => {
      mapInstance.remove();
    };
  }, []);

  // Function to handle input change for the destination
  const handleDestinationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDestination(e.target.value);
  };

  // Function to get coordinates from the destination using OpenCage Geocoding API, limited to Morocco
  const getCoordinatesFromDestination = async () => {
    try {
      const response = await axios.get(`https://api.opencagedata.com/geocode/v1/json?q=${destination}&key=e217c26be4b3488ab369a8d80eefd9af&countrycode=MA`);
      const { lat, lng } = response.data.results[0].geometry;
      return [lat, lng] as [number, number];
    } catch (error) {
      console.error('Erreur lors de la récupération des données géocodées :', error);
      return null;
    }
  };

  // Function to update destination based on user input and plot the route
  const handleDestinationSubmit = async () => {
    if (map && userLocation && destination) {
      const coords = await getCoordinatesFromDestination(); // Get geocoded coordinates

      if (!coords) {
        alert("Impossible de trouver la destination. Veuillez réessayer.");
        return;
      }

      setDestinationCoords(coords);

      // Add marker for the selected destination (`point_b`)
      L.marker(coords).addTo(map)
        .bindPopup('Destination')
        .openPopup();

      // Use the Leaflet Routing Machine to create a route between `point_a` (user location) and `point_b` (destination)
      const control = L.Routing.control({
        waypoints: [
          L.latLng(userLocation), // Start point (User location / `point_a`)
          L.latLng(coords), // End point (Destination coordinates / `point_b`)
        ],
        routeWhileDragging: true, // Allow dragging the route
        createMarker: () => null, // Remove default routing markers
        lineOptions: {
          styles: [{ color: '#3388ff', weight: 4 }], // Set the route line style
        },
        addWaypoints: false, // Disable additional waypoints
        show: false, // Hide the default routing instructions inside the map
        draggableWaypoints: false, // Prevent dragging waypoints
        fitSelectedRoutes: true, // Automatically fit the route to the map
      }).addTo(map);

      // Add an event listener to get the distance and instructions once the route is calculated
      control.on('routesfound', (e) => {
        const routes = e.routes;
        const route = routes[0];
        const distanceInMeters = route.summary.totalDistance;
        const distanceInKilometers = distanceInMeters / 1000;

        // Set the distance state in kilometers
        setDistance(distanceInKilometers);

        // Extract detailed route instructions (including text and distance)
        const instructions = route.instructions.map((instr: any) => `${instr.text} - ${instr.distance.toFixed(1)} mètres`);
        setRouteInstructions(instructions);
      });

      // ** Explicitly hide default popups with route instructions **
      const routeContainer = document.querySelector('.leaflet-routing-container');
      if (routeContainer) {
        routeContainer.style.display = 'none'; // Hide the leaflet routing instruction container
      }
    }
  };

  return (
    <div className="map-container">
      <h1 className="heading">Service de livraison</h1>
      <div className="input-container">
        <input
          type="text"
          className="location-input"
          placeholder="Entrez la destination"
          value={destination}
          onChange={handleDestinationChange}
        />
        <button className="submit-button" onClick={handleDestinationSubmit}>Définir la destination</button>
      </div>
      
      <div className="map-and-info">
        <div id="map" className="map"></div> {/* Map container */}

        <div className="route-info">
          <h2>Informations sur l'itinéraire</h2>
          {routeInstructions.length > 0 ? (
            <ul>
              {routeInstructions.map((instruction, index) => (
                <li key={index}>{instruction}</li>
              ))}
            </ul>
          ) : (
            <p>Aucune information disponible</p>
          )}
        </div>
      </div>

      {distance && (
        <div className="distance-container">
          <p>Distance : {distance.toFixed(2)} km</p> {/* Display the distance */}
        </div>
      )}
    </div>
  );
};

export default MapComponent;
