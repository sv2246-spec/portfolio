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
const form = document.querySelector(".contact-form");
const contact = document.querySelector(".contact");
const thanks = document.querySelector(".thank-you");
function flyPaperPlane() {
  const sendButton = form.querySelector(".send-button");
  const talkButton = document.querySelector(".nav-contact");
  const menuButton = document.querySelector(".menu-toggle");
  const start = sendButton.getBoundingClientRect();
  const talkRect = talkButton.getBoundingClientRect();
  const target = talkRect.width && talkRect.height ? talkRect : menuButton.getBoundingClientRect();
  const startX = start.left + start.width / 2;
  const startY = start.top + start.height / 2;
  const endX = target.left + target.width / 2;
  const endY = target.top + target.height / 2;
  const plane = document.createElement("span");
  plane.className = "paper-plane-flight";
  plane.setAttribute("aria-hidden", "true");
  plane.innerHTML = '<svg viewBox="0 0 24 24" focusable="false"><path d="M2 21 23 2 16 23l-5-8-9 6Z"/><path d="m11 15 12-13"/></svg>';
  document.body.append(plane);
  const prefersLessMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const loopCenterX = startX + (endX - startX) * .55;
  const loopCenterY = startY + (endY - startY) * .55 - Math.min(90, Math.abs(endY - startY) * .14);
  const loopRadius = 48;
  const keyframes = [
    { left: `${startX}px`, top: `${startY}px`, opacity: 1, transform: "translate(-50%, -50%) rotate(-12deg) scale(.75)", offset: 0 },
    { left: `${loopCenterX + loopRadius}px`, top: `${loopCenterY}px`, opacity: 1, transform: "translate(-50%, -50%) rotate(-12deg) scale(1)", offset: .28 }
  ];
  for (let step = 1; step <= 8; step++) {
    const angle = step * Math.PI / 4;
    const progress = .28 + step * .055;
    keyframes.push({
      left: `${loopCenterX + Math.cos(angle) * loopRadius}px`,
      top: `${loopCenterY + Math.sin(angle) * loopRadius}px`,
      opacity: 1,
      transform: `translate(-50%, -50%) rotate(${-12 + step * 45}deg) scale(1)`,
      offset: progress
    });
  }
  keyframes.push({
    left: `${endX}px`, top: `${endY}px`, opacity: 0,
    transform: "translate(-50%, -50%) rotate(336deg) scale(.55)", offset: 1
  });
  const flight = plane.animate(keyframes, {
    duration: prefersLessMotion ? 120 : 4500,
    easing: "cubic-bezier(.2,.75,.25,1)"
  });
  flight.onfinish = () => plane.remove();
}
form.addEventListener("submit", event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  form.classList.add("sent");
  flyPaperPlane();
  setTimeout(() => {
    contact.classList.add("is-sent");
    thanks.classList.add("is-visible");
    thanks.focus();
  }, 4500);
});
document.querySelector(".thank-back").addEventListener("click", () => {
  contact.classList.remove("is-sent");
  thanks.classList.remove("is-visible");
  form.classList.remove("sent");
  form.reset();
});
