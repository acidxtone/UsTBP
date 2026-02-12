-- Final Questions Table - Clean Version
-- Delete old table and create fresh

DROP TABLE IF EXISTS public.questions CASCADE;

CREATE TABLE public.questions (
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

-- Enable RLS
ALTER TABLE public.questions ENABLE ROW LEVEL SECURITY;

-- Public read policy
CREATE POLICY "Questions are publicly readable" ON public.questions
FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_questions_year_section ON public.questions(year, section);
CREATE INDEX IF NOT EXISTS idx_questions_id ON public.questions(id);
