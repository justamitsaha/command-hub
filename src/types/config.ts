export interface CommandSection {
  title: string;
  description?: string;
  commands: Record<string, string>;
}

export interface TabConfig {
  id: string;
  label: string;
  dataFile: string;
}

export interface AppData {
  urlMap: Record<string, string>;
  commandSections: CommandSection[];
}

export interface AppConfig {
  tabs?: TabConfig[];
}

declare global {
  interface Window {
    APP_CONFIG?: AppConfig;
  }
}
