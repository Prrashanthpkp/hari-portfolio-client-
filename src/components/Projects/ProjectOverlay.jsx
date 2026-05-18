import { useEffect, useState } from 'react';
import Gallery from './Gallery';
import styles from './Projects.module.css';

export default function ProjectOverlay({ project, onClose }) {
  const [videoLoaded, setVideoLoaded] = useState(false);
  const open = !!project;

  // ESC to close
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [onClose]);

  // Body scroll lock + reset video on close
  useEffect(() => {
    document.body.classList.toggle('overlay-open', open);
    if (!open) setVideoLoaded(false);
    return () => document.body.classList.remove('overlay-open');
  }, [open]);

  if (!project) return null;

  // Decide video type
  const isLocal = project.videoType === 'local';
  const hasVideo = !!project.videoUrl;

  return (
    <div className={`${styles.overlay} ${open ? styles.overlayOpen : ''}`}>

      {/* Header */}
      <div className={styles.ovHeader}>
        <span className={styles.ovNum}>{project.num}</span>
        <div className={styles.ovTitleWrap}>
          <span className={styles.ovGenre}>{project.genre}</span>
          <h2 className={styles.ovTitle}>{project.title}</h2>
        </div>
        <button className={styles.ovClose} onClick={onClose}>
          <span className={styles.closeX}>✕</span>
          <span>CLOSE</span>
        </button>
      </div>

      {/* Body */}
      <div className={styles.ovBody}>

        {/* Gallery */}
        <Gallery images={project.images} title={project.title} />

        {/* Video */}
        <div className={styles.videoSection}>
          <p className={styles.galleryLabel}>// Gameplay Video</p>
          <div className={styles.videoWrap}>

            {/* ── LOCAL MP4 ── */}
            {hasVideo && isLocal && (
              videoLoaded ? (
                <video
                  src={project.videoUrl}
                  controls
                  autoPlay
                  className={styles.localVideo}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <div
                  className={styles.videoPlaceholder}
                  onClick={() => setVideoLoaded(true)}
                >
                  <div className={styles.playBtn}>▶</div>
                  <p className={styles.phLabel}>Click to load gameplay video</p>
                </div>
              )
            )}

            {/* ── YOUTUBE / VIMEO EMBED ── */}
            {hasVideo && !isLocal && (
              videoLoaded ? (
                <iframe
                  src={`${project.videoUrl}?autoplay=1`}
                  allow="autoplay; fullscreen"
                  allowFullScreen
                  title={`${project.title} gameplay`}
                />
              ) : (
                <div
                  className={styles.videoPlaceholder}
                  onClick={() => setVideoLoaded(true)}
                >
                  <div className={styles.playBtn}>▶</div>
                  <p className={styles.phLabel}>Click to load gameplay video</p>
                </div>
              )
            )}

            {/* ── NO VIDEO ── */}
            {!hasVideo && (
              <div className={styles.videoPlaceholder}>
                <div className={styles.playBtn} style={{ opacity: 0.3 }}>▶</div>
                <p className={styles.phLabel}>Video coming soon</p>
              </div>
            )}

          </div>
        </div>

        {/* Description + Tech */}
        <div className={styles.ovDetail}>
          <div className={styles.detailCol}>
            <p className={styles.detailLabel}>// Description</p>
            <p className={styles.detailText}>{project.description}</p>
          </div>
          <div className={styles.detailDivider} />
          <div className={styles.detailCol}>
            <p className={styles.detailLabel}>// Tech Stack</p>
            <div className={styles.techChips}>
              {project.tech.map((t) => (
                <span key={t} className={styles.techChip}>{t}</span>
              ))}
            </div>
            <div style={{ marginTop: '2rem' }}>
              <p className={styles.detailLabel}>// Year</p>
              <p className={styles.detailYear}>{project.year}</p>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}