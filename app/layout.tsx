import './globals.css';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Khamaz Biryani | Authentic Dum Biryani in Amravati',
  description: 'Experience authentic Hyderabadi & Maharashtrian Dum Biryani at Khamaz Biryani. Order online or reserve your table today.',
  keywords: 'biryani, restaurant, amravati, dum biryani, hyderabadi',
  viewport: 'width=device-width, initial-scale=1',
  openGraph: {
    title: 'Khamaz Biryani',
    description: 'Authentic Dum Biryani Experience',
    type: 'website',
    url: 'https://khamaz-biryani.com',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="theme-color" content="#0a0a0a" />
      </head>
      <body className="bg-black text-white">
        {children}
      </body>
    </html>
  );
}
