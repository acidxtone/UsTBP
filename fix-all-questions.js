/**
 * Fix and Prepare ALL Questions for Import
 * Convert Period 1 from Markdown and fix Year 4 JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Parse Period 1 Markdown with better pattern matching
function parsePeriod1Markdown() {
  console.log('🔄 Parsing Period 1 Markdown...');
  
  try {
    const fullPath = path.join('C:\\Users\\rmaiv\\Documents\\Steamfitter-Pipefitter info', 'period-1-exam-questions.md');
    const content = fs.readFileSync(fullPath, 'utf8');
    
    const questions = [];
    let questionNumber = 1;
    let currentSection = 1;
    
    // Split by question patterns
    const questionBlocks = content.split(/\*\*Question \d+\*\*/);
    
    for (let i = 1; i < questionBlocks.length; i++) {
      const block = questionBlocks[i].trim();
      if (!block) continue;
      
      const lines = block.split('\n').map(line => line.trim()).filter(line => line);
      
      let question = '';
      let options = {};
      let correctAnswer = '';
      let explanation = '';
      let topic = '';
      
      // Parse each line
      for (const line of lines) {
        if (line.startsWith('**Topic:**')) {
          topic = line.replace('**Topic:**', '').trim();
        }
        else if (!line.startsWith('**') && !line.startsWith('A)') && !line.startsWith('B)') && !line.startsWith('C)') && !line.startsWith('D)') && !line.startsWith('**Correct Answer:') && !line.startsWith('**Explanation:**') && question === '') {
          question = line;
        }
        else if (line.match(/^[A-D]\)/)) {
          const optionMatch = line.match(/^([A-D])\)\s*(.*)$/);
          if (optionMatch) {
            options[optionMatch[1]] = optionMatch[2];
          }
        }
        else if (line.startsWith('**Correct Answer:**')) {
          const answerMatch = line.match(/([A-D])/);
          if (answerMatch) {
            correctAnswer = answerMatch[1];
          }
        }
      }
      
      // Validate question
      if (question && options.A && options.B && options.C && options.D && correctAnswer) {
        questions.push({
          id: `y1_q${questionNumber}`,
          year: 1,
          section: currentSection,
          section_name: `Section ${currentSection}`,
          topic: topic,
          question: question,
          options: options,
          correct_answer: correctAnswer,
          explanation: explanation,
          difficulty: 'medium'
        });
        questionNumber++;
      }
    }
    
    console.log(`✅ Parsed ${questions.length} valid questions from Period 1`);
    
    // Save to JSON
    const outputPath = path.join(__dirname, 'data', 'period-1-exam-questions.json');
    fs.writeFileSync(outputPath, JSON.stringify(questions, null, 2));
    
    return questions;
    
  } catch (error) {
    console.error('❌ Error parsing Period 1:', error);
    return [];
  }
}

// Fix Year 4 JSON
function fixYear4Json() {
  console.log('🔧 Fixing Year 4 JSON...');
  
  try {
    const inputPath = path.join(__dirname, 'data', 'period-4-exam-questions.json');
    const content = fs.readFileSync(inputPath, 'utf8');
    
    // Find where it cuts off and complete it
    const lastCompleteIndex = content.lastIndexOf('}');
    
    if (lastCompleteIndex > 0) {
      // Find the last complete question
      const beforeLastQuestion = content.lastIndexOf('},', lastCompleteIndex);
      if (beforeLastQuestion > 0) {
        // Cut off at the last complete question
        const fixedContent = content.substring(0, beforeLastQuestion) + '\n  ]\n}';
        
        // Parse and validate
        const questions = JSON.parse(fixedContent);
        
        // Format questions for consistency
        const formattedQuestions = questions.map((q, index) => ({
          id: `y4_q${index + 1}`,
          year: 4,
          section: q.section || 1,
          section_name: q.section_name || `Section ${q.section || 1}`,
          topic: q.topic,
          question: q.question,
          options: q.options,
          correct_answer: q.correct_answer,
          explanation: q.explanation?.correct || q.explanation,
          difficulty: q.difficulty || 'medium'
        }));
        
        console.log(`✅ Fixed Year 4 JSON: ${formattedQuestions.length} questions`);
        
        // Save fixed version
        const outputPath = path.join(__dirname, 'data', 'period-4-exam-questions-fixed.json');
        fs.writeFileSync(outputPath, JSON.stringify(formattedQuestions, null, 2));
        
        return formattedQuestions;
      }
    }
    
    console.log('❌ Could not fix Year 4 JSON automatically');
    return [];
    
  } catch (error) {
    console.error('❌ Error fixing Year 4 JSON:', error);
    return [];
  }
}

