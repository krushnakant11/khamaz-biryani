'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('orders');

  return (
    <section className="min-h-screen pt-32 pb-20 bg-zinc-950">
      <div className="max-w-7xl mx-auto px-4">
        <h1 className="text-4xl font-bold text-amber-400 mb-8">Admin Dashboard</h1>

        <div className="flex gap-4 mb-8 border-b border-zinc-800">
          {['orders', 'reservations', 'analytics'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-6 py-4 capitalize font-semibold transition border-b-2 ${
                activeTab === tab
                  ? 'border-amber-400 text-amber-400'
                  : 'border-transparent text-gray-400 hover:text-white'
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-black rounded-lg p-8"
        >
          {activeTab === 'orders' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Recent Orders</h2>
              <div className="space-y-4">
                {[1, 2, 3].map((i) => (
                  <div key={i} className="bg-zinc-900 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">Order #{1000 + i}</p>
                      <p className="text-gray-400 text-sm">2 items - ₹{500 + i * 100}</p>
                    </div>
                    <span className="bg-yellow-500 text-black px-4 py-2 rounded-lg text-sm font-semibold">Pending</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'reservations' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Reservations</h2>
              <div className="space-y-4">
                {[1, 2].map((i) => (
                  <div key={i} className="bg-zinc-900 p-4 rounded-lg flex justify-between items-center">
                    <div>
                      <p className="font-semibold">John Doe</p>
                      <p className="text-gray-400 text-sm">4 guests - Today at 7:00 PM</p>
                    </div>
                    <span className="bg-green-500 text-black px-4 py-2 rounded-lg text-sm font-semibold">Confirmed</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div>
              <h2 className="text-2xl font-bold mb-6">Analytics</h2>
              <div className="grid md:grid-cols-3 gap-6">
                {[
                  { label: 'Total Orders', value: '142' },
                  { label: 'Total Revenue', value: '₹45,600' },
                  { label: 'Avg Rating', value: '4.8/5' },
                ].map((stat, i) => (
                  <div key={i} className="bg-zinc-900 p-6 rounded-lg text-center">
                    <p className="text-gray-400 mb-2">{stat.label}</p>
                    <p className="text-3xl font-bold text-amber-400">{stat.value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
}
