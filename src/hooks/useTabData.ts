import { useState, useEffect } from "react";

export interface CommandSection {
  title: string;
  description?: string;
  commands: Record<string, string>;
}

export interface AppData {
  urlMap: Record<string, string>;
  commandSections: CommandSection[];
}

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/justamitsaha/configurationServer/main";

export const useTabData = (tabId: string) => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${GITHUB_RAW_BASE}/${tabId}.json`);
        if (!response.ok) {
          throw new Error(`Failed to load ${tabId} data`);
        }
        const jsonData: AppData = await response.json();
        setData(jsonData);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load data");
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [tabId]);

  return { data, loading, error };
};
