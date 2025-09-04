declare module 'rehype-shiki' {
  import { Plugin } from 'unified';
  interface Options {
    theme?: string | Record<string, any>;
    langs?: string[];
  }
  const rehypeShiki: Plugin<[Options?]>;
  export default rehypeShiki;
}
