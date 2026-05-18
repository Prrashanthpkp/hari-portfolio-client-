import { useEffect, useState } from 'react';
import styles from './Loader.module.css';

const FULL_NAME = 'HARIPRASATH';

export default function Loader({ onDone }) {
  const [typed, setTyped]       = useState('');
  const [phase, setPhase]       = useState('typing');   // typing | hold | fadeout

  useEffect(() => {
    let cancelled = false;
    let i = 0;

    // Phase 1 — type the name
    function tick() {
      if (cancelled) return;
      if (i <= FULL_NAME.length) {
        setTyped(FULL_NAME.slice(0, i));
        i++;
        setTimeout(tick, 80);
      } else {
        // Phase 2 — hold briefly
        setTimeout(() => {
          if (cancelled) return;
          setPhase('fadeout');
          // Phase 3 — after fade, tell App we're done
          setTimeout(() => {
            if (!cancelled) onDone();
          }, 700);
        }, 600);
      }
    }

    // Small initial pause before typing starts
    const t = setTimeout(tick, 300);
    return () => { cancelled = true; clearTimeout(t); };
  }, [onDone]);

  return (
    <div className={`${styles.loader} ${phase === 'fadeout' ? styles.fadeout : ''}`}>

      {/* Grain overlay */}
      <div className={styles.grain} />

      {/* Top-left corner bracket */}
      <div className={`${styles.corner} ${styles.tl}`} />
      {/* Bottom-right corner bracket */}
      <div className={`${styles.corner} ${styles.br}`} />

      {/* Center content */}
      <div className={styles.center}>

        {/* HP Monogram */}
        <div className={styles.monogram}>
          <span className={styles.monogramH}>H</span>
          <span className={styles.monogramP}>P</span>
          <div className={styles.monogramLine} />
        </div>

        {/* Typed name */}
        <div className={styles.nameWrap}>
          <span className={styles.name}>{typed}</span>
          {phase === 'typing' && <span className={styles.cursor} />}
        </div>

        {/* Label */}
        <p className={styles.label}>Level Designer &amp; Game Developer</p>

        {/* Progress bar — fills as name types */}
        <div className={styles.barTrack}>
          <div
            className={styles.barFill}
            style={{ width: `${(typed.length / FULL_NAME.length) * 100}%` }}
          />
        </div>

      </div>

      {/* Bottom line */}
      <div className={styles.bottomStrip}>
        <span>Portfolio — 2026</span>
        <span>Chennai, IN</span>
      </div>

    </div>
  );
}