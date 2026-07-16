import logoSidebar from "../assets/images/logosiderbar4x.png";
import bayarconIcon from "../assets/icons/bayarcon.svg";
import chatAiIcon from "../assets/icons/chatai.svg";
import visaoGeralIcon from "../assets/icons/visaogeral.svg";
import documentosIcon from "../assets/icons/documentos.svg";
import clienteIcon from "../assets/icons/cliente.svg";
import usuariosIcon from "../assets/icons/usuarios.svg";
import setoresIcon from "../assets/icons/setores.svg";
import lixeiraIcon from "../assets/icons/lixeira.svg";
import configuracaoIcon from "../assets/icons/configurações.svg";
import reduzirIcon from "../assets/icons/reduzir.svg";
import { useState } from "react";
import { Link } from "react-router-dom";

export function Sidebar() {
  const [isExpanded, setIsExpanded] = useState(true);

  const toggleSidebar = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <aside
      className={`h-screen bg-azul-marinho text-white flex flex-col py-6 transition-all duration-400 ease-in-out rounded-r-2xl overflow-hidden ${
        isExpanded ? "w-64 px-4" : "w-16 px-2"
      }`}
    >
      <div
        className={`flex items-center justify-center mb-10 transition-all duration-400 ${isExpanded ? "h-14 px-2" : "h-10"}`}
      >
        <button
          onClick={toggleSidebar}
          className="focus:outline-none"
          title={isExpanded ? "Reduzir menu" : "Expandir menu"}
        >
          <img
            src={isExpanded ? logoSidebar : bayarconIcon}
            alt="BayArchon Logo"
            className={`object-contain transition-all duration-400 ease-in-out ${
              isExpanded ? "h-12 w-auto opacity-100" : "w-8 h-8 opacity-90"
            }`}
          />
        </button>
      </div>

      <nav className="flex-1 flex flex-col space-y-2">
        <div
          className={`flex items-center mb-4 transition-all duration-300 ${isExpanded ? "justify-between px-2" : "justify-center"}`}
        >
          <span
            className={`text-sm text-cinza-medio whitespace-nowrap transition-all duration-300 ${
              isExpanded
                ? "opacity-100 translate-x-0"
                : "opacity-0 -translate-x-4 w-0 overflow-hidden"
            }`}
          >
            Acessos
          </span>

          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="p-1.5 hover:bg-white/10 rounded-full transition-all duration-300 flex items-center justify-center group"
            title={isExpanded ? "Reduzir" : "Expandir"}
          >
            <img
              src={reduzirIcon}
              alt="Alternar Menu"
              className={`w-6 h-6 object-contain transition-transform duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)] ${
                !isExpanded ? "rotate-180" : "rotate-0"
              } group-hover:scale-110`}
            />
          </button>
        </div>

        <NavItem
          to="/admin/chat"
          icon={chatAiIcon}
          text="Chat com IA"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/admin"
          icon={visaoGeralIcon}
          text="Visão geral"
          isExpanded={isExpanded}
          active
        />
        <NavItem
          to="#"
          icon={documentosIcon}
          text="Documentos"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/admin/clientes"
          icon={clienteIcon}
          text="Clientes"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/admin/usuarios"
          icon={usuariosIcon}
          text="Usuários"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/admin/setores"

          icon={setoresIcon}
          text="Setores"
          isExpanded={isExpanded}
        />
        <NavItem
          to="/admin/lixeira"
          icon={lixeiraIcon}
          text="Lixeira"
          isExpanded={isExpanded}
        />

        {/* <div className="flex-1"></div> */}

        <NavItem
          to="/admin/configuracoes"
          icon={configuracaoIcon}
          text="Configuração"
          isExpanded={isExpanded}
        />
      </nav>
    </aside>
  );
}

interface NavItemProps {
  to: string;
  icon: string;
  text: string;
  isExpanded: boolean;
  active?: boolean;
}

function NavItem({ to, icon, text, isExpanded, active = false }: NavItemProps) {
  return (
    <Link
      to={to}
      className={`group relative flex items-center rounded-lg transition-all duration-300 ease-in-out overflow-hidden ${
        isExpanded ? "px-3 py-2 gap-3" : "justify-center py-3"
      } ${active ? "bg-white/10" : "hover:bg-white/10"}`}
      title={!isExpanded ? text : undefined}
    >
      <img
        src={icon}
        alt={text}
        className="w-5 h-5 object-contain transition-transform duration-300 group-hover:scale-110 flex-shrink-0"
      />

      <span
        className={`whitespace-nowrap transition-all duration-300 ease-in-out ${
          isExpanded
            ? "opacity-100 translate-x-0 w-auto"
            : "opacity-0 -translate-x-5 w-0 pointer-events-none"
        }`}
      >
        {text}
      </span>

      {active && isExpanded && (
        <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-azul-interativo shadow-[0_0_8px_rgba(79,125,255,0.8)]"></div>
      )}
    </Link>
  );
}
