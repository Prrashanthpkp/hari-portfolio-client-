import { useRef, useEffect, useState } from 'react';
import { useScrollReveal, animateCounter } from '../../hooks/useScrollReveal';
import styles from './About.module.css';

const skills = [
  'Unreal Engine', 'Level Design', 'Gameplay Design',
  'Environment Design', 'Game Testing', 'Player Experience',
  'Difficulty Balancing', 'Gameplay Flow', 'Blender',
  'Unity', 'Creative Direction', 'Narrative Design',
];

const education = [
  { num: '01', degree: 'Higher Secondary', school: 'La Chatelaine Junior College', year: '2021' },
  { num: '02', degree: 'B.Tech CS — Gaming Technology', school: 'SRM IST', year: '2025' },
  { num: '03', degree: 'MSc Computer Games Design', school: 'University of Staffordshire', year: '2026' },
];

const stats = [
  { target: 6,   suffix: '+',  label: 'Games Built',       pu: false },
  { target: 3,   suffix: '',   label: 'Game Engines',      pu: false },
  { target: 100, suffix: '%',  label: 'Passion',           pu: true  },
  { target: 1,   suffix: 'yr', label: 'MSc Postgrad',      pu: true  },
];

function StatCell({ target, suffix, label, pu }) {
  const [val, setVal] = useState(0);
  const [done, setDone] = useState(false);
  const ref = useRef(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    const io = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !started.current) {
        started.current = true;
        animateCounter(target, 1200, (cur, finished) => {
          setVal(cur);
          if (finished) setDone(true);
        });
      }
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [target]);

  return (
    <div className={styles.statCell} ref={ref}>
      <span className={`${styles.statNum} ${pu ? styles.pu : ''}`}>
        {val}{done ? suffix : ''}
      </span>
      <p className={styles.statLabel}>{label}</p>
    </div>
  );
}

export default function About() {
  const ref = useRef(null);
  useScrollReveal(ref);

  return (
    <section id="about" className={styles.about} ref={ref}>
      <div className="sec-header">
        <span className="sec-num">01 — About</span>
        <div className="sec-title-wrap">
          <p className="sec-eyebrow reveal">Who I Am</p>
          <h2 className="sec-title grid-wipe">
            ABOUT<br /><span className="outline">ME</span>
          </h2>
        </div>
      </div>

      <div className={styles.grid}>
        {/* LEFT — Bio + Education */}
        <div className={`${styles.col} reveal-left`}>
          <p className={styles.intro}>
            Creative and passionate <em>Level Designer</em> with experience developing
            gameplay-oriented levels using Unreal Engine.
          </p>
          <p className={styles.para}>
            I specialise in gameplay design, environment design, concept development,
            and game testing. My interest is in analysing games from various players'
            viewpoints, identifying gameplay problems, and providing feedback and
            suggestions for improvement.
          </p>
          <p className={styles.para}>
            I love understanding the psychology behind players' behaviour to create
            unpredictable levels that keep players engaged and entertained throughout
            gameplay. Beyond level design, I contribute creativity through gameplay
            and narrative ideas.
          </p>

          {/* Education */}
          <div style={{ marginTop: '2.5rem' }}>
            <p className="block-label">Education</p>
            {education.map((e) => (
              <div key={e.num} className={styles.eduItem}>
                <span className={styles.eduN}>{e.num}</span>
                <div>
                  <p className={styles.eduDegree}>{e.degree}</p>
                  <p className={styles.eduSchool}>{e.school}</p>
                </div>
                <span className={styles.eduYr}>{e.year}</span>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.divider} />

        {/* RIGHT — Skills + Stats */}
        <div className={`${styles.col} reveal`}>
          <p className="block-label">Specialities</p>
          <div className={`${styles.chips} stagger`}>
            {skills.map((s) => (
              <span key={s} className={styles.chip}>{s}</span>
            ))}
          </div>

          <div className={styles.statGrid}>
            {stats.map((s) => (
              <StatCell key={s.label} {...s} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
