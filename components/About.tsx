'use client';

import { motion } from 'framer-motion';

export default function About() {
  return (
    <section id="about" className="py-24 bg-black">
      <div className="max-w-6xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold text-amber-400 mb-6">
            About Khamaz Biryani
          </h2>
          <p className="text-gray-300 text-lg max-w-3xl mx-auto">
            For years, Khamaz Biryani has been serving authentic Hyderabadi and
            Maharashtrian dum biryani to food enthusiasts. We blend traditional
            cooking techniques with premium ingredients to create an unforgettable
            culinary experience.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: 'Premium Quality',
              desc: 'Hand-selected ingredients sourced daily',
            },
            {
              title: 'Traditional Recipe',
              desc: 'Authentic methods passed down through generations',
            },
            {
              title: 'Fast Delivery',
              desc: 'Hot and fresh biryani delivered to your doorstep',
            },
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: i * 0.2 }}
              viewport={{ once: true }}
              className="bg-zinc-900 p-8 rounded-xl text-center"
            >
              <h3 className="text-xl font-bold text-amber-400 mb-3">
                {item.title}
              </h3>
              <p className="text-gray-400">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
