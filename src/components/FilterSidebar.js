'use client';

import React from 'react';

const FilterSidebar = ({
  allPoints,
  allJourneyIds,
  journeyIdInput,
  onJourneyIdChange,
  handleShowAllJourneys,
  accuracy,
  onAccuracyChange,
  mapStyle,
  onMapStyleChange,
  showRailLayer,
  onShowRailLayerChange,
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: '100px',
      left: '20px',
      width: '300px',
      maxHeight: 'calc(100vh - 120px)',
      overflowY: 'auto',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <h2 style={{ margin: 0, color: '#333' }}>Filters</h2>

      <div>
        <h3 style={{ marginBottom: '10px' }}>Map Controls</h3>
        <select value={mapStyle} onChange={onMapStyleChange} style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', marginBottom: '10px' }}>
          <option value="standard">Standard</option>
          <option value="minimalist">Minimalist</option>
          <option>None</option>
        </select>
        
        <label>
          <input
            type="checkbox"
            checked={showRailLayer}
            onChange={onShowRailLayerChange}
          />
          {' Show Railway Lines'}
        </label>
      </div>

    <div>
        <h3 style={{ marginBottom: '10px' }}>Journey IDs</h3>
        <input
          type="text"
          // The value is now controlled by the new state
          value={journeyIdInput}
          onChange={onJourneyIdChange}
          placeholder="e.g. 1, 2, 5"
          style={{ width: '100%', padding: '8px', borderRadius: '4px', border: '1px solid #ccc', boxSizing: 'border-box' }}
        />
        {/* NEW: The "Show All" button */}
        <button onClick={handleShowAllJourneys} style={{
          width: '100%',
          marginTop: '10px',
          padding: '8px',
          background: '#007bff',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer'
        }}>
          Show All Journeys
        </button>
      </div> 

      <div>
        <h3 style={{ marginBottom: '10px' }}>Accuracy</h3>
        <label>
          {`Better than: ${accuracy}m`}
          <input
            type="range"
            min="0"
            max="50"
            value={accuracy}
            onChange={onAccuracyChange}
            style={{ width: '100%' }}
          />
        </label>
      </div>

      <div>
        <h3 style={{ marginBottom: '10px' }}>Statistics</h3>
        <p style={{ margin: 0 }}>Total Points: {allPoints.length}</p>
        <p style={{ margin: 0 }}>Total Journeys with GPS: {allJourneyIds.length}</p>
      </div>

    </div>
  );
};

export default FilterSidebar;
