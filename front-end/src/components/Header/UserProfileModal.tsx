import { X } from "lucide-react";
import avatarImage from "../../assets/images/avatar-image.png";
import ApartamentsIcon from "../../assets/icons/apartament.svg?react";
import EscudoIcon from "../../assets/icons/escudo.svg?react";
import PencilIcon from "../../assets/icons/pencil.svg?react";
import { Button } from "@/components/ui/button";

interface UserProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-preto-suave/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-off-white rounded-[20px] shadow-xl w-full max-w-[480px] relative animate-in zoom-in-95 duration-200 overflow-hidden">
        <button 
          onClick={onClose}
          className="absolute right-5 top-5 text-cinza-escuro hover:text-preto-suave transition-colors"
        >
          <X className="w-6 h-6 stroke-[2]" />
        </button>

        <div className="pt-10 pb-6 flex flex-col items-center">
          <img 
            src={avatarImage} 
            alt="Ricardo Alves" 
            className="w-24 h-24 rounded-full shadow-sm mb-4 object-cover"
          />
          <h2 className="text-[24px] font-bold text-preto-suave leading-tight">
            Ricardo Alves
          </h2>
          <p className="text-[15px] text-cinza-escuro mt-1">
            ricardo.alves@baymetrics.com.br
          </p>
        </div>

        <div className="px-8 pb-8">
          <h3 className="text-[15px] font-medium text-cinza-escuro mb-3">
            Informações do usuário
          </h3>

          <div className="space-y-4">
            
            <div className="bg-white border border-bordaoff-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
              <div className="text-azul-corporativo">
                 <ApartamentsIcon className="w-8 h-8 stroke-current" stroke="currentColor" fill="none" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-azul-corporativo">Setor</p>
                <p className="text-[16px] font-medium text-preto-suave mt-0.5">Recursos Humanos</p>
              </div>
            </div>

            <div className="bg-white border border-bordaoff-white rounded-xl p-4 flex items-center gap-4 shadow-sm">
              <div className="text-azul-corporativo">
                 <EscudoIcon className="w-8 h-8 stroke-current" stroke="currentColor" fill="none" />
              </div>
              <div>
                <p className="text-[13px] font-medium text-azul-corporativo">Nível de acesso</p>
                <p className="text-[16px] font-medium text-preto-suave mt-0.5">Gestor</p>
              </div>
            </div>

          </div>

          <div className="flex items-center justify-end gap-3 pt-8">
            <Button 
              variant="outline" 
              onClick={onClose} 
              className="h-10 px-6 rounded-lg border border-bordaoff-white bg-white text-preto-suave font-medium hover:bg-off-white"
            >
              Fechar
            </Button>
            <Button 
              className="h-10 px-6 rounded-lg bg-azul-corporativo hover:bg-azul-marinho text-white font-medium flex items-center gap-2"
            >
              <PencilIcon className="w-4 h-4 stroke-current" stroke="currentColor" fill="none" /> 
              Editar
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}