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