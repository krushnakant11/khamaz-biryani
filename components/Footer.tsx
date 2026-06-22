'use client';

import { FaFacebook, FaInstagram, FaWhatsapp } from 'react-icons/fa';

export default function Footer() {
  return (
    <footer className="bg-black border-t border-zinc-800 py-12">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-2xl font-bold text-amber-400 mb-4">
              Khamaz Biryani
            </h3>
            <p className="text-gray-400 text-sm">
              Authentic dum biryani crafted with tradition and love.
            </p>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li><a href="#menu" className="hover:text-amber-400">Menu</a></li>
              <li><a href="#gallery" className="hover:text-amber-400">Gallery</a></li>
              <li><a href="#contact" className="hover:text-amber-400">Contact</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Hours</h4>
            <ul className="space-y-2 text-gray-400 text-sm">
              <li>Monday - Sunday</li>
              <li>11 AM – 11 PM</li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold text-white mb-4">Follow Us</h4>
            <div className="flex gap-4 text-2xl">
              <a href="#" className="text-blue-600 hover:text-blue-400"><FaFacebook /></a>
              <a href="#" className="text-pink-600 hover:text-pink-400"><FaInstagram /></a>
              <a href="https://wa.me/917875010007" className="text-green-600 hover:text-green-400"><FaWhatsapp /></a>
            </div>
          </div>
        </div>

        <div className="border-t border-zinc-800 pt-8 text-center text-gray-400 text-sm">
          <p>© 2026 Khamaz Biryani. All Rights Reserved. | Made with ❤️ for food lovers</p>
        </div>
      </div>
    </footer>
  );
}
