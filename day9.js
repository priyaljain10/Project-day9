const name = document.getElementById('fullName');
const email = document.getElementById('email');
const password = document.getElementById('password');
const phone = document.getElementById('phone');
const form = document.getElementById('registrationForm');
const togglePassword = document.getElementById('togglePassword');
const meter = document.getElementById('strength');

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const phoneRegex = /^[6-9]\d{9}$/;
const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;

function validateField(field, regex, errorElem) {
  const isValid = regex.test(field.value.trim());
  field.classList.toggle('success', isValid);
  field.classList.toggle('error-border', !isValid);
  errorElem.classList.toggle('show', !isValid);
  return isValid;
}

email.addEventListener('blur', () => {
  validateField(email, emailRegex, document.getElementById('emailError'));
});

phone.addEventListener('blur', () => {
  validateField(phone, phoneRegex, document.getElementById('phoneError'));
});

password.addEventListener('blur', () => {
  validateField(password, passwordRegex, document.getElementById('passwordError'));
});

password.addEventListener('input', () => {
  let strength = 0;
  if (password.value.length >= 8) strength++;
  if (/[A-Z]/.test(password.value)) strength++;
  if (/[a-z]/.test(password.value)) strength++;
  if (/\d/.test(password.value)) strength++;
  if (/[\W_]/.test(password.value)) strength++;
  meter.value = strength;
});

togglePassword.addEventListener('click', () => {
  const type = password.type === 'password' ? 'text' : 'password';
  password.type = type;
  togglePassword.textContent = type === 'password' ? 'Show' : 'Hide';
});

form.addEventListener('submit', (e) => {
  e.preventDefault();
  const isEmailValid = validateField(email, emailRegex, document.getElementById('emailError'));
  const isPasswordValid = validateField(password, passwordRegex, document.getElementById('passwordError'));
  const isPhoneValid = validateField(phone, phoneRegex, document.getElementById('phoneError'));
  const isTermsChecked = document.getElementById('terms').checked;

   if (isEmailValid && isPasswordValid && isPhoneValid && isTermsChecked) {
    alert('Form submitted successfully!');
    form.reset();
    meter.value = 0;
    document.querySelectorAll('.success').forEach(el => el.classList.remove('success'));
  } else {
    alert('Resolve the errors in the form.');
  }
});


