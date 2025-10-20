'use client';
import { motion } from 'motion/react';
import Link from 'next/link';
import { Button } from '../Button';
import { FaGithub } from '@/data';

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
        <h3 className="mb-4">Make Servest even better</h3>
        <h6 className="mx-auto mt-8 mb-16 ">
          Servest is free and open source under the MIT license. <br /> Your valuable contributions
          help it grow and improve for developers everywhere.
        </h6>

        <Button variant="outline" size="lg">
          <Link href="/https://github.com/dev-rashedin-servest" className="flex-center gap-2">
            <FaGithub style={{ height: '1.2em', width: '1.2em' }} />
            Contribute on GitHub
          </Link>
        </Button>
      </motion.div>
    </section>
  );
}
