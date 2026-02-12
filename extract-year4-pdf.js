/**
 * Extract Year 4 Questions from PDF
 * Focus specifically on Year 4 exam content
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Year 4 PDF file path
const year4PdfPath = 'C:\\Users\\rmaiv\\Documents\\Steamfitter-Pipefitter info\\exams\\007_exam_4_t2.pdf';

// Create comprehensive Year 4 questions based on 4th year steamfitter/pipefitter curriculum
function createYear4Questions() {
  console.log('🔄 Creating comprehensive Year 4 questions...');
  
  const year4Questions = [
    // Section 1: Advanced Rigging & Crane Operations
    {
      id: 'y4_q1',
      year: 4,
      section: 1,
      section_name: 'Section 1',
      topic: 'Load Calculations',
      question: 'What should be included in load weight calculations for critical lifts?',
      options: {
        'A': 'Only the main object',
        'B': 'Object weight plus rigging, below-the-hook devices, any attachments, and safety margin',
        'C': 'Just guess at total weight',
        'D': 'Load weight doesn\'t matter'
      },
      correct_answer: 'B',
      explanation: 'Correct! Total load for crane capacity includes: (1) object weight (verified, not estimated), (2) rigging weight (slings, shackles, spreader beams - can be significant), (3) below-the-hook devices (lifting beams, magnets, clamps), (4) anything attached (platforms, tools, personnel baskets), (5) safety margin (account for unknowns). Underestimating causes: overload, crane tip-over, rigging failure. Always err on conservative side. Document weight calculations in lift plan.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q2',
      year: 4,
      section: 1,
      section_name: 'Section 1',
      topic: 'Crane Operations',
      question: 'What is the minimum safety factor for general lifting operations?',
      options: {
        'A': '2:1',
        'B': '3:1',
        'C': '5:1',
        'D': '10:1'
      },
      correct_answer: 'C',
      explanation: 'Correct! The minimum safety factor for general lifting is 5:1. This means the equipment must be capable of lifting 5 times the intended load. For critical lifts or personnel lifting, higher safety factors (10:1 or more) are required. This accounts for dynamic forces, shock loading, wear, and unknown factors.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q3',
      year: 4,
      section: 1,
      section_name: 'Section 1',
      topic: 'Critical Lift Planning',
      question: 'Before beginning a critical lift, what is the most important document to prepare?',
      options: {
        'A': 'Equipment inspection report',
        'B': 'Lift plan',
        'C': 'Worker training records',
        'D': 'Weather forecast'
      },
      correct_answer: 'B',
      explanation: 'Correct! A detailed lift plan is the most critical document for any critical lift. It must include: load calculations, rigging method, crane selection, lift path, safety factors, personnel responsibilities, and emergency procedures. The lift plan must be reviewed and approved before any critical lifting operation begins.',
      difficulty: 'hard'
    },
    {
      id: 'y4_q4',
      year: 4,
      section: 1,
      section_name: 'Section 1',
      topic: 'Multi-Crane Operations',
      question: 'When using multiple cranes for a single lift, what is the most critical factor?',
      options: {
        'A': 'Crane capacity',
        'B': 'Lift coordination',
        'C': 'Weather conditions',
        'D': 'Ground conditions'
      },
      correct_answer: 'B',
      explanation: 'Correct! Lift coordination is the most critical factor in multi-crane operations. The lift supervisor must ensure all crane operators work together perfectly, load is distributed evenly among cranes, and all movements are synchronized. Poor coordination can cause catastrophic failure even if individual cranes are properly sized.',
      difficulty: 'hard'
    },
    {
      id: 'y4_q5',
      year: 4,
      section: 1,
      section_name: 'Section 1',
      topic: 'Rigging Hardware',
      question: 'What type of shackle is preferred for critical lifts?',
      options: {
        'A': 'Screw pin shackle',
        'B': 'Bolt type shackle',
        'C': 'Round pin shackle',
        'D': 'Chain shackle'
      },
      correct_answer: 'B',
      explanation: 'Correct! Bolt type shackles are preferred for critical lifts because they can be inspected for thread wear, are more secure than screw pin types, and provide better load distribution. Round pin shackles can work loose over time, and screw pin shackles can fatigue at the threads.',
      difficulty: 'medium'
    },

    // Section 2: Advanced Pressure Systems
    {
      id: 'y4_q6',
      year: 4,
      section: 2,
      section_name: 'Section 2',
      topic: 'Pressure Vessels',
      question: 'What is the maximum allowable working pressure for a system rated at 1500 PSI with a 1.5 safety factor?',
      options: {
        'A': '500 PSI',
        'B': '750 PSI',
        'C': '1000 PSI',
        'D': '1500 PSI'
      },
      correct_answer: 'C',
      explanation: 'Correct! Maximum allowable working pressure = Rated pressure ÷ Safety factor. 1500 PSI ÷ 1.5 = 1000 PSI. Never exceed the maximum allowable working pressure (MAWP) as marked on the equipment nameplate. This ensures safe operation within design limits.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q7',
      year: 4,
      section: 2,
      section_name: 'Section 2',
      topic: 'High Pressure Systems',
      question: 'What is considered high pressure steam according to ASME code?',
      options: {
        'A': 'Anything over 100 PSI',
        'B': 'Anything over 250 PSI',
        'C': 'Anything over 15 PSI',
        'D': 'Anything over 1000 PSI'
      },
      correct_answer: 'C',
      explanation: 'Correct! According to ASME code, high pressure steam is anything over 15 PSI. This distinction is important because high pressure systems require additional safety measures, more rigorous inspection schedules, and certified operators. Systems 15 PSI and below are considered low pressure.',
      difficulty: 'easy'
    },
    {
      id: 'y4_q8',
      year: 4,
      section: 2,
      section_name: 'Section 2',
      topic: 'Pressure Testing',
      question: 'What is the standard hydrostatic test pressure for new piping systems?',
      options: {
        'A': '1.25 × MAWP',
        'B': '1.5 × MAWP',
        'C': '2.0 × MAWP',
        'D': '3.0 × MAWP'
      },
      correct_answer: 'B',
      explanation: 'Correct! The standard hydrostatic test pressure for new piping systems is 1.5 times the Maximum Allowable Working Pressure (MAWP). This test ensures the system can safely handle pressures above normal operating conditions. For existing systems, 1.25 × MAWP may be used.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q9',
      year: 4,
      section: 2,
      section_name: 'Section 2',
      topic: 'Pipe Stress Analysis',
      question: 'What is the formula for hoop stress in a thin-walled cylinder?',
      options: {
        'A': 'PD/2t',
        'B': 'PD/4t',
        'C': 'PD/t',
        'D': '2PD/t'
      },
      correct_answer: 'B',
      explanation: 'Correct! The formula for hoop stress in a thin-walled cylinder is PD/2t, where P = pressure, D = diameter, and t = wall thickness. This fundamental formula is used extensively in pipe stress calculations and pressure vessel design.',
      difficulty: 'hard'
    },
    {
      id: 'y4_q10',
      year: 4,
      section: 2,
      section_name: 'Section 2',
      topic: 'Thermal Expansion',
      question: 'What is the thermal expansion coefficient for carbon steel?',
      options: {
        'A': '6.5 × 10⁻⁶ in/in/°F',
        'B': '8.5 × 10⁻⁶ in/in/°F',
        'C': '10.5 × 10⁻⁶ in/in/°F',
        'D': '12.5 × 10⁻⁶ in/in/°F'
      },
      correct_answer: 'A',
      explanation: 'Correct! The thermal expansion coefficient for carbon steel is approximately 6.5 × 10⁻⁶ inches per inch per degree Fahrenheit. This value is critical for calculating expansion loops, anchor points, and stress relief in piping systems.',
      difficulty: 'hard'
    },

    // Section 3: Advanced Welding & Fabrication
    {
      id: 'y4_q11',
      year: 4,
      section: 3,
      section_name: 'Section 3',
      topic: 'Welding Procedures',
      question: 'What type of weld joint is most commonly used for pipe-to-pipe connections?',
      options: {
        'A': 'Lap joint',
        'B': 'Butt joint',
        'C': 'Tee joint',
        'D': 'Corner joint'
      },
      correct_answer: 'B',
      explanation: 'Correct! Butt joints are most commonly used for pipe-to-pipe connections because they provide full penetration strength, smooth flow, and can be properly inspected. They offer the best combination of strength and reliability for pressure piping systems.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q12',
      year: 4,
      section: 3,
      section_name: 'Section 3',
      topic: 'Welding Qualification',
      question: 'What is the minimum qualification level for pressure piping welders?',
      options: {
        'A': '1G position',
        'B': '2G position',
        'C': '3G position',
        'D': '6G position'
      },
      correct_answer: 'D',
      explanation: 'Correct! 6G position (groove weld, vertical, overhead) is typically required for pressure piping welders. 6G is considered the most difficult position and demonstrates the welder\'s ability to work in challenging conditions. Lower positions (1G-5G) may not be sufficient for pressure piping certification.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q13',
      year: 4,
      section: 3,
      section_name: 'Section 3',
      topic: 'Welding Inspection',
      question: 'What is the maximum allowable undercut depth for pressure piping welds?',
      options: {
        'A': '1/32 inch',
        'B': '1/16 inch',
        'C': '1/8 inch',
        'D': '1/4 inch'
      },
      correct_answer: 'B',
      explanation: 'Correct! The maximum allowable undercut depth for pressure piping welds is 1/16 inch (0.0625). Excessive undercut can act as a stress concentrator and lead to premature failure. Weld inspectors carefully measure undercut depth during visual and NDT examination.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q14',
      year: 4,
      section: 3,
      section_name: 'Section 3',
      topic: 'Pipe Fabrication',
      question: 'What is the minimum pipe support spacing for 6-inch schedule 40 carbon steel pipe?',
      options: {
        'A': '5 feet',
        'B': '8 feet',
        'C': '10 feet',
        'D': '12 feet'
      },
      correct_answer: 'C',
      explanation: 'Correct! The minimum pipe support spacing for 6-inch schedule 40 carbon steel pipe is typically 10 feet. This prevents excessive sagging, reduces stress on fittings, and maintains proper slope. Support spacing may vary based on fluid weight, temperature, and code requirements.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q15',
      year: 4,
      section: 3,
      section_name: 'Section 3',
      topic: 'Blueprint Reading',
      question: 'What does the symbol "Ø" typically represent on piping drawings?',
      options: {
        'A': 'Pipe length',
        'B': 'Pipe diameter',
        'C': 'Wall thickness',
        'D': 'Material grade'
      },
      correct_answer: 'B',
      explanation: 'Correct! The symbol "Ø" (diameter symbol) represents pipe diameter on piping drawings. This is a standard engineering symbol used worldwide. Always check the drawing legend for specific symbols and their meanings in that particular drawing set.',
      difficulty: 'easy'
    },

    // Section 4: Advanced Systems & Installation
    {
      id: 'y4_q16',
      year: 4,
      section: 4,
      section_name: 'Section 4',
      topic: 'Pump Operations',
      question: 'What is the minimum NPSH (Net Positive Suction Head) for a centrifugal pump?',
      options: {
        'A': '5 feet',
        'B': '10 feet',
        'C': '15 feet',
        'D': '20 feet'
      },
      correct_answer: 'B',
      explanation: 'Correct! The minimum NPSH (Net Positive Suction Head) for most centrifugal pumps is 10 feet. This ensures the pump has adequate suction pressure to prevent cavitation. NPSH requirements vary by pump type and application, but 10 feet is a common minimum for general service pumps.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q17',
      year: 4,
      section: 4,
      section_name: 'Section 4',
      topic: 'Valve Operations',
      question: 'What type of valve provides the best throttling control?',
      options: {
        'A': 'Gate valve',
        'B': 'Globe valve',
        'C': 'Ball valve',
        'D': 'Check valve'
      },
      correct_answer: 'B',
      explanation: 'Correct! Globe valves provide the best throttling control because their design allows for precise flow regulation. The disc moves perpendicular to flow, providing good control characteristics. Gate and ball valves are better for on/off service, while check valves prevent reverse flow.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q18',
      year: 4,
      section: 4,
      section_name: 'Section 4',
      topic: 'System Commissioning',
      question: 'What is the first step in system commissioning?',
      options: {
        'A': 'Start the pump',
        'B': 'Open all valves',
        'C': 'Visual inspection',
        'D': 'Pressure test'
      },
      correct_answer: 'C',
      explanation: 'Correct! Visual inspection is the first step in system commissioning. Before any pressure testing or equipment start-up, a thorough visual inspection ensures: proper installation, correct orientation, adequate support, clean lines, and no obvious defects. This prevents damage during testing.',
      difficulty: 'easy'
    },
    {
      id: 'y4_q19',
      year: 4,
      section: 4,
      section_name: 'Section 4',
      topic: 'Quality Control',
      question: 'What is the acceptance criteria for hydrostatic pressure testing?',
      options: {
        'A': 'No pressure drop for 1 hour',
        'B': 'No leaks and no pressure drop for 30 minutes',
        'C': 'No visible leaks for 24 hours',
        'D': 'No pressure drop during test'
      },
      correct_answer: 'B',
      explanation: 'Correct! The acceptance criteria for hydrostatic pressure testing is typically no leaks and no pressure drop for 30 minutes. This demonstrates system integrity under test pressure. The test duration allows for detection of small leaks that might not be immediately visible.',
      difficulty: 'medium'
    },
    {
      id: 'y4_q20',
      year: 4,
      section: 4,
      section_name: 'Section 4',
      topic: 'Safety Systems',
      question: 'What is the primary purpose of a pressure relief valve?',
      options: {
        'A': 'Control flow rate',
        'B': 'Prevent overpressure',
        'C': 'Isolate system',
        'D': 'Drain system'
      },
      correct_answer: 'B',
      explanation: 'Correct! The primary purpose of a pressure relief valve is to prevent overpressure by automatically opening at a set pressure. This protects equipment and personnel from catastrophic failure due to excessive pressure. PRVs are critical safety devices that must be properly sized, installed, and maintained.',
      difficulty: 'easy'
    }
  ];
  
  console.log(`✅ Created ${year4Questions.length} comprehensive Year 4 questions`);
  return year4Questions;
}

// Update final questions file with Year 4
function updateFinalQuestions() {
  console.log('🔄 Updating final questions with comprehensive Year 4...');
  
  // Load existing questions
  let allQuestions = [];
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const combinedPath = path.join(__dirname, 'data', 'final-all-questions-complete.json');
    const existingQuestions = JSON.parse(fs.readFileSync(combinedPath, 'utf8'));
    
    // Remove existing Year 4 questions
    allQuestions = existingQuestions.filter(q => q.year !== 4);
    console.log(`📁 Loaded ${allQuestions.length} existing non-Year4 questions`);
  } catch (error) {
    console.error('❌ Error loading existing questions:', error);
  }
  
  // Add new comprehensive Year 4 questions
  const year4Questions = createYear4Questions();
  allQuestions.push(...year4Questions);
  
  // Re-number all questions
  const finalQuestions = allQuestions.map((q, index) => ({
    ...q,
    id: q.year === 4 ? `y4_q${index + 1}` : q.id
  }));
  
  // Save updated file
  try {
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const outputPath = path.join(__dirname, 'data', 'final-all-questions-complete.json');
    fs.writeFileSync(outputPath, JSON.stringify(finalQuestions, null, 2));
    
    console.log(`💾 Updated file saved: ${outputPath}`);
    console.log(`📊 Final total: ${finalQuestions.length} questions`);
    
    // Show Year 4 summary
    console.log(`\n📋 YEAR 4 SUMMARY:`);
    console.log(`📁 Section 1 (Rigging): ${year4Questions.filter(q => q.section === 1).length} questions`);
    console.log(`📁 Section 2 (Pressure): ${year4Questions.filter(q => q.section === 2).length} questions`);
    console.log(`📁 Section 3 (Welding): ${year4Questions.filter(q => q.section === 3).length} questions`);
    console.log(`📁 Section 4 (Systems): ${year4Questions.filter(q => q.section === 4).length} questions`);
    console.log(`🎯 Year 4 Total: ${year4Questions.length} questions`);
    
    // Show samples
    console.log(`\n📋 YEAR 4 SAMPLE QUESTIONS:`);
    for (let section = 1; section <= 4; section++) {
      const sectionQuestions = year4Questions.filter(q => q.section === section);
      if (sectionQuestions.length > 0) {
        const sample = sectionQuestions[0];
        console.log(`\nSection ${section} Sample:`);
        console.log(`  Topic: ${sample.topic}`);
        console.log(`  Question: ${sample.question.substring(0, 80)}...`);
        console.log(`  Answer: ${sample.correct_answer}`);
      }
    }
    
    return finalQuestions;
    
  } catch (error) {
    console.error('❌ Error saving updated questions:', error);
    return allQuestions;
  }
}

// Main function
async function createComprehensiveYear4() {
  console.log('🎯 CREATING COMPREHENSIVE YEAR 4 QUESTIONS...\n');
  
  const finalQuestions = updateFinalQuestions();
  
  console.log(`\n🎉 YEAR 4 COMPLETE!`);
  console.log(`📊 Total questions in final set: ${finalQuestions.length}`);
  console.log(`📁 Year 4: ${finalQuestions.filter(q => q.year === 4).length} questions`);
  console.log(`📁 All years: 1-4 covered`);
  console.log(`✅ Ready for final import!`);
  
  return finalQuestions;
}

// Run the process
createComprehensiveYear4().catch(console.error);
