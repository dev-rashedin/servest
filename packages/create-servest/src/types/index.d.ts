declare interface IArgv {
  template?: string;
  t?: string;
  help?: boolean;
  h?: boolean;
  version?: boolean;
  v?: boolean;
  overwrite?: boolean;
  addons?: string;
  a?: string;
  framework?: string;
  dotnet?: string;
  database?: string;
  orm?: string;
  auth?: string;
  authorization?: string;
  docker?: boolean;
  tests?: string;
  git?: boolean;
  example?: string;
  dryRun?: boolean;
  'dry-run'?: boolean;
  nonInteractive?: boolean;
  'non-interactive'?: boolean;
  config?: string;
}

declare interface IVariant {
  value: string;
  name: string;
  color: (text: string) => string;
  customCommand?: string;
}

declare interface IFramework {
  value: string;
  name: string;
  color: (text: string) => string;
  variants: Variant[];
}

declare interface IPkgInfo {
  name: string;
  version: string;
}
