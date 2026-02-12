/**
 * Connection Test Component - Test Supabase Connection
 */

import React, { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabase';

export default function ConnectionTest() {
  const [connectionStatus, setConnectionStatus] = useState('Testing...');
  const [error, setError] = useState(null);

  useEffect(() => {
    testConnection();
  }, []);

  async function testConnection() {
    try {
      console.log('🔍 Testing Supabase connection...');
      
      // Test basic connection
      const { data, error } = await supabase
        .from('questions')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.error('❌ Supabase connection error:', error);
        setError(error.message);
        setConnectionStatus('Connection Failed');
      } else {
        console.log('✅ Supabase connection successful:', data);
        setConnectionStatus('Connected');
      }
    } catch (err) {
      console.error('❌ Connection test error:', err);
      setError(err.message);
      setConnectionStatus('Connection Failed');
    }
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#f5f5f5' }}>
      <h2>🔌 Supabase Connection Test</h2>
      
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <h3>📊 Connection Status</h3>
        <p><strong>Status:</strong> {connectionStatus}</p>
        {error && <p><strong>Error:</strong> {error}</p>}
      </div>

      <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <h3>🔍 Debug Info</h3>
        <p>Check browser console (F12) for detailed logs</p>
        <p>Supabase URL: https://nwixrvtevpfjhfidlmno.supabase.co</p>
      </div>

      <button 
        onClick={testConnection}
        style={{ padding: '10px 20px', fontSize: '16px', cursor: 'pointer' }}
      >
        🔄 Test Again
      </button>
    </div>
  );
}
