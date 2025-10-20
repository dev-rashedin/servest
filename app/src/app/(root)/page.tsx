import {
  ClientFeedback,
  FinalCTA,
  Footer,
  Hero,
  HowItWorks,
  WhyServest,
} from '@/components/HomePage';

export default function HomePage() {
  return (
    <main className="space-y-40">
      <Hero />
      <WhyServest />
      <HowItWorks />
      <ClientFeedback />
      <FinalCTA />
      <Footer />
    </main>
  );
}
