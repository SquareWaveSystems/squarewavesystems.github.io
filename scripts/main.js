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
    const email = "hello@squarewavesystems.com.au";
    navigator.clipboard.writeText(email).then(function() {
        clickMsg.textContent = "[ COPIED_TO_CLIPBOARD ]";
        clickMsg.style.color = "var(--green)";
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
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, observerOptions);

document.querySelectorAll('section h2, section > .container > p, .service-card, .product-feature').forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(20px)";
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease";
    observer.observe(el);
});
