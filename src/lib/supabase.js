import { createClient } from '@supabase/supabase-js';

if (typeof window !== "undefined") {
    throw new Error("Supabase client cannot be used on the client-side. Please use the backend API.");
}

const supabaseUrl = import.meta.env.PUBLIC_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables: PUBLIC_SUPABASE_URL or PUBLIC_SUPABASE_ANON_KEY");
}

export const supabase = (supabaseUrl && supabaseAnonKey)
    ? createClient(supabaseUrl, supabaseAnonKey)
    : {
        auth: {
            signUp: () => Promise.resolve({ data: null, error: { message: "Servicio no disponible" } }),
            getUser: () => Promise.resolve({ data: { user: null }, error: { message: "Servicio no disponible" } })
        },
        from: () => ({
            select: () => ({ eq: () => Promise.resolve({ data: [], error: null }) }),
            insert: () => {
                const response = Promise.resolve({ error: { message: "Servicio no disponible" }, data: null });
                return {
                    select: () => ({
                        single: () => response
                    }),
                    then: (onfulfilled) => response.then(onfulfilled)
                };
            },
            update: () => ({ eq: () => Promise.resolve({ error: { message: "Servicio no disponible" } }) }),
            delete: () => ({ eq: () => Promise.resolve({ error: { message: "Servicio no disponible" } }) })
        })
    };
