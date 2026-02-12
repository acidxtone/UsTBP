/**
 * Refresh Supabase Schema Cache
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4OTY4MiwiZXhwIjoyMDg2MDY1NjgyfQ.A7wUnqUqzyGTPhS9GOjQvyVwV33zASe53RcSE6u83Ps';

const supabase = createClient(supabaseUrl, supabaseKey);

async function refreshSchema() {
  console.log('🔄 Refreshing Supabase schema cache...');
  
  try {
    // Force refresh by querying table structure
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Error refreshing cache:', error);
    } else {
      console.log('✅ Schema cache refreshed successfully');
      console.log('📊 Sample question structure:', data?.[0]);
    }
  } catch (err) {
    console.error('❌ Cache refresh failed:', err);
  }
}

refreshSchema();
