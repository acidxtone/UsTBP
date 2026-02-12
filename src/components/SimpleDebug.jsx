/**
 * Simple Debug Component - Quick Test
 */

import React from 'react';

export default function SimpleDebug() {
  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#f5f5f5' }}>
      <h2>🔍 Simple Debug Test</h2>
      <p>If you see this page, the debug route is working!</p>
      <p>Current time: {new Date().toLocaleString()}</p>
      <p>Next step: Test Supabase connection</p>
    </div>
  );
}
