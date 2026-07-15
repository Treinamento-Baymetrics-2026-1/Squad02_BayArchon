import { Button } from "@/components/ui/button";

interface DeleteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  message?: string;
}

export function ConfirmDeleteModal({ 
  isOpen, 
  onClose, 
  onConfirm, 
  message = "Você tem certeza que quer excluir esse registro?" 
}: DeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center bg-preto-suave/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[420px] p-8 text-center animate-in zoom-in-95 duration-200">
        <h3 className="text-[18px] font-semibold text-azul-marinho mb-8 leading-snug">
          {message}
        </h3>
        
        <div className="flex items-center justify-center gap-4">
          <Button 
            variant="outline" 
            onClick={onClose}
            className="h-10 px-6 rounded-lg border border-azul-corporativo bg-transparent text-azul-corporativo hover:bg-azul-corporativo/5 font-medium"
          >
            Cancelar
          </Button>
          
          <Button 
            onClick={onConfirm}
            className="h-10 px-6 rounded-lg bg-vermelho hover:bg-red-600 text-white font-medium shadow-none"
          >
            Excluir
          </Button>
        </div>
        
      </div>
    </div>
  );
}