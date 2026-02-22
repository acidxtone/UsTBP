/**
 * Content for all /trades static pages. Keyed by path or (trade, year).
 * Use getHubContent(), getTradeHubContent(trade), getTradeYearContent(trade, year).
 */

import { YEAR_CONTENT_NEW } from './tradesYearContentNew.js';

export const TRADES = {
  electrician: { name: 'Electrician', slug: 'electrician', years: [1, 2, 3, 4] },
  millwright: { name: 'Millwright', slug: 'millwright', years: [1, 2, 3, 4] },
  'steamfitter-pipefitter': { name: 'Steamfitter / Pipefitter', slug: 'steamfitter-pipefitter', years: [1, 2, 3, 4] },
  welder: { name: 'Welder', slug: 'welder', years: [1, 2, 3] },
};

export const VALID_TRADE_SLUGS = Object.keys(TRADES);

export function getHubContent() {
  return {
    title: 'Trades Exam Prep | Canadian Apprenticeship Practice Tests | TradeBenchPrep',
    metaDescription: 'Practice tests and study guides for apprenticeship exams. Choose your trade — Electrician, Millwright, Steamfitter/Pipefitter, or Welder. Curriculum-aligned by trade and year.',
    h1: 'Apprenticeship Exam Prep by Trade',
    intro: [
      'TradeBenchPrep is built specifically for apprentices working toward their journeyman certification. Every question, every quiz, and every practice exam on this platform is aligned to the apprenticeship curriculum — organized by trade and by year so you study exactly what you need, nothing more.',
      'Choose your trade below to explore year-by-year exam prep resources, or hit Get Started to jump straight into the platform.',
    ],
    chooseYourTrade: [
      {
        title: 'Electrician',
        description: 'The electrical trade is one of the most technically demanding apprenticeships, covering everything from basic circuit theory in Year 1 to complex power systems and the Canadian Electrical Code in Year 4. Four years of apprenticeship, four years of exam prep resources.',
        link: '/trades/electrician',
      },
      {
        title: 'Millwright — Industrial Mechanic',
        description: 'Millwrights keep industrial equipment running. The four-year apprenticeship covers mechanical systems, hydraulics, pneumatics, precision alignment, and advanced troubleshooting. TradeBenchPrep covers every year of the millwright curriculum.',
        link: '/trades/millwright',
      },
      {
        title: 'Steamfitter / Pipefitter',
        description: 'Steamfitters and pipefitters work with high-pressure piping systems in industrial, commercial, and institutional settings. The four-year apprenticeship is technically rigorous, with a strong emphasis on codes, blueprints, and system safety across every year.',
        link: '/trades/steamfitter-pipefitter',
      },
      {
        title: 'Welder',
        description: 'Welding covers a three-year apprenticeship focused on process knowledge, metallurgy, joint design, and welding codes. TradeBenchPrep provides year-by-year practice for every stage of the welding curriculum.',
        link: '/trades/welder',
      },
    ],
    howItWorks: 'TradeBenchPrep is straightforward. Select your trade, select your year, and your dashboard is ready immediately — no account required. From there you have three modes: Study mode walks you through every possible question with correct answers and explanations. Quiz mode tests you on a randomized selection. Full exam mode simulates the real period exam under timed conditions with a full results breakdown at the end. Your progress saves automatically in your browser every time you visit.',
  };
}

const TRADE_HUB_CONTENT = {
  electrician: {
    title: 'Electrician Apprenticeship Exam Prep | TradeBenchPrep',
    metaDescription: 'Study for your electrician apprenticeship exams year by year. Practice questions and full exams built on the curriculum for Years 1 through 4.',
    h1: 'Electrician Apprenticeship Exam Prep — All Years',
    intro: 'The electrical trade apprenticeship spans four years and covers one of the most comprehensive technical curriculums of any skilled trade. From foundational electrical theory in Year 1 to advanced power systems, motor controls, and the Canadian Electrical Code in Year 4, each year builds directly on the last. TradeBenchPrep gives you structured practice for every stage.',
    chooseYearIntro: 'Select the year that matches your current period of apprenticeship to access practice questions, quizzes, and full exams aligned to the electrician curriculum for that year.',
    about: 'The electrician apprenticeship requires apprentices to complete both on-the-job hours and technical training for each period before writing a period exam. Passing each exam is required to advance. The four-year program culminates in eligibility to challenge the Interprovincial exam for journeyman certification recognized across Canada.',
  },
  millwright: {
    title: 'Millwright Industrial Mechanic Apprenticeship Exam Prep | TradeBenchPrep',
    metaDescription: 'Study for your millwright apprenticeship exams year by year. Practice questions and full exams built on the industrial mechanic curriculum for Years 1 through 4.',
    h1: 'Millwright Industrial Mechanic Apprenticeship Exam Prep — All Years',
    intro: 'The Millwright — Industrial Mechanic apprenticeship is one of the most technically diverse trades, covering mechanical systems, hydraulics, pneumatics, precision alignment, and advanced troubleshooting across four years of training. TradeBenchPrep provides structured exam prep for every period of the millwright curriculum.',
    chooseYearIntro: null,
    about: 'The millwright apprenticeship requires completion of on-the-job hours and technical training for each period. Millwrights work across oil and gas, manufacturing, forestry, mining, and utilities — anywhere that industrial machinery needs to be installed, maintained, and repaired. The four-year program builds from foundational mechanical knowledge to advanced systems troubleshooting and precision maintenance.',
  },
  'steamfitter-pipefitter': {
    title: 'Steamfitter Pipefitter Apprenticeship Exam Prep | TradeBenchPrep',
    metaDescription: 'Study for your steamfitter/pipefitter apprenticeship exams year by year. Practice questions and full exams built on the curriculum for Years 1 through 4.',
    h1: 'Steamfitter / Pipefitter Apprenticeship Exam Prep — All Years',
    intro: 'The Steamfitter/Pipefitter apprenticeship is one of the most technically demanding trades, working with high-pressure piping systems in industrial, commercial, and institutional settings. The four-year program builds from piping fundamentals to advanced system design and code application. TradeBenchPrep gives you structured exam prep for every year.',
    chooseYearIntro: null,
    about: 'Steamfitters and pipefitters work across oil and gas, petrochemical, power generation, and industrial facilities. The trade requires deep knowledge of piping materials, joining methods, system codes, blueprint reading, and the behaviour of fluids and gases under pressure. The four-year apprenticeship is rigorous and the period exams reflect that technical depth.',
  },
  welder: {
    title: 'Welder Apprenticeship Exam Prep | TradeBenchPrep',
    metaDescription: 'Study for your welder apprenticeship exams year by year. Practice questions and full exams built on the welding curriculum for Years 1 through 3.',
    h1: 'Welder Apprenticeship Exam Prep — All Years',
    intro: 'The Welder apprenticeship spans three years and covers welding processes, metallurgy, joint design, welding codes, and quality assurance across a rigorous curriculum. TradeBenchPrep provides structured exam prep for every period of the program.',
    chooseYearIntro: null,
    about: 'The welding apprenticeship requires apprentices to complete on-the-job hours and technical training for each period. Welders work across construction, fabrication, oil and gas, pipeline, and manufacturing industries. The three-year program covers the full range of welding processes and the technical knowledge required to produce quality welds that meet code requirements.',
  },
};

export function getTradeHubContent(tradeSlug) {
  return TRADE_HUB_CONTENT[tradeSlug] || null;
}

// Year page content: key = `${tradeSlug}_${year}`
// Each value: { title, metaDescription, h1, intro, whatsCovered: [{name, text}], howHelps: string[], whatToExpect: string[], tips: string[], readyToStart: string }
// Optional: readyHeading for year 4 variants
const YEAR_CONTENT = {};

function addYearContent(key, data) {
  YEAR_CONTENT[key] = data;
}

