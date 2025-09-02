import Link from 'next/link';

export default function HomePage() {
  return (
    <section className="min-h-[70vh] max-w-3xl mx-auto flex flex-col items-center justify-center text-center px-4">
      <h1 className="text-5xl font-heading font-bold mb-6 tracking-wide leading-relaxed">
        The Ultimate Backend Starter & Addon Toolkit
      </h1>
      <p className="text-lg text-muted-foreground mb-8">
        Quickly scaffold backend projects for Express, Django, Laravel, Fastify, and more. Add
        ESLint, Prettier, Mongoose, Prisma, and other features with a single command.
      </p>
      <div className="flex gap-4">
        <Link
          href="/guide"
          className="px-6 py-3 bg-primary text-primary-foreground rounded-lg font-semibold hover:bg-primary/80 transition"
        >
          Get Started
        </Link>
        <a
          href="https://github.com/your-repo"
          target="_blank"
          rel="noopener noreferrer"
          className="px-6 py-3 border border-primary text-primary rounded-lg font-semibold hover:bg-primary/10 transition"
        >
          GitHub
        </a>
      </div>
    </section>
  );
}
