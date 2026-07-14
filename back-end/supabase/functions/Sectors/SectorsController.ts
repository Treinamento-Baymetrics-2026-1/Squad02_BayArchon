import {Context} from "hono";
import {InsertSectorSchema, UpdateSectorSchema} from "./SectorsSchema.ts";
import {GetAllSectorsService, GetSectorByIdService, InsertSectorService, UpdateSectorService, DeleteSectorService} from "./SectorsRepository.ts";

import { supabase } from "../_shared/supabase.ts"

export async function InsertSector(context: Context){

    const body = await context.req.json();

    const parsedBody = InsertSectorSchema.safeParse(body);

   if (!parsedBody.success) {
            return context.json(
                { error: parsedBody.error },
                400
            );
        }

    try {
        const result = await InsertSectorService(supabase, parsedBody.data);
        return context.json({body: result})
    }catch(err){
        return context.newResponse(JSON.stringify({error: (err as Error).message}),500,{"Content-Type": "application/json"});
    }
}

export async function UpdateSector(context: Context){

    const body = await context.req.json();

    const parsedBody = UpdateSectorSchema.safeParse(body);

    if (!parsedBody.success) {
            return context.json(
                { error: parsedBody.error },
                400
            );
        }

    try {
        const result = await UpdateSectorService(supabase, parsedBody.data);
        return context.json({ body: result })
    }catch(err){
        return context.json({ error: (err as Error).message },500);
    }
}

export async function DeleteSector(context: Context, id : number){

    try {
        const result = await DeleteSectorService(supabase, id);
        return context.json({ body: result });
    }catch(err){
        return context.json({ error: (err as Error).message },500);
    }

}

export async function ReadSector(context: Context, status? : boolean | null){
    try{
        const result = await GetAllSectorsService(supabase, status);
        return context.json(result);
    } catch (err) {
        return context.json({ error: (err as Error).message },500);
    }
}

export async function ReadSectorById(context : Context, id : number){
    try{
        const result = await GetSectorByIdService(supabase, id);
        return context.json(result);
    }catch (err) {
        return context.json({ error: (err as Error).message },500);
    }
}