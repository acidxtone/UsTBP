/**
 * Import Questions Using Environment Variables
 * Same approach as the working app
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Read from .env file like the working app
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read .env file manually
const envPath = path.join(__dirname, '.env');
const envContent = fs.readFileSync(envPath, 'utf8');
const envLines = envContent.split('\n');

const supabaseUrl = envLines.find(line => line.startsWith('VITE_SUPABASE_URL='))?.split('=')[1] || '';
const supabaseAnonKey = envLines.find(line => line.startsWith('VITE_SUPABASE_ANON_KEY='))?.split('=')[1] || '';

console.log('🔍 Using Supabase URL:', supabaseUrl);
console.log('🔍 API Key length:', supabaseAnonKey.length);

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read JSON file
function readJsonFile(filePath) {
  try {
    const fullPath = path.join(__dirname, 'data', filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Format question for Supabase
function formatQuestion(question) {
  return {
    id: question.id,
    year: question.year,
    section: question.section,
    section_name: question.section_name || `Section ${question.section}`,
    difficulty: question.difficulty || 'medium',
    question_text: question.question_text || question.question,
    option_a: question.option_a,
    option_b: question.option_b,
    option_c: question.option_c,
    option_d: question.option_d,
    correct_answer: question.correct_answer,
    explanation: question.explanation,
    reference: question.reference || null
  };
}

// Main import function
async function importAllQuestions() {
  console.log('🚀 Starting import of ALL questions...');
  
  // Test connection first
  console.log('🔍 Testing Supabase connection...');
  const { data: testData, error: testError } = await supabase
    .from('questions')
    .select('count', { count: 'exact', head: true });
  
  if (testError) {
    console.error('❌ Connection test failed:', testError);
    return;
  }
  console.log('✅ Connection successful! Current count:', testData);
  
  const allQuestions = [];
  
  // Import questions from all files
  const questionFiles = [
    'year1-questions.json',
    'questions-y2.json', 
    'questions-y3.json',
    'questions-y4.json'
  ];
  
  for (const file of questionFiles) {
    console.log(`📁 Reading ${file}...`);
    const questions = readJsonFile(file);
    
    const formattedQuestions = questions
      .filter(q => q.id && q.year && q.option_a && q.option_b && q.option_c && q.option_d)
      .map(formatQuestion);
    
    allQuestions.push(...formattedQuestions);
    console.log(`✅ ${file}: ${formattedQuestions.length} questions`);
  }
  
  console.log(`📊 Total questions to import: ${allQuestions.length}`);
  
  // Import in smaller batches
  const batchSize = 20;
  let importedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < allQuestions.length; i += batchSize) {
    const batch = allQuestions.slice(i, i + batchSize);
    console.log(`📦 Importing batch ${Math.floor(i/batchSize) + 1}/${Math.ceil(allQuestions.length/batchSize)} (${batch.length} questions)...`);
    
    try {
      const { data, error } = await supabase
        .from('questions')
        .upsert(batch, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error(`❌ Batch error:`, error);
        errorCount++;
      } else {
        console.log(`✅ Batch imported successfully`);
        importedCount += batch.length;
      }
    } catch (err) {
      console.error(`❌ Batch exception:`, err);
      errorCount++;
    }
    
    // Delay between batches
    await new Promise(resolve => setTimeout(resolve, 1000));
  }
  
  console.log(`🎉 Import Complete!`);
  console.log(`📊 Successfully imported: ${importedCount} questions`);
  console.log(`❌ Errors: ${errorCount} batches`);
  
  // Verify final count
  const { count, error: countError } = await supabase
    .from('questions')
    .select('*', { count: 'exact', head: true });
  
  if (!countError) {
    console.log(`🔍 Total questions in database: ${count}`);
  }
}

// Run the import
importAllQuestions().catch(console.error);
