/* =============================================
   JENA'S RESINORIES — JAVASCRIPT
   ============================================= */

document.addEventListener('DOMContentLoaded', () => {

  /* ===== NAVBAR SCROLL ===== */
  const navbar = document.getElementById('navbar');
  const navLinks = document.querySelectorAll('.nav-link');

  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
    updateActiveLink();
    updateBackToTop();
  });

  /* ===== MOBILE HAMBURGER ===== */
  const hamburger = document.getElementById('hamburger');
  const navLinksContainer = document.getElementById('navLinks');

  hamburger.addEventListener('click', () => {
    navLinksContainer.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    if (navLinksContainer.classList.contains('open')) {
      spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
      spans[1].style.opacity = '0';
      spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
    } else {
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    }
  });

  // Close menu on link click
  navLinksContainer.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinksContainer.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '';
      spans[2].style.transform = '';
    });
  });

  /* ===== ACTIVE NAV LINK ===== */
  const sections = document.querySelectorAll('section[id]');

  function updateActiveLink() {
    let current = '';
    sections.forEach(sec => {
      const top = sec.offsetTop - 100;
      if (window.scrollY >= top) current = sec.getAttribute('id');
    });
    navLinks.forEach(link => {
      link.classList.remove('active');
      if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
    });
  }

  /* ===== BACK TO TOP ===== */
  const backToTop = document.getElementById('backToTop');

  function updateBackToTop() {
    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
      backToTop.classList.remove('visible');
    }
  }

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ===== PRODUCT TABS FILTER ===== */
  const tabBtns = document.querySelectorAll('.tab-btn');
  const productCards = document.querySelectorAll('.product-card');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      tabBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const category = btn.getAttribute('data-category');

      productCards.forEach((card, index) => {
        const cardCategory = card.getAttribute('data-category');
        if (category === 'all' || cardCategory === category) {
          card.classList.remove('hidden');
          card.style.animationDelay = `${index * 0.05}s`;
          card.style.animation = 'none';
          void card.offsetWidth; // reflow
          card.style.animation = `fadeInUp 0.5s ease ${index * 0.05}s forwards`;
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  /* ===== SCROLL ANIMATIONS ===== */
  const animateElements = document.querySelectorAll(
    '.product-card, .why-card, .gallery-item, .contact-card, .feature-item, .about-grid, .section-header'
  );

  animateElements.forEach(el => el.classList.add('animate-in'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  animateElements.forEach(el => observer.observe(el));

  /* ===== HERO PARTICLES ===== */
  const particlesContainer = document.getElementById('particles');

  function createParticle() {
    const particle = document.createElement('div');
    const size = Math.random() * 8 + 3;
    const left = Math.random() * 100;
    const duration = Math.random() * 10 + 8;
    const delay = Math.random() * 5;

    const colors = [
      'rgba(233, 30, 140, 0.5)',
      'rgba(124, 77, 255, 0.5)',
      'rgba(41, 121, 255, 0.5)',
      'rgba(251, 194, 235, 0.6)',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    particle.style.cssText = `
      position: absolute;
      bottom: -10px;
      left: ${left}%;
      width: ${size}px;
      height: ${size}px;
      background: ${color};
      border-radius: 50%;
      animation: particleFloat ${duration}s ${delay}s linear infinite;
      pointer-events: none;
    `;

    particlesContainer.appendChild(particle);
  }

  for (let i = 0; i < 20; i++) createParticle();

  /* ===== CONTACT FORM ===== */
  const contactForm = document.getElementById('contactForm');
  const formSuccess = document.getElementById('formSuccess');
  const resetFormBtn = document.getElementById('resetFormBtn');
  const submitBtn = document.getElementById('submit-btn');

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const fullname = document.getElementById('fullname').value.trim();
    const useremail = document.getElementById('useremail').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!fullname || !useremail || !message) {
      // Shake validation
      [document.getElementById('fullname'), document.getElementById('useremail'), document.getElementById('message')].forEach(field => {
        if (!field.value.trim()) {
          field.style.borderColor = '#e91e8c';
          field.style.animation = 'shake 0.4s ease';
          setTimeout(() => { field.style.animation = ''; field.style.borderColor = ''; }, 500);
        }
      });
      return;
    }

    // Compose WhatsApp message
    const interest = document.getElementById('interest').value;
    const userphone = document.getElementById('userphone').value.trim();
    const interestMap = {
      gift: 'Resin Gift Items', jewelry: 'Resin Jewelry',
      molds: 'Resin Molds', resins: 'Resin Supplies',
      custom: 'Custom Order', other: 'Other', '': 'General Inquiry'
    };
    const interestLabel = interestMap[interest] || 'General Inquiry';

    const waMessage = encodeURIComponent(
      `Hello Jena's Resinories! 🌸\n\nI'm ${fullname} and I'm interested in: ${interestLabel}\n\n${message}\n\nContact: ${useremail}${userphone ? '\nPhone: ' + userphone : ''}`
    );

    submitBtn.disabled = true;
    submitBtn.querySelector('span').textContent = 'Sending...';

    setTimeout(() => {
      // Show success
      contactForm.style.display = 'none';
      formSuccess.style.display = 'flex';

      // Open WhatsApp with the message
      window.open(`https://wa.me/94715997606?text=${waMessage}`, '_blank');
    }, 800);
  });

  if (resetFormBtn) {
    resetFormBtn.addEventListener('click', () => {
      contactForm.reset();
      contactForm.style.display = 'block';
      formSuccess.style.display = 'none';
      submitBtn.disabled = false;
      submitBtn.querySelector('span').textContent = 'Send Inquiry';
    });
  }

  /* ===== SMOOTH ANCHOR SCROLL ===== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      e.preventDefault();
      const target = document.querySelector(href);
      if (target) {
        const top = target.offsetTop - 80;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  /* ===== ADD SHAKE KEYFRAME DYNAMICALLY ===== */
  const style = document.createElement('style');
  style.textContent = `
    @keyframes shake {
      0%, 100% { transform: translateX(0); }
      20% { transform: translateX(-8px); }
      40% { transform: translateX(8px); }
      60% { transform: translateX(-6px); }
      80% { transform: translateX(6px); }
    }
  `;
  document.head.appendChild(style);

});
