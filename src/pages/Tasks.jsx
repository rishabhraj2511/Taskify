import { useState } from "react";
import { Plus, Zap } from "lucide-react";
import TaskCard from "../components/TaskCard";
import { dummyTasks } from "../data/dummyData";

function Tasks() {
  const [tasks, setTasks] = useState(dummyTasks);
  const [showNewTaskForm, setShowNewTaskForm] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    priority: "Medium",
    deadline: "",
    assignee: "",
  });

  const columns = {
    todo: { label: "To Do", count: tasks.filter((t) => t.status === "todo").length },
    inprogress: { label: "In Progress", count: tasks.filter((t) => t.status === "inprogress").length },
    done: { label: "Done", count: tasks.filter((t) => t.status === "done").length },
  };

  const handleAddTask = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    const newTask = {
      id: Math.max(...tasks.map((t) => t.id), 0) + 1,
      ...formData,
      status: "todo",
      riskLevel: "low",
      tags: ["new"],
    };

    setTasks([...tasks, newTask]);
    setFormData({
      title: "",
      description: "",
      priority: "Medium",
      deadline: "",
      assignee: "",
    });
    setShowNewTaskForm(false);
  };

  const handleMoveTask = (taskId, newStatus) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    );
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const getTasksByStatus = (status) => tasks.filter((t) => t.status === status);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Task Management</h1>
          <p className="text-slate-400">
            {tasks.length} total tasks • {tasks.filter((t) => t.status === "done").length} completed
          </p>
        </div>
        <button
          onClick={() => setShowNewTaskForm(!showNewTaskForm)}
          className="flex items-center gap-2 px-4 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30 transform hover:scale-105"
        >
          <Plus size={20} />
          New Task
        </button>
      </div>

      {/* New Task Form */}
      {showNewTaskForm && (
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-4">Create New Task</h3>
          <form onSubmit={handleAddTask} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm text-slate-300 mb-2">Task Title</label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter task title..."
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Assignee</label>
                <input
                  type="text"
                  value={formData.assignee}
                  onChange={(e) => setFormData({ ...formData, assignee: e.target.value })}
                  placeholder="Enter assignee name..."
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Priority</label>
                <select
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:border-purple-500 focus:outline-none transition-colors"
                >
                  <option>Low</option>
                  <option>Medium</option>
                  <option>High</option>
                </select>
              </div>
              <div>
                <label className="block text-sm text-slate-300 mb-2">Deadline</label>
                <input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                  className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 focus:border-purple-500 focus:outline-none transition-colors"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm text-slate-300 mb-2">Description</label>
              <textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter task description..."
                className="w-full px-4 py-2 bg-slate-700/50 border border-slate-600 rounded-lg text-slate-100 placeholder-slate-500 focus:border-purple-500 focus:outline-none transition-colors resize-none h-24"
              />
            </div>
            <div className="flex gap-3">
              <button
                type="submit"
                className="px-6 py-2 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all"
              >
                Create Task
              </button>
              <button
                type="button"
                onClick={() => setShowNewTaskForm(false)}
                className="px-6 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 font-semibold rounded-lg transition-all"
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Kanban Board */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {Object.entries(columns).map(([key, header]) => (
          <div
            key={key}
            className="bg-gradient-to-br from-slate-900/30 to-slate-950/30 rounded-2xl border border-slate-700/30 p-6 group hover:border-purple-500/20 transition-colors"
          >
            {/* Column Header */}
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-slate-700/50">
              <div>
                <h2 className="text-lg font-semibold text-white">{header.label}</h2>
                <p className="text-xs text-slate-400 mt-1">{header.count} tasks</p>
              </div>
              <div className="px-3 py-1 bg-slate-700/50 rounded-full text-sm font-bold text-slate-300">
                {header.count}
              </div>
            </div>

            {/* Tasks List */}
            <div className="space-y-3 min-h-64">
              {getTasksByStatus(key).length > 0 ? (
                getTasksByStatus(key).map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDelete={handleDeleteTask}
                    onMove={handleMoveTask}
                  />
                ))
              ) : (
                <div className="flex flex-col items-center justify-center min-h-48 text-center">
                  <div className="text-4xl mb-2">🎯</div>
                  <p className="text-sm text-slate-400">No tasks here yet</p>
                  <p className="text-xs text-slate-500 mt-1">
                    {key === "todo" && "Create a new task to get started"}
                    {key === "inprogress" && "Start working on a task"}
                    {key === "done" && "Complete tasks will appear here"}
                  </p>
                </div>
              )}
            </div>

            {/* Add Task Button */}
            {key === "todo" && (
              <button
                onClick={() => setShowNewTaskForm(true)}
                className="w-full mt-4 py-2 px-4 border-2 border-dashed border-slate-600 hover:border-purple-500 text-slate-400 hover:text-purple-400 rounded-lg transition-colors text-sm font-medium"
              >
                + Add Task
              </button>
            )}
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Completion Rate</p>
              <p className="text-3xl font-bold text-green-400 mt-2">
                {Math.round(
                  (tasks.filter((t) => t.status === "done").length / tasks.length) * 100
                )}%
              </p>
            </div>
            <div className="text-4xl">✅</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">High Priority Tasks</p>
              <p className="text-3xl font-bold text-red-400 mt-2">
                {tasks.filter((t) => t.priority === "High").length}
              </p>
            </div>
            <div className="text-4xl">🔴</div>
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Avg. Priority</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">
                {
                  [
                    ...new Set(
                      tasks.map((t) =>
                        t.priority === "High" ? 3 : t.priority === "Medium" ? 2 : 1
                      )
                    ),
                  ].reduce((a, b) => a + b, 0) / tasks.length
                }
              </p>
            </div>
            <div className="text-4xl">📊</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Tasks;