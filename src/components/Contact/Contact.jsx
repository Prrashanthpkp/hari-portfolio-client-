import { useRef } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import styles from './Contact.module.css';

export default function Contact() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section id="contact" className={styles.contact} ref={ref}>
      <div className="sec-header">
        <span className="sec-num">03 — Contact</span>
        <div className="sec-title-wrap">
          <p className="sec-eyebrow reveal">Get In Touch</p>
          <h2 className="sec-title grid-wipe">
            HIRE<br /><span className="outline">ME</span>
          </h2>
        </div>
      </div>

      <div className={`${styles.top} reveal`}>
        <h2 className={styles.big}>
          LET'S<br />
          <span className={styles.sv}>BUILD</span><br />
          <span className={styles.outline}>WORLDS</span>
        </h2>
      </div>

      <div className={styles.bottomGrid}>
        <div className={`${styles.cell} reveal`}>
          <p className={styles.cellLabel}>Email</p>
          <a href="mailto:hpofficial42@gmail.com" className={styles.emailLink}>
            hpofficial42@gmail.com ↗
          </a>
          <p className={styles.available}>Open for freelance &amp; full-time — 2026</p>
        </div>
        <div className={styles.cellDiv} />
        <div className={`${styles.cell} reveal`}>
          <p className={styles.cellLabel}>Elsewhere</p>
          <div className={styles.socLinks}>
            <a href="https://linkedin.com/in/hariprasath004" target="_blank" rel="noreferrer" className={styles.soc}>LinkedIn</a>
            <a href="tel:+4407721572354" className={styles.soc}>Phone</a>
          </div>
          <p className={styles.phone}>+44 07721 572354</p>
        </div>
      </div>
    </section>
  );
}
