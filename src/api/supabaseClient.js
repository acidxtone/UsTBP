/**
 * Supabase API client — auth, questions, user progress, quiz attempts
 * Replaces the localClient.js with Supabase integration
 */

import { supabase } from '@/lib/supabase';

let questionsCache = null;
let studyGuidesCache = null;

async function loadQuestions() {
  if (questionsCache) return questionsCache;
  try {
    const { data, error } = await supabase
      .from('questions')
      .select('*')
      .order('year, section');
    
    if (error) {
      console.error('Error loading questions:', error);
      questionsCache = [];
    } else {
      questionsCache = data || [];
    }
  } catch (error) {
    console.error('Error loading questions:', error);
    questionsCache = [];
  }
  return questionsCache;
}

async function loadStudyGuides() {
  if (studyGuidesCache) return studyGuidesCache;
  try {
    const { data, error } = await supabase
      .from('study_guides')
      .select('*')
      .order('year, section');
    
    if (error) {
      console.error('Error loading study guides:', error);
      studyGuidesCache = [];
    } else {
      studyGuidesCache = data || [];
    }
  } catch (error) {
    console.error('Error loading study guides:', error);
    studyGuidesCache = [];
  }
  return studyGuidesCache;
}

const auth = {
  async me() {
    try {
      console.log('🔍 Checking Supabase session...');
      const { data: { session }, error: sessionError } = await supabase.auth.getSession();
      
      if (sessionError || !session) {
        console.log('🔍 No active session found');
        throw new Error('User not authenticated');
      }

      console.log('🔍 Session found, getting user...');
      const { data: { user }, error } = await supabase.auth.getUser();
      
      if (error || !user) {
        console.log('🔍 No user in session');
        throw new Error('User not authenticated');
      }

      console.log('🔍 User authenticated:', user.id);
      // Get user profile data
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError && profileError.code !== 'PGRST116') {
        console.error('Error fetching profile:', profileError);
      }

      return {
        id: user.id,
        email: user.email,
        full_name: profile?.full_name || user.user_metadata?.full_name || 'User',
        selected_year: profile?.selected_year || null,
        role: profile?.role || 'user',
      };
    } catch (error) {
      console.error('Auth me error:', error);
      throw error;
    }
  },

  async updateMe({ selected_year }) {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('profiles')
        .upsert({
          id: user.id,
          email: user.email,
          selected_year,
          updated_at: new Date().toISOString()
        })
        .select()
        .single();

      if (error) {
        console.error('Error updating profile:', error);
        throw error;
      }

      return {
        id: user.id,
        email: user.email,
        full_name: data.full_name || user.user_metadata?.full_name || 'User',
        selected_year: data.selected_year,
        role: data.role || 'user',
      };
    } catch (error) {
      console.error('Update me error:', error);
      throw error;
    }
  },

  async logout() {
    try {
      const { error } = await supabase.auth.signOut();
      if (error) {
        console.error('Logout error:', error);
        throw error;
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  },

  async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password
      });

      if (error) {
        throw error;
      }

      return data;
    } catch (error) {
      console.error('Sign in error:', error);
      throw error;
    }
  },

  async signUp(email, password, fullName) {
    try {
      // Development mode: Check if user already exists and sign them in
      if (import.meta.env.DEV) {
        console.log('🔧 Development mode: Checking if user exists...');
        try {
          const signInResult = await this.signIn(email, password);
          if (signInResult.user) {
            console.log('🔧 Development mode: User exists, signed in directly');
            return { user: signInResult.user, session: signInResult.session };
          }
        } catch (signInError) {
          console.log('🔧 Development mode: User does not exist, proceeding with signup');
        }
      }

      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName
          },
          // Skip email confirmation in development
          emailRedirectTo: window.location.origin,
          // For development, we can disable email confirmation
          // Note: This requires Supabase project setting to be configured
        }
      });

      if (error) {
        // If it's a rate limit error, provide a helpful message
        if (error.message?.includes('rate limit')) {
          // Development fallback: try to sign in directly
          console.warn('🔧 Rate limit hit, trying direct sign in for development');
          try {
            const signInResult = await this.signIn(email, password);
            if (signInResult.user) {
              console.log('🔧 Development mode: Direct sign in successful');
              return { user: signInResult.user, session: signInResult.session };
            }
          } catch (signInError) {
            console.log('🔧 Direct sign in also failed');
          }
          throw new Error('Email rate limit exceeded. Please wait 1 hour or use a different email address.');
        }
        throw error;
      }

      console.log('🔧 Sign up successful:', data);
      return data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  },

  redirectToLogin() {
    // Redirect to the unified auth page used by the app
    window.location.href = '/auth';
  },

  onAuthStateChange(callback) {
    return supabase.auth.onAuthStateChange(callback);
  }
};

