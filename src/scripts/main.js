'use strict';

// ── 1. Scroll fade-in animations ──
(function initFadeIn() {
  const els = document.querySelectorAll('.fade-in-up');
  if (!els.length) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    els.forEach(el => el.classList.add('visible'));
    return;
  }

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting) { e.target.classList.add('visible'); obs.unobserve(e.target); }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

  els.forEach(el => obs.observe(el));
})();

// ── 2. Panel counter ──
(function initPanelCounter() {
  const cur = document.querySelector('.panel-counter__current');
  if (!cur) return;

  const map = {
    'hero': '01', 'framework': '02',
    'build-flow': '03', 'build-detail': '04',
    'opts-flow': '05', 'opts-detail': '06',
    'agent-flow': '07', 'agent-detail': '08',
  };

  const obs = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if (e.isIntersecting && map[e.target.id]) cur.textContent = map[e.target.id];
    });
  }, { threshold: 0.35 });

  Object.keys(map).forEach(id => {
    const el = document.getElementById(id);
    if (el) obs.observe(el);
  });
})();

// ── 3. Nav scroll state ──
(function initNavScroll() {
  const nav = document.querySelector('.global-nav');
  if (!nav) return;
  const update = () => nav.classList.toggle('nav--scrolled', window.scrollY > 60);
  update();
  window.addEventListener('scroll', update, { passive: true });
})();

// ── 4. Hamburger mobile menu ──
(function initMobileMenu() {
  const btn = document.querySelector('.global-nav__toggle');
  const menu = document.getElementById('mobile-menu');
  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const open = btn.getAttribute('aria-expanded') === 'true';
    btn.setAttribute('aria-expanded', String(!open));
    btn.setAttribute('aria-label', open ? '메뉴 열기' : '메뉴 닫기');
    if (open) { menu.hidden = true; }
    else { menu.hidden = false; }
    document.body.style.overflow = open ? '' : 'hidden';
  });

  // Close on link click
  menu.addEventListener('click', e => {
    if (e.target.tagName === 'A') {
      btn.setAttribute('aria-expanded', 'false');
      btn.setAttribute('aria-label', '메뉴 열기');
      menu.hidden = true;
      document.body.style.overflow = '';
    }
  });
})();

// ── 5. Stage index smooth scroll ──
(function initStageIndex() {
  document.addEventListener('click', e => {
    const item = e.target.closest('.stage-index-item[data-target]');
    if (!item) return;
    const target = document.getElementById(item.dataset.target);
    if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
  });
})();

// ── 6. Hero entrance ──
(function initHeroEntrance() {
  const addLoaded = () => setTimeout(() => {
    const hero = document.getElementById('hero');
    if (hero) hero.classList.add('hero--loaded');
  }, 80);

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addLoaded, { once: true });
  } else {
    addLoaded();
  }
})();
