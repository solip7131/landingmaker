// ============================================================
//  primitives.jsx — shared hooks + small building blocks
// ============================================================
const { useState, useEffect, useLayoutEffect, useRef, useCallback } = React;

// ---- animation libraries ----------------------------------------------------
// Anime.js and Motion both load from a CDN, so every caller must survive them
// being absent (blocked CDN, offline preview) — the page keeps its CSS-only
// behaviour in that case. Reduced-motion users are treated the same way.
const prefersReducedMotion = () =>
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;
const getAnime = () => (prefersReducedMotion() ? null : window.anime || null);
const getMotion = () => (prefersReducedMotion() ? null : window.Motion || null);

// Reveal-on-scroll: stamps `.in` once the node enters the viewport.
// Uses getBoundingClientRect + scroll listener (IntersectionObserver is
// unreliable inside sandboxed preview iframes).
function useRevealRoot() {
  useEffect(() => {
    let raf = 0;
    const check = () => {
      raf = 0;
      const vh = window.innerHeight;
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.top < vh * 0.9 && r.bottom > 0) el.classList.add('in');
      });
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(check); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    // initial passes to catch above-the-fold + post-layout settle
    check();
    const t1 = setTimeout(check, 120);
    const t2 = setTimeout(check, 400);
    // hard safety net: if anything (throttled tab, print/export, missed scroll
    // event) leaves a node hidden, force it visible so content is never lost.
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const safety = setTimeout(() => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
    }, reduce ? 0 : 2600);
    window.addEventListener('beforeprint', () => {
      document.querySelectorAll('.reveal:not(.in)').forEach((el) => el.classList.add('in'));
    });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      clearTimeout(t1); clearTimeout(t2); clearTimeout(safety); if (raf) cancelAnimationFrame(raf);
    };
  }, []);
}

// Count-up number that starts when scrolled into view
function Counter({ target, decimals = 0, prefix = '', suffix = '', duration = 1600 }) {
  const ref = useRef(null);
  const [val, setVal] = useState(0);
  const started = useRef(false);
  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const run = () => {
      if (started.current) return;
      const r = node.getBoundingClientRect();
      if (r.top < window.innerHeight * 0.85 && r.bottom > 0) {
        started.current = true;
        window.removeEventListener('scroll', run);
        const t0 = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - t0) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          setVal(target * eased);
          if (p < 1) requestAnimationFrame(tick); else setVal(target);
        };
        requestAnimationFrame(tick);
      }
    };
    window.addEventListener('scroll', run, { passive: true });
    run();
    const t = setTimeout(run, 300);
    return () => { window.removeEventListener('scroll', run); clearTimeout(t); };
  }, [target, duration]);
  const shown = decimals ? val.toFixed(decimals) : Math.round(val).toLocaleString('ko-KR');
  return <span ref={ref}>{prefix}{shown}{suffix}</span>;
}

// Section eyebrow + heading block
function SectionHead({ eyebrow, title, sub, light = false, center = true }) {
  return (
    <div className={`reveal ${center ? 'text-center mx-auto' : ''} max-w-3xl mb-12 md:mb-16`}>
      {eyebrow && (
        <div className={`inline-flex items-center gap-2 text-sm font-bold tracking-wide mb-4 px-4 py-1.5 rounded-full ${light ? 'bg-white/15 text-white' : 'bg-mint-light text-mint-deep'}`}>
          <span className="w-1.5 h-1.5 rounded-full bg-current"></span>{eyebrow}
        </div>
      )}
      <h2 className={`font-display text-[2rem] leading-[1.18] md:text-[2.9rem] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {sub && <p className={`mt-4 text-base md:text-lg font-medium ${light ? 'text-white/85' : 'text-ink/60'}`}>{sub}</p>}
    </div>
  );
}

// soft decorative blob used in section backgrounds
function Blob({ className = '', color = '#00C896' }) {
  return (
    <svg className={className} viewBox="0 0 200 200" fill="none" aria-hidden="true">
      <path fill={color} d="M44.6,-58.1C56.3,-49.3,63.1,-34.4,67.4,-18.4C71.7,-2.4,73.5,14.7,67.3,28.2C61.1,41.7,46.9,51.6,31.9,58.9C16.9,66.2,1.1,70.9,-15.6,69.5C-32.3,68.1,-49.9,60.6,-60.6,47.4C-71.3,34.2,-75.1,15.3,-73.1,-2.4C-71.1,-20.1,-63.3,-36.6,-50.9,-45.8C-38.5,-55,-21.5,-56.9,-3.3,-52.9C14.9,-48.9,29.8,-39,44.6,-58.1Z" transform="translate(100 100)" />
    </svg>
  );
}

Object.assign(window, { useRevealRoot, Counter, SectionHead, Blob,
  prefersReducedMotion, getAnime, getMotion,
  React, useState, useEffect, useLayoutEffect, useRef, useCallback });
