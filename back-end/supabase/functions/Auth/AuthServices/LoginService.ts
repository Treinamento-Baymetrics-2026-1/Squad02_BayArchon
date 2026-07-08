import { SupabaseClient } from "@supabase";
import { AuthLoginSchema } from "../AuthSchema.ts";
import {z} from "zod";

export async function LoginService(supabase : SupabaseClient, loginData : z.infer<typeof AuthLoginSchema>){

    const {data, error} = await supabase.auth.signInWithPassword({
        email: loginData.email,
        password: loginData.password
    });

    if(error){
        throw new Error(error.message);
    }
    return data;
    
}