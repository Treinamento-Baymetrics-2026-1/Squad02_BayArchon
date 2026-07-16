import { AiChatCard } from "../components/ai-chat-page/AiChatCard";
import { AiChatArea } from "../components/ai-chat-page/AiChatArea";

export function AiChatPage() {
  return (
    <div className="p-4 md:p-6 flex flex-col xl:flex-row gap-6 min-h-[calc(100vh-4rem)]">
      <div className="w-full xl:w-72 shrink-0 order-2 xl:order-1 flex flex-col">
        <AiChatCard />
      </div>

      <div className="flex-1 min-w-0 order-1 xl:order-2 flex flex-col">
        <AiChatArea />
      </div>
    </div>
  );
}
