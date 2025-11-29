import { useState, useMemo } from "react";
import { Search, Terminal } from "lucide-react";
import { Input } from "@/components/ui/input";
import { CommandCard } from "@/components/CommandCard";
import { URLGenerator } from "@/components/URLGenerator";
import { COMMAND_SECTIONS } from "@/data/commands";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const Index = () => {
  const [search, setSearch] = useState("");

  const filteredSections = useMemo(() => {
    if (!search.trim()) return COMMAND_SECTIONS;

    const query = search.toLowerCase();
    return COMMAND_SECTIONS.map((section) => {
      const filteredCommands = Object.entries(section.commands).filter(
        ([cmd, desc]) =>
          cmd.toLowerCase().includes(query) ||
          desc.toLowerCase().includes(query) ||
          section.title.toLowerCase().includes(query)
      );

      return {
        ...section,
        commands: Object.fromEntries(filteredCommands),
      };
    }).filter((section) => Object.keys(section.commands).length > 0);
  }, [search]);

  return (
    <div className="min-h-screen bg-background">
      <div className="container max-w-[1600px] mx-auto px-4 py-4 space-y-4">
        {/* Header */}
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <Terminal className="h-6 w-6 text-primary" />
            <h1 className="text-2xl font-bold tracking-tight">Developer Toolkit</h1>
          </div>
          <p className="text-muted-foreground text-sm">
            Quick access to your most-used commands
          </p>
        </div>

        {/* URL Generator */}
        <URLGenerator />

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-2.5 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands, descriptions, or sections..."
            className="pl-9 h-9 text-sm"
          />
        </div>

        {/* Commands */}
        {filteredSections.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-muted-foreground text-sm">No commands found matching "{search}"</p>
          </div>
        ) : (
          <Accordion type="multiple" defaultValue={filteredSections.map((_, i) => `section-${i}`)} className="space-y-2">
            {filteredSections.map((section, idx) => (
              <AccordionItem
                key={`section-${idx}`}
                value={`section-${idx}`}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <AccordionTrigger className="px-4 py-2.5 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-start gap-0.5 text-left">
                    <h2 className="text-base font-semibold">{section.title}</h2>
                    {section.description && (
                      <p className="text-xs text-muted-foreground">{section.description}</p>
                    )}
                    <span className="text-xs text-muted-foreground">
                      {Object.keys(section.commands).length} command{Object.keys(section.commands).length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-4 pb-3">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2.5 pt-2">
                    {Object.entries(section.commands).map(([cmd, desc]) => (
                      <CommandCard key={cmd} command={cmd} description={desc} />
                    ))}
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        )}
      </div>
    </div>
  );
};

export default Index;
