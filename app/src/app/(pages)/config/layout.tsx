import { ReactNode } from 'react';
import MotionWrapper from '@/components/MotionWrapper';

export default function AddonsLayout({ children }: { children: ReactNode }) {
  return (
    <main className="w-screen h-full fixed bg-[#1B1B1F]">
      <div className="">
        <MotionWrapper>{children}</MotionWrapper>
      </div>
    </main>
  );
}
