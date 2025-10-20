'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import { FaBolt, FaCodeBranch, FaCubes, FaMagic } from 'react-icons/fa';
import HomeSectionHeading from './ui/HomeSectionHeading';

const features = [
  {
    icon: <FaBolt size={34} />,
    title: 'Instant Scaffolding',
    desc: 'Spin up production-ready backend templates within seconds — no setup hassle.',
  },
  {
    icon: <FaCubes size={34} />,
    title: 'Framework Agnostic',
    desc: 'Supports Express and Django now — more frameworks like Nest, Fastify, and Flask coming soon.',
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
];

function WhyServest() {
  const whyServestRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={whyServestRef} className="w-full py-16 boundary rounded-lg text-center">
      <HomeSectionHeading
        title="Why Servest?"
        subtitle="Designed to make backend development fast, clean, and modern"
        ref={whyServestRef}
      />

      <div className="mt-10 grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-6 md:px-12">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1, duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center text-center bg-card-secondary border border-primary rounded-2xl p-6 shadow-sm"
          >
            <div className="text-primary mb-4">{feature.icon}</div>
            <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
            <p className="text-sm text-muted-foreground">{feature.desc}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default WhyServest;
