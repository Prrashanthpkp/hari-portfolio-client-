import { useRef, useState, useEffect } from 'react';
import styles from './Projects.module.css';

export default function Gallery({ images, title }) {
  const trackRef = useRef(null);
  const [current, setCurrent] = useState(1);
  const total = images.length || 1;

  // Drag to scroll
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let dragging = false, startX = 0, scrollStart = 0;
    const onDown = (e) => { dragging = true; startX = e.pageX; scrollStart = track.scrollLeft; track.style.cursor = 'grabbing'; };
    const onMove = (e) => { if (!dragging) return; track.scrollLeft = scrollStart - (e.pageX - startX); };
    const onUp = () => { dragging = false; track.style.cursor = 'grab'; };
    track.addEventListener('mousedown', onDown);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      track.removeEventListener('mousedown', onDown);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, []);

  const updateCounter = () => {
    const track = trackRef.current;
    if (!track) return;
    const slideW = track.querySelector(`.${styles.slide}`)?.offsetWidth + 16 || 1;
    setCurrent(Math.round(track.scrollLeft / slideW) + 1);
  };

  const scroll = (dir) => {
    const track = trackRef.current;
    if (!track) return;
    const slideW = track.querySelector(`.${styles.slide}`)?.offsetWidth + 16 || 400;
    track.scrollBy({ left: dir * slideW, behavior: 'smooth' });
  };

  return (
    <div className={styles.gallery}>
      <p className={styles.galleryLabel}>// Image Gallery — Drag or swipe</p>
      <div className={styles.trackWrap}>
        <div className={styles.track} ref={trackRef} onScroll={updateCounter}>
          {images.length > 0 ? images.map((src, i) => (
            <div key={i} className={styles.slide}>
              <img src={src} alt={`${title} screenshot ${i + 1}`} />
            </div>
          )) : (
            // Placeholder slides when no images yet
            [1, 2, 3].map((i) => (
              <div key={i} className={`${styles.slide} ${styles.slidePlaceholder}`}>
                <span className={styles.phIcon}>🎮</span>
                <span className={styles.phLabel}>Screenshot {i} — Add to public/assets/</span>
              </div>
            ))
          )}
        </div>
        <div className={styles.counter}>
          {String(current).padStart(2, '0')} / {String(total).padStart(2, '0')}
        </div>
      </div>
      <div className={styles.galNav}>
        <button className={styles.gBtn} onClick={() => scroll(-1)}>←</button>
        <button className={styles.gBtn} onClick={() => scroll(1)}>→</button>
      </div>
    </div>
  );
}
