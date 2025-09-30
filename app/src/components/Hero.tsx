import Link from 'next/link';
import { HiArrowNarrowRight } from 'react-icons/hi';
import { Button } from './ui/button';
import { FaGithub } from '@/data/icons';

const Hero = () => {
  return (
    <main className="relative min-h-[90vh] max-w-5xl mx-auto flex flex-col items-center justify-center text-center px-4 md:px-6 lg:px-8 py-12 sm:py-16 md:py-20">
      {/* Background decorative elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 sm:w-80 md:w-96 h-64 sm:h-80 md:h-96 bg-gradient-to-br from-yellow-sunshine/10 to-yellow-dusk/5 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-1/4 right-1/4 w-60 sm:w-72 md:w-80 h-60 sm:h-72 md:h-80 bg-gradient-to-br from-brand/10 to-highlight/5 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Badge/Label */}
      <div className="inline-flex items-center px-3 sm:px-4 py-1.5 sm:py-2 mb-6 sm:mb-8 rounded-full border border-brand/20 bg-background/50 backdrop-blur-sm hero-fade-in">
        <span className="text-xs sm:text-sm font-medium text-brand">
          ✨ Backend Development Made Simple
        </span>
      </div>

      {/* Main Heading */}
      <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-heading font-bold mb-4 sm:mb-6 tracking-tight hero-slide-up">
        <span className="block">The Ultimate</span>
        <span className="block bg-gradient-to-r from-brand via-yellow-dusk to-highlight bg-clip-text text-transparent text-glow-hover transition-all duration-500">
          Backend Builder
        </span>
      </h1>

      {/* Subtitle */}
      <p className="max-w-2xl mx-auto text-sm sm:text-base md:text-lg lg:text-xl font-medium text-muted-foreground leading-relaxed mb-4">
        The simplest way to bootstrap backend projects. Generate clean templates, add the tools you
        need, and evolve your stack without friction.
      </p>

      {/* Status Badge */}
      <div className="inline-flex flex-wrap justify-center items-center gap-1.5 sm:gap-2 px-2.5 sm:px-3.5 py-1.5 mb-6 sm:mb-8 md:mb-10 rounded-full bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 max-w-[90%] sm:max-w-md">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shrink-0"></div>
        <span className="text-xs sm:text-sm text-green-700 dark:text-green-300 font-medium text-center">
          Express templates available • More frameworks coming soon
        </span>
      </div>

      {/* CTA Buttons */}
      <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-8 w-full">
        <Button
          variant="default"
          size="lg"
          className="group relative overflow-hidden w-full sm:w-auto"
        >
          <Link
            href="/guide"
            className="relative z-10 flex items-center justify-center gap-2 w-full"
          >
            Get Started
            <HiArrowNarrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </Button>

        <Button variant="outline" size="lg" className="group w-full sm:w-auto">
          <Link
            href="https://github.com/dev-rashedin/servest"
            className="flex items-center justify-center gap-2 w-full"
          >
            <FaGithub className="w-5 h-5 transition-transform group-hover:scale-110" />
            View on GitHub
          </Link>
        </Button>
      </div>

      {/* Features highlight */}
      <div className="flex flex-wrap justify-center gap-3 sm:gap-4 md:gap-6 text-xs sm:text-sm text-muted-foreground/80 px-2">
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-1 h-1 bg-brand rounded-full"></div>
          <span>Clean Templates</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-1 h-1 bg-brand rounded-full"></div>
          <span>Zero Configuration</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-1 h-1 bg-brand rounded-full"></div>
          <span>Production Ready</span>
        </div>
        <div className="flex items-center gap-1.5 sm:gap-2">
          <div className="w-1 h-1 bg-brand rounded-full"></div>
          <span>Modern Stack</span>
        </div>
      </div>
    </main>
  );
};

export default Hero;
