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

const registerClientSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 caracteres."),
  cnpj: z.string().min(14, "Digite um CNPJ válido."),
   //ver se tiver mascara, pq aumenta para 18 caracteres
  email: z.string().email("Digite um email válido."),
});

type RegisterClientFormValues = z.infer<typeof registerClientSchema>;

export function RegisterClientForm() {
  const form = useForm<RegisterClientFormValues>({
    resolver: zodResolver(registerClientSchema),
    mode: "onChange", 
    defaultValues: {
      name: "",
      cnpj: "",
      email: "",
    },
  });

  function onSubmit(data: RegisterClientFormValues) {
    console.log("Dados do cliente prontos para a API:", data);
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
                Nome do cliente
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Digite o nome do cliente/empresa"
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
          name="cnpj"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                CNPJ
              </FormLabel>
              <FormControl>
                <Input
                  type="text"
                  placeholder="Digite o CNPJ"
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
          name="email"
          render={({ field, fieldState }) => (
            <FormItem className="space-y-[2px]">
              <FormLabel className="text-[16px] font-medium text-azul-marinho">
                Email
              </FormLabel>
              <FormControl>
                <Input
                  type="email"
                  placeholder="Digite o email"
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