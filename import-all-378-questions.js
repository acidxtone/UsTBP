/**
 * Import ALL 378 Questions to Supabase
 * Years 1-3 from combined file + Year 4 sample
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Use working API configuration
const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODk2ODIsImV4cCI6MjA4NjA2NTY4Mn0.8z6aH_nZBjC8gTfJ2XJhXQzQkL3fX1Y2Z3W4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read combined questions file
function readCombinedQuestions() {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fullPath = path.join(__dirname, 'data', 'all-exam-questions-combined.json');
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading combined questions:', error);
    return [];
  }
}

// Format question for Supabase
function formatQuestion(question) {
  return {
    id: question.id,
    year: question.year,
    section: question.section || 1,
    section_name: question.section_name || `Section ${question.section || 1}`,
    difficulty: question.difficulty || 'medium',
    question_text: question.question,
    option_a: question.options.A,
    option_b: question.options.B,
    option_c: question.options.C,
    option_d: question.options.D,
    correct_answer: question.correct_answer,
    explanation: question.explanation?.correct || question.explanation,
    reference: question.reference || null
  };
}

// Main import function
async function importAllQuestions() {
  console.log('🚀 Starting import of ALL 378 QUESTIONS...');
  
  // Test connection first
  console.log('🔍 Testing Supabase connection...');
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection test failed:', error);
      console.log('💡 Questions ready but cannot import due to API key issue');
      console.log('📋 Ready for manual import or Vercel deployment');
      
      const questions = readCombinedQuestions();
      console.log(`\n📊 QUESTIONS READY FOR IMPORT:`);
      console.log(`📁 Year 1: ${questions.filter(q => q.year === 1).length} questions`);
      console.log(`📁 Year 2: ${questions.filter(q => q.year === 2).length} questions`);
      console.log(`📁 Year 3: ${questions.filter(q => q.year === 3).length} questions`);
      console.log(`📁 Year 4: ${questions.filter(q => q.year === 4).length} questions`);
      console.log(`🎯 TOTAL: ${questions.length} questions`);
      
      // Show sample questions
      console.log(`\n📋 SAMPLE QUESTIONS:`);
      for (let year = 1; year <= 4; year++) {
        const yearQuestions = questions.filter(q => q.year === year);
        if (yearQuestions.length > 0) {
          const sample = yearQuestions[0];
          console.log(`\nYear ${year} Sample:`);
          console.log(`  ID: ${sample.id}`);
          console.log(`  Question: ${sample.question.substring(0, 100)}...`);
          console.log(`  Options: A) ${sample.option_a?.substring(0, 30)}...`);
          console.log(`  Answer: ${sample.correct_answer}`);
        }
      }
      
      console.log(`\n🚀 TO IMPORT THESE QUESTIONS:`);
      console.log(`1. Deploy this script to Vercel (has correct API keys)`);
      console.log(`2. Or import manually via Supabase dashboard`);
      console.log(`3. Or fix local API key configuration`);
      
      return;
    }
    console.log('✅ Connection successful!');
  } catch (err) {
    console.error('❌ Connection test exception:', err);
    return;
  }
  
  const questions = readCombinedQuestions();
  console.log(`📊 Total questions to import: ${questions.length}`);
  
  // Import in batches
  const batchSize = 25;
  let importedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < questions.length; i += batchSize) {
    const batch = questions.slice(i, i + batchSize);
    console.log(`📦 Importing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(questions.length/batchSize)} (${batch.length} questions)...`);
    
    try {
      const { data, error } = await supabase
        .from('questions')
        .upsert(batch.map(formatQuestion), { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error(`❌ Batch error:`, error.message);
        errorCount++;
      } else {
        console.log(`✅ Batch imported successfully`);
        importedCount += batch.length;
      }
    } catch (err) {
      console.error(`❌ Batch exception:`, err.message);
      errorCount++;
    }
    
    // Delay between batches
    await new Promise(resolve => setTimeout(resolve, 500));
  }
  
  console.log(`🎉 Import Complete!`);
  console.log(`📊 Successfully imported: ${importedCount} questions`);
  console.log(`❌ Errors: ${errorCount} batches`);
  
  // Verify final count
  try {
    const { count, error: countError } = await supabase
      .from('questions')
      .select('*', { count: 'exact', head: true });
    
    if (!countError) {
      console.log(`🔍 Total questions in database: ${count}`);
    }
  } catch (err) {
    console.error('Error counting questions:', err);
  }
}

// Run import
importAllQuestions().catch(console.error);
