declare type TLanguages = 'ts' | 'js' | 'py' | 'php' | 'unknown';

declare type TArchitecture = 'mvc' | 'modular' | 'basic' | 'apps-based' | 'laravel-mvc';

declare type TRuntime = 'node' | 'bun' | 'python' | 'php' | 'unknown';

declare type TPackageManager = 'npm' | 'yarn' | 'pnpm' | 'bun' | 'unknown';

declare interface IServestConfig {
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

declare interface IPropsOption {
  cwd: string;
  config: IServestConfig;
  packageManager: TPackageManager;
}

declare interface IIPropsOptionWithBaseDir extends IPropsOption {
  baseDir: string;
}

declare interface ICwdAndPkgManager {
  cwd: string;
  packageManager: TPackageManager;
}
