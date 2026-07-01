import { Context } from "hono";
import {RegisterService} from "./AuthServices/RegisterService.ts";
import {FirstAccessService} from "./AuthServices/FirstAccessService.ts";
import { AuthRegisterSchema, AuthFirstAccessSchema } from "./AuthSchema.ts"; 
import { supabase } from "../_shared/supabase.ts";

export async function Register(context: Context){

    const body = await context.req.json();

    const parsedUser = AuthRegisterSchema.safeParse(body);

    if (!parsedUser.success) {
        return new Response(
            JSON.stringify({ error: parsedUser.error }),
            { status: 400 }
        );
    }

    try{

        const result = await RegisterService(supabase, parsedUser.data);
        return context.newResponse(JSON.stringify({ body: result }), 200,{"Content-Type": "application/json"});
    
    }catch(err){
        return context.newResponse(JSON.stringify({error: (err as Error).message}),400,{"Content-Type": "application/json"});
    }
}

export async function FirstAccess(context: Context){
    const body = await context.req.json();

    const parsedFirstAccess = AuthFirstAccessSchema.safeParse(body);

    if (!parsedFirstAccess.success) {
        return new Response(
            JSON.stringify({ error: parsedFirstAccess.error }),
            { status: 400 }
        );
    }

    try{
        const result = await FirstAccessService(supabase, parsedFirstAccess.data);
        return context.newResponse(JSON.stringify({ body: result }), 200,{"Content-Type": "application/json"});
    }catch(err){
        return context.newResponse(JSON.stringify({error: (err as Error).message}),400,{"Content-Type": "application/json"});
    }
}
