/**
 * Import Real Exam Questions from Steamfitter-Pipefitter info folder
 * Import all exam questions from periods 1-4 to Supabase
 */

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

// Use the working API configuration
const supabaseUrl = 'https://nwixrvtevpfjhfidlmno.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53aXhydnRldnBmamhmaWRsbW5vIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzA0ODk2ODIsImV4cCI6MjA4NjA2NTY4Mn0.8z6aH_nZBjC8gTfJ2XJhXQzQkL3fX1Y2Z3W4E5F6G7H8I9J0K1L2M3N4O5P6Q7R8S9T0U1V2W3X4Y5Z6';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Read JSON file from Steamfitter-Pipefitter info folder
function readExamFile(filePath) {
  try {
    const fullPath = path.join('C:\\Users\\rmaiv\\Documents\\Steamfitter-Pipefitter info', filePath);
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error);
    return null;
  }
}

// Format exam question for Supabase
function formatExamQuestion(question, year, questionNumber) {
  return {
    id: `y${year}_q${questionNumber}`,
    year: year,
    section: question.section || 1,
    section_name: question.section_name || `Section ${question.section || 1}`,
    difficulty: question.difficulty || 'medium',
    question_text: question.question || question.question_text,
    option_a: question.options?.A || question.option_a,
    option_b: question.options?.B || question.option_b,
    option_c: question.options?.C || question.option_c,
    option_d: question.options?.D || question.option_d,
    correct_answer: question.correct_answer || question.answer,
    explanation: question.explanation,
    reference: question.reference || null
  };
}

// Main import function
async function importExamQuestions() {
  console.log('🚀 Starting import of REAL EXAM questions...');
  
  // Test connection first
  console.log('🔍 Testing Supabase connection...');
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .limit(1);
    
    if (error) {
      console.error('❌ Connection test failed:', error);
      return;
    }
    console.log('✅ Connection successful!');
  } catch (err) {
    console.error('❌ Connection test exception:', err);
    return;
  }
  
  const allQuestions = [];
  
  // Import exam questions from all periods
  const examFiles = [
    { file: 'period-1-exam-questions.json', year: 1 },
    { file: 'period-2-exam-questions.json', year: 2 },
    { file: 'period-3-exam-questions.json', year: 3 },
    { file: 'period-4-exam-questions.json', year: 4 }
  ];
  
  for (const { file, year } of examFiles) {
    console.log(`📁 Reading ${file} (Year ${year})...`);
    const examData = readExamFile(file);
    
    if (!examData) {
      console.log(`❌ Failed to read ${file}`);
      continue;
    }
    
    let questions = [];
    
    // Handle different JSON structures
    if (examData.questions) {
      questions = examData.questions;
    } else if (examData.exam_questions) {
      questions = examData.exam_questions;
    } else if (Array.isArray(examData)) {
      questions = examData;
    } else {
      // Try to find questions in the object
      const questionKeys = Object.keys(examData).filter(key => 
        key.includes('question') || key.includes('q') || Array.isArray(examData[key])
      );
      
      for (const key of questionKeys) {
        if (Array.isArray(examData[key])) {
          questions.push(...examData[key]);
        }
      }
    }
    
    console.log(`📊 Found ${questions.length} questions in ${file}`);
    
    const formattedQuestions = questions
      .filter((q, index) => {
        const hasValidOptions = (q.options && q.options.A && q.options.B && q.options.C && q.options.D) ||
                               (q.option_a && q.option_b && q.option_c && q.option_d);
        const hasQuestion = q.question || q.question_text;
        const hasAnswer = q.correct_answer || q.answer;
        
        if (!hasValidOptions || !hasQuestion || !hasAnswer) {
          console.log(`⚠️ Skipping question ${index + 1}: missing required fields`);
          return false;
        }
        return true;
      })
      .map((q, index) => formatExamQuestion(q, year, index + 1));
    
    allQuestions.push(...formattedQuestions);
    console.log(`✅ ${file}: ${formattedQuestions.length} valid questions`);
  }
  
  console.log(`📊 Total questions to import: ${allQuestions.length}`);
  
  if (allQuestions.length === 0) {
    console.log('❌ No valid questions found to import');
    return;
  }
  
  // Import one by one to avoid batch issues
  let importedCount = 0;
  let errorCount = 0;
  
  for (let i = 0; i < allQuestions.length; i++) {
    const question = allQuestions[i];
    
    if (i % 10 === 0) {
      console.log(`📦 Progress: ${i}/${allQuestions.length} (${Math.round(i/allQuestions.length*100)}%)`);
    }
    
    try {
      const { data, error } = await supabase
        .from('questions')
        .upsert(question, { 
          onConflict: 'id',
          ignoreDuplicates: false 
        });
      
      if (error) {
        console.error(`❌ Error importing ${question.id}:`, error.message);
        errorCount++;
      } else {
        importedCount++;
      }
    } catch (err) {
      console.error(`❌ Exception importing ${question.id}:`, err.message);
      errorCount++;
    }
    
    // Small delay
    if (i % 5 === 0) {
      await new Promise(resolve => setTimeout(resolve, 100));
    }
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
importExamQuestions().catch(console.error);
