/* =========================================================
   main.js (minimal)
   - Mobile nav toggle
   - Dropdown toggle
   - Active page highlighting
   ========================================================= */

   (function () {
    // 1) Mobile nav toggle
    const toggle = document.querySelector("[data-nav-toggle]");
    const menu = document.querySelector("[data-nav-menu]");
  
    if (toggle && menu) {
      toggle.addEventListener("click", () => {
        const open = menu.classList.toggle("open");
        toggle.setAttribute("aria-expanded", String(open));
      });
    }
  
    // 2) Dropdown toggle (click-to-open, mobile friendly)
    document.querySelectorAll(".dropdown-toggle").forEach((btn) => {
      btn.addEventListener("click", (e) => {
        const dropdown = btn.closest(".dropdown");
        if (!dropdown) return;
  
        const expanded = btn.getAttribute("aria-expanded") === "true";
        btn.setAttribute("aria-expanded", String(!expanded));
        dropdown.classList.toggle("open");
        e.stopPropagation();
      });
    });
  
    // Close dropdown when clicking elsewhere
    document.addEventListener("click", (e) => {
      if (e.target.closest(".dropdown")) return;
      document.querySelectorAll(".dropdown.open").forEach((d) => {
        d.classList.remove("open");
        const btn = d.querySelector(".dropdown-toggle");
        if (btn) btn.setAttribute("aria-expanded", "false");
      });
    });
  
    // 3) Active nav highlighting (robust)
    const currentPath = window.location.pathname.replace(/\/+$/, "") || "/";
  
    document.querySelectorAll("nav a[href]").forEach((a) => {
      const rawHref = a.getAttribute("href") || "";
      // Ignore external links
      if (/^https?:\/\//i.test(rawHref)) return;
  
      // Normalize href to a path-like value
      let href = rawHref.replace(/\/+$/, "");
      if (href === "" || href === ".") href = "/";
  
      // Convert relative links like "projects/" into "/projects"
      if (!href.startsWith("/")) href = "/" + href.replace(/^\.\//, "").replace(/\/+$/, "");
  
      // Home match
      const isHome = (currentPath === "/") && (href === "/index.html" || href === "/");
  
      // Exact match OR "current is inside section" match for directory links
      const isExact = currentPath === href;
      const isSection =
        href !== "/" &&
        (currentPath.startsWith(href + "/") || (href.endsWith("/projects") && currentPath.startsWith("/projects/")));
  
      if (isHome || isExact || isSection) {
        a.setAttribute("aria-current", "page");
      }
    });
  })();