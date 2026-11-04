const projects = {
  bloomino: {
    title: "Bloomino",
    category: "DESIGN",
    summary: "An engineered art concept inspired by nature, fashion, and human-tech interaction.",
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
    summary: "Interactive browser versions of Python projects: calculator, shopping cart, games, and API tools.",
    subsections: []
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
    summary: "",
    subsections: [
      {
        title: "Machinist Hammer",
        description: "Brass machinist hammer head with a steel handle and a custom acrylic base.",
        images: [
          { src: "assets/Hammer/WhatsApp%20Image%202026-11-03%20at%208.04.01%20PM.jpeg", alt: "Close-up of the brass machinist hammer head and metal handle." },
          { src: "assets/Hammer/WhatsApp%20Image%202026-11-03%20at%208.05.24%20PM.jpeg", alt: "Custom-machined acrylic display base with shaped channels and supports." },
          { src: "assets/Hammer/WhatsApp%20Image%202026-11-03%20at%208.06.10%20PM.jpeg", alt: "Brass machinist hammer displayed on its acrylic base." }
        ]
      },
      {
        title: "Plumb Bob",
        description: "Functioning brass plumb bob with an embedded screw for hanging.",
        images: [
          { src: "assets/Plumb%20Bob/WhatsApp%20Image%202026-11-03%20at%208.03.23%20PM.jpeg", alt: "Horizontal close-up of the brass plumb bob and its embedded hanging screw." },
          { src: "assets/Plumb%20Bob/WhatsApp%20Image%202026-11-03%20at%208.40.13%20PM.jpeg", alt: "Vertical view of the brass plumb bob hanging from its embedded screw." }
        ],
        galleryLayout: "plumb-bob"
      }
    ]
  }
};

const projectId = new URLSearchParams(location.search).get("project");
if (projectId === "bloomino") {
  location.replace("bloomino-option-3-desktop.html");
}
if (projectId === "pid-lab") {
  location.replace("pid-lab-option-2.html");
}
const project = projects[projectId];
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
  if (projectId === "cad") title.classList.add("cad-title-spaced");
  if (projectId === "machining") document.querySelector(".project-intro").classList.add("machining-project-intro");
  category.textContent = project.category;
  if (project.summary) summary.textContent = project.summary;
  else summary.remove();
  if (projectId === "python") {
    const intro = document.querySelector(".project-intro");
    intro.classList.add("has-python-hero");
    const heroImage = makeElement("img", "python-hero-image");
    heroImage.src = "assets/python-shopping-cart-hero.svg";
    heroImage.alt = "Code editor showing Python shopping cart removal and total calculation logic";
    heroImage.decoding = "async";
    intro.prepend(heroImage);
    renderPythonProjects(sections);
  } else project.subsections.forEach((subsection, index) => {
    const section = document.createElement("section");
    section.className = "project-section";
    if (subsection.images) {
      section.classList.add("machining-gallery-section");
      if (subsection.galleryLayout) section.classList.add(subsection.galleryLayout);
    }
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
    if (subsection.images) {
      story.classList.add("project-story-over-gallery");
      const gallery = makeElement("div", "project-image-gallery");
      gallery.setAttribute("aria-label", "Machinist hammer and acrylic base photos");
      subsection.images.forEach(image => {
        const figure = makeElement("figure", "project-gallery-image");
        const photo = makeElement("img");
        photo.src = image.src;
        photo.alt = image.alt;
        photo.loading = "lazy";
        figure.append(photo);
        gallery.append(figure);
      });
      section.append(gallery, story);
    } else {
      section.append(art, story);
    }
    sections.append(section);
  });
}

function makeElement(tag, className, text) {
  const element = document.createElement(tag);
  if (className) element.className = className;
  if (text !== undefined) element.textContent = text;
  return element;
}

