import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useNavigate, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { CheckCircle2 } from "lucide-react";
import { RequiredAsterisk } from "@/components/ui/requiredasterisk";
import { supabase } from "@/lib/supabase";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

const loginSchema = z.object({
  email: z.string().email("Digite um email válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const navigate = useNavigate();

  const [isSuccess, setIsSuccess] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const form = useForm<LoginFormValues>({
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function onSubmit(data: LoginFormValues) {
    setIsLoading(true);
    setApiError(null);

    const { error } = await supabase.auth.signInWithPassword({
      email: data.email,
      password: data.password,
    });

    if (error) {
      if (error.message === "Invalid login credentials") {
        setApiError("E-mail ou senha incorretos.");
      } else {
        setApiError("Ocorreu um erro ao fazer login.");
      }
      setIsLoading(false);
      return;
    }

    setIsLoading(false);
    setIsSuccess(true);

    setTimeout(() => {
      navigate("/admin");
    }, 800);
  }

  if (isSuccess) {
    return (
      <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-off-white/80 backdrop-blur-sm animate-in fade-in duration-500">
        <div className="bg-white p-10 rounded-3xl shadow-xl border border-bordaoff-white flex flex-col items-center max-w-[400px] w-full text-center animate-in zoom-in-95 duration-500">
          <div className="w-20 h-20 bg-verde-sucesso/10 rounded-full flex items-center justify-center mb-6">
            <CheckCircle2 className="w-10 h-10 text-verde-sucesso" />
          </div>
          <h2 className="text-2xl font-bold text-azul-marinho mb-2">
            Acesso confirmado!
          </h2>
          <p className="text-cinza-escuro text-[15px]">
            Seja bem-vindo de volta. Carregando o seu painel...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {apiError && (
        <div className="w-full mb-6 p-3 bg-red-100 text-vermelho text-sm rounded-xl text-center font-medium border border-vermelho/20 animate-in fade-in">
          {apiError}
        </div>
      )}

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="space-y-6"
          noValidate
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-[2px]">
                <FormLabel className="text-[16px] font-medium text-preto-claro flex items-center">
                  Email <RequiredAsterisk />
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="email"
                    placeholder="m@example.com"
                    className={`h-12 rounded-xl border-2 bg-white px-4 text-[16px] shadow-sm placeholder:text-cinza-escuro focus-visible:ring-0 transition-colors ${
                      fieldState.error
                        ? "border-vermelho focus-visible:border-vermelho"
                        : "border-bordaoff-white focus-visible:border-azul-interativo"
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
            name="password"
            render={({ field, fieldState }) => (
              <FormItem className="space-y-[2px]">
                <div className="flex items-center justify-between">
                  <FormLabel className="text-[16px] font-medium text-preto-claro flex items-center">
                    Senha <RequiredAsterisk />
                  </FormLabel>
                  <Link
                    to="/esqueci-senha"
                    className="text-[14px] text-azul-interativo hover:underline font-medium"
                  >
                    Esqueceu a senha?
                  </Link>
                </div>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    type="password"
                    placeholder="Digite sua senha"
                    className={`h-12 rounded-xl border-2 bg-white px-4 text-[16px] shadow-sm placeholder:text-cinza-escuro focus-visible:ring-0 transition-colors ${
                      fieldState.error
                        ? "border-vermelho focus-visible:border-vermelho"
                        : "border-bordaoff-white focus-visible:border-azul-interativo"
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
            className="mt-6 h-12 w-full rounded-xl bg-azul-corporativo text-white text-[16px] font-medium hover:bg-azul-marinho transition-all shadow-sm disabled:opacity-75"
          >
            {isLoading ? "Validando..." : "Entrar"}
          </Button>
        </form>
      </Form>
    </div>
  );
}
