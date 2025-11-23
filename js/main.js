document.addEventListener("DOMContentLoaded", () => {
  const navToggle = document.querySelector(".nav-toggle");
  const mainNav = document.querySelector(".main-nav");

  // Mobile nav toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener("click", () => {
      const isOpen = mainNav.classList.toggle("open");
      navToggle.classList.toggle("open", isOpen);
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });
  }

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach((link) => {
    link.addEventListener("click", (e) => {
      const targetId = link.getAttribute("href");
      const targetEl = document.querySelector(targetId);
      if (targetEl) {
        e.preventDefault();
        targetEl.scrollIntoView({ behavior: "smooth", block: "start" });

        // Close mobile nav after click
        if (mainNav && navToggle) {
          mainNav.classList.remove("open");
          navToggle.classList.remove("open");
          navToggle.setAttribute("aria-expanded", "false");
        }
      }
    });
  });

  // "Scroll" button in hero
  const scrollDownBtn = document.querySelector(".scroll-down");
  const aboutSection = document.querySelector("#about");
  if (scrollDownBtn && aboutSection) {
    scrollDownBtn.addEventListener("click", () => {
      aboutSection.scrollIntoView({ behavior: "smooth", block: "start" });
    });
  }

  // Course filters
  const filterButtons = document.querySelectorAll(".filter-btn");
  const courseCards = document.querySelectorAll(".course-card");

  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.dataset.filter;

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      courseCards.forEach((card) => {
        const type = card.dataset.type || "";
        if (filter === "all" || type.includes(filter)) {
          card.style.display = "";
        } else {
          card.style.display = "none";
        }
      });
    });
  });

  // Course expand / collapse
  courseCards.forEach((card) => {
    const toggle = card.querySelector(".course-toggle");
    if (!toggle) return;
    toggle.addEventListener("click", () => {
      card.classList.toggle("open");
    });
  });

  // Stats counting animation
  const statNumbers = document.querySelectorAll(".stat-number");
  const animateStats = () => {
    statNumbers.forEach((el) => {
      const target = parseInt(el.dataset.target || "0", 10);
      if (!target || el.dataset.animated === "true") return;

      let current = 0;
      const increment = Math.max(1, Math.floor(target / 40));

      const step = () => {
        current += increment;
        if (current >= target) {
          current = target;
          el.dataset.animated = "true";
        } else {
          requestAnimationFrame(step);
        }
        el.textContent = current;
      };
      requestAnimationFrame(step);
    });
  };

  // Reveal on scroll using IntersectionObserver
  const revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            if (entry.target.classList.contains("about-highlight")) {
              animateStats();
            }
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    // Fallback: just show all
    revealEls.forEach((el) => el.classList.add("visible"));
    animateStats();
  }

  // Contact form -> mailto
  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const name = document.getElementById("name").value.trim();
      const email = document.getElementById("email").value.trim();
      const message = document.getElementById("message").value.trim();

      const to = "info@eliteprotectiontraining.com";
      const subject = encodeURIComponent(`Training enquiry from ${name || "website visitor"}`);
      const bodyLines = [
        `Name: ${name}`,
        `Email: ${email}`,
        "",
        "Message:",
        message,
      ];
      const body = encodeURIComponent(bodyLines.join("\n"));

      window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
    });
  }

  // Current year
  const yearSpan = document.getElementById("year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});
