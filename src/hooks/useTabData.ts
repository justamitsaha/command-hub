import { useState, useEffect } from "react";
import type { AppData } from "@/types/config";

const BASE_PATH = import.meta.env.BASE_URL || "/";

export const useTabData = (tabId: string) => {
  const [data, setData] = useState<AppData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null);
      
      try {
        const response = await fetch(`${BASE_PATH}data/${tabId}.json`);
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
