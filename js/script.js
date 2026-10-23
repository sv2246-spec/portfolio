const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");

menuToggle.addEventListener("click", () => {
  const isOpen = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!isOpen));
  menuToggle.setAttribute("aria-label", isOpen ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !isOpen);
});

siteNav.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});

document.querySelector("#year").textContent = new Date().getFullYear();

document.querySelectorAll(".project-art-button").forEach((button) => {
  button.addEventListener("click", () => {
    const wasExpanded = button.getAttribute("aria-expanded") === "true";
    const details = document.getElementById(button.getAttribute("aria-controls"));

    document.querySelectorAll(".project-art-button").forEach((otherButton) => {
      otherButton.setAttribute("aria-expanded", "false");
      document.getElementById(otherButton.getAttribute("aria-controls")).hidden = true;
    });

    if (!wasExpanded) {
      button.setAttribute("aria-expanded", "true");
      details.hidden = false;
    }
  });
});