const entities = {
  Question: {
    async filter({ year, section }) {
      try {
        console.log('supabaseClient.js - Question.filter called with:', { year, section, yearType: typeof year });
        let query = supabase.from('questions').select('*');
        
        if (year != null) {
          console.log('supabaseClient.js - Filtering by year:', year);
          query = query.eq('year', year);
        }
        if (section != null) {
          console.log('supabaseClient.js - Filtering by section:', section);
          query = query.eq('section', section);
        }
        
        const { data, error } = await query.order('year, section');
        
        if (error) {
          console.error('Error filtering questions:', error);
          return [];
        }
        
        // Transform data to match expected format
        // Supabase stores options as JSONB object {a: "...", b: "...", c: "...", d: "..."}
        // Components expect option_a, option_b, option_c, option_d as separate fields
        const transformedData = (data || []).map(q => {
          // Handle section - convert to integer if it's stored as text/number
          const sectionValue = typeof q.section === 'string' ? parseInt(q.section, 10) : q.section;
          
          return {
            id: q.id,
            year: q.year,
            section: sectionValue || q.section,
            section_name: q.section_name || q.section || sectionValue,
            difficulty: q.difficulty,
            question_text: q.question_text,
            // Extract options from JSONB object
            option_a: q.options?.a || q.option_a || '',
            option_b: q.options?.b || q.option_b || '',
            option_c: q.options?.c || q.option_c || '',
            option_d: q.options?.d || q.option_d || '',
            // Keep options object for backward compatibility
            options: q.options || (q.option_a ? {
              a: q.option_a,
              b: q.option_b,
              c: q.option_c,
              d: q.option_d
            } : null),
            correct_answer: q.correct_answer,
            explanation: q.explanation,
            reference: q.reference || 'AIT Curriculum',
            // Include any other fields that might exist
            ...(q.question ? { question: q.question } : {}),
            ...(q.wrong_explanations ? { wrong_explanations: q.wrong_explanations } : {}),
            ...(q.formula ? { formula: q.formula } : {})
          };
        });
        
        console.log('supabaseClient.js - Questions returned:', transformedData?.length || 0);
        console.log('supabaseClient.js - Sample transformed question:', transformedData?.[0]);
        return transformedData;
      } catch (error) {
        console.error('Error filtering questions:', error);
        return [];
      }
    },
  },

  UserProgress: {
    async get(userId, year) {
      try {
        const { data: user } = await supabase.auth.getUser();
        if (!user?.user) return null;
        if (year == null) return null;
        const yearNum = typeof year === 'string' ? parseInt(year, 10) : Number(year);
        if (Number.isNaN(yearNum)) return null;

        const { data, error } = await supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.user.id)
          .eq('year', yearNum)
          .maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user progress:', error);
          return null;
        }
        if (!data) return null;

        const progressData = data.progress_data || {};
        const statistics = data.statistics || {};
        return {
          ...data,
          ...progressData,
          ...statistics,
          bookmarked_questions: data.bookmarks || progressData.bookmarked_questions || [],
          weak_questions: data.weak_areas || progressData.weak_questions || [],
          created_by: user.user.email,
          year: data.year
        };
      } catch (error) {
        console.error('Error in userProgress.get:', error);
        return null;
      }
    },

    async filter({ created_by, year }) {
      try {
        const { data: user } = await supabase.auth.getUser();
        
        if (!user.user || user.user.email !== created_by) {
          return [];
        }

        let query = supabase
          .from('user_progress')
          .select('*')
          .eq('user_id', user.user.id);
        
        if (year != null) {
          query = query.eq('year', year);
        }
        
        const { data, error } = year != null 
          ? await query.single()
          : await query.maybeSingle();

        if (error && error.code !== 'PGRST116') {
          console.error('Error fetching user progress:', error);
          return [];
        }

        if (!data) {
          return [];
        }

        // Transform data structure to match component expectations
        // Supabase stores data in JSONB fields, but components expect flat structure
        const progressData = data.progress_data || {};
        const statistics = data.statistics || {};
        
        // Merge progress_data and statistics into the main object
        const transformed = {
          ...data,
          ...progressData,
          ...statistics,
          // Ensure bookmarked_questions and weak_questions are arrays
          bookmarked_questions: data.bookmarks || progressData.bookmarked_questions || [],
          weak_questions: data.weak_areas || progressData.weak_questions || [],
          // Keep original fields for reference
          created_by: user.user.email,
          year: data.year
        };

        return [transformed];
      } catch (error) {
        console.error('Error filtering user progress:', error);
        return [];
      }
    },

    async create(payload) {
      try {
        const { data: user } = await supabase.auth.getUser();
        
        if (!user.user) {
          throw new Error('User not authenticated');
        }

        // Extract year from payload or _year (normalize to number for DB consistency)
        const yearRaw = payload.year ?? payload._year;
        const year = yearRaw != null ? (typeof yearRaw === 'number' ? yearRaw : parseInt(String(yearRaw), 10)) : null;
        delete payload._year;
        if (year == null || Number.isNaN(year)) {
          throw new Error('Year is required for user progress');
        }

        // Separate fields that go into JSONB vs direct columns
        const {
          bookmarked_questions,
          weak_questions,
          total_questions_answered,
          total_correct,
          quizzes_completed,
          full_exams_completed,
          section_stats,
          best_score,
          study_streak_days,
          last_study_date,
          ...restPayload
        } = payload;

        // Build progress_data JSONB object
        const progressData = {
          ...(total_questions_answered !== undefined && { total_questions_answered }),
          ...(total_correct !== undefined && { total_correct }),
          ...(quizzes_completed !== undefined && { quizzes_completed }),
          ...(full_exams_completed !== undefined && { full_exams_completed }),
          ...(section_stats && { section_stats }),
          ...(best_score !== undefined && { best_score }),
          ...(study_streak_days !== undefined && { study_streak_days }),
          ...(last_study_date && { last_study_date }),
          ...(bookmarked_questions && { bookmarked_questions }),
          ...(weak_questions && { weak_questions })
        };

        const { data, error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.user.id,
            year: year,
            progress_data: progressData,
            bookmarks: bookmarked_questions || [],
            weak_areas: weak_questions || [],
            statistics: {
              total_questions_answered: total_questions_answered || 0,
              total_correct: total_correct || 0,
              quizzes_completed: quizzes_completed || 0,
              full_exams_completed: full_exams_completed || 0,
              best_score: best_score || 0
            },
            ...restPayload
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating user progress:', error);
          throw error;
        }

        // Transform response to match component expectations
        const responseProgressData = data.progress_data || {};
        const responseStatistics = data.statistics || {};
        return {
          ...data,
          ...responseProgressData,
          ...responseStatistics,
          bookmarked_questions: data.bookmarks || responseProgressData.bookmarked_questions || [],
          weak_questions: data.weak_areas || responseProgressData.weak_questions || []
        };
      } catch (error) {
        console.error('Error creating user progress:', error);
        throw error;
      }
    },

    async update(id, payload) {
      try {
        const { data: user } = await supabase.auth.getUser();
        
        if (!user.user) {
          throw new Error('User not authenticated');
        }

        // Extract year from payload or _year (normalize to number)
        const yearRaw = payload.year ?? payload._year;
        const year = yearRaw != null ? (typeof yearRaw === 'number' ? yearRaw : parseInt(String(yearRaw), 10)) : undefined;
        delete payload._year;

        // Get existing data to merge
        const { data: existing } = await supabase
          .from('user_progress')
          .select('*')
          .eq('id', id)
          .eq('user_id', user.user.id)
          .single();

        if (!existing) {
          throw new Error('Progress record not found');
        }

        // Separate fields that go into JSONB vs direct columns
        const {
          bookmarked_questions,
          weak_questions,
          total_questions_answered,
          total_correct,
          quizzes_completed,
          full_exams_completed,
          section_stats,
          best_score,
          study_streak_days,
          last_study_date,
          ...restPayload
        } = payload;

        // Merge with existing progress_data
        const existingProgressData = existing.progress_data || {};
        const existingStatistics = existing.statistics || {};
        
        const progressData = {
          ...existingProgressData,
          ...(total_questions_answered !== undefined && { total_questions_answered }),
          ...(total_correct !== undefined && { total_correct }),
          ...(quizzes_completed !== undefined && { quizzes_completed }),
          ...(full_exams_completed !== undefined && { full_exams_completed }),
          ...(section_stats && { section_stats }),
          ...(best_score !== undefined && { best_score }),
          ...(study_streak_days !== undefined && { study_streak_days }),
          ...(last_study_date && { last_study_date }),
          ...(bookmarked_questions && { bookmarked_questions }),
          ...(weak_questions && { weak_questions })
        };

        const statistics = {
          ...existingStatistics,
          ...(total_questions_answered !== undefined && { total_questions_answered }),
          ...(total_correct !== undefined && { total_correct }),
          ...(quizzes_completed !== undefined && { quizzes_completed }),
          ...(full_exams_completed !== undefined && { full_exams_completed }),
          ...(best_score !== undefined && { best_score })
        };

        const updateData = {
          ...(year && { year }),
          progress_data: progressData,
          ...(bookmarked_questions && { bookmarks: bookmarked_questions }),
          ...(weak_questions && { weak_areas: weak_questions }),
          statistics: statistics,
          updated_at: new Date().toISOString(),
          ...restPayload
        };

        const { data, error } = await supabase
          .from('user_progress')
          .update(updateData)
          .eq('id', id)
          .eq('user_id', user.user.id)
          .select()
          .single();

        if (error) {
          console.error('Error updating user progress:', error);
          throw error;
        }

        // Transform response to match component expectations
        const responseProgressData = data.progress_data || {};
        const responseStatistics = data.statistics || {};
        return {
          ...data,
          ...responseProgressData,
          ...responseStatistics,
          bookmarked_questions: data.bookmarks || responseProgressData.bookmarked_questions || [],
          weak_questions: data.weak_areas || responseProgressData.weak_questions || []
        };
      } catch (error) {
        console.error('Error updating user progress:', error);
        throw error;
      }
    },


    async delete() {
      try {
        const { data: user } = await supabase.auth.getUser();
        
        if (!user.user) {
          throw new Error('User not authenticated');
        }

        const { error } = await supabase
          .from('user_progress')
          .delete()
          .eq('user_id', user.user.id);

        if (error) {
          console.error('Error deleting user progress:', error);
          throw error;
        }

        return true;
      } catch (error) {
        console.error('Error deleting user progress:', error);
        throw error;
      }
    },
  },

  QuizAttempt: {
    async filter({ user_id }) {
      try {
        const { data: user } = await supabase.auth.getUser();
        
        if (!user.user || user.user.id !== user_id) {
          return [];
        }

        const { data, error } = await supabase
          .from('quiz_attempts')
          .select('*')
          .eq('user_id', user_id)
          .order('completed_at', { ascending: false });

        if (error) {
          console.error('Error fetching quiz attempts:', error);
          return [];
        }

        return data || [];
      } catch (error) {
        console.error('Error filtering quiz attempts:', error);
        return [];
      }
    },

    async create(payload) {
      try {
        const { data: user } = await supabase.auth.getUser();
        
        if (!user.user) {
          throw new Error('User not authenticated');
        }

        const { data, error } = await supabase
          .from('quiz_attempts')
          .insert({
            user_id: user.user.id,
            ...payload
          })
          .select()
          .single();

        if (error) {
          console.error('Error creating quiz attempt:', error);
          throw error;
        }

        return data;
      } catch (error) {
        console.error('Error creating quiz attempt:', error);
        throw error;
      }
    },
  },
};

