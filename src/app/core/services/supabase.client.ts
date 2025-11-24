import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from '../../../enviroments/environment';

declare global {
  interface Window {
    __supabaseClient?: SupabaseClient;
  }
}

// HMR / reload safe singleton: attach to window to avoid recreating
// the Supabase client (and its GoTrueClient) across module reloads.
const existing = (window as any).__supabaseClient as SupabaseClient | undefined;
export const supabase: SupabaseClient = existing ?? ((window as any).__supabaseClient = createClient(
  environment.supabaseUrl,
  environment.supabaseKey
));
