'use client';

import { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { points } from '../data/points';
import FilterSidebar from '../components/FilterSidebar';

const Map = dynamic(() => import('../components/Map'), {
  ssr: false,
});

const allJourneyIds = [...new Set(points.map(p => p.journeyId))];

export default function Home() {
  const [filteredPoints, setFilteredPoints] = useState(points);
  const [selectedJourneyIds, setSelectedJourneyIds] = useState(allJourneyIds);
  const [accuracy, setAccuracy] = useState(50);

  useEffect(() => {
    let newFilteredPoints = points;

    // Filter by Journey ID
    if (selectedJourneyIds.length > 0) {
      newFilteredPoints = newFilteredPoints.filter(p => selectedJourneyIds.includes(p.journeyId));
    }

    // Filter by Accuracy
    newFilteredPoints = newFilteredPoints.filter(p => p.accuracy <= accuracy);

    setFilteredPoints(newFilteredPoints);
  }, [selectedJourneyIds, accuracy]);

  const handleJourneyIdChange = (e) => {
    const journeyId = parseInt(e.target.value, 10);
    setSelectedJourneyIds(prev =>
      prev.includes(journeyId)
        ? prev.filter(id => id !== journeyId)
        : [...prev, journeyId]
    );
  };

  const handleAccuracyChange = (e) => {
    setAccuracy(parseInt(e.target.value, 10));
  };

  return (
    <div>
      <FilterSidebar
        journeyIds={allJourneyIds}
        selectedJourneyIds={selectedJourneyIds}
        onJourneyIdChange={handleJourneyIdChange}
        accuracy={accuracy}
        onAccuracyChange={handleAccuracyChange}
      />
      <Map points={filteredPoints} />
    </div>
  );
}
