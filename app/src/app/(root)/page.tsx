import {
  ClientFeedback,
  ContributeSection,
  FinalCTA,
  Footer,
  Hero,
  HowItWorks,
  WhyServest,
} from '@/components/HomePage';

export default function HomePage() {
  return (
    <>
      <section className="space-y-40">
        <Hero />
        <WhyServest />
        <HowItWorks />
        <ClientFeedback />
        <ContributeSection />
        <FinalCTA />
      </section>
      <Footer />
    </>
  );
}
