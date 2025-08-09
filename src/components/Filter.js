'use client';

const Filter = ({ journeyId, setJourneyId, handleFilter }) => {
  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleFilter();
    }
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      left: '50%',
      transform: 'translateX(-50%)',
      zIndex: 1000,
      background: 'white',
      padding: '15px 25px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
      fontFamily: 'sans-serif'
    }}>
      <h3 style={{ margin: 0, color: '#333' }}>Filter by Journey ID</h3>
      <input
        type="text"
        value={journeyId}
        onChange={(e) => setJourneyId(e.target.value)}
        onKeyPress={handleKeyPress}
        placeholder="e.g., 1, 2, or 3"
        style={{
          padding: '10px',
          borderRadius: '4px',
          border: '1px solid #ccc',
          fontSize: '16px'
        }}
      />
      <button onClick={handleFilter} style={{
        padding: '10px 20px',
        borderRadius: '4px',
        border: 'none',
        background: '#0070f3',
        color: 'white',
        fontSize: '16px',
        cursor: 'pointer',
        transition: 'background 0.3s ease'
      }}>
        Filter
      </button>
    </div>
  );
};

export default Filter;
