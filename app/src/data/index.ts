import { FaDiscord, FaGithub } from 'react-icons/fa';
import { IoCloseCircleOutline, IoSunnyOutline } from 'react-icons/io5';
import { FiEdit, FiMoon } from 'react-icons/fi';
import {
  RiArrowRightDoubleFill,
  RiArrowRightSLine,
  RiMenu2Fill,
  RiMenu3Fill,
} from 'react-icons/ri';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';
import { SiBun, SiDeno, SiPnpm, SiYarn } from 'react-icons/si';
import { CgNpm } from 'react-icons/cg';

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

export {
  FaGithub,
  IoSunnyOutline,
  FiMoon,
  FaDiscord,
  FiEdit,
  IoCloseCircleOutline,
  RiMenu3Fill,
  RiMenu2Fill,
  RiArrowRightSLine,
  IoIosArrowDown,
  IoIosArrowUp,
  SiYarn,
  SiPnpm,
  SiBun,
  SiDeno,
  CgNpm,
  RiArrowRightDoubleFill,
};
