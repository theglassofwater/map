'use client';

import { useState, useEffect } from 'react';
import { GeoJSON, useMap } from 'react-leaflet';
import axios from 'axios';
import osmtogeojson from 'osmtogeojson';

function RailwayDataLayer() {
  const map = useMap();
  const [railData, setRailData] = useState(null);

  const railStyle = {
    color: '#ff0000', // Bright red for high visibility
    weight: 3,
  };

  const fetchData = async () => {
    const bounds = map.getBounds().toBBoxString(); // e.g., "lng,lat,lng,lat"
    
    // Overpass query to get ways tagged as railways
    const query = `
      [out:json];
      (
        way["railway"="rail"](${bounds});
      );
      out geom;
    `;
    
    try {
      const response = await axios.post('https://overpass-api.de/api/interpreter', `data=${encodeURIComponent(query)}`);
      const geojsonData = osmtogeojson(response.data);
      setRailData(geojsonData);
    } catch (error) {
      console.error("Failed to fetch railway data:", error);
    }
  };

  useEffect(() => {
    fetchData(); // Fetch on initial load
    map.on('moveend', fetchData); // Refetch when map view changes

    return () => {
      map.off('moveend', fetchData); // Cleanup listener
    };
  }, [map]);

  return railData ? <GeoJSON data={railData} style={railStyle} /> : null;
}

export default RailwayDataLayer;