// Load existing questions
function loadExistingQuestions() {
  const questions = [];
  
  // Year 2
  try {
    const year2Path = path.join(__dirname, 'data', 'period-2-exam-questions.json');
    const year2Data = JSON.parse(fs.readFileSync(year2Path, 'utf8'));
    const year2Questions = (year2Data.questions || year2Data.exam_questions || year2Data)
      .filter(q => q.options && q.options.A && q.options.B && q.options.C && q.options.D && q.question && (q.correct_answer || q.answer))
      .map((q, index) => ({
        id: `y2_q${index + 1}`,
        year: 2,
        section: q.section || 1,
        section_name: q.section_name || `Section ${q.section || 1}`,
        topic: q.topic,
        question: q.question,
        options: q.options,
        correct_answer: q.correct_answer || q.answer,
        explanation: q.explanation?.correct || q.explanation,
        difficulty: q.difficulty || 'medium'
      }));
    
    questions.push(...year2Questions);
    console.log(`✅ Year 2: ${year2Questions.length} questions`);
  } catch (error) {
    console.error('❌ Error loading Year 2:', error);
  }
  
  // Year 3
  try {
    const year3Path = path.join(__dirname, 'data', 'period-3-exam-questions.json');
    const year3Data = JSON.parse(fs.readFileSync(year3Path, 'utf8'));
    const year3Questions = (year3Data.questions || year3Data.exam_questions || year3Data)
      .filter(q => q.options && q.options.A && q.options.B && q.options.C && q.options.D && q.question && (q.correct_answer || q.answer))
      .map((q, index) => ({
        id: `y3_q${index + 1}`,
        year: 3,
        section: q.section || 1,
        section_name: q.section_name || `Section ${q.section || 1}`,
        topic: q.topic,
        question: q.question,
        options: q.options,
        correct_answer: q.correct_answer || q.answer,
        explanation: q.explanation?.correct || q.explanation,
        difficulty: q.difficulty || 'medium'
      }));
    
    questions.push(...year3Questions);
    console.log(`✅ Year 3: ${year3Questions.length} questions`);
  } catch (error) {
    console.error('❌ Error loading Year 3:', error);
  }
  
  return questions;
}

// Main function
async function prepareAllQuestions() {
  console.log('🚀 Preparing ALL questions for import...\n');
  
  // Parse Period 1
  const period1Questions = parsePeriod1Markdown();
  
  // Load existing Years 2-3
  const existingQuestions = loadExistingQuestions();
  
  // Fix Year 4
  const year4Questions = fixYear4Json();
  
  // Combine all questions
  const allQuestions = [
    ...period1Questions,
    ...existingQuestions,
    ...year4Questions
  ];
  
  console.log(`\n📊 SUMMARY:`);
  console.log(`📁 Period 1 (Year 1): ${period1Questions.length} questions`);
  console.log(`📁 Period 2 (Year 2): ${existingQuestions.filter(q => q.year === 2).length} questions`);
  console.log(`📁 Period 3 (Year 3): ${existingQuestions.filter(q => q.year === 3).length} questions`);
  console.log(`📁 Period 4 (Year 4): ${year4Questions.length} questions`);
  console.log(`🎯 TOTAL: ${allQuestions.length} questions`);
  
  // Save combined file
  const combinedPath = path.join(__dirname, 'data', 'all-exam-questions-combined.json');
  fs.writeFileSync(combinedPath, JSON.stringify(allQuestions, null, 2));
  
  console.log(`\n💾 Combined file saved: ${combinedPath}`);
  
  // Show sample from each year
  console.log(`\n📋 SAMPLE QUESTIONS:`);
  for (let year = 1; year <= 4; year++) {
    const yearQuestions = allQuestions.filter(q => q.year === year);
    if (yearQuestions.length > 0) {
      const sample = yearQuestions[0];
      console.log(`\nYear ${year} Sample:`);
      console.log(`  ID: ${sample.id}`);
      console.log(`  Question: ${sample.question.substring(0, 100)}...`);
      console.log(`  Options: A) ${sample.options.A?.substring(0, 50)}...`);
      console.log(`  Answer: ${sample.correct_answer}`);
    }
  }
  
  return allQuestions;
}

// Run the preparation
prepareAllQuestions().catch(console.error);
