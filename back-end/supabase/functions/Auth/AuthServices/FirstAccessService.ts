import { SupabaseClient } from "@supabase";
import { AuthFirstAccessSchema } from "../AuthSchema.ts";
import {z} from "zod";

export async function FirstAccessService(supabase : SupabaseClient, firstAccessData : z.infer<typeof AuthFirstAccessSchema>){

    const { data , error } = await supabase.auth.updateUser({
        password: firstAccessData.password
    })

    if(error)
        throw new Error(error.message)
    return data;
}