// --- Electrician Year 1 ---
addYearContent('electrician_1', {
  title: 'Electrician Year 1 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Prepare for your Year 1 electrical apprenticeship exam. Practice questions, quizzes and full exams built on the curriculum. Start free today.",
  h1: 'Electrician Year 1 Apprenticeship Exam Prep',
  intro: "Starting your electrical apprenticeship is a significant milestone. Year 1 lays the foundation for everything that follows — from understanding basic electrical theory to working safely with tools, materials, and the Canadian Electrical Code. TradeBenchPrep gives you a structured way to study, quiz yourself, and walk into your exam confident.",
  whatsCovered: [
    { name: "Electrical Theory", text: "Ohm's Law, voltage, current, resistance, series and parallel circuits form the backbone of Year 1 theory content. Students learn how electricity behaves and how to apply mathematical formulas to calculate values across basic circuits. This material appears consistently across the exam and is foundational to every subsequent year." },
    { name: "Tools and Materials", text: "Identification and safe use of hand tools, power tools, and measuring instruments used in electrical work. Understanding the correct tool for each application and how to maintain and use them safely is a core competency tested in Year 1." },
    { name: "Workplace Safety", text: "WHMIS, PPE requirements, lockout/tagout procedures, and Occupational Health and Safety regulations that govern electrical work. Safety knowledge is heavily weighted in Year 1 and remains present throughout all subsequent years." },
    { name: "Trade Science", text: "Basic physics concepts including magnetism, electromagnetism, and how they apply to electrical systems. Students are introduced to the relationship between magnetic fields and electrical current that underpins motors, generators, and transformers." },
    { name: "Canadian Electrical Code Part 1", text: "Introduction to the CEC, how to navigate it, and the sections most relevant to first year apprentices. Students are not expected to memorize the code but must be able to locate and apply relevant sections efficiently." },
    { name: "Conduit and Wiring Methods", text: "Introduction to EMT, rigid conduit, NMD90 cable, and basic wiring installations. Students learn conduit bending basics and how to properly route and secure wiring in residential and light commercial applications." },
    { name: "Blueprints and Diagrams", text: "Reading basic electrical drawings, schematic symbols, and single-line diagrams. The ability to interpret drawings accurately is a practical skill tested throughout the apprenticeship program." },
  ],
  howHelps: [
    "TradeBenchPrep is built specifically around the apprenticeship curriculum, which means every question you practice is aligned to what actually appears on your period exam. Unlike generic electrical study resources, the content here is structured by trade and by year — so as a Year 1 electrician apprentice you are not wading through material that does not apply to you yet.",
    "The platform gives you three ways to prepare. Study mode lets you go through every possible question with the correct answer and an explanation, so you are learning as you go rather than just memorizing. Quiz mode tests you on a random selection so you can identify weak areas. Full exam mode simulates the real exam experience with timed conditions and a results breakdown when you are done.",
    "Your progress is saved automatically every time you visit so you can pick up exactly where you left off without creating an account or remembering a password.",
  ],
  whatToExpect: [
    "The Year 1 electrician exam is a requirement to progress from your first to second period of apprenticeship. The exam is multiple choice and covers all technical training content from your first year of classroom instruction. A passing grade is required before you can log additional on-the-job hours toward your journeyman certification.",
    "The exam draws from all the topic areas covered in your technical training — electrical theory, safety, the Canadian Electrical Code, tools, and trade science. Many apprentices underestimate the theory components, particularly circuit calculations and CEC navigation. These are exactly the areas TradeBenchPrep focuses on most heavily.",
  ],
  tips: [
    "Start with electrical theory. Ohm's Law and basic circuit math appear consistently across the exam and form the basis for more complex questions in every subsequent year. If you are comfortable with the math the rest of the exam becomes significantly more manageable.",
    "Get familiar with the Canadian Electrical Code early. You do not need to memorize it — the exam allows you to reference it — but you need to know how to navigate it quickly. Practice finding specific sections under time pressure using the full exam mode on TradeBenchPrep.",
    "Review workplace safety thoroughly. Safety questions are straightforward marks that are easy to lose through careless preparation. WHMIS, lockout/tagout, and OHS regulations should be second nature before exam day.",
  ],
  readyToStart: "TradeBenchPrep is free to start and built entirely around the electrical apprenticeship curriculum. Whether your exam is next week or next month, the best time to start practicing is now.",
  readyHeading: "Ready to Start Practicing?",
});

// Electrician Year 2
addYearContent('electrician_2', {
  title: 'Electrician Year 2 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Study for your Year 2 electrician apprenticeship exam. Practice questions and full exams aligned to the curriculum covering AC theory, motors, and more.",
  h1: 'Electrician Year 2 Apprenticeship Exam Prep',
  intro: "Year 2 of the electrician apprenticeship moves from foundational knowledge into more complex electrical systems. Alternating current theory, transformers, electric motors, and more advanced applications of the Canadian Electrical Code become the focus. TradeBenchPrep organizes all of this into structured practice so you can build on your Year 1 knowledge and pass your second period exam with confidence.",
  whatsCovered: [
    { name: "Alternating Current Theory", text: "AC circuits, sine waves, frequency, phase relationships, and the behaviour of capacitors and inductors in AC systems. Year 2 introduces the mathematics of AC power including RMS values, power factor, and reactive power." },
    { name: "Transformers", text: "Construction, operating principles, and applications of single-phase and three-phase transformers. Students learn how to calculate transformer ratios, voltage, current, and power relationships across primary and secondary windings." },
    { name: "Electric Motors", text: "Single-phase and three-phase induction motors, motor construction, nameplate data, and basic motor control. Understanding how motors start, run, and are protected is a major focus of Year 2 content." },
    { name: "Motor Controls", text: "Introduction to control circuits including manual starters, magnetic starters, contactors, and overload protection. Students begin reading and interpreting basic ladder logic diagrams." },
    { name: "Canadian Electrical Code — Intermediate Application", text: "Building on Year 1 CEC knowledge, Year 2 apprentices apply code sections to more complex wiring scenarios including branch circuit calculations, box fill, and conductor sizing." },
    { name: "Residential Wiring", text: "Complete residential wiring systems including service entrance, panel installation, branch circuits, and device wiring. Students learn how to plan and install a complete residential electrical system to code." },
    { name: "Grounding and Bonding", text: "The principles and requirements for system grounding and equipment bonding as defined in the Canadian Electrical Code. A commonly tested and misunderstood topic in Year 2 exams." },
  ],
  howHelps: [
    "By Year 2, the volume and complexity of exam material increases significantly. The jump from DC circuits to AC theory catches many apprentices off guard — particularly the mathematics around power factor and transformer calculations. TradeBenchPrep structures practice so you can focus on these harder topics while still reinforcing the fundamentals from Year 1.",
    "Study mode gives you full explanations with every answer so you understand why an answer is correct, not just what the correct answer is. This is particularly valuable for motor control and CEC application questions where the reasoning matters as much as the result.",
  ],
  whatToExpect: [
    "The Year 2 exam covers the full scope of second period technical training content. AC theory and transformer calculations are typically the most challenging sections for apprentices who are strong on the practical side but less comfortable with the mathematics. Motor control circuit interpretation is another area where targeted practice makes a significant difference.",
    "The CEC becomes more heavily applied in Year 2 — expect questions that require you to look up specific code requirements and apply them to wiring scenarios, rather than simply recall general safety rules.",
  ],
  tips: [
    "Spend dedicated time on AC mathematics before your exam. Power factor, apparent power, true power, and reactive power relationships are reliably tested and require practice with calculations not just concept recognition.",
    "Work through transformer ratio problems until they feel automatic. Single-phase transformer calculations are straightforward once the formula relationships are clear, but three-phase transformer configurations require more careful attention to winding arrangements.",
    "Review motor nameplate data interpretation. Being able to read a motor nameplate and determine correct protection sizing, voltage connections, and starter selection is a practical skill with consistent exam representation.",
  ],
  readyToStart: "The Year 2 electrician exam is a significant step in your apprenticeship. Start practicing now with questions built specifically for second period content.",
  readyHeading: "Ready to Start Practicing?",
});

