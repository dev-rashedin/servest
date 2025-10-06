import { FaDiscord, FaGithub } from 'react-icons/fa';
import { IoCloseCircleOutline, IoSunnyOutline } from 'react-icons/io5';
import { FiEdit, FiMoon } from 'react-icons/fi';
import { RiArrowRightSLine, RiMenu2Fill, RiMenu3Fill } from 'react-icons/ri';

export const navItems = [
  { label: 'Guide', to: '/guide' },
  { label: 'Config', to: '/config' },
  { label: 'Addons', to: '/addons' },
  { label: 'Resources', to: '/resources' },
];

export const docsOrder: Record<string, string[]> = {
  addons: ['index', 'f-fileName'],
  guide: [
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
};
