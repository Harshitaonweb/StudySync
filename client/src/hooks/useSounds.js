import { useEffect } from 'react';
import { playClick, playHover, playDanger } from '../utils/sounds';

let lastHover = 0;

export const useSounds = () => {
  useEffect(() => {
    const handleClick = (e) => {
      const el = e.target.closest('button, a, [role="button"], .nav-item, .resource-card, .group-card, .filter-chip, .house-badge, .icon-btn');
      if (!el) return;

      // Danger sound for delete/danger buttons
      if (el.classList.contains('danger') || el.classList.contains('btn-danger') || el.title === 'Delete') {
        playDanger();
      } else {
        playClick();
      }
    };

    const handleMouseEnter = (e) => {
      const el = e.target.closest('button, .nav-item, .resource-card, .group-card, .filter-chip, .house-badge, .stat-card');
      if (!el) return;
      const now = Date.now();
      if (now - lastHover < 80) return; // throttle — max once per 80ms
      lastHover = now;
      playHover();
    };

    document.addEventListener('click', handleClick);
    document.addEventListener('mouseover', handleMouseEnter);

    return () => {
      document.removeEventListener('click', handleClick);
      document.removeEventListener('mouseover', handleMouseEnter);
    };
  }, []);
};
