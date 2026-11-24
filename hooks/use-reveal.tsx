'use client';

import { useEffect } from 'react';

export function RevealInit() {
  useEffect(() => {
    const elements = Array.from(document.querySelectorAll<HTMLElement>('.reveal, .draw-line'));
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            io.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -6% 0px' }
    );
    elements.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return null;
}
