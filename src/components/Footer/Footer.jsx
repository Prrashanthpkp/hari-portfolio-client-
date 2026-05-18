import { useEffect, useRef } from 'react';
import styles from './Footer.module.css';

export default function Footer() {
  const barRef = useRef(null);

  useEffect(() => {
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) barRef.current?.classList.add(styles.drawn);
    }, { threshold: 0.3 });
    if (barRef.current) io.observe(barRef.current);
    return () => io.disconnect();
  }, []);

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.nameBlock}>
          <p className={styles.name}>HARI<br /><span className={styles.sv}>PRASATH</span></p>
        </div>
        <div className={styles.div} />
        <div className={styles.info}>
          <div>
            <p className={styles.infoLabel}>Role</p>
            <p className={styles.infoVal}>Level Designer &amp; Game Developer</p>
          </div>
          <div>
            <p className={styles.infoLabel}>Location</p>
            <p className={styles.infoVal}> Staffordshire, UK</p>
          </div>
          <div>
            <p className={styles.infoLabel}>Availability</p>
            <p className={`${styles.infoVal} ${styles.pu}`}>Available Now</p>
          </div>
          <div ref={barRef} className={styles.puBar} />
        </div>
      </div>
      <div className={styles.bottom}>
        <span className={styles.copy}>© 2026 Hari Prasath — All Rights Reserved</span>
        <span className={styles.mark}>HP ✦</span>
      </div>
    </footer>
  );
}
