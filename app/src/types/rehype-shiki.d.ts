declare module 'rehype-shiki' {
  import { Plugin } from 'unified';
  import type { Theme, ThemeRegistration } from 'shiki';

  interface Options {
    theme?: string | Theme | ThemeRegistration | Record<string, Theme | ThemeRegistration>;
    langs?: string[];
  }

  const rehypeShiki: Plugin<[Options?]>;
  export default rehypeShiki;
}
