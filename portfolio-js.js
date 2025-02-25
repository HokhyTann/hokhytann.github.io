// Theme Toggle Functionality
const themeToggle = document.getElementById('theme-toggle');
const themeIcon = themeToggle.querySelector('i');
const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');

// Check for saved theme preference or use OS preference
if (localStorage.getItem('theme') === 'dark' || (!localStorage.getItem('theme') && prefersDarkScheme.matches)) {
  document.body.setAttribute('data-theme', 'dark');
  themeIcon.classList.replace('fa-moon', 'fa-sun');
} else {
  document.body.removeAttribute('data-theme');
  themeIcon.classList.replace('fa-sun', 'fa-moon');
}

// Toggle theme when button is clicked
themeToggle.addEventListener('click', () => {
  if (document.body.getAttribute('data-theme') === 'dark') {
    document.body.removeAttribute('data-theme');
    localStorage.setItem('theme', 'light');
    themeIcon.classList.replace('fa-sun', 'fa-moon');
  } else {
    document.body.setAttribute('data-theme', 'dark');
    localStorage.setItem('theme', 'dark');
    themeIcon.classList.replace('fa-moon', 'fa-sun');
  }
});

// Mobile Navigation
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');
const navLinksItems = document.querySelectorAll('.nav-links li');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  
  // Animate hamburger
  const spans = hamburger.querySelectorAll('span');
  spans[0].classList.toggle('active');
  spans[1].classList.toggle('active');
  spans[2].classList.toggle('active');
  
  if (navLinks.classList.contains('active')) {
    // Stagger the animation of nav items
    navLinksItems.forEach((link, index) => {
      setTimeout(() => {
        link.style.opacity = '1';
        link.style.transform = 'translateY(0)';
      }, 100 * index);
    });
  } else {
    navLinksItems.forEach(link => {
      link.style.opacity = '0';
      link.style.transform = 'translateY(20px)';
    });
  }
});

// Close mobile menu when clicking on a nav link
navLinksItems.forEach(item => {
  item.addEventListener('click', () => {
    if (navLinks.classList.contains('active')) {
      navLinks.classList.remove('active');
      
      const spans = hamburger.querySelectorAll('span');
      spans[0].classList.remove('active');
      spans[1].classList.remove('active');
      spans[2].classList.remove('active');
      
      navLinksItems.forEach(link => {
        link.style.opacity = '0';
        link.style.transform = 'translateY(20px)';
      });
    }
  });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      const headerOffset = 80;
      const elementPosition = targetElement.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;
      
      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  });
});

// Contact Form Handling
const contactForm = document.getElementById('contactForm');

if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form values
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const message = document.getElementById('message').value;
    
    // Here you would typically send this data to a server
    // For now, let's just show a success message
    
    // Create success message
    const successMessage = document.createElement('div');
    successMessage.classList.add('form-success');
    successMessage.innerHTML = `
      <i class="fas fa-check-circle"></i>
      <p>Thanks for your message, ${name}! I'll get back to you soon.</p>
    `;
    
    // Replace form with success message
    contactForm.innerHTML = '';
    contactForm.appendChild(successMessage);
    
    // Style the success message
    successMessage.style.textAlign = 'center';
    successMessage.style.padding = '2rem';
    successMessage.querySelector('i').style.fontSize = '3rem';
    successMessage.querySelector('i').style.color = 'var(--success-color)';
    successMessage.querySelector('p').style.marginTop = '1rem';
  });
}

// Scroll Animation - Elements fade in when scrolled into view
const fadeElements = document.querySelectorAll('.timeline-item, .skill-category, .education-card');

// Create the observer
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, {
  threshold: 0.1
});

// Observe each element
fadeElements.forEach(element => {
  element.style.opacity = '0';
  element.style.transform = 'translateY(20px)';
  element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(element);
});

// Add CSS class for fade-in animation
document.head.insertAdjacentHTML('beforeend', `
  <style>
    .fade-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
    
    .hamburger span.active:nth-child(1) {
      transform: rotate(45deg) translate(5px, 5px);
    }
    
    .hamburger span.active:nth-child(2) {
      opacity: 0;
    }
    
    .hamburger span.active:nth-child(3) {
      transform: rotate(-45deg) translate(7px, -6px);
    }
    
    .form-success {
      animation: success-pulse 2s infinite;
    }
    
    @keyframes success-pulse {
      0% { transform: scale(1); }
      50% { transform: scale(1.05); }
      100% { transform: scale(1); }
    }
  </style>
`);

// Typewriter effect for hero text
const heroHeading = document.querySelector('.hero h1');
const originalHeadingText = heroHeading.innerHTML;
const highlightSpan = heroHeading.querySelector('.highlight');
const highlightText = highlightSpan.textContent;

window.addEventListener('load', () => {
  // Only run the animation if this is the first visit to the page in this session
  if (!sessionStorage.getItem('visited')) {
    // Set the flag for subsequent visits
    sessionStorage.setItem('visited', 'true');
    
    // Prepare for animation
    heroHeading.innerHTML = 'Hello, I\'m <span class="highlight"></span>';
    const animatedHighlight = heroHeading.querySelector('.highlight');
    let i = 0;
    
    // Typing effect
    const typeWriter = () => {
      if (i < highlightText.length) {
        animatedHighlight.textContent += highlightText.charAt(i);
        i++;
        setTimeout(typeWriter, 100);
      } else {
        // Add a blinking cursor at the end for a short time
        animatedHighlight.classList.add('typing-cursor');
        setTimeout(() => {
          animatedHighlight.classList.remove('typing-cursor');
        }, 1500);
      }
    };
    
    // Add typing cursor style
    document.head.insertAdjacentHTML('beforeend', `
      <style>
        .typing-cursor::after {
          content: '|';
          animation: cursor-blink 0.7s infinite;
        }
        
        @keyframes cursor-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      </style>
    `);
    
    // Start typing after a short delay
    setTimeout(typeWriter, 500);
  }
});
