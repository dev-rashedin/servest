import { ReactNode } from 'react';
import MotionWrapper from '@/components/MotionWrapper';
import './config.layout.css';
import Navbar from '@/components/Navbar';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  return (
    <main>
      <Navbar />
      <section className="wall">
        <MotionWrapper>{children}</MotionWrapper>
      </section>
    </main>
  );
}
