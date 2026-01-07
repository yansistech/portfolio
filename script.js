/* ====== SITE JS ====== */

/* Preloader */
window.addEventListener('load', () => {
  const pre = document.getElementById('preloader');
  pre.style.opacity = '0';
  pre.style.transition = 'opacity .45s ease';
  setTimeout(() => pre.remove(), 600);
});

/* Typed effect - simple */
(function () {
  const el = document.getElementById('typed');
  const words = ['HTML & CSS', 'Responsive Interfaces', 'Pixel-perfect UIs'];
  let idx = 0,
    pos = 0,
    forward = true;
  if (!el) return;
  el.textContent = '';

  function tick() {
    const word = words[idx];
    if (forward) {
      pos++;
      el.textContent = word.slice(0, pos);
      if (pos === word.length) {
        forward = false;
        setTimeout(tick, 900);
        return;
      }
    } else {
      pos--;
      el.textContent = word.slice(0, pos);
      if (pos === 0) {
        forward = true;
        idx = (idx + 1) % words.length;
        setTimeout(tick, 200);
        return;
      }
    }
    setTimeout(tick, forward ? 120 : 60);
  }
  tick();
})();

/* Mobile menu toggle */
(function () {
  const btn = document.getElementById('mobileToggle');
  const menu = document.getElementById('mobileMenu');

  if (!btn || !menu) return;

  btn.addEventListener('click', () => {
    const isHidden = menu.getAttribute('aria-hidden') === 'true';
    menu.setAttribute('aria-hidden', isHidden ? 'false' : 'true');
  });

  menu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      menu.setAttribute('aria-hidden', 'true');
    });
  });
})();



/* Theme toggle (dark/light) */
(function () {
  const toggle = document.getElementById('themeToggle');
  const root = document.documentElement;

  if (!toggle) return;

  let theme = localStorage.getItem('theme') || 'dark';

  function applyTheme() {
    if (theme === 'light') {
      root.classList.add('light-mode');
      toggle.textContent = '🌙';
    } else {
      root.classList.remove('light-mode');
      toggle.textContent = '☀️';
    }
    localStorage.setItem('theme', theme);
  }

  applyTheme();

  toggle.addEventListener('click', () => {
    theme = theme === 'dark' ? 'light' : 'dark';
    applyTheme();
  });
})();


/* Smooth scroll fallback for older browsers (links already use anchors) */
(function () {
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
})();

/* Contact form - mailto fallback */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;
  form.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = encodeURIComponent(document.getElementById('name').value.trim());
    const email = encodeURIComponent(document.getElementById('email').value.trim());
    const message = encodeURIComponent(document.getElementById('message').value.trim());
    const recipient = 'jiyanu123@gmail.com'; // change to your real inbox if needed
    const subject = encodeURIComponent(`Portfolio message from ${name}`);
    const body = `Name: ${name}%0AEmail: ${email}%0A%0A${message}`;
    window.location.href = `mailto:${recipient}?subject=${subject}&body=${body}`;
  });
})();

/* Populate year in footer */
(function () {
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();