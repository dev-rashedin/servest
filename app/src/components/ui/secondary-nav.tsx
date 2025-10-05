import { useState } from 'react';
import { RiArrowRightSLine, RiMenu2Fill } from '@/data';

const SecondaryNav = ({ pathname }: { pathname: string }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [rightSidebarOpen, setRightSidebarOpen] = useState(false);

  return (
    <div className="boundary lg:hidden flex-between h-12 mt-4">
      {pathname.includes('config') || pathname === '/config' ? null : (
        <RiMenu2Fill size={18} onClick={() => setSidebarOpen(true)} />
      )}
      <p className="flex-center text-xs gap-1 text-muted-foreground bg-[rgb(var(--footer-bg))] px-4 py-2 rounded-lg">
        On this page <RiArrowRightSLine size={18} onClick={() => setRightSidebarOpen(true)} />
      </p>

      {sidebarOpen && <div></div>}
      {rightSidebarOpen && <div></div>}

      {/* {sidebarOpen && <Sidebar  />} */}
      {/* {rightSidebarOpen && <RightMobileMenu /> */}
    </div>
  );
};

export default SecondaryNav;
