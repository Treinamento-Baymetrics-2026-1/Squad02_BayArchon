import Folder from "../../assets/icons/pasta.svg?react";
import React from "react";

const foldersData = [
  { name: "Fornecedores", docs: 240, active: true },
  { name: "Clientes", docs: 240, active: false },
  { name: "Diretoria", docs: 240, active: false },
  { name: "Relatórios Gerenciais", docs: 240, active: false },
  { name: "Políticas Internas", docs: 240, active: false },
];

export function RecentFolders() {
  return (
    <section className="mt-8">
      <h2 className="text-sm font-bold text-cinza-escuro mb-3">
        Pastas recentes
      </h2>

      <div className="bg-off-white border border-bordaoff-white rounded-xl shadow-sm flex items-center h-32 overflow-hidden">
        {foldersData.map((folder, index) => (
          <React.Fragment key={index}>
            {index > 0 && (
              <div className="w-[1px] h-24 bg-bordaoff-white shrink-0" />
            )}
            <div className="flex-1 flex flex-col items-center justify-center p-4 cursor-pointer hover:bg-cinza-claro/50 transition-colors h-full">
              <Folder
                strokeWidth={1.5}
                className={`w-8 h-8 mb-1 ${folder.active ? "text-azul-interativo" : "text-cinza-escuro"}`}
              />

              <h3
                className={`text-sm font-semibold text-center w-full ${folder.active ? "text-azul-interativo" : "text-cinza-escuro"}`}
              >
                {folder.name}
              </h3>
              <p
                className={`text-xs mt-1 font-medium text-center w-full ${folder.active ? "text-azul-interativo/80" : "text-cinza-escuro"}`}
              >
                {folder.docs} Documentos
              </p>
            </div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
}