// Electrician Year 3
addYearContent('electrician_3', {
  title: 'Electrician Year 3 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Prepare for your Year 3 electrician apprenticeship exam. Practice tests covering commercial wiring, three-phase systems, and advanced CEC applications.",
  h1: 'Electrician Year 3 Apprenticeship Exam Prep',
  intro: "Year 3 of the electrician apprenticeship moves into commercial and industrial electrical work. Three-phase power systems, distribution equipment, advanced motor controls, and deeper Canadian Electrical Code applications define this period. TradeBenchPrep provides comprehensive practice aligned to the Year 3 curriculum so you are fully prepared for your third period exam.",
  whatsCovered: [
    { name: "Three-Phase Power Systems", text: "Three-phase generation, distribution, wye and delta configurations, voltage and current relationships, and power calculations in three-phase systems. This is one of the most heavily tested areas in Year 3 and requires solid mathematical foundation." },
    { name: "Commercial Wiring Methods", text: "Tray cable, MC cable, rigid metal conduit, intermediate metal conduit, and other wiring methods used in commercial construction. Students learn installation requirements and CEC rules governing each method." },
    { name: "Distribution Equipment", text: "Panelboards, switchboards, motor control centres, and distribution transformers. Students learn how to size, select, and apply distribution equipment to commercial and industrial electrical systems." },
    { name: "Advanced Motor Controls", text: "Reduced voltage starters, variable frequency drives, reversing circuits, and multi-speed motor control. Control circuit interpretation and troubleshooting become significantly more complex in Year 3." },
    { name: "Lighting Systems", text: "Commercial lighting systems including fluorescent, HID, LED, and emergency lighting. Lighting calculations and CEC requirements for commercial occupancies are covered in detail." },
    { name: "Canadian Electrical Code — Commercial Application", text: "Load calculations for commercial buildings, demand factors, service sizing, and occupancy-specific requirements. Year 3 CEC application is substantially more complex than previous years." },
    { name: "Hazardous Locations", text: "Classification of hazardous locations, equipment selection requirements, and CEC rules for Class I, II, and III hazardous areas. This is a specialized area with consistent exam representation." },
  ],
  howHelps: [
    "Year 3 is where many apprentices find the gap between practical experience and exam knowledge becomes most apparent. The shift to commercial and industrial systems introduces new equipment, new code sections, and significantly more complex calculations than previous years. TradeBenchPrep's structured study and quiz modes let you identify exactly where your knowledge gaps are so you can address them before exam day.",
    "Full exam mode is particularly valuable at this stage — the Year 3 exam is comprehensive and time management matters. Practicing under timed conditions with realistic question distribution helps you build the pace and confidence you need.",
  ],
  whatToExpect: [
    "The Year 3 exam tests your ability to apply electrical knowledge to commercial and industrial contexts. Three-phase calculations, distribution system design, and advanced motor control circuit interpretation are consistently represented. Hazardous location classification is a specialized topic that rewards thorough preparation — it is specific enough that apprentices who study it carefully gain a meaningful advantage.",
    "CEC load calculations for commercial buildings are another area where exam performance correlates directly with practice time. Being able to work through a complete commercial service calculation efficiently under exam conditions requires repetition.",
  ],
  tips: [
    "Master three-phase mathematics before anything else. Wye and delta voltage and current relationships, power factor in three-phase systems, and balanced vs unbalanced load calculations should all be second nature.",
    "Study hazardous location classification carefully. The Class/Division/Group system is specific and testable. Apprentices who invest time here typically pick up marks that others leave on the table.",
    "Work through complete commercial load calculations from start to finish. The CEC sections covering demand factors and service sizing for commercial occupancies reward systematic practice more than any other topic in Year 3.",
  ],
  readyToStart: "Year 3 is a pivotal point in your electrical apprenticeship. Practice with questions built specifically for third period content and go into your exam prepared.",
  readyHeading: "Ready to Start Practicing?",
});

// Electrician Year 4
addYearContent('electrician_4', {
  title: 'Electrician Year 4 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Study for your Year 4 electrician apprenticeship exam. Advanced industrial systems, power quality, and CEC mastery. Built on the curriculum.",
  h1: 'Electrician Year 4 Apprenticeship Exam Prep',
  intro: "Year 4 is the final period of the electrician apprenticeship and the most technically advanced. Industrial power systems, power quality, programmable logic controllers, advanced protection systems, and mastery of the Canadian Electrical Code define this period. Passing your Year 4 exam makes you eligible to challenge the Interprovincial exam for journeyman certification. TradeBenchPrep gives you the focused practice you need to finish strong.",
  whatsCovered: [
    { name: "Industrial Power Systems", text: "High voltage systems, substations, switchgear, and industrial power distribution. Students learn the design and operation of complete industrial electrical systems from the utility entrance to the point of use." },
    { name: "Power Quality", text: "Harmonics, power factor correction, voltage regulation, and the effects of power quality issues on electrical equipment. Understanding and diagnosing power quality problems is an increasingly important industrial skill." },
    { name: "Programmable Logic Controllers", text: "Introduction to PLC architecture, programming basics, and the integration of PLCs into motor control and automation systems. This is one of the more modern additions to the electrician curriculum and reflects the evolution of industrial electrical work." },
    { name: "Protection Systems", text: "Overcurrent protection, ground fault protection, arc flash hazard analysis, and protective relay fundamentals. Proper protection coordination is critical in industrial systems and is tested in detail in Year 4." },
    { name: "Canadian Electrical Code — Advanced and Industrial Application", text: "Industrial occupancy requirements, high voltage installations, special systems, and the complete scope of CEC sections applicable to industrial electrical work. Year 4 CEC knowledge is the most comprehensive of the entire apprenticeship." },
    { name: "Renewable Energy Systems", text: "Introduction to solar photovoltaic systems, battery storage, and grid interconnection requirements under the CEC. Renewable energy is a growing area of electrical work with increasing exam representation." },
    { name: "Instrumentation and Process Control", text: "Basic instrumentation concepts, 4-20mA control loops, and how instrumentation integrates with industrial electrical systems." },
  ],
  howHelps: [
    "Year 4 covers the broadest and most complex content of the entire electrician apprenticeship. The volume of material — from PLCs to power quality to high voltage systems — means that unfocused studying is ineffective. TradeBenchPrep's year-specific question bank ensures every minute of practice is spent on content that actually appears on the Year 4 exam.",
    "The full exam mode is essential in your Year 4 preparation. The final period exam is comprehensive and performance under time pressure matters. Running multiple full practice exams in the weeks before your actual exam is the most effective way to ensure you are ready.",
  ],
  whatToExpect: [
    "The Year 4 exam is the most demanding of the apprenticeship. Industrial power systems, protection coordination, and advanced CEC application are the core of the exam. PLC fundamentals and power quality are newer curriculum areas that require dedicated study — apprentices with strong practical experience in traditional electrical work sometimes underestimate these topics.",
    "Passing Year 4 is the final academic requirement before you can write the Interprovincial exam and earn your journeyman certificate recognized across Canada.",
  ],
  tips: [
    "Do not neglect PLC and power quality content simply because it feels different from traditional electrical work. These topics are fully represented on the exam and reward methodical study.",
    "Review protection coordination principles carefully. Arc flash, ground fault, and overcurrent protection system design questions require you to apply multiple concepts together — exactly the kind of question that separates well-prepared candidates from the rest.",
    "Run the full exam mode on TradeBenchPrep repeatedly in your final two weeks. Year 4 material is extensive and timed practice is the best way to ensure you can work through the full exam confidently within the allotted time.",
  ],
  readyToStart: "Year 4 is the final step before your journeyman certification. Practice with curriculum-aligned content and go into your exam with everything you need to pass.",
  readyHeading: "Ready to Finish Your Apprenticeship Strong?",
});

