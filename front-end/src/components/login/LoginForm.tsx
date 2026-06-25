import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
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

const loginSchema = z.object({
  email: z.string().email("Digite um email válido."),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres."),
});

type LoginFormValues = z.infer<typeof loginSchema>;

export function LoginForm() {
  const form = useForm<LoginFormValues>({
    
    resolver: zodResolver(loginSchema),
    mode: "onChange",
    defaultValues: {
      email: "",
      password: "",
    },
  });

  console.log("Erros atuais do form:", form.formState.errors);
  function onSubmit(data: LoginFormValues) {
    console.log("Dados prontos para a API:", data);
  }
console.log("Erros ao vivo:", form.formState.errors);
  return (
<form 
  onSubmit={form.handleSubmit(
    onSubmit, 
    (erros) => console.log("Deu erro na validação! Olha aqui:", erros)
  )} 
  className="space-y-8" 
  noValidate>
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-preto-claro">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  className={`h-12 rounded-xl border-2 border-cinza-medio bg-white px-4 text-[16px] shadow-sm placeholder:text-cinza-escuro focus-visible:ring-0 ${   
                  fieldState.error
                  ? "border-vermelho focus-visible:border-vermelho"
                  :"border-cinza-medio focus-visible:border-cinza-medio"
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
                <FormLabel className="text-[16px] font-medium text-preto-claro">
                  Senha
                </FormLabel>
                <a
                  href="#"
                  className="text-[15px] text-azul-interativo hover:underline"
                >
                  Esqueceu a senha?
                </a>
              </div>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Digite sua senha"
                  className={`h-12 rounded-xl border-2 border-cinza-medio bg-white px-4 text-[16px] shadow-sm placeholder:text-cinza-escuro focus-visible:ring-0 ${
                    fieldState.error
                      ? "border-vermelho focus-visible:border-vermelho"
                      : "border-cinza-medio focus-visible:border-cinza-medio"
                  }`}
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-vermelho" />
            </FormItem>
          )}
        />

       <button type="submit" className="mt-4 h-12 w-full rounded-xl bg-red-500 text-white">
  Botão Teste (Entrar)
</button>
      </form>
    
  );
}
