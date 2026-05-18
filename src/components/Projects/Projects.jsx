import { useRef, useState } from 'react';
import { useScrollReveal } from '../../hooks/useScrollReveal';
import ProjectRow from './ProjectRow';
import ProjectOverlay from './ProjectOverlay';
import projects from '../../data/projects';
import styles from './Projects.module.css';

export default function Projects() {
  const ref = useRef(null);
  useScrollReveal(ref);
  const [active, setActive] = useState(null);

  return (
    <>
      <section id="projects" className={styles.projects} ref={ref}>
        <div className="sec-header">
          <span className="sec-num">02 — Work</span>
          <div className="sec-title-wrap">
            <p className="sec-eyebrow reveal">Selected Games</p>
            {/* ✅ Single line — PRO + JECTS inline, no <br/> */}
            <h2 className="sec-title grid-wipe">
              PRO<span className="outline">JECTS</span>
            </h2>
          </div>
        </div>

        <div className={styles.list}>
          {projects.map((p) => (
            <ProjectRow key={p.id} project={p} onClick={setActive} />
          ))}
        </div>
      </section>

      <ProjectOverlay project={active} onClose={() => setActive(null)} />
    </>
  );
}