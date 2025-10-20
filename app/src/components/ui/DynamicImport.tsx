'use client';
import dynamic from 'next/dynamic';

const ClientFeedback = dynamic(() => import('@/components/ClientFeedback'), {
  loading: () => <div className="text-center py-10">Loading feedback...</div>,
  ssr: false,
});

const HowItWorks = dynamic(() => import('@/components/HowItWorks'), {
  loading: () => <div className="text-center py-10">Loading steps...</div>,
  ssr: false,
});

export { ClientFeedback, HowItWorks };
