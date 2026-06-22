'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { CheckCircle } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: string;
  quantity: number;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  zip: string;
  cardNumber: string;
  cardExpiry: string;
  cardCVC: string;
}

export default function CheckoutPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');
  const [formData, setFormData] = useState<FormData>({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    zip: '',
    cardNumber: '',
    cardExpiry: '',
    cardCVC: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCart(JSON.parse(stored));
    } else {
      setLoading(false);
    }
    setLoading(false);
  }, []);

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return acc + price * item.quantity;
    }, 0);
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) newErrors.email = 'Valid email is required';
    if (!formData.phone.match(/^\d{10}$/)) newErrors.phone = 'Valid 10-digit phone is required';
    if (!formData.address.trim()) newErrors.address = 'Address is required';
    if (!formData.city.trim()) newErrors.city = 'City is required';
    if (!formData.zip.match(/^\d{6}$/)) newErrors.zip = 'Valid 6-digit zip is required';
    if (!formData.cardNumber.match(/^\d{16}$/)) newErrors.cardNumber = 'Valid 16-digit card is required';
    if (!formData.cardExpiry.match(/^\d{2}\/\d{2}$/)) newErrors.cardExpiry = 'Format: MM/YY';
    if (!formData.cardCVC.match(/^\d{3}$/)) newErrors.cardCVC = 'Valid 3-digit CVC is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setSubmitting(true);

    try {
      const response = await fetch('/api/orders', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          items: cart,
          totalPrice: getTotalPrice() + 50,
          customerName: formData.fullName,
          customerPhone: formData.phone,
          customerEmail: formData.email,
          deliveryAddress: `${formData.address}, ${formData.city} - ${formData.zip}`,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        setOrderId(data.orderId);
        setOrderPlaced(true);
        localStorage.removeItem('cart');
      }
    } catch (error) {
      setErrors({ submit: 'Failed to place order. Please try again.' });
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="min-h-screen bg-black text-white flex items-center justify-center">Loading...</div>;
  }

  if (cart.length === 0) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen pt-32 pb-20 bg-zinc-950 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center px-4"
          >
            <h1 className="text-4xl font-bold mb-4 text-white">Cart Empty</h1>
            <p className="text-gray-400 mb-8">Add items to checkout</p>
            <Link href="/#menu" className="btn-primary inline-block">
              Back to Menu
            </Link>
          </motion.div>
        </section>
        <Footer />
      </>
    );
  }

  if (orderPlaced) {
    return (
      <>
        <Navbar />
        <section className="min-h-screen pt-32 pb-20 bg-zinc-950 flex items-center justify-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center px-4 max-w-md"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: 'spring' }}
              className="mb-6 flex justify-center"
            >
              <CheckCircle className="w-20 h-20 text-green-500" />
            </motion.div>

            <h1 className="text-4xl font-bold mb-4 text-white">Order Placed!</h1>
            <p className="text-gray-400 mb-6">
              Thank you for your order. Your food will be delivered soon.
            </p>

            <div className="bg-black rounded-lg p-6 mb-8 border border-amber-400/20">
              <p className="text-gray-400 mb-2">Order ID:</p>
              <p className="text-2xl font-bold text-amber-400">{orderId}</p>
            </div>

            <p className="text-gray-400 mb-8">
              A confirmation email has been sent to <strong>{formData.email}</strong>
            </p>

            <Link href="/" className="btn-primary inline-block">
              Back to Home
            </Link>
          </motion.div>
        </section>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-32 pb-20 bg-zinc-950">
        <div className="max-w-6xl mx-auto px-4 grid lg:grid-cols-3 gap-8">
          {/* Order Summary */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-1 h-fit sticky top-32"
          >
            <div className="bg-black rounded-lg p-6 border border-amber-400/20">
              <h2 className="text-xl font-bold text-amber-400 mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6 pb-6 border-b border-zinc-700">
                {cart.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <div>
                      <p className="font-semibold">{item.name}</p>
                      <p className="text-gray-400">Qty: {item.quantity}</p>
                    </div>
                    <p className="text-amber-400 font-semibold">
                      ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                    </p>
                  </div>
                ))}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between text-gray-400">
                  <span>Subtotal:</span>
                  <span>₹{getTotalPrice()}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Delivery:</span>
                  <span>₹50</span>
                </div>
                <div className="border-t border-zinc-700 pt-3 flex justify-between text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-amber-400">₹{getTotalPrice() + 50}</span>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Checkout Form */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="lg:col-span-2"
          >
            <div className="bg-black rounded-lg p-8 border border-amber-400/20">
              <h1 className="text-3xl font-bold text-white mb-8">Checkout</h1>

              {errors.submit && (
                <div className="mb-6 p-4 bg-red-500/20 border border-red-500 rounded-lg text-red-400">
                  {errors.submit}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Shipping Info */}
                <div>
                  <h3 className="text-lg font-semibold text-white mb-4">Shipping Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.fullName}
                        onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                        className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.fullName ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                      />
                      {errors.fullName && <p className="text-red-400 text-sm mt-1">{errors.fullName}</p>}
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
                          className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.email ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
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
                          placeholder="10 digit number"
                          className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.phone ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                        />
                        {errors.phone && <p className="text-red-400 text-sm mt-1">{errors.phone}</p>}
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Delivery Address *
                      </label>
                      <textarea
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.address ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition resize-none h-20`}
                      />
                      {errors.address && <p className="text-red-400 text-sm mt-1">{errors.address}</p>}
                    </div>

                    <div className="grid md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          City *
                        </label>
                        <input
                          type="text"
                          value={formData.city}
                          onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                          className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.city ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                        />
                        {errors.city && <p className="text-red-400 text-sm mt-1">{errors.city}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Postal Code *
                        </label>
                        <input
                          type="text"
                          value={formData.zip}
                          onChange={(e) => setFormData({ ...formData, zip: e.target.value })}
                          placeholder="6 digits"
                          className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.zip ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                        />
                        {errors.zip && <p className="text-red-400 text-sm mt-1">{errors.zip}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Payment Info */}
                <div className="border-t border-zinc-700 pt-6">
                  <h3 className="text-lg font-semibold text-white mb-4">Payment Information</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-300 mb-2">
                        Card Number *
                      </label>
                      <input
                        type="text"
                        value={formData.cardNumber}
                        onChange={(e) => setFormData({ ...formData, cardNumber: e.target.value.replace(/\D/g, '').slice(0, 16) })}
                        placeholder="1234 5678 9012 3456"
                        className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.cardNumber ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                      />
                      {errors.cardNumber && <p className="text-red-400 text-sm mt-1">{errors.cardNumber}</p>}
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          Expiry Date *
                        </label>
                        <input
                          type="text"
                          value={formData.cardExpiry}
                          onChange={(e) => {
                            let val = e.target.value.replace(/\D/g, '');
                            if (val.length >= 2) val = val.slice(0, 2) + '/' + val.slice(2, 4);
                            setFormData({ ...formData, cardExpiry: val });
                          }}
                          placeholder="MM/YY"
                          className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.cardExpiry ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                        />
                        {errors.cardExpiry && <p className="text-red-400 text-sm mt-1">{errors.cardExpiry}</p>}
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-300 mb-2">
                          CVC *
                        </label>
                        <input
                          type="text"
                          value={formData.cardCVC}
                          onChange={(e) => setFormData({ ...formData, cardCVC: e.target.value.replace(/\D/g, '').slice(0, 3) })}
                          placeholder="123"
                          className={`w-full p-3 rounded-lg bg-zinc-900 text-white border ${errors.cardCVC ? 'border-red-500' : 'border-zinc-800'} focus:border-amber-400 outline-none transition`}
                        />
                        {errors.cardCVC && <p className="text-red-400 text-sm mt-1">{errors.cardCVC}</p>}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <div className="border-t border-zinc-700 pt-6">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {submitting ? 'Processing...' : `Place Order - ₹${getTotalPrice() + 50}`}
                  </button>
                </div>
              </form>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </>
  );
}
