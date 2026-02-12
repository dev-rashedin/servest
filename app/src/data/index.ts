import { CgNpm } from 'react-icons/cg';
import {
  FaBolt,
  FaCodeBranch,
  FaCubes,
  FaDiscord,
  FaGithub,
  FaLaptopCode,
  FaMagic,
  FaPlug,
  FaRocket,
  FaServer,
  FaTerminal,
} from 'react-icons/fa';
import { FiEdit, FiMoon } from 'react-icons/fi';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { IoCloseCircleOutline, IoSunnyOutline } from 'react-icons/io5';
import {
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
  RiMenu2Fill,
  RiMenu3Fill,
} from 'react-icons/ri';
import { SiBun, SiDeno, SiPnpm, SiYarn } from 'react-icons/si';

export const navItems = [
  { label: 'Guide', to: '/guide' },
  { label: 'Config', to: '/config' },
  { label: 'Addons', to: '/addons' },
  {
    label: 'Resources',
    dropdown: [
      { label: 'Blog', to: '/blog' },
      {
        label: 'create-servest',
        subMenu: [
          { label: 'npm Package', to: 'https://www.npmjs.com/package/create-servest' },
          {
            label: 'Changelog',
            to: 'https://github.com/dev-rashedin/servest/blob/main/packages/create-servest/CHANGELOG.md',
          },
        ],
      },
      {
        label: 'servest-addons',
        subMenu: [
          { label: 'npm Package', to: 'https://www.npmjs.com/package/servest' },
          {
            label: 'Changelog',
            to: 'https://github.com/dev-rashedin/servest/blob/main/packages/servest-addons/CHANGELOG.md',
          },
        ],
      },
      {
        label: 'Contributing',
        to: 'https://github.com/dev-rashedin/servest/blob/main/CONTRIBUTING.md',
      },
    ],
  },
];

export const docsOrder: Record<string, string[]> = {
  guide: [
    '_Introduction',
    'index',
    'why-servest',
    'our-journey',
    '_Reference',
    'cli-reference',
    '_Templates',
  ],
  addons: [
    'index',
    '_Addons',
    'f-fileName',
    'eslint',
    'prettier',
    'eslint-prettier',
    'mongoose',
    'prisma',
    'drizzle',
    'lint-staged',
  ],
};

export const nestedDocsOrder: Record<string, { label: string; items: string[] }[]> = {
  templates: [
    {
      label: 'Express',
      items: [
        'express-basic-js',
        'express-basic-ts',
        'express-mvc-cjs',
        'express-mvc-esm',
        'express-mvc-ts',
        'express-modular-cjs',
        'express-modular-esm',
        'express-modular-ts',
      ],
    },
    {
      label: 'Fastify',
      items: [
        'fastify-basic-js',
        'fastify-basic-ts',
        'fastify-mvc-cjs',
        'fastify-mvc-esm',
        'fastify-plugin-cjs',
        'fastify-plugin-esm',
      ],
    },
    // {
    //   label: 'Django',
    //   items: ['django-basic-py', 'django-auth'],
    // },
    // {
    //   label: 'Laravel',
    //   items: ['laravel-basic-php', 'laravel-auth'],
    // },
  ],
};

export const features = [
  {
    icon: FaBolt,
    title: 'Instant Scaffolding',
    desc: 'Spin up production-ready backend templates within seconds — no setup hassle.',
  },
  {
    icon: FaCubes,
    title: 'Framework Agnostic',
    desc: 'Supports Express — more frameworks like Nest, Fastify, and Django coming soon.',
  },
  {
    icon: FaCodeBranch,
    title: 'Addon-Driven',
    desc: 'Easily add tools like ESLint, Prettier, or Prisma — just like shadcn for backend utilities.',
  },
  {
    icon: FaMagic,
    title: 'Developer Experience First',
    desc: 'Built for simplicity, consistency, and scalability — inspired by create-vite’s speed.',
  },
  {
    icon: FaRocket,
    title: 'Fast Prototyping',
    desc: 'Get your backend project running in minutes and iterate rapidly without friction.',
  },
  {
    icon: FaServer,
    title: 'Production Ready',
    desc: 'All templates follow best practices and include essential tooling to deploy safely.',
  },
];

export const steps = [
  {
    icon: FaTerminal,
    title: 'Create',
    desc: 'Create a backend project immediately with your framework of choice.',
    code: 'npm create servest@latest',
  },
  {
    icon: FaPlug,
    title: 'Add',
    desc: 'Add tools like ESLint, Mongoose, or Prisma using a single command.',
    code: 'npx servest@latest add mongoose',
  },
  {
    icon: FaLaptopCode,
    title: 'Build',
    desc: 'Start coding your backend with zero setup — everything’s ready.',
    code: 'npm run start',
  },
];

export {
  CgNpm,
  FaDiscord,
  FaGithub,
  FiEdit,
  FiMoon,
  IoCloseCircleOutline,
  IoIosArrowDown,
  IoIosArrowUp,
  IoSunnyOutline,
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
  RiMenu2Fill,
  RiMenu3Fill,
  SiBun,
  SiDeno,
  SiPnpm,
  SiYarn,
};
