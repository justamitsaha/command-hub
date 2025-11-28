import { useState } from "react";
import { Copy, Check, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { URL_MAP } from "@/data/commands";

export const URLGenerator = () => {
  const [host, setHost] = useState("http://localhost");
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const handleCopy = async (url: string) => {
    await navigator.clipboard.writeText(url);
    setCopiedUrl(url);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Dynamic URL Generator</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-2">
          <Input
            value={host}
            onChange={(e) => setHost(e.target.value)}
            placeholder="http://localhost"
            className="flex-1"
          />
          <Button variant="outline" size="sm" onClick={() => setHost("http://localhost")}>
            Reset
          </Button>
        </div>

        <div className="space-y-2 max-h-96 overflow-y-auto pr-2">
          {Object.entries(URL_MAP).map(([name, path]) => {
            const fullUrl = `${host}${path}`;
            const isCopied = copiedUrl === fullUrl;
            
            return (
              <div
                key={name}
                className="flex items-center justify-between gap-3 p-3 rounded-md bg-code-bg text-code-text hover:ring-2 hover:ring-primary/50 transition-all group"
              >
                <div className="flex-1 min-w-0">
                  <div className="font-semibold text-xs text-code-text/90 mb-1">
                    {name}
                  </div>
                  <div className="font-mono text-xs text-code-text/70 truncate">
                    {fullUrl}
                  </div>
                </div>
                <div className="flex gap-1 shrink-0">
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleCopy(fullUrl)}
                    className="h-8 w-8 p-0 text-code-text/70 hover:text-code-text hover:bg-code-text/10"
                  >
                    {isCopied ? (
                      <Check className="h-4 w-4" />
                    ) : (
                      <Copy className="h-4 w-4" />
                    )}
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => window.open(fullUrl, "_blank")}
                    className="h-8 w-8 p-0 text-code-text/70 hover:text-code-text hover:bg-code-text/10"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            );
          })}
        </div>
      </CardContent>
    </Card>
  );
};
