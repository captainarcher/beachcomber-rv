// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    
    // Animate hamburger
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('active') ? 'rotate(45deg) translateY(8px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('active') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('active') ? 'rotate(-45deg) translateY(-8px)' : '';
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        const spans = hamburger.querySelectorAll('span');
        spans[0].style.transform = '';
        spans[1].style.opacity = '1';
        spans[2].style.transform = '';
    });
});

// Navbar scroll effect
const navbar = document.querySelector('.navbar');
let lastScroll = 0;

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
    
    lastScroll = currentScroll;
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        
        if (target) {
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.animation = 'fadeInUp 0.8s ease forwards';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.about-card, .amenity-card, .gallery-item, .feature').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
});

// Add parallax effect to hero section
const hero = document.querySelector('.hero');
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallax = -scrolled * 0.5;
    hero.style.transform = `translateY(${parallax}px)`;
});

// Dynamic year in footer
const currentYear = new Date().getFullYear();
const footerYear = document.querySelector('.footer-bottom p');
if (footerYear) {
    footerYear.innerHTML = `&copy; ${currentYear} Beachcomber RV Retreats LLC. All rights reserved.`;
}

// Add beach-themed cursor trail effect (optional fun feature)
let mouseX = 0;
let mouseY = 0;
let bubbles = [];

class Bubble {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.size = Math.random() * 10 + 5;
        this.speedX = Math.random() * 2 - 1;
        this.speedY = Math.random() * -2 - 1;
        this.opacity = 1;
        this.element = document.createElement('div');
        this.element.className = 'bubble';
        this.element.style.cssText = `
            position: fixed;
            width: ${this.size}px;
            height: ${this.size}px;
            background: radial-gradient(circle, rgba(78,205,196,0.6), rgba(30,136,229,0.4));
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            left: ${this.x}px;
            top: ${this.y}px;
        `;
        document.body.appendChild(this.element);
    }
    
    update() {
        this.x += this.speedX;
        this.y += this.speedY;
        this.opacity -= 0.02;
        
        this.element.style.left = this.x + 'px';
        this.element.style.top = this.y + 'px';
        this.element.style.opacity = this.opacity;
        
        if (this.opacity <= 0) {
            this.element.remove();
            return false;
        }
        return true;
    }
}

// Optional: Enable bubble effect on mouse move (disabled by default)
let bubbleEffect = false;

if (bubbleEffect) {
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        
        if (Math.random() > 0.9) {
            bubbles.push(new Bubble(mouseX, mouseY));
        }
    });
    
    function animateBubbles() {
        bubbles = bubbles.filter(bubble => bubble.update());
        requestAnimationFrame(animateBubbles);
    }
    
    animateBubbles();
}

// Gallery hover effect
document.querySelectorAll('.gallery-placeholder').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.background = 'linear-gradient(135deg, #FF6B6B, #FFD93D)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.background = 'linear-gradient(135deg, #4ECDC4, #1E88E5)';
    });
});

// Loading animation for images (when real images are added)
function lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.classList.add('loaded');
                observer.unobserve(img);
            }
        });
    });
    
    images.forEach(img => imageObserver.observe(img));
}

// Call lazyLoadImages when real images are added
// lazyLoadImages();

// Add tropical wave animation to sections
function createWave() {
    const wave = document.createElement('div');
    wave.className = 'wave-animation';
    wave.style.cssText = `
        position: absolute;
        width: 100%;
        height: 100px;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 100"><path fill="%234ECDC4" fill-opacity="0.1" d="M0,50 Q360,0 720,50 T1440,50 L1440,100 L0,100 Z"></path></svg>') no-repeat;
        background-size: cover;
        bottom: 0;
        left: 0;
        pointer-events: none;
        opacity: 0.5;
    `;
    return wave;
}

// Booking button pulse effect
const bookingButtons = document.querySelectorAll('.btn-book, .btn-primary');
bookingButtons.forEach(btn => {
    btn.addEventListener('mouseenter', function() {
        this.style.animation = 'pulse 0.5s ease';
    });
    
    btn.addEventListener('animationend', function() {
        this.style.animation = '';
    });
});

// Add pulse animation
const style = document.createElement('style');
style.textContent = `
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.05); }
        100% { transform: scale(1); }
    }
`;
document.head.appendChild(style);

console.log('🏖️ Welcome to Beachcomber RV Retreats! Your beach vacation awaits...');