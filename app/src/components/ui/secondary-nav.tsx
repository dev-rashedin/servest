import { RiArrowRightSLine, RiMenu2Fill } from '@/data';
import { useSidebar } from '@/components/SidebarToggleContext';

const SecondaryNav = ({ pathname }: { pathname: string }) => {
  const { setSidebarOpen, rightSidebarOpen, setRightSidebarOpen } = useSidebar();

  return (
    <div className="boundary flex-between h-12 sticky top-0 bg-docs py-8 ">
      {pathname.includes('config') || pathname === '/config' ? null : (
        <RiMenu2Fill size={18} onClick={() => setSidebarOpen(true)} className="lg:hidden" />
      )}

      <p
        onClick={() => setRightSidebarOpen(!rightSidebarOpen)}
        className="flex-center text-sm gap-1 text-muted-foreground bg-[rgb(var(--footer-bg))] px-4 py-2 rounded-lg xl:hidden cursor-pointer"
      >
        On this page
        <RiArrowRightSLine
          size={18}
          className={`transition-transform duration-300 ease-[cubic-bezier(0.25,1,0.5,1)] ease-in-out ${
            rightSidebarOpen ? 'rotate-0' : 'rotate-90'
          }`}
        />
      </p>
    </div>
  );
};

export default SecondaryNav;
