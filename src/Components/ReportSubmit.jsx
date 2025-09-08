import '../styles/ReportSubmit.css';
import  React, {useState, useEffect }  from 'react';
import { MapContainer, TileLayer, useMapEvents, Marker } from 'react-leaflet';
import "leaflet/dist/leaflet.css";
import { db, set, push, ref} from '../firebaseConfig';
import DefaultIcon from '../functionalities/DefaultIcon';
import {useAppContext} from '../functionalities/AppContext';

function ReportSubmit() {
  const {isMobile}= useAppContext();
  const [pickedLocation, setPickedLocation] = useState(null);
  const [details, setDetails]= useState("");
  const [crimeType, setcrimeType]= useState("");
  const [id, setId]= useState("");
  const [longitude, setLongitude]= useState("");
  const [latitude, setLatitude]= useState("");
  const [showMapPopup, setShowMapPopup] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

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
      setIsSubmitting(true);
      setSubmitMessage("");
      
      try {
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
        await set(crimesRef, {
          crime_type: crimeType,
          id: id,
          latitude: latitude,
          longitude: longitude,
          report_date_time: formattedTime,
          report_details: details,
          report_status: "Pending"
        });
        
        setSubmitMessage("Crime report submitted successfully! Thank you for helping keep our community safe.");
        // Reset form
        setDetails("");
        setcrimeType("");
        setId("");
        setLatitude("");
        setLongitude("");
        setPickedLocation(null);
      } catch (error) {
        console.error('Error writing data: ', error);
        setSubmitMessage("Error submitting report. Please try again.");
      } finally {
        setIsSubmitting(false);
      }
    };

  const resetForm = () => {
    setDetails("");
    setcrimeType("");
    setId("");
    setLatitude("");
    setLongitude("");
    setPickedLocation(null);
    setSubmitMessage("");
  };

  return (
    <div className="report-form-container">
      <form onSubmit={updateCrimes}>
        <div className="form-header">
          <h2 className="form-title">🚨 Report a Crime</h2>
          <p className="form-subtitle">Help keep your community safe by reporting incidents</p>
        </div>

        {submitMessage && (
          <div className={`form-message ${submitMessage.includes('Error') ? 'error' : 'success'}`}>
            <span>{submitMessage.includes('Error') ? '⚠️' : '✅'}</span>
            {submitMessage}
          </div>
        )}

        <div className="form-grid">
          <div className="form-group">
            <label className="form-label" htmlFor="crimeType">
              🔍 Crime Type <span className="required-indicator">*</span>
            </label>
            <select 
              required 
              id="crimeType" 
              name="crimeType" 
              value={crimeType} 
              onChange={(e)=> setcrimeType(e.target.value)}
              className="form-select"
            >
              <option value="" disabled>Select crime type</option>
              <option value="Assault">Assault</option>
              <option value="Robbery">Robbery</option>
              <option value="Homicide">Homicide</option>
              <option value="Kidnapping">Kidnapping</option>
              <option value="Theft">Theft</option>
              <option value="Vandalism">Vandalism</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="ID">
              🆔 National ID <span className="required-indicator">*</span>
            </label>
            <input 
              required 
              type="number" 
              id="ID" 
              name="ID" 
              value={id} 
              onChange={(e)=> setId(e.target.value)}
              className="form-input"
              placeholder="Enter your national ID"
            />
          </div>

          <div className="form-group full-width">
            <label className="form-label" htmlFor="details">
              📝 Details <span className="required-indicator">*</span>
            </label>
            <textarea 
              required 
              id="details" 
              name="details" 
              value={details} 
              onChange={(e)=> setDetails(e.target.value)}
              className="form-textarea"
              placeholder="Provide detailed information about the incident..."
              rows="4"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="latitude">
              🌍 Latitude <span className="required-indicator">*</span>
            </label>
            <input 
              required 
              type="number" 
              step="any"
              id="latitude" 
              name="latitude" 
              value={latitude} 
              onChange={(e)=> setLatitude(e.target.value)}
              className="form-input"
              placeholder="e.g., 23.5880"
            />
          </div>

          <div className="form-group">
            <label className="form-label" htmlFor="longitude">
              🌍 Longitude <span className="required-indicator">*</span>
            </label>
            <input 
              required 
              type="number" 
              step="any"
              id="longitude" 
              name="longitude" 
              value={longitude} 
              onChange={(e)=> setLongitude(e.target.value)}
              className="form-input"
              placeholder="e.g., 58.3829"
            />
          </div>

          <div className="map-container">
            <div className="map-header">
              <h3 className="map-title">📍 Select Location</h3>
              <p className="map-description">
                {isMobile ? "Tap the button below to open the map and select the incident location" : "Click on the map to select the incident location"}
              </p>
            </div>

            {isMobile && (
              <button 
                type="button" 
                onClick={() => setShowMapPopup(true)}
                className="btn btn-secondary"
                style={{ alignSelf: 'center' }}
              >
                🗺️ Pick Location on Map
              </button>
            )}

            {!isMobile && (
              <div className="mapContainer">
                <MapContainer center={[23.5880, 58.3829]} zoom={9}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationPicker setPickedLocation={setPickedLocation} />
                  {pickedLocation && <Marker position={pickedLocation} icon={DefaultIcon}/>}      
                </MapContainer>
              </div>
            )}

            {pickedLocation && (
              <div className="form-message success">
                <span>📍</span>
                Location selected: {pickedLocation.lat.toFixed(6)}, {pickedLocation.lng.toFixed(6)}
              </div>
            )}
          </div>
        </div>

        <div className="form-actions">
          <button 
            type="button" 
            onClick={resetForm}
            className="btn-reset"
            disabled={isSubmitting}
          >
            🔄 Reset Form
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="loading-spinner" style={{width: '16px', height: '16px'}}></span>
                Submitting...
              </>
            ) : (
              <>
                📤 Submit Report
              </>
            )}
          </button>
        </div>

        {showMapPopup && (
          <div className="modal">
            <div className="modal-content">
              <div className="modal-header">
                <h3 className="modal-title">📍 Select Incident Location</h3>
                <button 
                  className="close-button" 
                  onClick={() => setShowMapPopup(false)}
                  type="button"
                >
                  ✕
                </button>
              </div>
              <div className="modal-body">
                <MapContainer center={[23.5880, 58.3829]} zoom={9} style={{ height: "60vh", width: "100%" }}>
                  <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  />
                  <LocationPicker setPickedLocation={setPickedLocation} />
                  {pickedLocation && <Marker position={pickedLocation} icon={DefaultIcon} />}
                </MapContainer>
                {pickedLocation && (
                  <div className="form-message success" style={{ marginTop: '1rem' }}>
                    <span>📍</span>
                    Selected: {pickedLocation.lat.toFixed(6)}, {pickedLocation.lng.toFixed(6)}
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}

export default ReportSubmit;