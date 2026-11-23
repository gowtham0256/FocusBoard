# AI Usage & Transparency Disclosure

This document provides transparent disclosure of AI assistance used during the planning, implementation, and verification of the **FocusBoard** task management dashboard, in accordance with the assignment guidelines.

---

## 1. AI Tooling Utilized

- **Primary Assistant:** Google Antigravity (Powered by Gemini 3.8 Flash)
- **Role:** Senior React Frontend Engineer, Accessibility Specialist, QA Automation Tester, and Deployment Engineer.

---

## 2. Implementation Areas Supported by AI

1. **Architecture & Project Scaffolding:** Structuring clean component hierarchy (`App.jsx`, `components/`, `data/`, `hooks/`, `utils/`, `styles/`).
2. **Component Implementation:** Authoring React functional components with semantic HTML, controlled form handling, and accessible ARIA attributes.
3. **State Management & Custom Hooks:** Developing the `useLocalStorage` synchronization hook with lazy state initialization, defensive parsing, and URL hash routing synchronization.
4. **CSS Token & Responsive Design:** Formulating the CSS variable system, grid structures, and media queries for desktop (1440px), tablet (768px), and mobile (390px).
5. **Testing & QA Suite:** Authoring the automated verification test suite (`tests/testSuite.js`) for tests `T01` through `T38`, and automating headless Chrome screenshot captures.
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

### Prompt 5: Figma Visual Fidelity and Form Alignment
> "Audit the project against the original FocusBoard Figma frames (Desktop node 1:2, Mobile node 1:167, Modal node 1:279, Carousel nodes 15:2, 15:30, 15:58). Preserve the authentic Figma layout without adding unrequested views."

---

## 4. AI Suggestions Verified, Corrected, or Rejected

During the implementation process, human engineering verification identified and corrected several critical technical decisions:

### Case 1: Template Selection Correction (TypeScript vs Pure JavaScript React)
- **Initial Automated Output:** Running `npm create vite@latest . -- --template react` in recent Vite versions scaffolded a TypeScript template with `tsconfig.json` and `main.ts`.
- **Engineering Correction:** The assignment specification explicitly mandated pure JavaScript ES6+ without unnecessary TypeScript complexity so that a fresher developer can cleanly explain the code. We uninstalled `typescript`, removed `tsconfig.json`, configured `@vitejs/plugin-react` in `vite.config.js`, and converted entry points to clean `main.jsx` and `App.jsx`.

### Case 2: localStorage Empty Array Preservation Bug (`[]` vs `null`)
- **Initial Pattern:** Standard naive `localStorage` examples often check `if (!storedValue || storedValue.length === 0) return sampleTasks;`.
- **Engineering Correction:** This naive check creates a major functional bug: if a user intentionally deletes all their tasks, refreshing the browser would re-seed the initial sample tasks, violating user intent. We refined the initialization logic to explicitly test `window.localStorage.getItem(key) === null` for first-time launch, while preserving empty array `[]` if the user intentionally deleted all tasks.

### Case 3: Mobile Bottom Navigation vs Off-Canvas Drawer
- **Initial Pattern:** Initial generic SaaS dashboard templates defaulted to an off-canvas drawer sidebar on mobile.
- **Engineering Correction:** Comparing against the authentic FocusBoard Figma Mobile Frame (`node 1:167`, 390 × 1128) revealed that the design specifies a fixed bottom navigation bar with 4 items (`Overview`, `Tasks`, `Calendar`, `Settings`). We replaced the drawer with `MobileNav.jsx`, which matches the Figma spec.

### Case 4: Scope Adherence for Calendar and Settings
- **Initial Pattern:** When implementing sidebar navigation, extra sub-views (such as a full calendar grid and settings view) were generated beyond the single-dashboard Figma specification.
- **Engineering Correction:** In strict accordance with the Figma frames (`Desktop node 1:2` and `Mobile node 1:167`), the assignment requires only the FocusBoard dashboard (Title, Focus Notes carousel, 3 stat cards, and task list). `Calendar` and `Settings` are maintained purely as navigation naming items in the sidebar and mobile bottom nav without rendering unrelated extra views or cluttering the codebase.

### Case 5: Carousel Mobile Controls Accessibility
- **Initial Pattern:** An initial responsive CSS rule hid `.focus-carousel-right` on screens `<= 480px`, which inadvertently removed the `<` and `>` arrow buttons on mobile.
- **Engineering Correction:** We updated the styling to hide only the decorative mini-task card while preserving the arrow buttons and adding high-contrast indicator buttons on mobile, ensuring full touch and keyboard navigation across all devices.

### Case 6: Create Task Form Layout Preservation vs Category Schema
- **Initial Pattern:** Adding a Category dropdown into a shared grid row next to Due Date distorted the visual layout of Figma node `1:279` (where Due Date is displayed as a full-width input).
- **Engineering Correction:** We restored the exact visual layout of Figma node `1:279` (Task title, Description, Status | Priority row, and full-width Due date input), while ensuring that every created or edited task automatically receives a valid category (via title keyword inference with a clickable tag selector). This satisfies both the visual layout match and the strict data schema requirement.

---

## 5. Conclusion & Verification

All code in this repository was compiled, built with `npm run build`, verified with 38 automated test cases in `npm test`, and visually verified using real multi-viewport browser captures in Chrome.
