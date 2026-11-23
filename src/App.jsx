import React, { useState, useEffect } from "react";
import {
  ListTodo,
  Clock,
  Check,
  Plus,
} from "lucide-react";

// Components matching Figma
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import FilterTabs from "./components/FilterTabs";
import DeleteConfirmModal from "./components/DeleteConfirmModal";
import MobileNav from "./components/MobileNav";

// Initial sample data & hooks
import { INITIAL_SAMPLE_TASKS } from "./data/sampleTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateTaskStats, filterTasks } from "./utils/taskUtils";

// Styles
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/responsive.css";

// Hash to tab mappings for URL navigation
const HASH_TO_TAB = {
  "#overview": "Overview",
  "#tasks": "My tasks",
  "#calendar": "Calendar",
  "#settings": "Settings",
};

const TAB_TO_HASH = {
  "Overview": "#overview",
  "My tasks": "#tasks",
  "Calendar": "#calendar",
  "Settings": "#settings",
};

export default function App() {
  // Main tasks state persisted in localStorage
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks", INITIAL_SAMPLE_TASKS);

  // Active navigation tab (synced with URL hash, defaults to Overview matching Figma desktop frame 1:2)
  const [activeNavTab, setActiveNavTab] = useState(() => {
    if (typeof window !== "undefined" && window.location.hash) {
      const hash = window.location.hash.toLowerCase();
      if (HASH_TO_TAB[hash]) return HASH_TO_TAB[hash];
    }
    return "Overview";
  });

  // Search and Filter states for tasks
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  // Modal UI states
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);

  // Sync activeNavTab with window.location.hash (supports browser back/forward and direct links)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      if (HASH_TO_TAB[hash]) {
        setActiveNavTab(HASH_TO_TAB[hash]);
      }
    };

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  // Navigation tab switcher that updates hash and scrolls to top
  const handleNavTabSelect = (tabName) => {
    setActiveNavTab(tabName);
    if (TAB_TO_HASH[tabName]) {
      window.location.hash = TAB_TO_HASH[tabName];
    }
    if (typeof window !== "undefined") {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // Dynamic statistics calculated on ALL tasks
  const {
    totalTasks,
    inProgressTasks,
    completedTasks,
    todoTasks,
    completionPercentage,
  } = calculateTaskStats(tasks);

  // Status counts for status filter tab badges
  const statusCounts = {
    All: totalTasks,
    "To do": todoTasks,
    "In progress": inProgressTasks,
    Completed: completedTasks,
  };

  // Combined filtering (Search + Status + Priority)
  const filteredTasks = filterTasks(tasks, {
    searchQuery,
    selectedStatus,
    selectedPriority,
  });

  const hasActiveFilters =
    searchQuery.trim() !== "" ||
    selectedStatus !== "All" ||
    selectedPriority !== "All";

  const handleClearFilters = () => {
    setSearchQuery("");
    setSelectedStatus("All");
    setSelectedPriority("All");
  };

  // CRUD Handlers
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskFormOpen(true);
  };

  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskToEdit && taskToEdit.id) {
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskData.id ? taskData : t))
      );
    } else {
      setTasks((prevTasks) => [taskData, ...prevTasks]);
    }
  };

  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );
  };

  // URL query parameter support for direct modal testing & inspection
  useEffect(() => {
    if (typeof window === "undefined") return;
    const params = new URLSearchParams(window.location.search);
    const modalParam = params.get("modal");
    if (modalParam === "create") {
      setTaskToEdit(null);
      setIsTaskFormOpen(true);
    } else if (modalParam === "edit" && tasks.length > 0) {
      setTaskToEdit(tasks[0]);
      setIsTaskFormOpen(true);
    } else if (modalParam === "delete" && tasks.length > 0) {
      setTaskToDelete(tasks[0]);
      setIsDeleteModalOpen(true);
    }
  }, [tasks]);

  return (
    <div className="app-container">
      {/* White Left Sidebar (Desktop Figma Frame 1:2) with Overview, My tasks, Calendar, Settings */}
      <Sidebar
        activeTab={activeNavTab}
        onTabSelect={handleNavTabSelect}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header activeTab={activeNavTab} />

        <main className="dashboard-content">
          {/* ========================================================
              VIEW 1: OVERVIEW (Figma Desktop Frame 1:2 & Mobile 1:167)
             ======================================================== */}
          {activeNavTab === "Overview" && (
            <>
              {/* Main Title Row matching Figma */}
              <section className="dashboard-title-bar">
                <div>
                  <h1>Your work, in focus.</h1>
                  <p>Plan your day, stay organized, and celebrate small wins.</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOpenCreateModal}
                  aria-label="Create new task"
                >
                  <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
                  <span>New task</span>
                </button>
              </section>

              {/* Focus Notes 3-Slide Carousel */}
              <FocusNotes />

              {/* Three White Overview Statistic Cards */}
              <section
                className="stats-grid-three"
                aria-label="Dashboard Overview Statistics"
              >
                <StatCard
                  title="Total tasks"
                  value={totalTasks}
                  icon={ListTodo}
                  variant="total"
                  subtext="Across all projects"
                />
                <StatCard
                  title="In progress"
                  value={inProgressTasks}
                  icon={Clock}
                  variant="inprogress"
                  subtext="Keep the momentum"
                />
                <StatCard
                  title="Completed"
                  value={completedTasks}
                  icon={Check}
                  variant="completed"
                  subtext="Great work this week"
                />
              </section>

              {/* My Tasks Section */}
              <section className="task-section" aria-label="My Tasks Section">
                <div className="task-section-header">
                  <div className="task-section-title-wrap">
                    <h2>My tasks</h2>
                    <p>Manage and track everything in one place.</p>
                  </div>

                  {/* Desktop "View all tasks" button navigates to My tasks tab */}
                  <button
                    type="button"
                    className="btn-soft-purple"
                    onClick={() => handleNavTabSelect("My tasks")}
                    aria-label="View all tasks"
                  >
                    View all tasks
                  </button>

                  {/* Mobile + Add Task Button */}
                  <button
                    type="button"
                    className="mobile-add-task-btn"
                    onClick={handleOpenCreateModal}
                    aria-label="Create new task"
                  >
                    <Plus size={18} strokeWidth={2.5} />
                  </button>
                </div>

                {/* Filter Toolbar matching Figma */}
                <FilterTabs
                  selectedStatus={selectedStatus}
                  onStatusChange={setSelectedStatus}
                  selectedPriority={selectedPriority}
                  onPriorityChange={setSelectedPriority}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onClearSearch={() => setSearchQuery("")}
                  onClearFilters={handleClearFilters}
                  hasActiveFilters={hasActiveFilters}
                  statusCounts={statusCounts}
                />

                {/* Tasks Horizontal Row Cards List */}
                <TaskList
                  tasks={filteredTasks}
                  totalTasksCount={totalTasks}
                  onEditTask={handleOpenEditModal}
                  onDeleteTask={handleOpenDeleteModal}
                  onStatusChange={handleStatusChange}
                  onOpenCreateModal={handleOpenCreateModal}
                  onClearFilters={handleClearFilters}
                />
              </section>
            </>
          )}

          {/* ========================================================
              VIEW 2: MY TASKS (Full Tasks View)
             ======================================================== */}
          {activeNavTab === "My tasks" && (
            <>
              <section className="dashboard-title-bar">
                <div>
                  <h1>My tasks</h1>
                  <p>Manage, track, and organize all your work in one place.</p>
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleOpenCreateModal}
                  aria-label="Create new task"
                >
                  <Plus size={16} strokeWidth={2.4} aria-hidden="true" />
                  <span>New task</span>
                </button>
              </section>

              {/* Overview Statistic Cards */}
              <section
                className="stats-grid-three"
                aria-label="Dashboard Overview Statistics"
              >
                <StatCard
                  title="Total tasks"
                  value={totalTasks}
                  icon={ListTodo}
                  variant="total"
                  subtext="Across all projects"
                />
                <StatCard
                  title="In progress"
                  value={inProgressTasks}
                  icon={Clock}
                  variant="inprogress"
                  subtext="Keep the momentum"
                />
                <StatCard
                  title="Completed"
                  value={completedTasks}
                  icon={Check}
                  variant="completed"
                  subtext="Great work this week"
                />
              </section>

              {/* Tasks Board Section */}
              <section className="task-section" aria-label="Task Management Board">
                <div className="task-section-header">
                  <div className="task-section-title-wrap">
                    <h2>All workspace tasks</h2>
                    <p>Showing {filteredTasks.length} of {totalTasks} tasks</p>
                  </div>

                  {hasActiveFilters && (
                    <button
                      type="button"
                      className="btn-secondary"
                      style={{ fontSize: 13, padding: "5px 12px" }}
                      onClick={handleClearFilters}
                    >
                      Clear filters
                    </button>
                  )}
                </div>

                <FilterTabs
                  selectedStatus={selectedStatus}
                  onStatusChange={setSelectedStatus}
                  selectedPriority={selectedPriority}
                  onPriorityChange={setSelectedPriority}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onClearSearch={() => setSearchQuery("")}
                  onClearFilters={handleClearFilters}
                  hasActiveFilters={hasActiveFilters}
                  statusCounts={statusCounts}
                />

                <TaskList
                  tasks={filteredTasks}
                  totalTasksCount={totalTasks}
                  onEditTask={handleOpenEditModal}
                  onDeleteTask={handleOpenDeleteModal}
                  onStatusChange={handleStatusChange}
                  onOpenCreateModal={handleOpenCreateModal}
                  onClearFilters={handleClearFilters}
                />
              </section>
            </>
          )}

          {/* ========================================================
              Calendar & Settings: Intentionally do not render anything
              (Sidebar and mobile bottom nav naming only per Figma)
             ======================================================== */}
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Figma Mobile Frame 1:167) */}
      <MobileNav
        activeTab={activeNavTab}
        onTabSelect={handleNavTabSelect}
      />

      {/* Create / Edit Task Modal Dialog */}
      <TaskForm
        isOpen={isTaskFormOpen}
        onClose={() => {
          setIsTaskFormOpen(false);
          setTaskToEdit(null);
        }}
        onSave={handleSaveTask}
        taskToEdit={taskToEdit}
      />

      {/* Delete Confirmation Modal */}
      <DeleteConfirmModal
        isOpen={isDeleteModalOpen}
        task={taskToDelete}
        onClose={() => {
          setIsDeleteModalOpen(false);
          setTaskToDelete(null);
        }}
        onConfirmDelete={handleConfirmDelete}
      />
    </div>
  );
}
