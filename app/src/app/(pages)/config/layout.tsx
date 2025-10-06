import { ReactNode } from 'react';
import MotionWrapper from '@/components/MotionWrapper';
import '../pages.layout.css';
import Navbar from '@/components/Navbar';

export default function ConfigLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-docs">
      <Navbar type="config" />
      <div className="wall">
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
