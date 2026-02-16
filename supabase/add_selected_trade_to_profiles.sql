-- Add selected_trade to profiles for trade selection (SF, E, M, W).
-- Run in Supabase SQL Editor if your profiles table doesn't have this column yet.

ALTER TABLE profiles
  ADD COLUMN IF NOT EXISTS selected_trade text DEFAULT 'SF';

UPDATE profiles
SET selected_trade = COALESCE(selected_trade, 'SF')
WHERE selected_trade IS NULL;
