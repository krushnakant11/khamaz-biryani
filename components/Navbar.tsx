'use client';

import Link from 'next/link';
import { ShoppingCart, Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 z-50 w-full bg-black/90 backdrop-blur-md border-b border-amber-400/20">
      <div className="max-w-7xl mx-auto flex justify-between items-center p-5">
        <Link href="/" className="text-2xl font-bold text-amber-400">
          Khamaz Biryani
        </Link>

        <div className="hidden md:flex gap-6 text-white">
          <Link href="#about" className="hover:text-amber-400 transition">
            About
          </Link>
          <Link href="#menu" className="hover:text-amber-400 transition">
            Menu
          </Link>
          <Link href="#gallery" className="hover:text-amber-400 transition">
            Gallery
          </Link>
          <Link href="#contact" className="hover:text-amber-400 transition">
            Contact
          </Link>
        </div>

        <div className="flex gap-4 items-center">
          <Link href="/orders" className="relative text-amber-400 hover:text-amber-300 transition">
            <ShoppingCart size={24} />
          </Link>

          <button
            className="md:hidden text-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {isOpen && (
        <div className="md:hidden bg-black/95 border-t border-amber-400/20 p-4 space-y-4">
          <Link href="#about" className="block text-white hover:text-amber-400">
            About
          </Link>
          <Link href="#menu" className="block text-white hover:text-amber-400">
            Menu
          </Link>
          <Link href="#gallery" className="block text-white hover:text-amber-400">
            Gallery
          </Link>
          <Link href="#contact" className="block text-white hover:text-amber-400">
            Contact
          </Link>
        </div>
      )}
    </nav>
  );
}
