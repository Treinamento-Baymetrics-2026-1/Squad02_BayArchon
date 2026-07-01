import { createClient } from "@supabase";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "ERROR";


const supabaseRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "ERROR";


export const supabase = createClient(supabaseUrl, supabaseRoleKey);