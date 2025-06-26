// Particle Background Animation
class ParticleBackground {
  constructor() {
    this.canvas = document.getElementById('particleCanvas');
    this.ctx = this.canvas.getContext('2d');
    this.particles = [];
    this.animationId = null;
    
    this.init();
  }
  
  init() {
    this.resize();
    this.createParticles();
    this.animate();
    
    window.addEventListener('resize', () => this.resize());
  }
  
  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }
  
  createParticles() {
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 10));
    
    for (let i = 0; i < particleCount; i++) {
      this.particles.push({
        x: Math.random() * this.canvas.width,
        y: Math.random() * this.canvas.height,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
        size: Math.random() * 2 + 1,
        opacity: Math.random() * 0.5 + 0.2,
      });
    }
  }
  
  animate() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    
    this.particles.forEach((particle, index) => {
      // Update position
      particle.x += particle.vx;
      particle.y += particle.vy;
      
      // Wrap around edges
      if (particle.x < 0) particle.x = this.canvas.width;
      if (particle.x > this.canvas.width) particle.x = 0;
      if (particle.y < 0) particle.y = this.canvas.height;
      if (particle.y > this.canvas.height) particle.y = 0;
      
      // Draw particle
      this.ctx.beginPath();
      this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
      this.ctx.fillStyle = `rgba(147, 197, 253, ${particle.opacity})`;
      this.ctx.fill();
      
      // Draw connections
      this.particles.slice(index + 1).forEach(otherParticle => {
        const dx = particle.x - otherParticle.x;
        const dy = particle.y - otherParticle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          this.ctx.beginPath();
          this.ctx.moveTo(particle.x, particle.y);
          this.ctx.lineTo(otherParticle.x, otherParticle.y);
          this.ctx.strokeStyle = `rgba(147, 197, 253, ${0.1 * (1 - distance / 100)})`;
          this.ctx.lineWidth = 0.5;
          this.ctx.stroke();
        }
      });
    });
    
    this.animationId = requestAnimationFrame(() => this.animate());
  }
  
  destroy() {
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }
}

// 3D Mouse Tracking for Hero Logo
class HeroLogoTracker {
  constructor() {
    this.logo = document.getElementById('heroLogo');
    this.init();
  }
  
  init() {
    if (!this.logo) return;
    
    document.addEventListener('mousemove', (e) => this.handleMouseMove(e));
  }
  
  handleMouseMove(e) {
    if (!this.logo) return;
    
    const rect = this.logo.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / 20;
    const deltaY = (e.clientY - centerY) / 20;
    
    this.logo.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateZ(50px)`;
  }
}

// 3D Mouse Tracking for Feature Cards
class FeatureCardTracker {
  constructor() {
    this.cards = document.querySelectorAll('.feature-card');
    this.init();
  }
  
  init() {
    this.cards.forEach(card => {
      card.addEventListener('mousemove', (e) => this.handleMouseMove(e, card));
      card.addEventListener('mouseleave', () => this.handleMouseLeave(card));
    });
  }
  
  handleMouseMove(e, card) {
    const rect = card.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const deltaX = (e.clientX - centerX) / 30;
    const deltaY = (e.clientY - centerY) / 30;
    
    card.style.transform = `perspective(1000px) rotateX(${-deltaY}deg) rotateY(${deltaX}deg) translateZ(20px)`;
  }
  
  handleMouseLeave(card) {
    card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)';
  }
}

// Theme Switcher
class ThemeSwitcher {
  constructor() {
    this.button = document.getElementById('themeSwitcher');
    this.icon = this.button.querySelector('.theme-icon');
    this.isDark = false;
    
    this.init();
  }
  
  init() {
    // Check for saved theme or system preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      this.setDarkMode(true);
    }
    
    this.button.addEventListener('click', () => this.toggle());
  }
  
  toggle() {
    this.setDarkMode(!this.isDark);
  }
  
  setDarkMode(isDark) {
    this.isDark = isDark;
    
    if (isDark) {
      document.body.classList.add('dark');
      this.icon.textContent = '☀️';
      localStorage.setItem('theme', 'dark');
    } else {
      document.body.classList.remove('dark');
      this.icon.textContent = '🌙';
      localStorage.setItem('theme', 'light');
    }
  }
}

// Download Info Toggle
class DownloadInfoToggle {
  constructor() {
    this.toggle = document.getElementById('infoToggle');
    this.content = document.getElementById('infoContent');
    this.isOpen = false;
    
    this.init();
  }
  
  init() {
    if (!this.toggle || !this.content) return;
    
    this.toggle.addEventListener('click', () => this.toggleInfo());
  }
  
  toggleInfo() {
    this.isOpen = !this.isOpen;
    
    if (this.isOpen) {
      this.content.classList.add('show');
    } else {
      this.content.classList.remove('show');
    }
  }
}

// Smooth Scrolling for Navigation Links
class SmoothScroll {
  constructor() {
    this.init();
  }
  
  init() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', (e) => {
        e.preventDefault();
        
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
          const headerHeight = document.querySelector('.header').offsetHeight;
          const targetPosition = target.offsetTop - headerHeight;
          
          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }
}

// Intersection Observer for Animations
class ScrollAnimations {
  constructor() {
    this.observer = null;
    this.init();
  }
  
  init() {
    const options = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };
    
    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, options);
    
    // Observe elements that should animate on scroll
    document.querySelectorAll('.feature-card, .download-card, .step-card').forEach(el => {
      this.observer.observe(el);
    });
  }
}

// Performance Optimization
class PerformanceOptimizer {
  constructor() {
    this.init();
  }
  
  init() {
    // Reduce animations on low-end devices
    if (this.isLowEndDevice()) {
      document.body.classList.add('reduced-motion');
    }
    
    // Lazy load images if any
    this.lazyLoadImages();
  }
  
  isLowEndDevice() {
    return navigator.hardwareConcurrency <= 2 || 
           navigator.deviceMemory <= 2 ||
           window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  }
  
  lazyLoadImages() {
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
      const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            img.src = img.dataset.src;
            img.classList.remove('lazy');
            imageObserver.unobserve(img);
          }
        });
      });
      
      images.forEach(img => imageObserver.observe(img));
    } else {
      // Fallback for older browsers
      images.forEach(img => {
        img.src = img.dataset.src;
        img.classList.remove('lazy');
      });
    }
  }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize all components
  new ParticleBackground();
  new HeroLogoTracker();
  new FeatureCardTracker();
  new ThemeSwitcher();
  new DownloadInfoToggle();
  new SmoothScroll();
  new ScrollAnimations();
  new PerformanceOptimizer();
  
  // Add loading complete class
  document.body.classList.add('loaded');
});

// Handle page visibility changes to optimize performance
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    // Pause animations when page is not visible
    document.body.classList.add('paused');
  } else {
    // Resume animations when page becomes visible
    document.body.classList.remove('paused');
  }
});

// Error handling
window.addEventListener('error', (e) => {
  console.error('JavaScript error:', e.error);
});

// Unhandled promise rejection handling
window.addEventListener('unhandledrejection', (e) => {
  console.error('Unhandled promise rejection:', e.reason);
});
