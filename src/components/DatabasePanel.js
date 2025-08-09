'use client';

import React, { useState } from 'react';

const DatabasePanel = ({ onPointsLoaded, onConnectionError }) => {
  const [isMinimized, setIsMinimized] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dbConfig, setDbConfig] = useState({
    host: process.env.NEXT_PUBLIC_HOST || 'localhost',
    port: process.env.NEXT_PUBLIC_PORT || '5432',
    user: process.env.NEXT_PUBLIC_USER || '',
    password: process.env.NEXT_PUBLIC_PASSWORD || '',
    database: process.env.NEXT_PUBLIC_DATABASE || '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDbConfig(prev => ({ ...prev, [name]: value }));
  };

  const handleConnect = async () => {
    setIsLoading(true);
    onConnectionError(null); // Clear previous errors

    try {
      const response = await fetch('/api/get-points', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(dbConfig),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.details || data.error || 'Failed to connect.');
      }

      onPointsLoaded(data.points);
      // alert(`Successfully loaded ${data.points.length} points from the database!`);

    } catch (error) {
      console.error('Connection failed:', error);
      onConnectionError(error.message);
      alert(`Connection failed: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const toggleMinimize = () => {
    setIsMinimized(!isMinimized);
  };

  return (
    <div style={{
      position: 'absolute',
      top: '20px',
      right: '20px',
      width: '300px',
      background: 'white',
      padding: '20px',
      borderRadius: '8px',
      boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
      zIndex: 1000,
      fontFamily: 'sans-serif',
      display: 'flex',
      flexDirection: 'column',
      gap: '15px',
      transition: 'height 0.3s ease'
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h2 style={{ margin: 0, color: '#333' }}>Database Connection</h2>
        <button onClick={toggleMinimize} style={{
          background: 'none',
          border: 'none',
          fontSize: '24px',
          cursor: 'pointer',
          padding: '0 5px'
        }}>
          {isMinimized ? '+' : '−'}
        </button>
      </div>
      
      {!isMinimized && (
        <>
          <input type="text" name="host" value={dbConfig.host} onChange={handleChange} placeholder="Host" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" name="port" value={dbConfig.port} onChange={handleChange} placeholder="Port" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" name="user" value={dbConfig.user} onChange={handleChange} placeholder="Username" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="password" name="password" value={dbConfig.password} onChange={handleChange} placeholder="Password" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />
          <input type="text" name="database" value={dbConfig.database} onChange={handleChange} placeholder="Database Name" style={{ padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }} />

          <button onClick={handleConnect} disabled={isLoading} style={{
            padding: '10px 20px',
            borderRadius: '4px',
            border: 'none',
            background: isLoading ? '#ccc' : '#28a745',
            color: 'white',
            fontSize: '16px',
            cursor: isLoading ? 'not-allowed' : 'pointer',
            transition: 'background 0.3s ease'
          }}>
            {isLoading ? 'Connecting...' : 'Connect'}
          </button>
        </>
      )}
    </div>
  );
};

export default DatabasePanel;
