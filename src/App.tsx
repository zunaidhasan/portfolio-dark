import Atmosphere from '@/components/Atmosphere';
import Nav from '@/components/Nav';
import Hero from '@/components/Hero';
import Work from '@/components/Work';
import About from '@/components/About';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import ScrollProgress from '@/components/ScrollProgress';
import BackToTop from '@/components/BackToTop';

export default function App() {
  return (
    <div className="relative min-h-screen bg-bg text-ink">
      <Atmosphere />
      <ScrollProgress />
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Work />
          <About />
          <Contact />
        </main>
        <Footer />
        <BackToTop />
      </div>
    </div>
  );
}
