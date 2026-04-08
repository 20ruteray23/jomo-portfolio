// Navbar scroll effect
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// Hamburger menu
const hamburger = document.getElementById('hamburger');
const navLinks = document.querySelector('.nav-links');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu on link click
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});

// Active nav link on scroll
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  // Clear all active states when near the top (in hero)
  if (window.scrollY < 80) {
    document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
    return;
  }
  const scrollY = window.scrollY + 100;
  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');
    const link = document.querySelector(`.nav-links a[href="#${id}"]`);
    if (link && scrollY >= top && scrollY < top + height) {
      document.querySelectorAll('.nav-links a').forEach(l => l.classList.remove('active'));
      link.classList.add('active');
    }
  });
});

// Intersection Observer for scroll-in animations
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(
  '.about-card, .timeline-item, .edu-card, .contact-card, .skill-category, .about-text, .about-cards, .lang-item, .project-card, .contact-form-wrap'
).forEach(el => {
  el.classList.add('fade-up');
  observer.observe(el);
});

// Language bar animation — save target widths, start at 0, animate on scroll
document.querySelectorAll('.lang-fill').forEach(bar => {
  const target = bar.dataset.width;
  bar.style.width = '0%';
  bar.dataset.target = target;
});

const langObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.lang-fill').forEach(bar => {
        bar.style.width = bar.dataset.target + '%';
      });
      langObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.4 });

const langSection = document.querySelector('.languages-row');
if (langSection) langObserver.observe(langSection);

// Back to top button
const backToTop = document.getElementById('back-to-top');
window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 400);
});
backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Contact form submission via Formspree (AJAX)
// Sign up at formspree.io and replace YOUR_FORM_ID in the form action attribute in index.html
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const btn = form.querySelector('.form-submit');
    const success = document.getElementById('form-success');

    btn.textContent = 'Sending...';
    btn.disabled = true;

    try {
      const res = await fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      });

      if (res.ok) {
        success.style.display = 'flex';
        form.reset();
        btn.textContent = 'Message Sent!';
        setTimeout(() => {
          btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
          btn.disabled = false;
          success.style.display = 'none';
        }, 5000);
      } else {
        throw new Error('Form submission failed');
      }
    } catch {
      btn.innerHTML = 'Send Message <i class="fas fa-paper-plane"></i>';
      btn.disabled = false;
      alert('Something went wrong. Please email me directly at ruterejomo31@gmail.com');
    }
  });
}

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  });
});
