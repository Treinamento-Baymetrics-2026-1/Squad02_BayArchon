import { BaseModal } from "../ui/basemodal";
import { Button } from "@/components/ui/button";
import PencilIcon from "../../assets/icons/pencil.svg?react";

type User = {
  name: string;
  cpf: string;
  email: string;
  sector: string;
  role: string;
  status: string;
} | null;

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  user?: User;
}

export function UserModal({ isOpen, onClose, user }: UserModalProps) {
  const isEditing = !!user;

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={isEditing ? "Editar usuário" : "Cadastrar usuário"}
      description={
        isEditing
          ? "Edite as informações do usuário"
          : "Preencha as informações do novo usuário"
      }
    >
      <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center gap-1">
            Nome Completo <span className="text-vermelho">*</span>
          </label>
          <div className="relative">
            <input
              type="text"
              defaultValue={user?.name}
              placeholder={isEditing ? "" : "Digite o nome completo"}
              className="w-full h-11 px-4 border border-bordaoff-white rounded-xl text-preto-suave focus:outline-none focus:border-azul-interativo focus:ring-1 focus:ring-azul-interativo placeholder:text-cinza-escuro text-[15px]"
            />
            {isEditing && (
              <PencilIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cinza-escuro" />
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center gap-1">
            CPF <span className="text-vermelho">*</span>
          </label>
          <input
            type="text"
            defaultValue={user?.cpf}
            placeholder={isEditing ? "" : "Digite o CPF"}
            className="w-full h-11 px-4 border border-bordaoff-white rounded-xl text-preto-suave focus:outline-none focus:border-azul-interativo focus:ring-1 focus:ring-azul-interativo placeholder:text-cinza-escuro text-[15px]"
          />
        </div>

        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center gap-1">
            E-mail <span className="text-vermelho">*</span>
          </label>
          <div className="relative">
            <input
              type="email"
              defaultValue={user?.email}
              placeholder={isEditing ? "" : "Digite seu email"}
              className="w-full h-11 px-4 border border-bordaoff-white rounded-xl text-preto-suave focus:outline-none focus:border-azul-interativo focus:ring-1 focus:ring-azul-interativo placeholder:text-cinza-escuro text-[15px]"
            />
            {isEditing && (
              <PencilIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-cinza-escuro" />
            )}
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center gap-1">
            Nível de acesso <span className="text-vermelho">*</span>
          </label>
          <select
            defaultValue={user?.role || ""}
            className="w-full h-11 px-4 border border-bordaoff-white rounded-xl text-preto-suave bg-white focus:outline-none focus:border-azul-interativo focus:ring-1 focus:ring-azul-interativo appearance-none text-[15px]"
          >
            {!isEditing && (
              <option value="" disabled hidden>
                Escolha o acesso
              </option>
            )}
            <option value="Administrador">Administrador</option>
            <option value="Gestor">Gestor</option>
            <option value="Colaborador">Colaborador</option>
          </select>
        </div>

        <div className="space-y-1.5">
          <label className="text-[15px] font-medium text-azul-marinho flex items-center gap-1">
            Setor <span className="text-vermelho">*</span>
          </label>
          <select
            defaultValue={user?.sector || ""}
            className="w-full h-11 px-4 border border-bordaoff-white rounded-xl text-preto-suave bg-white focus:outline-none focus:border-azul-interativo focus:ring-1 focus:ring-azul-interativo appearance-none text-[15px]"
          >
            {!isEditing && (
              <option value="" disabled hidden>
                Escolha o setor
              </option>
            )}
            <option value="Financeiro">Financeiro</option>
            <option value="RH">RH</option>
            <option value="Jurídico">Jurídico</option>
            <option value="Operacional">Operacional</option>
          </select>
        </div>

        <div className="flex items-center justify-center gap-4 pt-6">
          <Button
            type="button"
            onClick={onClose}
            className="h-11 w-32 rounded-xl border border-azul-corporativo bg-transparent text-azul-corporativo hover:bg-azul-corporativo/5 text-[15px] font-medium"
          >
            Cancelar
          </Button>
          <Button
            type="submit"
            className="h-11 w-32 rounded-xl bg-azul-corporativo hover:bg-azul-marinho text-white text-[15px] font-medium shadow-none"
          >
            {isEditing ? "Salvar" : "Cadastrar"}
          </Button>
        </div>
      </form>
    </BaseModal>
  );
}
