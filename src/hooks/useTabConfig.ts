import { useState, useEffect } from "react";

export interface TabConfig {
  id: string;
  label: string;
  dataFile: string;
}

const GITHUB_RAW_BASE = "https://raw.githubusercontent.com/justamitsaha/configurationServer/main";

const DEFAULT_TABS: TabConfig[] = [
  { id: "kubernetes", label: "Kubernetes", dataFile: "kubernetes.json" },
  { id: "docker", label: "Docker", dataFile: "docker.json" },
  { id: "git", label: "Git", dataFile: "git.json" },
  { id: "linux", label: "Linux", dataFile: "linux.json" },
];

export const useTabConfig = () => {
  const [tabs, setTabs] = useState<TabConfig[]>(DEFAULT_TABS);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTabs = async () => {
      try {
        // Check for runtime config first (Kubernetes ConfigMap)
        if (typeof window !== "undefined" && window.APP_CONFIG?.tabs) {
          setTabs(window.APP_CONFIG.tabs);
          setLoading(false);
          return;
        }

        // Fetch from JSON file
        const response = await fetch(`${GITHUB_RAW_BASE}/tabs.json`);
        if (response.ok) {
          const data = await response.json();
          if (data.tabs && Array.isArray(data.tabs)) {
            setTabs(data.tabs);
          }
        }
      } catch (err) {
        console.warn("Failed to fetch tabs config, using defaults:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchTabs();
  }, []);

  return { tabs, loading };
};

// Keep global type declaration
declare global {
  interface Window {
    APP_CONFIG?: {
      tabs?: TabConfig[];
    };
  }
}

