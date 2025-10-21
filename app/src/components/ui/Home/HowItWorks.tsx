'use client';
import { motion } from 'motion/react';
import { useRef } from 'react';
import HomeSectionHeading from '../HomeSectionHeading';
import { steps } from '@/data';

function HowItWorks() {
  const howItWorksRef = useRef<HTMLDivElement | null>(null);

  return (
    <section ref={howItWorksRef} className="w-full py-16 boundary rounded-lg text-center">
      <HomeSectionHeading
        title="Three steps to your next backend"
        subtitle="Simple, consistent, and lightning-fast experience"
        ref={howItWorksRef}
      />

      <div className="mt-10 grid gap-4 lg:gap-8 md:grid-cols-3">
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.15, duration: 0.4 }}
            viewport={{ once: true }}
            className="flex flex-col items-center bg-card border border-primary rounded-2xl px-6 py-12 shadow-sm"
          >
            <div className="text-primary mb-6">{<step.icon size={40} />}</div>
            <h4>{step.title}</h4>
            <p className="lg:text-[16px] text-muted-foreground">{step.desc}</p>
            <code className="bg-muted mt-8 px-3 py-1 rounded font-mono">{step.code}</code>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default HowItWorks;
