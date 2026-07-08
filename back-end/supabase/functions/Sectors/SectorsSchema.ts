import {z} from "zod";

export const InsertSectorSchema = z.object({
    display_name: z.string().min(1, {message: "Insira o nome de display do setor"}),
    details: z.string().min(1, {message: "Insira os detalhes do setor"})
})

export const UpdateSectorSchema = z.object({
    id: z.number().int().positive({message: "Insira um ID válido para o setor"}),
    display_name: z.string(),
    details: z.string()
})
.partial()
.required({id: true})