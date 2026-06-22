'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Order {
  id: string;
  orderId: string;
  customerName: string;
  customerPhone: string;
  totalPrice: number;
  status: string;
  createdAt: string;
}

export default function OrdersAdminPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    try {
      const response = await fetch('/api/admin/orders');
      const data = await response.json();
      setOrders(data);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateOrderStatus = async (orderId: string, status: string) => {
    try {
      const response = await fetch('/api/admin/orders', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ orderId, status }),
      });
      if (response.ok) {
        fetchOrders();
      }
    } catch (error) {
      console.error('Failed to update order:', error);
    }
  };

  return (
    <>
      <Navbar />
      <section className="min-h-screen pt-32 pb-20 bg-zinc-950">
        <div className="max-w-7xl mx-auto px-4">
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl font-bold text-amber-400 mb-8"
          >
            Orders Management
          </motion.h1>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading orders...</div>
          ) : orders.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No orders yet</div>
          ) : (
            <div className="bg-black rounded-lg overflow-hidden border border-amber-400/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700 bg-zinc-900">
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Order ID</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Customer</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Phone</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Amount</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Status</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => (
                      <tr key={order.id} className="border-b border-zinc-800 hover:bg-zinc-900 transition">
                        <td className="px-6 py-4 text-white font-mono text-sm">{order.orderId}</td>
                        <td className="px-6 py-4 text-white">{order.customerName}</td>
                        <td className="px-6 py-4 text-white">{order.customerPhone}</td>
                        <td className="px-6 py-4 text-amber-400 font-bold">₹{order.totalPrice}</td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => updateOrderStatus(order.orderId, e.target.value)}
                            className="px-3 py-1 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-amber-400 outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="preparing">Preparing</option>
                            <option value="ready">Ready</option>
                            <option value="delivered">Delivered</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-gray-400 text-sm">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </section>
      <Footer />
    </>
  );
}