// --- Millwright Year 1 ---
addYearContent('millwright_1', {
  title: 'Millwright Year 1 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Prepare for your Year 1 millwright apprenticeship exam. Practice questions and quizzes built on the industrial mechanic curriculum. Start free today.",
  h1: 'Millwright Year 1 Apprenticeship Exam Prep',
  intro: "Year 1 of the millwright apprenticeship establishes the mechanical foundations that every subsequent year builds upon. Trade mathematics, hand and power tools, fasteners, bearings, seals, and workplace safety form the core of first period content. TradeBenchPrep organizes all of this into focused practice so you can approach your Year 1 exam with confidence.",
  whatsCovered: [
    { name: "Trade Mathematics", text: "Measurement, unit conversion, basic geometry, and the mathematical calculations used in millwright work including force, torque, and mechanical advantage. Strong math fundamentals are essential for every subsequent year of the program." },
    { name: "Hand Tools and Power Tools", text: "Identification, selection, safe use, and maintenance of the hand tools and power tools used in millwright work. Tool knowledge is foundational and consistently tested across all periods." },
    { name: "Workplace Safety", text: "WHMIS, PPE, lockout/tagout procedures, and OHS regulations applicable to industrial mechanical work. Safety is heavily weighted in Year 1 and remains present throughout the entire apprenticeship." },
    { name: "Fasteners and Fastening Systems", text: "Bolts, nuts, washers, screws, keys, and keyways. Students learn thread standards, torque specifications, bolt grades, and proper fastening techniques including the use of torque wrenches." },
    { name: "Bearings", text: "Types of bearings including ball, roller, needle, and sleeve bearings. Students learn bearing selection, installation, lubrication, and failure analysis. Bearing knowledge is one of the most consistently tested topics in millwright exams." },
    { name: "Seals and Gaskets", text: "Mechanical seals, lip seals, O-rings, and gaskets. Proper seal selection, installation, and the consequences of incorrect sealing are covered in detail." },
    { name: "Basic Rigging", text: "Introduction to rigging hardware, sling types, rigging configurations, and safe load calculations. Rigging safety is a critical competency in industrial mechanical work." },
  ],
  howHelps: [
    "TradeBenchPrep's Year 1 millwright content is aligned to the industrial mechanic curriculum, ensuring that every practice question is relevant to your actual exam. Study mode walks you through each question with a full explanation so you are building genuine understanding rather than memorizing answers.",
    "Quiz mode lets you test yourself on specific topic areas so you can identify where you need more work before committing to a full timed exam. This targeted approach is particularly effective for Year 1 content where the breadth of topics can make it hard to know where to focus.",
  ],
  whatToExpect: [
    "The Year 1 millwright exam covers all first period technical training content. Bearings, fasteners, and basic rigging are typically the most heavily represented mechanical topics. Safety content — WHMIS, lockout/tagout, and OHS requirements — is always present and rewards thorough preparation.",
    "Trade mathematics appears throughout the exam integrated into practical questions rather than as standalone calculation problems. Being comfortable with the math in context — not just in isolation — is important for performing well.",
  ],
  tips: [
    "Master bearing identification and failure analysis early. Bearing questions appear consistently across all four years of the millwright apprenticeship and the knowledge compounds — strong Year 1 bearing fundamentals make every subsequent year easier.",
    "Study fastener specifications carefully. Bolt grade markings, thread pitch, and torque specification questions reward apprentices who have taken the time to understand the details rather than just the general concepts.",
    "Do not underestimate the rigging content. Load calculations and sling angle effects on working load limits are mathematical topics that require practice, not just reading.",
  ],
  readyToStart: "TradeBenchPrep is free to start and built around the millwright curriculum. Start practicing today and go into your Year 1 exam prepared.",
  readyHeading: "Ready to Start Practicing?",
});

// Millwright Years 2, 3, 4 (abbreviated structure - same pattern)
addYearContent('millwright_2', {
  title: 'Millwright Year 2 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Study for your Year 2 millwright apprenticeship exam. Practice tests covering hydraulics, pneumatics, lubrication, and power transmission. aligned.",
  h1: 'Millwright Year 2 Apprenticeship Exam Prep',
  intro: "Year 2 of the millwright apprenticeship introduces fluid power systems and advances your understanding of power transmission and lubrication. Hydraulics, pneumatics, drives, couplings, and more complex mechanical systems become the focus. TradeBenchPrep provides structured practice for all of this second period content.",
  whatsCovered: [
    { name: "Hydraulics", text: "Hydraulic system fundamentals including Pascal's Law, hydraulic pumps, valves, cylinders, motors, and system circuits. Students learn to read hydraulic schematics and understand how hydraulic components work together as a system." },
    { name: "Pneumatics", text: "Compressed air systems, pneumatic components, control valves, and actuators. Pneumatic circuit reading and component function are core Year 2 competencies." },
    { name: "Lubrication", text: "Lubricant types, viscosity, lubrication methods, and the application of correct lubrication to different types of mechanical equipment. Proper lubrication is one of the most important maintenance skills in the millwright trade." },
    { name: "Power Transmission — Drives", text: "Belt drives, chain drives, and gear drives. Students learn drive selection, installation, tensioning, alignment, and maintenance. Drive system calculations including speed ratios and torque transmission are consistently tested." },
    { name: "Couplings", text: "Rigid and flexible coupling types, selection criteria, installation, and alignment requirements. Coupling misalignment and its effects on equipment are important diagnostic knowledge for millwrights." },
    { name: "Mechanical Clutches and Brakes", text: "Types of mechanical clutches and brakes, their operating principles, and maintenance requirements in industrial applications." },
    { name: "Pumps", text: "Centrifugal and positive displacement pump types, operating principles, performance curves, and maintenance. Pump knowledge is essential in most industrial environments where millwrights work." },
  ],
  howHelps: [
    "Hydraulic and pneumatic circuit interpretation is one of the most visually demanding aspects of the millwright curriculum — you need to be able to look at a schematic symbol and immediately understand what that component does and how it affects the system. TradeBenchPrep's question bank includes scenario-based questions that develop this applied understanding rather than simple recall.",
    "Drive system calculations are another area where practice matters more than reading. Working through speed ratio, torque, and tension calculations repeatedly in quiz and exam mode builds the speed and accuracy you need under exam conditions.",
  ],
  whatToExpect: [
    "The Year 2 exam tests your ability to understand and apply fluid power and power transmission knowledge. Hydraulic and pneumatic component identification and circuit interpretation are heavily represented. Drive system calculations appear consistently and require you to work through multi-step problems accurately.",
    "Lubrication questions are straightforward but reward apprentices who have studied lubricant selection and application systematically rather than just picking up general knowledge on the job.",
  ],
  tips: [
    "Learn hydraulic and pneumatic schematic symbols until they are automatic. Being able to read a circuit diagram quickly and accurately is foundational to answering scenario-based exam questions correctly.",
    "Work through drive calculation problems until the process is fluid. Speed ratio, torque multiplication, and belt tension calculations are mathematical topics that improve with repetition.",
    "Study pump curves and their interpretation. Understanding what a performance curve tells you about a centrifugal pump's operating point, efficiency, and cavitation risk is applied knowledge that distinguishes well-prepared candidates.",
  ],
  readyToStart: "Year 2 introduces some of the most interesting and complex systems in the millwright trade. Practice with curriculum-aligned content and go into your exam ready for whatever it brings.",
  readyHeading: "Ready to Start Practicing?",
});

