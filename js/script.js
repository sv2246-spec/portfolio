const menuToggle = document.querySelector(".menu-toggle");
const siteNav = document.querySelector(".site-nav");
menuToggle.addEventListener("click", () => {
  const open = menuToggle.getAttribute("aria-expanded") === "true";
  menuToggle.setAttribute("aria-expanded", String(!open));
  menuToggle.setAttribute("aria-label", open ? "Open navigation" : "Close navigation");
  siteNav.classList.toggle("is-open", !open);
});
siteNav.addEventListener("click", event => {
  if (event.target.closest("a")) {
    menuToggle.setAttribute("aria-expanded", "false");
    menuToggle.setAttribute("aria-label", "Open navigation");
    siteNav.classList.remove("is-open");
  }
});
document.querySelector("#year").textContent = new Date().getFullYear();
const copyStatus = document.querySelector(".contact-copy-status");
function copyContactValue(value, label) {
  const fallbackCopy = () => {
    const temporaryInput = document.createElement("textarea");
    temporaryInput.value = value;
    temporaryInput.setAttribute("readonly", "");
    temporaryInput.style.position = "fixed";
    temporaryInput.style.opacity = "0";
    document.body.append(temporaryInput);
    temporaryInput.select();
    const copied = document.execCommand("copy");
    temporaryInput.remove();
    return copied;
  };
  const announce = copied => {
    copyStatus.textContent = copied
      ? `${label} copied to clipboard.`
      : `Could not copy ${label.toLowerCase()}. You can select and copy it manually.`;
  };

  if (navigator.clipboard?.writeText) {
    navigator.clipboard.writeText(value).then(
      () => announce(true),
      () => announce(fallbackCopy())
    );
  } else {
    announce(fallbackCopy());
  }
}
document.querySelectorAll(".copy-contact").forEach(link => {
  link.addEventListener("click", () => {
    copyContactValue(link.dataset.copyValue, link.querySelector("span").textContent);
  });
});
const projectTree = document.querySelector(".project-ribbon");
const projectItems = [...projectTree.querySelectorAll(".ribbon-project")];
const treeMotion = matchMedia("(prefers-reduced-motion: reduce)");
if (treeMotion.matches || !("IntersectionObserver" in window)) {
  projectItems.forEach(item => item.classList.add("is-visible"));
} else {
  const projectObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        projectObserver.unobserve(entry.target);
      }
    });
  }, { threshold: .12 });
  projectItems.forEach(item => projectObserver.observe(item));
}
function updateProjectTreeProgress() {
  const treeTop = projectTree.getBoundingClientRect().top;
  const firstNode = projectItems[0].querySelector(".project-node").getBoundingClientRect();
  const lastNode = projectItems.at(-1).querySelector(".project-node").getBoundingClientRect();
  const trackStart = firstNode.top - treeTop + firstNode.height / 2;
  const trackLength = Math.max(1, lastNode.top - firstNode.top + (lastNode.height - firstNode.height) / 2);
  const screenCenter = innerHeight / 2;
  const progress = treeMotion.matches
    ? 1
    : Math.max(0, Math.min(1, (screenCenter - treeTop - trackStart) / trackLength));
  const fillPosition = trackStart + progress * trackLength;
  projectTree.style.setProperty("--tree-track-start", `${trackStart}px`);
  projectTree.style.setProperty("--tree-track-length", `${trackLength}px`);
  projectTree.style.setProperty("--tree-progress", `${progress * 100}%`);
  projectItems.forEach(item => {
    const node = item.querySelector(".project-node");
    const nodeRect = node.getBoundingClientRect();
    const nodeCenter = nodeRect.top - treeTop + nodeRect.height / 2;
    node.classList.toggle("is-reached", fillPosition >= nodeCenter - 1);
  });
}
addEventListener("scroll", updateProjectTreeProgress, {passive:true});
addEventListener("resize", updateProjectTreeProgress);
treeMotion.addEventListener("change", updateProjectTreeProgress);
updateProjectTreeProgress();
const hero = document.querySelector(".intro-banner");
const experience = document.querySelector(".experience");
const motion = matchMedia("(prefers-reduced-motion: reduce)");
function scrollScenes() {
  if (motion.matches) {
    hero.style.removeProperty("--hero-scroll-wipe");
    hero.style.removeProperty("--hero-scroll-opacity");
    hero.style.removeProperty("--hero-text-shift");
    return;
  }
  const range = Math.max(1, hero.offsetHeight * .65);
  const progress = Math.max(0, Math.min(1, (scrollY - hero.offsetTop - 70) / range));
  hero.style.setProperty("--hero-scroll-wipe", `${progress * 100}%`);
  hero.style.setProperty("--hero-scroll-opacity", String(1 - progress));
  hero.style.setProperty("--hero-text-shift", `${40 * progress}px`);
  const expRect = experience.getBoundingClientRect();
  if (expRect.top < innerHeight * .9) experience.classList.add("is-rising");
  else experience.classList.remove("is-rising");
}
addEventListener("scroll", scrollScenes, {passive:true});
addEventListener("resize", scrollScenes);
motion.addEventListener("change", scrollScenes);
scrollScenes();
