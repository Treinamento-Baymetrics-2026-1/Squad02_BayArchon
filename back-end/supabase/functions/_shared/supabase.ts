import { createClient } from "@supabase";
import { Context } from "hono";

const supabaseUrl = Deno.env.get("SUPABASE_URL") || "ERROR";


const supabaseRoleKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "ERROR";


export const supabase = createClient(supabaseUrl, supabaseRoleKey);

export async function getSupabaseClient(context : Context){

    const supabaseClient  = createClient(supabaseUrl, supabaseRoleKey, {
        global: {
            headers: {
                Authorization: context.req.header("Authorization") || "",
            },
        },
    });
    
    return supabaseClient;
}