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
          title="Backend development, simplified"
          subtitle="Servest makes backend work fast, clean, and effortless"
          ref={whyServestRef}
        />

        <div className="mt-10 grid gap-4 lg:gap-8 md:grid-cols-2 lg:grid-cols-3 ">
          {features.map((feature, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1, duration: 0.4 }}
              viewport={{ once: true }}
              className="card bg-card border-primary hover:bg-cardSecondary"
            >
              <div className="text-primary mb-8">{<feature.icon size={34} />}</div>
              <h4 className="text-card-secondary">{feature.title}</h4>
              <p className="lg:text-[16px] text-muted-foreground">{feature.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </main>
  );
}

export default WhyServest;
