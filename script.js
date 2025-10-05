document.addEventListener("DOMContentLoaded", function () {
  // --- Smooth scrolling for navigation links ---
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    });
  });

  // --- Navbar scroll effect ---
  const navbar = document.getElementById("navbar");
  if (navbar) {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 100) {
        navbar.classList.add("scrolled");
      } else {
        navbar.classList.remove("scrolled");
      }
    });
  }

  // --- Mobile menu toggle ---
  const mobileMenuBtn = document.querySelector(".mobile-menu-btn");
  const navLinks = document.querySelector(".nav-links");
  if (mobileMenuBtn && navLinks) {
    mobileMenuBtn.addEventListener("click", function () {
      navLinks.classList.toggle("active");
    });
  }

  // --- Close mobile menu when clicking a link ---
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (navLinks.classList.contains("active")) {
        navLinks.classList.remove("active");
      }
    });
  });

  // --- Intersection Observer for fade-in animations ---
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const fadeInObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        observer.unobserve(entry.target); // Stop observing after animation
      }
    });
  }, observerOptions);

  document.querySelectorAll(".fade-in").forEach((el) => {
    fadeInObserver.observe(el);
  });

  // --- Animate stat counters when visible ---
  const animateCounters = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const counters = entry.target.querySelectorAll(
          '.stat-number[data-animate="true"]'
        );
        counters.forEach((counter) => {
          const target = parseFloat(counter.textContent.replace("+", ""));
          if (isNaN(target)) return;

          let current = 0;
          const increment = target / 100;

          const updateCounter = () => {
            if (current < target) {
              current += increment;
              counter.textContent =
                Math.ceil(current) +
                (counter.textContent.includes("+") ? "+" : "");
              requestAnimationFrame(updateCounter);
            } else {
              counter.textContent =
                target + (counter.textContent.includes("+") ? "+" : "");
            }
          };
          updateCounter();
        });
        observer.unobserve(entry.target); // Animate only once
      }
    });
  };

  const statsObserver = new IntersectionObserver(animateCounters, {
    threshold: 0.5,
  });
  const aboutSection = document.querySelector("#about");
  if (aboutSection) {
    statsObserver.observe(aboutSection);
  }

  // --- Animate proficiency bars when visible ---
  const animateProficiencyBars = (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const level = entry.target.dataset.level;
        if (level) {
          entry.target.style.width = level + "%";
        }
        observer.unobserve(entry.target);
      }
    });
  };

  const proficiencyObserver = new IntersectionObserver(animateProficiencyBars, {
    threshold: 0.8,
  });
  document.querySelectorAll(".proficiency-fill").forEach((bar) => {
    proficiencyObserver.observe(bar);
  });

  // --- Particle animation ---
  function createParticles() {
    const particlesContainer = document.querySelector(".particles");
    if (!particlesContainer) return;
    const particleCount = 40;

    for (let i = 0; i < particleCount; i++) {
      const particle = document.createElement("div");
      particle.className = "particle";
      particle.style.left = `${Math.random() * 100}%`;
      const size = Math.random() * 5 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.animationDelay = `${Math.random() * 15}s`;
      particle.style.animationDuration = `${Math.random() * 10 + 10}s`;
      // Add a random horizontal end position for more variety
      particle.style.setProperty("--x-end", `${Math.random() * 200 - 100}px`);
      particlesContainer.appendChild(particle);
    }
  }
  createParticles();
});
