'use client';
import { motion } from 'motion/react';
import { FaGithub } from 'react-icons/fa';
import Link from 'next/link';

export default function ContributeSection() {
  return (
    <section className="py-20 text-center boundary rounded-lg">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="max-w-2xl mx-auto"
      >
        <h2 className="text-3xl md:text-5xl font-semibold tracking-normal mb-4">
          Make Servest even better
        </h2>
        <p className="max-w-xl mx-auto text-muted-foreground mt-8 mb-12 md:text-xl ">
          Servest is free and open source under the MIT license. <br /> Your contributions help it
          grow and improve for developers everywhere.
        </p>

        <div className="flex justify-center gap-4">
          <Link
            href="https://github.com/dev-rashedin/servest"
            target="_blank"
            className="flex items-center gap-2 px-6 py-3 rounded-xl border border-border font-medium hover:bg-muted transition"
          >
            <FaGithub className="text-lg" />
            Contribute on GitHub
          </Link>
        </div>
      </motion.div>
    </section>
  );
}
