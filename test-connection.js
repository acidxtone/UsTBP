/**
 * Test different Supabase connection methods
 */

import { createClient } from '@supabase/supabase-js';

// Try different API keys
const attempts = [
  {
    name: 'Current Anon Key',
    url: 'https://nwixrvtevpfjhfidlmno.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODk2ODIsImV4cCI6MjA4NjA2NTY4Mn0.8z6aH_nZBjC8gTfJ2XJhXQzQkL3fX1Y2Z3W4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6'
  },
  {
    name: 'Try with different key format',
    url: 'https://nwixrvtevpfjhfidlmno.supabase.co',
    key: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmaWRsbW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODk2ODIsImV4cCI6MjA4NjA2NTY4Mn0.8z6aH_nZBjC8gTfJ2XJhXQzQkL3fX1Y2Z3W4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6'
  }
];

async function testConnections() {
  console.log('🔍 Testing different Supabase connections...');
  
  for (const attempt of attempts) {
    console.log(`\n📡 Testing: ${attempt.name}`);
    console.log(`URL: ${attempt.url}`);
    console.log(`Key: ${attempt.key.substring(0, 50)}...`);
    
    const supabase = createClient(attempt.url, attempt.key);
    
    try {
      const { data, error } = await supabase
        .from('questions')
        .select('count', { count: 'exact', head: true });
      
      if (error) {
        console.error(`❌ Failed:`, error.message);
      } else {
        console.log(`✅ Success! Current count: ${data}`);
        console.log(`🎉 This connection works!`);
        
        // Try to get actual questions
        const { data: questions, error: qError } = await supabase
          .from('questions')
          .select('*')
          .limit(3);
        
        if (!qError && questions.length > 0) {
          console.log(`📊 Sample question:`, questions[0].id);
        }
      }
    } catch (err) {
      console.error(`❌ Exception:`, err.message);
    }
  }
}

testConnections().catch(console.error);
