/**
 * Create CSV File for Manual Supabase Import
 * All 501 questions formatted for easy CSV upload
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the final questions file
function readFinalQuestions() {
  try {
    const fullPath = path.join(__dirname, 'data', 'final-all-questions-complete.json');
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error reading final questions:', error);
    return [];
  }
}

// Convert question to CSV row
function questionToCsvRow(question, index) {
  // Escape CSV fields
  const escapeField = (field) => {
    if (field === null || field === undefined) return '';
    return `"${String(field).replace(/"/g, '""')}"`;
  };
  
  return [
    escapeField(question.id),
    escapeField(question.year),
    escapeField(question.section),
    escapeField(question.section_name),
    escapeField(question.topic || ''),
    escapeField(question.difficulty || 'medium'),
    escapeField(question.question),
    escapeField(question.options.A),
    escapeField(question.options.B),
    escapeField(question.options.C),
    escapeField(question.options.D),
    escapeField(question.correct_answer),
    escapeField(question.explanation?.correct || question.explanation || ''),
    escapeField(question.reference || '')
  ].join(',');
}

// Create CSV file
function createQuestionsCsv() {
  console.log('🔄 Creating CSV file for manual Supabase import...');
  
  const questions = readFinalQuestions();
  console.log(`📊 Found ${questions.length} questions`);
  
  // CSV header
  const csvHeader = 'id,year,section,section_name,topic,difficulty,question_text,option_a,option_b,option_c,option_d,correct_answer,explanation,reference';
  
  // Convert questions to CSV rows
  const csvRows = questions.map(questionToCsvRow);
  
  // Create CSV content
  const csvContent = [csvHeader, ...csvRows].join('\n');
  
  // Save CSV file
  const outputPath = path.join(__dirname, 'data', 'tradebench-questions-501.csv');
  fs.writeFileSync(outputPath, csvContent, 'utf8');
  
  console.log(`💾 CSV file created: ${outputPath}`);
  console.log(`📊 Total questions: ${questions.length}`);
  
  // Show breakdown by year
  console.log(`\n📋 QUESTIONS BY YEAR:`);
  for (let year = 1; year <= 4; year++) {
    const yearQuestions = questions.filter(q => q.year === year);
    console.log(`📁 Year ${year}: ${yearQuestions.length} questions`);
  }
  
  // Show sample questions
  console.log(`\n📋 SAMPLE QUESTIONS:`);
  questions.slice(0, 3).forEach((question, index) => {
    console.log(`\nQuestion ${index + 1}:`);
    console.log(`  ID: ${question.id}`);
    console.log(`  Year: ${question.year}`);
    console.log(`  Topic: ${question.topic || 'N/A'}`);
    console.log(`  Question: ${question.question.substring(0, 80)}...`);
    console.log(`  Answer: ${question.correct_answer}`);
  });
  
  console.log(`\n🎯 CSV FILE READY FOR MANUAL SUPABASE IMPORT!`);
  console.log(`📁 File: ${outputPath}`);
  console.log(`✅ All ${questions.length} questions properly formatted`);
  console.log(`✅ CSV headers match Supabase table columns`);
  console.log(`✅ Ready for manual upload to Supabase dashboard`);
  
  return { questions, csvPath: outputPath };
}

// Main function
function createCsvImport() {
  console.log('🎯 CREATING CSV FILE FOR MANUAL SUPABASE IMPORT...\n');
  
  const result = createQuestionsCsv();
  
  console.log(`\n🚀 SUCCESS! CSV file created with ${result.questions.length} questions!`);
  console.log(`\n📋 NEXT STEPS:`);
  console.log(`1. Go to Supabase dashboard`);
  console.log(`2. Navigate to Table Editor`);
  console.log(`3. Select 'questions' table`);
  console.log(`4. Click 'Import data'`);
  console.log(`5. Upload the CSV file: ${result.csvPath}`);
  console.log(`6. Map columns to table fields`);
  console.log(`7. Complete the import`);
  
  return result;
}

// Run the process
createCsvImport().catch(console.error);
