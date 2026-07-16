import { SupabaseClient } from "@supabase";


export async function uploadFile(supabase : SupabaseClient, filePath : string, file : File){

    const arrayBuffer = await file.arrayBuffer()

    const { error } = await supabase.storage.from("documents").upload(filePath, arrayBuffer, {
        contentType: file.type
    })
    
    if(error)
        throw new Error(error.message)
    
}