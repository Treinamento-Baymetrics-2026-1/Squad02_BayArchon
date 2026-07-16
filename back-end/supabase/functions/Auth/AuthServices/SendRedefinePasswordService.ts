import { SupabaseClient } from "@supabase";
import {AuthRedefinePasswordSchema} from "../AuthSchema.ts"
import z from "zod";

export async function SendRedefinePasswordService(supabase : SupabaseClient, redefineData : z.infer<typeof AuthRedefinePasswordSchema>){

    const {error} = await supabase.auth.resetPasswordForEmail(redefineData.email)

    if(error){
        throw new Error("Error: " + error.message);
    }

    return("E-mail enviado.");
}