'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../Button';

export default function FinalCTA() {
  return (
    <section className="min-h-[80vh] flex-center text-center bg-gradient-to-b from-background to-muted/40">
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
        <h2 className="text-3xl lg:text-5xl font-semibold mb-8 tracking-normal">
          Build your backend with Servest
        </h2>
        <p className="text-lg lg:text-xl text-muted-foreground mb-8">
          Experience backend setup that’s finally as smooth as frontend tooling
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
