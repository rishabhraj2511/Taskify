import {
  TrendingUp,
  Calendar,
  AlertTriangle,
  Activity,
  Heart,
} from "lucide-react";
import { analyticsData, teamMembers } from "../data/dummyData";

function Analytics() {
  const chartHeight = 160;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Analytics</h1>
          <p className="text-slate-400">Track productivity and team performance</p>
        </div>
        <div className="flex gap-2">
          <button className="px-4 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-sm font-medium transition-colors">
            This Week
          </button>
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-600 text-white rounded-lg text-sm font-medium">
            This Month
          </button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-400">Total Tasks</p>
            <Activity className="text-blue-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-blue-400">{analyticsData.totalTasks}</p>
          <p className="text-xs text-slate-400 mt-2">+12 from last week</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-green-500/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-400">Completed</p>
            <TrendingUp className="text-green-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-green-400">{analyticsData.completedTasks}</p>
          <p className="text-xs text-slate-400 mt-2">{analyticsData.completionRate}% rate</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-400">Pending</p>
            <Calendar className="text-yellow-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-yellow-400">{analyticsData.pendingTasks}</p>
          <p className="text-xs text-slate-400 mt-2">In progress or to do</p>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-red-500/30 transition-colors">
          <div className="flex items-center justify-between mb-3">
            <p className="text-sm text-slate-400">Overdue</p>
            <AlertTriangle className="text-red-400" size={20} />
          </div>
          <p className="text-3xl font-bold text-red-400">{analyticsData.overdueTasks}</p>
          <p className="text-xs text-slate-400 mt-2">Require attention</p>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Trend */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Weekly Productivity Trend</h3>
          <div className="h-64 flex items-end gap-2">
            {analyticsData.weeklyTrend.map((value, idx) => {
              const maxValue = Math.max(...analyticsData.weeklyTrend);
              const height = (value / maxValue) * chartHeight;
              const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
              return (
                <div
                  key={idx}
                  className="flex-1 group cursor-pointer"
                  title={`${days[idx]}: ${value}%`}
                >
                  <div className="relative">
                    <div className="bg-gradient-to-t from-purple-600 to-blue-600 rounded-t-lg opacity-70 group-hover:opacity-100 transition-all group-hover:shadow-lg group-hover:shadow-purple-500/30 h-full"
                      style={{ height: `${height}px` }}
                    ></div>
                    <div className="text-center mt-2">
                      <p className="text-xs font-bold text-purple-400">{value}%</p>
                      <p className="text-xs text-slate-400">{days[idx]}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Tasks by Priority */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Tasks by Priority</h3>
          <div className="space-y-4">
            {/* High Priority */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">
                  🔴 High Priority
                </span>
                <span className="text-sm font-bold text-red-400">
                  {analyticsData.tasksByPriority.high}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-red-500 rounded-full"
                  style={{
                    width: `${(analyticsData.tasksByPriority.high / analyticsData.totalTasks) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {Math.round(
                  (analyticsData.tasksByPriority.high / analyticsData.totalTasks) * 100
                )}% of total
              </p>
            </div>

            {/* Medium Priority */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">
                  🟡 Medium Priority
                </span>
                <span className="text-sm font-bold text-yellow-400">
                  {analyticsData.tasksByPriority.medium}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-full"
                  style={{
                    width: `${(analyticsData.tasksByPriority.medium / analyticsData.totalTasks) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {Math.round(
                  (analyticsData.tasksByPriority.medium / analyticsData.totalTasks) * 100
                )}% of total
              </p>
            </div>

            {/* Low Priority */}
            <div>
              <div className="flex justify-between items-center mb-2">
                <span className="text-sm font-medium text-slate-300">
                  🟢 Low Priority
                </span>
                <span className="text-sm font-bold text-green-400">
                  {analyticsData.tasksByPriority.low}
                </span>
              </div>
              <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-600 to-green-500 rounded-full"
                  style={{
                    width: `${(analyticsData.tasksByPriority.low / analyticsData.totalTasks) * 100}%`,
                  }}
                ></div>
              </div>
              <p className="text-xs text-slate-400 mt-1">
                {Math.round(
                  (analyticsData.tasksByPriority.low / analyticsData.totalTasks) * 100
                )}% of total
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Team Performance & Health */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Team Performance */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">Team Performance</h3>
          <div className="space-y-3">
            {teamMembers.slice(0, 4).map((member) => (
              <div key={member.id} className="flex items-center gap-4">
                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                  {member.avatar}
                </div>
                <div className="flex-1">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-medium text-slate-300">{member.name}</p>
                    <span className="text-xs font-bold text-purple-400">
                      {Math.round((member.tasksCompleted / 52) * 100)}%
                    </span>
                  </div>
                  <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"
                      style={{
                        width: `${(member.tasksCompleted / 52) * 100}%`,
                      }}
                    ></div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* System Health & Risk */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6">
          <h3 className="text-lg font-semibold text-white mb-6">System Health</h3>
          <div className="space-y-4">
            {/* Overall Health */}
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-300">Overall Health</p>
                <span className="text-lg font-bold text-green-400">
                  {analyticsData.teamHealth}%
                </span>
              </div>
              <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-green-600 to-emerald-500 rounded-full"
                  style={{
                    width: `${analyticsData.teamHealth}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Burnout Risk */}
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <p className="text-sm font-medium text-slate-300 mb-3">Burnout Risk</p>
              <div className="flex items-center gap-3">
                <Heart
                  className={
                    analyticsData.burnoutRisk === "high"
                      ? "text-red-400"
                      : analyticsData.burnoutRisk === "medium"
                      ? "text-yellow-400"
                      : "text-green-400"
                  }
                />
                <span className="text-sm font-semibold text-slate-200">
                  {analyticsData.burnoutRisk === "high"
                    ? "⚠️ High Risk - Team needs rest"
                    : analyticsData.burnoutRisk === "medium"
                    ? "⚠️ Medium Risk - Consider workload reduction"
                    : "✅ Low Risk - Team is healthy"}
                </span>
              </div>
            </div>

            {/* Productivity Score */}
            <div className="p-4 bg-slate-700/30 rounded-lg border border-slate-600/30">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium text-slate-300">Productivity Score</p>
                <span className="text-lg font-bold text-blue-400">
                  {analyticsData.productivityScore}/100
                </span>
              </div>
              <div className="w-full h-3 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-blue-600 to-cyan-500 rounded-full"
                  style={{
                    width: `${analyticsData.productivityScore}%`,
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Additional Insights */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Completion Time */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/30 transition-colors">
          <p className="text-sm text-slate-400 mb-2">Avg. Completion Time</p>
          <p className="text-4xl font-bold text-cyan-400 mb-2">
            {analyticsData.avgCompletionTime}
          </p>
          <p className="text-xs text-slate-400">days per task</p>
        </div>

        {/* Completion Rate */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-green-500/30 transition-colors">
          <p className="text-sm text-slate-400 mb-2">Completion Rate</p>
          <p className="text-4xl font-bold text-green-400 mb-2">
            {analyticsData.completionRate}%
          </p>
          <p className="text-xs text-slate-400">of all tasks</p>
        </div>

        {/* Productivity Trend */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <p className="text-sm text-slate-400 mb-2">Productivity Trend</p>
          <p className="text-4xl font-bold text-purple-400 mb-2">↗ +12%</p>
          <p className="text-xs text-slate-400">vs last week</p>
        </div>
      </div>
    </div>
  );
}

export default Analytics;