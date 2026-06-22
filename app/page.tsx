import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import About from '@/components/About';
import MenuSection from '@/components/MenuSection';
import Reviews from '@/components/Reviews';
import Gallery from '@/components/Gallery';
import ReservationForm from '@/components/ReservationForm';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import FloatingButtons from '@/components/FloatingButtons';

export default function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <MenuSection />
      <Reviews />
      <Gallery />
      <ReservationForm />
      <Contact />
      <Footer />
      <FloatingButtons />
    </>
  );
}
