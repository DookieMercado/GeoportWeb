// tsParticles initialization
tsParticles.load("tsparticles", {
    fullScreen: { enable: true, zIndex: -1 },
    background: { color: { value: "transparent" } },
    particles: {
        number: { value: 60, density: { enable: true, area: 800 } },
        color: { value: "#ffffff" },
        shape: { type: "circle" },
        opacity: { value: 0.3, random: true },
        size: { value: 3, random: true },
        move: {
            enable: true,
            speed: 1,
            direction: "none",
            outModes: { default: "bounce" }
        }
    },
    interactivity: {
        events: {
            onHover: { enable: true, mode: "repulse" },
            onClick: { enable: true, mode: "push" },
            resize: true
        },
        modes: {
            repulse: { distance: 100 },
            push: { quantity: 4 }
        }
    }
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Feature cards interaction
const featureCards = document.querySelectorAll('.feature-card');

featureCards.forEach(card => {
    card.addEventListener('touchstart', () => {
        featureCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
            }
        });
        card.classList.toggle('active');
    });

    card.addEventListener('click', () => {
        featureCards.forEach(otherCard => {
            if (otherCard !== card) {
                otherCard.classList.remove('active');
            }
        });
        card.classList.toggle('active');
    });
});

// Form submission
document.querySelector('.contact-form')?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = e.target.querySelector('.send-btn');
    const originalText = btn.textContent;

    btn.textContent = 'Sending...';

    setTimeout(() => {
        btn.textContent = 'Sent ✓';
        setTimeout(() => {
            btn.textContent = originalText;
            e.target.reset();
        }, 2000);
    }, 1000);
});

// Close feature descriptions when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.feature-card')) {
        featureCards.forEach(card => {
            card.classList.remove('active');
        });
    }
});

// Reveal on scroll
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target);
        }
    });
}, { threshold: 0.2 });

document.querySelectorAll('.feature-card, .team-member').forEach(el => observer.observe(el));

// Phone animation on scroll
document.addEventListener("DOMContentLoaded", function () {
    const phone = document.querySelector(".phone");

    const phoneObserver = new IntersectionObserver(
        entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    phone.classList.add("animate");
                    phoneObserver.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.3,
        }
    );

    if (phone) {
        phoneObserver.observe(phone);
    }
});
