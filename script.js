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

  // Stats counter animation
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

  // Intersection Observer for counters
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

  // Close mobile menu when clicking outside
  document.addEventListener('click', (e) => {
      if (navLinks.classList.contains('active') && 
          !navLinks.contains(e.target) && 
          !mobileMenuBtn.contains(e.target)) {
          mobileMenuBtn.classList.remove('active');
          navLinks.classList.remove('active');
          document.body.style.overflow = '';
      }
  });

 // Navbar background change on scroll
 const navbar = document.querySelector('.glass-nav');
 let lastScroll = 0;

 const handleScroll = () => {
     const currentScroll = window.pageYOffset;

     // Cambiar el fondo del navbar al hacer scroll
     if (currentScroll > 50) {
         navbar.style.background = 'rgba(255, 255, 255, 0.95)';
         navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
     } else {
         navbar.style.background = 'rgba(255, 255, 255, 0.1)';
         navbar.style.boxShadow = 'none';
     }

     // Ocultar/mostrar navbar al hacer scroll
     if (currentScroll > lastScroll && currentScroll > 200) {
         navbar.style.transform = 'translateY(-100%)';
     } else {
         navbar.style.transform = 'translateY(0)';
     }

     lastScroll = currentScroll;
 };

 window.addEventListener('scroll', handleScroll);

 // Animación para las pricing cards al hover
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

});