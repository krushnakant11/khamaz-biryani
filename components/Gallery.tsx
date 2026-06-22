'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';

const images = [
  '/gallery/biryani.jpg',
  '/gallery/tandoori.jpg',
  '/gallery/ambience.jpg',
  '/gallery/family.jpg',
  '/gallery/kitchen.jpg',
  '/gallery/dining.jpg',
];

export default function Gallery() {
  return (
    <section id="gallery" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl text-center text-amber-400 mb-12 font-bold"
        >
          Gallery
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-6">
          {images.map((img, i) => (
            <motion.div
              key={img}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="relative h-80 rounded-xl overflow-hidden group cursor-pointer"
            >
              <Image
                src={img}
                alt="gallery"
                fill
                className="w-full h-full object-cover group-hover:scale-110 transition duration-500"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition duration-300"></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
