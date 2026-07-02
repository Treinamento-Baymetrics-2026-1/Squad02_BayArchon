import { SupabaseClient } from "@supabase";
import { AuthRegisterDTO } from "../AuthDto.ts";
import { AccessLevelMapper } from "../AuthMapper.ts";

export async function RegisterService(supabase : SupabaseClient, registerData : AuthRegisterDTO){

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