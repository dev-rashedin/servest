import {
  ContributeSection,
  DevFeedback,
  FinalCTA,
  Footer,
  Hero,
  HowItWorks,
  WhyServest,
} from '@/components/HomePageSections';

export default function HomePage() {
  return (
    <>
      <section className="space-y-40">
        <Hero />
        <WhyServest />
        <HowItWorks />
        <DevFeedback />
        <ContributeSection />
        <FinalCTA />
      </section>
      <Footer />
    </>
  );
}
