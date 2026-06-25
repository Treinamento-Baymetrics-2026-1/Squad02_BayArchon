import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import logo from "@/assets/images/logo4x.png";
import { LoginForm } from "@/components/login/LoginForm";

export function Login() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <header className="w-full px-8 py-6 flex justify-start items-center">
        <img src={logo} alt="BayArchon Logo" className="h-9 object-contain" />
      </header>

      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-[563px] rounded-2xl bg-off-white border-2 border-bordaoff-white ring-0 outline-none shadow-xl">
          <CardHeader className="px-9 pt-9 pb-4">
            <CardTitle className="text-[18px] font-semibold text-preto-suave">
              Login
            </CardTitle>

            <p className="mt-3 text-[18px] text-cinza-escuro">
              Preencha essas informações
            </p>
          </CardHeader>

          <CardContent className="px-9 pb-9">
            <LoginForm />
          </CardContent>
        </Card>
      </main>
    </div>
  );
}
