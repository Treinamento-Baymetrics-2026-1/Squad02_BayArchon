import { SupabaseClient } from "@supabase";
import { AuthRegisterSchema } from "../AuthSchema.ts"; 
import { AccessLevelMapper } from "../AuthMapper.ts";
import { z } from "zod";

export async function RegisterService(supabase : SupabaseClient,registerData : z.infer<typeof AuthRegisterSchema>) {

    const {data, error} = await supabase.auth.admin.inviteUserByEmail(registerData.email,
        {
            data:
            {
                name : registerData.name,
                status : "created",
                access_level : AccessLevelMapper[registerData.access_level],
                sector_id : registerData.sector_id
            }
        }
    )

    if(error)
        throw new Error(error.message)
    return data;

}