declare type Languages = 'ts' | 'js' | 'py' | 'php' | 'unknown';

declare type Architecture = 'mvc' | 'modular' | 'basic' | 'apps-based' | 'laravel-mvc';

declare type Runtime = 'node' | 'bun' | 'python' | 'php' | 'unknown';

declare interface ServestConfig {
  servestVersion: string;
  framework: string;
  language: Languages;
  architecture: Architecture;
  srcDir: boolean;
  environment: {
    runtime: Runtime;
    nodeVersion?: string;
    bunVersion?: string;
    pythonVersion?: string;
    phpVersion?: string;
  };
  features: Record<string, any>;
  createdAt: string;
}

declare interface AddMongooseOptions {
  baseDir: string;
  language: string;
  packageManager: 'npm' | 'yarn' | 'pnpm' | 'bun';
}
