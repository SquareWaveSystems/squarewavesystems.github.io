// Theme toggle with localStorage persistence
const themeToggle = document.querySelector('.theme-toggle');
const html = document.documentElement;

// Check for saved theme preference or default to dark
function getPreferredTheme() {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        return savedTheme;
    }
    // Default to dark theme (the original CRT aesthetic)
    return 'dark';
}

// Apply theme
function setTheme(theme) {
    if (theme === 'light') {
        html.setAttribute('data-theme', 'light');
    } else {
        html.removeAttribute('data-theme');
    }
    localStorage.setItem('theme', theme);
}

// Initialize theme on page load
setTheme(getPreferredTheme());

// Toggle theme on button click
if (themeToggle) {
    themeToggle.addEventListener('click', function() {
        const currentTheme = html.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        setTheme(newTheme);
    });
}

// Mobile menu toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const mobileNav = document.getElementById('mobile-nav');

if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener('click', function() {
        const isExpanded = this.getAttribute('aria-expanded') === 'true';
        this.setAttribute('aria-expanded', !isExpanded);
        mobileNav.classList.toggle('active');
        document.body.style.overflow = isExpanded ? '' : 'hidden';
    });

    // Close menu when clicking a link
    mobileNav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            mobileMenuBtn.setAttribute('aria-expanded', 'false');
            mobileNav.classList.remove('active');
            document.body.style.overflow = '';
        });
    });
}

// Copy to clipboard functionality for email with visual feedback
const emailTrigger = document.getElementById('email-trigger');
const clickMsg = document.getElementById('click-msg');

function copyEmail() {
    // Read email from the mailto link to maintain single source of truth
    const emailLink = emailTrigger.querySelector('.email-address');
    const email = emailLink ? emailLink.href.replace('mailto:', '') : '';

    if (!email) return;

    navigator.clipboard.writeText(email).then(function() {
        clickMsg.textContent = "[ COPIED_TO_CLIPBOARD ]";
        // Use theme-appropriate high contrast so the hint stays visible on hover
        clickMsg.style.color = "var(--bg-deep)";
        emailTrigger.style.borderColor = "var(--green)";

        setTimeout(function() {
            clickMsg.textContent = "[ CLICK_TO_COPY_ADDRESS ]";
            clickMsg.style.color = "var(--text-muted)";
            emailTrigger.style.borderColor = "var(--amber-dim)";
        }, 2000);
    });
}

if(emailTrigger) {
    emailTrigger.addEventListener('click', function(e) {
        // Don't copy if clicking the actual mailto link
        if (e.target.tagName !== 'A') {
            copyEmail();
        }
    });

    // Keyboard accessibility
    emailTrigger.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            copyEmail();
        }
    });
}

// Smooth reveal on scroll
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, observerOptions);

document.querySelectorAll('section h2, section > .container > p, .service-card, .product-feature').forEach(el => {
    el.classList.add('reveal');
    observer.observe(el);
});

// Add delay to establish connection button scroll to show green state
const establishConnectionBtn = document.querySelector('.hero .btn[href="#contact"]');
if (establishConnectionBtn) {
    establishConnectionBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');

        // Wait 400ms to let user see the green hover state
        setTimeout(() => {
            const targetSection = document.querySelector(targetId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }, 400);
    });
}

// Disable hero title navigation but keep hover effects
const heroTitleLink = document.querySelector('.h1-link');
if (heroTitleLink) {
    heroTitleLink.addEventListener('click', (e) => {
        e.preventDefault();
    });
}
