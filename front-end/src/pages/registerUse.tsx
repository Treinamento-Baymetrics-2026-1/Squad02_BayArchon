import logo from "@/assets/images/logo4x.png";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export function Register() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
        <header className="w-full px-8 py-6 flex justify-start items-center">
        <img src={logo} alt="BayArchon Logo" className="h-9 object-contain" />
      </header>
      
      <main className="flex-1 flex items-center justify-center p-4">
        <Card className="w-full max-w-[563px] rounded-2xl bg-[#f8fafc] border-2 border-[#D1D5DB] ring-0 outline-none shadow-xl">
          <CardHeader className="px-9 pt-9 pb-4">
            <CardTitle className="text-[22px] font-bold text-azul-marinho">
              Cadastro
            </CardTitle>

            <p className="mt-2 text-[16px] text-cinza-escuro">
              Preencha as informações
            </p>
          </CardHeader>

          <CardContent className="px-9 pb-9">
            <div className="space-y-6">
              
          
              <div className="space-y-[2px]">
                <Label
                  htmlFor="name"
                  className="text-[16px] font-medium text-azul-marinho"
                >
                  Nome Completo
                </Label>
                <Input
                  id="name"
                  type="text"
                  placeholder="Felipe Santos"
                  className="
                    h-12
                    rounded-xl
                    border-2
                    border-cinza-medio
                    bg-white
                    px-4
                    text-[16px]
                    shadow-sm
                    placeholder:text-preto-suave
                    focus-visible:ring-0
                    focus-visible:border-cinza-medio
                  "
                />
              </div>

            
              <div className="space-y-[2px]">
                <Label
                  htmlFor="email"
                  className="text-[16px] font-medium text-azul-marinho"
                >
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="felipe.santos@baymetrics.com.br"
                  className="
                    h-12
                    rounded-xl
                    border-2
                    border-cinza-medio
                    bg-white
                    px-4
                    text-[16px]
                    shadow-sm
                    placeholder:text-preto-suave
                    focus-visible:ring-0
                    focus-visible:border-cinza-medio
                  "
                />
              </div>

              
              <div className="space-y-[2px]">
  <Label
    htmlFor="role"
    className="text-[16px] font-medium text-azul-marinho"
  >
    Nível de acesso
  </Label>
  <Select>
    <SelectTrigger 
      className="
        w-full
        h-12 
        rounded-xl 
        border-2 
        border-cinza-medio 
        bg-white 
        px-4 
        text-[16px] 
        shadow-sm 
        text-preto-suave
        ring-0
        outline-none
        focus:ring-0 
        focus:border-cinza-medio
        data-[state=open]:border-cinza-medio
      "
    >
      <SelectValue placeholder="Colaborador" />
    </SelectTrigger>
    <SelectContent 
      position="popper" 
      sideOffset={4}
      className="
        w-[var(--radix-select-trigger-width)]
        border-2 
        border-cinza-medio 
        rounded-xl 
        bg-white 
        shadow-md
      "
    >
      <SelectItem value="colaborador">Colaborador</SelectItem>
      <SelectItem value="admin">Administrador</SelectItem>
    </SelectContent>
  </Select>
</div>

              {/* Setor (Select) */}
           <div className="space-y-[2px]">
  <Label
    htmlFor="department"
    className="text-[16px] font-medium text-azul-marinho"
  >
    Setor
  </Label>
  <Select>
    <SelectTrigger 
      className="
        w-full
        h-12 
        rounded-xl 
        border-2 
        border-cinza-medio 
        bg-white 
        px-4 
        text-[16px] 
        shadow-sm 
        text-preto-suave
        ring-0
        outline-none
        focus:ring-0 
        focus:border-cinza-medio
        data-[state=open]:border-cinza-medio
      "
    >
      <SelectValue placeholder="TI" />
    </SelectTrigger>
    <SelectContent 
      position="popper" 
      sideOffset={4}
      className="
        w-[var(--radix-select-trigger-width)]
        border-2 
        border-cinza-medio 
        rounded-xl 
        bg-white 
        shadow-md
      "
    >
      <SelectItem value="ti">TI</SelectItem>
      <SelectItem value="rh">RH</SelectItem>
      <SelectItem value="financeiro">Financeiro</SelectItem>
    </SelectContent>
  </Select>
</div>

              {/* Botões */}
              <div className="mt-8 flex items-center justify-end gap-4 pt-2">
                <Button
                  type="button"
                  className="
                    h-12
                    min-w-[120px]
                    rounded-xl
                    border
                    border-cinza-medio
                    bg-[#F8FAFC]
                    text-[16px]
                    font-medium
                    text-preto-suave
                    hover:bg-cinza-claro
                  "
                >
                  Cancelar
                </Button>
                <Button
                  type="submit"
                  className="
                    h-12
                    min-w-[120px]
                    rounded-xl
                    bg-azul-corporativo
                    text-[16px]
                    font-medium
                    text-white
                    hover:bg-azul-marinho
                  "
                >
                  Cadastrar
                </Button>
              </div>

            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}