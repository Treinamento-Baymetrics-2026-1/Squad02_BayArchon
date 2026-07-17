import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

export function RequiredAsterisk() {
  return (
    <TooltipProvider delayDuration={200}>
      <Tooltip>
        <TooltipTrigger asChild>
          <span className="text-vermelho cursor-help ml-1">*</span>
        </TooltipTrigger>
        <TooltipContent className="bg-vermelho text-white text-xs border-none">
          <p>Campo obrigatório</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
