/**
 * Import Questions to Supabase - Simple Version
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';

// Supabase configuration
const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4OTY4MiwiZXhwIjoyMDg2MDY1NjgyfQ.A7wUnqUqzyGTPhS9GOjQvyVwV33zASe53RcSE6u83Ps';

const supabase = createClient(supabaseUrl, supabaseKey);

async function importQuestions() {
  console.log('🚀 Starting import to Supabase...\n');

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

    const allQuestions = [
      ...year1Questions,
      ...year2Questions,
      ...year3Questions,
      ...year4Questions
    ];

    console.log(`📊 Total questions: ${allQuestions.length}`);
    console.log(`   Year 1: ${year1Questions.length}`);
    console.log(`   Year 2: ${year2Questions.length}`);
    console.log(`   Year 3: ${year3Questions.length}`);
    console.log(`   Year 4: ${year4Questions.length}`);

    // Import in smaller batches
    const batchSize = 50;
    for (let i = 0; i < allQuestions.length; i += batchSize) {
      const batch = allQuestions.slice(i, i + batchSize);
      console.log(`📤 Importing batch ${Math.floor(i/batchSize) + 1} (${batch.length} questions)...`);
      
      try {
        const { data, error } = await supabase
          .from('questions')
          .upsert(batch, { onConflict: 'id' });

        if (error) {
          console.error('❌ Batch error:', error.message);
        } else {
          console.log(`✅ Batch imported successfully`);
        }
      } catch (err) {
        console.error('❌ Batch error:', err.message);
      }

      // Wait between batches
      await new Promise(resolve => setTimeout(resolve, 1000));
    }

    // Verify final count
    const { count } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });

    console.log(`\n🎉 Import Complete! Total in database: ${count}`);

  } catch (error) {
    console.error('❌ Import failed:', error.message);
  }
}

importQuestions();
