import styles from './Projects.module.css';

export default function ProjectRow({ project, onClick }) {
  return (
    <div className={`${styles.row} reveal`} onClick={() => onClick(project)}>
      <span className={styles.rowNum}>{project.num}</span>
      <div className={styles.rowBody}>
        <h3 className={styles.rowName}>{project.title}</h3>
        <p className={styles.rowDesc}>{project.description.slice(0, 120)}…</p>
        <div className={styles.rowTags}>
          {project.tech.slice(0, 4).map((t) => (
            <span key={t} className={styles.rowTag}>{t}</span>
          ))}
        </div>
      </div>
      <div className={styles.rowRight}>
        <span className={styles.rowYear}>{project.year}</span>
        <div className={styles.rowArrow}>↗</div>
      </div>
    </div>
  );
}
