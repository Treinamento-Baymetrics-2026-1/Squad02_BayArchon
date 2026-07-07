import { ArrowRight, ArrowLeft } from "lucide-react";

export function Departaments() {
  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-cinza-escuro">Setores</h2>
        <button className="text-azul-interativo text-sm font-semibold hover:underline">
          +Criar setor
        </button>
      </div>

      <div className="bg-off-white p-6 rounded-xl border border-bordaoff-white shadow-sm flex items-center gap-4">
        <button className="w-8 h-8 rounded-full bg-cinza-medio flex items-center justify-center shrink-0 hover:bg-cinza-escuro/20 transition-colors">
          <ArrowLeft size={16} className="text-cinza-escuro" />
        </button>

        <div className="flex gap-4 overflow-x-auto pb-2 flex-1 scrollbar-hide">
          <div className="bg-verde min-w-[220px] p-4 rounded-xl shadow-md text-white flex flex-col justify-between h-32 relative">
            <div>
              <h3 className="font-bold">Financeiro</h3>
              <p className="text-xs opacity-90">Resp. Beatriz Menezes</p>
            </div>
            <div className="text-sm">
              <p>234 Pastas</p>
              <p>2.080 Documentos</p>
            </div>
          </div>

          <div className="bg-white border-2 border-amarelo min-w-[200px] p-4 rounded-xl flex flex-col justify-center h-32 relative">
            <h3 className="font-bold text-preto-claro">RH</h3>
            <p className="text-sm text-cinza-escuro">543 Pastas</p>
          </div>

          <div className="bg-white border-2 border-azul-interativo min-w-[200px] p-4 rounded-xl flex flex-col justify-center h-32">
            <h3 className="font-bold text-preto-claro">Jurídico</h3>
            <p className="text-sm text-cinza-escuro">348 Pastas</p>
          </div>

          <div className="bg-white border-2 border-vermelho min-w-[200px] p-4 rounded-xl flex flex-col justify-center h-32">
            <h3 className="font-bold text-preto-claro">Operacional</h3>
            <p className="text-sm text-cinza-escuro">1.080 Pastas</p>
          </div>
        </div>

        <button className="w-8 h-8 rounded-full bg-azul-interativo flex items-center justify-center shrink-0 text-white shadow-md hover:bg-azul-corporativo transition-colors">
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
