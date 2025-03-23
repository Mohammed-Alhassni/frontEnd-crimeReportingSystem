import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';

// Define your locations (latitude, longitude)
const locations = [
  { id: 1, lat: 51.505, lng: -0.09, name: 'Location 1' },
  { id: 2, lat: 51.515, lng: -0.1, name: 'Location 2' },
  { id: 3, lat: 51.525, lng: -0.11, name: 'Location 3' }
];

function MapComponent() {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={13} style={{ width: '100%', height: '100%' }}>
      {/* TileLayer to show the map background */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      
      {/* Map Markers */}
      {locations.map(location => (
        <Marker key={location.id} position={[location.lat, location.lng]}>
          <Popup>{location.name}</Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}

export default MapComponent;
