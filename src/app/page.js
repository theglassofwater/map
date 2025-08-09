'use client';

import { useState, useEffect, useMemo } from 'react';
import dynamic from 'next/dynamic';
import { points as initialPoints } from '../data/points';
import FilterSidebar from '../components/FilterSidebar';
import DatabasePanel from '../components/DatabasePanel';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

export default function Home() {
  const [allPoints, setAllPoints] = useState(initialPoints);
  const [filteredPoints, setFilteredPoints] = useState(initialPoints);
  const [selectedJourneyIds, setSelectedJourneyIds] = useState([]);
  const [journeyIdInput, setJourneyIdInput] = useState('');
  const [accuracy, setAccuracy] = useState(50);
  const [mapStyle, setMapStyle] = useState('minimalist');
  const [showRailLayer, setShowRailLayer] = useState(true);
  const [connectionError, setConnectionError] = useState(null);

  const allJourneyIds = useMemo(() => [...new Set(allPoints.map(p => p.journeyId))].sort((a, b) => a - b), [allPoints]);

  // useEffect(() => {
  //   // When new data is loaded, select all available journeys by default
  //   setSelectedJourneyIds(allJourneyIds);
  // }, [allJourneyIds]);

  useEffect(() => {
    const ids = journeyIdInput
      .split(',')
      .map(id => parseInt(id.trim(), 10))
      .filter(id => !isNaN(id));
    setSelectedJourneyIds(ids);
  }, [journeyIdInput]);

  useEffect(() => {
    let newFilteredPoints = allPoints;

    // Filter by Journey ID
    if (selectedJourneyIds.length > 0) {
      newFilteredPoints = newFilteredPoints.filter(p => selectedJourneyIds.includes(p.journeyId));
    } else {
      newFilteredPoints = []; // If no journeys are selected, show no points
    }

    // Filter by Accuracy
    newFilteredPoints = newFilteredPoints.filter(p => p.accuracy <= accuracy);

    setFilteredPoints(newFilteredPoints);
  }, [selectedJourneyIds, accuracy, allPoints]);

  const handlePointsLoaded = (newPoints) => {
    setAllPoints(newPoints);
  };

  const handleJourneyIdChange = (e) => {
    setJourneyIdInput(e.target.value);
  };

  const handleShowAllJourneys = () => {
    setJourneyIdInput(allJourneyIds.join(', '));
  };

  const handleAccuracyChange = (e) => {
    setAccuracy(parseInt(e.target.value, 10));
  };

  const handleMapStyleChange = (e) => {
    setMapStyle(e.target.value);
  };

  const handleShowRailLayerChange = (e) => {
    setShowRailLayer(e.target.checked);
  };

  return (
    <div>
      <FilterSidebar
        allPoints={allPoints}
        allJourneyIds={allJourneyIds}

        journeyIdInput={journeyIdInput}
        onJourneyIdChange={handleJourneyIdChange}
        handleShowAllJourneys={handleShowAllJourneys}

        accuracy={accuracy}
        onAccuracyChange={handleAccuracyChange}

        mapStyle={mapStyle}
        onMapStyleChange={handleMapStyleChange}

        showRailLayer={showRailLayer}
        onShowRailLayerChange={handleShowRailLayerChange}
      />
      <DatabasePanel onPointsLoaded={handlePointsLoaded} onConnectionError={setConnectionError} />
      {connectionError && <div style={{ position: 'absolute', top: '100px', right: '20px', background: 'red', color: 'white', padding: '10px', borderRadius: '5px', zIndex: 1001 }}>{connectionError}</div>}
      <Map points={filteredPoints} type={mapStyle} showRailLayer={showRailLayer} />
    </div>
  );
}
