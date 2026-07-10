import { SupabaseClient } from "@supabase";
import { DocumentUploadSchema } from "../DocumentsSchema.ts";
import {z} from "zod";
import { error } from "node:console";

export async function uploadFile(supabase : SupabaseClient, uploadData : z.infer<typeof DocumentUploadSchema>){

    const files = uploadData.file

     if(!files.length){
        throw new Error("Erro ao enviar arquivo");
    }

    
    
}