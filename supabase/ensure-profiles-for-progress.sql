-- =============================================================================
-- Ensure every auth user has a profile so user_progress inserts succeed
-- (user_progress.user_id REFERENCES public.profiles(id))
-- Run this in Supabase SQL Editor once. Does not drop or alter existing data.
-- =============================================================================

-- 1. Trigger: auto-create a profile when a new user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  INSERT INTO public.profiles (id, email, full_name, updated_at)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', split_part(NEW.email, '@', 1)),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN NEW;
END;
$$;

-- Drop trigger if it exists so we can recreate (idempotent)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- Use EXECUTE PROCEDURE if your Postgres version doesn't support EXECUTE FUNCTION
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- 2. Backfill: ensure existing auth.users have a profile (run once)
INSERT INTO public.profiles (id, email, full_name, updated_at)
SELECT
  u.id,
  u.email,
  COALESCE(u.raw_user_meta_data->>'full_name', split_part(u.email, '@', 1)),
  NOW()
FROM auth.users u
ON CONFLICT (id) DO NOTHING;
