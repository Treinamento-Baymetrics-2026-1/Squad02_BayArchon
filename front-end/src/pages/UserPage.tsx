import { useState } from "react";
import UserIcon from "../assets/icons/icons-colors/usuarios.svg?react";
import { Breadcrumb } from "../components/ui/breadcrumb";
import { Pagination } from "../components/ui/pagination";
import { UserTable, type User } from "../components/user-page/UserTable";
import { UserPageFilters } from "../components/user-page/UserPage";
import { UserModal } from "../components/user-page/UserModal";

export function UserPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [userToEdit, setUserToEdit] = useState<User | null>(null);

  const handleOpenCreate = () => {
    setUserToEdit(null);
    setIsModalOpen(true);
  };

  const handleOpenEdit = (user: User) => {
    setUserToEdit(user);
    setIsModalOpen(true);
  };

  return (
    <div className="p-4 md:p-8 flex flex-col min-h-screen bg-off-white text-preto-suave">
      <div className="mb-8">
        <Breadcrumb
          paths={[
            { label: "Visão geral", to: "/admin" },
            { label: "Usuários" },
          ]}
        />

        <div className="flex items-center gap-3 text-azul-marinho mb-2">
          <UserIcon className="w-11 h-11" />
          <h1 className="text-3xl font-bold">Usuários</h1>
        </div>
        <p className="text-cinza-escuro text-sm">
          Gerencie os perfis de usuários do sistema e cadastre novos membros.
        </p>
      </div>

      <UserPageFilters onCreateClick={handleOpenCreate} />

      <div className="w-full mb-6">
        <UserTable onEditClick={handleOpenEdit} />
      </div>

      <Pagination />

      <UserModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        user={userToEdit}
      />
    </div>
  );
}
