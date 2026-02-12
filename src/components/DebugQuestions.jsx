/**
 * Debug Questions Component - Focused Debugging Tool
 * Shows exactly what questions are loaded and how they're filtered
 */

import React, { useState, useEffect } from 'react';
import { api } from '@/api/supabaseClient';

export default function DebugQuestions() {
  const [allQuestions, setAllQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedYear, setSelectedYear] = useState(3);
  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    loadAllQuestions();
  }, []);

  useEffect(() => {
    filterQuestionsByYear();
  }, [allQuestions, selectedYear]);

  async function loadAllQuestions() {
    try {
      console.log('🔍 Debug: Loading all questions...');
      const questions = await api.entities.Question.filter({});
      console.log('📊 Debug: All questions loaded:', questions.length);
      console.log('📋 Debug: Sample questions:', questions.slice(0, 3));
      setAllQuestions(questions);
    } catch (error) {
      console.error('❌ Debug: Error loading questions:', error);
    } finally {
      setLoading(false);
    }
  }

  function filterQuestionsByYear() {
    console.log(`🔍 Debug: Filtering questions for year ${selectedYear}...`);
    
    const filtered = allQuestions.filter(q => {
      const matches = q.year === selectedYear;
      console.log(`📝 Debug: Question ${q.id} - Year: ${q.year}, Matches: ${matches}`);
      return matches;
    });

    console.log(`📊 Debug: Filtered ${filtered.length} questions for year ${selectedYear}`);
    setFilteredQuestions(filtered);
  }

  if (loading) {
    return (
      <div style={{ padding: '20px', fontFamily: 'monospace' }}>
        <h2>🔍 Debug Questions - Loading...</h2>
      </div>
    );
  }

  return (
    <div style={{ padding: '20px', fontFamily: 'monospace', backgroundColor: '#f5f5f5' }}>
      <h2>🔍 Debug Questions Component</h2>
      
      {/* Summary */}
      <div style={{ marginBottom: '20px', padding: '10px', backgroundColor: '#e3f2fd', borderRadius: '5px' }}>
        <h3>📊 Summary</h3>
        <p><strong>Total Questions in Database:</strong> {allQuestions.length}</p>
        <p><strong>Selected Year:</strong> {selectedYear}</p>
        <p><strong>Filtered Questions:</strong> {filteredQuestions.length}</p>
      </div>

      {/* Year Selector */}
      <div style={{ marginBottom: '20px' }}>
        <h3>🎯 Year Selector</h3>
        <select 
          value={selectedYear} 
          onChange={(e) => setSelectedYear(Number(e.target.value))}
          style={{ padding: '10px', fontSize: '16px' }}
        >
          <option value={1}>Year 1</option>
          <option value={2}>Year 2</option>
          <option value={3}>Year 3</option>
          <option value={4}>Year 4</option>
        </select>
      </div>

      {/* Questions Display */}
      <div style={{ marginBottom: '20px' }}>
        <h3>📋 Questions for Year {selectedYear}</h3>
        {filteredQuestions.length === 0 ? (
          <p style={{ color: 'red' }}>❌ No questions found for Year {selectedYear}</p>
        ) : (
          <div>
            {filteredQuestions.map((q, index) => (
              <div 
                key={q.id} 
                style={{ 
                  marginBottom: '15px', 
                  padding: '10px', 
                  backgroundColor: 'white', 
                  border: '1px solid #ddd',
                  borderRadius: '5px'
                }}
              >
                <p><strong>Question {index + 1}:</strong> {q.question_text}</p>
                <p><strong>ID:</strong> {q.id}</p>
                <p><strong>Year:</strong> {q.year} | <strong>Section:</strong> {q.section}</p>
                <p><strong>Options:</strong></p>
                <ul>
                  <li>A: {q.option_a}</li>
                  <li>B: {q.option_b}</li>
                  <li>C: {q.option_c}</li>
                  <li>D: {q.option_d}</li>
                </ul>
                <p><strong>Correct Answer:</strong> {q.correct_answer}</p>
                {q.explanation && <p><strong>Explanation:</strong> {q.explanation}</p>}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Console Instructions */}
      <div style={{ padding: '10px', backgroundColor: '#fff3cd', borderRadius: '5px' }}>
        <h3>🔍 Debug Instructions</h3>
        <p>1. Open browser console (F12)</p>
        <p>2. Look for "Debug:" messages</p>
        <p>3. Compare with your quiz component filtering</p>
        <p>4. Identify where questions are being filtered out</p>
      </div>
    </div>
  );
}
