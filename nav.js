(function () {
  // Detect if we're on the home page — links use #hash, other pages use /#hash
  const isHome = window.location.pathname === '/' || window.location.pathname.endsWith('index.html');
  const p = (hash) => isHome ? hash : '/' + hash;

  const navHTML = `
  <div class="announce-banner" id="announceBanner">
    <a href="/contact.html" class="announce-link">BOOK A FREE AUDIT WITH TOCKIT TODAY &rarr;</a>
    <button class="announce-close" id="announceBannerClose" aria-label="Dismiss banner">&times;</button>
  </div>
  <nav class="nav" id="nav">
    <div class="nav-inner">
      <a href="/" class="nav-logo" aria-label="Tockit home">
        <img src="/tockit-logo-wordmark.jpg" alt="Tockit" class="nav-logo-img" />
      </a>
      <ul class="nav-links">
        <li class="nav-dropdown-wrap">
          <a href="${p('#services')}" class="nav-dropdown-toggle">Services
            <svg class="nav-chevron" width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
            </svg>
          </a>
          <ul class="nav-dropdown-menu">
            <li><a href="/affiliate-management.html">Affiliate Management</a></li>
            <li><a href="/tiktok-content.html">TikTok Content</a></li>
            <li><a href="/shop-optimisation.html">Shop Optimisation</a></li>
            <li><a href="/paid-media.html">Paid Media</a></li>
          </ul>
        </li>
        <li><a href="${p('#how-it-works')}">How It Works</a></li>
        <li><a href="${p('#work')}">Results</a></li>
        <li><a href="${p('#testimonials')}">Testimonials</a></li>
        <li><a href="${p('#about')}">About</a></li>
      </ul>
      <a href="/contact.html" class="btn nav-cta-pill">Book a Free Audit</a>
      <button class="nav-hamburger" id="hamburger" aria-label="Toggle menu" aria-expanded="false">
        <span></span><span></span><span></span>
      </button>
    </div>
    <div class="nav-mobile" id="mobileMenu">
      <a href="${p('#services')}">Services</a>
      <a href="${p('#how-it-works')}">How It Works</a>
      <a href="${p('#work')}">Results</a>
      <a href="${p('#testimonials')}">Testimonials</a>
      <a href="${p('#about')}">About</a>
      <a href="/contact.html" class="btn btn-primary">Book a Free Audit</a>
    </div>
  </nav>`;

  // Inject at top of body
  const placeholder = document.getElementById('site-nav');
  if (placeholder) {
    placeholder.outerHTML = navHTML;
  } else {
    document.body.insertAdjacentHTML('afterbegin', navHTML);
  }

  // ── Announcement banner dismiss ──────────────────
  const banner = document.getElementById('announceBanner');
  const bannerClose = document.getElementById('announceBannerClose');
  if (banner && bannerClose) {
    const dismiss = () => {
      banner.classList.add('hidden');
      document.documentElement.style.setProperty('--banner-h', '0px');
      sessionStorage.setItem('bannerDismissed', '1');
    };
    bannerClose.addEventListener('click', dismiss);
    if (sessionStorage.getItem('bannerDismissed')) dismiss();
  }

  // ── Hamburger mobile menu ────────────────────────
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobileMenu');
  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileMenu.classList.toggle('open');
      hamburger.setAttribute('aria-expanded', isOpen);
    });
    mobileMenu.querySelectorAll('a').forEach(a =>
      a.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
      })
    );
  }

  // ── Nav scroll shadow ────────────────────────────
  const nav = document.getElementById('nav');
  if (nav) {
    window.addEventListener('scroll', () => {
      nav.classList.toggle('scrolled', window.scrollY > 20);
    }, { passive: true });
  }

  // ── Services dropdown ────────────────────────────
  const dropdownWrap = document.querySelector('.nav-dropdown-wrap');
  if (dropdownWrap) {
    const toggle = dropdownWrap.querySelector('.nav-dropdown-toggle');
    toggle.addEventListener('click', (e) => {
      e.preventDefault();
      dropdownWrap.classList.toggle('open');
    });
    document.addEventListener('click', (e) => {
      if (!dropdownWrap.contains(e.target)) dropdownWrap.classList.remove('open');
    });
  }
})();
