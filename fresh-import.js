/**
 * Fresh Import with New Client Instance
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

// Create fresh client with cache busting
const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4OTY4MiwiZXhwIjoyMDg2MDY1NjgyfQ.A7wUnqUqzyGTPhS9GOjQvyVwV33zASe53RcSE6u83Ps';

// Add cache busting parameter
const supabase = createClient(supabaseUrl, supabaseKey, {
  db: {
    schema: 'public'
  },
  auth: {
    persistSession: false
  }
});

async function freshImport() {
  console.log('🆕 Fresh import attempt...');
  
  try {
    // Read files
    const year1Data = fs.readFileSync('./data/year1-questions.json', 'utf8');
    const year2Data = fs.readFileSync('./data/questions-y2.json', 'utf8');
    const year3Data = fs.readFileSync('./data/questions-y3.json', 'utf8');
    const year4Data = fs.readFileSync('./data/questions-y4.json', 'utf8');

    const year1Questions = JSON.parse(year1Data);
    const year2Questions = JSON.parse(year2Data);
    const year3Questions = JSON.parse(year3Data);
    const year4Questions = JSON.parse(year4Data);

    console.log(`📊 Questions ready: Y1=${year1Questions.length}, Y2=${year2Questions.length}, Y3=${year3Questions.length}, Y4=${year4Questions.length}`);

    // Test with just one question first
    const testQuestion = year1Questions[0];
    console.log('🧪 Testing with question:', testQuestion.id);
    
    const { data, error } = await supabase
      .from('questions')
      .insert(testQuestion)
      .select();
    
    if (error) {
      console.error('❌ Insert test failed:', error);
      console.log('🔍 Error details:', JSON.stringify(error, null, 2));
    } else {
      console.log('✅ Test insert successful!');
      console.log('📊 Inserted data:', data);
    }

  } catch (err) {
    console.error('❌ Fresh import failed:', err);
  }
}

freshImport();
