'use client';

import React from 'react';

const FilterSidebar = ({
  journeyIds,
  selectedJourneyIds,
  onJourneyIdChange,
  accuracy,
  onAccuracyChange,
}) => {
  return (
    <div style={{
      position: 'absolute',
      top: '100px',
      left: '20px',
      width: '300px',
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
        <h3 style={{ marginBottom: '10px' }}>Journey IDs</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
          {journeyIds.map(id => (
            <label key={id}>
              <input
                type="checkbox"
                value={id}
                checked={selectedJourneyIds.includes(id)}
                onChange={onJourneyIdChange}
              />
              {` Journey ${id}`}
            </label>
          ))}
        </div>
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
    </div>
  );
};

export default FilterSidebar;