addYearContent('millwright_3', {
  title: 'Millwright Year 3 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Prepare for your Year 3 millwright apprenticeship exam. Practice tests covering precision alignment, vibration analysis, and advanced mechanical systems.",
  h1: 'Millwright Year 3 Apprenticeship Exam Prep',
  intro: "Year 3 of the millwright apprenticeship moves into precision maintenance and advanced mechanical systems. Shaft alignment, vibration analysis, advanced hydraulics, and complex troubleshooting define this period. TradeBenchPrep provides exam prep specifically aligned to third period millwright content.",
  whatsCovered: [
    { name: "Precision Shaft Alignment", text: "Dial indicator alignment methods, laser alignment principles, soft foot correction, and the mathematics of shaft alignment including angularity and offset corrections. Precision alignment is one of the defining competencies of an experienced millwright and is heavily tested in Year 3." },
    { name: "Vibration Analysis", text: "Vibration theory, vibration measurement, common vibration signatures, and how to interpret vibration data to diagnose mechanical faults. Imbalance, misalignment, looseness, and bearing defect frequencies are the primary diagnostic categories covered." },
    { name: "Advanced Hydraulics", text: "Proportional and servo valve systems, hydraulic accumulators, heat exchangers, and complex hydraulic circuit analysis. Year 3 hydraulics builds significantly on the second period foundations." },
    { name: "Gearboxes and Speed Reducers", text: "Gear types, gearbox construction, lubrication requirements, backlash, and common failure modes. Gearbox inspection, maintenance, and repair procedures are covered in detail." },
    { name: "Compressors", text: "Reciprocating, rotary screw, and centrifugal compressor types, operating principles, maintenance procedures, and troubleshooting. Compressor knowledge is essential in oil and gas and heavy industrial environments." },
    { name: "Mechanical Troubleshooting", text: "Systematic troubleshooting methodology applied to complex mechanical systems. Year 3 emphasizes the diagnostic thinking process as much as specific technical knowledge." },
  ],
  howHelps: [
    "Precision alignment mathematics is an area where many apprentices struggle on the Year 3 exam despite being competent in the practical work. TradeBenchPrep's study mode walks through alignment calculations step by step so you understand the process well enough to apply it in any exam question format.",
    "Vibration analysis requires you to connect symptom patterns to root causes — a higher-order thinking skill that practice questions develop more effectively than reading. Working through TradeBenchPrep's quiz and exam content builds the pattern recognition that makes vibration questions more approachable.",
  ],
  whatToExpect: [
    "The Year 3 exam is the most technically demanding of the millwright apprenticeship to this point. Precision alignment, vibration analysis, and advanced hydraulics are the core topics where exam performance separates well-prepared apprentices from those who relied primarily on job experience.",
    "Troubleshooting scenario questions are common in Year 3 — they present a symptom or failure and ask you to identify the most likely cause and appropriate corrective action. These questions reward systematic thinking and broad knowledge of mechanical failure modes.",
  ],
  tips: [
    "Practice shaft alignment calculations until you can work through them quickly and accurately. Angularity and offset corrections, shim calculations, and soft foot diagnosis are all mathematical processes that improve with repetition.",
    "Study vibration signatures systematically. Learn the characteristic frequencies and patterns associated with imbalance, misalignment, looseness, and bearing defects. This systematic knowledge makes scenario questions significantly more manageable.",
    "Review compressor types carefully. The differences in operating principles, maintenance requirements, and failure modes between reciprocating, rotary screw, and centrifugal compressors are consistently tested.",
  ],
  readyToStart: "Year 3 millwright content is where precision and depth of knowledge matter most. Practice with curriculum-aligned questions and build the confidence you need for your third period exam.",
  readyHeading: "Ready to Start Practicing?",
});

addYearContent('millwright_4', {
  title: 'Millwright Year 4 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Study for your Year 4 millwright apprenticeship exam. Advanced systems, predictive maintenance, and industrial troubleshooting. curriculum aligned.",
  h1: 'Millwright Year 4 Apprenticeship Exam Prep',
  intro: "Year 4 is the final period of the millwright apprenticeship. Advanced predictive maintenance technologies, complex system troubleshooting, and the full integration of everything learned in the previous three years define this period. Passing your Year 4 exam qualifies you to challenge the Interprovincial exam for journeyman certification. TradeBenchPrep gives you the focused practice to finish your apprenticeship strong.",
  whatsCovered: [
    { name: "Predictive Maintenance Technologies", text: "Thermography, ultrasonic testing, oil analysis, and advanced vibration analysis as components of a complete predictive maintenance program. Understanding when and how to apply each technology is a key Year 4 competency." },
    { name: "Advanced Troubleshooting", text: "Complex multi-system troubleshooting scenarios integrating hydraulic, pneumatic, mechanical, and electrical systems. Year 4 troubleshooting questions require broad knowledge applied systematically." },
    { name: "Millwright Project Planning", text: "Planning and coordinating major mechanical installations and overhauls including sequencing, resource allocation, and documentation requirements." },
    { name: "Advanced Alignment and Balancing", text: "Field balancing of rotating equipment, advanced laser alignment applications, and alignment of complex multi-shaft systems." },
    { name: "Condition Monitoring Programs", text: "Design and implementation of condition monitoring and predictive maintenance programs in industrial facilities. Understanding the business and technical rationale for predictive maintenance strategies." },
    { name: "Review and Integration", text: "Year 4 content integrates and builds on all previous years. The breadth of the Year 4 exam reflects the full scope of the millwright trade from foundational mechanics through advanced diagnostics." },
  ],
  howHelps: [
    "The Year 4 millwright exam tests the full scope of the apprenticeship. TradeBenchPrep's full exam mode is the most valuable tool at this stage — it exposes you to the breadth of content you need to cover and ensures your time management is strong enough to work through a comprehensive exam confidently.",
    "Study mode remains valuable for any topic areas where Year 4 content extends beyond your practical experience, particularly predictive maintenance technologies and condition monitoring program design.",
  ],
  whatToExpect: [
    "The Year 4 exam is comprehensive. Every major topic area from the full four-year curriculum is potentially represented, with emphasis on the advanced content introduced in Years 3 and 4. Predictive maintenance, advanced troubleshooting, and complex alignment scenarios are the areas that most clearly distinguish strong candidates.",
  ],
  tips: [
    "Review predictive maintenance technologies thoroughly. Thermography, ultrasonic, vibration, and oil analysis each have specific applications, limitations, and interpretation requirements. Understanding when to apply each and what the results mean is the level of knowledge Year 4 demands.",
    "Run the full exam mode on TradeBenchPrep multiple times. At this stage in your apprenticeship, stamina and consistency across the full length of the exam matters as much as any individual topic knowledge.",
  ],
  readyToStart: "Year 4 is the finish line. Practice with curriculum-aligned content and go into your final period exam ready to earn your journeyman certification.",
  readyHeading: "Ready to Complete Your Millwright Apprenticeship?",
});

