'use client';
import { motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';
import { Button } from '../Button';

export default function FinalCTA() {
  return (
    <section className="py-24 text-center bg-gradient-to-b from-background to-muted/40">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl font-bold mb-4">Ready to build your next backend?</h2>
        <p className="text-muted-foreground mb-8">
          Join developers using <span className="font-medium text-foreground">Servest</span> to
          scaffold cleaner, faster backend projects effortlessly.
        </p>

        <div className="flex justify-center gap-4">
          <Button variant="default" size="lg">
            <Link href="/guide">Get Started</Link>
          </Button>

          <Link
            href="https://github.com/dev-rashedin/servest"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-medium hover:bg-muted transition"
          >
            <FaGithub className="text-lg" />
            View on GitHub
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
