import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo4x.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/lib/supabase"; 
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const emailSchema = z.object({
  email: z.string().email("Digite um e-mail válido."),
});

type EmailFormValues = z.infer<typeof emailSchema>;

export function ForgotPasswordPage() {
  const navigate = useNavigate();
  const [apiError, setApiError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<EmailFormValues>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  async function onSubmit(data: EmailFormValues) {
    setIsLoading(true);
    setApiError(null);

    const { error } = await supabase.auth.resetPasswordForEmail(data.email, {
      redirectTo: "http://localhost:5173/redefinir-senha?type=recovery",
    });

    if (error) {
      setApiError(error.message);
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    navigate("/verifique-seu-email");
  }

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center">
        <img
          src={logo}
          alt="BayArchon Logo"
          className="h-12 mb-8 object-contain"
        />

        <h1 className="text-[22px] md:text-[26px] font-medium text-preto-suave mb-10 text-center">
          Informe o e-mail institucional
        </h1>

        {apiError && (
          <div className="w-full mb-6 p-3 bg-red-100 text-vermelho text-sm rounded-xl text-center font-medium border border-vermelho/20">
            {apiError}
          </div>
        )}

        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8"
            noValidate
          >
            <FormField
              control={form.control}
              name="email"
              render={({ field, fieldState }) => (
                <FormItem className="space-y-2">
                  <FormLabel className="text-[15px] font-medium text-preto-claro">
                    Digite o seu email
                  </FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      type="email"
                      placeholder="nome@exemplo.com"
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

            <Button
              disabled={isLoading}
              type="submit"
              className="h-12 w-full max-w-[200px] mx-auto block rounded-lg bg-[#3b5296] text-white font-medium hover:bg-azul-marinho transition-colors disabled:opacity-75"
            >
              {isLoading ? "Enviando..." : "Continuar"}
            </Button>
          </form>
        </Form>
      </div>
    </div>
  );
}
