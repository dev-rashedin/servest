import { ReactNode } from 'react';
import { SidebarProvider } from '@/components/SidebarToggleContext';

export default function PagesLayout({ children }: { children: ReactNode }) {
  return (
    <SidebarProvider>
      <main>{children}</main>
    </SidebarProvider>
  );
}
