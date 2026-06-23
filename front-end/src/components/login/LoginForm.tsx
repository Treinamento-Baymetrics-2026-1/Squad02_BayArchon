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
    defaultValues: {
      email: "",
      password: "",
    },
  });

  function onSubmit(data: LoginFormValues) {
    console.log("Dados prontos para a API:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-preto-claro">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="m@example.com"
                  className="h-12 rounded-xl border-2 border-cinza-medio bg-white px-4 text-[16px] shadow-sm placeholder:text-cinza-escuro focus-visible:ring-0 focus-visible:border-cinza-medio"
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
          render={({ field }) => (
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
                  className="h-12 rounded-xl border-2 border-cinza-medio bg-white px-4 text-[16px] shadow-sm placeholder:text-cinza-escuro focus-visible:ring-0 focus-visible:border-cinza-medio"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-vermelho" />
            </FormItem>
          )}
        />

        <Button
          type="submit"
          className="mt-4 h-12 w-full rounded-xl bg-azul-corporativo text-white text-[16px] font-medium hover:bg-azul-marinho"
        >
          Entrar
        </Button>
      </form>
    </Form>
  );
}
