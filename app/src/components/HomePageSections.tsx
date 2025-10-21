'use client';
import dynamic from 'next/dynamic';
import Hero from './ui/Home/Hero';
import Footer from './ui/Home/Footer';
import LoadingSkeleton from './ui/Home/LoadingSkeleton';

const DevFeedback = dynamic(() => import('@/components/ui/Home/DevFeedback'), {
  loading: () => <div className="text-center py-10">Loading feedback...</div>,
  ssr: false,
});

const HowItWorks = dynamic(() => import('@/components/ui/Home/HowItWorks'), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});

const WhyServest = dynamic(() => import('@/components/ui/Home/WhyServest'), {
  loading: () => <LoadingSkeleton />,
  ssr: false,
});
const ContributeSection = dynamic(() => import('@/components/ui/Home/ContributeSection'), {
  loading: () => <div className="text-center py-10">Loading features...</div>,
  ssr: false,
});
const FinalCTA = dynamic(() => import('@/components/ui/Home/FinalCTA'), {
  loading: () => <div className="text-center py-10">Loading features...</div>,
  ssr: false,
});

export { Hero, DevFeedback, HowItWorks, WhyServest, ContributeSection, FinalCTA, Footer };
