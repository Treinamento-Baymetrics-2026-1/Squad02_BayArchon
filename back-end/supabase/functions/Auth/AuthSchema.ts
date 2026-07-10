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

export const AuthLoginSchema = z.object({
    email: z.string().email(),
    password: z
    .string()
    .min(8)
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
      "A senha deve conter no mínimo um elemento de cada conjunto: abcdefghijklmnopqrstuvwxyz, ABCDEFGHIJKLMNOPQRSTUVWXYZ, 0123456789."
    ),
});

export const AuthRedefinePasswordSchema = z.object({
  email: z.string().email()
})