/**
 * Robust Import Script - Handles Large Files
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3MDQ4OTY4MiwiZXhwIjoyMDg2MDY1NjgyfQ.A7wUnqUqzyGTPhS9GOjQvyVwV33zASe53RcSE6u83Ps';

const supabase = createClient(supabaseUrl, supabaseKey);

async function readLargeJSONFile(filename) {
  try {
    console.log(`📖 Reading ${filename}...`);
    const fileContent = fs.readFileSync(`./data/${filename}`, 'utf8');
    
    // Check if content is valid JSON
    const parsed = JSON.parse(fileContent);
    console.log(`✅ ${filename}: ${parsed.length} questions`);
    return parsed;
  } catch (error) {
    console.error(`❌ Error reading ${filename}:`, error.message);
    return [];
  }
}

async function importQuestions() {
  console.log('🚀 Robust Import Starting...\n');

  try {
    // Read all files with better error handling
    const year1Questions = await readLargeJSONFile('year1-questions.json');
    const year2Questions = await readLargeJSONFile('questions-y2.json');
    const year3Questions = await readLargeJSONFile('questions-y3.json');
    const year4Questions = await readLargeJSONFile('questions-y4.json');

    const allQuestions = [
      ...year1Questions,
      ...year2Questions,
      ...year3Questions,
      ...year4Questions
    ];

    console.log(`\n📊 Total Questions Found: ${allQuestions.length}`);
    console.log(`   Year 1: ${year1Questions.length}`);
    console.log(`   Year 2: ${year2Questions.length}`);
    console.log(`   Year 3: ${year3Questions.length}`);
    console.log(`   Year 4: ${year4Questions.length}`);

    if (allQuestions.length === 0) {
      console.error('❌ No questions found! Check file paths and JSON format.');
      return;
    }

    // Import in very small batches to avoid issues
    const batchSize = 25;
    const batches = [];
    
    for (let i = 0; i < allQuestions.length; i += batchSize) {
      batches.push(allQuestions.slice(i, i + batchSize));
    }

    console.log(`\n📦 Importing in ${batches.length} batches of ${batchSize} questions each...`);

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
          
          // Try one by one for failed batches
          for (let j = 0; j < batch.length; j++) {
            const question = batch[j];
            try {
              const { data: singleData, error: singleError } = await supabase
                .from('questions')
                .insert(question)
                .select();
              
              if (singleError) {
                console.error(`❌ Question ${question.id} failed:`, singleError.message);
              } else {
                totalInserted++;
                if (totalInserted % 10 === 0) {
                  console.log(`✅ Progress: ${totalInserted}/${allQuestions.length} questions`);
                }
              }
            } catch (singleErr) {
              console.error(`❌ Question ${question.id} exception:`, singleErr.message);
            }
          }
        } else {
          console.log(`✅ Batch ${i + 1} success`);
          totalInserted += data?.length || batch.length;
        }
      } catch (batchError) {
        console.error(`❌ Batch ${i + 1} exception:`, batchError.message);
      }

      // Longer delay between batches
      await new Promise(resolve => setTimeout(resolve, 2000));
    }

    console.log(`\n🎉 Import Complete!`);
    console.log(`✅ Total questions inserted: ${totalInserted}/${allQuestions.length}`);
    
    // Final verification
    try {
      const { count } = await supabase
        .from('questions')
        .select('*', { count: 'exact', head: true });

      console.log(`📊 Final count in database: ${count} questions`);
      
      if (count === allQuestions.length) {
        console.log('🎯 Perfect! All questions imported successfully!');
      } else {
        console.log(`⚠️  Expected ${allQuestions.length}, got ${count} - some questions may have failed`);
      }
    } catch (verifyError) {
      console.error('❌ Verification error:', verifyError.message);
    }

  } catch (error) {
    console.error('❌ Import failed:', error.message);
  }
}

importQuestions();