// --- Steamfitter/Pipefitter Year 1 ---
addYearContent('steamfitter-pipefitter_1', {
  title: 'Steamfitter Pipefitter Year 1 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Prepare for your Year 1 steamfitter/pipefitter apprenticeship exam. Practice questions and quizzes built on the curriculum. Start free today.",
  h1: 'Steamfitter / Pipefitter Year 1 Apprenticeship Exam Prep',
  intro: "Year 1 of the steamfitter/pipefitter apprenticeship builds the foundational knowledge every pipefitter needs — pipe materials, joining methods, tools, safety, and basic blueprint reading. TradeBenchPrep provides structured practice for all first period content so you are fully prepared for your Year 1 exam.",
  whatsCovered: [
    { name: "Pipe Materials", text: "Carbon steel, stainless steel, copper, and plastic piping materials. Students learn material properties, common applications, pressure and temperature ratings, and identification methods for each pipe material type." },
    { name: "Joining Methods", text: "Threaded, flanged, welded, soldered, brazed, and mechanical joining methods. Understanding when each method is appropriate and how to execute it correctly is foundational to pipefitter work." },
    { name: "Hand Tools and Power Tools", text: "Pipe cutting tools, threading equipment, bending equipment, and measuring tools specific to the pipefitting trade. Proper tool selection and safe use are tested throughout the apprenticeship." },
    { name: "Workplace Safety", text: "WHMIS, PPE, lockout/tagout, confined space awareness, and OHS regulations applicable to piping work. Safety is heavily weighted in Year 1 and remains critical throughout the entire program." },
    { name: "Blueprint Reading — Basic", text: "Orthographic projection, basic drawing symbols, piping and instrumentation diagram (P&ID) fundamentals, and isometric drawing interpretation. Blueprint reading ability is essential for every year of the apprenticeship." },
    { name: "Pipe Supports and Hangers", text: "Types of pipe supports, spacing requirements, and the importance of proper pipe support in system integrity and thermal expansion management." },
    { name: "Basic Piping Systems", text: "Introduction to domestic water systems, drain systems, and basic steam and condensate systems. Students learn how simple piping systems are designed and how fluid flows through them." },
  ],
  howHelps: [
    "Year 1 covers a broad range of foundational topics — broad enough that it can be difficult to know where to focus your study time. TradeBenchPrep's quiz mode lets you test yourself on specific topic areas so you can quickly identify where your knowledge is weakest and direct your effort accordingly.",
    "Study mode gives you full explanations with every answer, which is particularly valuable for pipe material and joining method questions where understanding the reasoning behind a correct answer matters for applying that knowledge on the job and in future exams.",
  ],
  whatToExpect: [
    "The Year 1 exam covers the full scope of first period technical training. Pipe materials, joining methods, and basic blueprint reading are consistently the most heavily represented topics. Safety content is always present and rewards thorough preparation.",
    "Blueprint reading questions require you to interpret drawings and extract information — a skill that improves with practice far more than with reading. Working through scenario-based questions that require blueprint interpretation is the most effective way to prepare for this portion of the exam.",
  ],
  tips: [
    "Study pipe material properties systematically. Knowing not just what each material is but when it is appropriate, what its limitations are, and how to identify it in the field is the level of knowledge the exam tests.",
    "Practice blueprint reading actively rather than passively. Work through drawings and P&ID diagrams and ask yourself specific questions about what you see — don't just look at them and assume familiarity equals understanding.",
    "Cover safety content thoroughly. WHMIS, lockout/tagout, and confined space awareness are topics where complete knowledge is expected. These are marks you should not leave on the table.",
  ],
  readyToStart: "TradeBenchPrep is free to start and built around the steamfitter/pipefitter curriculum. Start practicing now and go into your Year 1 exam with confidence.",
  readyHeading: "Ready to Start Practicing?",
});

addYearContent('steamfitter-pipefitter_2', {
  title: 'Steamfitter Pipefitter Year 2 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Study for your Year 2 steamfitter/pipefitter apprenticeship exam. Practice tests covering steam systems, hydronic heating, and intermediate piping codes.",
  h1: 'Steamfitter / Pipefitter Year 2 Apprenticeship Exam Prep',
  intro: "Year 2 of the steamfitter/pipefitter apprenticeship moves from foundational skills into applied system knowledge. Steam systems, hydronic heating, more complex blueprint reading, and intermediate piping code application define this period. TradeBenchPrep gives you targeted practice for all second period content.",
  whatsCovered: [
    { name: "Steam Systems", text: "Steam generation, steam distribution, steam traps, condensate return systems, and the thermodynamic principles that govern steam behaviour. Understanding steam systems thoroughly is central to the steamfitter trade." },
    { name: "Hydronic Heating Systems", text: "Hot water heating system design, circulation, expansion tanks, pressure relief valves, and balancing. Hydronic systems are common in commercial and institutional buildings and are heavily represented in Year 2 content." },
    { name: "Valves", text: "Gate, globe, ball, butterfly, check, and control valves. Students learn valve types, selection criteria, installation orientation, and maintenance requirements. Valve knowledge is tested throughout the entire apprenticeship." },
    { name: "Piping Codes — Intermediate", text: "B31.1 Power Piping and B31.3 Process Piping code requirements as they apply to second period work. Code navigation and application become increasingly important from Year 2 onward." },
    { name: "Advanced Blueprint Reading", text: "More complex piping isometrics, P&IDs, plan and elevation drawings, and equipment layout drawings. The ability to read and interpret increasingly complex drawings is a progressive skill tested at every level." },
    { name: "Insulation and Heat Tracing", text: "Pipe insulation types, applications, and installation requirements. Heat tracing systems and their role in preventing freezing and maintaining process temperatures." },
    { name: "Basic Welding for Pipefitters", text: "Introduction to welding processes used in piping — SMAW and GTAW — and the quality requirements that govern pipe welds. Pipefitters are not welders but must understand welding well enough to work effectively with welders and inspect weld quality." },
  ],
  howHelps: [
    "Steam system knowledge is one of the areas where classroom content and on-the-job experience can diverge — many apprentices work in environments where they see only parts of a steam system. TradeBenchPrep's study mode gives you complete coverage of the full steam system from boiler to condensate return, ensuring no gaps in your exam knowledge regardless of your site experience.",
    "Valve selection and code application questions are scenario-based and require applied thinking. The quiz and full exam modes develop the decision-making speed these questions require under exam conditions.",
  ],
  whatToExpect: [
    "Steam systems and hydronic heating are the dominant technical topics in the Year 2 exam. Valve selection and function questions appear consistently. Code application questions begin to require genuine code navigation ability rather than general awareness.",
    "Blueprint reading questions become more complex in Year 2 — expect to extract specific information from isometric drawings and P&IDs rather than just identify symbols.",
  ],
  tips: [
    "Study the complete steam cycle from generation through distribution and condensate return. Understanding how each component relates to the others in the system makes individual component questions significantly easier.",
    "Learn valve types and their correct applications systematically. The distinctions between when to use a gate valve versus a globe valve versus a ball valve — and why — are tested with more nuance than simply identifying the valve by name.",
    "Get comfortable navigating the B31.1 and B31.3 codes. Practice finding specific requirements quickly — code navigation speed directly affects exam performance on code application questions.",
  ],
  readyToStart: "Year 2 steamfitter/pipefitter content covers the systems you will work with throughout your career. Practice with curriculum-aligned questions and go into your exam prepared.",
  readyHeading: "Ready to Start Practicing?",
});

addYearContent('steamfitter-pipefitter_3', {
  title: 'Steamfitter Pipefitter Year 3 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Prepare for your Year 3 steamfitter/pipefitter apprenticeship exam. Advanced piping systems, process piping, and code mastery. curriculum aligned.",
  h1: 'Steamfitter / Pipefitter Year 3 Apprenticeship Exam Prep',
  intro: "Year 3 of the steamfitter/pipefitter apprenticeship advances into industrial process piping, refrigeration systems, and more complex code requirements. This is where the technical depth of the trade becomes most apparent. TradeBenchPrep provides practice specifically aligned to third period content.",
  whatsCovered: [
    { name: "Process Piping Systems", text: "Industrial process piping design, materials selection for corrosive and high-temperature applications, piping flexibility and stress analysis fundamentals, and complex system layout." },
    { name: "Refrigeration Systems", text: "Refrigeration cycle fundamentals, refrigerants, compressors, condensers, evaporators, and expansion devices. Refrigeration system installation, commissioning, and maintenance are covered in detail." },
    { name: "Advanced Piping Codes", text: "Deeper application of B31.1 and B31.3 with emphasis on industrial piping scenarios, material specifications, examination and testing requirements, and documentation." },
    { name: "Pressure Testing", text: "Hydrostatic and pneumatic pressure testing procedures, test requirements, documentation, and safety precautions. Pressure testing is a critical quality assurance step in piping installation." },
    { name: "Instrumentation for Pipefitters", text: "Process instrumentation including pressure gauges, temperature instruments, flow meters, and control valves. Understanding how instrumentation integrates with piping systems is important in industrial environments." },
    { name: "Advanced Blueprint Reading", text: "Complex multi-disciplinary drawings, equipment datasheets, line lists, and tie-in drawings. Year 3 blueprint reading reflects the complexity of industrial project documentation." },
  ],
  howHelps: [
    "Refrigeration system knowledge is an area where many pipefitters have limited on-the-job exposure but significant exam representation. TradeBenchPrep ensures complete curriculum coverage regardless of your site experience, with study mode explanations that build understanding from first principles.",
    "Code application questions at the Year 3 level require you to work with multiple code sections together and apply them to complex scenarios. Full exam mode develops the systematic thinking and time management these questions require.",
  ],
  whatToExpect: [
    "Process piping and refrigeration systems are the most technically demanding new topics in Year 3. Code application questions are more complex than in previous years, often requiring you to cross-reference multiple sections and apply them to realistic industrial scenarios. Pressure testing procedures and documentation requirements are consistently represented.",
  ],
  tips: [
    "Study the refrigeration cycle until you can trace refrigerant through the complete system and explain what happens at each component. This systems-level understanding makes individual component questions and troubleshooting scenarios significantly more manageable.",
    "Practice pressure testing procedures and know the specific requirements for hydrostatic versus pneumatic testing — safety precautions, pressure levels, hold times, and acceptance criteria are all testable details.",
  ],
  readyToStart: "Year 3 steamfitter/pipefitter content represents the industrial depth of the trade. Practice with curriculum-aligned questions and go into your third period exam confident.",
  readyHeading: "Ready to Start Practicing?",
});

