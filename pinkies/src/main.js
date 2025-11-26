import './style.css'

// Theme Toggle
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;
const icon = themeToggle.querySelector('i');

// Check for saved theme preference
const savedTheme = localStorage.getItem('theme');
if (savedTheme) {
  body.setAttribute('data-theme', savedTheme);
  updateIcon(savedTheme);
}

themeToggle.addEventListener('click', () => {
  const currentTheme = body.getAttribute('data-theme');
  const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

  body.setAttribute('data-theme', newTheme);
  localStorage.setItem('theme', newTheme);
  updateIcon(newTheme);
});

function updateIcon(theme) {
  if (theme === 'dark') {
    icon.classList.remove('fa-moon');
    icon.classList.add('fa-sun');
  } else {
    icon.classList.remove('fa-sun');
    icon.classList.add('fa-moon');
  }
}

// Custom Cursor
const cursor = document.querySelector('.cloud-cursor');

document.addEventListener('mousemove', (e) => {
  cursor.style.left = e.clientX + 'px';
  cursor.style.top = e.clientY + 'px';
});

document.addEventListener('mousedown', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(0.8)';
});

document.addEventListener('mouseup', () => {
  cursor.style.transform = 'translate(-50%, -50%) scale(1)';
});

// Parallax Effect on Mouse Move
const clouds = document.querySelectorAll('.cloud');
const eagle = document.querySelector('.eagle');

document.addEventListener('mousemove', (e) => {
  const x = (window.innerWidth - e.pageX * 2) / 100;
  const y = (window.innerHeight - e.pageY * 2) / 100;

  clouds.forEach((cloud, index) => {
    const speed = (index + 1) * 0.5;
    const xOffset = x * speed;
    const yOffset = y * speed;
    // We need to maintain the original animation transform if possible, 
    // but CSS animation overrides inline styles unless we use a wrapper or composition.
    // For simplicity, we'll just apply a slight transform to the container or use CSS variables.
    // Better approach: Update CSS variables.
    cloud.style.transform = `translate(${xOffset}px, ${yOffset}px)`;
    // Note: This might conflict with the CSS animation 'drift'. 
    // To fix, we should wrap clouds in a div that animates, and apply parallax to the inner img.
    // Or just skip mouse parallax for clouds if they are already drifting.
    // Let's skip mouse parallax for drifting clouds to avoid conflict/glitch.
  });

  // Apply parallax to eagle (it also has animation, so same issue).
  // Let's apply parallax to the background container instead?
  // Or just leave the CSS animations as they are "smooth parallax" enough.
});

// Intersection Observer for Scroll Animations
const observerOptions = {
  threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      // Add animation classes if needed
      if (entry.target.classList.contains('glass-card')) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    }
  });
}, observerOptions);

document.querySelectorAll('.section, .glass-card, .neumorphic-card').forEach(el => {
  // el.style.opacity = '0';
  // el.style.transform = 'translateY(20px)';
  // el.style.transition = 'all 0.6s ease-out';
  observer.observe(el);
});