function makeMiniProject(title, description, id, styleName) {
  const section = makeElement("section", "mini-project");
  section.classList.add(`mini-project-${styleName}`);
  section.dataset.label = {
    calculator: "01 / Operations",
    cart: "02 / Your basket",
    rps: "03 / Two player",
    fibonacci: "04 / Number sequence",
    weather: "05 / Current conditions",
    exchange: "06 / Daily rates"
  }[styleName];
  section.setAttribute("aria-labelledby", `${id}-title`);
  const heading = makeElement("h2", "mini-project-title", title);
  heading.id = `${id}-title`;
  const headingRow = makeElement("div", "mini-project-heading");
  headingRow.append(makeProjectIcon(styleName), heading);
  section.append(headingRow, makeElement("p", "mini-project-description", description));
  return section;
}

function makeProjectIcon(styleName) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.classList.add("mini-project-icon");
  svg.setAttribute("viewBox", "0 0 48 48");
  svg.setAttribute("aria-hidden", "true");
  svg.setAttribute("focusable", "false");

  const shapes = {
    calculator: [
      ["rect", { x: 11, y: 5, width: 26, height: 38, rx: 3 }],
      ["line", { x1: 16, y1: 12, x2: 32, y2: 12 }],
      ["circle", { cx: 17, cy: 21, r: 1 }], ["circle", { cx: 24, cy: 21, r: 1 }], ["circle", { cx: 31, cy: 21, r: 1 }],
      ["circle", { cx: 17, cy: 29, r: 1 }], ["circle", { cx: 24, cy: 29, r: 1 }], ["circle", { cx: 31, cy: 29, r: 1 }],
      ["circle", { cx: 17, cy: 37, r: 1 }], ["circle", { cx: 24, cy: 37, r: 1 }], ["circle", { cx: 31, cy: 37, r: 1 }]
    ],
    cart: [
      ["path", { d: "M6 9h5l4 22h22l5-16H13" }],
      ["path", { d: "M17 25h18" }],
      ["circle", { cx: 19, cy: 38, r: 2 }], ["circle", { cx: 34, cy: 38, r: 2 }]
    ],
    rps: [
      ["rect", { x: 6, y: 6, width: 23, height: 23, rx: 5 }],
      ["rect", { x: 19, y: 19, width: 23, height: 23, rx: 5 }],
      ["circle", { cx: 12, cy: 12, r: 1.5, fill: "currentColor", stroke: "none" }],
      ["circle", { cx: 23, cy: 23, r: 1.5, fill: "currentColor", stroke: "none" }],
      ["circle", { cx: 35, cy: 35, r: 1.5, fill: "currentColor", stroke: "none" }],
      ["circle", { cx: 27, cy: 27, r: 1.5, fill: "currentColor", stroke: "none" }],
      ["circle", { cx: 35, cy: 27, r: 1.5, fill: "currentColor", stroke: "none" }]
    ],
    fibonacci: [
      ["path", { d: "M8 37c7-20 13-25 20-18s8 15 12 5" }],
      ["circle", { cx: 8, cy: 37, r: 3 }], ["circle", { cx: 19, cy: 23, r: 3 }],
      ["circle", { cx: 28, cy: 19, r: 3 }], ["circle", { cx: 40, cy: 24, r: 3 }]
    ],
    weather: [
      ["circle", { cx: 32, cy: 15, r: 6 }],
      ["path", { d: "M12 35h23a7 7 0 0 0 0-14 10 10 0 0 0-19-2 8 8 0 0 0-4 16Z" }],
      ["line", { x1: 32, y1: 3, x2: 32, y2: 5 }], ["line", { x1: 42, y1: 15, x2: 44, y2: 15 }]
    ],
    exchange: [
      ["path", { d: "M8 17h29l-6-6M40 31H11l6 6" }],
      ["path", { d: "M37 17l-6 6M11 31l6-6" }]
    ]
  };

  (shapes[styleName] || []).forEach(([tag, attributes]) => {
    const shape = document.createElementNS("http://www.w3.org/2000/svg", tag);
    Object.entries(attributes).forEach(([name, value]) => shape.setAttribute(name, String(value)));
    svg.append(shape);
  });
  return svg;
}

