import { FaDiscord, FaGithub } from 'react-icons/fa';
import { IoSunnyOutline } from 'react-icons/io5';
import { FiEdit, FiMoon } from 'react-icons/fi';

export const navItems = [
  { label: 'Guide', to: '/guide' },
  { label: 'Config', to: '/config' },
  { label: 'Addons', to: '/addons' },
  { label: 'Resources', to: '/resources' },
];

export const docsOrder = {
  guide: ['index', 'f-fileName'],
  addons: [
    'index',
    'philosophy',
    'gettin-started',
    'cli',
    'runtime',
    'features',
    'errors',
    'frameworks',
  ],
};

export { FaGithub, IoSunnyOutline, FiMoon, FaDiscord, FiEdit };
