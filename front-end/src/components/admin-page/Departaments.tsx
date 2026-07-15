import { useRef } from "react";
import { ArrowRight, ArrowLeft } from "lucide-react";

export function Departaments() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 240;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold text-cinza-escuro">Setores</h2>
        <button className="text-azul-interativo text-sm font-semibold hover:underline">
          +Criar setor
        </button>
      </div>

      <div className="bg-off-white p-6 rounded-xl border border-bordaoff-white shadow-sm flex items-center gap-4">
        <button
          onClick={() => scroll("left")}
          className="w-8 h-8 rounded-full bg-cinza-medio flex items-center justify-center shrink-0 hover:bg-cinza-escuro/20 transition-colors"
        >
          <ArrowLeft size={16} className="text-cinza-escuro" />
        </button>
        <div
          ref={scrollRef}
          className="flex gap-4 overflow-x-auto pb-2 flex-1 scrollbar-hide"
        >
          <div className="group bg-white border-2 border-verde hover:bg-verde cursor-pointer transition-all duration-300 min-w-[220px] p-4 rounded-xl flex flex-col justify-between h-32 relative">
            <div>
              <h3 className="font-bold text-preto-claro group-hover:text-white transition-colors">
                Financeiro
              </h3>
              <p className="text-xs text-cinza-escuro group-hover:text-white/90 transition-colors">
                Resp. Beatriz Menezes
              </p>
            </div>
            <div className="text-sm text-cinza-escuro group-hover:text-white/90 transition-colors">
              <p>234 Pastas</p>
              <p>2.080 Documentos</p>
            </div>
          </div>

          <div className="group bg-white border-2 border-amarelo hover:bg-amarelo cursor-pointer transition-all duration-300 min-w-[200px] p-4 rounded-xl flex flex-col justify-center h-32 relative">
            <h3 className="font-bold text-preto-claro group-hover:text-white transition-colors">
              RH
            </h3>
            <p className="text-sm text-cinza-escuro group-hover:text-white/90 transition-colors">
              543 Pastas
            </p>
          </div>

          <div className="group bg-white border-2 border-azul-interativo hover:bg-azul-interativo cursor-pointer transition-all duration-300 min-w-[200px] p-4 rounded-xl flex flex-col justify-center h-32">
            <h3 className="font-bold text-preto-claro group-hover:text-white transition-colors">
              Jurídico
            </h3>
            <p className="text-sm text-cinza-escuro group-hover:text-white/90 transition-colors">
              348 Pastas
            </p>
          </div>

          <div className="group bg-white border-2 border-vermelho hover:bg-vermelho cursor-pointer transition-all duration-300 min-w-[200px] p-4 rounded-xl flex flex-col justify-center h-32">
            <h3 className="font-bold text-preto-claro group-hover:text-white transition-colors">
              Operacional
            </h3>
            <p className="text-sm text-cinza-escuro group-hover:text-white/90 transition-colors">
              1.080 Pastas
            </p>
          </div>
        </div>

        <button
          onClick={() => scroll("right")}
          className="w-8 h-8 rounded-full bg-azul-interativo flex items-center justify-center shrink-0 text-white shadow-md hover:bg-azul-corporativo transition-colors"
        >
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
