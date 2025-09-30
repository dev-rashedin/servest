import Footer from '@/components/Footer';
import Hero from '@/components/Hero';

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col">
      <div className="flex-1">
        <Hero />
      </div>
      <Footer />
    </main>
  );
}
