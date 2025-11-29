import { Copy, Check } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";

interface CommandCardProps {
  command: string;
  description: string;
}

export const CommandCard = ({ command, description }: CommandCardProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(command);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="group relative rounded-lg border border-border bg-card overflow-hidden hover:border-primary/50 transition-all duration-200">
      <div className="p-2.5 space-y-2">
        <div className="flex items-start justify-between gap-2">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-xs text-card-foreground mb-0.5 line-clamp-2">
              {description}
            </h3>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="shrink-0 h-6 w-6 p-0 hover:bg-primary/10"
          >
            {copied ? (
              <Check className="h-3 w-3 text-primary" />
            ) : (
              <Copy className="h-3 w-3 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </Button>
        </div>
        
        <div className="rounded-md bg-code-bg text-code-text p-2 font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre-wrap break-all">{command}</pre>
        </div>
      </div>
    </div>
  );
};
