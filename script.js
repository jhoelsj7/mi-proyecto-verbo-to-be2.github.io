document.addEventListener('DOMContentLoaded', function() {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100,
        delay: 100,
        easing: 'ease-out'
    });
 
    // Mobile menu handling
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenuBtn.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }
 
    // Smooth scroll with offset
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
 
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
 
                // Close mobile menu if open
                if (navLinks.classList.contains('active')) {
                    mobileMenuBtn.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
 
    // Stats counter animation with formatting
    const startCounters = () => {
        const counters = document.querySelectorAll('.stat-number');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            const duration = 2000;
            const step = target / (duration / 16);
            let current = 0;
            
            const updateCounter = () => {
                current += step;
                if (current < target) {
                    counter.textContent = Math.round(current).toLocaleString('es-PE');
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.textContent = target.toLocaleString('es-PE');
                }
            };
            
            updateCounter();
        });
    };
 
    // Observer for stats section
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                startCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { 
        threshold: [0.5],
        rootMargin: '-50px'  
    });
 
    const statsSection = document.querySelector('.stats-section');
    if (statsSection) {
        observer.observe(statsSection);
    }
 
    // Close mobile menu on outside click
    document.addEventListener('click', (e) => {
        if (navLinks.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            !mobileMenuBtn.contains(e.target)) {
            mobileMenuBtn.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
 
    // Navbar scroll behavior
    const navbar = document.querySelector('.glass-nav');
    let lastScroll = 0;
 
    const handleScroll = () => {
        const currentScroll = window.pageYOffset;
 
        if (currentScroll > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.1)';
            navbar.style.boxShadow = 'none';
        }
 
        if (currentScroll > lastScroll && currentScroll > 200) {
            navbar.style.transform = 'translateY(-100%)';
        } else {
            navbar.style.transform = 'translateY(0)';
        }
 
        lastScroll = currentScroll;
    };
 
    window.addEventListener('scroll', handleScroll);
 
    // Pricing cards interaction
    const pricingCards = document.querySelectorAll('.pricing-card');
    pricingCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            pricingCards.forEach(c => c.style.transform = 'scale(0.95)');
            card.style.transform = 'scale(1.05)';
        });
        
        card.addEventListener('mouseleave', () => {
            pricingCards.forEach(c => c.style.transform = 'scale(1)');
        });
    });
 
    // Particle animation
    const createParticle = () => {
        const particles = document.querySelector('.particles');
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + 'vw';
        particle.style.top = Math.random() * 100 + 'vh';
        const size = Math.random() * 5 + 2;
        particle.style.width = size + 'px';
        particle.style.height = size + 'px';
        particle.style.animationDuration = Math.random() * 2 + 3 + 's';
        
        particles.appendChild(particle);
        
        setTimeout(() => particle.remove(), 5000);
    };
 
    setInterval(createParticle, 200);
 
    // Floating elements
    const floatingElements = document.querySelectorAll('.floating-text');
    floatingElements.forEach((el, index) => {
        el.style.animation = `floatText ${3 + index * 0.5}s ease-in-out infinite ${index * 0.5}s`;
    });
 
    // Section reveal animation
    const revealSections = document.querySelectorAll('section');
    const revealSection = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
            }
        });
    };
 
    const sectionObserver = new IntersectionObserver(revealSection, {
        root: null,
        threshold: 0.15
    });
 
    revealSections.forEach(section => {
        section.classList.add('section--hidden');
        sectionObserver.observe(section);
    });
 
    // Lazy loading images
    const lazyImages = document.querySelectorAll('img[data-src]');
    const loadImg = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.src = entry.target.dataset.src;
                entry.target.addEventListener('load', () => {
                    entry.target.classList.remove('lazy-img');
                });
                observer.unobserve(entry.target);
            }
        });
    };
 
    const imgObserver = new IntersectionObserver(loadImg, {
        root: null,
        threshold: 0,
        rootMargin: '50px'
    });
 
    lazyImages.forEach(img => imgObserver.observe(img));
 
    // Parallax effect
    const heroContent = document.querySelector('.hero-content');
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        heroContent.style.transform = `translateY(${scrolled * 0.4}px)`;
    });
 });