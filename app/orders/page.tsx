'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import { Trash2, Plus, Minus } from 'lucide-react';

interface CartItem {
  id: string;
  name: string;
  price: string;
  description: string;
  image: string;
  quantity: number;
}

export default function OrdersPage() {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem('cart');
    if (stored) {
      setCart(JSON.parse(stored));
    }
    setLoading(false);
  }, []);

  const removeFromCart = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const updateQuantity = (id: string, qty: number) => {
    if (qty <= 0) {
      removeFromCart(id);
      return;
    }
    const updated = cart.map(item =>
      item.id === id ? { ...item, quantity: qty } : item
    );
    setCart(updated);
    localStorage.setItem('cart', JSON.stringify(updated));
  };

  const getTotalPrice = () => {
    return cart.reduce((acc, item) => {
      const price = parseInt(item.price.replace('₹', ''));
      return acc + price * item.quantity;
    }, 0);
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
            <h1 className="text-4xl font-bold mb-4 text-white">Your Cart is Empty</h1>
            <p className="text-gray-400 mb-8 text-lg">Add delicious items from our menu to get started</p>
            <Link href="/#menu" className="btn-primary inline-block">
              Browse Menu
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
        <div className="max-w-4xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-amber-400 mb-12"
          >
            Shopping Cart
          </motion.h1>

          <div className="space-y-6 mb-10">
            {cart.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                className="bg-black rounded-lg p-6 flex gap-6 hover:shadow-lg hover:shadow-amber-400/20 transition"
              >
                <div className="relative w-32 h-32 flex-shrink-0 rounded-lg overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-cover"
                  />
                </div>

                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-white mb-2">{item.name}</h3>
                  <p className="text-gray-400 mb-4">{item.description}</p>

                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-2 bg-zinc-800 rounded-lg p-2">
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        className="hover:bg-zinc-700 p-1 rounded transition"
                      >
                        <Minus size={18} />
                      </button>
                      <span className="px-3 font-semibold">{item.quantity}</span>
                      <button
                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        className="hover:bg-zinc-700 p-1 rounded transition"
                      >
                        <Plus size={18} />
                      </button>
                    </div>

                    <button
                      onClick={() => removeFromCart(item.id)}
                      className="ml-auto text-red-500 hover:text-red-400 p-2 hover:bg-red-500/10 rounded transition"
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>

                <div className="text-right flex flex-col justify-center">
                  <p className="text-amber-400 text-2xl font-bold">{item.price}</p>
                  <p className="text-gray-400 text-sm mt-2">
                    ₹{parseInt(item.price.replace('₹', '')) * item.quantity}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-black rounded-lg p-8 mb-8 border border-amber-400/20"
          >
            <div className="space-y-4 mb-6">
              <div className="flex justify-between text-gray-400">
                <span>Subtotal:</span>
                <span>₹{getTotalPrice()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Delivery:</span>
                <span>₹50</span>
              </div>
              <div className="border-t border-zinc-700 pt-4 flex justify-between items-center">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-3xl font-bold text-amber-400">₹{getTotalPrice() + 50}</span>
              </div>
            </div>

            <Link href="/checkout" className="w-full btn-primary block text-center">
              Proceed to Checkout
            </Link>
          </motion.div>

          <Link href="/#menu" className="text-amber-400 hover:text-amber-300 transition">
            ← Continue Shopping
          </Link>
        </div>
      </section>
      <Footer />
    </>
  );
}
