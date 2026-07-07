import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

import SendIcon from "../../assets/icons/SendIcon.svg?react";
import SparklesIcon from "../../assets/icons/sparklesIcon.svg?react";
import CopyIcon from "../../assets/icons/CopyIcon.svg?react";
import ThumbsUpIcon from "../../assets/icons/ThumbsUpIcon.svg?react";
import ThumbsDownIcon from "../../assets/icons/ThumbsDownIcon.svg?react";
import LoadingIcon from "../../assets/icons/LoadingIcon.svg?react";

type Message = {
  id: string;
  role: "user" | "ai";
  content: string;
};

export function AiChatArea() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isLoading]);

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const newUserMsg: Message = {
      id: Date.now().toString(),
      role: "user",
      content: inputValue,
    };
    setMessages((prev) => [...prev, newUserMsg]);
    setInputValue("");
    setIsLoading(true);

    setTimeout(() => {
      setIsLoading(false);
      const newAiMsg: Message = {
        id: (Date.now() + 1).toString(),
        role: "ai",
        content:
          "Encontrei o documento **Manual_do_Colaborador.xml** e preparei um resumo dos principais pontos.\n\nPrincipais informações:\n• Horário de trabalho: 08h às 17h.\n• Regime híbrido: permitido para setores autorizados.\n• Férias: devem ser solicitadas com pelo menos 30 dias de antecedência.\n\nSe desejar, posso detalhar qualquer um desses tópicos.",
      };
      setMessages((prev) => [...prev, newAiMsg]);
    }, 2000);
  };

  const isChatEmpty = messages.length === 0;

  return (
    <div className="flex-1 bg-off-white rounded-xl border border-bordaoff-white shadow-sm flex flex-col relative">
      {!isChatEmpty && (
        <div className="h-14 border-b border-bordaoff-white flex items-center px-6 bg-white shrink-0 rounded-t-xl">
          <div className="flex items-center gap-2 text-azul-interativo">
            <SparklesIcon className="w-5 h-5" />
            <span className="font-bold text-azul-marinho">IArchon</span>
          </div>
        </div>
      )}
      <div
        className={`p-6 flex flex-col ${isChatEmpty ? "justify-center items-center min-h-[60vh]" : ""}`}
      >
        {isChatEmpty && (
          <div className="max-w-4xl text-center mb-8 px-4 flex flex-col items-center">
            <h1 className="text-4xl font-bold text-azul-corporativo mb-4">
              Bem vindo ao{" "}
              <span className="text-azul-interativo text-5xl">IA</span>rchon!
            </h1>
            <p className="text-azul-corporativo text-2xl leading-relaxed">
              Faça perguntas sobre seus documentos, solicite resumos, dashboards
              ou relatórios e encontre as informações que precisa em segundos.
            </p>
          </div>
        )}

        {!isChatEmpty && (
          <div className="max-w-3xl mx-auto w-full flex flex-col gap-6 pb-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {msg.role === "user" && (
                  <div className="bg-cinza-claro text-preto-claro px-5 py-3 rounded-2xl rounded-tr-sm max-w-[80%] text-lg">
                    {msg.content}
                  </div>
                )}

                {msg.role === "ai" && (
                  <div className="bg-white border border-bordaoff-white shadow-sm px-6 py-5 rounded-2xl rounded-tl-sm max-w-[90%] text-lg text-preto-claro whitespace-pre-wrap">
                    {msg.content}

                    <div className="flex items-center gap-3 mt-4 pt-4 border-t border-bordaoff-white text-cinza-escuro">
                      <button className="hover:text-azul-interativo transition-colors">
                        <CopyIcon className="w-5 h-5" />
                      </button>
                      <button className="hover:text-verde transition-colors">
                        <ThumbsUpIcon className="w-5 h-5" />
                      </button>
                      <button className="hover:text-vermelho transition-colors">
                        <ThumbsDownIcon className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start items-center gap-3 text-cinza-escuro text-lg">
                <LoadingIcon className="w-6 h-6 animate-spin text-azul-interativo" />
                Aguarde um momento
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        )}
      </div>

      <div
        className={`w-full max-w-3xl mx-auto shrink-0 z-10 sticky bottom-0 bg-off-white pb-6 px-6 ${isChatEmpty ? "mt-8" : "mt-auto pt-4"}`}
      >
        <div className="relative shadow-sm rounded-xl bg-white border border-bordaoff-white">
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
            placeholder="Descreva o que precisa"
            className="w-full pr-14 pl-5 py-7 text-lg text-cinza-escuro border-none rounded-xl focus-visible:ring-azul-interativo bg-transparent"
          />
          <Button
            onClick={handleSendMessage}
            disabled={!inputValue.trim() || isLoading}
            className="absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 p-0 rounded-full bg-azul-corporativo hover:bg-azul-interativo transition-colors disabled:opacity-50"
          >
            <SendIcon className="w-5 h-5 text-white" />
          </Button>
        </div>
        {!isChatEmpty && (
          <p className="text-center text-xs text-cinza-escuro mt-3">
            A IA pode cometer erros. Verifique dados importantes.
          </p>
        )}
      </div>
    </div>
  );
}
