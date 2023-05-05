import 'react-native-url-polyfill/auto'

import { createClient } from '@supabase/supabase-js'
import { Database } from '../types/supabase'
import {NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY } from '@env';
import * as SecureStore from 'expo-secure-store';

const ExpoSecureStoreAdapter = {
    getItem: (key: string) => {
      return SecureStore.getItemAsync(key);
    },
    setItem: (key: string, value: string) => {
      SecureStore.setItemAsync(key, value);
    },
    removeItem: (key: string) => {
      SecureStore.deleteItemAsync(key);
    },
  };

console.log(NEXT_PUBLIC_SUPABASE_URL, NEXT_PUBLIC_SUPABASE_ANON_KEY);
export const supabaseClient = createClient<Database>(NEXT_PUBLIC_SUPABASE_URL!, NEXT_PUBLIC_SUPABASE_ANON_KEY!, {
    auth: {
        storage: ExpoSecureStoreAdapter as any,
        autoRefreshToken: true,
        persistSession: true,
        detectSessionInUrl: false,
    }
})