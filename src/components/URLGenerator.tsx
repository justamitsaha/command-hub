import { useState } from "react";
import { Copy, Check, ExternalLink, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface URLGeneratorProps {
  urlMap: Record<string, string>;
}

export const URLGenerator = ({ urlMap }: URLGeneratorProps) => {
  const [host, setHost] = useState("http://localhost");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const entries = Object.entries(urlMap);
  
  if (entries.length === 0) {
    return null;
  }

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <Card>
        <CardHeader className="pb-3">
          <CollapsibleTrigger className="w-full flex items-center justify-between hover:opacity-80 transition-opacity">
            <CardTitle className="text-base">Dynamic URL Generator</CardTitle>
            <ChevronDown className={`h-4 w-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
          </CollapsibleTrigger>
        </CardHeader>
        <CollapsibleContent>
          <CardContent className="space-y-3">
            <div className="flex gap-2">
              <Input
                value={host}
                onChange={(e) => setHost(e.target.value)}
                placeholder="http://localhost"
                className="flex-1 h-8 text-sm"
              />
              <Button variant="outline" size="sm" onClick={() => setHost("http://localhost")} className="h-8 text-xs">
                Reset
              </Button>
            </div>

            <div className="space-y-1.5">
              {entries.map(([name, path]) => {
                const fullUrl = `${host}${path}`;
                const isCopied = copiedUrl === fullUrl;
                
                return (
                  <div
                    key={name}
                    className="flex items-center justify-between gap-2 p-2 rounded-md bg-code-bg text-code-text hover:ring-2 hover:ring-primary/50 transition-all group"
                  >
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-xs text-code-text/90 mb-0.5">
                        {name}
                      </div>
                      <div className="font-mono text-[10px] text-code-text/70 truncate">
                        {fullUrl}
                      </div>
                    </div>
                    <div className="flex gap-0.5 shrink-0">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => handleCopy(fullUrl)}
                        className="h-6 w-6 p-0 text-code-text/70 hover:text-code-text hover:bg-code-text/10"
                      >
                        {isCopied ? (
                          <Check className="h-3 w-3" />
                        ) : (
                          <Copy className="h-3 w-3" />
                        )}
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => window.open(fullUrl, "_blank")}
                        className="h-6 w-6 p-0 text-code-text/70 hover:text-code-text hover:bg-code-text/10"
                      >
                        <ExternalLink className="h-3 w-3" />
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </CollapsibleContent>
      </Card>
    </Collapsible>
  );
};
