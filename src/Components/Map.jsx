import React from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";

function MapComponent() {
  const position = [23.588, 58.3829];

  return (
    <MapContainer center={[21.4735, 55.9754]} zoom={18}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={position}>
        <Popup>
          This is a marker at the center of the map!
        </Popup>
      </Marker>
    </MapContainer>
  );
}

export default MapComponent;
