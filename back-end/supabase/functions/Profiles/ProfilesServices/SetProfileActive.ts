import { SupabaseClient } from "@supabase";

export async function UpdateProfileStatusService(supabase : SupabaseClient){
    
    const { data , error } = await supabase.auth.getUser();

    if(error){
        throw new Error(error.message)
    }

    const { data: profileData, error: profileError } = await supabase.schema("registry").from("profiles").update({
        status: "active"
    }).eq("user_id", data.user?.id).select().single();

    if(profileError){
        throw new Error(profileError.message)
    }

    return profileData;
}