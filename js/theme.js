'use strict';

(() => {
  const toggle = document.querySelector('#theme-toggle');
  if (!toggle) return;

  const storageKey = 'hello-calculator-theme';
  const mediaQuery = window.matchMedia
    ? window.matchMedia('(prefers-color-scheme: dark)')
    : null;

  function activeTheme() {
    const explicitTheme = document.documentElement.getAttribute('data-theme');
    if (explicitTheme === 'light' || explicitTheme === 'dark') return explicitTheme;
    return mediaQuery && mediaQuery.matches ? 'dark' : 'light';
  }

  function updateControl() {
    const isDark = activeTheme() === 'dark';
    toggle.setAttribute('aria-pressed', String(isDark));
    toggle.setAttribute('aria-label', isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối');
    toggle.title = isDark ? 'Chuyển sang giao diện sáng' : 'Chuyển sang giao diện tối';
  }

  toggle.addEventListener('click', () => {
    const nextTheme = activeTheme() === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', nextTheme);
    try {
      localStorage.setItem(storageKey, nextTheme);
    } catch (error) {}
    updateControl();
  });

  if (mediaQuery) {
    const handleSystemThemeChange = () => {
      if (!document.documentElement.hasAttribute('data-theme')) updateControl();
    };
    if (typeof mediaQuery.addEventListener === 'function') {
      mediaQuery.addEventListener('change', handleSystemThemeChange);
    } else if (typeof mediaQuery.addListener === 'function') {
      mediaQuery.addListener(handleSystemThemeChange);
    }
  }

  updateControl();
})();
