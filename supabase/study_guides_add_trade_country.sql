-- Add trade and country to study_guides for dynamic sections per trade/year.
-- Run in Supabase SQL Editor when you are ready to use trade-specific study guides.
-- Existing rows get default trade 'steamfitter_pipefitter' and country 'CA' so current data still shows.

ALTER TABLE public.study_guides
  ADD COLUMN IF NOT EXISTS trade TEXT,
  ADD COLUMN IF NOT EXISTS country TEXT;

UPDATE public.study_guides
SET trade = COALESCE(trade, 'steamfitter_pipefitter'),
    country = COALESCE(country, 'CA')
WHERE trade IS NULL OR country IS NULL;

-- Optional: add section_text if your CSV uses it for display names (section stays as number or code)
ALTER TABLE public.study_guides
  ADD COLUMN IF NOT EXISTS section_text TEXT;

CREATE INDEX IF NOT EXISTS idx_study_guides_trade ON public.study_guides(trade);
CREATE INDEX IF NOT EXISTS idx_study_guides_year_trade ON public.study_guides(year, trade);

COMMENT ON COLUMN public.study_guides.trade IS 'Trade slug: steamfitter_pipefitter, electrician, millwright, welder';
COMMENT ON COLUMN public.study_guides.country IS 'Country code, e.g. CA';
COMMENT ON COLUMN public.study_guides.section_text IS 'Display name for section (e.g. "Workplace Safety and Rigging")';
