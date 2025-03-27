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
              <p><em>{crime.report_details}</em></p>
              <p><b>Type: </b>{crime.crime_type}</p>
              <p><b>Status: </b>{crime.report_status}</p>
              <p><b>Reported at: </b>{crime.report_date_time}</p>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
  );
}

export default MapComponent;
