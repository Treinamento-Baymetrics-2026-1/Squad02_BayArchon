import type { ReactNode } from "react";
import { X } from "lucide-react";

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  description: string;
  children: ReactNode;
}

export function BaseModal({
  isOpen,
  onClose,
  title,
  description,
  children,
}: BaseModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-preto-suave/40 backdrop-blur-sm p-4 animate-in fade-in duration-200">
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-[500px] relative animate-in zoom-in-95 duration-200">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-cinza-escuro hover:text-preto-suave transition-colors"
        >
          <X className="w-6 h-6 stroke-[2]" />
        </button>

        <div className="p-8 pb-6">
          <h2 className="text-[22px] font-bold text-azul-marinho leading-tight">
            {title}
          </h2>
          <p className="text-cinza-escuro mt-1 text-[15px]">{description}</p>
        </div>

        <div className="px-8 pb-8">{children}</div>
      </div>
    </div>
  );
}
