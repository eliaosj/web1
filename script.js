(() => {
  const nav = document.getElementById("siteNav");
  const navToggle = document.getElementById("navToggle");
  const toTop = document.getElementById("toTop");
  const year = document.getElementById("year");
  const dropdownToggles = document.querySelectorAll(".dropdown-toggle");
  const navLinks = document.querySelectorAll('.nav-link[href^="#"], .dropdown-link[href^="#"]');

  // Footer year
  year.textContent = String(new Date().getFullYear());

  // Mobile nav toggle
  navToggle.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  // Close mobile nav on link click
  navLinks.forEach(a => {
    a.addEventListener("click", () => {
      if (nav.classList.contains("open")) {
        nav.classList.remove("open");
        navToggle.setAttribute("aria-expanded", "false");
      }
      // Also close any open dropdowns
      document.querySelectorAll(".has-dropdown").forEach(li => {
        li.dataset.open = "false";
        const btn = li.querySelector(".dropdown-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    });
  });

  // Dropdown behavior (click to toggle)
  dropdownToggles.forEach(btn => {
    btn.addEventListener("click", (e) => {
      const li = e.currentTarget.closest(".has-dropdown");
      const isOpen = li.dataset.open === "true";

      // close others
      document.querySelectorAll(".has-dropdown").forEach(other => {
        other.dataset.open = "false";
        const otherBtn = other.querySelector(".dropdown-toggle");
        if (otherBtn) otherBtn.setAttribute("aria-expanded", "false");
      });

      li.dataset.open = String(!isOpen);
      btn.setAttribute("aria-expanded", String(!isOpen));
    });
  });

  // Close dropdown when clicking outside
  document.addEventListener("click", (e) => {
    const inDropdown = e.target.closest(".has-dropdown");
    if (!inDropdown) {
      document.querySelectorAll(".has-dropdown").forEach(li => {
        li.dataset.open = "false";
        const btn = li.querySelector(".dropdown-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    }
  });

  // Back-to-top
  const onScroll = () => {
    const y = window.scrollY || document.documentElement.scrollTop;
    toTop.classList.toggle("show", y > 700);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  toTop.addEventListener("click", () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  });

  // Active section highlighting
  const sections = [
    "solutions","services","products","industries","about","contact",
    "industry-automotive","industry-defense","industry-factory","industry-industrial","industry-medical","industry-energy"
  ]
    .map(id => document.getElementById(id))
    .filter(Boolean);

  const linkMap = new Map();
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    const hash = a.getAttribute("href");
    linkMap.set(hash, (linkMap.get(hash) || []).concat(a));
  });

  const setActive = (id) => {
    document.querySelectorAll(".nav-link.active, .dropdown-link.active").forEach(el => el.classList.remove("active"));
    const hash = `#${id}`;
    const links = linkMap.get(hash) || [];
    links.forEach(a => a.classList.add("active"));
  };

  const observer = new IntersectionObserver((entries) => {
    // pick the most visible intersecting section
    const visible = entries
      .filter(e => e.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible?.target?.id) setActive(visible.target.id);
  }, {
    root: null,
    threshold: [0.18, 0.28, 0.4, 0.55],
    rootMargin: "-15% 0px -70% 0px"
  });

  sections.forEach(sec => observer.observe(sec));

  // Contact form: client-side validation + mailto draft
  const form = document.getElementById("contactForm");
  const note = document.getElementById("formNote");

  const isEmail = (s) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(s).trim());

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    note.className = "form-note subtle";
    note.textContent = "";

    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const topic = document.getElementById("topic").value.trim();
    const message = document.getElementById("message").value.trim();

    if (!name || !email || !topic || !message) {
      note.classList.add("err");
      note.textContent = "Please complete all fields.";
      return;
    }
    if (!isEmail(email)) {
      note.classList.add("err");
      note.textContent = "Please enter a valid email address.";
      return;
    }

    // Create a mailto draft (replace the address when you have it)
    const to = "contact@edgesaisystems.com";
    const subject = encodeURIComponent(`[EAS] ${topic} — ${name}`);
    const body = encodeURIComponent(
      `Name: ${name}\nEmail: ${email}\nTopic: ${topic}\n\nMessage:\n${message}\n`
    );

    note.classList.add("ok");
    note.textContent = "Opening your email client with a draft message…";

    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  });
})();
