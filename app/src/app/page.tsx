import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { FaGithub } from '@/data/icons';

export default function HomePage() {
  return (
    <section className="min-h-[70vh] max-w-3xl  mx-auto flex flex-col items-center justify-center text-center ">
      <h1
        className="text-5xl lg:text-7xl font-heading font-bold mb-6 tracking-wide"
        style={{ lineHeight: '1.2' }}
      >
        The Ultimate Backend Builder
      </h1>
      <p className="md:text-[16px] lg:text-xl font-medium text-muted-foreground  leading-8 lg:leading-9">
        The simplest way to bootstrap backend projects. Generate clean templates, add the tools you
        need, and evolve your stack without friction.
      </p>
      <p className="text-sm mt-2 text-muted-foreground opacity-85">
        Express templates are available now, more frameworks coming soon!
      </p>
      <div className="flex gap-4 mt-8">
        <Button variant="default" size="lg">
          <Link href="/guide">Get Started</Link>
        </Button>
        <Button variant="outline" size="lg">
          <Link href="/https://github.com/dev-rashedin-servest" className="flex-center gap-2">
            <FaGithub style={{ width: '18px', height: '18px' }} /> GitHub
          </Link>
        </Button>
      </div>
    </section>
  );
}
