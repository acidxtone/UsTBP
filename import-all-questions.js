/**
 * Import ALL Questions from JSON files to Supabase
 * This will import all 400+ questions across all 4 years
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Supabase configuration
const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODk2ODIsImV4cCI6MjA4NjA2NTY4Mn0.8z6aH_nZBjC8gTfJ2XJhXQzQkL3fX1Y2Z3W4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6';

const supabase = createClient(supabaseUrl, supabaseKey);

// Function to read JSON file
function readJsonFile(filePath) {
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const fullPath = path.join(__dirname, 'data', filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return [];
  }
}

// Function to format question for Supabase
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
  
  const allQuestions = [];
  let totalQuestions = 0;
  
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
    
    // Filter and format questions
    const formattedQuestions = questions
      .filter(q => q.id && q.year && q.option_a && q.option_b && q.option_c && q.option_d)
      .map(formatQuestion);
    
    allQuestions.push(...formattedQuestions);
    totalQuestions += formattedQuestions.length;
    
    console.log(`✅ ${file}: ${formattedQuestions.length} questions`);
  }
  
  console.log(`📊 Total questions to import: ${totalQuestions}`);
  
  // Import in batches to avoid timeouts
  const batchSize = 50;
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
        console.error(`❌ Batch import error:`, error);
        errorCount++;
      } else {
        console.log(`✅ Batch imported successfully`);
        importedCount += batch.length;
      }
    } catch (err) {
      console.error(`❌ Batch import exception:`, err);
      errorCount++;
    }
    
    // Small delay between batches
    await new Promise(resolve => setTimeout(resolve, 100));
  }
  
  console.log(`🎉 Import Complete!`);
  console.log(`📊 Successfully imported: ${importedCount} questions`);
  console.log(`❌ Errors: ${errorCount} questions`);
  
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

// Run the import
importAllQuestions().catch(console.error);
