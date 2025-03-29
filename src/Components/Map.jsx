import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { db, ref, get } from '../firebaseConfig';

function Map() {
  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor:  [0, -40],
  });

  L.Marker.prototype.options.icon = DefaultIcon;

  const muscat = [23.5880, 58.3829];
  const [crimes, setCrimes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredCrimes, setFilteredCrimes] = useState([]);

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        const crimesRef = ref(db, 'crimes');  
        const snapshot = await get(crimesRef);
        if (snapshot.exists()) {
          const crimeData = Object.values(snapshot.val());
          setCrimes(crimeData);
          setFilteredCrimes(crimeData);
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error reading data: ', error);
      }
    };
    
    fetchCrimes();
  }, []);

  useEffect(() => {
    const lowercasedFilter = searchTerm.toLowerCase();
    setFilteredCrimes(
      crimes.filter(crime => 
        crime.crime_type.toLowerCase().includes(lowercasedFilter) ||
        crime.report_date_time.includes(lowercasedFilter) ||
        String(crime.id).includes(lowercasedFilter)
      )
    );
  }, [searchTerm, crimes]);

  function formatDateTime(dateTimeString) {
    if (!dateTimeString) return "Invalid date";

    const [year, month, day, hour, minute] = dateTimeString.split("-").map(Number);
    const date = new Date(year, month - 1, day, hour, minute);
    const formattedDate = date.toLocaleDateString("en-GB"); 
    const formattedTime = date.toLocaleTimeString("en-GB", { 
      hour12: true, 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit'
    });

    return [formattedDate, formattedTime];
  }

  return (
    <div>
      <input 
        type="text" 
        placeholder="Search by type, date, or ID" 
        value={searchTerm} 
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{ width: "98%", padding: "8px", marginBottom: "10px" }}
      />
      <MapContainer center={muscat} zoom={9}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredCrimes.map((crime) => (
          <Marker key={crime.id} position={[crime.latitude, crime.longitude]}>
            <Popup>
              <p><b>Details: </b><em>{crime.report_details}</em></p>
              <p><b>Type: </b>{crime.crime_type}</p>
              <p><b>Status: </b>{crime.report_status}</p>
              <p><b>Reported at:</b> <br/><em>Date: </em>{formatDateTime(crime.report_date_time)[0]}
              <br/><em>Time: </em>{formatDateTime(crime.report_date_time)[1]}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

export default Map;