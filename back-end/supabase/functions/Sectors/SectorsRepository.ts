import { SupabaseClient } from "@supabase";
import { InsertSectorSchema, UpdateSectorSchema } from "./SectorsSchema.ts"
import { z } from "zod";

export async function GetAllSectorsService(supabase : SupabaseClient, deleted? : boolean | null){

    let query = supabase.schema("registry").from("t_sectors").select("*");

    if(deleted !== undefined && deleted !== null){
        query = query.eq("is_deleted", deleted);
    }
    
    const {data, error} = await query;


    if(error){
        throw new Error("Error: " + error.message);
    }

    return data;
}

export async function GetSectorByIdService(supabese : SupabaseClient, id : number){

    const {data, error} = await supabese.schema("registry").from("t_sectors").select("*").eq("id", id).single();

    if(!data){
        throw new Error("Setor não encontrado");
    }

    if(error){
        throw new Error("Error: " + error.message);
    }

    return data;
}

export async function InsertSectorService(supabase : SupabaseClient, sectorData : z.infer<typeof InsertSectorSchema>){


    const {error} = await supabase.schema("registry").from("t_sectors").insert(sectorData);

    if(error)
        throw new Error(error.message)

    return ("Setor inserido com sucesso.");
    
}

export async function UpdateSectorService(supabase : SupabaseClient, sectorData : z.infer<typeof UpdateSectorSchema>){

 const { data, error } = await supabase.schema('registry').from("t_sectors").select('*').eq('id', sectorData.id).single();

  if(!data){
    throw new Error("Setor não encontrado");
  }
  if (error) {
    throw new Error("Error: " + error.message);
  }

  const { id: _id, ...updateSector} = sectorData;

  const { error: updateError } = await supabase.schema('registry').from("t_sectors").update(updateSector).eq('id', sectorData.id);

  if (updateError){
    throw new Error("Error: " + updateError.message);
  }
  
  return ("Setor atualizado com sucesso");
}

export async function DeleteSectorService( supabase : SupabaseClient, sectorId : number){

 const { error } = await supabase.schema('registry').from("t_sectors").update({is_deleted : true, deleted_at : new Date()}).eq('id', sectorId);

 if(error){
    throw new Error("Error: " + error.message);
 }

 return("Setor deletado com sucesso");
 
}