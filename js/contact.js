// Client-side validation for the contact form (educational front-end demo).
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  const fields = [
    { id: 'contactName', check: value => value.trim().length >= 2, message: 'Enter a name with at least 2 characters.' },
    { id: 'contactEmail', check: value => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()), message: 'Enter a valid email address.' },
    { id: 'contactPhone', check: value => /^\+?[0-9\s().-]{7,20}$/.test(value.trim()) && value.replace(/\D/g, '').length >= 7, message: 'Enter a valid phone number.' },
    { id: 'contactTopic', check: value => value.trim() !== '', message: 'Choose a subject.' },
    { id: 'contactMessage', check: value => value.trim().length >= 10, message: 'Write at least 10 characters.' }
  ];

  function validateField(field) {
    const input = document.getElementById(field.id);
    const error = input.parentElement.querySelector('.invalid-feedback');
    const valid = field.check(input.value);
    input.classList.toggle('is-invalid', !valid);
    input.classList.toggle('is-valid', valid && input.value.trim() !== '');
    error.textContent = valid ? '' : QH.t(field.message);
    input.setAttribute('aria-invalid', String(!valid));
    return valid;
  }

  fields.forEach(field => {
    const input = document.getElementById(field.id);
    input.addEventListener('input', () => validateField(field));
    input.addEventListener('change', () => validateField(field));
  });

  contactForm.addEventListener('submit', event => {
    event.preventDefault();
    const valid = fields.map(validateField).every(Boolean);
    const status = document.getElementById('contactStatus');
    if (!valid) {
      status.textContent = QH.t('Please correct the highlighted fields.');
      status.className = 'small mt-3 text-danger';
      contactForm.querySelector('.is-invalid')?.focus();
      return;
    }
    status.textContent = QH.t('Thank you. Your message has been validated in this demo. No message is sent to a server.');
    status.className = 'small mt-3 text-success';
    contactForm.reset();
    fields.forEach(field => {
      const input = document.getElementById(field.id);
      input.classList.remove('is-valid', 'is-invalid');
      input.removeAttribute('aria-invalid');
    });
  });
}
