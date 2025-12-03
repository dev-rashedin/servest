import { boldGreen, boldYellow, cyan, green, yellow } from '../../../utils/colors';

export const FRAMEWORKS: IFramework[] = [
  {
    name: 'Express',
    value: 'express',
    color: boldYellow,
    variants: [
      {
        name: 'Basic - JavaScript',
        value: 'express-basic-js',
        color: yellow,
        framework: 'express',
      },
      {
        name: 'Basic - TypeScript',
        value: 'express-basic-ts',
        color: cyan,
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
        color: cyan,
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
        color: cyan,
      },
    ],
  },
  {
    name: 'Fastify',
    value: 'fastify',
    color: boldYellow,
    variants: [
      {
        name: 'Basic - JavaScript',
        value: 'fastify-basic-js',
        color: yellow,
        framework: 'fastify',
      },
      {
        name: 'Basic - TypeScript',
        value: 'fastify-basic-ts',
        color: cyan,
        framework: 'fastify',
      },
      {
        name: 'MVC - CommonJS',
        value: 'fastify-mvc-cjs',
        color: yellow,
        framework: 'fastify',
      },
      {
        name: 'MVC - ESM',
        value: 'fastify-mvc-esm',
        color: yellow,
        framework: 'fastify',
      },
      {
        name: 'MVC - TypeScript',
        value: 'fastify-mvc-ts',
        color: cyan,
        framework: 'fastify',
      },
      {
        name: 'Plugin - CommonJS',
        value: 'fastify-plugin-cjs',
        color: yellow,
        framework: 'fastify',
      },
      {
        name: 'Plugin - ESM',
        value: 'fastify-plugin-esm',
        color: yellow,
        framework: 'fastify',
      },
    ],
  },
  {
    name: 'Django',
    value: 'django',
    color: boldGreen,
    variants: [
      { name: 'Basic', value: 'django-basic', color: green },
      // { name: 'API Only', value: 'django-api', color: green },
      // { name: 'Channels (WebSocket)', value: 'django-channels', color: green },
      // { name: 'Celery (Background Tasks)', value: 'django-celery', color: green },
    ],
  },
  // {
  //   value: 'laravel',
  //   name: 'Laravel',
  //   color: boldRed,
  //   variants: [
  //     { name: 'Basic', value: 'laravel-basic', color: red },
  //     { name: 'API Only', value: 'laravel-api', color: red },
  //     { name: 'Breeze (Simple Auth)', value: 'laravel-breeze', color: red },
  //     { name: 'Jetstream (Advanced Auth)', value: 'laravel-jetstream', color: red },
  //   ],
  // },
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
${yellow('fastify-basic-js   fastify-basic-ts   fastify-mvc-cjs')}
${yellow('fastify-mvc-esm    fastify-mvc-ts     fastify-plugin-cjs')}
${yellow('fastify-plugin-esm')}
`;

// ${green('django-basic        django-api        django-channels    django-celery')}
// ${red('laravel-basic       laravel-api       laravel-breeze    laravel-jetstream')}

// interface ColorFunc {
//   (str: string | number) : string;
// }
