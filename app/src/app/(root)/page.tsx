import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { ClientFeedback, HowItWorks, WhyServest } from '@/components/DynamicImport';

export default function HomePage() {
  return (
    <main className="space-y-40">
      <Hero />
      <WhyServest />
      <HowItWorks />
      <ClientFeedback />
      <Footer />
    </main>
  );
}