function renderPythonProjects(container) {
  container.classList.add("python-projects");

  renderCalculator(container);
  renderShoppingCart(container);
  renderRockPaperScissors(container);
  renderFibonacci(container);

  const weather = makeMiniProject("Weather Reporter", "Look up current conditions by city.", "weather-project", "weather");
  const weatherForm = makeElement("form", "mini-project-form");
  const cityLabel = makeElement("label", "", "City");
  cityLabel.htmlFor = "weather-city";
  const cityInput = makeElement("input");
  cityInput.id = "weather-city";
  cityInput.name = "city";
  cityInput.type = "search";
  cityInput.placeholder = "e.g. Newark";
  cityInput.value = "Newark";
  cityInput.required = true;
  const weatherButton = makeElement("button", "mini-project-button", "Get weather");
  weatherButton.type = "submit";
  weatherForm.append(cityLabel, cityInput, weatherButton);
  const weatherStatus = makeElement("p", "mini-project-status", "Enter a city to see its current weather.");
  weatherStatus.setAttribute("aria-live", "polite");
  weather.append(weatherForm, weatherStatus);
  container.append(weather);

  weatherForm.addEventListener("submit", async event => {
    event.preventDefault();
    const city = cityInput.value.trim();
    if (!city) return;
    weatherButton.disabled = true;
    weatherStatus.textContent = "Loading weather…";
    try {
      const geocodeUrl = new URL("https://geocoding-api.open-meteo.com/v1/search");
      geocodeUrl.search = new URLSearchParams({ name: city, count: "1", language: "en", format: "json" });
      const geocodeResponse = await fetch(geocodeUrl);
      if (!geocodeResponse.ok) throw new Error("Could not search for that city.");
      const geocodeData = await geocodeResponse.json();
      const place = geocodeData.results?.[0];
      if (!place) throw new Error("No matching city found. Try adding a country name.");

      const forecastUrl = new URL("https://api.open-meteo.com/v1/forecast");
      forecastUrl.search = new URLSearchParams({
        latitude: String(place.latitude),
        longitude: String(place.longitude),
        current: "temperature_2m,relative_humidity_2m,weather_code",
        temperature_unit: "celsius"
      });
      const forecastResponse = await fetch(forecastUrl);
      if (!forecastResponse.ok) throw new Error("Weather data is temporarily unavailable.");
      const forecastData = await forecastResponse.json();
      const current = forecastData.current;
      const fahrenheit = current.temperature_2m * 9 / 5 + 32;
      const condition = weatherDescription(current.weather_code);
      weatherStatus.textContent = `${place.name}${place.country ? `, ${place.country}` : ""}: ${current.temperature_2m}°C (${fahrenheit.toFixed(1)}°F), ${current.relative_humidity_2m}% humidity, ${condition}.`;
    } catch (error) {
      weatherStatus.textContent = error.message || "Weather data is temporarily unavailable.";
    } finally {
      weatherButton.disabled = false;
    }
  });

  const exchange = makeMiniProject("Exchange Rates", "Convert currencies and keep a small history on this device.", "exchange-project", "exchange");
  const exchangeForm = makeElement("form", "mini-project-form exchange-form");
  const amountLabel = makeElement("label", "", "Amount");
  amountLabel.htmlFor = "exchange-amount";
  const amount = makeElement("input");
  amount.id = "exchange-amount";
  amount.name = "amount";
  amount.type = "number";
  amount.min = "0.01";
  amount.step = "any";
  amount.value = "1";
  amount.required = true;
  const amountField = makeElement("div", "mini-project-field");
  amountField.append(amountLabel, amount);
  const fromLabel = makeElement("label", "", "From");
  fromLabel.htmlFor = "exchange-from";
  const from = makeCurrencySelect("exchange-from", "usd");
  const fromField = makeElement("div", "mini-project-field");
  fromField.append(fromLabel, from);
  const toLabel = makeElement("label", "", "To");
  toLabel.htmlFor = "exchange-to";
  const to = makeCurrencySelect("exchange-to", "eur");
  const toField = makeElement("div", "mini-project-field");
  toField.append(toLabel, to);
  const exchangeButton = makeElement("button", "mini-project-button", "Convert");
  exchangeButton.type = "submit";
  exchangeForm.append(amountField, fromField, toField, exchangeButton);
  const exchangeResult = makeElement("p", "mini-project-status", "Choose currencies and convert.");
  exchangeResult.setAttribute("aria-live", "polite");
  const historyTitle = makeElement("h3", "history-title", "Recent conversions");
  const historyList = makeElement("ul", "conversion-history");
  exchange.append(exchangeForm, exchangeResult, historyTitle, historyList);
  container.append(exchange);

  const storageKey = "portfolio-exchange-history-v1";
  const readHistory = () => {
    try { return JSON.parse(localStorage.getItem(storageKey) || "[]"); }
    catch { return []; }
  };
  const showHistory = () => {
    historyList.replaceChildren();
    const history = readHistory().slice(0, 5);
    if (!history.length) {
      historyList.append(makeElement("li", "", "No conversions saved yet."));
      return;
    }
    history.forEach(item => historyList.append(makeElement("li", "", `${item.amount} ${item.from.toUpperCase()} → ${item.converted} ${item.to.toUpperCase()}`)));
  };
  showHistory();

  exchangeForm.addEventListener("submit", async event => {
    event.preventDefault();
    const value = Number(amount.value);
    const base = from.value;
    const target = to.value;
    if (!Number.isFinite(value) || value <= 0) return;
    exchangeButton.disabled = true;
    exchangeResult.textContent = "Loading exchange rate…";
    try {
      const endpoint = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${encodeURIComponent(base)}.json`;
      const response = await fetch(endpoint);
      if (!response.ok) throw new Error("Exchange rates are temporarily unavailable.");
      const data = await response.json();
      const rate = data[base]?.[target];
      if (!Number.isFinite(rate)) throw new Error("That currency pair is not available.");
      const converted = value * rate;
      const formatted = new Intl.NumberFormat(undefined, { maximumFractionDigits: 4 }).format(converted);
      exchangeResult.textContent = `${value} ${base.toUpperCase()} = ${formatted} ${target.toUpperCase()} (rate: ${rate})`;
      const history = [{ amount: value, from: base, to: target, converted: formatted }, ...readHistory()].slice(0, 5);
      try { localStorage.setItem(storageKey, JSON.stringify(history)); } catch { /* History is optional when storage is unavailable. */ }
      showHistory();
    } catch (error) {
      exchangeResult.textContent = error.message || "Exchange rates are temporarily unavailable.";
    } finally {
      exchangeButton.disabled = false;
    }
  });
}

function renderCalculator(container) {
  const project = makeMiniProject("Calculator", "Run repeated calculations with two numbers and an operator.", "calculator-project", "calculator");
  const form = makeElement("form", "mini-project-form calculator-form");
  const first = makeNumberField("calculator-first", "First number", "0");
  const operationLabel = makeElement("label", "", "Operation");
  operationLabel.htmlFor = "calculator-operation";
  const operation = makeElement("select");
  operation.id = "calculator-operation";
  operation.name = "operation";
  [["+", "Add (+)"], ["-", "Subtract (−)"], ["*", "Multiply (×)"], ["/", "Divide (÷)"]].forEach(([value, label]) => {
    const option = makeElement("option", "", label);
    option.value = value;
    operation.append(option);
  });
  const operationField = makeElement("div", "mini-project-field");
  operationField.append(operationLabel, operation);
  const second = makeNumberField("calculator-second", "Second number", "0");
  const button = makeElement("button", "mini-project-button", "Calculate");
  button.type = "submit";
  form.append(first.field, operationField, second.field, button);
  const output = makeElement("p", "mini-project-status", "Enter two numbers to calculate.");
  output.setAttribute("aria-live", "polite");
  const history = makeElement("ul", "calculation-history");
  project.append(form, output, history);
  container.append(project);

  const results = [];
  form.addEventListener("submit", event => {
    event.preventDefault();
    const a = Number(first.input.value);
    const b = Number(second.input.value);
    if (!Number.isFinite(a) || !Number.isFinite(b)) {
      output.textContent = "Enter valid numbers for both fields.";
      return;
    }
    const op = operation.value;
    if (op === "/" && b === 0) {
      output.textContent = "Undefined: division by zero is not allowed.";
      return;
    }
    const value = op === "+" ? a + b : op === "-" ? a - b : op === "*" ? a * b : a / b;
    output.textContent = `${a} ${op} ${b} = ${value}`;
    results.unshift(`${a} ${op} ${b} = ${value}`);
    history.replaceChildren(...results.slice(0, 4).map(item => makeElement("li", "", item)));
  });
}

function makeNumberField(id, labelText, initialValue, min) {
  const field = makeElement("div", "mini-project-field");
  const label = makeElement("label", "", labelText);
  label.htmlFor = id;
  const input = makeElement("input");
  input.id = id;
  input.name = id;
  input.type = "number";
  input.step = "any";
  input.value = initialValue;
  input.required = true;
  if (min !== undefined) input.min = String(min);
  field.append(label, input);
  return { field, input };
}

function renderShoppingCart(container) {
  const project = makeMiniProject("Shopping Cart", "Add items from the shelf, remove them from your cart, and see the total.", "shopping-cart-project", "cart");
  const stock = [
    { name: "Chobani yogurt", price: 2.99, quantity: 1 },
    { name: "Eggs (12)", price: 1.99, quantity: 12 },
    { name: "Sourdough bread", price: 3.00, quantity: 1 }
  ];
  const cart = new Map();
  const form = makeElement("form", "mini-project-form cart-form");
  const label = makeElement("label", "", "Available items");
  label.htmlFor = "cart-item";
  const select = makeElement("select");
  select.id = "cart-item";
  select.name = "item";
  const addButton = makeElement("button", "mini-project-button", "Add item");
  addButton.type = "submit";
  form.append(label, select, addButton);
  const status = makeElement("p", "mini-project-status", "Choose an item to add it to your cart.");
  status.setAttribute("aria-live", "polite");
  const list = makeElement("ul", "shopping-cart-list");
  const total = makeElement("p", "cart-total", "Total: $0.00");
  project.append(form, status, list, total);
  container.append(project);

  const updateView = () => {
    select.replaceChildren();
    stock.filter(item => item.quantity > 0).forEach(item => {
      const option = makeElement("option", "", `${item.name} · $${item.price.toFixed(2)} · ${item.quantity} available`);
      option.value = item.name;
      select.append(option);
    });
    addButton.disabled = select.options.length === 0;
    list.replaceChildren();
    let sum = 0;
    cart.forEach((quantity, name) => {
      const item = stock.find(entry => entry.name === name);
      if (!item) return;
      sum += item.price * quantity;
      const row = makeElement("li", "shopping-cart-row");
      row.append(makeElement("span", "", `${name}: ${quantity} × $${item.price.toFixed(2)}`));
      const remove = makeElement("button", "cart-remove-button", "Remove one");
      remove.type = "button";
      remove.setAttribute("aria-label", `Remove one ${name} from cart`);
      remove.addEventListener("click", () => {
        const remaining = cart.get(name) - 1;
        if (remaining > 0) cart.set(name, remaining);
        else cart.delete(name);
        item.quantity += 1;
        status.textContent = `Removed one ${name} from your cart.`;
        updateView();
      });
      row.append(remove);
      list.append(row);
    });
    if (!cart.size) list.append(makeElement("li", "cart-empty", "Your cart is empty."));
    total.textContent = `Total: $${sum.toFixed(2)}`;
  };
  updateView();

  form.addEventListener("submit", event => {
    event.preventDefault();
    const item = stock.find(entry => entry.name === select.value);
    if (!item || item.quantity <= 0) return;
    item.quantity -= 1;
    cart.set(item.name, (cart.get(item.name) || 0) + 1);
    status.textContent = `Added ${item.name} to your cart.`;
    updateView();
  });
}

function renderRockPaperScissors(container) {
  const project = makeMiniProject("Rock Paper Scissors", "Choose a move for each player and play a round.", "rps-project", "rps");
  const form = makeElement("form", "mini-project-form rps-form");
  const choices = [["rock", "Rock"], ["paper", "Paper"], ["scissors", "Scissors"]];
  const playerOne = makeRpsSelect("rps-player-one", "Player 1", choices);
  const playerTwo = makeRpsSelect("rps-player-two", "Player 2", choices);
  const button = makeElement("button", "mini-project-button", "Play round");
  button.type = "submit";
  form.append(playerOne.field, playerTwo.field, button);
  const result = makeElement("p", "mini-project-status", "Choose both players’ moves.");
  result.setAttribute("aria-live", "polite");
  const score = makeElement("p", "game-score", "Score — Player 1: 0 · Player 2: 0 · Ties: 0");
  project.append(form, result, score);
  container.append(project);

  const totals = { one: 0, two: 0, ties: 0 };
  form.addEventListener("submit", event => {
    event.preventDefault();
    const a = playerOne.select.value;
    const b = playerTwo.select.value;
    if (a === b) {
      totals.ties += 1;
      result.textContent = `It’s a tie: both players chose ${a}.`;
    } else if ((a === "rock" && b === "scissors") || (a === "paper" && b === "rock") || (a === "scissors" && b === "paper")) {
      totals.one += 1;
      result.textContent = `Player 1 wins: ${a} beats ${b}.`;
    } else {
      totals.two += 1;
      result.textContent = `Player 2 wins: ${b} beats ${a}.`;
    }
    score.textContent = `Score — Player 1: ${totals.one} · Player 2: ${totals.two} · Ties: ${totals.ties}`;
  });
}

function makeRpsSelect(id, labelText, choices) {
  const field = makeElement("div", "mini-project-field");
  const label = makeElement("label", "", labelText);
  label.htmlFor = id;
  const select = makeElement("select");
  select.id = id;
  select.name = id;
  choices.forEach(([value, text]) => {
    const option = makeElement("option", "", text);
    option.value = value;
    select.append(option);
  });
  field.append(label, select);
  return { field, select };
}

function renderFibonacci(container) {
  const project = makeMiniProject("Fibonacci Sequence", "Generate the first n numbers in the sequence.", "fibonacci-project", "fibonacci");
  const form = makeElement("form", "mini-project-form fibonacci-form");
  const count = makeNumberField("fibonacci-count", "Number of values (1–100)", "10", 1);
  count.input.max = "100";
  count.input.step = "1";
  const button = makeElement("button", "mini-project-button", "Generate");
  button.type = "submit";
  form.append(count.field, button);
  const output = makeElement("p", "mini-project-status fibonacci-output", "Your sequence will appear here.");
  output.setAttribute("aria-live", "polite");
  project.append(form, output);
  container.append(project);

  form.addEventListener("submit", event => {
    event.preventDefault();
    const length = Number(count.input.value);
    if (!Number.isInteger(length) || length < 1 || length > 100) {
      output.textContent = "Enter a whole number from 1 to 100.";
      return;
    }
    const sequence = [];
    for (let index = 0; index < length; index += 1) {
      sequence.push(index < 2 ? index : sequence[index - 1] + sequence[index - 2]);
    }
    output.textContent = sequence.join(", ");
  });
}

function makeCurrencySelect(id, selected) {
  const select = makeElement("select");
  select.id = id;
  select.name = id;
  const currencies = ["usd", "eur", "gbp", "cad", "aud", "nzd", "jpy", "cny", "inr", "uah", "pln", "chf", "mxn", "brl", "sek", "nok", "dkk", "sgd", "hkd", "krw"];
  currencies.forEach(code => {
    const option = makeElement("option", "", code.toUpperCase());
    option.value = code;
    option.selected = code === selected;
    select.append(option);
  });
  return select;
}

function weatherDescription(code) {
  if (code === 0) return "clear sky";
  if ([1, 2, 3].includes(code)) return "partly cloudy";
  if ([45, 48].includes(code)) return "fog";
  if ([51, 53, 55, 56, 57].includes(code)) return "drizzle";
  if ([61, 63, 65, 66, 67, 80, 81, 82].includes(code)) return "rain";
  if ([71, 73, 75, 77, 85, 86].includes(code)) return "snow";
  if ([95, 96, 99].includes(code)) return "thunderstorm";
  return "current conditions";
}
