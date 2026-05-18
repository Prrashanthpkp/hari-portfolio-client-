import { useEffect, useState } from 'react';
import styles from './Hero.module.css';

const navLinks = [
  { label: 'About',    href: '#about' },
  { label: 'Projects', href: '#projects' },
  { label: 'Contact',  href: '#contact' },
];

export default function Hero() {
  const [line1, setLine1] = useState('');
  const [line2, setLine2] = useState('');
  const [done, setDone]   = useState(false);

  useEffect(() => {
    let cancelled = false;

    function type(text, setter, delay, cb) {
      let i = 0;
      const tick = () => {
        if (cancelled) return;
        if (i <= text.length) {
          setter(text.slice(0, i));
          i++;
          setTimeout(tick, delay);
        } else if (cb) cb();
      };
      tick();
    }

    const t1 = setTimeout(() => {
      type('HARI', setLine1, 70, () => {
        setTimeout(() => {
          type('PRASATH', setLine2, 80, () => setDone(true));
        }, 120);
      });
    }, 400);

    return () => { cancelled = true; clearTimeout(t1); };
  }, []);

  const silverPart  = line2.slice(0, 3);
  const outlinePart = line2.slice(3);

  return (
    <section id="hero" className={styles.hero}>

      {/* Desktop nav strip */}
      <div className={styles.strip}>
        <span className={styles.stripLeft}>Portfolio — 2026</span>
        <div className={styles.stripRight}>
          {navLinks.map((l) => (
            <a key={l.label} href={l.href}>{l.label}</a>
          ))}
        </div>
      </div>

      {/* Main title */}
      <div className={styles.main}>
        <p className={styles.eyebrow}>Level Designer &amp; Game Developer</p>
        <h1 className={styles.title}>
          <span className={styles.line1}>{line1}</span>
          <span className={styles.line2}>{silverPart}</span>
          <span className={styles.line3}>{outlinePart}</span>
          {!done && <span className={styles.cursor} />}
        </h1>
        <div className={styles.bracket}>
          {[80, 50, 120, 35, 90].map((w, i) => (
            <span
              key={i}
              className={styles.bracketLine}
              style={{ width: w, animationDelay: `${0.8 + i * 0.1}s` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom strip — desktop: 4 cells */}
      <div className={styles.bottom}>
        <div className={styles.cell}>
          <span className={styles.cellLabel}>Status</span>
          <span className={styles.cellValue}>
            <span className={styles.dot} />OPEN TO WORK
          </span>
        </div>
        <div className={styles.cellDiv} />
        <div className={styles.cell}>
          <span className={styles.cellLabel}>Based In</span>
          <span className={styles.cellValue}>STAFFORDSHIRE, UK</span>
        </div>
        <div className={styles.cellDiv} />
        <div className={styles.cell}>
          <span className={styles.cellLabel}>Year</span>
          <span className={styles.cellValue}>2026</span>
        </div>
        <div className={styles.cellDiv} />
        <div className={styles.cell}>
          <span className={styles.cellLabel}>Resume</span>
          
           <a href="/HariPrasath_Resume.pdf"
            download="HariPrasath_Resume.pdf"
            className={styles.resumeBtn}
          >
            <span className={styles.resumeIcon}>↓</span>
            DOWNLOAD CV
          </a>
        </div>
      </div>

      {/* ✅ Mobile resume row — only visible on small screens */}
      <div className={styles.resumeMobile}>
        <span className={styles.cellLabel}>Resume</span>
        
         <a href="/HariPrasath_Resume.pdf"
          download="HariPrasath_Resume.pdf"
          className={styles.resumeMobileBtn}
        >
          ↓ DOWNLOAD CV
        </a>
      </div>

    </section>
  );
}
