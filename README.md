# FocusBoard — Task Management Dashboard

A modern, responsive task management application built with **React.js, JavaScript, and CSS**. FocusBoard helps users organize tasks, manage priorities, monitor progress, and improve daily productivity through an intuitive dashboard.

**Live Application:** https://focus-board-h.vercel.app/

**GitHub Repository:** https://github.com/gowtham0256/FocusBoard

---

## Project Overview

FocusBoard is a single-page web application designed to simplify everyday task management. Users can create tasks, update their status, organize them by priority, and track their progress through dynamic dashboard statistics.

The application follows a component-based React architecture and uses browser localStorage to preserve task data between sessions.

## Tech Stack

| Technology | Purpose |
|---|---|
| React.js 19 | Building reusable UI components |
| JavaScript (ES6+) | Application logic and event handling |
| HTML5 | Semantic page structure |
| CSS3 | Styling and responsive layouts |
| Vite 8 | Development server and production builds |
| Lucide React | Icons and visual elements |
| LocalStorage | Browser-based task persistence |
| Git & GitHub | Version control and source code hosting |
| Vercel | Application deployment |

## Key Features

- **Task Management:** Create, view, edit, and delete tasks.
- **Task Status:** Manage tasks using To do, In progress, and Completed statuses.
- **Quick Completion:** Mark tasks as completed using interactive checkmark buttons.
- **Task Priorities:** Categorize tasks as High, Medium, or Low priority.
- **Search:** Find tasks instantly using case-insensitive title search.
- **Filters:** Filter tasks by status and priority simultaneously.
- **Dashboard Statistics:** Display total, in-progress, and completed tasks with completion percentage.
- **Focus Notes:** Interactive three-slide productivity carousel.
- **LocalStorage:** Automatically save tasks and restore them after refresh.
- **Responsive Design:** Support desktop, tablet, and mobile devices.
- **Navigation:** Overview and My Tasks views.

## React Concepts Used

### 1. Component-Based Architecture

The application is divided into smaller, reusable React components. Each component handles a specific part of the interface, making the project easier to maintain and extend.

### 2. Functional Components

FocusBoard uses functional components to render UI elements and organize application logic.

### 3. useState Hook

The `useState` Hook manages interactive application state, including tasks, search queries, filters, active navigation, and modal visibility.

### 4. useEffect Hook

The `useEffect` Hook handles side effects such as synchronizing application data with browser storage and responding to navigation changes.

### 5. Props

Props pass information and callback functions between parent and child components.

For example, a task list receives task data and functions for editing, deleting, and updating task status.

### 6. Conditional Rendering

Conditional rendering displays different interface elements based on application state, such as empty task messages, active filters, and modal dialogs.

### 7. List Rendering

Task records are rendered dynamically using JavaScript's `map()` method, with unique task IDs used as React keys.

### 8. Event Handling

React event handlers respond to user interactions such as button clicks, form submissions, search input changes, and task completion.

### 9. Controlled Forms

Task form fields are managed through React state, allowing validation and consistent handling of task creation and editing.

### 10. Custom Hooks

The application uses a custom `useLocalStorage` Hook to manage persistent task data.

## Main Components

| Component | Responsibility |
|---|---|
| `App.jsx` | Manages application state and coordinates components |
| `Sidebar.jsx` | Desktop navigation |
| `Header.jsx` | Dashboard header and navigation information |
| `StatCard.jsx` | Displays task statistics |
| `FocusNotes.jsx` | Interactive productivity carousel |
| `FilterTabs.jsx` | Search, status tabs, and priority filters |
| `TaskList.jsx` | Renders the task collection and empty states |
| `TaskCard.jsx` | Displays individual tasks and their actions |
| `TaskForm.jsx` | Handles task creation and editing |
| `DeleteConfirmModal.jsx` | Confirms task deletion |
| `MobileNav.jsx` | Responsive mobile navigation |

## Project Structure

```text
FocusBoard/
├── public/
├── src/
│   ├── components/
│   │   ├── Sidebar.jsx
│   │   ├── Header.jsx
│   │   ├── StatCard.jsx
│   │   ├── FocusNotes.jsx
│   │   ├── FilterTabs.jsx
│   │   ├── TaskList.jsx
│   │   ├── TaskCard.jsx
│   │   ├── TaskForm.jsx
│   │   ├── DeleteConfirmModal.jsx
│   │   └── MobileNav.jsx
│   ├── data/
│   │   ├── sampleTasks.js
│   │   └── focusSlides.js
│   ├── hooks/
│   │   └── useLocalStorage.js
│   ├── utils/
│   │   └── taskUtils.js
│   ├── styles/
│   │   ├── layout.css
│   │   ├── components.css
│   │   └── responsive.css
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
├── tests/
├── scripts/
├── screenshots/
├── package.json
├── vite.config.js
└── README.md
```

## How the Application Works

### Task Creation

Users create tasks by entering a title, description, status, priority, and due date. The application validates required fields before saving the task.

### Task Editing and Deletion

Existing tasks can be updated through the edit form. Tasks can also be deleted after confirmation to prevent accidental removal.

### Task Completion

Each task includes a clickable checkmark button. Clicking it updates the task's completion status and immediately refreshes the dashboard statistics.

### Search and Filtering

The application uses JavaScript array methods such as `filter()` to display tasks matching the selected search query, status, and priority.

### Dashboard Statistics

Statistics are calculated dynamically from the task collection, keeping the displayed values synchronized with task changes.

### Data Persistence

Task data is stored in the browser's localStorage. Changes are retained after page refresh without requiring a backend server.

## Responsive Design

FocusBoard uses CSS Grid, Flexbox, and media queries to adapt its layout across devices.

- **Desktop:** Sidebar navigation, dashboard statistics, and horizontal task rows.
- **Tablet:** Flexible layouts and adjusted spacing.
- **Mobile:** Compact task cards, stacked content, and bottom navigation.

## Installation and Setup

### Prerequisites

- Node.js compatible with Vite 8
- npm
- Git

### 1. Clone the Repository

```bash
git clone https://github.com/gowtham0256/FocusBoard.git
cd FocusBoard
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

Open the local development URL displayed in the terminal.

### 4. Build for Production

```bash
npm run build
```

### 5. Preview the Production Build

```bash
npm run preview
```

## Testing

The project includes an automated test suite covering task operations, filtering, statistics, persistence, and other application logic.

Run the tests using:

```bash
npm test
```

## Deployment

FocusBoard is deployed using **Vercel**.

**Live Website:** https://focus-board-h.vercel.app/

The application uses Vite to generate an optimized production build in the `dist` directory.

## Design Reference

The interface is based on the [FocusBoard Figma Design](https://www.figma.com/design/09TveHXjOvI73KDNndCFM4/FocusBoard-%E2%80%94-Dashboard-References), with responsive layouts and interactive task management features.

## Future Improvements

- User authentication
- Cloud database integration
- Task reminders and notifications
- Drag-and-drop task organization
- Advanced productivity analytics

## Author

**E. Gowtham**

GitHub: https://github.com/gowtham0256

---

**FocusBoard — Organize tasks. Track progress. Stay focused.**
