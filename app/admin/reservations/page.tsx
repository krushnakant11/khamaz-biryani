'use client';

import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

interface Reservation {
  id: string;
  name: string;
  email: string;
  phone: string;
  date: string;
  time: string;
  guests: number;
  status: string;
  createdAt: string;
}

export default function ReservationsAdminPage() {
  const [reservations, setReservations] = useState<Reservation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReservations();
  }, []);

  const fetchReservations = async () => {
    try {
      const response = await fetch('/api/admin/reservations');
      const data = await response.json();
      setReservations(data);
    } catch (error) {
      console.error('Failed to fetch reservations:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateReservationStatus = async (id: string, status: string) => {
    try {
      const response = await fetch('/api/admin/reservations', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status }),
      });
      if (response.ok) {
        fetchReservations();
      }
    } catch (error) {
      console.error('Failed to update reservation:', error);
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
            Reservations Management
          </motion.h1>

          {loading ? (
            <div className="text-center py-12 text-gray-400">Loading reservations...</div>
          ) : reservations.length === 0 ? (
            <div className="text-center py-12 text-gray-400">No reservations yet</div>
          ) : (
            <div className="bg-black rounded-lg overflow-hidden border border-amber-400/20">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-zinc-700 bg-zinc-900">
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Name</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Phone</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Date</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Time</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Guests</th>
                      <th className="px-6 py-4 text-left text-amber-400 font-semibold">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {reservations.map((res) => (
                      <tr key={res.id} className="border-b border-zinc-800 hover:bg-zinc-900 transition">
                        <td className="px-6 py-4 text-white">{res.name}</td>
                        <td className="px-6 py-4 text-white">{res.phone}</td>
                        <td className="px-6 py-4 text-white">{res.date}</td>
                        <td className="px-6 py-4 text-white">{res.time}</td>
                        <td className="px-6 py-4 text-center text-amber-400 font-bold">{res.guests}</td>
                        <td className="px-6 py-4">
                          <select
                            value={res.status}
                            onChange={(e) => updateReservationStatus(res.id, e.target.value)}
                            className="px-3 py-1 rounded-lg bg-zinc-800 text-white border border-zinc-700 focus:border-amber-400 outline-none"
                          >
                            <option value="pending">Pending</option>
                            <option value="confirmed">Confirmed</option>
                            <option value="completed">Completed</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
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
