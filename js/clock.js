// Shared date/time disclosure. The panel uses one CSS transition state machine.
(() => {
  const toggle = document.querySelector('.qh-clock-toggle');
  const panel = document.getElementById('dateTimePanel');
  const output = document.getElementById('dateTimeDisplay');

  if (output) {
    const updateClock = () => {
      const language = window.QH?.language || 'en';
      const locale = language === 'kk' ? 'kk-KZ' : language === 'ru' ? 'ru-RU' : 'en-US';
      output.textContent = new Intl.DateTimeFormat(locale, {
        year: 'numeric', month: 'long', day: 'numeric',
        hour: 'numeric', minute: '2-digit', second: '2-digit', hour12: language === 'en'
      }).format(new Date());
    };
    updateClock();
    window.setInterval(updateClock, 1000);
    document.addEventListener('qh:languagechange', updateClock);
  }

  if (!toggle || !panel) return;

  const label = toggle.querySelector('span:last-child');
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  let isOpen = false;
  let closeTimer = null;
  let openFrame = null;
  let openFallback = null;

  const setState = (open) => {
    isOpen = open;
    toggle.setAttribute('aria-expanded', String(open));
    toggle.classList.toggle('is-open', open);
    if (label) label.textContent = QH.t(open ? 'Hide date & time' : 'Show date & time');
  };

  const openPanel = () => {
    window.clearTimeout(closeTimer);
    window.cancelAnimationFrame(openFrame);
    window.clearTimeout(openFallback);
    panel.hidden = false;
    panel.classList.remove('is-open');
    setState(true);
    if (reduceMotion.matches) {
      panel.classList.add('is-open');
      return;
    }

    // Let the browser render the complete closed card before starting its transition.
    const startOpenTransition = () => {
      if (isOpen) panel.classList.add('is-open');
      window.clearTimeout(openFallback);
    };
    openFrame = window.requestAnimationFrame(startOpenTransition);
    openFallback = window.setTimeout(startOpenTransition, 100);
  };

  const closePanel = () => {
    window.clearTimeout(closeTimer);
    window.cancelAnimationFrame(openFrame);
    window.clearTimeout(openFallback);
    setState(false);
    panel.classList.remove('is-open');

    if (reduceMotion.matches) {
      panel.hidden = true;
      return;
    }

    closeTimer = window.setTimeout(() => {
      if (!isOpen) panel.hidden = true;
    }, 650);
  };

  toggle.addEventListener('click', () => {
    if (isOpen) closePanel();
    else openPanel();
  });
})();
