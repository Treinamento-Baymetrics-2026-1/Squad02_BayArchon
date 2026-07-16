import { StatusBadge, RoleBadge } from "../ui/badges";
import Lixeira from "../../assets/icons/icons-colors/lixeira.svg?react";
import Pencil from "../../assets/icons/pencil.svg?react";

export type User = {
  name: string;
  cpf: string;
  email: string;
  sector: string;
  role: "Administrador" | "Gestor" | "Colaborador";
  status: "Ativo" | "Inativo";
};

const mockUsers: User[] = [
  {
    name: "Beatriz Menezes",
    cpf: "529.982.247-25",
    email: "beatriz.menezes@baymetrics.com",
    sector: "Financeiro",
    role: "Administrador",
    status: "Ativo",
  },
  {
    name: "Carlos Henrique Lima",
    cpf: "111.444.777-35",
    email: "carlos.lima@baymetrics.com",
    sector: "RH",
    role: "Gestor",
    status: "Ativo",
  },
  {
    name: "Fernanda Oliveira",
    cpf: "935.411.347-80",
    email: "fernanda.oliveira@baymetrics.com",
    sector: "Jurídico",
    role: "Colaborador",
    status: "Inativo",
  },
  {
    name: "João Pedro Martins",
    cpf: "286.255.878-87",
    email: "joao.martins@baymetrics.com",
    sector: "Financeiro",
    role: "Colaborador",
    status: "Ativo",
  },
  {
    name: "Mariana Costa",
    cpf: "357.192.230-04",
    email: "mariana.costa@baymetrics.com",
    sector: "Operacional",
    role: "Gestor",
    status: "Inativo",
  },
  {
    name: "Rafael Almeida",
    cpf: "357.192.230-04",
    email: "rafael.almeida@baymetrics.com",
    sector: "Jurídico",
    role: "Administrador",
    status: "Inativo",
  },
  {
    name: "Viviam Medeiros",
    cpf: "714.602.380-01",
    email: "viviam.medeiros@baymetrics.com",
    sector: "Financeiro",
    role: "Colaborador",
    status: "Ativo",
  },
  {
    name: "Paulo Santos da Silva",
    cpf: "714.602.380-01",
    email: "paulo.silva@baymetrics.com",
    sector: "Financeiro",
    role: "Gestor",
    status: "Inativo",
  },
];

interface UserTableProps {
  onEditClick: (user: User) => void;
  onDeleteClick: (user: User) => void;
}

export function UserTable({ onEditClick, onDeleteClick }: UserTableProps) {
  return (
    <div className="w-full bg-white border border-bordaoff-white rounded-xl shadow-sm overflow-hidden flex flex-col">
      <div className="w-full overflow-x-auto">
        <table className="w-full text-center text-sm whitespace-nowrap min-w-[900px]">
          <thead className="bg-azul-marinho text-white">
            <tr>
              <th className="px-6 py-4 font-medium w-1/5 text-center">
                Nome Completo
              </th>
              <th className="px-6 py-4 font-medium text-center">CPF</th>
              <th className="px-6 py-4 font-medium text-center">E-mail</th>
              <th className="px-6 py-4 font-medium text-center">Setor</th>
              <th className="px-6 py-4 font-medium text-center">
                Nível de acesso
              </th>
              <th className="px-6 py-4 font-medium text-center">Status</th>
              <th className="px-6 py-4 font-medium text-center">Ações</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-bordaoff-white text-preto-suave">
            {mockUsers.map((user, index) => (
              <tr key={index} className="hover:bg-off-white transition-colors">
                <td className="px-6 py-4 font-medium">{user.name}</td>
                <td className="px-6 py-4">{user.cpf}</td>
                <td className="px-6 py-4">{user.email}</td>
                <td className="px-6 py-4">{user.sector}</td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <RoleBadge role={user.role} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center">
                    <StatusBadge status={user.status} />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="flex justify-center items-center gap-3 text-cinza-escuro">
                    <button
                      onClick={() => onEditClick(user)}
                      className="hover:text-azul-interativo transition-colors"
                      title="Editar"
                    >
                      <Pencil
                        className="w-4 h-4 stroke-current"
                        stroke="currentColor"
                        fill="none"
                      />
                    </button>

                    <button
                      onClick={() => onDeleteClick(user)}
                      className="hover:text-vermelho transition-colors"
                      title="Excluir"
                    >
                      <Lixeira
                        className="w-4 h-4 stroke-current"
                        stroke="currentColor"
                        fill="none"
                      />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
