import type { TabConfig } from "@/types/config";

export const DEFAULT_TABS: TabConfig[] = [
  { id: "kubernetes", label: "Kubernetes", dataFile: "kubernetes.json" },
  { id: "docker", label: "Docker", dataFile: "docker.json" },
  { id: "git", label: "Git", dataFile: "git.json" },
  { id: "linux", label: "Linux", dataFile: "linux.json" },
];

export const getTabs = (): TabConfig[] => {
  if (typeof window !== "undefined" && window.APP_CONFIG?.tabs) {
    return window.APP_CONFIG.tabs;
  }
  return DEFAULT_TABS;
};
