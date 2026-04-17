document.body.classList.add("is-ready");

const menuButton = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
const contactForm = document.querySelector(".contact-form");
const currentPath = window.location.pathname.split("/").pop() || "index.html";

if (menuButton && siteNav) {
  menuButton.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      siteNav.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    });
  });
}

if (siteNav) {
  siteNav.querySelectorAll("a").forEach((link) => {
    const href = link.getAttribute("href");
    if (!href || href.startsWith("#")) {
      return;
    }

    const normalizedHref = href.replace("./", "");
    if (normalizedHref === currentPath) {
      link.setAttribute("aria-current", "page");
    }
  });
}

if (contactForm) {
  contactForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const button = contactForm.querySelector("button");

    if (button) {
      const originalLabel = button.textContent;
      button.textContent = "Thanks, we will be in touch";
      button.disabled = true;

      window.setTimeout(() => {
        button.textContent = originalLabel;
        button.disabled = false;
        contactForm.reset();
      }, 2600);
    }
  });
}

const animatedBlocks = document.querySelectorAll(
  ".hero-copy, .hero-visual, .page-copy-block, .page-visual, .section-heading, .feature-grid, .process-grid, .pricing-grid, .portfolio-preview-grid, .portfolio-grid, .case-study-grid, .info-grid, .timeline-grid, .benefit-grid, .contact-panel, .contact-cta-card, .faq-list, .service-columns, .audience-grid, .support-grid, .site-footer"
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.14 }
);

animatedBlocks.forEach((block) => observer.observe(block));
