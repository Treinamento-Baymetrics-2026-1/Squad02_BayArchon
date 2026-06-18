import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

import logo from "@/assets/images/logo4x.png";

export function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full px-8 py-6 flex justify-start items-center">
        <img src={logo} alt="BayArchon Logo" className="h-9 object-contain" />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-[563px] rounded-2xl bg-[#f8fafc] border-2 border-[#D1D5DB] ring-0 outline-none shadow-xl">
          <CardHeader className="px-9 pt-9 pb-4">
            <CardTitle className="text-[18px] font-semibold text-preto-suave">
              Login
            </CardTitle>

            <p className="mt-3 text-[18px] text-cinza-escuro">
              Preencha essas informações
            </p>
          </CardHeader>

          <CardContent className="px-9 pb-9">
            <div className="space-y-8">
              <div className="space-y-[2px]">
                <Label
                  htmlFor="email"
                  className="text-[16px] font-medium text-[#0A0A0A]"
                >
                  Email
                </Label>

                <Input
                  id="email"
                  type="email"
                  placeholder="m@example.com"
                  className="
            h-12
            rounded-xl
            border-2
            border-cinza-medio
            bg-white
            px-4
            text-[16px]
            shadow-sm
            placeholder:text-cinza-escuro
            focus-visible:ring-0
            focus-visible:border-cinza-medio
          "
                />
              </div>

              <div className="space-y-[2px]">
                <div className="flex items-center justify-between">
                  <Label
                    htmlFor="password"
                    className="text-[16px] font-medium text-[#0A0A0A]"
                  >
                    Senha
                  </Label>

                  <a
                    href="#"
                    className="text-[15px] text-azul-interativo hover:underline"
                  >
                    Esqueceu a senha?
                  </a>
                </div>

                <Input
                  id="password"
                  type="password"
                  placeholder="Digite sua senha"
                  className="
            h-12
            rounded-xl
            border-2
            border-cinza-medio
            bg-white
            px-4
            text-[16px]
            shadow-sm
            placeholder:text-cinza-escuro
            focus-visible:ring-0
            focus-visible:border-cinza-medio
          "
                />
              </div>

              <Button
                type="submit"
                className="
          mt-4
          h-12
          w-full
          rounded-xl
          bg-azul-corporativo
          text-white
          text-[16px]
          font-medium
          hover:bg-azul-marinho
        "
              >
                Entrar
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
