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
    <>
      <section className="space-y-40">
        <Hero />
        <WhyServest />
        <HowItWorks />
        <ClientFeedback />
        <FinalCTA />
      </section>
      <Footer />
    </>
  );
}
