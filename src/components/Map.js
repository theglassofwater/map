'use client';

import { MapContainer, TileLayer, Marker, Popup, Tooltip } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default icon issue with webpack
delete L.Icon.Default.prototype._getIconUrl;

L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const Map = ({ points }) => {
  return (
    <MapContainer center={[51.505, -0.09]} zoom={12} style={{ height: '100vh', width: '100%' }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      {points.map(point => (
        <Marker key={point.id} position={[point.lat, point.lng]}>
          <Tooltip>
            Journey ID: {point.journeyId}<br />
            GPS Point ID: {point.id}
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