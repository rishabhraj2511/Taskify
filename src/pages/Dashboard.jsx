import {
  CheckCircle2,
  Clock,
  TrendingUp,
  AlertCircle,
  Zap,
  Target,
  Users,
  Flame,
} from "lucide-react";
import Card from "../components/Card";
import { dashboardStats, dummyTasks, teamMembers } from "../data/dummyData";

function Dashboard() {
  // Calculate stats
  const completedTasks = dummyTasks.filter((t) => t.status === "done").length;
  const pendingTasks = dummyTasks.filter((t) => t.status === "todo" || t.status === "inprogress").length;
  const totalTasks = dummyTasks.length;
  const completionRate = Math.round((completedTasks / totalTasks) * 100);

  // Get recent tasks
  const recentTasks = dummyTasks.slice(0, 5);

  // Top performers
  const topPerformers = [...teamMembers].sort((a, b) => b.points - a.points).slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Hero Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card
          title="Completed Tasks"
          value={completedTasks}
          subtitle={`of ${totalTasks} total`}
          icon={CheckCircle2}
          gradient="from-green-600 to-emerald-600"
          trend="+5"
          trendPositive={true}
        />
        <Card
          title="Pending Tasks"
          value={pendingTasks}
          subtitle="Need your attention"
          icon={Clock}
          gradient="from-blue-600 to-cyan-600"
          trend="-2"
          trendPositive={true}
        />
        <Card
          title="Productivity %"
          value={completionRate + "%"}
          subtitle="Keep it going!"
          icon={TrendingUp}
          gradient="from-purple-600 to-pink-600"
          trend="+12%"
          trendPositive={true}
        />
      </div>

      {/* Risk Alerts & Stats Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Risk Alerts */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-red-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-red-500/20 rounded-lg">
              <AlertCircle className="text-red-400" size={20} />
            </div>
            <h2 className="text-lg font-semibold text-white">Risk Alerts</h2>
            <span className="ml-auto text-xs px-2 py-1 bg-red-500/20 text-red-300 rounded-full">
              {dashboardStats.riskAlerts.length} alerts
            </span>
          </div>

          <div className="space-y-3">
            {dashboardStats.riskAlerts.map((alert) => (
              <div
                key={alert.id}
                className={`p-3 rounded-lg border cursor-pointer transition-all ${
                  alert.severity === "high"
                    ? "bg-red-500/10 border-red-500/30 hover:border-red-500/50"
                    : "bg-yellow-500/10 border-yellow-500/30 hover:border-yellow-500/50"
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`p-1 rounded-full mt-0.5 ${
                      alert.severity === "high"
                        ? "bg-red-500/30"
                        : "bg-yellow-500/30"
                    }`}
                  >
                    <div
                      className={`w-2 h-2 rounded-full ${
                        alert.severity === "high" ? "bg-red-500" : "bg-yellow-500"
                      }`}
                    ></div>
                  </div>
                  <div>
                    <p
                      className={`text-sm font-medium ${
                        alert.severity === "high"
                          ? "text-red-300"
                          : "text-yellow-300"
                      }`}
                    >
                      {alert.message}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="space-y-4">
          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-purple-500/20 rounded-lg">
                <Flame className="text-purple-400" size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Current Streak</p>
                <p className="text-2xl font-bold text-white">15 days 🔥</p>
              </div>
            </div>
            <p className="text-xs text-slate-400">
              Keep the momentum going!
            </p>
          </div>

          <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-blue-500/30 transition-colors">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-blue-500/20 rounded-lg">
                <Zap className="text-blue-400" size={20} />
              </div>
              <div>
                <p className="text-xs text-slate-400">Productivity Score</p>
                <p className="text-2xl font-bold text-white">78/100</p>
              </div>
            </div>
            <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
              <div className="w-3/4 h-full bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Recent Tasks & Team */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tasks */}
        <div className="lg:col-span-2 bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-cyan-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-cyan-500/20 rounded-lg">
              <Target className="text-cyan-400" size={20} />
            </div>
            <h2 className="text-lg font-semibold text-white">Recent Tasks</h2>
          </div>

          <div className="space-y-2">
            {recentTasks.map((task) => (
              <div
                key={task.id}
                className="p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-cyan-500/30 transition-all cursor-pointer group"
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <h4 className="text-sm font-medium text-slate-200 group-hover:text-cyan-300 transition-colors">
                      {task.title}
                    </h4>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs px-2 py-0.5 bg-slate-600/50 text-slate-300 rounded">
                        {task.assignee}
                      </span>
                      <span
                        className={`text-xs font-semibold px-2 py-0.5 rounded ${
                          task.priority === "High"
                            ? "bg-red-500/20 text-red-300"
                            : task.priority === "Medium"
                            ? "bg-yellow-500/20 text-yellow-300"
                            : "bg-green-500/20 text-green-300"
                        }`}
                      >
                        {task.priority}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-slate-400">{task.deadline}</p>
                    <span
                      className={`text-xs font-semibold px-2 py-1 rounded-full ${
                        task.status === "done"
                          ? "bg-green-500/20 text-green-300"
                          : task.status === "inprogress"
                          ? "bg-blue-500/20 text-blue-300"
                          : "bg-slate-600/50 text-slate-300"
                      }`}
                    >
                      {task.status === "done"
                        ? "Done"
                        : task.status === "inprogress"
                        ? "In Progress"
                        : "To Do"}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Performers */}
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 bg-yellow-500/20 rounded-lg">
              <Users className="text-yellow-400" size={20} />
            </div>
            <h2 className="text-lg font-semibold text-white">Top Performers</h2>
          </div>

          <div className="space-y-3">
            {topPerformers.map((member, index) => (
              <div
                key={member.id}
                className="p-3 bg-slate-700/30 hover:bg-slate-700/50 rounded-lg border border-slate-600/30 hover:border-yellow-500/30 transition-all"
              >
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <div className="w-8 h-8 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white text-xs font-bold">
                      {member.avatar}
                    </div>
                    {index === 0 && (
                      <span className="absolute top-0 right-0 text-lg">👑</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <h4 className="text-sm font-semibold text-slate-200">
                      {member.name}
                    </h4>
                    <p className="text-xs text-slate-400">{member.points} points</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-purple-400">
                      #{index + 1}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Gamification Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-green-500/30 transition-colors">
          <h3 className="font-semibold text-white mb-4">🎮 Achievements</h3>
          <div className="grid grid-cols-3 gap-2">
            {[
              { emoji: "🎯", label: "Focus" },
              { emoji: "⚡", label: "Speed" },
              { emoji: "🔥", label: "Streak" },
            ].map((achievement, idx) => (
              <div
                key={idx}
                className="p-3 bg-slate-700/30 rounded-lg text-center hover:bg-slate-700/50 transition-colors cursor-pointer"
              >
                <div className="text-2xl mb-1">{achievement.emoji}</div>
                <p className="text-xs text-slate-400">{achievement.label}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-pink-500/30 transition-colors">
          <h3 className="font-semibold text-white mb-4">🏆 Badges Earned</h3>
          <div className="space-y-2">
            <div className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg">
              <span className="text-xl">🥇</span>
              <span className="text-sm text-slate-300">Early Bird (5 days streak)</span>
            </div>
            <div className="flex items-center gap-3 p-2 bg-slate-700/30 rounded-lg">
              <span className="text-xl">💯</span>
              <span className="text-sm text-slate-300">Perfect Week</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;