/**
 * Helper utility functions for FocusBoard tasks
 */

/**
 * Generates a unique task identifier.
 * Uses crypto.randomUUID() if supported in modern browsers,
 * with a reliable timestamp + random fallback.
 */
export function generateTaskId() {
  if (typeof crypto !== "undefined" && typeof crypto.randomUUID === "function") {
    return crypto.randomUUID();
  }
  return "task_" + Date.now() + "_" + Math.random().toString(36).substring(2, 9);
}

/**
 * Calculates live dashboard statistics from the complete task list.
 * Note: Must be computed on all tasks, never filtered tasks!
 */
export function calculateTaskStats(tasks = []) {
  const totalTasks = tasks.length;
  const inProgressTasks = tasks.filter(t => t.status === "In progress").length;
  const completedTasks = tasks.filter(t => t.status === "Completed").length;
  const todoTasks = tasks.filter(t => t.status === "To do").length;

  const completionPercentage =
    totalTasks === 0 ? 0 : Math.round((completedTasks / totalTasks) * 100);

  return {
    totalTasks,
    inProgressTasks,
    completedTasks,
    todoTasks,
    completionPercentage,
  };
}

/**
 * Filters tasks combining search query, status tab, and priority filter.
 */
export function filterTasks(tasks = [], { searchQuery = "", selectedStatus = "All", selectedPriority = "All" } = {}) {
  const normalizedQuery = searchQuery.trim().toLowerCase();

  return tasks.filter(task => {
    // 1. Title search (case-insensitive, partial matching)
    const matchesSearch =
      normalizedQuery === "" ||
      (task.title && task.title.toLowerCase().includes(normalizedQuery));

    // 2. Status filter
    const matchesStatus =
      selectedStatus === "All" ||
      selectedStatus === "All tasks" ||
      task.status === selectedStatus;

    // 3. Priority filter
    const matchesPriority =
      selectedPriority === "All" ||
      selectedPriority === "All Priorities" ||
      task.priority === selectedPriority;

    return matchesSearch && matchesStatus && matchesPriority;
  });
}

/**
 * Format a YYYY-MM-DD string to user-friendly format (e.g. "Nov 25, 2026")
 */
export function formatDisplayDate(dateStr) {
  if (!dateStr) return "No due date";
  try {
    const [year, month, day] = dateStr.split("-").map(Number);
    if (!year || !month || !day) return dateStr;
    const date = new Date(year, month - 1, day);
    return date.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
    });
  } catch {
    return dateStr;
  }
}

/**
 * Checks if a task is overdue relative to today (ignoring completed tasks).
 */
export function isTaskOverdue(dueDateStr, status) {
  if (!dueDateStr || status === "Completed") return false;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const [year, month, day] = dueDateStr.split("-").map(Number);
    const due = new Date(year, month - 1, day);
    return due < today;
  } catch {
    return false;
  }
}
