import { Trash2, AlertCircle, Calendar } from "lucide-react";

function TaskCard({ task, onDelete, onMove }) {
  const isOverdue = new Date(task.deadline) < new Date() && task.status !== "done";
  const isUrgent = new Date(task.deadline) - new Date() < 24 * 60 * 60 * 1000 && task.status !== "done";

  const priorityColors = {
    High: "bg-red-500/20 text-red-400 border-red-500/30",
    Medium: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30",
    Low: "bg-green-500/20 text-green-400 border-green-500/30",
  };

  const riskBadges = {
    high: "bg-red-500/20 text-red-300",
    medium: "bg-yellow-500/20 text-yellow-300",
    low: "bg-green-500/20 text-green-300",
  };

  return (
    <div
      className={`group relative p-4 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-lg border border-slate-700/50 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10 cursor-move transform hover:scale-105 hover:-translate-y-1 ${
        isOverdue ? "border-red-500/50 bg-red-500/5" : ""
      }`}
    >
      {/* Risk & Status Indicators */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex flex-wrap gap-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded border ${priorityColors[task.priority]}`}>
            {task.priority}
          </span>
          {task.riskLevel && (
            <span className={`px-2 py-1 text-xs font-semibold rounded ${riskBadges[task.riskLevel]}`}>
              {task.riskLevel} risk
            </span>
          )}
        </div>
        <button
          onClick={() => onDelete(task.id)}
          className="opacity-0 group-hover:opacity-100 p-1 hover:bg-red-500/20 rounded transition-all text-red-400 hover:text-red-300"
        >
          <Trash2 size={16} />
        </button>
      </div>

      {/* Title */}
      <h3 className="font-semibold text-slate-100 mb-2 line-clamp-2 group-hover:text-purple-300 transition-colors">
        {task.title}
      </h3>

      {/* Description */}
      <p className="text-xs text-slate-400 mb-3 line-clamp-2">{task.description}</p>

      {/* Assignee & Deadline */}
      <div className="space-y-2 mb-3 text-xs">
        <div className="flex items-center gap-2 text-slate-400">
          <div className="w-6 h-6 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">
            {task.assignee.charAt(0)}
          </div>
          <span>{task.assignee}</span>
        </div>
        <div className={`flex items-center gap-2 ${isOverdue ? "text-red-400" : isUrgent ? "text-yellow-400" : "text-slate-400"}`}>
          <Calendar size={14} />
          <span>{task.deadline}</span>
          {isOverdue && <AlertCircle size={14} className="ml-auto" />}
        </div>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1">
        {task.tags?.slice(0, 2).map((tag) => (
          <span key={tag} className="px-2 py-0.5 text-xs bg-slate-700/50 text-slate-300 rounded-full">
            #{tag}
          </span>
        ))}
      </div>

      {/* Move Buttons (for Kanban) */}
      <div className="mt-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-all">
        {task.status === "todo" && (
          <button
            onClick={() => onMove(task.id, "inprogress")}
            className="flex-1 text-xs py-1 bg-blue-500/20 hover:bg-blue-500/40 text-blue-400 rounded border border-blue-500/30 transition-colors"
          >
            Start
          </button>
        )}
        {task.status === "inprogress" && (
          <button
            onClick={() => onMove(task.id, "done")}
            className="flex-1 text-xs py-1 bg-green-500/20 hover:bg-green-500/40 text-green-400 rounded border border-green-500/30 transition-colors"
          >
            Complete
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskCard;
