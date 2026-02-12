/**
 * Check What's in Supabase Tables
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4OTY4MiwiZXhwIjoyMDg2MDY1NjgyfQ.A7wUnqUqzyGTPhS9GOjQvyVwV33zASe53RcSE6u83Ps';

const supabase = createClient(supabaseUrl, supabaseKey);

async function checkTables() {
  console.log('🔍 Checking Supabase tables...');
  
  try {
    // Check questions table
    const { data: questionsData, error: questionsError } = await supabase
      .from('questions')
      .select('count', { count: 'exact', head: true });
    
    if (questionsError) {
      console.error('❌ Questions table error:', questionsError);
    } else {
      console.log(`📊 Questions table: ${questionsData} questions`);
    }

    // Check quiz_sessions table
    const { data: sessionsData, error: sessionsError } = await supabase
      .from('quiz_sessions')
      .select('count', { count: 'exact', head: true });
    
    if (sessionsError) {
      console.error('❌ Sessions table error:', sessionsError);
    } else {
      console.log(`📊 Quiz sessions table: ${sessionsData} sessions`);
    }

    // Check study_guides table
    const { data: guidesData, error: guidesError } = await supabase
      .from('study_guides')
      .select('count', { count: 'exact', head: true });
    
    if (guidesError) {
      console.error('❌ Study guides table error:', guidesError);
    } else {
      console.log(`📊 Study guides table: ${guidesData} guides`);
    }

  } catch (err) {
    console.error('❌ Check failed:', err);
  }
}

checkTables();
