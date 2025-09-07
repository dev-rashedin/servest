import { ReactNode } from 'react';
import MotionWrapper from '@/components/MotionWrapper';
import './config.layout.css';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="bg-docs">
      <div className="wall">
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
