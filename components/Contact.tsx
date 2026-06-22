'use client';

import { motion } from 'framer-motion';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="max-w-6xl mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          className="text-4xl md:text-5xl text-center text-amber-400 mb-12 font-bold"
        >
          Contact Us
        </motion.h2>

        <div className="grid md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="space-y-8"
          >
            <div className="flex gap-4 items-start">
              <MapPin className="text-amber-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-2">Address</h3>
                <p className="text-gray-400">
                  Pote College Road, Opp. Rangali Lawn,
                  <br />
                  Near Kathora Naka,
                  <br />
                  Hollywood Colony,
                  <br />
                  Amravati, Maharashtra 444604
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Phone className="text-amber-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-2">Phone</h3>
                <a href="tel:+917875010007" className="text-gray-400 hover:text-amber-400">
                  +91 78750 10007
                </a>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Clock className="text-amber-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-2">Hours</h3>
                <p className="text-gray-400">Monday - Sunday: 11 AM – 11 PM</p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <Mail className="text-amber-400 mt-1 flex-shrink-0" size={24} />
              <div>
                <h3 className="font-bold text-lg mb-2">Email</h3>
                <a href="mailto:info@khamaz.com" className="text-gray-400 hover:text-amber-400">
                  info@khamaz.com
                </a>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="rounded-xl overflow-hidden h-96"
          >
            <iframe
              src="https://maps.google.com/maps?q=Khamaz%20Biryani%20Amravati&t=&z=15&ie=UTF8&iwloc=&output=embed"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
