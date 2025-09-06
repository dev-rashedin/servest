import { ReactNode } from 'react';
import Sidebar from '@/components/Sidebar';
import { getAddonLinks } from '@/scripts/getAddonLinks';

interface AddonsLayoutProps {
  children: ReactNode;
}

const links = getAddonLinks();

// Server component
export default async function AddonsLayout({ children }: AddonsLayoutProps) {
  return (
    <div className="flex w-full h-full">
      <Sidebar links={links} type="addons" />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto px-36 pt-16">{children}</main>
    </div>
  );
}
