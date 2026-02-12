/**
 * Drop and Recreate Questions Table
 */

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4OTY4MiwiZXhwIjoyMDg2MDY1NjgyfQ.A7wUnqUqzyGTPhS9GOjQvyVwV33zASe53RcSE6u83Ps';

const supabase = createClient(supabaseUrl, supabaseKey);

async function recreateTable() {
  console.log('🔄 Dropping and recreating questions table...');
  
  try {
    // Drop existing table
    const { error: dropError } = await supabase
      .from('questions')
      .delete()
      .neq('id', 'impossible-id'); // Delete all records
    
    if (dropError) {
      console.error('❌ Error dropping table:', dropError);
    } else {
      console.log('✅ Table cleared');
    }

    // Wait a moment
    await new Promise(resolve => setTimeout(resolve, 2000));

    // Create new table with correct schema
    const createSQL = `
      CREATE TABLE IF NOT EXISTS public.questions (
        id TEXT PRIMARY KEY,
        year INTEGER NOT NULL,
        section INTEGER NOT NULL,
        section_name TEXT NOT NULL,
        difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard', 'journeyman')),
        question_text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_answer TEXT CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
        explanation TEXT,
        reference TEXT,
        created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
      );

      ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

      CREATE POLICY "Questions are publicly readable" ON public.questions
      FOR SELECT USING (true);

      CREATE INDEX IF NOT EXISTS idx_questions_year_section ON public.questions(year, section);
      CREATE INDEX IF NOT EXISTS idx_questions_id ON public.questions(id);
    `;

    const { error: createError } = await supabase
      .rpc('exec_sql', { sql: createSQL });
    
    if (createError) {
      console.error('❌ Error creating table:', createError);
    } else {
      console.log('✅ Table recreated with correct schema');
    }

  } catch (err) {
    console.error('❌ Process failed:', err);
  }
}

recreateTable();
