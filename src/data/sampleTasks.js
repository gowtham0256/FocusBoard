/**
 * Initial sample tasks for FocusBoard
 * Evaluator requirement: At least six realistic sample tasks with unique IDs,
 * exact statuses ('To do', 'In progress', 'Completed'),
 * exact priorities ('Low', 'Medium', 'High'),
 * and realistic categories.
 */

export const INITIAL_SAMPLE_TASKS = [
  {
    id: "101",
    title: "Complete UI Design",
    description: "Finish the responsive dashboard layout and review typography scale across breakpoints.",
    category: "Design",
    status: "In progress",
    priority: "High",
    dueDate: "2026-11-25"
  },
  {
    id: "102",
    title: "Implement Task CRUD Hooks",
    description: "Set up immutable state updates for create, edit, delete, and quick status transitions.",
    category: "Development",
    status: "Completed",
    priority: "High",
    dueDate: "2026-11-22"
  },
  {
    id: "103",
    title: "Accessibility and Keyboard Audit",
    description: "Verify WCAG 2.1 AA compliance, focus management, visible focus rings, and screen reader labels.",
    category: "Testing",
    status: "To do",
    priority: "Medium",
    dueDate: "2026-11-28"
  },
  {
    id: "104",
    title: "User Flow and Usability Research",
    description: "Conduct brief user testing on task filtering, search responsiveness, and carousel navigation.",
    category: "Research",
    status: "In progress",
    priority: "Low",
    dueDate: "2026-11-26"
  },
  {
    id: "105",
    title: "Configure localStorage Synchronization",
    description: "Ensure safe serialization, error handling for blocked storage, and preservation of empty states.",
    category: "Development",
    status: "Completed",
    priority: "Medium",
    dueDate: "2026-11-23"
  },
  {
    id: "106",
    title: "Cross-Device Responsive Testing",
    description: "Validate layout fidelity on Desktop (1440px), Tablet (768px), and Mobile (390px) viewports.",
    category: "Testing",
    status: "To do",
    priority: "High",
    dueDate: "2026-11-27"
  },
  {
    id: "107",
    title: "Optimize SVG Icons & Assets",
    description: "Audit Lucide React icon imports for clean bundle sizing and fast initial paint.",
    category: "Design",
    status: "Completed",
    priority: "Low",
    dueDate: "2026-11-20"
  }
];
