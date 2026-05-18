import { useState, useEffect } from 'react';
import styles from './Nav.module.css';

const links = [
  { label: 'Home',     href: '#hero' },
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Nav() {
  const [open, setOpen]           = useState(false);
  const [overlayOpen, setOverlayOpen] = useState(false);

  // Lock body scroll when nav open
  useEffect(() => {
    document.body.classList.toggle('nav-open', open);
    return () => document.body.classList.remove('nav-open');
  }, [open]);

  // ✅ Watch for overlay-open class on body — hide hamburger when overlay is open
  useEffect(() => {
    const observer = new MutationObserver(() => {
      setOverlayOpen(document.body.classList.contains('overlay-open'));
    });
    observer.observe(document.body, { attributes: true, attributeFilter: ['class'] });
    return () => observer.disconnect();
  }, []);

  const close = () => setOpen(false);

  return (
    <>
      {/* ✅ Hamburger — hidden when overlay is open */}
      {!overlayOpen && (
        <button
          className={`${styles.hamBtn} ${open ? styles.open : ''}`}
          onClick={() => setOpen((o) => !o)}
          aria-label="Toggle menu"
        >
          <span /><span /><span />
        </button>
      )}

      {/* Full-screen nav */}
      <nav className={`${styles.fullNav} ${open ? styles.navOpen : ''}`}>
        {links.map((l) => (
          <a key={l.label} href={l.href} onClick={close}>{l.label}</a>
        ))}
        <p className={styles.navFoot}>Hari Prasath · Level Designer · 2026</p>
      </nav>
    </>
  );
}