import { createClient } from '@supabase/supabase-js';
import { SUPABASE_API_URL, SUPABASE_API_KEY } from '$env/static/private';

// Check that the environment variables are set
if (!SUPABASE_API_URL || !SUPABASE_API_KEY) {
	throw new Error('Missing SUPABASE_API_URL or SUPABASE_API_KEY');
}

// Create a single supabase client for interacting with your database
export const supabase = createClient(SUPABASE_API_URL, SUPABASE_API_KEY);
