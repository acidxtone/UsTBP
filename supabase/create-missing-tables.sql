-- =============================================================================
-- Create ONLY missing tables for TradeBench (Supabase)
-- Safe to run: uses IF NOT EXISTS and does not alter existing tables.
-- Existing tables (do not touch): bookmarks, profiles, questions, quiz_sessions,
--                                 study_guides, user_progress
-- =============================================================================

-- 1. user_activity_logs (used by appLogs.logUserInApp / NavigationTracker)
--    Fixes: "Could not find the table 'public.user_activity_logs'"
CREATE TABLE IF NOT EXISTS public.user_activity_logs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  action TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

COMMENT ON TABLE public.user_activity_logs IS 'App activity events (e.g. app_login) for analytics';

-- Index for listing by user and time
CREATE INDEX IF NOT EXISTS idx_user_activity_logs_user_created
  ON public.user_activity_logs(user_id, created_at DESC);

-- RLS
ALTER TABLE public.user_activity_logs ENABLE ROW LEVEL SECURITY;

-- Users can only insert their own rows (no read needed for current app usage)
CREATE POLICY "Users can insert own activity logs"
  ON public.user_activity_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

-- Optional: allow users to read their own logs if you add that later
CREATE POLICY "Users can read own activity logs"
  ON public.user_activity_logs FOR SELECT
  USING (auth.uid() = user_id);


-- 2. quiz_attempts (used by supabaseClient.js QuizAttempt entity)
--    Separate from quiz_sessions; used for attempt history / stats
CREATE TABLE IF NOT EXISTS public.quiz_attempts (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  completed_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  score INTEGER,
  total_questions INTEGER,
  quiz_mode TEXT,
  -- Any extra payload from the app
  attempt_data JSONB DEFAULT '{}'
);

COMMENT ON TABLE public.quiz_attempts IS 'Quiz attempt records (history/stats); distinct from quiz_sessions';

CREATE INDEX IF NOT EXISTS idx_quiz_attempts_user_completed
  ON public.quiz_attempts(user_id, completed_at DESC NULLS LAST);

-- RLS
ALTER TABLE public.quiz_attempts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own quiz attempts"
  ON public.quiz_attempts FOR ALL
  USING (auth.uid() = user_id)
  WITH CHECK (auth.uid() = user_id);
