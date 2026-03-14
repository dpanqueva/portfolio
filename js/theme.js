/**
 * Initializes the theme system, reading saved preference from localStorage
 * and setting up the theme toggle button.
 */
function initTheme() {
  const savedTheme = localStorage.getItem('pf-theme');
  if (savedTheme === 'light') {
    applyTheme('light');
  }

  const toggleBtn = document.getElementById('theme-toggle');
  if (toggleBtn) {
    toggleBtn.addEventListener('click', toggleTheme);
  }
}

function toggleTheme() {
  const isLight = document.documentElement.classList.contains('light-mode');
  if (isLight) {
    applyTheme('dark');
  } else {
    applyTheme('light');
  }
}

function applyTheme(mode) {
  const toggleBtn = document.getElementById('theme-toggle');
  const icon = toggleBtn.querySelector('i');

  if (mode === 'light') {
    document.documentElement.classList.add('light-mode');
    localStorage.setItem('pf-theme', 'light');
    icon.className = 'bi bi-moon-stars-fill';
  } else {
    document.documentElement.classList.remove('light-mode');
    localStorage.setItem('pf-theme', 'dark');
    icon.className = 'bi bi-sun-fill';
  }
}

export { initTheme };
