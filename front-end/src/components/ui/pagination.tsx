import { Button } from "@/components/ui/button";
import MoreHorizontal from "../../assets/icons/MoreHorizontal.svg?react";
import ChevronRight from "../../assets/icons/chevron-right.svg?react";
import ChevronLeft from "../../assets/icons/chevron-left.svg?react";

export function Pagination() {
  return (
    <div className="relative z-10 flex items-center justify-center space-x-2 mt-6 py-4 w-full bg-off-white shrink-0">
      <Button
        variant="ghost"
        size="sm"
        className="text-cinza-escuro hover:text-azul-marinho"
      >
        <ChevronLeft className="w-4 h-4 mr-1" /> Anterior
      </Button>

      <Button
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0 text-cinza-escuro"
      >
        1
      </Button>
      <Button
        variant="outline"
        size="sm"
        className="w-8 h-8 p-0 border-bordaoff-white bg-white font-bold text-azul-marinho shadow-sm"
      >
        2
      </Button>
      <Button
        variant="ghost"
        size="sm"
        className="w-8 h-8 p-0 text-cinza-escuro"
      >
        3
      </Button>

      <MoreHorizontal className="w-4 h-4 text-cinza-medio mx-1" />

      <Button
        variant="ghost"
        size="sm"
        className="text-azul-interativo hover:bg-transparent hover:text-azul-corporativo font-medium"
      >
        Próximo <ChevronRight className="w-4 h-4 ml-1" />
      </Button>
    </div>
  );
}
