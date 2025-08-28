declare type Languages = 'ts' | 'js' | 'py' | 'php' | 'unknown';

declare type Architecture = 'mvc' | 'modular' | 'basic' | 'apps-based' | 'laravel-mvc';

declare type Runtime = 'node' | 'bun' | 'python' | 'php' | 'unknown';

declare type PackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun' | 'unknown';

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

declare interface PropsOption {
  cwd: string;
  config: ServestConfig;
  packageManager: PackageManager;
}

declare interface PropsOptionWithBaseDir extends PropsOption {
  baseDir: string;
}
