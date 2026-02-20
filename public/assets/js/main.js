/* =========================================================
   main.js (minimal)
   - Mobile nav toggle
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

  // 2) Active nav highlighting
  const path = window.location.pathname.replace(/\/+$/, "");
  const links = document.querySelectorAll("nav a[href]");

  links.forEach((a) => {
    const href = (a.getAttribute("href") || "").replace(/\/+$/, "").replace("./", "");
    const isHome = (path === "" || path === "/") && href.endsWith("index.html");
    if (isHome || path.endsWith(href)) a.setAttribute("aria-current", "page");
  });
})();
