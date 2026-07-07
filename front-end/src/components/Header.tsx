import Search from "../assets/icons/search.svg?react";
import avatarImage from "../assets/images/avatar-image.png";

export function Header() {
  return (
    <header className="h-16  bg-white flex items-center justify-between px-6">
      <div className="w-40 hidden md:block" aria-hidden="true"></div>

      <div className="flex-1 max-w-2xl mx-4 ">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5" />
          <input
            type="text"
            placeholder="Buscar pastas, documentos, usuários ou clientes..."
            className="w-full pl-10 pr-4 py-2 bg-off-white border border-bordaoff-white rounded-lg focus:outline-none focus:border-azul-interativo"
          />
        </div>
      </div>

      <div className="flex items-center gap-3 ml-4">
        <div className="flex items-center justify-end w-20 gap-3 shrink-0"></div>
        <div className="text-right hidden sm:block">
          <p className="text-sm font-semibold text-preto-claro">
            Ricardo Alves
          </p>
          <p className="text-xs text-cinza-escuro">ricardo.alves@bay...</p>
        </div>
        <img
          src={avatarImage}
          alt="Avatar"
          className="w-10 h-10 rounded-full border border-bordaoff-white"
        />
      </div>
    </header>
  );
}
