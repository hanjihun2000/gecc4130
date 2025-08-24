// Smooth scrolling for navigation links
document.addEventListener("DOMContentLoaded", function () {
  // Sidebar functionality
  const sidebar = document.getElementById("sidebar");
  const sidebarToggleFixed = document.getElementById("sidebar-toggle-fixed");
  const sidebarClose = document.querySelector(".sidebar-close");
  const sidebarLinks = document.querySelectorAll(".sidebar-link");

  // Create overlay
  const overlay = document.createElement("div");
  overlay.className = "sidebar-overlay";
  document.body.appendChild(overlay);

  function openSidebar() {
    sidebar.classList.add("open");
    overlay.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function closeSidebar() {
    sidebar.classList.remove("open");
    overlay.classList.remove("active");
    document.body.style.overflow = "";
  }

  // Event listeners for sidebar
  sidebarToggleFixed.addEventListener("click", openSidebar);
  sidebarClose.addEventListener("click", closeSidebar);
  overlay.addEventListener("click", closeSidebar);

  // Close sidebar when pressing Escape
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape" && sidebar.classList.contains("open")) {
      closeSidebar();
    }
  });

  // Sidebar navigation with smooth scrolling
  sidebarLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      closeSidebar();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add click event listeners to navigation links
  const navLinks = document.querySelectorAll(".nav-links a");

  navLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetSection = document.querySelector(targetId);

      if (targetSection) {
        const headerHeight = document.querySelector("header").offsetHeight;
        const targetPosition = targetSection.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });

  // Add active state to navigation based on scroll position
  function updateActiveNav() {
    const sections = document.querySelectorAll("section[id]");
    const navLinks = document.querySelectorAll(".nav-links a");
    const sidebarLinks = document.querySelectorAll(".sidebar-link");

    let current = "";

    sections.forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;
      if (window.scrollY >= sectionTop - 200) {
        current = section.getAttribute("id");
      }
    });

    // Update main nav
    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });

    // Update sidebar nav
    sidebarLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active");
      }
    });
  }

  // Update active navigation on scroll
  window.addEventListener("scroll", updateActiveNav);

  // Animate statistics counter on scroll
  function animateCounters() {
    const counters = document.querySelectorAll(".stat-number");

    counters.forEach((counter) => {
      const target = counter.textContent;
      const isVisible = isInViewport(counter);

      if (isVisible && !counter.classList.contains("animated")) {
        counter.classList.add("animated");

        // Extract numeric value considering billions
        let targetValue;
        if (target.includes("B")) {
          // Handle billions (e.g., "HK$2.9B" -> 2900)
          const numericPart = parseFloat(target.replace(/[^\d.]/g, ""));
          targetValue = numericPart * 1000; // Convert to millions for easier animation
        } else {
          targetValue = parseInt(target.replace(/[^\d]/g, ""));
        }

        animateValue(counter, 0, targetValue, 2000, target);
      }
    });
  }

  function animateValue(element, start, end, duration, originalText) {
    let current = start;
    const increment = end > start ? (end - start) / (duration / 16) : 0;
    const timer = setInterval(() => {
      current += increment;
      if (current >= end) {
        current = end;
        clearInterval(timer);
      }

      // Format the number based on original text
      let formattedValue;
      if (originalText.includes("HK$") && originalText.includes("B")) {
        // Handle billions (current is in millions, so divide by 1000 to get billions)
        formattedValue = "HK$" + (current / 1000).toFixed(1) + "B";
      } else if (originalText.includes("HK$")) {
        formattedValue = "HK$" + (current / 1000).toFixed(1) + "B";
      } else if (current >= 1000) {
        formattedValue = Math.floor(current).toLocaleString();
      } else {
        formattedValue = Math.floor(current).toString();
      }

      element.textContent = formattedValue;
    }, 16);
  }

  function isInViewport(element) {
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <=
        (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  }

  // Run counter animation on scroll
  window.addEventListener("scroll", animateCounters);

  // Run once on load
  animateCounters();

  // Add fade-in animation for cards when they come into view
  function fadeInCards() {
    const cards = document.querySelectorAll(
      ".overview-card, .story-card, .prevention-card"
    );

    cards.forEach((card) => {
      if (isInViewport(card) && !card.classList.contains("fade-in")) {
        card.classList.add("fade-in");
      }
    });
  }

  window.addEventListener("scroll", fadeInCards);
  fadeInCards(); // Run once on load

  // Add click tracking for Google Analytics (when implemented)
  function trackEvent(action, category = "User Interaction") {
    if (typeof gtag !== "undefined") {
      gtag("event", action, {
        event_category: category,
      });
    }
  }

  // Track navigation clicks
  navLinks.forEach((link) => {
    link.addEventListener("click", function () {
      const section = this.getAttribute("href").replace("#", "");
      trackEvent("navigation_click", "Navigation");
    });
  });

  // Track CTA button clicks
  const ctaButton = document.querySelector(".cta-button");
  if (ctaButton) {
    ctaButton.addEventListener("click", function () {
      trackEvent("cta_click", "Engagement");
    });
  }

  // Track external link clicks
  const externalLinks = document.querySelectorAll(
    'a[href^="http"], a[href^="tel:"]'
  );
  externalLinks.forEach((link) => {
    link.addEventListener("click", function () {
      trackEvent("external_link_click", "Outbound");
    });
  });

  // Mobile menu functionality (if needed in future)
  function createMobileMenu() {
    const nav = document.querySelector("nav");
    const navLinks = document.querySelector(".nav-links");

    // Remove existing mobile menu button if exists
    const existingBtn = document.querySelector(".mobile-menu-btn");
    if (existingBtn) {
      existingBtn.remove();
    }

    // Only create mobile menu if screen is small
    if (window.innerWidth <= 768) {
      const mobileMenuBtn = document.createElement("button");
      mobileMenuBtn.classList.add("mobile-menu-btn");
      mobileMenuBtn.innerHTML = "☰";

      nav.appendChild(mobileMenuBtn);

      mobileMenuBtn.addEventListener("click", function () {
        navLinks.classList.toggle("mobile-open");
      });

      // Close mobile menu when clicking on a link
      const mobileNavLinks = navLinks.querySelectorAll("a");
      mobileNavLinks.forEach((link) => {
        link.addEventListener("click", function () {
          navLinks.classList.remove("mobile-open");
        });
      });
    } else {
      // Remove mobile-open class if screen is large
      navLinks.classList.remove("mobile-open");
    }
  }

  // Initialize mobile menu
  createMobileMenu();
  window.addEventListener("resize", createMobileMenu);

  // Add loading animation
  document.body.classList.add("loaded");
});