addYearContent('steamfitter-pipefitter_4', {
  title: 'Steamfitter Pipefitter Year 4 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Study for your Year 4 steamfitter/pipefitter apprenticeship exam. Advanced industrial piping, system commissioning, and full curriculum coverage.",
  h1: 'Steamfitter / Pipefitter Year 4 Apprenticeship Exam Prep',
  intro: "Year 4 is the final period of the steamfitter/pipefitter apprenticeship. Advanced industrial systems, system commissioning, project coordination, and comprehensive code mastery define this period. Completing Year 4 qualifies you to challenge the Interprovincial exam for journeyman certification. TradeBenchPrep gives you everything you need to finish your apprenticeship strong.",
  whatsCovered: [
    { name: "Advanced Industrial Systems", text: "High-pressure and high-temperature piping systems, specialty alloy piping, cryogenic systems, and other advanced industrial applications. The full breadth of what the steamfitter/pipefitter trade covers in industrial environments." },
    { name: "System Commissioning", text: "Pre-commissioning checks, flushing procedures, system startup sequences, and performance verification. Commissioning knowledge is essential for industrial pipefitters and is represented on the Year 4 exam." },
    { name: "Project Coordination", text: "Planning and coordinating piping installations, managing tie-ins and shutdowns, and understanding the pipefitter's role within a broader industrial project." },
    { name: "Comprehensive Code Mastery", text: "Full integration of B31.1, B31.3, and other applicable codes across the complete range of piping scenarios encountered in industrial work. Year 4 code questions test mastery, not just familiarity." },
    { name: "Review and Integration", text: "The Year 4 exam draws from the complete four-year curriculum with emphasis on the most advanced content. Comprehensive preparation across all years is essential." },
  ],
  howHelps: [
    "At Year 4, the exam covers the full scope of the steamfitter/pipefitter trade. TradeBenchPrep's full exam mode is the most valuable preparation tool — it exposes you to the complete range of content and builds the stamina and time management you need to perform consistently across a comprehensive exam.",
  ],
  whatToExpect: [
    "The Year 4 exam is the most comprehensive of the apprenticeship. Advanced system knowledge, code mastery, and the ability to apply everything from the previous three years to complex scenarios are what separate candidates who pass comfortably from those who struggle. Commissioning procedures and project coordination are Year 4-specific topics that reward dedicated study.",
  ],
  tips: [
    "Run multiple full practice exams in the weeks before your actual exam. At this stage, consistency across the full range of content matters as much as depth in any one area. Use the results from each practice exam to direct your remaining study time.",
    "Review commissioning procedures specifically — this content is Year 4 specific and may not be reinforced by your on-the-job experience depending on your work environment.",
  ],
  readyToStart: "Year 4 is the final step before your journeyman certification. Practice with curriculum-aligned content and go into your exam ready to finish what you started.",
  readyHeading: "Ready to Complete Your Apprenticeship?",
});

// --- Welder Year 1 ---
addYearContent('welder_1', {
  title: 'Welder Year 1 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Prepare for your Year 1 welder apprenticeship exam. Practice questions and quizzes built on the welding curriculum. Start free today.",
  h1: 'Welder Year 1 Apprenticeship Exam Prep',
  intro: "Year 1 of the welder apprenticeship introduces the foundational knowledge every welder needs — basic metallurgy, SMAW process fundamentals, safety, blueprint reading, and joint design. TradeBenchPrep provides structured practice for all first period content so you go into your Year 1 exam fully prepared.",
  whatsCovered: [
    { name: "Workplace Safety", text: "WHMIS, PPE for welding environments including respiratory protection, fire prevention, electrical safety, and fume and gas hazards. Welding safety is comprehensive and heavily weighted in Year 1 exams." },
    { name: "Basic Metallurgy", text: "Metal identification, properties of ferrous and non-ferrous metals, and how metal properties affect weldability. Understanding what you are welding is foundational to producing quality welds." },
    { name: "SMAW — Shielded Metal Arc Welding", text: "The SMAW process is the primary welding process in Year 1. Students learn arc characteristics, electrode selection and classification, welding parameters, and the welding positions. SMAW theory is extensively tested in Year 1." },
    { name: "Electrode Classification", text: "AWS electrode classification system for SMAW electrodes. Being able to read an electrode classification and understand what it tells you about the electrode's characteristics and applications is a core Year 1 competency." },
    { name: "Joint Design and Weld Symbols", text: "Weld joint types, weld types, and the AWS welding symbol system. Reading welding symbols from drawings and understanding joint design requirements are consistently tested skills." },
    { name: "Blueprint Reading for Welders", text: "Basic engineering drawings, orthographic projection, and the specific drawing conventions used in fabrication and structural welding." },
    { name: "Basic Welding Codes", text: "Introduction to welding codes and standards including W47.1 and CSA W59. Understanding why codes exist and what they govern is the foundation for more detailed code application in subsequent years." },
  ],
  howHelps: [
    "SMAW electrode classification and weld symbol interpretation are two areas where thorough study pays significant dividends on the Year 1 exam. These are systematic knowledge areas — once you understand the classification system, you can interpret any electrode or symbol you encounter. TradeBenchPrep's study mode builds this systematic understanding with explanations that go beyond just the correct answer.",
    "Safety content is broad in Year 1 and covers welding-specific hazards that are distinct from general workplace safety. TradeBenchPrep's Year 1 content ensures complete coverage of all safety topics relevant to the welding trade.",
  ],
  whatToExpect: [
    "The Year 1 welder exam covers the full scope of first period technical training. SMAW theory, electrode classification, joint design, weld symbols, and workplace safety are the core areas. Metallurgy questions in Year 1 focus on identification and basic properties rather than complex metallurgical concepts — those come in later years.",
    "Blueprint reading and weld symbol interpretation appear consistently and require active preparation — passive familiarity is not enough to perform well on these questions under exam conditions.",
  ],
  tips: [
    "Learn the AWS electrode classification system until you can decode any SMAW electrode designation without hesitation. E6011, E7018, E6010 — know what each digit and letter tells you about the electrode and when you would use each one.",
    "Study weld symbols systematically. Work through the complete AWS weld symbol system including the arrow side/other side convention, tail, and all common weld type symbols. These are precise and require careful study.",
    "Cover all welding safety topics thoroughly. Fume and gas hazards, fire prevention, electrical safety, and PPE requirements specific to welding are all testable and reward complete preparation.",
  ],
  readyToStart: "TradeBenchPrep is free to start and built around the welder curriculum. Start practicing today and go into your Year 1 exam prepared.",
  readyHeading: "Ready to Start Practicing?",
});

