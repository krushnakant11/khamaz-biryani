'use client';

import { menuItems } from '@/data/menu';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useState } from 'react';

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const categories = ['biryani', 'starters', 'main', 'sides', 'beverages'];
  const filtered = selectedCategory
    ? menuItems.filter((item) => item.category === selectedCategory)
    : menuItems;

  return (
    <section id="menu" className="py-24 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          className="text-4xl md:text-5xl text-center text-amber-400 mb-12 font-bold"
        >
          Our Menu
        </motion.h2>

        <div className="flex justify-center gap-4 mb-12 flex-wrap">
          <button
            onClick={() => setSelectedCategory(null)}
            className={`px-4 py-2 rounded-full transition ${
              selectedCategory === null
                ? 'bg-amber-400 text-black'
                : 'bg-zinc-800 text-white hover:bg-zinc-700'
            }`}
          >
            All
          </button>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-2 rounded-full transition capitalize ${
                selectedCategory === cat
                  ? 'bg-amber-400 text-black'
                  : 'bg-zinc-800 text-white hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filtered.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-black rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-amber-400/20 transition group"
            >
              <div className="relative h-64 overflow-hidden">
                <Image
                  src={item.image}
                  alt={item.name}
                  width={500}
                  height={350}
                  className="w-full h-full object-cover group-hover:scale-110 transition duration-300"
                />
                {item.isVegan && (
                  <div className="absolute top-3 right-3 bg-green-500 text-white px-3 py-1 rounded-full text-sm">
                    🌱 Vegan
                  </div>
                )}
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-white mb-2">
                  {item.name}
                </h3>

                <p className="text-gray-400 text-sm mb-4">{item.description}</p>

                <div className="flex justify-between items-center">
                  <span className="text-amber-400 text-2xl font-bold">
                    {item.price}
                  </span>

                  <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-white transition">
                    Add
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
