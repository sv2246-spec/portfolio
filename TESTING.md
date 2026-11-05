
# Site Test Plan

## Test setup

- Run the site from its repository root using a local HTTP server so local links, JavaScript, and clipboard permissions can be tested.
- Test phone layouts at **390 × 844 CSS pixels** and laptop layouts at **1366 × 768 CSS pixels**.
- For navigation cases, activate every link on the page, including header/footer links, in-page anchors, project links, and external, email, or telephone links. Confirm the destination or expected handoff, then return to the page and continue.
- “Not run” means no result has been recorded yet; it is not a Pass or Fail. Record Pass or Fail after running each case.

## Test cases

| ID | What you are testing | Steps to run the test | Expected result | Actual result |
|---|---|---|---|---|
| T1 | `index.html` navigation | Open the home page and activate every link: LinkedIn, contact, five project cards, email, phone, and footer links. | Each local link reaches its section or project| PASS |
| T2 | `project.html` navigation | Open `project.html?project=machining`, `?project=python`, and `?project=prosthetics`. On each, activate every link, including project links, back-to-projects, and footer links. | Each link reaches the intended project, home section, or in-page target. | PASS |
| T3 | `bloomino-mockups.html` navigation | Activate both links: open Bloomino option 3 and return to the Bloomino project page. | The selected design and Bloomino project page open. | PASS |
| T4 | `pid-lab-option-1.html` navigation | Activate every link, including portfolio projects, all iterations, next iteration, poster PDF, and return links. | Each link opens the intended section, iteration, or poster. | PASS |
| T5 | Interactive Python projects | Open `project.html?project=python`. Test the calculator with valid operations and division by zero; add/remove items in the cart; play tie and winning Rock-Paper-Scissors rounds; generate valid and invalid Fibonacci lengths; submit a valid and unknown city to Weather Reporter; convert currencies with valid and invalid amounts. | Calculations, cart totals/stock, game results/scores, and Fibonacci sequences update correctly; invalid inputs are handled; weather and currency results or clear service errors are shown. | PASS |
| T6 | `timeline-mockups.html` navigation | Activate the skip link and both horizontal/vertical tree anchors. | Each link reaches the matching page section. | Not run |
| T7 | Phone-size layout on every page | At 390 × 844, open each page: `index.html`, `project.html` (machining, Python, prosthetics), `bloomino-mockups.html`, `bloomino-option-3-desktop.html`, `mockups.html`, `pid-lab-mockups.html`, all three `pid-lab-option-*.html` pages, `project-description-mockups.html`, and `timeline-mockups.html`. Inspect the full page and exercise its controls. | Content and controls remain visible and usable, text/images do not overlap, and there is no unintended horizontal scrolling. | PASS |
| T8 | Laptop-size layout on every page | Repeat T7 at 1366 × 768 for the same pages and project routes. | Content and controls fit the laptop layout without unintended clipping, overlap, or horizontal scrolling. | PASS |
| T9 | Keyboard navigation on every page | On each page and project route listed in T7, use Tab and Shift+Tab to move through every interactive element; use Enter on each focused link or control. | Focus is visible and follows a logical order; Enter activates the focused link/control. Pages without links or controls have no keyboard trap. | PASS |
| T10 | Lighthouse Accessibility on every page | Run Lighthouse in desktop mode on every page; record each Accessibility score and review failed audits. | Every page scores > 90 with no failed Accessibility audits; record individual scores if the threshold is not met.| PASS |
| T11 | Mobile navigation menu | On `index.html` at phone size, activate the menu button, then choose each section link and reopen/close the menu with the button. | The menu opens/closes, `aria-expanded` stays in sync, and choosing a link closes the menu and reaches the section. | PASS |
| T12 | Timeline mockup disclosure controls | On `timeline-mockups.html`, use Tab/Enter or click each horizontal and vertical tree button to collapse and expand its details. Scroll the vertical tree. | Each button updates its expanded state and associated details; the vertical progress indicator updates, and reduced-motion mode displays items without reveal animation. | PASS |