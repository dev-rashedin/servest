'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { FaBolt, FaCodeBranch, FaCubes, FaMagic, FaRocket, FaServer } from 'react-icons/fa';
import HomeSectionHeading from '../HomeSectionHeading';

const features = [
  {
    icon: <FaBolt size={34} />,
    title: 'Instant Scaffolding',
    desc: 'Spin up production-ready backend templates within seconds — no setup hassle.',
  },
  {
    icon: <FaCubes size={34} />,
    title: 'Framework Agnostic',
    desc: 'Supports Express — more frameworks like Nest, Fastify, and Django coming soon.',
  },
  {
    icon: <FaCodeBranch size={34} />,
    title: 'Addon-Driven',
    desc: 'Easily add tools like ESLint, Mongoose, or Prisma — just like shadcn for backend utilities.',
  },
  {
    icon: <FaMagic size={34} />,
    title: 'Developer Experience First',
    desc: 'Built for simplicity, consistency, and scalability — inspired by create-vite’s speed.',
  },
  {
    icon: <FaRocket size={34} />,
    title: 'Fast Prototyping',
    desc: 'Get your backend project running in minutes and iterate rapidly without friction.',
  },
  {
    icon: <FaServer size={34} />,
    title: 'Production Ready',
    desc: 'All templates follow best practices and include essential tooling to deploy safely.',
  },
];

function WhyServest() {
  const whyServestRef = useRef<HTMLDivElement | null>(null);

  return (
    <main className="secondary-gradient">
      <section ref={whyServestRef} className="w-full py-28 boundary rounded-lg text-center">
        <HomeSectionHeading
          title="Why Servest?"
          subtitle="Designed to make backend development fast, clean, and modern"
          ref={whyServestRef}
        />

        <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-3 px-6 md:px-12">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="flex flex-col items-center text-center bg-card border border-primary rounded-2xl px-6 py-12  shadow"
            >
              <div className="text-primary mb-4">{feature.icon}</div>
              <h4 className="font-semibold">{feature.title}</h4>
              <p className="text-s text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default WhyServest;
