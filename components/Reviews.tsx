'use client';

import { motion } from 'framer-motion';

export default function Reviews() {
  const reviews = [
    {
      text: 'Good food, affordable price, good service and clean kitchen.',
      author: 'Raj Kumar',
    },
    {
      text: 'Pleasant ambience and kind staff. Definitely worth a visit.',
      author: 'Priya Sharma',
    },
    {
      text: 'Authentic Dum Biryani with a subtle Maharashtrian touch.',
      author: 'Amit Patel',
    },
  ];

  return (
    <section className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl text-center text-amber-400 mb-12 font-bold"
        >
          What Customers Say
        </motion.h2>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.1 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-xl hover:bg-zinc-800 transition"
            >
              <div className="text-yellow-400 text-2xl mb-4">⭐⭐⭐⭐⭐</div>
              <p className="text-gray-300 mb-4 italic">"{review.text}"</p>
              <p className="text-amber-400 font-semibold">- {review.author}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
