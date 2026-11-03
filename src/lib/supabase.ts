import { createClient, SupabaseClient, User, Session } from '@supabase/supabase-js';

const STORAGE_KEY_URL = 'ecosort_supabase_url';
const STORAGE_KEY_ANON = 'ecosort_supabase_anon_key';

export interface SupabaseConfig {
  url: string;
  anonKey: string;
}

export const getSupabaseConfig = (): SupabaseConfig => {
  const envUrl =
    (import.meta.env.SUPABASE_URL as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_URL as string | undefined) ||
    '';

  const envAnonKey =
    (import.meta.env.SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string | undefined) ||
    (import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined) ||
    (import.meta.env.SUPABASE_ANON_KEY as string | undefined) ||
    '';

  const storedUrl = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_URL) || '' : '';
  const storedAnon = typeof window !== 'undefined' ? localStorage.getItem(STORAGE_KEY_ANON) || '' : '';

  return {
    url: (storedUrl || envUrl).trim(),
    anonKey: (storedAnon || envAnonKey).trim(),
  };
};

export const isSupabaseConfigured = (): boolean => {
  const { url, anonKey } = getSupabaseConfig();
  if (!url || !anonKey) return false;
  // Ignore placeholder defaults
  if (url.includes('your-project') || anonKey.includes('your-anon-key')) return false;
  try {
    const parsed = new URL(url);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
};

let clientInstance: SupabaseClient | null = null;

export const getSupabaseClient = (): SupabaseClient | null => {
  if (clientInstance) return clientInstance;

  const config = getSupabaseConfig();
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    clientInstance = createClient(config.url, config.anonKey, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: true,
      },
    });
    return clientInstance;
  } catch (err) {
    console.error('Failed to initialize Supabase client:', err);
    return null;
  }
};

export const saveSupabaseConfig = (url: string, anonKey: string): boolean => {
  try {
    const trimmedUrl = url.trim();
    const trimmedKey = anonKey.trim();

    if (trimmedUrl) {
      new URL(trimmedUrl); // Validate URL format
      localStorage.setItem(STORAGE_KEY_URL, trimmedUrl);
    } else {
      localStorage.removeItem(STORAGE_KEY_URL);
    }

    if (trimmedKey) {
      localStorage.setItem(STORAGE_KEY_ANON, trimmedKey);
    } else {
      localStorage.removeItem(STORAGE_KEY_ANON);
    }

    // Reset cached client
    clientInstance = null;
    return true;
  } catch (err) {
    console.error('Invalid Supabase configuration URL:', err);
    return false;
  }
};

export const clearSupabaseConfig = () => {
  localStorage.removeItem(STORAGE_KEY_URL);
  localStorage.removeItem(STORAGE_KEY_ANON);
  clientInstance = null;
};

// Helper auth functions
export const signInWithEmail = async (email: string, password: string) => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase chưa được cấu hình. Vui lòng nhập Project URL và Key.');
  }
  return await client.auth.signInWithPassword({ email, password });
};

export const signUpWithEmail = async (email: string, password: string, fullName?: string) => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase chưa được cấu hình. Vui lòng nhập Project URL và Key.');
  }
  return await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: fullName || email.split('@')[0],
      },
    },
  });
};

export const signOut = async () => {
  const client = getSupabaseClient();
  try {
    if (client) {
      // Use scope: 'local' so it immediately clears tokens and doesn't hang or fail due to network/CORS issues on deployed domains
      await client.auth.signOut({ scope: 'local' });
    }
  } catch (err) {
    console.warn('Supabase local signOut warning:', err);
  } finally {
    // Explicitly purge all Supabase tokens and sessions from browser storage
    if (typeof window !== 'undefined') {
      try {
        const keysToRemove: string[] = [];
        for (let i = 0; i < localStorage.length; i++) {
          const key = localStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth-token'))) {
            keysToRemove.push(key);
          }
        }
        keysToRemove.forEach((k) => localStorage.removeItem(k));

        for (let i = 0; i < sessionStorage.length; i++) {
          const key = sessionStorage.key(i);
          if (key && (key.startsWith('sb-') || key.includes('supabase') || key.includes('auth-token'))) {
            sessionStorage.removeItem(key);
          }
        }
      } catch (storageErr) {
        console.warn('Storage cleanup warning:', storageErr);
      }
    }
  }
  return { error: null };
};

export const signInWithOAuth = async (provider: 'google' | 'github') => {
  const client = getSupabaseClient();
  if (!client) {
    throw new Error('Supabase chưa được cấu hình. Vui lòng nhập Project URL và Key.');
  }
  return await client.auth.signInWithOAuth({
    provider,
    options: {
      redirectTo: window.location.origin,
    },
  });
};

export const getSession = async (): Promise<Session | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data } = await client.auth.getSession();
  return data.session;
};

export const getCurrentUser = async (): Promise<User | null> => {
  const client = getSupabaseClient();
  if (!client) return null;
  const { data } = await client.auth.getUser();
  return data.user;
};
