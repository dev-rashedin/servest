// types/index.d.ts
declare global {
  interface IArgv {
    template?: string;
    help?: boolean;
    h?: boolean;
    overwrite?: boolean;
    addons?: string;
    a?: string;
  }

  interface Variant {
    value: string;
    name: string;
    color: (text: string) => string;
    customCommand?: string;
  }

  interface Framework {
    value: string;
    name: string;
    color: (text: string) => string;
    variants: Variant[];
  }

  interface PkgInfo {
    name: string;
    version: string;
  }
}

// This line is necessary for modules so TypeScript treats this file as a module
export {};
