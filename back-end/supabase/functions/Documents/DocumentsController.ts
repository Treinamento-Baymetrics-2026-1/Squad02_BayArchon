import { Context } from "hono";
import { supabase } from "../_shared/supabase.ts";
import {uploadFile} from "./DocumentsServices/UploadFileService.ts"
import { DocumentUploadSchema } from "./DocumentsSchema.ts";
import { file } from "zod";

export async function UploadFile(context : Context){
    const body = await context.req.json();
    
    const parsedUpload = DocumentUploadSchema.safeParse(body);
    
    if(!parsedUpload.success){
      return new Response(
          JSON.stringify({ error: parsedUpload.error }),
          { status: 400 }
      );
    }

    const files = parsedUpload.data.file

    if(!files.length){
        return new Response(
          JSON.stringify({ error: "Nenhum arquivo identificado," }),
          { status: 400 }
      );
    }

    for(const file of files){

        if(!(file instanceof File))
            continue

        const parsedName = file.name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .replace(/\s+/g, "-"); 
        
        const filePath = `${crypto.randomUUID()}-${parsedName}`

        const arrayBuffer = await file.arrayBuffer()

        

    }

    

     try{
        const result = await uploadFile(supabase, parsedUpload.data);
        return context.newResponse(JSON.stringify({ body: result }), 200,{"Content-Type": "application/json"});
        
        }catch(err){
            return context.newResponse(JSON.stringify({error: (err as Error).message}),400,{"Content-Type": "application/json"});
        }

}