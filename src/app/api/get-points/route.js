import { Pool } from 'pg';
import { NextResponse } from 'next/server';

export async function POST(request) {
  const { host, port, user, password, database } = await request.json();

  if (!host || !port || !user || !database) {
    return NextResponse.json({ error: 'Missing required database connection details.' }, { status: 400 });
  }

  const pool = new Pool({
    host,
    port,
    user,
    password,
    database,
    ssl: {
      rejectUnauthorized: false, // Required for some cloud providers, adjust as needed
    },
    connectionTimeoutMillis: 5000, // 5 seconds to connect
  });

  try {
    const client = await pool.connect();
    // The user specified the table name as "Gps point". Using double quotes
    // preserves capitalization and spaces, which is crucial.
    const result = await client.query('select * from public.gps_points');
    client.release();
    await pool.end();
    
    // Assuming the table columns are named: gpspointid, journeyid, latitude, longitude, accuracy
    // The frontend expects: id, journeyId, lat, lng, accuracy
    // This new mapping is more explicit and robust.
    const points = result.rows.map(dbPoint => ({
      id: dbPoint.gps_point_id,
      journeyId: dbPoint.journey_id,
      lat: dbPoint.latitude,
      lng: dbPoint.longitude,
      timestamp: dbPoint.timestamp,
      accuracy: dbPoint.accuracy,
    }));

    return NextResponse.json({ points });

  } catch (error) {
    console.error('Database connection or query failed:', error);
    await pool.end();
    return NextResponse.json({ error: 'Failed to connect to the database or fetch data.', details: error.message }, { status: 500 });
  }
}
