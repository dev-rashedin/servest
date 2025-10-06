import { RiArrowRightSLine, RiMenu2Fill } from '@/data';
import { useSidebar } from '@/components/SidebarToggleContext';

const SecondaryNav = ({ pathname }: { pathname: string }) => {
  const { setSidebarOpen, setRightSidebarOpen } = useSidebar();

  return (
    <div className="boundary lg:hidden flex-between h-12 mt-4">
      {pathname.includes('config') || pathname === '/config' ? null : (
        <RiMenu2Fill size={18} onClick={() => setSidebarOpen(true)} />
      )}

      <p
        onClick={() => setRightSidebarOpen(true)}
        className="flex-center text-xs gap-1 text-muted-foreground bg-[rgb(var(--footer-bg))] px-4 py-2 rounded-lg"
      >
        On this page <RiArrowRightSLine size={18} />
      </p>
    </div>
  );
};

export default SecondaryNav;
