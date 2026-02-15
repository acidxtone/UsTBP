-- =============================================================================
-- Add "topics" to study_guides so the Study page can show "X topics" per card.
-- Run this in Supabase SQL Editor after study_guides table exists and has rows.
-- =============================================================================

-- Add column: array of topic strings (JSONB). App expects guide.topics to be an array.
ALTER TABLE public.study_guides
  ADD COLUMN IF NOT EXISTS topics JSONB NOT NULL DEFAULT '[]';

COMMENT ON COLUMN public.study_guides.topics IS 'Array of topic names for this guide, e.g. ["Safety", "Tools"]. Shown as "X topics" on Study page.';

-- Populate sample topics for each guide (match by year + title).
-- Adjust topic names to match your curriculum; re-run the UPDATEs as needed.

UPDATE public.study_guides SET topics = '["Piping basics", "Safety", "Tools"]'::jsonb WHERE year = 1 AND title = 'Introduction to Piping';
UPDATE public.study_guides SET topics = '["Tools", "Materials", "Steamfitting"]'::jsonb WHERE year = 1 AND title = 'Tools and Materials';
UPDATE public.study_guides SET topics = '["Blueprints", "Drawings", "Symbols"]'::jsonb WHERE year = 1 AND title = 'Blueprint Reading';
UPDATE public.study_guides SET topics = '["Layout", "Measurement", "Cutting"]'::jsonb WHERE year = 1 AND title = 'Pipe Layout and Measurement';

UPDATE public.study_guides SET topics = '["Commercial systems", "Industrial piping", "Maintenance"]'::jsonb WHERE year = 2 AND title = 'Intermediate Piping Systems';
UPDATE public.study_guides SET topics = '["Valves", "Fittings", "Installation"]'::jsonb WHERE year = 2 AND title = 'Valves and Fittings';
UPDATE public.study_guides SET topics = '["Welding", "Joining", "Pipe and fittings"]'::jsonb WHERE year = 2 AND title = 'Welding and Joining';
UPDATE public.study_guides SET topics = '["ASME", "CSA", "Codes and standards"]'::jsonb WHERE year = 2 AND title = 'Codes and Standards';

UPDATE public.study_guides SET topics = '["HVAC", "Process piping", "Specialty systems"]'::jsonb WHERE year = 3 AND title = 'Advanced Systems';
UPDATE public.study_guides SET topics = '["Troubleshooting", "Repair", "Diagnostics"]'::jsonb WHERE year = 3 AND title = 'Troubleshooting and Repair';
UPDATE public.study_guides SET topics = '["Planning", "Scheduling", "Coordination"]'::jsonb WHERE year = 3 AND title = 'Project Planning';
UPDATE public.study_guides SET topics = '["Safety", "Documentation", "Handover"]'::jsonb WHERE year = 3 AND title = 'Safety and Documentation';

UPDATE public.study_guides SET topics = '["Theory", "Codes", "Red Seal"]'::jsonb WHERE year = 4 AND title = 'Red Seal Preparation - Theory';
UPDATE public.study_guides SET topics = '["Practical skills", "Procedures", "Red Seal exam"]'::jsonb WHERE year = 4 AND title = 'Red Seal Preparation - Practical';
UPDATE public.study_guides SET topics = '["Review", "Practice questions", "Red Seal readiness"]'::jsonb WHERE year = 4 AND title = 'Final Review and Practice';
