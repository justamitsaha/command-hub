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
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-sm text-card-foreground mb-1 line-clamp-2">
              {description}
            </h3>
          </div>
          <Button
            size="sm"
            variant="ghost"
            onClick={handleCopy}
            className="shrink-0 h-8 w-8 p-0 hover:bg-primary/10"
          >
            {copied ? (
              <Check className="h-4 w-4 text-primary" />
            ) : (
              <Copy className="h-4 w-4 text-muted-foreground group-hover:text-primary transition-colors" />
            )}
          </Button>
        </div>
        
        <div className="rounded-md bg-code-bg text-code-text p-3 font-mono text-xs overflow-x-auto">
          <pre className="whitespace-pre-wrap break-all">{command}</pre>
        </div>
      </div>
    </div>
  );
};
