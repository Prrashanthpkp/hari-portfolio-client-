import { useState } from 'react';
import Loader   from './components/Loader/Loader';
import Nav      from './components/Nav/Nav';
import Hero     from './components/Hero/Hero';
import About    from './components/About/About';
import Projects from './components/Projects/Projects';
import Contact  from './components/Contact/Contact';
import Footer   from './components/Footer/Footer';

export default function App() {
  const [loading, setLoading] = useState(true);

  return (
    <>
      {/* Loader — always mounts on every page load/refresh */}
      {loading && <Loader onDone={() => setLoading(false)} />}

      {/* Page — renders behind loader, snaps in after loader exits */}
      <div style={{ visibility: loading ? 'hidden' : 'visible' }}>
        <Nav />
        <Hero />
        <About />
        <Projects />
        <Contact />
        <Footer />
      </div>
    </>
  );
}