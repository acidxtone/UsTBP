-- Create Questions Table for TradeBench
-- Run this in your Supabase dashboard SQL Editor

CREATE TABLE IF NOT EXISTS public.questions (
  id TEXT PRIMARY KEY,
  year INTEGER NOT NULL,
  section INTEGER NOT NULL,
  section_name TEXT NOT NULL,
  difficulty TEXT CHECK (difficulty IN ('easy', 'medium', 'hard', 'journeyman')),
  question_text TEXT NOT NULL,
  option_a TEXT NOT NULL,
  option_b TEXT NOT NULL,
  option_c TEXT NOT NULL,
  option_d TEXT NOT NULL,
  correct_answer TEXT CHECK (correct_answer IN ('A', 'B', 'C', 'D')),
  explanation TEXT,
  reference TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Questions are publicly readable" ON public.questions
FOR SELECT USING (true);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_questions_year_section ON public.questions(year, section);
CREATE INDEX IF NOT EXISTS idx_questions_id ON public.questions(id);
