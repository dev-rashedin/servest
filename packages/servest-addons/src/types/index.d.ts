declare type Language = 'ts' | 'js' | 'py' | 'php' | 'unknown';

declare type Architecture = 'mvc' | 'modular' | 'basic';

declare interface ServestConfig {
  framework: string;
  language: Language;
  architecture: 'mvc' | 'modular' | 'basic';
  srcDir: boolean;
  createdAt: string;
}
