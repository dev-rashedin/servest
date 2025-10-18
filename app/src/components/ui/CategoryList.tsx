import { AnimatePresence, motion } from 'motion/react';
import Link from 'next/link';
import { FC } from 'react';
import AnimatedBorder from './AnimatedBorder';

interface SubItem {
  slug: string;
  label: string;
}

interface Category {
  label: string;
  items?: SubItem[];
}

interface Props {
  cat: Category;
  type: string;
  pathname: string;
  openCategories: Record<string, boolean>;
  setSidebarOpen?: (open: boolean) => void;
}

const CategoryList: FC<Props> = ({ cat, type, pathname, openCategories, setSidebarOpen }) => {
  return (
    <div className="overflow-hidden">
      <AnimatePresence>
        {openCategories[cat.label] && (
          <motion.div
            key={cat.label}
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            {cat.items?.map((sub, i) => {
              const href = `/${type}/${cat.label.toLowerCase()}/${sub.slug}`;
              const isActive = pathname === href;

              return (
                <motion.div
                  key={sub.slug}
                  initial={{ opacity: 0, y: -5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  transition={{ duration: 0.2, delay: i * 0.05 }}
                >
                  <Link
                    href={href}
                    className={`ml-6 mt-2 block ${isActive ? 'text-brand font-medium' : ''}`}
                    onClick={() => setSidebarOpen?.(false)}
                  >
                    {sub.label}
                    <AnimatedBorder />
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default CategoryList;
