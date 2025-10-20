'use client';
import { motion } from 'motion/react';
import { FaPlug, FaRocket, FaTerminal } from 'react-icons/fa';
import { useRef } from 'react';
import HomeSectionHeading from './ui/HomeSectionHeading';

const steps = [
  {
    icon: <FaTerminal size={38} />,
    title: 'Create',
    desc: 'Spin up a backend template instantly with your favorite framework.',
    code: 'npm create servest@latest',
  },
  {
    icon: <FaPlug size={38} />,
    title: 'Add',
    desc: 'Add tools like ESLint, Mongoose, or Prisma using a single command.',
    code: 'npx add servest@latest mongoose',
  },
  {
    icon: <FaRocket size={38} />,
    title: 'Build',
    desc: 'Start coding your backend with zero setup — everything’s ready.',
    code: 'npm run start',
  },
];

function HowItWorks() {
  const howItWorksRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={howItWorksRef} className="w-full py-16 boundary rounded-lg text-center">
      <HomeSectionHeading
        title="How It Works"
        subtitle="Set up your backend in three simple steps"
        ref={howItWorksRef}
      />

      <div className="mt-10 grid gap-8 md:grid-cols-3 px-6 md:px-12">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-card-secondary border border-primary rounded-2xl px-6 py-12 shadow-sm"
          >
            <div className="text-primary mb-4">{step.icon}</div>
            <h3 className="text-xl md:text-2xl font-semibold mb-2">{step.title}</h3>
            <p className=" text-muted-foreground mb-4">{step.desc}</p>
            <code className="bg-muted px-3 py-1 rounded text-sm font-mono">{step.code}</code>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
