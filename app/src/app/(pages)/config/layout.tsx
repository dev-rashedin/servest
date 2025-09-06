import { ReactNode } from 'react';
import MotionWrapper from '@/components/MotionWrapper';
import './config.layout.css';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="wall">
      <MotionWrapper>{children}</MotionWrapper>
    </main>
  );
}
