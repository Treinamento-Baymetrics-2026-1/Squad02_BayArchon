import { Sparkles } from "lucide-react";
import { QuickActions } from "./QuickActions";
import { RecentFolders } from "./RecentFolders";
import { SummaryCards } from "./SummaryCards";
import { Departaments } from "./Departaments";

export function MainContent() {
  return (
    <div className="p-4 md:p-8 overflow-x-hidden">
      <div className="flex flex-col xl:flex-row gap-8">
        <div className="flex-1 space-y-8 min-w-0">
          <section>
            <h1 className="text-2xl font-bold text-azul-corporativo">
              Olá, Ricardo!
            </h1>
            <p className="text-cinza-escuro mb-4">
              Gerencie as pastas, os usuários e os documentos.
            </p>
            <div className="relative">
              <input
                type="text"
                placeholder="Pergunte sobre algum documento para IA"
                className="w-full pl-4 pr-10 py-3 bg-off-white border border-bordaoff-white rounded-lg shadow-sm focus:outline-none focus:ring-1 focus:ring-azul-interativo"
              />
              <Sparkles
                className="absolute right-3 top-1/2 -translate-y-1/2 text-azul-interativo"
                size={20}
              />
            </div>
          </section>

          <SummaryCards />
          <Departaments />
          <RecentFolders />
        </div>

        <div className="w-full xl:w-72 shrink-0 xl:mt-40">
          <QuickActions />
        </div>
      </div>
    </div>
  );
}
