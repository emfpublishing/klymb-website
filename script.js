gsap.registerPlugin(ScrollTrigger);

/* ============================================================
   PAGE LOAD — staggered hero entrance
   ============================================================ */
const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
tl.from('.nav-inner',     { y: -30, opacity: 0, duration: 0.8, delay: 0.1 })
  .from('.hero-badge',    { y: 20, opacity: 0, duration: 0.6 }, '-=0.4')
  .from('.hero-headline', { y: 40, opacity: 0, duration: 0.8 }, '-=0.4')
  .from('.hero-sub',      { y: 30, opacity: 0, duration: 0.7 }, '-=0.5')
  .from('.hero-actions',  { y: 24, opacity: 0, duration: 0.6 }, '-=0.45')
  .from('.hero-stats',    { y: 20, opacity: 0, duration: 0.6 }, '-=0.4');

/* ============================================================
   FLOATING ORBS
   ============================================================ */
document.querySelectorAll('.hero-orb').forEach((orb, i) => {
  gsap.to(orb, {
    y: i % 2 === 0 ? -30 : 30,
    x: i % 3 === 0 ? 20 : -20,
    duration: 4 + i * 0.8,
    repeat: -1, yoyo: true,
    ease: 'sine.inOut',
    delay: i * 0.5,
  });
});

/* ============================================================
   NAV SCROLL EFFECT
   ============================================================ */
ScrollTrigger.create({
  start: 'top -20',
  onEnter:     () => document.getElementById('nav').classList.add('scrolled'),
  onLeaveBack: () => document.getElementById('nav').classList.remove('scrolled'),
});

/* ============================================================
   MOBILE MENU
   ============================================================ */
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobileMenu');
hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  if (isOpen) gsap.fromTo(mobileMenu, { opacity: 0, y: -10 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' });
});
mobileMenu.querySelectorAll('a').forEach(a =>
  a.addEventListener('click', () => mobileMenu.classList.remove('open'))
);

/* ============================================================
   SCROLL-TRIGGERED REVEALS
   ============================================================ */
gsap.utils.toArray('.section-tag').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 90%' },
    y: 20, opacity: 0, duration: 0.5, ease: 'power2.out',
  });
});
gsap.utils.toArray('.section-title').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%' },
    y: 36, opacity: 0, duration: 0.7, delay: 0.1, ease: 'power3.out',
  });
});
gsap.utils.toArray('.section-sub').forEach(el => {
  gsap.from(el, {
    scrollTrigger: { trigger: el, start: 'top 88%' },
    y: 24, opacity: 0, duration: 0.6, delay: 0.2, ease: 'power2.out',
  });
});

ScrollTrigger.batch('.service-card', {
  start: 'top 88%',
  onEnter: batch => gsap.from(batch, { y: 60, opacity: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out' }),
});

ScrollTrigger.batch('.case-card', {
  start: 'top 88%',
  onEnter: batch => gsap.from(batch, { y: 50, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'power3.out' }),
});

ScrollTrigger.batch('.process-step', {
  start: 'top 88%',
  onEnter: batch => gsap.from(batch, { y: 40, opacity: 0, duration: 0.65, stagger: 0.1, ease: 'power3.out' }),
});

gsap.from('.spotlight-left', {
  scrollTrigger: { trigger: '.spotlight-inner', start: 'top 80%' },
  x: -50, opacity: 0, duration: 0.9, ease: 'power3.out',
});
gsap.from('.spotlight-right', {
  scrollTrigger: { trigger: '.spotlight-inner', start: 'top 80%' },
  x: 50, opacity: 0, duration: 0.9, delay: 0.15, ease: 'power3.out',
});

gsap.from('.cta-title', {
  scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
  y: 40, opacity: 0, duration: 0.8, ease: 'power3.out',
});
gsap.from('.cta-sub', {
  scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
  y: 30, opacity: 0, duration: 0.7, delay: 0.15, ease: 'power2.out',
});
gsap.from('.cta-actions', {
  scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
  y: 24, opacity: 0, duration: 0.6, delay: 0.28, ease: 'power2.out',
});
gsap.from('.cta-trust', {
  scrollTrigger: { trigger: '.cta-section', start: 'top 80%' },
  y: 16, opacity: 0, duration: 0.5, delay: 0.4, ease: 'power2.out',
});

/* ============================================================
   NUMBER COUNTERS
   ============================================================ */
document.querySelectorAll('[data-target]').forEach(el => {
  const target  = parseFloat(el.dataset.target);
  const prefix  = el.dataset.prefix || '';
  const suffix  = el.dataset.suffix || '';
  const isFloat = String(target).includes('.');
  const obj     = { val: 0 };

  gsap.to(obj, {
    scrollTrigger: { trigger: el, start: 'top 88%', once: true },
    val: target,
    duration: 2.2,
    ease: 'power2.out',
    onUpdate() {
      el.textContent = prefix + (isFloat ? obj.val.toFixed(1) : Math.round(obj.val)) + suffix;
    },
  });
});

/* ============================================================
   SPOTLIGHT BAR
   ============================================================ */
gsap.to('.spotlight-card-bar-fill', {
  scrollTrigger: { trigger: '.spotlight-card', start: 'top 80%' },
  width: '92%',
  duration: 1.6,
  delay: 0.4,
  ease: 'power3.out',
});

/* ============================================================
   PARALLAX — hero on scroll
   ============================================================ */
gsap.to('.hero-headline', {
  scrollTrigger: { trigger: '.hero', scrub: 1.5 },
  y: 60, ease: 'none',
});
gsap.to('.hero-sub', {
  scrollTrigger: { trigger: '.hero', scrub: 2 },
  y: 40, ease: 'none',
});
gsap.to('.hero-badge', {
  scrollTrigger: { trigger: '.hero', scrub: 2.5 },
  y: 20, ease: 'none',
});

/* ============================================================
   3D CARD TILT
   ============================================================ */
document.querySelectorAll('.service-card, .case-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const r  = card.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) / (r.width  / 2);
    const dy = (e.clientY - r.top  - r.height / 2) / (r.height / 2);
    gsap.to(card, { rotateY: dx * 6, rotateX: -dy * 6, transformPerspective: 800, duration: 0.4, ease: 'power2.out' });
  });
  card.addEventListener('mouseleave', () => {
    gsap.to(card, { rotateX: 0, rotateY: 0, duration: 0.5, ease: 'power2.out' });
  });
});

