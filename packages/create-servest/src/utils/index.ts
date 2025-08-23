import { blue, boldGreen, boldRed, boldYellow, green, red, yellow } from './console-colors';

type CancelOperation = (message?: string) => void;

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

export const FRAMEWORKS: Framework[] = [
  {
    value: 'express',
    name: 'Express',
    color: boldYellow,
    variants: [
      {
        value: 'basic-js',
        name: 'Basic - JavaScript',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-basic-js',
      },
      {
        value: 'basic-ts',
        name: 'Basic - TypeScript',
        color: blue,
        customCommand: 'npm create servest@latest -- --template express-basic-ts',
      },
      {
        value: 'mvc-cjs',
        name: 'MVC - CommonJS',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-mvc-cjs',
      },
      {
        value: 'mvc-esm',
        name: 'MVC - ESM',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-mvc-esm',
      },
      {
        value: 'mvc-ts',
        name: 'MVC - TypeScript',
        color: blue,
        customCommand: 'npm create servest@latest -- --template express-mvc-ts',
      },
      {
        value: 'modular-cjs',
        name: 'Modular - CommonJS',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-modular-cjs',
      },
      {
        value: 'modular-esm',
        name: 'Modular - ESM',
        color: yellow,
        customCommand: 'npm create servest@latest -- --template express-modular-esm',
      },
      {
        value: 'modular-ts',
        name: 'Modular - TypeScript',
        color: blue,
        customCommand: 'npm create servest@latest -- --template express-modular-ts',
      },
    ],
  },
  {
    value: 'django',
    name: 'Django',
    color: boldGreen,
    variants: [
      { value: 'basic', name: 'Basic', color: green },
      { value: 'api', name: 'API Only', color: green },
      { value: 'channels', name: 'Channels (WebSocket)', color: green },
      { value: 'celery', name: 'Celery (Background Tasks)', color: green },
    ],
  },
  {
    value: 'laravel',
    name: 'Laravel',
    color: boldRed,
    variants: [
      { value: 'basic', name: 'Basic', color: red },
      { value: 'api', name: 'API Only', color: red },
      { value: 'breeze', name: 'Breeze (Simple Auth)', color: red },
      { value: 'jetstream', name: 'Jetstream (Advanced Auth)', color: red },
    ],
  },
];

// Flattening all template names for quick lookup
export const ALL_TEMPLATES = FRAMEWORKS.flatMap((f) =>
  f.variants.map((v) => `${f.value}-${v.value}`),
);

export const cancelOperation: CancelOperation = (message = 'Operation cancelled') => {
  console.error(red(message));
  process.exit(1);
};
