import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import logo from "../assets/images/logo4x.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import { supabase } from "@/lib/supabase";

const passwordSchema = z
  .object({
    password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
    confirmPassword: z.string().min(1, "Confirme a sua senha."),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
  });

type PasswordFormValues = z.infer<typeof passwordSchema>;

export function ResetPasswordPage() {
  const navigate = useNavigate();

  const [apiError, setApiError] = useState<string | null>(null);
  const [sessionReady, setSessionReady] = useState(false);

  useEffect(() => {
    async function initializeSession() {
      const hash = window.location.hash.substring(1);
      const params = new URLSearchParams(hash);

      const accessToken = params.get("access_token");
      const refreshToken = params.get("refresh_token");

      if (!accessToken || !refreshToken) {
        setApiError("Link inválido ou expirado.");
        return;
      }

      const { error } = await supabase.auth.setSession({
        access_token: accessToken,
        refresh_token: refreshToken,
      });

      if (error) {
        setApiError(error.message);
        return;
      }

      setSessionReady(true);
    }

    initializeSession();
  }, []);

  const form = useForm<PasswordFormValues>({
    resolver: zodResolver(passwordSchema),
    mode: "onChange",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  async function onSubmit(data: PasswordFormValues) {
    setApiError(null);

    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      setApiError(error.message);
      return;
    }

    navigate("/");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <img
          src={logo}
          alt="BayArchon Logo"
          className="h-12 mb-10 object-contain"
        />

        {apiError && (
          <div className="w-full mb-6 p-3 bg-red-100 text-vermelho text-sm rounded-xl text-center font-medium border border-vermelho/20">
            {apiError}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-6"
            noValidate
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[15px] font-medium text-preto-claro">
                    Digite nova senha
                  </FormLabel>

                  <FormControl>
                    <Input
                      disabled={!sessionReady}
                      type="password"
                      placeholder="Nova senha"
                      className={`h-12 rounded-xl border bg-white px-4 text-[15px] placeholder:text-cinza-escuro focus-visible:ring-1 focus-visible:ring-azul-interativo ${
                        fieldState.error
                          ? "border-vermelho"
                          : "border-bordaoff-white"
                      }`}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-vermelho" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[15px] font-medium text-preto-claro">
                    Confirme a senha
                  </FormLabel>

                  <FormControl>
                    <Input
                      disabled={!sessionReady}
                      type="password"
                      placeholder="Digite novamente a senha"
                      className={`h-12 rounded-xl border bg-white px-4 text-[15px] placeholder:text-cinza-escuro focus-visible:ring-1 focus-visible:ring-azul-interativo ${
                        fieldState.error
                          ? "border-vermelho"
                          : "border-bordaoff-white"
                      }`}
                      {...field}
                    />
                  </FormControl>

                  <FormMessage className="text-sm text-vermelho" />
                </FormItem>
              )}
            />

            <div className="pt-4">
              <Button
                disabled={!sessionReady}
                type="submit"
                className="h-12 w-full max-w-[200px] mx-auto block rounded-lg bg-[#3b5296] text-white font-medium hover:bg-azul-marinho transition-colors disabled:opacity-75"
              >
                Confirmar
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </div>
  );
}
