import  React, {useState, useEffect }  from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { db, set, push, ref} from '../firebaseConfig';
import DefaultIcon from '../functionalities/DefaultIcon';

function ReportSubmit() {
  
  const [pickedLocation, setPickedLocation] = useState(null);
  const [details, setDetails]= useState("");
  const [crimeType, setcrimeType]= useState("");
  const [id, setId]= useState("");
  const [longitude, setLongitude]= useState("");
  const [latitude, setLatitude]= useState("");

  useEffect(()=>{
      if (pickedLocation!= null){
        setLongitude(pickedLocation.lng)
        setLatitude(pickedLocation.lat)
      }
  }, [pickedLocation])
  
  function LocationPicker({ setPickedLocation }) {
    useMapEvents({
    click(e) {
      setPickedLocation(e.latlng);
    },
  });
  return null;
  }
  
  const updateCrimes = async (e) => {
      e.preventDefault();
      const currentTime= new Date();
      const formattedTime = currentTime.toLocaleString("en-CA", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).replace(", ", "-").replace(":", "-");

      const crimesRef = push(ref(db, 'crimes'));  
      set(crimesRef, {
        crime_type: crimeType,
        id: id,
        latitude: latitude,
        longitude: longitude,
        report_date_time: formattedTime,
        report_details: details,
        report_status: "Pending"
      }).then(()=>{
        alert("Crime Submitted")
      }).catch((error)=>{
        console.error('Error writing data: ', error);
      })
    };

  return (
    <form onSubmit={updateCrimes}>

      <label for="details">Details: </label>
      <input required type="text" id="details" name="details" value={details} onChange={(e)=> setDetails(e.target.value)} />

      <br/>

      <label for="crimeType">Crime Type: </label>
      <select required type="text" id="crimeType" name="crimeType" value={crimeType} onChange={(e)=> setcrimeType(e.target.value)} >
      <option selected disabled value="">--Please choose an option--</option>
        <option value="Assault">Assault</option>
        <option value="Robbery">Robbery</option>
        <option value="Homicide">Homicide</option>
        <option value="Kidnapping">Kidnapping</option>
      </select>

      <br/>

      <label for="ID">National ID: </label>
      <input required type="number" id="ID" name="ID" value={id} onChange={(e)=> setId(e.target.value)} />

      <br/>
      
      <label for="longitude">Location: </label>

      <label for="latitude">Latitude </label>
      <input required type="number" id="latitude" name="latitude" value={latitude} onChange={(e)=> setLatitude(e.target.value)} />

      <label for="longitude">Longitude </label>
      <input required type="number" id="longitude" name="longitude" value={longitude} onChange={(e)=> setLongitude(e.target.value)} />

      <br/>
      <MapContainer center={[23.5880, 58.3829]} zoom={9} style={{height: "40vh", width: "40vw", margin: "4%"}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker setPickedLocation={setPickedLocation} />
              {pickedLocation && <Marker position={pickedLocation} icon={DefaultIcon}/>}      
      </MapContainer>
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReportSubmit;