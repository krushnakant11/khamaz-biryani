'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    date: '',
    time: '',
    guests: '2',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const res = await fetch('/api/reservations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          date: '',
          time: '',
          guests: '2',
          message: '',
        });
        setTimeout(() => setSubmitted(false), 3000);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="reservation" className="py-24 bg-black">
      <div className="max-w-2xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl text-center text-amber-400 mb-12 font-bold"
        >
          Reserve a Table
        </motion.h2>

        {submitted && (
          <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
            ✓ Reservation submitted! We'll confirm shortly.
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <motion.input
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            required
            className="w-full p-4 rounded-lg bg-zinc-900 text-white placeholder-gray-600 border border-zinc-800 focus:border-amber-400 outline-none transition"
          />

          <motion.input
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            required
            className="w-full p-4 rounded-lg bg-zinc-900 text-white placeholder-gray-600 border border-zinc-800 focus:border-amber-400 outline-none transition"
          />

          <motion.input
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            type="tel"
            placeholder="Phone Number"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            required
            className="w-full p-4 rounded-lg bg-zinc-900 text-white placeholder-gray-600 border border-zinc-800 focus:border-amber-400 outline-none transition"
          />

          <div className="grid md:grid-cols-2 gap-4">
            <motion.input
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              type="date"
              value={formData.date}
              onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              required
              className="p-4 rounded-lg bg-zinc-900 text-white border border-zinc-800 focus:border-amber-400 outline-none transition"
            />

            <motion.input
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              type="time"
              value={formData.time}
              onChange={(e) => setFormData({ ...formData, time: e.target.value })}
              required
              className="p-4 rounded-lg bg-zinc-900 text-white border border-zinc-800 focus:border-amber-400 outline-none transition"
            />
          </div>

          <motion.select
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            value={formData.guests}
            onChange={(e) => setFormData({ ...formData, guests: e.target.value })}
            className="w-full p-4 rounded-lg bg-zinc-900 text-white border border-zinc-800 focus:border-amber-400 outline-none transition"
          >
            {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
              <option key={n} value={n}>
                {n} {n === 1 ? 'Guest' : 'Guests'}
              </option>
            ))}
          </motion.select>

          <motion.textarea
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            placeholder="Special requests (optional)"
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="w-full p-4 rounded-lg bg-zinc-900 text-white placeholder-gray-600 border border-zinc-800 focus:border-amber-400 outline-none transition resize-none h-24"
          />

          <motion.button
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            type="submit"
            className="w-full btn-primary"
          >
            Book Table
          </motion.button>
        </form>
      </div>
    </section>
  );
}
