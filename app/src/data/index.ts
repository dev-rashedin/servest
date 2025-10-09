import { FaDiscord, FaGithub } from 'react-icons/fa';
import { IoCloseCircleOutline, IoSunnyOutline } from 'react-icons/io5';
import { FiEdit, FiMoon } from 'react-icons/fi';
import { RiArrowRightSLine, RiMenu2Fill, RiMenu3Fill } from 'react-icons/ri';
import { IoIosArrowDown, IoIosArrowUp } from 'react-icons/io';

export const navItems = [
  { label: 'Guide', to: '/guide' },
  { label: 'Config', to: '/config' },
  { label: 'Addons', to: '/addons' },
  {
    label: 'Resources',
    dropdown: [
      {
        label: 'Packages',
        dropdown: [
          { label: 'create-servest', to: 'https://www.npmjs.com/package/create-servest' },
          { label: 'servest-addons', to: 'https://www.npmjs.com/package/servest' },
        ],
      },
      { label: 'Blog', to: '/blog' },
      { label: 'GitHub', to: 'https://github.com/dev-rashedin/servest' },
      { label: 'Discord', to: 'https://discord.gg/AhqDGZj3' },
      { label: 'Changelog', to: 'https://github.com/dev-rashedin/servest/blob/main/CHANGELOG.md' },
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
    'core-Concept',
    'cli',
    'runtime',
    'features',
    'errors',
    'frameworks',
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
};
