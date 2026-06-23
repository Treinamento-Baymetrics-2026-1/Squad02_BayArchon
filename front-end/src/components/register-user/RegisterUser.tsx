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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const registerSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  email: z.string().email("Digite um email válido."),
  role: z.string().min(1, "Selecione um nível de acesso."),
  department: z.string().min(1, "Selecione um setor."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      name: "",
      email: "",
    },
  });

  function onSubmit(data: RegisterFormValues) {
    console.log("Dados de cadastro prontos para a API:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Nome Completo
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Felipe Santos"
                  className="h-12 rounded-xl border-2 border-cinza-medio bg-white px-4 text-[16px] shadow-sm placeholder:text-preto-suave focus-visible:ring-0 focus-visible:border-cinza-medio"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-vermelho" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="felipe.santos@baymetrics.com.br"
                  className="h-12 rounded-xl border-2 border-cinza-medio bg-white px-4 text-[16px] shadow-sm placeholder:text-preto-suave focus-visible:ring-0 focus-visible:border-cinza-medio"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-sm text-vermelho" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Nível de acesso
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full h-12 rounded-xl border-2 border-cinza-medio bg-white px-4 text-[16px] shadow-sm text-preto-suave ring-0 outline-none focus:ring-0 focus:border-cinza-medio data-[state=open]:border-cinza-medio">
                    <SelectValue placeholder="Selecione o nível" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="w-[var(--radix-select-trigger-width)] border-2 border-cinza-medio rounded-xl bg-white shadow-md"
                >
                  <SelectItem value="colaborador">Colaborador</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="admin">Gestor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-vermelho" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="department"
          render={({ field }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Setor
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full h-12 rounded-xl border-2 border-cinza-medio bg-white px-4 text-[16px] shadow-sm text-preto-suave ring-0 outline-none focus:ring-0 focus:border-cinza-medio data-[state=open]:border-cinza-medio">
                    <SelectValue placeholder="Selecione o setor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="w-[var(--radix-select-trigger-width)] border-2 border-cinza-medio rounded-xl bg-white shadow-md"
                >
                  <SelectItem value="ti">BAC</SelectItem>
                  <SelectItem value="rh">RH</SelectItem>
                  <SelectItem value="financeiro">Financeiro</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-vermelho" />
            </FormItem>
          )}
        />

        <div className="mt-8 flex items-center justify-end gap-4 pt-2">
          <Button
            type="button"
            className="h-12 min-w-[120px] rounded-xl border border-cinza-medio bg-offwhite text-[16px] font-medium text-preto-suave hover:bg-cinza-claro"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="h-12 min-w-[120px] rounded-xl bg-azul-corporativo text-[16px] font-medium text-white hover:bg-azul-marinho"
          >
            Cadastrar
          </Button>
        </div>
      </form>
    </Form>
  );
}
