export interface TabConfig {
  id: string;
  label: string;
  dataFile: string;
}

export const DEFAULT_TABS: TabConfig[] = [
  { id: "kubernetes", label: "Kubernetes", dataFile: "kubernetes.json" },
  { id: "docker", label: "Docker", dataFile: "docker.json" },
  { id: "git", label: "Git", dataFile: "git.json" },
  { id: "linux", label: "Linux", dataFile: "linux.json" },
];

declare global {
  interface Window {
    APP_CONFIG?: {
      tabs?: TabConfig[];
    };
  }
}

export const getTabs = (): TabConfig[] => {
  if (typeof window !== "undefined" && window.APP_CONFIG?.tabs) {
    return window.APP_CONFIG.tabs;
  }
  return DEFAULT_TABS;
};
