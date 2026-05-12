import { createClient } from "@supabase/supabase-js";

    const supaBaseUrl = process.env.SUPABASE_URL!
    const supaBaseKey = process.env.SUPABASE_KEY!


    export const supabase = createClient(supaBaseUrl, supaBaseKey)