/**
 * Convert Period 1 Markdown Questions to JSON
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read the markdown file
function readMarkdownFile() {
  try {
    const fullPath = path.join('C:\\Users\\rmaiv\\Documents\\Steamfitter-Pipefitter info', 'period-1-exam-questions.md');
    const fileContent = fs.readFileSync(fullPath, 'utf8');
    return fileContent;
  } catch (error) {
    console.error('Error reading markdown file:', error);
    return null;
  }
}

// Parse markdown questions
function parseMarkdownQuestions(content) {
  const questions = [];
  const lines = content.split('\n');
  let currentQuestion = null;
  let questionNumber = 1;
  let currentSection = 1;
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    // Detect section changes
    if (line.startsWith('## SECTION')) {
      const sectionMatch = line.match(/SECTION (\d+)/);
      if (sectionMatch) {
        currentSection = parseInt(sectionMatch[1]);
      }
      continue;
    }
    
    // Detect questions (starting with number and period)
    if (/^\d+\.\s/.test(line)) {
      // Save previous question if exists
      if (currentQuestion && currentQuestion.question && currentQuestion.options) {
        questions.push({
          ...currentQuestion,
          id: `y1_q${questionNumber}`,
          year: 1,
          section: currentSection,
          section_name: `Section ${currentSection}`
        });
        questionNumber++;
      }
      
      // Start new question
      currentQuestion = {
        question: line.replace(/^\d+\.\s/, ''),
        options: {},
        correct_answer: null,
        explanation: null
      };
    }
    
    // Detect options (A, B, C, D)
    else if (line.match(/^[A-D]\.\s/)) {
      if (currentQuestion) {
        const optionMatch = line.match(/^([A-D])\.\s*(.*)$/);
        if (optionMatch) {
          currentQuestion.options[optionMatch[1]] = optionMatch[2];
        }
      }
    }
    
    // Detect correct answer
    else if (line.toLowerCase().includes('correct answer:') || line.toLowerCase().includes('answer:')) {
      if (currentQuestion) {
        const answerMatch = line.match(/([A-D])/i);
        if (answerMatch) {
          currentQuestion.correct_answer = answerMatch[1].toUpperCase();
        }
      }
    }
    
    // Detect explanation
    else if (line.toLowerCase().includes('explanation:') || line.toLowerCase().includes('correct!')) {
      if (currentQuestion) {
        currentQuestion.explanation = line;
      }
    }
  }
  
  // Add last question
  if (currentQuestion && currentQuestion.question && currentQuestion.options) {
    questions.push({
      ...currentQuestion,
      id: `y1_q${questionNumber}`,
      year: 1,
      section: currentSection,
      section_name: `Section ${currentSection}`
    });
  }
  
  return questions;
}

// Main conversion function
function convertPeriod1ToJson() {
  console.log('🔄 Converting Period 1 Markdown to JSON...');
  
  const markdownContent = readMarkdownFile();
  if (!markdownContent) {
    console.error('❌ Failed to read markdown file');
    return;
  }
  
  const questions = parseMarkdownQuestions(markdownContent);
  
  console.log(`📊 Parsed ${questions.length} questions from Period 1`);
  
  // Filter valid questions
  const validQuestions = questions.filter(q => {
    const hasOptions = q.options && q.options.A && q.options.B && q.options.C && q.options.D;
    const hasQuestion = q.question;
    const hasAnswer = q.correct_answer;
    return hasOptions && hasQuestion && hasAnswer;
  });
  
  console.log(`✅ Valid questions: ${validQuestions.length}`);
  
  // Save to JSON file
  const outputPath = path.join(__dirname, 'data', 'period-1-exam-questions.json');
  fs.writeFileSync(outputPath, JSON.stringify(validQuestions, null, 2));
  
  console.log(`💾 Saved to: ${outputPath}`);
  
  // Show sample
  if (validQuestions.length > 0) {
    console.log('\n📋 Sample question:');
    const sample = validQuestions[0];
    console.log(`ID: ${sample.id}`);
    console.log(`Question: ${sample.question}`);
    console.log(`Options:`, sample.options);
    console.log(`Answer: ${sample.correct_answer}`);
  }
  
  return validQuestions;
}

// Run conversion
convertPeriod1ToJson();
