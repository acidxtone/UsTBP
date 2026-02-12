/**
 * Create New Questions Table
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4OTY4MiwiZXhwIjoyMDg2MDY1NjgyfQ.A7wUnqUqzyGTPhS9GOjQvyVwV33zASe53RcSE6u83Ps';

const supabase = createClient(supabaseUrl, supabaseKey);

async function createNewTable() {
  console.log('🆕 Creating new questions table...');
  
  try {
    // Create new table with different name
    const { data, error } = await supabase
      .from('questions_new')
      .insert({
        id: 'test-1',
        year: 1,
        section: 1,
        section_name: 'Test Section',
        difficulty: 'easy',
        question_text: 'Test question?',
        option_a: 'Option A',
        option_b: 'Option B',
        option_c: 'Option C',
        option_d: 'Option D',
        correct_answer: 'A',
        explanation: 'Test explanation',
        reference: 'Test reference'
      })
      .select();
    
    if (error) {
      console.error('❌ Error creating new table:', error);
    } else {
      console.log('✅ New table created successfully');
      console.log('📊 Test record:', data);
    }

  } catch (err) {
    console.error('❌ Process failed:', err);
  }
}

createNewTable();
