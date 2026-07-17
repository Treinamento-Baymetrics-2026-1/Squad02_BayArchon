import { useNavigate } from "react-router-dom";
import logo from "../assets/images/logo4x.png";
import { Button } from "@/components/ui/button";

export function RecoverySentPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-[400px] flex flex-col items-center text-center">
        <img
          src={logo}
          alt="BayArchon Logo"
          className="h-12 mb-8 object-contain"
        />

        <h1 className="text-[22px] md:text-[26px] font-medium text-preto-suave mb-4">
          Verifique seu e-mail
        </h1>

        <p className="text-[15px] text-cinza-escuro mb-10 leading-relaxed">
          Enviamos um link de recuperação seguro para a sua caixa de entrada.
          Por favor, clique no link recebido para redefinir a sua senha.
        </p>

        <Button
          onClick={() => navigate("/")}
          variant="outline"
          className="h-12 w-full max-w-[200px] mx-auto rounded-lg border-2 border-[#3b5296] text-[#3b5296] font-medium hover:bg-[#3b5296]/5 transition-colors"
        >
          Voltar ao Login
        </Button>
      </div>
    </div>
  );
}
