/**
 * Clean Import - Filter out wrong_explanations field
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4OTY4MiwiZXhwIjoyMDg2MDY1NjgyfQ.A7wUnqUqzyGTPhS9GOjQvyVwV33zASe53RcSE6u83Ps';

const supabase = createClient(supabaseUrl, supabaseKey);

async function cleanImport() {
  console.log('🧹 Starting clean import...');
  
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

    // Filter out questions with wrong_explanations field
    const cleanQuestions = [
      ...year1Questions.filter(q => !q.wrong_explanations),
      ...year2Questions.filter(q => !q.wrong_explanations),
      ...year3Questions.filter(q => !q.wrong_explanations),
      ...year4Questions.filter(q => !q.wrong_explanations)
    ];

    console.log(`📊 Clean questions: ${cleanQuestions.length} (filtered from ${year1Questions.length + year2Questions.length + year3Questions.length + year4Questions.length})`);
    console.log(`   Year 1: ${year1Questions.filter(q => !q.wrong_explanations).length}/${year1Questions.length}`);
    console.log(`   Year 2: ${year2Questions.filter(q => !q.wrong_explanations).length}/${year2Questions.length}`);
    console.log(`   Year 3: ${year3Questions.filter(q => !q.wrong_explanations).length}/${year3Questions.length}`);
    console.log(`   Year 4: ${year4Questions.filter(q => !q.wrong_explanations).length}/${year4Questions.length}`);

    // Import in smaller batches
    const batchSize = 20;
    const batches = [];
    
    for (let i = 0; i < cleanQuestions.length; i += batchSize) {
      batches.push(cleanQuestions.slice(i, i + batchSize));
    }

    console.log(`📦 Importing in ${batches.length} batches of ${batchSize} questions each...`);

    let totalInserted = 0;
    for (let i = 0; i < batches.length; i++) {
      const batch = batches[i];
      console.log(`📤 Batch ${i + 1}/${batches.length} (${batch.length} questions)...`);
      
      try {
        const { data, error } = await supabase
          .from('questions')
          .upsert(batch, { onConflict: 'id' })
          .select();

        if (error) {
          console.error(`❌ Batch ${i + 1} error:`, error.message);
        } else {
          console.log(`✅ Batch ${i + 1} success`);
          totalInserted += data?.length || batch.length;
        }
      } catch (batchError) {
        console.error(`❌ Batch ${i + 1} exception:`, batchError.message);
      }

      // Wait between batches
      await new Promise(resolve => setTimeout(resolve, 1500));
    }

    console.log(`\n🎉 Clean Import Complete!`);
    console.log(`✅ Total questions inserted: ${totalInserted}/${cleanQuestions.length}`);
    
    // Verify final count
    try {
      const { count } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true });

      console.log(`📊 Final count in database: ${count} questions`);
      
      if (count === cleanQuestions.length) {
        console.log('🎯 Perfect! All clean questions imported successfully!');
      } else {
        console.log(`⚠️  Expected ${cleanQuestions.length}, got ${count}`);
      }
    } catch (verifyError) {
      console.error('❌ Verification error:', verifyError);
    }

  } catch (err) {
    console.error('❌ Clean import failed:', err);
  }
}

cleanImport();