addYearContent('welder_2', {
  title: 'Welder Year 2 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Study for your Year 2 welder apprenticeship exam. Practice tests covering GMAW, FCAW, GTAW, intermediate metallurgy, and welding codes. aligned.",
  h1: 'Welder Year 2 Apprenticeship Exam Prep',
  intro: "Year 2 of the welder apprenticeship expands your process knowledge significantly — GMAW, FCAW, and GTAW join SMAW as processes you must understand thoroughly. Intermediate metallurgy, distortion control, and more detailed code application define this period. TradeBenchPrep provides targeted practice for all second period welding content.",
  whatsCovered: [
    { name: "GMAW — Gas Metal Arc Welding", text: "MIG welding process fundamentals including shielding gas selection, wire classification, transfer modes (short circuit, globular, spray, and pulse), welding parameters, and common defects. GMAW theory is extensively tested in Year 2." },
    { name: "FCAW — Flux Cored Arc Welding", text: "Self-shielded and gas-shielded FCAW processes, wire classification, applications, and advantages compared to other processes. Understanding when FCAW is the appropriate process choice is key knowledge." },
    { name: "GTAW — Gas Tungsten Arc Welding", text: "TIG welding fundamentals including tungsten electrode selection and preparation, shielding gases, filler metal selection, and AC versus DC current for different base metals. GTAW is used for precision and root pass welding and has significant exam representation." },
    { name: "Intermediate Metallurgy", text: "Phase diagrams, heat affected zones, preheat and interpass temperature requirements, and post-weld heat treatment. Understanding how heat affects metal microstructure is critical to producing quality welds and avoiding weld defects." },
    { name: "Distortion Control", text: "Causes of weld distortion, pre-weld fixturing, welding sequence strategies, and post-weld straightening methods. Distortion control is a practical knowledge area with consistent exam representation." },
    { name: "Weld Defects and Inspection", text: "Types of weld defects, their causes, and prevention methods. Visual inspection techniques and the criteria for acceptable and rejectable weld quality under common welding codes." },
    { name: "Welding Codes — Intermediate", text: "More detailed application of CSA W59 structural welding requirements and introduction to CWB certification requirements. Understanding the relationship between welding procedures, welder qualification, and code compliance." },
  ],
  howHelps: [
    "The jump from Year 1 to Year 2 in terms of process knowledge is significant. Adding GMAW, FCAW, and GTAW to your exam preparation alongside intermediate metallurgy creates a large volume of material. TradeBenchPrep's quiz mode lets you isolate specific process areas so you can develop confidence in each one before testing yourself across the full Year 2 curriculum in exam mode.",
    "Metallurgy is the area where many practical welders feel least prepared for the exam — it is more theoretical than other Year 2 content. TradeBenchPrep's study mode explanations build the conceptual understanding that makes metallurgy questions approachable.",
  ],
  whatToExpect: [
    "GMAW and GTAW theory are the most heavily represented new process topics in Year 2. GMAW transfer modes and shielding gas selection, GTAW tungsten preparation and current selection, and the differences between self-shielded and gas-shielded FCAW are all areas with significant exam presence.",
    "Metallurgy questions in Year 2 move beyond basic identification into heat effects and welding procedure requirements. Preheat and interpass temperature questions require understanding of why these requirements exist, not just what the numbers are.",
  ],
  tips: [
    "Study GMAW transfer modes in detail. The distinctions between short circuit, globular, spray, and pulse transfer — what parameters produce each, what each looks like, and when each is appropriate — are consistently tested and require systematic study.",
    "Learn GTAW tungsten electrode types and their correct applications. Pure tungsten, thoriated tungsten, and ceriated tungsten have different applications for different base metals and current types. This is specific knowledge that rewards careful study.",
    "Review preheat and post-weld heat treatment requirements from a reasoning perspective. Understanding why carbon equivalent affects preheat requirements makes the specific requirements more memorable and easier to apply in exam questions.",
  ],
  readyToStart: "Year 2 significantly expands your process knowledge and technical depth. Practice with curriculum-aligned content and go into your second period exam ready.",
  readyHeading: "Ready to Start Practicing?",
});

addYearContent('welder_3', {
  title: 'Welder Year 3 Exam Prep | Apprenticeship Practice Test | TradeBenchPrep',
  metaDescription: "Prepare for your Year 3 welder apprenticeship exam. Advanced welding processes, metallurgy, pressure vessel codes, and curriculum coverage.",
  h1: 'Welder Year 3 Apprenticeship Exam Prep',
  intro: "Year 3 is the final period of the welder apprenticeship and the most technically advanced. Advanced metallurgy, pressure vessel and pressure piping codes, SAW and specialty processes, and comprehensive quality assurance define this period. Completing Year 3 qualifies you to challenge the Interprovincial exam for journeyman certification. TradeBenchPrep gives you the focused practice to finish your apprenticeship at the highest level.",
  whatsCovered: [
    { name: "Advanced Metallurgy", text: "Stainless steel metallurgy, sensitization, carbide precipitation, and the welding considerations for austenitic, ferritic, and duplex stainless steels. Aluminum metallurgy, heat treatable alloys, and the specific challenges of welding aluminum. Advanced heat treatment processes and their effects on weld zone properties." },
    { name: "SAW — Submerged Arc Welding", text: "Process fundamentals, flux and wire classification, parameters, and applications. SAW is used extensively in heavy fabrication and pressure vessel manufacturing and is represented on the Year 3 exam." },
    { name: "Pressure Vessel Code — ASME Section VIII", text: "The ASME Boiler and Pressure Vessel Code as it applies to welded pressure vessel fabrication. Code requirements for welding procedures, welder qualification, inspection, and testing of pressure vessels." },
    { name: "Pressure Piping Code", text: "CSA Z662 and other pressure piping codes applicable to pipeline and process piping welding. Welding procedure and qualification requirements for pressure piping work." },
    { name: "Non-Destructive Examination", text: "Radiographic testing, ultrasonic testing, magnetic particle testing, and liquid penetrant testing. Understanding what each NDE method detects, its limitations, and how it is applied to weld inspection." },
    { name: "Welding Procedure Specifications", text: "Understanding, reading, and applying Welding Procedure Specifications (WPS) and Procedure Qualification Records (PQR). The CWB certification system and essential variables that require re-qualification." },
    { name: "Weld Quality and Fitness for Service", text: "Advanced weld quality assessment, fitness for service evaluation concepts, and the relationship between weld defects and structural integrity." },
  ],
  howHelps: [
    "Year 3 welding content is the most technically specialized of the entire apprenticeship. Pressure vessel code, stainless steel metallurgy, and NDE interpretation are areas where on-the-job exposure varies widely — some apprentices have extensive experience with this content while others have had little. TradeBenchPrep ensures complete coverage of the full Year 3 curriculum regardless of your specific work history.",
    "The full exam mode is essential preparation at this stage. Year 3 is a comprehensive exam and the ability to sustain strong performance across the full length of the exam is as important as any individual topic knowledge.",
  ],
  whatToExpect: [
    "The Year 3 exam is the most demanding and comprehensive of the welding apprenticeship. Advanced metallurgy, pressure code requirements, and welding procedure specification knowledge are the areas that most clearly separate candidates who have prepared thoroughly from those who have not. NDE method selection and capability questions reward systematic study of each method's strengths and limitations.",
    "The exam draws from the complete three-year curriculum — foundational knowledge from Years 1 and 2 remains testable and should not be neglected in Year 3 preparation.",
  ],
  tips: [
    "Study stainless steel metallurgy carefully — specifically sensitization and intergranular corrosion, heat input control requirements, and why different grades of stainless steel have different welding considerations. These are topics where theoretical knowledge matters as much as practical experience.",
    "Learn the ASME Section VIII and CSA Z662 code structures. Know what each code governs, what the key requirements are for welding procedure qualification, and how welder qualification under each code works.",
    "Review all NDE methods systematically — what each detects, what it cannot detect, what surface or material conditions are required, and how results are interpreted. This is a broad topic area with consistent exam presence.",
    "Run multiple full practice exams in your final weeks of preparation. Year 3 is a comprehensive exam that rewards both depth of knowledge and the stamina to apply it consistently from start to finish.",
  ],
  readyToStart: "Year 3 is the final step before your journeyman certification. Practice with curriculum-aligned content and go into your final period exam ready to earn the certification you have worked toward.",
  readyHeading: "Ready to Complete Your Welding Apprenticeship?",
});

export function getTradeYearContent(tradeSlug, year) {
  const key = `${tradeSlug}_${year}`;
  return YEAR_CONTENT_NEW[key] ?? YEAR_CONTENT[key] ?? null;
}
