declare interface IArgv {
  template?: string;
  help?: boolean;
  h?: boolean;
  overwrite?: boolean;
  addons?: string;
  a?: string;
}

declare interface Variant {
  value: string;
  name: string;
  color: (text: string) => string;
  customCommand?: string;
}

declare interface Framework {
  value: string;
  name: string;
  color: (text: string) => string;
  variants: Variant[];
}

declare interface PkgInfo {
  name: string;
  version: string;
}
