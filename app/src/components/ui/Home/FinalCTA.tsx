'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import Image from 'next/image';
import { Button } from '../Button';

export default function FinalCTA() {
  return (
    <section className="min-h-[80vh] flex-center text-center secondary-gradient">
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
        <h2 className="mb-8">Build faster. Launch sooner</h2>
        <h5>
          No more setup hassle. No more backend headaches. <br />
          With Servest, your server is ready before your coffee cools.
        </h5>

        <div className="mt-20">
          <Button variant="default" size="lg">
            <Link href="/guide">Get Started</Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}
