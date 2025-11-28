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
      <div className="container max-w-7xl mx-auto px-4 py-8 space-y-8">
        {/* Header */}
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <Terminal className="h-8 w-8 text-primary" />
            <h1 className="text-4xl font-bold tracking-tight">Developer Toolkit</h1>
          </div>
          <p className="text-muted-foreground text-lg">
            Quick access to your most-used commands
          </p>
        </div>

        {/* URL Generator */}
        <URLGenerator />

        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search commands, descriptions, or sections..."
            className="pl-10 h-12 text-base"
          />
        </div>

        {/* Commands */}
        {filteredSections.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-muted-foreground text-lg">No commands found matching "{search}"</p>
          </div>
        ) : (
          <Accordion type="multiple" defaultValue={filteredSections.map((_, i) => `section-${i}`)} className="space-y-4">
            {filteredSections.map((section, idx) => (
              <AccordionItem
                key={`section-${idx}`}
                value={`section-${idx}`}
                className="border border-border rounded-lg bg-card overflow-hidden"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-muted/50 transition-colors">
                  <div className="flex flex-col items-start gap-1 text-left">
                    <h2 className="text-lg font-semibold">{section.title}</h2>
                    {section.description && (
                      <p className="text-sm text-muted-foreground">{section.description}</p>
                    )}
                    <span className="text-xs text-muted-foreground mt-1">
                      {Object.keys(section.commands).length} command{Object.keys(section.commands).length !== 1 ? 's' : ''}
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pt-4">
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