/* ============================================================
   MAGNETIC BUTTONS + SHINE
   ============================================================ */
document.querySelectorAll('.btn-primary').forEach(btn => {
  btn.addEventListener('mousemove', e => {
    const r  = btn.getBoundingClientRect();
    const dx = (e.clientX - r.left - r.width  / 2) * 0.25;
    const dy = (e.clientY - r.top  - r.height / 2) * 0.25;
    gsap.to(btn, { x: dx, y: dy, duration: 0.3, ease: 'power2.out' });
  });
  btn.addEventListener('mouseleave', () => {
    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'elastic.out(1,0.5)' });
  });

  const shine = document.createElement('span');
  shine.className = 'btn-shine';
  btn.appendChild(shine);
  btn.addEventListener('mouseenter', () => {
    gsap.fromTo(shine,
      { x: '-120%', skewX: -20, opacity: 0.6 },
      { x: '220%',  skewX: -20, opacity: 0,   duration: 0.55, ease: 'power2.in' }
    );
  });
});

/* ============================================================
   MARQUEE — pause on hover
   ============================================================ */
document.querySelectorAll('.marquee-track').forEach(track => {
  track.addEventListener('mouseenter', () => gsap.to(track, { timeScale: 0, duration: 0.4 }));
  track.addEventListener('mouseleave', () => gsap.to(track, { timeScale: 1, duration: 0.4 }));
});

/* ============================================================
   ACTIVE NAV LINK HIGHLIGHT
   ============================================================ */
const navLinks = document.querySelectorAll('.nav-links a');
document.querySelectorAll('section[id]').forEach(section => {
  ScrollTrigger.create({
    trigger: section,
    start: 'top 50%',
    end: 'bottom 50%',
    onEnter:     () => highlight(section.id),
    onEnterBack: () => highlight(section.id),
  });
});
function highlight(id) {
  navLinks.forEach(a => {
    gsap.to(a, { color: a.getAttribute('href') === `#${id}` ? '#ffffff' : '', duration: 0.3 });
  });
}


/* ============================================================
   LAZY LOAD VIDEOS — only load when scrolled into view
   ============================================================ */
const lazyVideos = document.querySelectorAll('video[data-src]');
if ('IntersectionObserver' in window) {
  const videoObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const video = entry.target;
        video.src = video.dataset.src;
        video.load();
        video.play().catch(() => {});
        videoObserver.unobserve(video);
      }
    });
  }, { rootMargin: '200px' });
  lazyVideos.forEach(v => videoObserver.observe(v));
} else {
  // Fallback for older browsers
  lazyVideos.forEach(v => { v.src = v.dataset.src; v.load(); });
}


/* ============================================================
   PHONE CAROUSEL
   ============================================================ */
