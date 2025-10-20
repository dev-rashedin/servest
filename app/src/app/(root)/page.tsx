import Hero from '@/components/Hero';
import Footer from '@/components/Footer';
import { ClientFeedback, HowItWorks } from '@/components/ui/DynamicImport';

export default function HomePage() {
  return (
    <main className="space-y-40">
      <Hero />
      <HowItWorks />
      <ClientFeedback />
      <Footer />
    </main>
  );
}
