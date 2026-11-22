# AI Usage & Transparency Disclosure

This document provides transparent disclosure of AI assistance used during the planning, implementation, and verification of the **FocusBoard** task management dashboard, in accordance with the assignment guidelines.

---

## 1. AI Tooling Utilized

- **Primary Assistant:** Google Antigravity (Powered by Gemini 3.8 Flash)
- **Role:** Autonomous Senior React Frontend Engineer, Accessibility Specialist, QA Automation Tester, and Deployment Engineer.

---

## 2. Implementation Areas Supported by AI

1. **Architecture & Project Scaffolding:** Structuring clean component hierarchy (`App.jsx`, `components/`, `data/`, `hooks/`, `utils/`, `styles/`).
2. **Component Implementation:** Authoring React functional components with semantic HTML, controlled form handling, and accessible ARIA attributes.
3. **State Management & Custom Hooks:** Developing the `useLocalStorage` synchronization hook with lazy state initialization and defensive parsing.
4. **CSS Token & Responsive Design:** Formulating the CSS variable system, grid structures, and media queries for desktop (1440px), tablet (768px), and mobile (390px).
5. **Testing & QA Suite:** Writing the automated verification test suite (`tests/testSuite.js`) for tests `T01` through `T38`, and automating headless Chrome screenshot captures.
6. **Documentation & Review:** Generating structured `README.md` and interview preparation talking points.

---

## 3. Representative Prompts Used

### Prompt 1: Initial System Definition & Architecture
> "You are an autonomous Senior React Frontend Engineer... Your task is to build, run, test, debug, document, and prepare for submission a complete React.js task management dashboard named FocusBoard. The implementation must satisfy every mandatory requirement... Use plain CSS, CSS Grid, Flexbox, React Hooks, localStorage, Lucide React, and produce a working deliverable."

### Prompt 2: Safe localStorage State Persistence
> "Implement useLocalStorage hook using storage key focusboard_tasks. Handle lazy state initialization, check for saved tasks during initialization, restore valid saved data, use sample data only when no saved data exists, and preserve an intentionally empty saved array []."

### Prompt 3: Real-Time Multi-Condition Filtering
> "Implement combined filtering combining case-insensitive search, status tabs (All, To do, In progress, Completed), and priority dropdown (All, High, Medium, Low). Provide a Clear Filters action."

### Prompt 4: Comprehensive QA & Automated Testing
> "Create automated test runner covering tests T01 to T38: sample tasks schema, CRUD additions, validation of empty and whitespace titles, title preservation on edit, deletion confirmation, status changes, statistics calculations, and empty-array persistence."

---

## 4. AI Suggestions Verified, Corrected, or Rejected

During the implementation process, human engineering verification identified and corrected several critical technical decisions:

### Case 1: Template Selection Correction (TypeScript vs Pure JavaScript React)
- **Initial Automated Output:** Running `npm create vite@latest . -- --template react` in recent Vite versions unexpectedly scaffolded a TypeScript template with `tsconfig.json` and `main.ts`.
- **Engineering Correction:** The assignment specification explicitly mandated pure JavaScript ES6+ without unnecessary TypeScript complexity so that a fresher developer can cleanly explain the code. We uninstalled `typescript`, removed `tsconfig.json`, configured `@vitejs/plugin-react` in `vite.config.js`, and converted entry points to clean `main.jsx` and `App.jsx`.

### Case 2: localStorage Empty Array Preservation Bug (`[]` vs `null`)
- **Initial Pattern:** Standard naive `localStorage` examples often check `if (!storedValue || storedValue.length === 0) return sampleTasks;`.
- **Engineering Correction:** This naive check creates a major functional bug: if a user intentionally deletes all their tasks, refreshing the browser would re-seed the initial sample tasks, violating user intent. We refined the initialization logic to explicitly test `window.localStorage.getItem(key) === null` for first-time launch, while preserving empty array `[]` if the user intentionally deleted all tasks.

### Case 3: Mobile Header Overflow Refinement
- **Visual Inspection Finding:** When inspecting the real Chrome render at `390 × 1128` mobile viewport, the desktop "+ New Task" text in the header created slight lateral crowding against the breadcrumb.
- **Engineering Correction:** We updated `responsive.css` to collapse the button text on screens `<= 480px`, displaying a compact square icon button `+` that preserves full tap accessibility without horizontal page stretching.

---

## 5. Conclusion & Verification

All code in this repository was compiled, built with `npm run build`, tested with `npm test`, and visually verified using real multi-viewport browser captures in Chrome.
