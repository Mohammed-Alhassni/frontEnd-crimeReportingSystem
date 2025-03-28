import  React, {useState }  from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import L from 'leaflet';
import "leaflet/dist/leaflet.css";
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

function ReportSubmit() {
  const [pickedLocation, setPickedLocation] = useState(null);

  let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
  });
  
  const customIcon = new L.Icon({
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  });
  
  L.Marker.prototype.options.icon = DefaultIcon;
  
  function LocationPicker({ setPickedLocation }) {
    useMapEvents({
    click(e) {
      setPickedLocation(e.latlng);
    },
  });
  return null;
  }
  
  function write(formData) {
  const Details = formData.get("details");
  alert(Details);
  }

  return (
    <form action={write}>
      <label for="details">Details: </label>
      <input id="details" name="details" />
      <br/>
      <label for="crimeType">Crime Type: </label>
      <select id="crimeType" name="crimeType">
      <option selected disabled value="">--Please choose an option--</option>
        <option value="Assault">Assault</option>
        <option value="Robbery">Robbery</option>
        <option value="Homicide">Homicide</option>
        <option value="Kidnapping">Kidnapping</option>
      </select>
      <br/>
      <label for="ID">National ID: </label>
      <input id="ID" name="ID" />
      <br/>
      <label for="longitude">Location: </label>
      <label for="longitude">Longitude </label>
      <input id="longitude" name="longitude" />
      <label for="latitude">Latitude </label>
      <input id="latitude" name="latitude" />
      <br/>
      <MapContainer center={[23.5880, 58.3829]} zoom={9} style={{height: "40vh", width: "40vw", margin: "4%"}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <LocationPicker setPickedLocation={setPickedLocation} />
              {pickedLocation && <Marker position={pickedLocation} icon={customIcon} />}      
      </MapContainer>
      {pickedLocation && <p>Picked Location: {pickedLocation.lat}, {pickedLocation.lng}</p>}
      <button type="submit">Submit</button>
    </form>
  );
}

export default ReportSubmit;