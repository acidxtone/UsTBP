-- =============================================================================
-- Study Guides table for TradeBenchPrep
-- Run this in Supabase SQL Editor so the /Study "Study Guides" section can
-- be populated. The app reads from this table filtered by year.
-- =============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Table: study_guides
-- One row per study guide. App shows them on Study page by user's selected year.
CREATE TABLE IF NOT EXISTS public.study_guides (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  year INTEGER NOT NULL,
  section TEXT,
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Column purpose (for reference)
COMMENT ON TABLE public.study_guides IS 'Study guide content per year; used by the Study page.';
COMMENT ON COLUMN public.study_guides.id IS 'Primary key (auto-generated).';
COMMENT ON COLUMN public.study_guides.year IS 'Year (1, 2, 3, 4). Must match user selected year to appear on Study page.';
COMMENT ON COLUMN public.study_guides.section IS 'Section/category label (e.g. Section A, Piping). Used for filter chips and card badge.';
COMMENT ON COLUMN public.study_guides.title IS 'Display title of the guide.';
COMMENT ON COLUMN public.study_guides.content IS 'Body text of the guide (plain or markdown).';
COMMENT ON COLUMN public.study_guides.created_at IS 'When the row was created.';
COMMENT ON COLUMN public.study_guides.updated_at IS 'When the row was last updated (auto-set by trigger).';

-- Indexes so the app can filter by year and section efficiently
CREATE INDEX IF NOT EXISTS idx_study_guides_year ON public.study_guides(year);
CREATE INDEX IF NOT EXISTS idx_study_guides_section ON public.study_guides(section);

-- Row Level Security: allow anyone to read (app needs to show guides to logged-in users)
ALTER TABLE public.study_guides ENABLE ROW LEVEL SECURITY;

DROP POLICY IF EXISTS "Study guides are publicly viewable" ON public.study_guides;
CREATE POLICY "Study guides are publicly viewable" ON public.study_guides
  FOR SELECT USING (true);

-- Optional: allow authenticated users to insert/update/delete (e.g. for admin or migration)
-- Uncomment if you want the app or migrations to write to this table:
-- DROP POLICY IF EXISTS "Authenticated users can manage study guides" ON public.study_guides;
-- CREATE POLICY "Authenticated users can manage study guides" ON public.study_guides
--   FOR ALL USING (auth.role() = 'authenticated');

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION public.handle_study_guides_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS handle_study_guides_updated_at ON public.study_guides;
CREATE TRIGGER handle_study_guides_updated_at
  BEFORE UPDATE ON public.study_guides
  FOR EACH ROW EXECUTE FUNCTION public.handle_study_guides_updated_at();

-- =============================================================================
-- Example: insert a few rows so the section is not blank (adjust year to match your app)
-- =============================================================================
-- INSERT INTO public.study_guides (year, section, title, content) VALUES
--   (1, 'Section A', 'Introduction to Piping', 'This guide covers basic piping concepts and safety.'),
--   (1, 'Section A', 'Tools and Materials', 'Overview of common tools and materials used in the trade.'),
--   (1, 'Section B', 'Blueprint Reading', 'How to read and interpret piping blueprints.');
-- =============================================================================
