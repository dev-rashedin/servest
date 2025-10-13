import { FaDiscord, FaGithub } from 'react-icons/fa';
import { IoCloseCircleOutline, IoSunnyOutline } from 'react-icons/io5';
import { FiEdit, FiMoon } from 'react-icons/fi';
import { RiArrowRightSLine, RiMenu2Fill, RiMenu3Fill } from 'react-icons/ri';
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
    'why-Servest',
    'our-Journey',
    '_Reference',
    'folder-Structure',
    'cli-reference',
    'template-options',
    'preinstalled-Packages',
  ],
  addons: [
    'index',
    '_Addons',
    'f-fileName',
    'eslint',
    'prettier',
    'eslint-Prettier',
    'mongoose',
    'prisma',
    'drizzle',
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
};
