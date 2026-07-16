import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { BaseModal } from "../ui/basemodal";
import { Button } from "@/components/ui/button";
import PencilIcon from "../../assets/icons/pencil.svg?react";
import type { User } from "./UserTable";
import { useRegisterUser } from "@/hooks/UseAuth";
import { formatCPF } from "@/utils/formatters";
import { RequiredAsterisk } from "../ui/requiredasterisk"; 

const userModalSchema = z.object({
  name: z.string().min(3, "O nome deve ter pelo menos 3 letras."),
  cpf: z.string().regex(/^\d{3}\.\d{3}\.\d{3}-\d{2}$/, "Use o formato 000.000.000-00"),
  email: z.string().email("Formato de e-mail inválido."),
  access_level: z.string().min(1, "O nível de acesso é obrigatório."),
  sector_id: z.string().min(1, "O setor é obrigatório.").refine(val => val !== "0", "Escolha um setor."),
});

type UserModalFormData = z.infer<typeof userModalSchema>;

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User | null;
}

export function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const isEditing = !!user;
  const { mutate: registerUser, isPending } = useRegisterUser();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<UserModalFormData>({
    resolver: zodResolver(userModalSchema),
  });

  useEffect(() => {
    if (user) {
      const sectorMap: Record<string, string> = { "Financeiro": "1", "RH": "2", "Jurídico": "3", "Operacional": "4" };
      reset({
        name: user.name,
        cpf: user.cpf,
        email: user.email,
        access_level: user.role,
        sector_id: sectorMap[user.sector] || "0",
      });
    } else {
      reset({ name: "", cpf: "", email: "", access_level: "", sector_id: "0" });
    }
  }, [user, reset, isOpen]);

  const onSubmit = (data: UserModalFormData) => {
    
    const payloadParaAPI = {
      name: data.name,
      email: data.email,
      access_level: data.access_level,
      sector_id: Number(data.sector_id) 
    };

    if (!isEditing) {
      registerUser(payloadParaAPI, {
        onSuccess: () => {
          onClose(); 
          reset(); 
        }
      });
    } else {
      console.log("Editando usuário:", payloadParaAPI);
    }
  };

  const { onChange: onCpfChange, ...cpfRegister } = register("cpf");

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={() => { onClose(); reset(); }}
      title={isEditing ? "Editar usuário" : "Cadastrar usuário"}
      description={isEditing ? "Edite as informações do usuário" : "Preencha as informações do novo usuário"}
    >
      <form className="space-y-4" onSubmit={handleSubmit(onSubmit)}>
        
        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center">
            Nome Completo <RequiredAsterisk />
          </label>
          <div className="relative">
            <input 
              type="text" 
              placeholder={isEditing ? "" : "Digite o nome completo"}
              className={`w-full h-11 px-4 border rounded-xl text-preto-suave focus:outline-none focus:ring-1 text-[15px] placeholder:text-cinza-escuro ${
                errors.name ? "border-vermelho focus:border-vermelho focus:ring-vermelho" : "border-bordaoff-white focus:border-azul-interativo focus:ring-azul-interativo"
              }`}
              {...register("name")}
            />
            {isEditing && <PencilIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cinza-escuro" />}
          </div>
          {errors.name && <p className="text-sm text-vermelho">{errors.name.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center">
            CPF <RequiredAsterisk />
          </label>
          <input 
            type="text" 
            placeholder={isEditing ? "" : "000.000.000-00"}
            className={`w-full h-11 px-4 border rounded-xl text-preto-suave focus:outline-none focus:ring-1 text-[15px] placeholder:text-cinza-escuro ${
              errors.cpf ? "border-vermelho focus:border-vermelho focus:ring-vermelho" : "border-bordaoff-white focus:border-azul-interativo focus:ring-azul-interativo"
            }`}
            {...cpfRegister} 
            onChange={(e) => {
              e.target.value = formatCPF(e.target.value);
              onCpfChange(e); 
            }}
          />
          {errors.cpf && <p className="text-sm text-vermelho">{errors.cpf.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center">
            E-mail <RequiredAsterisk />
          </label>
          <div className="relative">
            <input 
              type="email" 
              placeholder={isEditing ? "" : "Digite seu email"}
              className={`w-full h-11 px-4 border rounded-xl text-preto-suave focus:outline-none focus:ring-1 text-[15px] placeholder:text-cinza-escuro ${
                errors.email ? "border-vermelho focus:border-vermelho focus:ring-vermelho" : "border-bordaoff-white focus:border-azul-interativo focus:ring-azul-interativo"
              }`}
              {...register("email")}
            />
            {isEditing && <PencilIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cinza-escuro" />}
          </div>
          {errors.email && <p className="text-sm text-vermelho">{errors.email.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center">
            Nível de acesso <RequiredAsterisk />
          </label>
          <select 
            className={`w-full h-11 px-4 border rounded-xl text-preto-suave bg-white focus:outline-none focus:ring-1 appearance-none text-[15px] ${
              errors.access_level ? "border-vermelho focus:border-vermelho focus:ring-vermelho" : "border-bordaoff-white focus:border-azul-interativo focus:ring-azul-interativo"
            }`}
            {...register("access_level")}
          >
            <option value="" disabled hidden>Escolha o acesso</option>
            <option value="Administrador">Administrador</option>
            <option value="Gestor">Gestor</option>
            <option value="Colaborador">Colaborador</option>
          </select>
          {errors.access_level && <p className="text-sm text-vermelho">{errors.access_level.message}</p>}
        </div>

        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center">
            Setor <RequiredAsterisk />
          </label>
          <select 
            className={`w-full h-11 px-4 border rounded-xl text-preto-suave bg-white focus:outline-none focus:ring-1 appearance-none text-[15px] ${
              errors.sector_id ? "border-vermelho focus:border-vermelho focus:ring-vermelho" : "border-bordaoff-white focus:border-azul-interativo focus:ring-azul-interativo"
            }`}
            {...register("sector_id")}
          >
            <option value="0" disabled hidden>Escolha o setor</option>
            <option value="1">Financeiro</option>
            <option value="2">RH</option>
            <option value="3">Jurídico</option>
            <option value="4">Operacional</option>
          </select>
          {errors.sector_id && <p className="text-sm text-vermelho">{errors.sector_id.message}</p>}
        </div>

        <div className="flex items-center justify-center gap-4 pt-6">
          <Button 
            type="button" 
            onClick={() => { onClose(); reset(); }}
            disabled={isPending}
            className="h-11 w-32 rounded-xl border border-azul-corporativo bg-transparent text-azul-corporativo hover:bg-azul-corporativo/5 text-[15px] font-medium"
          >
            Cancelar
          </Button>
          <Button 
            type="submit" 
            disabled={isPending}
            className="h-11 w-32 rounded-xl bg-azul-corporativo hover:bg-azul-marinho text-white text-[15px] font-medium shadow-none disabled:opacity-70"
          >
            {isPending ? "Salvando..." : (isEditing ? "Salvar" : "Cadastrar")}
          </Button>
        </div>

      </form>
    </BaseModal>
  );
}