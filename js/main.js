const navToggle = document.querySelector('.nav-toggle');
const mainNav = document.querySelector('.main-nav');

if (navToggle && mainNav) {
  navToggle.addEventListener('click', () => {
    const isOpen = mainNav.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
  });

  mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
      mainNav.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });
}

const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    const data = new FormData(contactForm);
    const subject = encodeURIComponent(`Course enquiry: ${data.get('course')}`);
    const body = encodeURIComponent(
      `Name: ${data.get('name')}\n` +
      `Email: ${data.get('email')}\n` +
      `Telephone: ${data.get('phone') || 'Not provided'}\n` +
      `Course: ${data.get('course')}\n\n` +
      `${data.get('message')}`
    );

    window.location.href = `mailto:info@eliteprotectiontraining.com?subject=${subject}&body=${body}`;
  });
}
