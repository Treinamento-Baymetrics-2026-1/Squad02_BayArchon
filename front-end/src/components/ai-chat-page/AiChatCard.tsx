import { Button } from "@/components/ui/button";

export function AiChatCard() {
  const quickPrompts = ["Relatório", "Resumo", "Comparar versões", "Dashboard"];

  const recentQuestions = [
    "Quais documentos foram modificados na últi...",
    "Quais documentos mencionam LGPD?",
    "Liste documentos sem atualização há mais...",
    "Mostre os arquivos mais acessados este mês",
  ];

  return (
    <div className="w-full h-full bg-white border border-bordaoff-white rounded-xl shadow-sm flex flex-col overflow-hidden">
      <div className="p-4 border-b border-bordaoff-white shrink-0">
        <h3 className="text-sm font-semibold text-azul-corporativo mb-3">
          Prompts rápidos
        </h3>

        <div className="grid grid-cols-2 xl:grid-cols-1 gap-2">
          {quickPrompts.map((prompt, index) => (
            <Button
              key={index}
              variant="outline"
              className="w-full justify-center text-xs font-medium bg-off-white border-transparent hover:bg-azul-corporativo hover:text-white transition-colors h-8"
            >
              {prompt}
            </Button>
          ))}
        </div>
      </div>

      <div className="p-4 flex-1 overflow-y-auto min-h-0">
        <h3 className="text-sm font-semibold text-azul-corporativo mb-3">
          Recentes
        </h3>
        <div className="flex flex-col gap-1">
          {recentQuestions.map((question, index) => (
            <Button
              key={index}
              variant="ghost"
              className={`w-full justify-start text-xs font-normal truncate h-8 px-2 shrink-0 ${
                index === 0
                  ? "bg-azul-interativo/10 text-azul-corporativo"
                  : "text-cinza-escuro hover:bg-off-white"
              }`}
            >
              {question}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
}
