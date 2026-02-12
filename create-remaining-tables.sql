-- Create Quiz Sessions Table
CREATE TABLE IF NOT EXISTS public.quiz_sessions (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE,
  year INTEGER NOT NULL,
  quiz_mode TEXT NOT NULL,
  questions JSONB NOT NULL,
  answers JSONB DEFAULT '{}',
  score INTEGER DEFAULT 0,
  total_questions INTEGER DEFAULT 0,
  time_taken INTEGER DEFAULT 0,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create Study Guides Table  
CREATE TABLE IF NOT EXISTS public.study_guides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  year INTEGER NOT NULL,
  section TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE public.quiz_sessions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.study_guides ENABLE ROW LEVEL SECURITY;

-- Quiz Sessions Policies
CREATE POLICY "Users can manage own quiz sessions" ON public.quiz_sessions
FOR ALL USING (auth.uid() = user_id);

-- Study Guides Policies  
CREATE POLICY "Study guides are publicly viewable" ON public.study_guides
FOR SELECT USING (true);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_quiz_sessions_user_year ON public.quiz_sessions(user_id, year);
CREATE INDEX IF NOT EXISTS idx_study_guides_year ON public.study_guides(year);
CREATE INDEX IF NOT EXISTS idx_study_guides_section ON public.study_guides(section);
