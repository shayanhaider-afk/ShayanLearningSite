// -------------------
// Theme Toggle
// -------------------
const toggleBtn = document.getElementById('toggleMode');
const moonIcon = document.getElementById('moon-icon');
const sunIcon = document.getElementById('sun-icon');

function setDarkTheme() {
    document.documentElement.classList.add('dark');
    moonIcon.classList.add('hidden');
    sunIcon.classList.remove('hidden');
    localStorage.setItem('theme', 'dark');
}

function setLightTheme() {
    document.documentElement.classList.remove('dark');
    moonIcon.classList.remove('hidden');
    sunIcon.classList.add('hidden');
    localStorage.setItem('theme', 'light');
}

toggleBtn.addEventListener('click', () => {
    if (document.documentElement.classList.contains('dark')) {
        setLightTheme();
    } else {
        setDarkTheme();
    }
});

// Apply theme on initial load
if (localStorage.getItem('theme') === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    setDarkTheme();
} else {
    setLightTheme();
}


// -------------------
// Mobile Menu
// -------------------
const mobileMenuButton = document.getElementById('mobile-menu-button');
const mobileMenu = document.getElementById('mobile-menu');

mobileMenuButton.addEventListener('click', () => {
    mobileMenu.classList.toggle('hidden');
});


// -------------------
// Hover Sound
// -------------------
const hoverSound = document.getElementById("hoverSound");
if (hoverSound) {
    document.querySelectorAll("a, button, .card").forEach(element => {
        element.addEventListener("mouseenter", () => {
            hoverSound.currentTime = 0;
            hoverSound.play().catch(e => {}); // Ignore errors if user hasn't interacted yet
        });
    });
}

// -------------------
// Footer Year
// -------------------
const yearSpan = document.getElementById("year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}

// -------------------
// Book Page specific script
// -------------------
if (document.getElementById('booksSection')) {
    const sectionEl = document.getElementById('booksSection');
    const cards = Array.from(sectionEl.querySelectorAll('.book'));
    const searchInput = document.getElementById('bookSearch');
    const sortSelect  = document.getElementById('sortSelect');
    const filterWrap  = document.getElementById('filters');
    const clearBtn    = document.getElementById('clearFilters');

    const norm = s => (s||'').toLowerCase().trim();

    function activeCategories(){
      const checked = Array.from(filterWrap.querySelectorAll('input[name="cat"]:checked')).map(i=>i.value);
      return checked;
    }

    function applyFilters(){
      const q = norm(searchInput.value);
      const cats = activeCategories();

      cards.forEach(card=>{
        const title = norm(card.getAttribute('data-title') || card.querySelector('h3')?.textContent);
        const author = norm(card.getAttribute('data-author') || '');
        const catsIn = (card.getAttribute('data-cat') || '').toLowerCase();

        const textMatches = !q || title.includes(q) || author.includes(q);
        const catMatches  = cats.length===0 || cats.every(c=>catsIn.includes(c.toLowerCase()));

        card.style.display = (textMatches && catMatches) ? '' : 'none';
      });
    }

    function applySort(){
      const mode = sortSelect.value; // az / za
      const visible = cards.filter(c=>c.style.display!=='none');

      visible.sort((a,b)=>{
        const ta = norm(a.getAttribute('data-title') || a.querySelector('h3')?.textContent);
        const tb = norm(b.getAttribute('data-title') || b.querySelector('h3')?.textContent);
        if(mode==='az') return ta.localeCompare(tb);
        return tb.localeCompare(ta);
      });

      const quoteEls = Array.from(sectionEl.querySelectorAll('blockquote.book-quote'));
      quoteEls.forEach(q=>q.remove());
      visible.forEach(v=>sectionEl.appendChild(v));
      quoteEls.forEach(q=>sectionEl.appendChild(q));
    }

    searchInput.addEventListener('input', ()=>{ applyFilters(); applySort(); });
    sortSelect.addEventListener('change', ()=>{ applySort(); });

    filterWrap.addEventListener('change', e=>{
      if(e.target.name==='cat'){
        applyFilters(); applySort();
      }
    });

    clearBtn.addEventListener('click', ()=>{
      filterWrap.querySelectorAll('input[name="cat"]').forEach(c=>c.checked=false);
      searchInput.value='';
      applyFilters(); applySort();
    });

    applyFilters();
    applySort();
}


// -------------------
// Lessons Page specific script
// -------------------
if (document.getElementById('lessonsList')) {
    // Like buttons
    document.querySelectorAll(".like-btn").forEach(btn => {
      btn.addEventListener("click", () => {
        btn.classList.toggle("liked");
      });
    });

    // Mark complete + progress
    const lessons = document.querySelectorAll(".lesson");
    const progressBar = document.getElementById("progressBar");
    let completed = 0;

    document.querySelectorAll(".complete-btn").forEach((btn, index) => {
      btn.addEventListener("click", () => {
        if (!btn.classList.contains("done")) {
          btn.classList.add("done");
          btn.textContent = "✅ Completed";
          completed++;
          let percent = (completed / lessons.length) * 100;
          progressBar.style.width = percent + "%";
        }
      });
    });

    // Search lessons
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("keyup", e => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll(".lesson").forEach(lesson => {
        const text = lesson.textContent.toLowerCase();
        lesson.style.display = text.includes(term) ? "block" : "none";
      });
    });
}

// -------------------
// Libraries Page specific script
// -------------------
if (document.getElementById('libraryList')) {
    const searchBar = document.getElementById("searchBar");
    searchBar.addEventListener("keyup", e => {
      const term = e.target.value.toLowerCase();
      document.querySelectorAll(".library").forEach(lib => {
        const text = lib.textContent.toLowerCase();
        lib.style.display = text.includes(term) ? "grid" : "none";
      });
    });
}
function getBotResponse(msg) {
  const lower = msg.toLowerCase().trim();
  const responses = { "hello": "Hey there!", "tell me a joke": "😂" };
  ...responses
}
