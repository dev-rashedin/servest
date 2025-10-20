'use client';
import dynamic from 'next/dynamic';
import Hero from './ui/Home/Hero';
import Footer from './ui/Home/Footer';

const ClientFeedback = dynamic(() => import('@/components/ui/Home/ClientFeedback'), {
  loading: () => <div className="text-center py-10">Loading feedback...</div>,
  ssr: false,
});

const HowItWorks = dynamic(() => import('@/components/ui/Home/HowItWorks'), {
  loading: () => <div className="text-center py-10">Loading steps...</div>,
  ssr: false,
});

const WhyServest = dynamic(() => import('@/components/ui/Home/WhyServest'), {
  loading: () => <div className="text-center py-10">Loading features...</div>,
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

export { Hero, ClientFeedback, HowItWorks, WhyServest, ContributeSection, FinalCTA, Footer };
