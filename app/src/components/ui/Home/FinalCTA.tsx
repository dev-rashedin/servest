'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../Button';

export default function FinalCTA() {
  return (
    <section className="min-h-[80vh] flex-center text-center bg-gradient-to-b from-background to-muted/30">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-4xl mx-auto"
      >
        <div className="w-24 h-24 mx-auto flex-center mb-24 border border-brand rounded-xl shadow-glow">
          <Image src="/logo.svg" width={60} height={60} alt="logo" />
        </div>
        <h2 className="text-4xl lg:text-6xl font-semibold mb-8 tracking-normal">
          Build faster. Launch sooner
        </h2>
        <p className="max-w-2xl mx-auto text-lg lg:text-[21px] text-muted-foreground mb-8 tracking-normal leading-relaxed">
          No more setup hassle. No more backend headaches. <br />
          With Servest, your server’s ready before your coffee cools
        </p>

        <div className="mt-16">
          <Button variant="default" size="lg">
            <Link href="/guide">Get Started</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
