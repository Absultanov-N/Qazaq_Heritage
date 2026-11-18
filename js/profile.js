// Client-side authentication simulation for the course project only.
// Do not use this plaintext localStorage approach for real accounts.
const USER_KEY = 'qazaqHeritageUser';
const SESSION_KEY = 'qazaqHeritageCurrentUser';
const signupForm = document.getElementById('signupForm');
const loginForm = document.getElementById('loginForm');
const authPanel = document.getElementById('authPanel');
const profilePanel = document.getElementById('profilePanel');
const editProfileForm = document.getElementById('editProfileForm');
const editProfileName = document.getElementById('editProfileName');
const tr = text => window.QH?.t(text) || text;
document.addEventListener('qh:languagechange', () => {
  const user = readStoredUser();
  const joined = user?.createdAt ? new Date(user.createdAt) : null;
  const memberSince = document.getElementById('profileMemberSince');
  if (memberSince && profilePanel && !profilePanel.classList.contains('d-none')) {
    memberSince.textContent = joined && !Number.isNaN(joined.getTime())
      ? (window.QH?.formatMonth(joined) || new Intl.DateTimeFormat('en-US', { year:'numeric', month:'long' }).format(joined))
      : tr('Date unavailable');
  }
});

function readStoredUser() {
  try {
    const value = JSON.parse(localStorage.getItem(USER_KEY) || 'null');
    return value && typeof value === 'object' &&
      typeof value.name === 'string' &&
      typeof value.email === 'string' &&
      typeof value.password === 'string' ? value : null;
  } catch (error) {
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

function setStatus(id, message, isError = true) {
  const element = document.getElementById(id);
  element.textContent = message;
  element.className = `small mt-3 mb-0 ${isError ? 'text-danger' : 'text-success'}`;
}

function setFormMode(mode) {
  const signupMode = mode === 'signup';
  signupForm.classList.toggle('d-none', !signupMode);
  loginForm.classList.toggle('d-none', signupMode);
  document.getElementById('signupTab').classList.toggle('active', signupMode);
  document.getElementById('loginTab').classList.toggle('active', !signupMode);
  setStatus('signupStatus', '', false);
  setStatus('loginStatus', '', false);
}

function showProfile(user) {
  signupForm.classList.add('d-none');
  loginForm.classList.add('d-none');
  authPanel.querySelector('.nav-pills')?.classList.add('d-none');
  profilePanel.classList.remove('d-none');
  document.getElementById('profileName').textContent = user.name;
  document.getElementById('profileNameDetail').textContent = user.name;
  document.getElementById('profileEmail').textContent = user.email;
  const joined = user.createdAt ? new Date(user.createdAt) : null;
  document.getElementById('profileMemberSince').textContent =
    joined && !Number.isNaN(joined.getTime())
      ? (window.QH?.formatMonth(joined) || new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long' }).format(joined))
      : tr('Date unavailable');
}

function showFieldError(input, message) {
  input.classList.toggle('is-invalid', Boolean(message));
  input.setAttribute('aria-invalid', String(Boolean(message)));
  const feedback = input.parentElement.querySelector('.invalid-feedback');
  if (feedback) feedback.textContent = message;
}

function validEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email);
}

function clearErrors(form) {
  form.querySelectorAll('.is-invalid').forEach(input => {
    input.classList.remove('is-invalid');
    input.removeAttribute('aria-invalid');
    const feedback = input.parentElement.querySelector('.invalid-feedback');
    if (feedback) feedback.textContent = '';
  });
}

signupForm.addEventListener('submit', event => {
  event.preventDefault();
  clearErrors(signupForm);
  const name = document.getElementById('signupName');
  const email = document.getElementById('signupEmail');
  const password = document.getElementById('signupPassword');
  const normalizedEmail = email.value.trim().toLowerCase();
  const passwordValid = password.value.length >= 8 && /[A-Za-z]/.test(password.value) && /\d/.test(password.value);
  const errors = [
    [name, name.value.trim().length >= 2 ? '' : tr('Enter a name with at least 2 characters.')],
    [email, validEmail(normalizedEmail) ? '' : tr('Enter a valid email address.')],
    [password, passwordValid ? '' : tr('Use at least 8 characters, including a letter and a number.')]
  ];
  errors.forEach(([input, message]) => showFieldError(input, message));
  const firstInvalid = errors.find(([, message]) => message);
  if (firstInvalid) {
    firstInvalid[0].focus();
    setStatus('signupStatus', tr('Please correct the highlighted fields.'));
    return;
  }

  const existingUser = readStoredUser();
  if (existingUser && existingUser.email === normalizedEmail) {
    showFieldError(email, tr('An account with this email already exists. Please log in.'));
    email.focus();
    setStatus('signupStatus', tr('This email is already registered.'));
    return;
  }

  const user = { name: name.value.trim(), email: normalizedEmail, password: password.value, createdAt: new Date().toISOString() };
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  localStorage.setItem(SESSION_KEY, user.email);
  setStatus('signupStatus', '', false);
  setStatus('loginStatus', '', false);
  showProfile(user);
  const profileStatus = document.getElementById('profileStatus');
  if (profileStatus) {
    profileStatus.textContent = tr('Registration successful. Your local demo profile is now active.');
  }
});

loginForm.addEventListener('submit', event => {
  event.preventDefault();
  clearErrors(loginForm);
  const email = document.getElementById('loginEmail');
  const password = document.getElementById('loginPassword');
  const normalizedEmail = email.value.trim().toLowerCase();
  const emailError = validEmail(normalizedEmail) ? '' : tr('Enter a valid email address.');
  const passwordError = password.value ? '' : tr('Enter your password.');
  showFieldError(email, emailError);
  showFieldError(password, passwordError);
  if (emailError || passwordError) {
    (emailError ? email : password).focus();
    setStatus('loginStatus', tr('Please correct the highlighted fields.'));
    return;
  }

  const user = readStoredUser();
  if (!user || user.email !== normalizedEmail || user.password !== password.value) {
    setStatus('loginStatus', tr('Email or password is incorrect.'));
    return;
  }
  localStorage.setItem(SESSION_KEY, user.email);
  window.location.assign('profile.html');
});

document.getElementById('signupTab').addEventListener('click', () => setFormMode('signup'));
document.getElementById('loginTab').addEventListener('click', () => setFormMode('login'));
// Allow the signed-in visitor to update the display name stored in this browser.
document.getElementById('editProfileBtn')?.addEventListener('click', () => {
  const user = readStoredUser();
  if (!user || !editProfileForm) return;
  editProfileName.value = user.name || '';
  editProfileForm.classList.remove('d-none');
  editProfileName.focus();
});

document.getElementById('cancelProfileEdit')?.addEventListener('click', () => {
  editProfileForm?.classList.add('d-none');
  editProfileName?.classList.remove('is-invalid');
  const status = document.getElementById('editProfileStatus');
  if (status) status.textContent = '';
});

editProfileForm?.addEventListener('submit', event => {
  event.preventDefault();
  const nextName = editProfileName.value.trim();
  const feedback = editProfileName.parentElement.querySelector('.invalid-feedback');
  if (nextName.length < 2) {
    editProfileName.classList.add('is-invalid');
    feedback.textContent = tr('Enter at least 2 characters.');
    editProfileName.focus();
    return;
  }
  editProfileName.classList.remove('is-invalid');
  feedback.textContent = '';
  const user = readStoredUser();
  if (!user) return;
  user.name = nextName;
  localStorage.setItem(USER_KEY, JSON.stringify(user));
  showProfile(user);
  editProfileForm.classList.add('d-none');
  const status = document.getElementById('editProfileStatus');
  if (status) {
    status.textContent = tr('Your display name has been updated.');
    status.className = 'small mt-2 mb-0 text-success';
  }
});

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem(SESSION_KEY);
  profilePanel.classList.add('d-none');
  authPanel.querySelector('.nav-pills')?.classList.remove('d-none');
  authPanel.classList.remove('d-none');
  loginForm.reset();
  setFormMode('login');
});

const savedUser = readStoredUser();
const currentEmail = localStorage.getItem(SESSION_KEY);
if (savedUser && currentEmail === savedUser.email) {
  showProfile(savedUser);
} else {
  localStorage.removeItem(SESSION_KEY);
  setFormMode('signup');
}
