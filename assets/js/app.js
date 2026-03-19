const topbar = document.querySelector(".topbar");
const navToggle = document.querySelector(".nav-toggle");
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
const revealNodes = Array.from(document.querySelectorAll("[data-reveal]"));
const yearNode = document.querySelector("#year");
const reduceMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

if (yearNode) {
  yearNode.textContent = String(new Date().getFullYear());
}

if (navToggle && topbar) {
  navToggle.addEventListener("click", () => {
    const isOpen = topbar.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      topbar.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    });
  });

  window.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      topbar.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

if (!reduceMotionQuery.matches) {
  const root = document.documentElement;
  let targetX = 72;
  let targetY = 20;
  let currentX = targetX;
  let currentY = targetY;

  window.addEventListener(
    "pointermove",
    (event) => {
      targetX = (event.clientX / window.innerWidth) * 100;
      targetY = (event.clientY / window.innerHeight) * 100;
    },
    { passive: true }
  );

  const animateGradient = () => {
    currentX += (targetX - currentX) * 0.06;
    currentY += (targetY - currentY) * 0.06;
    root.style.setProperty("--pointer-x", `${currentX.toFixed(2)}%`);
    root.style.setProperty("--pointer-y", `${currentY.toFixed(2)}%`);
    window.requestAnimationFrame(animateGradient);
  };

  window.requestAnimationFrame(animateGradient);
}

if (revealNodes.length > 0 && !reduceMotionQuery.matches) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -10% 0px"
    }
  );

  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

if (navLinks.length > 0) {
  const sectionMap = navLinks
    .map((link) => {
      const id = link.getAttribute("href");
      if (!id || !id.startsWith("#")) {
        return null;
      }

      const section = document.querySelector(id);
      if (!section) {
        return null;
      }

      return { link, section };
    })
    .filter(Boolean);

  const setActiveNav = () => {
    const marker = window.scrollY + window.innerHeight * 0.24;

    sectionMap.forEach(({ link, section }) => {
      const start = section.offsetTop;
      const end = start + section.offsetHeight;
      const active = marker >= start && marker < end;
      link.classList.toggle("is-active", active);
    });
  };

  setActiveNav();
  window.addEventListener("scroll", setActiveNav, { passive: true });
  window.addEventListener("resize", setActiveNav);
}
