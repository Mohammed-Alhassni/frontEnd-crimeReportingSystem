import '../styles/map.css';
import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { db, ref, get } from '../firebaseConfig';
import DefaultIcon from '../functionalities/DefaultIcon';
import { formatDateTime } from '../functionalities/formatDateTime';


function Map() {
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


  return (
    <div>
      <div className='searchInput'>
        <input 
          type="text" 
          placeholder="Search by type, date, or ID" 
          value={searchTerm} 
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <MapContainer center={muscat} zoom={9}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {filteredCrimes.map((crime) => (
          <Marker key={crime.id} position={[crime.latitude, crime.longitude]} icon={DefaultIcon}>
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