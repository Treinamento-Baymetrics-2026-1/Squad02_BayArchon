import Search from "../../assets/icons/plus.svg?react";
import Plus from "../../assets/icons/plus.svg?react";

interface UserPageFiltersProps {
  onCreateClick: () => void;
}

export function UserPageFilters({ onCreateClick }: UserPageFiltersProps) {
  return (
    <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4 mb-6">
      <div className="flex flex-col sm:flex-row gap-4 w-full lg:w-auto">
        <div className="relative w-full sm:w-72 shadow-sm rounded-lg">
          <input
            type="text"
            placeholder="Pesquisar"
            className="w-full h-10 pl-4 pr-10 border border-bordaoff-white rounded-lg focus:outline-none focus:ring-1 focus:ring-azul-interativo text-sm"
          />
          <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-cinza-medio" />
        </div>

        <select className="h-10 px-3 border border-bordaoff-white rounded-lg bg-white text-sm text-cinza-escuro shadow-sm focus:outline-none focus:ring-1 focus:ring-azul-interativo w-full sm:w-48 appearance-none">
          <option>Todos os setores</option>
          <option>Financeiro</option>
          <option>RH</option>
          <option>Jurídico</option>
        </select>

        <select className="h-10 px-3 border border-bordaoff-white rounded-lg bg-white text-sm text-cinza-escuro shadow-sm focus:outline-none focus:ring-1 focus:ring-azul-interativo w-full sm:w-48 appearance-none">
          <option>Todos níveis de acesso</option>
          <option>Administrador</option>
          <option>Gestor</option>
          <option>Colaborador</option>
        </select>
      </div>

      <button
        onClick={onCreateClick}
        className="flex items-center justify-center gap-2 bg-azul-corporativo hover:bg-azul-marinho text-white font-medium text-sm h-10 px-5 rounded-lg transition-colors shadow-sm w-full lg:w-auto shrink-0"
      >
        <Plus className="w-4 h-4" />
        Novo usuário
      </button>
    </div>
  );
}
