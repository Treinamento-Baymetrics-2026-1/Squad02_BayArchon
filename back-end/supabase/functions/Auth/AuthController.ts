import { Context } from "hono";
import {RegisterService} from "./AuthServices/RegisterService.ts";
import {UpdatePasswordService} from "./AuthServices/UpdatePasswordService.ts";
import { SetProfileActive } from "../Profiles/ProfilesServices/SetProfileActive.ts";
import { LoginService } from "./AuthServices/LoginService.ts";
import { SendRedefinePasswordService } from "./AuthServices/SendRedefinePasswordService.ts";
import { AuthRegisterSchema, AuthFirstAccessSchema, AuthLoginSchema, AuthRedefinePasswordSchema } from "./AuthSchema.ts"; 
import { supabase, getSupabaseClient } from "../_shared/supabase.ts";

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

    const authorization = context.req.header("Authorization");

    if (!authorization) {
    return context.json(
        { error: "Authorization header is required." },
        401
    );
}

    const supabaseUser = await getSupabaseClient(context);

    try{

        const result = await UpdatePasswordService(supabaseUser, parsedFirstAccess.data);
        await SetProfileActive(supabaseUser);
        return context.newResponse(JSON.stringify({ body: result }), 200,{"Content-Type": "application/json"});

    }catch(err){

        return context.newResponse(JSON.stringify({error: (err as Error).message}),400,{"Content-Type": "application/json"});
        
    }
}

export async function Login(context: Context){

    const body = await context.req.json();

    const parsedBody = AuthLoginSchema.safeParse(body);

    if (!parsedBody.success) {
            return context.json(
                { error: parsedBody.error },
                400
            );
        }

    try{
        const result = await LoginService(supabase, parsedBody.data);
        return context.json({body: result})
    }catch(err){
        return context.newResponse(JSON.stringify({error: (err as Error).message}),500,{"Content-Type": "application/json"});
    }
}

export async function SendRedefinePassword(context : Context){
    
    const body = await context.req.json();

    const parsedBody = AuthRedefinePasswordSchema.safeParse(body);

    if (!parsedBody.success) {
            return context.json(
                { error: parsedBody.error },
                400
            );
        }

    try{
        const result = await SendRedefinePasswordService(supabase, parsedBody.data);
        return context.json(result);
    }
    catch(err){
        return context.newResponse(JSON.stringify({error: (err as Error).message}),500,{"Content-Type": "application/json"});
    }
}

export async function UpdatePassword(context: Context){
    const body = await context.req.json();

    const parsedFirstAccess = AuthFirstAccessSchema.safeParse(body);

    if (!parsedFirstAccess.success) {
        return new Response(
            JSON.stringify({ error: parsedFirstAccess.error }),
            { status: 400 }
        );
    }

    const authorization = context.req.header("Authorization");

    if (!authorization) {
    return context.json(
        { error: "Authorization header is required." },
        401
    );
}

    const supabaseUser = await getSupabaseClient(context);

    try{

        const result = await UpdatePasswordService(supabaseUser, parsedFirstAccess.data);

        return context.newResponse(JSON.stringify({ body: result }), 200,{"Content-Type": "application/json"});

    }catch(err){

        return context.newResponse(JSON.stringify({error: (err as Error).message}),400,{"Content-Type": "application/json"});
        
    }
}