const track = document.getElementById('phonesTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
if (track && prevBtn && nextBtn) {
  function getScrollAmount() {
    const wrap = track.querySelector('.phone-wrap');
    return wrap ? wrap.offsetWidth + 24 : 220;
  }
  function updateBtns() {
    prevBtn.disabled = track.scrollLeft <= 0;
    nextBtn.disabled = track.scrollLeft + track.offsetWidth >= track.scrollWidth - 2;
  }
  prevBtn.addEventListener('click', () => {
    track.scrollBy({ left: -getScrollAmount(), behavior: 'smooth' });
    setTimeout(updateBtns, 400);
  });
  nextBtn.addEventListener('click', () => {
    track.scrollBy({ left: getScrollAmount(), behavior: 'smooth' });
    setTimeout(updateBtns, 400);
  });
  track.addEventListener('scroll', updateBtns);
  updateBtns();
}

/* ============================================================
   FAQ ACCORDION
   ============================================================ */
document.querySelectorAll('.faq-q').forEach(btn => {
  btn.addEventListener('click', () => {
    const answer = btn.nextElementSibling;
    const isOpen = btn.getAttribute('aria-expanded') === 'true';
    // Close all
    document.querySelectorAll('.faq-q').forEach(b => {
      b.setAttribute('aria-expanded', 'false');
      b.nextElementSibling.classList.remove('open');
    });
    // Open clicked if it was closed
    if (!isOpen) {
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

/* ============================================================
   SCROLL TO TOP
   ============================================================ */
const scrollTopBtn = document.getElementById('scrollTop');
if (scrollTopBtn) {
  window.addEventListener('scroll', () => {
    scrollTopBtn.classList.toggle('visible', window.scrollY > 600);
  });
  scrollTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ============================================================
   ABOUT SECTION ANIMATIONS
   ============================================================ */
gsap.from('.about-left', {
  scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
  x: -40, opacity: 0, duration: 0.8, ease: 'power3.out'
});
gsap.from('.about-card', {
  scrollTrigger: { trigger: '.about-section', start: 'top 80%' },
  x: 40, opacity: 0, duration: 0.8, ease: 'power3.out'
});

/* ============================================================
   CONTACT FORM — Formspree AJAX submission
   ============================================================ */
const contactForm = document.getElementById('contactForm');
const formSuccess = document.getElementById('formSuccess');
if (contactForm) {
  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(contactForm);
    const name = data.get('name') || '';
    const brand = data.get('brand') || '';
    const email = data.get('email') || '';
    const revenue = data.get('revenue') || '';
    const message = data.get('message') || '';
    const body = encodeURIComponent(
      `Name: ${name}\nBrand: ${brand}\nEmail: ${email}\nRevenue: ${revenue}\n\n${message}`
    );
    const subject = encodeURIComponent(`TikTok Shop Audit Request — ${brand}`);
    window.location.href = `mailto:morgan@klymb.co.uk?subject=${subject}&body=${body}`;
    contactForm.reset();
    contactForm.style.display = 'none';
    if (formSuccess) formSuccess.style.display = 'block';
  });
}

/* ============================================================
   COOKIE NOTICE
   ============================================================ */
const cookieNotice = document.getElementById('cookieNotice');
const cookieAccept = document.getElementById('cookieAccept');
const cookieDismiss = document.querySelector('.cookie-dismiss');
if (cookieNotice) {
  if (localStorage.getItem('klymb_cookies')) {
    cookieNotice.classList.add('hidden');
  }
  function dismissCookie() {
    cookieNotice.classList.add('hidden');
    localStorage.setItem('klymb_cookies', '1');
  }
  if (cookieAccept) cookieAccept.addEventListener('click', dismissCookie);
  if (cookieDismiss) cookieDismiss.addEventListener('click', (e) => { e.preventDefault(); dismissCookie(); });
}

/* ============================================================
   CREATOR SECTION ANIMATIONS
   ============================================================ */
gsap.from('.creator-left', {
  scrollTrigger: { trigger: '.creator-section', start: 'top 80%' },
  x: -40, opacity: 0, duration: 0.8, ease: 'power3.out'
});
ScrollTrigger.batch('.creator-stat-card', {
  onEnter: batch => gsap.from(batch, { y: 30, opacity: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out' }),
});

/* ============================================================
   READING PROGRESS BAR
   ============================================================ */
const progressBar = document.getElementById('progressBar');
if (progressBar) {
  window.addEventListener('scroll', () => {
    const scrollTop = window.scrollY;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    progressBar.style.width = (scrollTop / docHeight * 100) + '%';
  });
}

/* ============================================================
   ACTIVE NAV HIGHLIGHTING ON SCROLL
   ============================================================ */
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
const observerOptions = { rootMargin: '-40% 0px -55% 0px' };
const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === '#' + entry.target.id);
      });
    }
  });
}, observerOptions);
sections.forEach(s => sectionObserver.observe(s));

/* ============================================================
   HERO ROTATING TEXT
   ============================================================ */
const heroRotate = document.getElementById('heroRotate');
if (heroRotate) {
  const phrases = ['on TikTok Shop.', 'to £190k/month.', 'with zero retainer.', 'in 90 days.'];
  let current = 0;
  setInterval(() => {
    current = (current + 1) % phrases.length;
    gsap.to(heroRotate, {
      opacity: 0, y: -10, duration: 0.3, ease: 'power2.in',
      onComplete: () => {
        heroRotate.textContent = phrases[current];
        gsap.fromTo(heroRotate, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.4, ease: 'power2.out' });
      }
    });
  }, 2800);
}
