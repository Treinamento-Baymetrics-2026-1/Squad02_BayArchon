import PlusIcon from "../../assets/icons/plus.svg?react";
import ClienteIcon from "../../assets/icons/cliente.svg?react";
import PaperIcon from "../../assets/icons/paper.svg?react";

export function QuickActions() {
  return (
    <div className="flex flex-col space-y-3">
      <button className="flex items-center gap-3 bg-azul-corporativo text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-azul-corporativo/90 transition-colors w-full text-left shadow-sm">
        <PlusIcon className="w-5 h-5 shrink-0" />
        Criar Pasta
      </button>

      <button className="flex items-center gap-3 bg-azul-corporativo text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-azul-corporativo/90 transition-colors w-full text-left shadow-sm">
        <PlusIcon className="w-5 h-5 shrink-0" />
        Upload de documento
      </button>

      <button className="flex items-center gap-3 bg-azul-corporativo text-white py-3 px-4 rounded-xl text-sm font-medium hover:bg-azul-corporativo/90 transition-colors w-full text-left shadow-sm">
        <ClienteIcon className="w-5 h-5 shrink-0" />
        Cadastrar novo cliente
      </button>

      <button className="flex items-center gap-3 bg-white border border-azul-corporativo text-azul-corporativo py-3 px-4 rounded-xl text-sm font-medium hover:bg-off-white transition-colors w-full text-left shadow-sm">
        <PaperIcon className="w-5 h-5 shrink-0" />
        Registro dos usuários
      </button>
    </div>
  );
}
