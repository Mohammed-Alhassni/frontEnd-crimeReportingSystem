import '../styles/Map.css';
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
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedFilter, setSelectedFilter] = useState('all');

  const crimeTypes = ['all', 'Assault', 'Robbery', 'Homicide', 'Kidnapping', 'Theft', 'Vandalism'];

  useEffect(() => {
    const fetchCrimes = async () => {
      try {
        setIsLoading(true);
        const crimesRef = ref(db, 'crimes');  
        const snapshot = await get(crimesRef);
        if (snapshot.exists()) {
          const crimeData = Object.values(snapshot.val());
          setCrimes(crimeData);
          setFilteredCrimes(crimeData);
        } else {
          console.log('No data available');
          setCrimes([]);
          setFilteredCrimes([]);
        }
      } catch (error) {
        console.error('Error reading data: ', error);
        setError('Failed to load crime data. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchCrimes();
  }, []);

  useEffect(() => {
    let filtered = crimes;
    
    // Apply search filter
    if (searchTerm) {
      const lowercasedFilter = searchTerm.toLowerCase();
      filtered = filtered.filter(crime => 
        crime.crime_type.toLowerCase().includes(lowercasedFilter) ||
        crime.report_date_time.includes(lowercasedFilter) ||
        String(crime.id).includes(lowercasedFilter) ||
        crime.report_details.toLowerCase().includes(lowercasedFilter)
      );
    }
    
    // Apply type filter
    if (selectedFilter !== 'all') {
      filtered = filtered.filter(crime => crime.crime_type === selectedFilter);
    }
    
    setFilteredCrimes(filtered);
  }, [searchTerm, crimes, selectedFilter]);

  const getStatusColor = (status) => {
    switch (status?.toLowerCase()) {
      case 'pending': return '🟡';
      case 'investigating': return '🔵';
      case 'resolved': return '🟢';
      default: return '⚪';
    }
  };

  const getCrimeIcon = (crimeType) => {
    switch (crimeType?.toLowerCase()) {
      case 'assault': return '👊';
      case 'robbery': return '💰';
      case 'homicide': return '🔪';
      case 'kidnapping': return '👥';
      case 'theft': return '🔓';
      case 'vandalism': return '🔨';
      default: return '🚨';
    }
  };

  if (error) {
    return (
      <div className="map-page-container">
        <div className="map-error">
          <div className="map-error-icon">⚠️</div>
          <h3 className="map-error-title">Error Loading Map</h3>
          <p className="map-error-message">{error}</p>
          <button 
            className="btn btn-primary" 
            onClick={() => window.location.reload()}
          >
            🔄 Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="map-page-container">
      <div className="search-section">
        <div className="search-header">
          <h2 className="search-title">
            🔍 Search & Filter Crimes
          </h2>
          <p className="search-description">
            Search by crime type, date, ID, or details. Use filters to narrow down results.
          </p>
        </div>
        
        <div className="searchInput">
          <div className="search-input-wrapper">
            <span className="search-icon">🔍</span>
            <input 
              type="text" 
              placeholder="Search by type, date, ID, or details..." 
              value={searchTerm} 
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="map-controls">
          <div className="map-stats">
            <div className="stat-item">
              <span>📊</span>
              <span className="stat-value">{filteredCrimes.length}</span>
              <span>of {crimes.length} crimes</span>
            </div>
            {selectedFilter !== 'all' && (
              <div className="stat-item">
                <span>{getCrimeIcon(selectedFilter)}</span>
                <span className="stat-value">{selectedFilter}</span>
                <span>filter active</span>
              </div>
            )}
          </div>

          <div className="map-filters">
            {crimeTypes.map((type) => (
              <button
                key={type}
                className={`filter-button ${selectedFilter === type ? 'active' : ''}`}
                onClick={() => setSelectedFilter(type)}
              >
                <span>{type === 'all' ? '🌐' : getCrimeIcon(type)}</span>
                <span>{type === 'all' ? 'All' : type}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="map-container">
        {isLoading ? (
          <div className="map-loading">
            <div className="map-loading-spinner"></div>
            <p>Loading crime data...</p>
          </div>
        ) : (
          <MapContainer center={muscat} zoom={9}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {filteredCrimes.map((crime, index) => (
              <Marker 
                key={`${crime.id}-${index}`} 
                position={[crime.latitude, crime.longitude]} 
                icon={DefaultIcon}
              >
                <Popup>
                  <div className="popup-content">
                    <div className="popup-header">
                      <span>{getCrimeIcon(crime.crime_type)}</span>
                      <h4 className="popup-title">{crime.crime_type}</h4>
                    </div>
                    
                    <div className="popup-details">
                      <div className="popup-detail-item">
                        <span className="popup-detail-label">Status:</span>
                        <span className="popup-detail-value">
                          <span className={`popup-status ${crime.report_status?.toLowerCase() || 'pending'}`}>
                            {getStatusColor(crime.report_status)}
                            {crime.report_status || 'Pending'}
                          </span>
                        </span>
                      </div>
                      
                      <div className="popup-detail-item">
                        <span className="popup-detail-label">ID:</span>
                        <span className="popup-detail-value">{crime.id}</span>
                      </div>
                      
                      <div className="popup-detail-item">
                        <span className="popup-detail-label">Date:</span>
                        <span className="popup-detail-value">
                          {formatDateTime(crime.report_date_time)[0]}
                        </span>
                      </div>
                      
                      <div className="popup-detail-item">
                        <span className="popup-detail-label">Time:</span>
                        <span className="popup-detail-value">
                          {formatDateTime(crime.report_date_time)[1]}
                        </span>
                      </div>
                      
                      <div className="popup-detail-item">
                        <span className="popup-detail-label">Details:</span>
                        <span className="popup-detail-value">
                          {crime.report_details}
                        </span>
                      </div>
                    </div>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        )}
      </div>
    </div>
  );
}

export default Map;