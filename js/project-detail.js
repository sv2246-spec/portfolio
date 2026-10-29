const projects = {
  bloomino: {
    title: "Bloomino",
    category: "DESIGN",
    summary: "A people-centered design project. Project details coming soon.",
    subsections: [
      { title: "Project overview", description: "A people-centered design project. Project details coming soon." }
    ]
  },
  "pid-lab": {
    title: "PID Lab research",
    category: "RESEARCH",
    summary: "Research with the People Interfaces and Data Lab. Project details coming soon.",
    subsections: [
      { title: "Research overview", description: "Research with the People Interfaces and Data Lab. Project details coming soon." }
    ]
  },
  cad: {
    title: "CAD models and Drawings",
    category: "CAD",
    summary: "Models and technical drawings. Project details coming soon.",
    subsections: [
      { title: "Models", description: "Models and technical drawings. Project details coming soon." }
    ]
  },
  prosthetics: {
    title: "Prosthetics Projects",
    category: "PROSTHETICS",
    summary: "A collection of prosthetics and assistive-device projects.",
    subsections: [
      { title: "Plaster Casting Workshop", description: "Details for this project are coming soon." },
      { title: "Below-Knee Prosthetic", description: "Details for this project are coming soon." },
      { title: "Helping Hands Initiative Assistive Toys Project", description: "Details for this project are coming soon." },
      { title: "E-nable", description: "Details for this project are coming soon." }
    ]
  },
  python: {
    title: "Python Projects",
    category: "PYTHON",
    summary: "A collection of small projects built while learning Python.",
    subsections: [
      { title: "Calculator", description: "Details for this project are coming soon." },
      { title: "Tic tac toe game", description: "Details for this project are coming soon." },
      { title: "Weather forecast", description: "Details for this project are coming soon." },
      { title: "Grocery list", description: "Details for this project are coming soon." }
    ]
  },
  "pods-bmd": {
    title: "pods.BMD",
    category: "BIOMED",
    summary: "Biomedical design project. Project details coming soon.",
    subsections: [
      { title: "Project overview", description: "Biomedical design project. Project details coming soon." }
    ]
  },
  machining: {
    title: "Machining Projects",
    category: "MACHINING",
    summary: "A collection of machining projects.",
    subsections: [
      { title: "Hammer", description: "Details for this project are coming soon." },
      { title: "Plumb Bob", description: "Details for this project are coming soon." }
    ]
  }
};

const project = projects[new URLSearchParams(location.search).get("project")];
const title = document.querySelector("#project-title");
const category = document.querySelector("#project-category");
const summary = document.querySelector("#project-summary");
const sections = document.querySelector("#project-sections");

if (!project) {
  document.title = "Project not found — Solomiia Valihunda";
  title.textContent = "Project not found";
  category.remove();
  summary.textContent = "That project is not available. Return to the portfolio to browse the project timeline.";
  sections.remove();
  document.querySelector(".project-intro").classList.add("project-not-found");
} else {
  document.title = `${project.title} — Solomiia Valihunda`;
  title.textContent = project.title;
  category.textContent = project.category;
  summary.textContent = project.summary;

  project.subsections.forEach((subsection, index) => {
    const section = document.createElement("section");
    section.className = "project-section";
    section.dataset.visual = String(index % 4 + 1);
    section.setAttribute("aria-labelledby", `subsection-title-${index + 1}`);

    const art = document.createElement("div");
    art.className = "project-art";
    art.setAttribute("aria-hidden", "true");

    const placeholder = document.createElement("span");
    placeholder.className = "placeholder-label";
    placeholder.textContent = `IMAGE PLACEHOLDER · ${subsection.title}`;
    art.append(placeholder);

    const story = document.createElement("article");
    story.className = "project-story";

    const label = document.createElement("p");
    label.className = "project-section-label";
    label.textContent = `SUBSECTION ${String(index + 1).padStart(2, "0")}`;

    const heading = document.createElement("h2");
    heading.id = `subsection-title-${index + 1}`;
    heading.textContent = subsection.title;

    const description = document.createElement("p");
    description.textContent = subsection.description;

    story.append(label, heading, description);
    section.append(art, story);
    sections.append(section);
  });
}
