'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Mail, MessageSquare, Phone } from 'lucide-react';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  message: string;
}

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Valid 10-digit phone is required';
    if (!formData.message.trim()) newErrors.message = 'Message is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setLoading(true);

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitted(true);
        setFormData({ name: '', email: '', phone: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      }
    } catch (error) {
      setErrors({ submit: 'Failed to send message. Please try again.' });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-32 pb-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <h1 className="text-5xl font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 mb-16">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="space-y-8"
            >
              <div className="flex gap-4 items-start">
                <div className="bg-amber-400/20 p-4 rounded-lg flex-shrink-0">
                  <Phone className="text-amber-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Phone</h3>
                  <p className="text-gray-400">+91 78750 10007</p>
                  <p className="text-gray-400 text-sm mt-1">Available 11 AM - 11 PM daily</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-amber-400/20 p-4 rounded-lg flex-shrink-0">
                  <Mail className="text-amber-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">Email</h3>
                  <p className="text-gray-400">info@khamaz.com</p>
                  <p className="text-gray-400 text-sm mt-1">We'll respond within 24 hours</p>
                </div>
              </div>

              <div className="flex gap-4 items-start">
                <div className="bg-amber-400/20 p-4 rounded-lg flex-shrink-0">
                  <MessageSquare className="text-amber-400" size={24} />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white mb-2">WhatsApp</h3>
                  <p className="text-gray-400">+91 78750 10007</p>
                  <p className="text-gray-400 text-sm mt-1">Quick responses via WhatsApp</p>
                </div>
              </div>

              <div className="bg-black rounded-lg p-6 border border-amber-400/20 mt-8">
                <h3 className="text-lg font-bold text-white mb-4">Hours of Operation</h3>
                <div className="space-y-2 text-gray-400">
                  <div className="flex justify-between">
                    <span>Monday - Sunday</span>
                    <span>11:00 AM - 11:00 PM</span>
                  </div>
                  <p className="text-sm mt-4">Closed on special occasions</p>
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              className="bg-black rounded-lg p-8 border border-amber-400/20"
            >
              <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

              {submitted && (
                <div className="mb-6 p-4 bg-green-500/20 border border-green-500 rounded-lg text-green-400">
                  ✓ Thank you! Your message has been sent successfully.
                </div>
              )}

              {errors.submit && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Name *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className={`w-full p-4 rounded-lg bg-zinc-900 text-white border ${errors.name ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                    placeholder="Your name"
                  />
                  {errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className={`w-full p-4 rounded-lg bg-zinc-900 text-white border ${errors.email ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                      placeholder="your@email.com"
                    />
                    {errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Phone *
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className={`w-full p-4 rounded-lg bg-zinc-900 text-white border ${errors.phone ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                      placeholder="10 digit number"
                    />
                    {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Message *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className={`w-full p-4 rounded-lg bg-zinc-900 text-white border ${errors.message ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition resize-none h-32`}
                    placeholder="Your message here..."
                  />
                  {errors.message && <p className="text-red-400 text-sm mt-1">{errors.message}</p>}
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Sending...' : 'Send Message'}
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}
