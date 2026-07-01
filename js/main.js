document.addEventListener('DOMContentLoaded', () => {
  // 1. Navigation Scroll Effect
  const header = document.querySelector('header');
  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);
  handleScroll(); // Run once in case page loads scrolled

  // 2. Mobile Menu Toggle
  const mobileToggle = document.querySelector('.mobile-toggle');
  const navLinks = document.querySelector('.nav-links');
  if (mobileToggle && navLinks) {
    mobileToggle.addEventListener('click', () => {
      mobileToggle.classList.toggle('open');
      navLinks.classList.toggle('open');
    });

    // Close menu when clicking a link (especially useful on hash links or page navigation)
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', () => {
        mobileToggle.classList.remove('open');
        navLinks.classList.remove('open');
      });
    });
  }

  // 3. Highlight Active Navigation Link
  const currentPath = window.location.pathname;
  const pageName = currentPath.substring(currentPath.lastIndexOf('/') + 1);
  const navItems = document.querySelectorAll('.nav-link');
  
  navItems.forEach(item => {
    const href = item.getAttribute('href');
    if (pageName === href || (pageName === '' && href === 'index.html')) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });

  // 4. Statistics Counter Animation (Only runs if elements exist on About page)
  const statNumbers = document.querySelectorAll('.stat-number');
  if (statNumbers.length > 0) {
    const startCounters = () => {
      statNumbers.forEach(stat => {
        const target = parseInt(stat.getAttribute('data-target'), 10);
        const suffix = stat.getAttribute('data-suffix') || '';
        let count = 0;
        const speed = 2000 / target; // complete in 2 seconds
        
        const updateCount = () => {
          count++;
          stat.innerText = count + suffix;
          if (count < target) {
            setTimeout(updateCount, speed);
          } else {
            stat.innerText = target + suffix;
          }
        };
        updateCount();
      });
    };

    // Intersection Observer to start counters when visible
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          startCounters();
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    const statsSection = document.querySelector('.stats-bar');
    if (statsSection) {
      observer.observe(statsSection);
    }
  }

  // 5. Portfolio Filtering (Only runs on Portfolio page)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  if (filterButtons.length > 0 && portfolioItems.length > 0) {
    filterButtons.forEach(button => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and add to clicked
        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        portfolioItems.forEach(item => {
          const category = item.getAttribute('data-category');
          
          if (filter === 'all' || category === filter) {
            item.style.display = 'flex';
            // Fade-in effect
            setTimeout(() => {
              item.style.opacity = '1';
              item.style.transform = 'scale(1)';
            }, 10);
          } else {
            item.style.opacity = '0';
            item.style.transform = 'scale(0.95)';
            // Hide after transition
            setTimeout(() => {
              item.style.display = 'none';
            }, 300);
          }
        });
      });
    });
  }

  // 6. Contact Form Processing & Validation
  const contactForm = document.getElementById('contactForm');
  const formMessage = document.getElementById('formMessage');
  if (contactForm && formMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      // Clear previous message classes
      formMessage.className = 'form-message';
      formMessage.style.display = '';

      // Get values
      const name = document.getElementById('name').value.trim();
      const email = document.getElementById('email').value.trim();
      const subject = document.getElementById('subject').value.trim();
      const message = document.getElementById('message').value.trim();

      // Simple validation
      if (!name || !email || !subject || !message) {
        formMessage.innerText = 'Please fill out all fields.';
        formMessage.classList.add('error');
        return;
      }

      if (!validateEmail(email)) {
        formMessage.innerText = 'Please enter a valid email address.';
        formMessage.classList.add('error');
        return;
      }

      // Simulation of submission
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      const originalBtnText = submitBtn.innerText;
      submitBtn.innerText = 'Sending...';
      submitBtn.disabled = true;

      setTimeout(() => {
        submitBtn.innerText = originalBtnText;
        submitBtn.disabled = false;
        
        formMessage.innerText = 'Thank you! Your message has been sent successfully.';
        formMessage.classList.add('success');
        contactForm.reset();
      }, 1500);
    });
  }

  // 7. Footer Newsletter Form
  const newsletterForm = document.getElementById('newsletterForm');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const emailValue = emailInput.value.trim();

      if (emailValue && validateEmail(emailValue)) {
        alert('Thank you for subscribing to our newsletter!');
        newsletterForm.reset();
      } else {
        alert('Please enter a valid email address.');
      }
    });
  }

  // Helper validation function
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
});
