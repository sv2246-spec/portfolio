
# Site Test Plan

## Test setup

- Run the site from its repository root using a local HTTP server so local links, JavaScript, and clipboard permissions can be tested.
- Test phone layouts at **390 × 844 CSS pixels** and laptop layouts at **1366 × 768 CSS pixels**.
- The page list below covers every top-level HTML page, including design mockups.
- For navigation cases, activate every link on the page, including header/footer links, in-page anchors, project links, and external, email, or telephone links. Confirm the destination or expected handoff, then return to the page and continue.
- “Not run” means no result has been recorded yet; it is not a Pass or Fail. Record Pass or Fail after running each case. The existing Lighthouse report has a homepage Accessibility score, noted below; it does not cover the other pages.

## Test cases

| ID | What you are testing | Steps to run the test | Expected result | Actual result |
|---|---|---|---|---|
| T1 | `index.html` navigation | Open the home page and activate every link: skip to content, wordmark, four section links, LinkedIn, contact, five project cards, email, phone, and footer links. | Each local link reaches its section or project; external, email, and phone links open the appropriate destination or handler. | Not run |
| T2 | `project.html` navigation | Open `project.html?project=machining`, `?project=python`, and `?project=prosthetics`. On each, activate every link, including skip, wordmark, project links, back-to-projects, and footer links. | Each link reaches the intended project, home section, or in-page target. | Not run |
| T3 | `bloomino-mockups.html` navigation | Activate both links: open Bloomino option 3 and return to the Bloomino project page. | The selected design and Bloomino project page open. | Not run |
| T4 | `bloomino-option-3-desktop.html` navigation | Activate every link: wordmark, About Me, Projects, Skills Summary, both “All projects” links, and the concept anchor. | Each link opens the correct home section or concept section. | Not run |
| T5 | `mockups.html` navigation | Inspect the page and verify its links. | This design-exploration page has no navigation links; no unexpected links are present. | Not run |
| T6 | `pid-lab-mockups.html` navigation | Activate the portfolio-projects link and all three iteration links. | The portfolio projects section and each matching PID Lab iteration open. | Not run |
| T7 | `pid-lab-option-1.html` navigation | Activate every link, including portfolio projects, all iterations, next iteration, poster PDF, and return links. | Each link opens the intended section, iteration, or poster. | Not run |
| T8 | `pid-lab-option-2.html` navigation | Activate every link, including portfolio projects, PID Lab website, and poster PDF. | Each link opens the intended destination. | Not run |
| T9 | `pid-lab-option-3.html` navigation | Activate every link, including portfolio projects, previous iteration, all iterations, poster PDF, and return-to-iteration-01. | Each link opens the intended destination. | Not run |
| T10 | `project-description-mockups.html` navigation | Inspect the page and verify its links. | This design-exploration page has no navigation links; no unexpected links are present. | Not run |
| T11 | `timeline-mockups.html` navigation | Activate the skip link and both horizontal/vertical tree anchors. | Each link reaches the matching page section. | Not run |
| T12 | Phone-size layout on every page | At 390 × 844, open each page: `index.html`, `project.html` (machining, Python, prosthetics), `bloomino-mockups.html`, `bloomino-option-3-desktop.html`, `mockups.html`, `pid-lab-mockups.html`, all three `pid-lab-option-*.html` pages, `project-description-mockups.html`, and `timeline-mockups.html`. Inspect the full page and exercise its controls. | Content and controls remain visible and usable, text/images do not overlap, and there is no unintended horizontal scrolling. | Not run |
| T13 | Laptop-size layout on every page | Repeat T12 at 1366 × 768 for the same pages and project routes. | Content and controls fit the laptop layout without unintended clipping, overlap, or horizontal scrolling. | Not run |
| T14 | Keyboard navigation on every page | On each page and project route listed in T12, use Tab and Shift+Tab to move through every interactive element; use Enter on each focused link or control. | Focus is visible and follows a logical order; Enter activates the focused link/control. Pages without links or controls have no keyboard trap. | Not run |
| T15 | Lighthouse Accessibility on every page | Run Lighthouse in desktop mode on every page and project route listed in T12; record each Accessibility score and review failed audits. | Every page scores 1.00 with no failed Accessibility audits; record individual scores if the threshold is not met. | Partially recorded: homepage score 1.00 in `lighthouse/home-after`; other pages not run |
| T16 | Mobile navigation menu | On `index.html` at phone size, activate the menu button, then choose each section link and reopen/close the menu with the button. | The menu opens/closes, `aria-expanded` stays in sync, and choosing a link closes the menu and reaches the section. | Not run |
| T17 | Current footer year | Open `index.html` and compare the displayed copyright year with the current calendar year; reload in a later year if applicable. | The footer displays the current year set by JavaScript. | Not run |
| T18 | Contact copy controls | On `index.html`, activate the email and phone copy links with clipboard permission granted; repeat with clipboard access denied to exercise the fallback. | The expected value is copied and an accessible status is announced; the fallback reports success or instructs the user to copy manually. | Not run |
| T19 | Home project timeline visibility and progress | On `index.html`, scroll through the project timeline, resize the viewport, and repeat with reduced motion enabled. | Timeline items reveal as they enter view, progress/reached markers update on scroll and resize, and reduced-motion mode shows the items without requiring animation. | Not run |
| T20 | Home hero and experience scroll effects | On `index.html`, scroll from the hero to Skills Summary, resize, then enable reduced motion and repeat. | Hero and experience effects respond to scrolling/resizing; reduced-motion mode removes the hero scroll effects. | Not run |
| T21 | Project routing and unavailable project | Open `project.html?project=machining`, `?project=python`, `?project=prosthetics`, `?project=bloomino`, `?project=pid-lab`, and an unknown project value. | Machining, Python, and prosthetics details render; Bloomino and PID Lab redirect to their dedicated pages; unknown IDs show the not-found message and a working return link. | Not run |
| T22 | Calculator valid and invalid input | Open `project.html?project=python`. Calculate 7 + 3, 7 − 3, 7 × 3, and 7 ÷ 2; then try a blank required field and division by zero. | Valid operations show correct results and retain recent history; invalid/blank input is rejected and division by zero shows the explanatory message. | Not run |
| T23 | Shopping cart controls | On the Python project page, add each available item, add an item until stock is exhausted, remove items, and empty the cart. | Cart quantities and total update correctly, stock cannot be exceeded, and removing the last item restores it to the shelf. | Not run |
| T24 | Rock-paper-scissors outcomes | On the Python project page, play a tie, a Player 1 win, and a Player 2 win. | Each round reports the correct outcome and updates only the matching score/tie count. | Not run |
| T25 | Fibonacci valid and invalid input | On the Python project page, generate 10 values and test 1, 0, 101, and a non-integer value. | Valid counts from 1–100 produce the correct sequence; invalid counts are rejected with an explanatory message. | Not run |
| T26 | Weather form valid and invalid input | On the Python project page, submit a known city such as Newark, submit an unknown city, and try the required field empty. | A valid city displays current weather; unknown/empty input reports or enforces the appropriate error without leaving the form stuck in a loading state. | Not run |
| T27 | Currency conversion valid and invalid input | On the Python project page, convert a positive amount between two currencies, inspect recent history, then try zero, a negative, and a blank amount. | A valid amount shows a conversion and adds it to the capped history; invalid amounts are blocked and do not add history. | Not run |
| T28 | Timeline mockup disclosure controls | On `timeline-mockups.html`, use Tab/Enter or click each horizontal and vertical tree button to collapse and expand its details. Scroll the vertical tree, resize, and repeat with reduced motion. | Each button updates its expanded state and associated details; the vertical progress indicator updates, and reduced-motion mode displays items without reveal animation. | Not run |

### Form validation note

The portfolio home page has contact links, not a contact form. Valid/invalid form-input checks therefore apply to the calculator, Fibonacci, weather, and currency tools on `project.html?project=python`; cart and game forms are checked for correct interactions and state changes.
