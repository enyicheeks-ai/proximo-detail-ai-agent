import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = process.env.SUPABASE_URL || '';
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_KEY || '';

let supabase = null;
if (SUPABASE_URL && SUPABASE_SERVICE_KEY) {
  supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);
}

export async function saveMessage({ name, email, message, reply }) {
  if (!supabase) {
    throw new Error('Supabase not configured. Set SUPABASE_URL and SUPABASE_SERVICE_KEY in env.');
  }
  const { data, error } = await supabase
    .from('messages')
    .insert([{ name, email, message, reply }])
    .select();
  if (error) {
    throw error;
  }
  return data?.[0] || null;
}
