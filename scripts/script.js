document.addEventListener('DOMContentLoaded', function () {
  function setThemeMode(mode) {
    localStorage.setItem('themeMode', mode);
  }

  function getThemeMode() {
    return localStorage.getItem('themeMode') || 'light';
  }

  function applyTheme() {
    var currentMode = getThemeMode();
    var elements = document.querySelectorAll('.web-bg, .web-bg2, .web-bg3, .text-clr, .text-dark, .text-light, .btn-light, .btn-dark');
    
    elements.forEach(function(element) {
      if (document.getElementById('theme').classList.contains('clicked')) {
        element.classList.add('transition');
      }

      if (element.classList.contains('web-bg')) {
        if (element.classList.contains('light-web-bg')) {
          element.classList.replace('light-web-bg', 'dark-web-bg');
        } else if (element.classList.contains('dark-web-bg')) {
          element.classList.replace('dark-web-bg', 'light-web-bg');
        } else {
          element.classList.add(currentMode === 'light' ? 'light-web-bg' : 'dark-web-bg');
        }
      }

      if (element.classList.contains('web-bg2')) {
        if (element.classList.contains('light-web-bg2')) {
          element.classList.replace('light-web-bg2', 'dark-web-bg2');
        } else if (element.classList.contains('dark-web-bg2')) {
          element.classList.replace('dark-web-bg2', 'light-web-bg2');
        } else {
          element.classList.add(currentMode === 'light' ? 'light-web-bg2' : 'dark-web-bg2');
        }
      }

      if (element.classList.contains('web-bg3')) {
        if (element.classList.contains('light-web-bg3')) {
          element.classList.replace('light-web-bg3', 'dark-web-bg3');
        } else if (element.classList.contains('dark-web-bg3')) {
          element.classList.replace('dark-web-bg3', 'light-web-bg3');
        } else {
          element.classList.add(currentMode === 'light' ? 'light-web-bg3' : 'dark-web-bg3');
        }
      }

      if (element.classList.contains('text-clr')) {
        if (element.classList.contains('text-dark')) {
          element.classList.replace('text-dark', 'text-light');
        } else if (element.classList.contains('text-light')) {
          element.classList.replace('text-light', 'text-dark');
        } else {
          element.classList.add(currentMode === 'light' ? 'text-dark' : 'text-light');
        }
      }

      if (element.classList.contains('btn-light')) {
        element.classList.replace('btn-light', 'btn-dark');
      } else if (element.classList.contains('btn-dark')) {
        element.classList.replace('btn-dark', 'btn-light');
      }
    });
  }

  applyTheme();

  document.getElementById('theme').addEventListener('click', function() {
    this.classList.add('clicked');
    var currentMode = getThemeMode();
    var newMode = currentMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    applyTheme();
  });
});
