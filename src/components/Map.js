'use client';

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

const LONDON_CENTER = [51.505, -0.09];

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = ({ points, type, showRailLayer }) => {
  return (
    <MapContainer center={LONDON_CENTER} zoom={12} style={{ height: '100vh', width: '100%' }}>
      {type === 'standard' ? (
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        /> 
      ) : type === 'minimalist' ? (
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        />
      ) : (
        null
      )}
      {showRailLayer && (
        <TileLayer
          attribution='&copy; <a href="https://www.openrailwaymap.org/">OpenRailwayMap</a>'
          url="https://{s}.tiles.openrailwaymap.org/standard/{z}/{x}/{y}.png"
        />
      )}
      {/* <RailwayDataLayer /> */}
      {points.map(point => (
        <Marker key={point.id} position={[point.lat, point.lng]}>
          <Tooltip>
            Journey ID: {point.journeyId}<br />
            GPS Point ID: {point.id}<br />
            Time: {point.timestamp}
          </Tooltip>
          <Popup>
            Journey ID: {point.journeyId}<br />
            GPS Point ID: {point.id}
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
};

export default Map;