    // Initialize AOS
    AOS.init({ once: true, duration: 800 });
    
    // Preloader fade-out & Dark Mode Persistence
    window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      preloader.style.opacity = '0';
      setTimeout(() => preloader.style.display = 'none', 500);
      
      // Enable dark mode if previously set
      if (localStorage.getItem('darkMode') === 'enabled') {
        document.body.classList.add('dark-mode');
        document.getElementById('darkModeToggle').querySelector('i').classList.replace('fa-moon', 'fa-sun');
      }
    });
    
    // Dark Mode Toggle with Persistence
    const darkModeToggle = document.getElementById('darkModeToggle');
    darkModeToggle.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      const icon = darkModeToggle.querySelector('i');
      if (document.body.classList.contains('dark-mode')) {
        icon.classList.replace('fa-moon', 'fa-sun');
        localStorage.setItem('darkMode', 'enabled');
      } else {
        icon.classList.replace('fa-sun', 'fa-moon');
        localStorage.setItem('darkMode', 'disabled');
      }
    });
    
    // Back-to-Top Button
    const backToTop = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      backToTop.style.display = window.pageYOffset > 300 ? 'flex' : 'none';
    });
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
    
    // Canvas Particle Animation
    const canvas = document.getElementById('heroCanvas');
    const ctx = canvas.getContext('2d');
    function setCanvasSize() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    const particles = [];
    const particleCount = 150;
    class Particle {
      constructor(x, y, radius, color, speedX, speedY) {
        this.x = x; this.y = y; this.radius = radius;
        this.color = color; this.speedX = speedX; this.speedY = speedY;
      }
      draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.fill();
      }
      update() {
        this.x += this.speedX;
        this.y += this.speedY;
        if (this.x < 0 || this.x > canvas.width) this.speedX *= -1;
        if (this.y < 0 || this.y > canvas.height) this.speedY *= -1;
        this.draw();
      }
    }
    function initParticles() {
      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        const x = Math.random() * canvas.width;
        const y = Math.random() * canvas.height;
        const speedX = (Math.random() - 0.5) * 1.5;
        const speedY = (Math.random() - 0.5) * 1.5;
        const color = 'rgba(255, 255, 255, 0.7)';
        particles.push(new Particle(x, y, radius, color, speedX, speedY));
      }
    }
    initParticles();
    function animateParticles() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach(p => p.update());
      requestAnimationFrame(animateParticles);
    }
    animateParticles();
    
    // Typed Text Effect
    const typedTextElement = document.querySelector('.typed-text');
    const typedPhrases = [
      "Professional. Creative. Passionate.",
      "Innovator in [Your Field].",
      "Always learning, always evolving."
    ];
    let typIndex = 0, charIndex = 0, currentPhrase = "", isDeleting = false;
    function type() {
      if (typIndex < typedPhrases.length) {
        if (!isDeleting && charIndex <= typedPhrases[typIndex].length) {
          currentPhrase = typedPhrases[typIndex].substring(0, charIndex++);
          typedTextElement.textContent = currentPhrase;
          setTimeout(type, 150);
        } else if (isDeleting && charIndex >= 0) {
          currentPhrase = typedPhrases[typIndex].substring(0, charIndex--);
          typedTextElement.textContent = currentPhrase;
          setTimeout(type, 100);
        }
        if (charIndex === typedPhrases[typIndex].length) {
          isDeleting = true;
          setTimeout(type, 1000);
        }
        if (isDeleting && charIndex === 0) {
          isDeleting = false;
          typIndex = (typIndex + 1) % typedPhrases.length;
          setTimeout(type, 500);
        }
      }
    }
    type();
    
    // GSAP Animations with ScrollTrigger for Enhanced Entrance Effects
    window.addEventListener("DOMContentLoaded", () => {
      gsap.registerPlugin(ScrollTrigger);
      gsap.from(".hero-content h1", { duration: 1.5, opacity: 0, y: -50, ease: "bounce.out" });
      gsap.from(".hero-content .typed-text", { duration: 1.5, opacity: 0, y: 50, delay: 0.5 });
    });
    
    // Filter Projects Functionality
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectItems = document.querySelectorAll('.project-item');
    filterBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Remove active class from all buttons
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filterValue = btn.getAttribute('data-filter');
        projectItems.forEach(item => {
          const category = item.getAttribute('data-category');
          item.style.display = (filterValue === 'all' || category === filterValue) ? 'block' : 'none';
        });
      });
    });
  </script>
  
  <!-- Service Worker Registration for PWA (Optional) -->
  <script defer>
    if ('serviceWorker' in navigator) {
      window.addEventListener('load', () => {
        navigator.serviceWorker.register('sw.js')
          .then(registration => {
            console.log('Service Worker registered with scope:', registration.scope);
          })
          .catch(err => {
            console.error('Service Worker registration failed:', err);
          });
      });
    }
