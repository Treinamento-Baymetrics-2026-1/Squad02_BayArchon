import { z } from "zod";

export const AuthRegisterSchema = z.object({
    email: z.email(),
    name: z.string(),
    access_level: z.enum(["Gestor", "Colaborador"],{error: "Preencher com Gestor ou Colaborador"}),
    sector_id : z.number()
})

export const AuthFirstAccessSchema = z
  .object({
    password: z.string().min(8),
    confirm_password: z.string().min(8),
  })
  .refine((data) => data.password === data.confirm_password, {
    message: "As senhas não coincidem",
    path: ["confirm_password"]
  });

