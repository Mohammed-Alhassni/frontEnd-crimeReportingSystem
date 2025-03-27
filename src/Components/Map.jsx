import  React, { useEffect, useState }  from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { db, ref, get } from '../firebaseConfig';

function MapComponent() {
  const muscat= [23.5880, 58.3829]
  const [crimes, setCrimes] = useState([]);

  useEffect(() => {

    const fetchCrimes = async () => {
      try {
        const crimesRef = ref(db, 'crimes');  
        const snapshot = await get(crimesRef);
        if (snapshot.exists()) {
          setCrimes(Object.values(snapshot.val())); 
        } else {
          console.log('No data available');
        }
      } catch (error) {
        console.error('Error reading data: ', error);
      }
    };
    
    fetchCrimes();

  }, []);
    
  return (
      <MapContainer center={muscat} zoom={13}>
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {crimes.map((crime)=>(
          <Marker key={crime.id} position={[crime.latitude, crime.longitude]}>
            <Popup>
              <h3>type: {crime.crime_type}</h3>
              <h5>status: {crime.report_status}</h5>
              <p>details: {crime.report_details}</p>
              <p>Reported at: {crime.report_date_time}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
  );
}

export default MapComponent;
