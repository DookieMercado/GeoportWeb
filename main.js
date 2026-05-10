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
// ==========================================
// FLOATING CHATBOT (inline expand + typing + toggle)
// ==========================================
const chatbotToggle   = document.getElementById('chatbotToggle');
const chatbotWindow   = document.getElementById('chatbotWindow');
const chatbotMessages = document.getElementById('chatbotMessages');
const chatbotQuestions = document.getElementById('chatbotQuestions');

// Open / close chat window
chatbotToggle.addEventListener('click', () => {
    chatbotWindow.classList.toggle('active');
});
// Close the chat window with the X button
const chatbotClose = document.getElementById('chatbotClose');
if (chatbotClose) {
    chatbotClose.addEventListener('click', () => {
        chatbotWindow.classList.remove('active');
    });
}

// Q&A database
const qaDatabase = [
    {
        question: 'What is Geoport Malaybalay?',
        answer: 'Geoport Malaybalay is a community‑powered mobile app that lets residents report road hazards in real‑time. AI verifies the reports and notifies authorities instantly.'
    },
        {
        question: 'Who created Geoport Malaybalay?',
        answer: 'Geoport Malaybalay was created by TEAM SmartCrew – Davy Mercado, Mart Dahao, Gerome Aljas, and John Dagooc – 4th‑year IT students from Bukidnon State University.'
    },
    {
        question: 'How do I report a hazard?',
        answer: 'Open the app, take a photo of the pothole/crack/accident, and submit. Our AI automatically tags the location and type of hazard.'
    },
    {
        question: 'Is the app free?',
        answer: 'Yes! Geoport Malaybalay is 100% free for all verified residents of Malaybalay City.'
    },
    {
        question: 'Who verifies the reports?',
        answer: 'After you submit a report, a CDRRMO admin reviews it. They will call you directly using the contact info you provided to confirm the details. Only admins can verify a report – no community voting is needed.'
    },
    {
        question: 'How can I download the app?',
        answer: 'Click the "Download App" button on this website, or visit the Google Play Store (coming soon).'
    },
    {
        question: 'What is your success rate?',
        answer: 'We achieved a 100% functionality pass rate, 95% usability success, and an 85% SUS score in our capstone evaluation.'
    },
    {
    question: 'Is my personal data safe?',
    answer: 'Yes. Your data is only used for verification and reporting purposes. We require resident verification to ensure reports are trustworthy, and your contact info is shared only with authorised system admins.'
},
{
    question: 'Does the app work offline?',
    answer: 'You need an internet connection to submit a report, and you can’t upload photos from your gallery. The app uses an integrated built-in camera system to help prevent false reports.'
},
{
    question: 'What if I accidentally submit a false report?',
    answer: 'An admin will call you to verify the details. If a report is found to be false, it will be rejected. Repeated false reports may lead to your account being suspended.'
},
{
    question: 'Can I see reports from other residents?',
    answer: 'Yes – on the app’s map, you can see geotagged hazards reported by other verified residents. The location and type of hazard are public, but personal details and individual report files are only visible to admins and responders.'
},
];

// Build question buttons and attach answer containers
qaDatabase.forEach((item, index) => {
    const wrapper = document.createElement('div');
    wrapper.className = 'question-wrapper';

    const btn = document.createElement('button');
    btn.className = 'question-btn';
    btn.textContent = item.question;

    const answerDiv = document.createElement('div');
    answerDiv.className = 'answer-content';
    answerDiv.style.display = 'none';   // hidden by default

    wrapper.appendChild(btn);
    wrapper.appendChild(answerDiv);
    chatbotQuestions.appendChild(wrapper);

    btn.addEventListener('click', () => handleQuestion(index, answerDiv, item.answer));
});

function handleQuestion(index, answerDiv, fullAnswer) {
    // If already visible, hide it and stop typing
    if (answerDiv.style.display === 'block') {
        answerDiv.style.display = 'none';
        answerDiv.textContent = '';   // clear typed text
        if (answerDiv._typingTimer) clearTimeout(answerDiv._typingTimer);
        return;
    }

    // Show and start typing
    answerDiv.style.display = 'block';
    answerDiv.textContent = '';       // clear any previous text
    if (answerDiv._typingTimer) clearTimeout(answerDiv._typingTimer);

    let charIndex = 0;
    function type() {
        if (charIndex < fullAnswer.length) {
            answerDiv.textContent += fullAnswer.charAt(charIndex);
            charIndex++;
            answerDiv._typingTimer = setTimeout(type, 20);   // slightly faster typing
        }
    }
    type();

    // Scroll to keep the answer in view
    answerDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}