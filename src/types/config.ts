export interface CommandSection {
  title: string;
  description?: string;
  commands: Record<string, string>;
}

export interface AppConfig {
  urlMap: Record<string, string>;
  commandSections: CommandSection[];
}

declare global {
  interface Window {
    APP_CONFIG?: AppConfig;
  }
}
