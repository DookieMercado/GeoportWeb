document.addEventListener('DOMContentLoaded', () => {
  

  const hamburger = document.getElementById('hamburger');
  const navMenu   = document.querySelector('.nav-menu');
  const navLinks  = document.querySelectorAll('.nav-link');

  function toggleMenu() {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
  }

  hamburger.addEventListener('click', toggleMenu);

  // Close menu when a nav link is clicked
  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    });
  });

  // Close menu when resizing above mobile breakpoint
  window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // Close menu with Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      hamburger.classList.remove('active');
      navMenu.classList.remove('active');
    }
  });

  // ---------- LEARN MORE BUTTON ----------
  const learnMoreBtn = document.getElementById('learnMoreBtn');
  if (learnMoreBtn) {
    learnMoreBtn.addEventListener('click', () => {
      const aboutSection = document.getElementById('about');
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // ---------- SMOOTH SCROLL FOR ALL ANCHOR LINKS ----------
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href === '#') return;
      const target = document.querySelector(href);
      if (target) {
        e.preventDefault();
        const offsetTop = target.offsetTop - 80;  // compensate for sticky header
        window.scrollTo({
          top: offsetTop,
          behavior: 'smooth'
        });
      }
    });
  });

  // ---------- ACTIVE NAV LINK HIGHLIGHTING ----------
  const sections = document.querySelectorAll('section');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop;
      if (window.pageYOffset >= sectionTop - 100) {
        current = section.getAttribute('id');
      }
    });

    navLinks.forEach(link => {
      const linkTarget = link.getAttribute('href').slice(1);
      if (linkTarget === current) {
        link.style.color = 'var(--accent)';
      } else {
        link.style.color = 'var(--text-secondary)';
      }
    });
  });


});
// Animate stat numbers when they scroll into view
const statNumbers = document.querySelectorAll('.stat-number');
let statsAnimated = false;

function animateCounter(element, target) {
    const duration = 2000;          // 2 seconds
    const increment = target / (duration / 16);
    let current = 0;

    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current) + '%';
    }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting && !statsAnimated) {
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                animateCounter(stat, target);
            });
            statsAnimated = true;
            statsObserver.unobserve(entry.target);   // only once
        }
    });
}, { threshold: 0.5 });

const trustSection = document.querySelector('.trust-section');
if (trustSection) {
    statsObserver.observe(trustSection);
}