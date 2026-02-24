(function () {
  const THEME_KEY = 'theme';

  function getSavedTheme() {
    return localStorage.getItem(THEME_KEY) === 'dark' ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    document.body.classList.toggle('dark', theme === 'dark');
    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.textContent = theme === 'dark' ? '☀️' : '🌙';
      toggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
      toggle.setAttribute('title', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  function toggleTheme() {
    const nextTheme = document.body.classList.contains('dark') ? 'light' : 'dark';
    localStorage.setItem(THEME_KEY, nextTheme);
    applyTheme(nextTheme);
  }

  document.addEventListener('DOMContentLoaded', function () {
    applyTheme(getSavedTheme());

    const toggle = document.getElementById('themeToggle');
    if (toggle) {
      toggle.addEventListener('click', toggleTheme);
    }
  });
})();
