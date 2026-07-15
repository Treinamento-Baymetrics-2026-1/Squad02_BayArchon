import { useNavigate } from "react-router-dom";
import { Hammer, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ConstructionPageProps {
  title?: string;
}

export function ConstructionPage({ title }: ConstructionPageProps) {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center animate-in fade-in duration-300">
      <div className="w-20 h-20 bg-azul-corporativo/10 rounded-full flex items-center justify-center mb-6 text-azul-corporativo animate-bounce">
        <Hammer className="w-10 h-10 stroke-[2]" />
      </div>

      <h1 className="text-2xl md:text-3xl font-bold text-azul-marinho mb-2">
        {title ? `Página de ${title}` : "Página em construção"}
      </h1>
      
      <p className="text-cinza-escuro text-[15px] max-w-md mb-8 leading-relaxed">
        Estamos trabalhando muito para deixar essa tela prontinha e incrível para você!
      </p>

      <Button 
        onClick={() => navigate("/admin")}
        className="h-11 px-6 rounded-xl bg-azul-corporativo hover:bg-azul-marinho text-white text-[15px] font-medium flex items-center gap-2 shadow-sm transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        Voltar para a Visão Geral
      </Button>

    </div>
  );
}