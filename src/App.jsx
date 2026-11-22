import React, { useState } from "react";
import {
  CheckSquare,
  Clock,
  CheckCircle2,
  TrendingUp,
  Plus,
} from "lucide-react";

// Components
import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import StatCard from "./components/StatCard";
import FocusNotes from "./components/FocusNotes";
import TaskList from "./components/TaskList";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import FilterTabs from "./components/FilterTabs";
import DeleteConfirmModal from "./components/DeleteConfirmModal";

// Initial sample data & hooks
import { INITIAL_SAMPLE_TASKS } from "./data/sampleTasks";
import { useLocalStorage } from "./hooks/useLocalStorage";
import { calculateTaskStats, filterTasks } from "./utils/taskUtils";

// Styles
import "./styles/layout.css";
import "./styles/components.css";
import "./styles/responsive.css";

export default function App() {
  // Main tasks state synchronized with localStorage
  const [tasks, setTasks] = useLocalStorage("focusboard_tasks", INITIAL_SAMPLE_TASKS);

  // Search and Filter states
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [selectedPriority, setSelectedPriority] = useState("All");

  // Modal & Drawer UI states
  const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
  const [taskToEdit, setTaskToEdit] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // URL query parameter support for direct modal testing & inspection
  React.useEffect(() => {
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

  // 1. Dynamic statistics (Calculated on ALL tasks, never filtered tasks)
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

  // 2. Combined filtering (Search + Status + Priority)
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

  // 3. CRUD: Create Task
  const handleOpenCreateModal = () => {
    setTaskToEdit(null);
    setIsTaskFormOpen(true);
  };

  // 4. CRUD: Edit Task
  const handleOpenEditModal = (task) => {
    setTaskToEdit(task);
    setIsTaskFormOpen(true);
  };

  const handleSaveTask = (taskData) => {
    if (taskToEdit) {
      // Immutable update of existing task (preserves task ID)
      setTasks((prevTasks) =>
        prevTasks.map((t) => (t.id === taskData.id ? taskData : t))
      );
    } else {
      // Immutable prepend of newly created task
      setTasks((prevTasks) => [taskData, ...prevTasks]);
    }
  };

  // 5. CRUD: Delete Task
  const handleOpenDeleteModal = (task) => {
    setTaskToDelete(task);
    setIsDeleteModalOpen(true);
  };

  const handleConfirmDelete = (taskId) => {
    setTasks((prevTasks) => prevTasks.filter((t) => t.id !== taskId));
    setIsDeleteModalOpen(false);
    setTaskToDelete(null);
  };

  // 6. Quick Status Change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks((prevTasks) =>
      prevTasks.map((t) =>
        t.id === taskId ? { ...t, status: newStatus } : t
      )
    );
  };

  return (
    <div className="app-container">
      {/* Sidebar Navigation */}
      <Sidebar
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Main Content Area */}
      <div className="main-wrapper">
        <Header
          onToggleMobileMenu={() => setIsMobileMenuOpen((prev) => !prev)}
          onOpenCreateModal={handleOpenCreateModal}
        />

        <main className="dashboard-content">
          {/* Dashboard Title & Overview Banner */}
          <section className="dashboard-title-bar">
            <div>
              <h1>FocusBoard Dashboard</h1>
              <p>
                Manage, prioritize, and track your daily engineering workflows with
                clarity.
              </p>
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleOpenCreateModal}
              aria-label="Add new task"
            >
              <Plus size={16} strokeWidth={2.5} aria-hidden="true" />
              <span>Add Task</span>
            </button>
          </section>

          {/* Dynamic Statistics Cards */}
          <section
            className="stats-grid"
            aria-label="Dashboard Statistics Overview"
          >
            <StatCard
              title="Total Tasks"
              value={totalTasks}
              icon={CheckSquare}
              variant="total"
              subtitle={`${todoTasks} waiting in backlog`}
            />
            <StatCard
              title="In Progress"
              value={inProgressTasks}
              icon={Clock}
              variant="inprogress"
              subtitle="Currently active in sprint"
            />
            <StatCard
              title="Completed"
              value={completedTasks}
              icon={CheckCircle2}
              variant="completed"
              subtitle="Finished deliverables"
            />
            <StatCard
              title="Completion Rate"
              value={`${completionPercentage}%`}
              icon={TrendingUp}
              variant="rate"
              subtitle={`${completedTasks} of ${totalTasks} completed`}
              progress={completionPercentage}
            />
          </section>

          {/* Focus Notes 3-Slide Carousel */}
          <FocusNotes />

          {/* Task Management Section */}
          <section className="task-section" aria-label="Tasks Management">
            <div className="task-section-header">
              <div className="task-section-title-wrap">
                <h2>Task Board</h2>
                <span className="task-count-badge">
                  {filteredTasks.length} {filteredTasks.length === 1 ? "task" : "tasks"}
                </span>
              </div>
            </div>

            {/* Search and Filters Bar */}
            <div className="filter-bar-container">
              <SearchBar
                searchQuery={searchQuery}
                onSearchChange={setSearchQuery}
                onClearSearch={() => setSearchQuery("")}
              />

              <FilterTabs
                selectedStatus={selectedStatus}
                onStatusChange={setSelectedStatus}
                selectedPriority={selectedPriority}
                onPriorityChange={setSelectedPriority}
                onClearFilters={handleClearFilters}
                hasActiveFilters={hasActiveFilters}
                statusCounts={statusCounts}
              />
            </div>

            {/* Task List Grid with Empty States */}
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
        </main>
      </div>

      {/* Task Create / Edit Modal Dialog */}
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
