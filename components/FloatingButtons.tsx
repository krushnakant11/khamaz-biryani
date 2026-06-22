'use client';

import { Phone, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';

export default function FloatingButtons() {
  return (
    <>
      <motion.a
        href="tel:+917875010007"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-24 right-6 bg-orange-500 hover:bg-orange-600 p-4 rounded-full text-white shadow-lg transition z-40"
        aria-label="Call us"
      >
        <Phone size={24} />
      </motion.a>

      <motion.a
        href="https://wa.me/917875010007"
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        whileHover={{ scale: 1.1 }}
        className="fixed bottom-6 right-6 bg-green-500 hover:bg-green-600 p-4 rounded-full text-white shadow-lg transition z-40"
        aria-label="Chat on WhatsApp"
      >
        <MessageCircle size={24} />
      </motion.a>
    </>
  );
}
