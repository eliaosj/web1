// ================================
// EDGES AI SYSTEMS - JAVASCRIPT
// ================================

// Mobile Navigation Toggle
const mobileToggle = document.getElementById('mobileToggle');
const navMenu = document.getElementById('navMenu');

mobileToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    mobileToggle.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    });
});

// Smooth Scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offset = 80;
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - offset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar scroll effect
const navbar = document.getElementById('navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Particle Animation in Hero Section
const particleContainer = document.getElementById('particles');

function createParticle() {
    const particle = document.createElement('div');
    particle.style.position = 'absolute';
    particle.style.width = Math.random() * 4 + 'px';
    particle.style.height = particle.style.width;
    particle.style.background = 'rgba(0, 217, 255, 0.5)';
    particle.style.borderRadius = '50%';
    particle.style.left = Math.random() * 100 + '%';
    particle.style.top = Math.random() * 100 + '%';
    particle.style.pointerEvents = 'none';
    
    const duration = Math.random() * 10 + 5;
    const delay = Math.random() * 5;
    
    particle.style.animation = `float ${duration}s ${delay}s infinite ease-in-out`;
    
    particleContainer.appendChild(particle);
}

// Create particles
for (let i = 0; 0; i < 30; i++) {
    createParticle();
}

// Add float animation
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% {
            transform: translate(0, 0) scale(1);
            opacity: 0;
        }
        10% {
            opacity: 1;
        }
        90% {
            opacity: 1;
        }
        50% {
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(1.5);
        }
    }
`;
document.head.appendChild(style);

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Observe elements for animation
const animateElements = document.querySelectorAll('.solution-card, .industry-card, .principle-card, .product-features, .product-deployments');
animateElements.forEach(el => {
    el.classList.add('fade-in');
    observer.observe(el);
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const formData = {
        name: document.getElementById('name').value,
        company: document.getElementById('company').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        interest: document.getElementById('interest').value,
        message: document.getElementById('message').value
    };
    
    // Validate form
    if (!formData.name || !formData.company || !formData.email || !formData.interest || !formData.message) {
        showNotification('Please fill in all required fields', 'error');
        return;
    }
    
    if (!isValidEmail(formData.email)) {
        showNotification('Please enter a valid email address', 'error');
        return;
    }
    
    // Simulate form submission
    const submitButton = contactForm.querySelector('button[type="submit"]');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Sending...';
    submitButton.disabled = true;
    
    // Simulate API call
    setTimeout(() => {
        showNotification('Thank you for your inquiry. We will contact you shortly.', 'success');
        contactForm.reset();
        submitButton.textContent = originalText;
        submitButton.disabled = false;
    }, 1500);
});

// Email validation
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// Notification System
function showNotification(message, type = 'success') {
    // Remove existing notification
    const existing = document.querySelector('.notification');
    if (existing) {
        existing.remove();
    }
    
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    Object.assign(notification.style, {
        position: 'fixed',
        top: '100px',
        right: '20px',
        padding: '1.25rem 2rem',
        borderRadius: '8px',
        color: '#ffffff',
        fontWeight: '600',
        zIndex: '10000',
        maxWidth: '400px',
        boxShadow: '0 10px 40px rgba(0, 0, 0, 0.3)',
        animation: 'slideInRight 0.3s ease',
        border: type === 'success' ? '1px solid rgba(0, 255, 136, 0.3)' : '1px solid rgba(255, 77, 77, 0.3)'
    });
    
    if (type === 'success') {
        notification.style.background = 'linear-gradient(135deg, rgba(0, 255, 136, 0.2), rgba(0, 217, 255, 0.2))';
        notification.style.backdropFilter = 'blur(10px)';
    } else {
        notification.style.background = 'linear-gradient(135deg, rgba(255, 77, 77, 0.2), rgba(255, 107, 107, 0.2))';
        notification.style.backdropFilter = 'blur(10px)';
    }
    
    document.body.appendChild(notification);
    
    // Add animations
    const animStyle = document.createElement('style');
    animStyle.textContent = `
        @keyframes slideInRight {
            from {
                transform: translateX(400px);
                opacity: 0;
            }
            to {
                transform: translateX(0);
                opacity: 1;
            }
        }
        @keyframes slideOutRight {
            from {
                transform: translateX(0);
                opacity: 1;
            }
            to {
                transform: translateX(400px);
                opacity: 0;
            }
        }
    `;
    document.head.appendChild(animStyle);
    
    // Remove after 5 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOutRight 0.3s ease';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 5000);
}

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroContent = document.querySelector('.hero-content');
    const particles = document.getElementById('particles');
    
    if (heroContent && scrolled < window.innerHeight) {
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
        heroContent.style.opacity = 1 - scrolled / 700;
    }
    
    if (particles && scrolled < window.innerHeight) {
        particles.style.transform = `translateY(${scrolled * 0.2}px)`;
    }
});

// Card hover effects with 3D tilt
document.querySelectorAll('.solution-card, .industry-card').forEach(card => {
    card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = (y - centerY) / 20;
        const rotateY = (centerX - x) / 20;
        
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-5px)`;
    });
    
    card.addEventListener('mouseleave', () => {
        card.style.transform = '';
    });
});

// Active navigation highlighting based on scroll
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section[id]');
    const scrollPosition = window.pageYOffset + 150;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-link').forEach(link => {
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.style.color = 'var(--primary-color)';
                } else if (!link.classList.contains('nav-cta')) {
                    link.style.color = 'var(--text-secondary)';
                }
            });
        }
    });
});

// Page load animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Typing effect for hero title (optional enhancement)
function typeWriter(element, text, speed = 50) {
    let i = 0;
    element.textContent = '';
    
    function type() {
        if (i < text.length) {
            element.textContent += text.charAt(i);
            i++;
            setTimeout(type, speed);
        }
    }
    
    type();
}

// Dynamic grid background animation
const gridOverlay = document.querySelector('.grid-overlay');
let gridOffset = 0;

function animateGrid() {
    gridOffset += 0.5;
    if (gridOverlay) {
        gridOverlay.style.backgroundPosition = `${gridOffset}px ${gridOffset}px`;
    }
    requestAnimationFrame(animateGrid);
}

animateGrid();

// Console branding
console.log('%c EDGES AI SYSTEMS ', 'background: linear-gradient(135deg, #00d9ff 0%, #0099ff 100%); color: white; font-size: 20px; font-weight: bold; padding: 10px 20px; border-radius: 5px;');
console.log('%c Secure Edge Intelligence | Deterministic Embedded Engineering ', 'color: #00d9ff; font-size: 14px; padding: 5px;');
console.log('%c Built with precision and performance in mind. ', 'color: #a0aec0; font-size: 12px; padding: 5px;');

// Prevent dropdown from closing when clicking inside (for mobile)
document.querySelectorAll('.dropdown-content').forEach(dropdown => {
    dropdown.addEventListener('click', (e) => {
        e.stopPropagation();
    });
});

// Add loading state to all buttons
document.querySelectorAll('.btn').forEach(button => {
    if (button.tagName !== 'BUTTON') return;
    
    button.addEventListener('click', function() {
        if (!this.classList.contains('loading')) {
            this.classList.add('loading');
            setTimeout(() => {
                this.classList.remove('loading');
            }, 2000);
        }
    });
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        mobileToggle.classList.remove('active');
    }
});

// Performance monitoring
if (window.performance) {
    window.addEventListener('load', () => {
        const loadTime = window.performance.timing.domContentLoadedEventEnd - 
                        window.performance.timing.navigationStart;
        console.log(`Page load time: ${loadTime}ms`);
    });
}
