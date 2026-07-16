import { Context } from "hono";
import { supabase } from "../_shared/supabase.ts";
import {uploadFile} from "./DocumentsServices/UploadFileService.ts";
import {fileCatcher} from "./DocumentsServices/CatchFileService.ts";
import { DocumentAnalyze } from "./DocumentsServices/DocumentAnalyze.ts";
import {DocumentAnalyzeSchema} from "./DocumentsSchema.ts"



export async function UploadFile(context : Context){
    const body = await context.req.formData();
    
    // const parsedUpload = DocumentUploadSchema.safeParse(body);
    
    // if(!parsedUpload.success){
    //   return new Response(
    //       JSON.stringify({ error: parsedUpload.error }),
    //       { status: 400 }
    //   );
    // }

    const files = body.getAll("file")

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


     try{ 
        await uploadFile(supabase, filePath, file);
        }catch(err){
            return context.newResponse(JSON.stringify({error: (err as Error).message}),400,{"Content-Type": "application/json"});
        }
    }
     return context.newResponse(JSON.stringify({ body: "Arquivos enviados." }), 200,{"Content-Type": "application/json"});
}

export async function GetFile(context: Context) {
    try {
        const { filePath } = await context.req.json();

    const file = await fileCatcher(supabase, filePath);

    return new Response(file, {
      status: 200,
      headers: {
        "Content-Type": file.type || "application/octet-stream",
      },
    });

  } catch (err) {
    return context.json(
      { error: (err as Error).message },
      404
    );
  }
}

export async function AnalyzeDocument(context : Context){

  const body = await context.req.json();

  const parsedDocument = DocumentAnalyzeSchema.safeParse(body);

  if (!parsedDocument.success) {
          return new Response(
              JSON.stringify({ error: parsedDocument.error }),
              { status: 400 }
          );
      }

  try {
    const file = await fileCatcher(supabase, parsedDocument.data.filePath);

    const result = await DocumentAnalyze(file, parsedDocument.data.systemPrompt, parsedDocument.data.userPrompt);
    return context.newResponse(JSON.stringify({ body: result }), 200,{"Content-Type": "application/json"});
    

  } catch (err) {
    return context.json(
      { error: (err as Error).message },
      404
    );
  }

}