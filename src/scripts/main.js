/**
 * GROVI — main.js
 * Vanilla JS interaction layer. No frameworks, no build step.
 */

'use strict';

// ---------------------------------------------------------------------------
// 1. Scroll fade-in animations (IntersectionObserver)
// ---------------------------------------------------------------------------
(function initFadeIn() {
  const elements = document.querySelectorAll('.fade-in-up');
  if (!elements.length) return;

  // Respect reduced-motion preference — make everything visible immediately.
  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  if (prefersReducedMotion) {
    elements.forEach((el) => el.classList.add('visible'));
    return;
  }

  let visibleCount = 0;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
          visibleCount += 1;

          // Disconnect once every element has been animated.
          if (visibleCount === elements.length) {
            observer.disconnect();
          }
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -50px 0px',
    }
  );

  elements.forEach((el) => observer.observe(el));
})();

// ---------------------------------------------------------------------------
// 2. Panel counter auto-update
// ---------------------------------------------------------------------------
(function initPanelCounter() {
  const counterEl = document.querySelector('.panel-counter .current');
  if (!counterEl) return;

  const PANEL_MAP = {
    'hero': '01',
    'framework': '02',
    'build-flow': '03',
    'build-detail': '04',
    'opts-flow': '05',
    'opts-detail': '06',
    'agent-flow': '07',
    'agent-detail': '08',
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const sectionId = entry.target.id;
          const panelNumber = PANEL_MAP[sectionId];
          if (panelNumber) {
            counterEl.textContent = panelNumber;
          }
        }
      });
    },
    { threshold: 0.4 }
  );

  Object.keys(PANEL_MAP).forEach((id) => {
    const section = document.getElementById(id);
    if (section) observer.observe(section);
  });
})();

// ---------------------------------------------------------------------------
// 3. Global nav background adaptation
// ---------------------------------------------------------------------------
(function initNavScroll() {
  const nav = document.querySelector('.global-nav');
  if (!nav) return;

  const SCROLL_THRESHOLD = 80;

  const update = () => {
    if (window.scrollY > SCROLL_THRESHOLD) {
      nav.classList.add('nav--scrolled');
    } else {
      nav.classList.remove('nav--scrolled');
    }
  };

  // Run once on load in case the page is already scrolled (e.g. back-nav).
  update();

  window.addEventListener('scroll', update, { passive: true });
})();

// ---------------------------------------------------------------------------
// 4. Smooth scroll for anchor links and stage-index items
// ---------------------------------------------------------------------------
(function initSmoothScroll() {
  // JS fallback for browsers that don't support scroll-behavior: smooth in CSS.
  // Modern browsers handle <a href="#..."> natively via CSS; we only intercept
  // when the CSS property is unsupported.
  const supportsCSSSmooth =
    'scrollBehavior' in document.documentElement.style;

  if (!supportsCSSSmooth) {
    document.addEventListener('click', (e) => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;

      const targetId = anchor.getAttribute('href').slice(1);
      if (!targetId) return;

      const target = document.getElementById(targetId);
      if (!target) return;

      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  }

  // Stage-index items use data-target rather than href.
  document.addEventListener('click', (e) => {
    const item = e.target.closest('.stage-index-item[data-target]');
    if (!item) return;

    const targetId = item.dataset.target;
    if (!targetId) return;

    const target = document.getElementById(targetId);
    if (!target) return;

    e.preventDefault();
    target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
})();

// ---------------------------------------------------------------------------
// 5. Hero entrance animation
// ---------------------------------------------------------------------------
(function initHeroEntrance() {
  const hero = document.getElementById('hero');
  if (!hero) return;

  // Small delay allows the browser to paint the initial frame before the
  // CSS transition begins, preventing a flash of unstyled content.
  window.addEventListener(
    'DOMContentLoaded',
    () => {
      setTimeout(() => hero.classList.add('hero--loaded'), 100);
    },
    { once: true }
  );

  // If DOMContentLoaded already fired (script deferred or at end of body).
  if (document.readyState !== 'loading') {
    setTimeout(() => hero.classList.add('hero--loaded'), 100);
  }
})();

// ---------------------------------------------------------------------------
// 7. Sub-nav hide/show on fast scroll (optional enhancement)
// ---------------------------------------------------------------------------
(function initSubNavScrollBehavior() {
  const subNav = document.querySelector('.sub-nav');
  if (!subNav) return;

  const VELOCITY_THRESHOLD = 5; // px per frame — tuned to feel snappy
  let lastScrollY = window.scrollY;
  let ticking = false;

  const update = () => {
    const currentScrollY = window.scrollY;
    const delta = currentScrollY - lastScrollY;

    if (Math.abs(delta) > VELOCITY_THRESHOLD) {
      if (delta > 0) {
        // Scrolling down fast — hide the sub-nav.
        subNav.classList.add('sub-nav--hidden');
      } else {
        // Scrolling up — reveal the sub-nav.
        subNav.classList.remove('sub-nav--hidden');
      }
    }

    lastScrollY = currentScrollY;
    ticking = false;
  };

  window.addEventListener(
    'scroll',
    () => {
      if (!ticking) {
        requestAnimationFrame(update);
        ticking = true;
      }
    },
    { passive: true }
  );
})();
