'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="h-screen bg-cover bg-center flex items-center justify-center relative mt-20"
      style={{
        backgroundImage: "url('/hero.jpg')",
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/50"></div>

      <div className="relative z-10 text-center px-4 max-w-4xl">
        <motion.h1
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6"
        >
          Authentic Dum Biryani,
          <br />
          <span className="text-amber-400">Crafted with Tradition</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-lg md:text-xl text-gray-300 mb-8"
        >
          Experience the rich taste of Hyderabadi and Maharashtrian-style
          biryani at Khamaz Biryani.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <Link href="#menu" className="btn-primary">
            Order Online
          </Link>

          <Link href="#reservation" className="btn-secondary">
            Reserve Table
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