const appLogs = {
  async logUserInApp() {
    try {
      const { data: user } = await supabase.auth.getUser();
      
      if (user.user) {
        const { error } = await supabase
          .from('user_activity_logs')
          .insert({
            user_id: user.user.id,
            action: 'app_login',
            created_at: new Date().toISOString()
          });

        if (error) {
          console.error('Error logging user activity:', error);
        }
      }
    } catch (error) {
      console.error('Error logging user activity:', error);
    }
    
    return Promise.resolve();
  },
};

const studyGuides = {
  async getByYear(year) {
    try {
      const { data, error } = await supabase
        .from('study_guides')
        .select('*')
        .eq('year', year)
        .order('section');

      if (error) {
        console.error('Error fetching study guides by year:', error);
        return [];
      }

      return data || [];
    } catch (error) {
      console.error('Error fetching study guides by year:', error);
      return [];
    }
  },

  async getByYearAndSection(year, section) {
    try {
      const { data, error } = await supabase
        .from('study_guides')
        .select('*')
        .eq('year', year)
        .eq('section', section)
        .single();

      if (error && error.code !== 'PGRST116') {
        console.error('Error fetching study guide:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error fetching study guide:', error);
      return null;
    }
  },
};

export const api = {
  auth,
  entities,
  appLogs,
  studyGuides,
};
