import Link from 'next/link';
import { Button } from './ui/button';
import { FaGithub } from '@/data/icons';

const Hero = () => {
  return (
    <main className="min-h-[81vh] max-w-3xl  mx-auto flex-col-center text-center ">
      <em>Inspired by vite and shadcn</em>
      <h1 className="mb-5 hover:glow" style={{ lineHeight: '1.1' }}>
        The Ultimate Backend Builder
      </h1>
      <h5 className="md:max-w-2xl  lg:max-w-3xl">
        The simplest way to bootstrap backend projects. Generate clean templates, add the tools you
        need, and evolve your stack without friction.
      </h5>
      <p className="text-sm md:text-base mt-5 text-muted-foreground opacity-85">
        Express templates are available now, more frameworks coming soon!
      </p>
      <div className="flex gap-4 mt-8">
        <Button variant="default" size="lg">
          <Link href="/guide">Get Started</Link>
        </Button>
        <Button variant="outline" size="lg">
          <Link href="/https://github.com/dev-rashedin-servest" className="flex-center gap-2">
            <FaGithub style={{ height: '1.2em', width: '1.2em' }} />
            GitHub
          </Link>
        </Button>
      </div>
    </main>
  );
};
export default Hero;
