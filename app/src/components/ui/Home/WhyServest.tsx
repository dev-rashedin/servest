'use client';
import { useRef } from 'react';
import { motion } from 'motion/react';
import HomeSectionHeading from '../HomeSectionHeading';
import { features } from '@/data';

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
              <div className="text-primary mb-4">{<feature.icon size={34} />}</div>
              <h4 className="text-card-foreground">{feature.title}</h4>
              <p className="lg:text-[16px] text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default WhyServest;
