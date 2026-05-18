import { useEffect } from 'react';

/**
 * Watches elements matching `selector` inside `containerRef`
 * and adds the class `activeClass` when they enter the viewport.
 */
export function useScrollReveal(containerRef, selector = '.reveal, .reveal-left, .grid-wipe, .stagger', activeClass = 'up') {
  useEffect(() => {
    const container = containerRef?.current ?? document;
    const elements = container.querySelectorAll(selector);

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add(activeClass);
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/**
 * Animates a number from 0 to `target` over `duration` ms.
 * Calls `onUpdate(value)` each step.
 */
export function animateCounter(target, duration = 1200, onUpdate) {
  const steps = 40;
  const inc = target / steps;
  let step = 0;
  const timer = setInterval(() => {
    step++;
    const cur = Math.min(Math.round(inc * step), target);
    onUpdate(cur, step >= steps);
    if (step >= steps) clearInterval(timer);
  }, duration / steps);
  return () => clearInterval(timer);
}
