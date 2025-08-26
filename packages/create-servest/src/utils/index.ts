import { blue, boldGreen, boldRed, boldYellow, green, red, yellow } from '../../../utils/colors';

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
    name: 'Express',
    value: 'express',
    color: boldYellow,
    variants: [
      {
        name: 'Basic - JavaScript',
        value: 'express-basic-js',
        color: yellow,
      },
      {
        name: 'Basic - TypeScript',
        value: 'express-basic-ts',
        color: blue,
      },
      {
        name: 'MVC - CommonJS',
        value: 'express-mvc-cjs',
        color: yellow,
      },
      {
        name: 'MVC - ESM',
        value: 'express-mvc-esm',
        color: yellow,
      },
      {
        name: 'MVC - TypeScript',
        value: 'express-mvc-ts',
        color: blue,
      },
      {
        name: 'Modular - CommonJS',
        value: 'express-modular-cjs',
        color: yellow,
      },
      {
        name: 'Modular - ESM',
        value: 'express-modular-esm',
        color: yellow,
      },
      {
        name: 'Modular - TypeScript',
        value: 'express-modular-ts',
        color: blue,
      },
    ],
  },
  {
    name: 'Django',
    value: 'django',
    color: boldGreen,
    variants: [
      { name: 'Basic', value: 'django-basic', color: green },
      { name: 'API Only', value: 'django-api', color: green },
      { name: 'Channels (WebSocket)', value: 'django-channels', color: green },
      { name: 'Celery (Background Tasks)', value: 'django-celery', color: green },
    ],
  },
  {
    value: 'laravel',
    name: 'Laravel',
    color: boldRed,
    variants: [
      { name: 'Basic', value: 'laravel-basic', color: red },
      { name: 'API Only', value: 'laravel-api', color: red },
      { name: 'Breeze (Simple Auth)', value: 'laravel-breeze', color: red },
      { name: 'Jetstream (Advanced Auth)', value: 'laravel-jetstream', color: red },
    ],
  },
];

// Flattening all template names for quick lookup
export const ALL_TEMPLATES = FRAMEWORKS.flatMap((f) => f.variants.map((v) => v.value));

// prettier-ignore
export const helpMessage = `\
Usage: create-servest [OPTION]... [DIRECTORY]

Create a new Servest backend project.
With no arguments, start the CLI in interactive mode.

Options:
  -t, --template NAME        use a specific template
  -h, --help                 show this help message

Available templates:
${yellow('express-basic-js   express-basic-ts   express-modular-esm')}
${yellow('express-mvc-cjs    express-mvc-esm     express-mvc-ts')}
${yellow('express-modular-cjs    express-modular-esm   express-modular-ts')}
`;

// ${green('django-basic        django-api        django-channels    django-celery')}
// ${red('laravel-basic       laravel-api       laravel-breeze    laravel-jetstream')}

// interface ColorFunc {
//   (str: string | number) : string;
// }