// Add CSS for fade-in animation
const style = document.createElement("style");
style.textContent = `
    .fade-in {
        animation: fadeInUp 0.6s ease-out;
    }
    
    .nav-links a.active {
        color: #dc2626;
        font-weight: 600;
    }
    
    body.loaded {
        opacity: 1;
    }
    
    body {
        opacity: 0;
        transition: opacity 0.3s ease;
    }
    
    @media (max-width: 768px) {
        .mobile-menu-btn {
            background: none;
            border: none;
            font-size: 1.5rem;
            cursor: pointer;
            color: #374151;
            padding: 0.5rem;
            margin-left: auto;
        }
        
        .nav-links {
            display: none;
        }
        
        .nav-links.mobile-open {
            display: flex;
            flex-direction: column;
            position: absolute;
            top: 100%;
            left: 0;
            right: 0;
            background: white;
            box-shadow: 0 4px 15px rgba(0,0,0,0.1);
            padding: 1rem;
            gap: 1rem;
            z-index: 1000;
        }
        
        .nav-links.mobile-open a {
            padding: 0.5rem 0;
            border-bottom: 1px solid #e5e7eb;
        }
        
        .nav-links.mobile-open a:last-child {
            border-bottom: none;
        }
    }
`;
document.head.appendChild(style);

// Lightbox functionality for research charts
function openLightbox(imageSrc, caption) {
  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");

  lightboxImage.src = imageSrc;
  lightboxImage.alt = caption;
  lightboxCaption.textContent = caption;

  lightbox.style.display = "block";
  document.body.style.overflow = "hidden"; // Prevent background scrolling

  // Track lightbox opens for analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "lightbox_open", {
      event_category: "Image Interaction",
      image_name: imageSrc.split("/").pop(),
    });
  }
}

function closeLightbox() {
  const lightbox = document.getElementById("lightbox");
  lightbox.style.display = "none";
  document.body.style.overflow = "auto"; // Restore background scrolling

  // Track lightbox closes for analytics
  if (typeof gtag !== "undefined") {
    gtag("event", "lightbox_close", {
      event_category: "Image Interaction",
    });
  }
}

// Close lightbox on escape key
document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeLightbox();
  }
});

// Prevent lightbox from closing when clicking on the image itself
document.addEventListener("DOMContentLoaded", function () {
  const lightboxImage = document.getElementById("lightbox-image");
  if (lightboxImage) {
    lightboxImage.addEventListener("click", function (event) {
      event.stopPropagation();
    });
  }
});
