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
  role: z.string().min(1, "Escolha um nível de acesso."),
  department: z.string().min(1, "Escolha um setor."),
});

type RegisterFormValues = z.infer<typeof registerSchema>;

export function RegisterUserForm() {
  const form = useForm<RegisterFormValues>({
    resolver: zodResolver(registerSchema),
    mode: "onChange",
    defaultValues: {
      name: "",
      email: "",
      role: "",
      department: "",
    },
  });

  function onSubmit(data: RegisterFormValues) {
    console.log("Dados de cadastro prontos para a API:", data);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6" noValidate>
        
        <FormField
          control={form.control}
          name="name"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Nome Completo
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Digite seu nome completo"
                  className={`h-12 rounded-xl border-2 bg-white px-4 text-[16px] shadow-sm placeholder:text-cinza-escuro focus-visible:ring-0 ${
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

        {/* Email */}
        <FormField
          control={form.control}
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Digite seu email"
                  className={`h-12 rounded-xl border-2 bg-white px-4 text-[16px] shadow-sm placeholder:text-cinza-escuro focus-visible:ring-0 ${
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
        
        <FormField
          control={form.control}
          name="role"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Nível de acesso
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={`w-full h-12 rounded-xl border-2 bg-white px-4 text-[16px] shadow-sm text-preto-suave ring-0 outline-none focus:ring-0 data-[placeholder]:text-cinza-escuro ${
                      fieldState.error
                        ? "border-vermelho focus:border-vermelho data-[state=open]:border-vermelho"
                        : "border-cinza-medio focus:border-cinza-medio data-[state=open]:border-cinza-medio"
                    }`}
                  >
                    <SelectValue placeholder="Escolha o acesso" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="w-[var(--radix-select-trigger-width)] border-2 border-cinza-medio rounded-xl bg-white shadow-md"
                >
                  <SelectItem value="colaborador">Colaborador</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                  <SelectItem value="gestor">Gestor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage className="text-sm text-vermelho" />
            </FormItem>
          )}
        />


        <FormField
          control={form.control}
          name="department"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Setor
              </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger
                    className={`w-full h-12 rounded-xl border-2 bg-white px-4 text-[16px] shadow-sm text-preto-suave ring-0 outline-none focus:ring-0 data-[placeholder]:text-cinza-escuro ${
                      fieldState.error
                        ? "border-vermelho focus:border-vermelho data-[state=open]:border-vermelho"
                        : "border-cinza-medio focus:border-cinza-medio data-[state=open]:border-cinza-medio"
                    }`}
                  >
                    <SelectValue placeholder="Escolha o setor" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent
                  position="popper"
                  sideOffset={4}
                  className="w-[var(--radix-select-trigger-width)] border-2 border-cinza-medio rounded-xl bg-white shadow-md"
                >
                  <SelectItem value="ti">TI</SelectItem> 
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