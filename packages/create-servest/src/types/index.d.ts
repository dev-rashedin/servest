declare interface IArgv {
  template?: string;
  help?: boolean;
  h?: boolean;
  overwrite?: boolean;
  addons?: string;
  a?: string;
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
