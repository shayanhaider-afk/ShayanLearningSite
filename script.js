// Dark/Light Mode Toggle
document.getElementById('toggleMode')?.addEventListener('click', () => {
  document.body.classList.toggle('light-mode');
  localStorage.setItem('theme', document.body.classList.contains('light-mode') ? 'light' : 'dark');
});

// Check saved theme preference
if (localStorage.getItem('theme') === 'light') {
  document.body.classList.add('light-mode');
}

// Back to Top Button
window.addEventListener('scroll', () => {
  const backToTop = document.getElementById('backToTop');
  if (window.pageYOffset > 300) {
    backToTop.classList.add('visible');
  } else {
    backToTop.classList.remove('visible');
  }
});

// Search Functionality
document.getElementById('searchInput')?.addEventListener('keyup', (e) => {
  if (e.key === 'Enter') {
    const query = e.target.value.trim();
    if (query) {
      alert(`Search functionality would show results for: ${query}`);
      // In a real implementation: filter content or redirect to search page
    }
  }
});

// Hover Sound Effect
const hoverSound = new Audio('https://cdn.pixabay.com/download/audio/2022/03/15/audio_384ea46939.mp3?filename=click-button-app-147358.mp3');
document.querySelectorAll('a, button').forEach(element => {
  element.addEventListener('mouseenter', () => {
    hoverSound.currentTime = 0;
    hoverSound.play().catch(e => console.log("Audio play prevented:", e));
  });
});

// Form Validation
document.querySelector('.contact-form form')?.addEventListener('submit', (e) => {
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const message = document.querySelector('textarea[name="message"]').value;
  
  if (!name || !email || !message) {
    e.preventDefault();
    alert('Please fill in all fields');
  }
});
/* ===== APPEND-ONLY UPGRADE (safe) ===== */
(function () {
  // --- Theme memory using .light-mode ---
  const body = document.body;
  const MODE_KEY = 'site-mode'; // 'light' | 'dark'
  const btn = document.getElementById('toggleMode');

  // apply saved mode on load
  const saved = localStorage.getItem(MODE_KEY);
  if (saved === 'light') {
    body.classList.add('light-mode');
  } else if (saved === 'dark') {
    body.classList.remove('light-mode'); // your default is dark
  }

  // avoid double-binding if your old code already added a listener
  if (btn && !btn.dataset.enhanced) {
    btn.dataset.enhanced = '1';
    btn.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const mode = body.classList.contains('light-mode') ? 'light' : 'dark';
      localStorage.setItem(MODE_KEY, mode);
    });
  }

  // --- Hover sound (keeps your existing audio if present) ---
  const hoverAudio = document.getElementById('hoverSound');
  if (hoverAudio && !hoverAudio.dataset.enhanced) {
    hoverAudio.dataset.enhanced = '1';
    document.addEventListener('mouseover', (e) => {
      if (e.target.closest('a, button, .book, .library, .lesson, .game, .card-soft')) {
        try {
          hoverAudio.currentTime = 0;
          hoverAudio.play().catch(() => {});
        } catch {}
      }
    });
  }

  // --- Search filter: works with any input having [data-search],
  // and any list items/cards having [data-item] (text is used to filter)
  const searchInput = document.querySelector('[data-search]');
  if (searchInput && !searchInput.dataset.enhanced) {
    searchInput.dataset.enhanced = '1';
    searchInput.addEventListener('input', () => {
      const q = searchInput.value.toLowerCase();
      document.querySelectorAll('[data-item]').forEach((el) => {
        const hay = (el.getAttribute('data-title') || el.textContent || '').toLowerCase();
        el.style.display = hay.includes(q) ? '' : 'none';
      });
    });
  }

  // --- Likes: buttons with [data-like="unique-id"] and a child [data-like-count]
  document.querySelectorAll('[data-like]').forEach((btn) => {
    if (btn.dataset.enhanced) return;
    btn.dataset.enhanced = '1';
    const id = btn.getAttribute('data-like');
    const key = 'like-' + id;
    const countEl = btn.querySelector('[data-like-count]');
    let count = Number(localStorage.getItem(key) || 0);
    if (countEl) countEl.textContent = count;

    btn.addEventListener('click', () => {
      count++;
      localStorage.setItem(key, count);
      if (countEl) countEl.textContent = count;
      showToast('Thanks for the like!');
    });
  });

  // --- Progress tracker: a section with [data-progress="id"] and inner .progress > span
  document.querySelectorAll('[data-progress]').forEach((section) => {
    if (section.dataset.enhanced) return;
    section.dataset.enhanced = '1';

    const id = section.getAttribute('data-progress');
    const key = 'progress-' + id;
    const bar = section.querySelector('.progress > span');
    let pct = Number(localStorage.getItem(key) || 0);
    if (bar) bar.style.width = pct + '%';

    section.addEventListener('click', (e) => {
      if (!e.target.closest('[data-step]')) return;
      pct = Math.min(100, pct + 20);
      localStorage.setItem(key, pct);
      if (bar) bar.style.width = pct + '%';
      showToast('Progress updated: ' + pct + '%');
    });
  });

  // --- Tiny toast helper (used above). Add a div.toast anywhere or we inject one.
  function ensureToast() {
    let t = document.querySelector('.toast');
    if (!t) {
      t = document.createElement('div');
      t.className = 'toast';
      document.body.appendChild(t);
    }
    return t;
  }
  function showToast(msg) {
    const t = ensureToast();
    t.textContent = msg;
    t.classList.add('show');
    setTimeout(() => t.classList.remove('show'), 1600);
  }

  // --- Footer year auto (if you add <span id="year"></span> in footer)
  const y = document.getElementById('year');
  if (y) y.textContent = new Date().getFullYear();
})();
