// Navigation
const nav = document.querySelector('nav');
const burger = document.querySelector('.burger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links a');

// Mobile Navigation
burger.addEventListener('click', () => {
    navLinks.classList.toggle('nav-active');
    burger.classList.toggle('toggle');
});

// Close mobile menu when clicking a link
navLinksItems.forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('nav-active');
        burger.classList.remove('toggle');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            // Add glow effect when element comes into view
            entry.target.style.boxShadow = '0 0 20px rgba(100, 255, 218, 0.1)';
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
});

// Typing effect for hero section
const text = "DevOps Engineer and Data Analyst";
const typingText = document.querySelector('.typing-text');
let i = 0;

function typeWriter() {
    if (i < text.length) {
        typingText.innerHTML += text.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
    }
}

// Start typing effect when the page loads
window.addEventListener('load', typeWriter);

// Form submission
/*const contactForm = document.getElementById('contact-form');
const submitBtn = contactForm.querySelector('.submit-btn');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    // Show loading state
    submitBtn.innerHTML = '<span class="spinner"></span> Sending...';
    submitBtn.disabled = true;
    
    // Simulate form submission (replace with actual API call)
    setTimeout(() => {
        submitBtn.innerHTML = 'Message Sent!';
        submitBtn.style.backgroundColor = 'var(--secondary-color)';
        submitBtn.style.color = 'var(--primary-color)';
        
        // Reset form
        contactForm.reset();
        
        // Reset button after 3 seconds
        setTimeout(() => {
            submitBtn.innerHTML = 'Send Message';
            submitBtn.style.backgroundColor = '';
            submitBtn.style.color = '';
            submitBtn.disabled = false;
        }, 3000);
    }, 1500);
});
*/

document.getElementById("contact-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const submitBtn = this.querySelector('.submit-btn');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    emailjs.sendForm("service_fpqs10z", "template_ssdn56r", this)
        .then(() => {
            submitBtn.innerHTML = '<i class="fas fa-check"></i> Sent!';
            submitBtn.style.backgroundColor = '#2ecc71';
            submitBtn.style.boxShadow = '0 5px 15px rgba(46, 204, 113, 0.3)';
            this.reset();

            setTimeout(() => {
                submitBtn.innerHTML = 'Send Message';
                submitBtn.style.backgroundColor = '';
                submitBtn.style.boxShadow = '';
                submitBtn.disabled = false;
            }, 3000);
        }, (error) => {
            alert('Message failed to send:\n' + error.text);
            submitBtn.innerHTML = 'Send Message';
            submitBtn.disabled = false;
        });
    fetch('http://localhost:5000/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            name: this.querySelector('[name="name"]').value,
            email: this.querySelector('[name="email"]').value,
            message: this.querySelector('[name="message"]').value
        })
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    hero.style.transform = `translateY(${scrolled * 0.5}px)`;
});

// Add CSS for spinner animation
const style = document.createElement('style');
style.textContent = `
    .spinner {
        display: inline-block;
        width: 20px;
        height: 20px;
        border: 3px solid rgba(100, 255, 218, 0.3);
        border-radius: 50%;
        border-top-color: var(--secondary-color);
        animation: spin 1s ease-in-out infinite;
        margin-right: 8px;
    }
    
    @keyframes spin {
        to { transform: rotate(360deg); }
    }
`;
document.head.appendChild(style);

// Scroll Animation for Skills
const skillCards = document.querySelectorAll('.skill-category');
const skillObserverOptions = {
    threshold: 0.2,
    rootMargin: '0px 0px -50px 0px'
};

const skillObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0) rotateX(0deg)';

            // Animate progress bars if they exist inside
            const progressBars = entry.target.querySelectorAll('.skill-progress');
            progressBars.forEach(bar => {
                const targetWidth = bar.style.width;
                bar.style.width = '0';
                setTimeout(() => {
                    bar.style.width = targetWidth;
                }, 100);
            });
        }
    });
}, skillObserverOptions);

skillCards.forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
    skillObserver.observe(card);
});

// Project Cards Hover Effect
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        // CSS handles hover effects mostly, but JS can add dynamic tilt or verify logic
        // Ensuring CSS logic doesn't conflict
    });
});

// Add active class to navigation links on scroll
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });

    navItems.forEach(item => {
        item.classList.remove('active');
        if (item.getAttribute('href').slice(1) === current) {
            item.classList.add('active');
            item.style.color = 'var(--secondary-color)';
        } else {
            item.style.color = 'var(--text-color)';
        }
    });
});

// Navbar scroll effect
// Navbar scroll effect
const navbar = document.querySelector('nav');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.background = 'rgba(10, 25, 47, 0.85)'; // Semi-transparent when scrolled
        navbar.style.backdropFilter = 'blur(15px)';
        navbar.style.borderBottom = '1px solid rgba(100, 255, 218, 0.1)';
        navbar.style.boxShadow = '0 4px 30px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.background = 'transparent'; // Completely transparent at top
        navbar.style.backdropFilter = 'blur(0px)'; // Remove blur at top for clarity
        navbar.style.borderBottom = '1px solid transparent';
        navbar.style.boxShadow = 'none';
    }
});

// Scroll reveal animation
const scrollReveal = () => {
    const elements = document.querySelectorAll('.fade-in');

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
};

window.addEventListener('scroll', scrollReveal);
scrollReveal(); // Initial check

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrolled = window.pageYOffset;
        hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
    }
});

// Read More Button Functionality
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.read-more-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            e.preventDefault(); // Prevent any default behavior
            e.stopPropagation(); // Prevent card hover interference if any

            const description = button.previousElementSibling;

            if (description.classList.contains('expanded')) {
                description.classList.remove('expanded');
                button.textContent = 'Read More';
            } else {
                description.classList.add('expanded');
                button.textContent = 'Read Less';
            }
        });
    });
}); 