import { Trophy, Users, TrendingUp, Medal, Star, Target, Globe, Mail } from "lucide-react";
import { teamMembers } from "../data/dummyData";

function Team() {
  // Sort by points for leaderboard
  const sortedTeam = [...teamMembers].sort((a, b) => b.points - a.points);

  // Calculate team stats
  const totalTasksCompleted = teamMembers.reduce((sum, m) => sum + m.tasksCompleted, 0);
  const avgContribution = Math.round(
    teamMembers.reduce((sum, m) => sum + m.contributionScore, 0) / teamMembers.length
  );
  const teamHealth = 85;

  return (
    <div className="max-w-7xl mx-auto space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-white mb-2">Team Dashboard</h1>
          <p className="text-slate-400">
            {teamMembers.length} team members • {totalTasksCompleted} tasks completed
          </p>
        </div>
        <button className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 text-white font-semibold rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/30">
          Invite Member
        </button>
      </div>

      {/* Team Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-green-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Total Members</p>
              <p className="text-3xl font-bold text-green-400 mt-2">{teamMembers.length}</p>
            </div>
            <Users className="text-green-400" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-blue-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Tasks Completed</p>
              <p className="text-3xl font-bold text-blue-400 mt-2">{totalTasksCompleted}</p>
            </div>
            <Target className="text-blue-400" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-purple-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Avg Contribution</p>
              <p className="text-3xl font-bold text-purple-400 mt-2">{avgContribution}</p>
            </div>
            <TrendingUp className="text-purple-400" size={32} />
          </div>
        </div>

        <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-yellow-500/30 transition-colors">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-slate-400">Team Health</p>
              <p className="text-3xl font-bold text-yellow-400 mt-2">{teamHealth}%</p>
            </div>
            <Trophy className="text-yellow-400" size={32} />
          </div>
        </div>
      </div>

      {/* Leaderboard */}
      <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-8">
        <div className="flex items-center gap-3 mb-8">
          <Trophy className="text-yellow-400" size={28} />
          <h2 className="text-2xl font-bold text-white">Leaderboard</h2>
        </div>

        <div className="space-y-3">
          {sortedTeam.map((member, index) => {
            const medal =
              index === 0 ? "🥇" : index === 1 ? "🥈" : index === 2 ? "🥉" : "  ";
            const medal_color =
              index === 0
                ? "from-yellow-600 to-yellow-700"
                : index === 1
                ? "from-slate-400 to-slate-500"
                : index === 2
                ? "from-orange-600 to-orange-700"
                : "from-slate-700 to-slate-800";

            return (
              <div
                key={member.id}
                className={`group bg-gradient-to-r ${medal_color}/30 hover:${medal_color}/50 border border-slate-600/50 hover:border-slate-500 rounded-xl p-5 transition-all duration-300 transform hover:scale-105 hover:shadow-lg`}
              >
                <div className="flex items-center gap-4">
                  {/* Rank Badge */}
                  <div className="text-2xl font-bold text-slate-300 w-12 text-center">
                    {medal || `#${index + 1}`}
                  </div>

                  {/* Member Info */}
                  <div className="flex-1 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                      {member.avatar}
                    </div>
                    <div>
                      <h3 className="font-semibold text-white group-hover:text-purple-300 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-xs text-slate-400">{member.role}</p>
                    </div>
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-slate-100">
                        {member.tasksCompleted}
                      </p>
                      <p className="text-xs text-slate-400">Tasks</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-purple-400">
                        {member.streak}
                      </p>
                      <p className="text-xs text-slate-400">Streak 🔥</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-yellow-400">
                        {member.points}
                      </p>
                      <p className="text-xs text-slate-400">Points</p>
                    </div>
                  </div>

                  {/* Action Button */}
                  <button className="px-4 py-2 bg-gradient-to-r from-purple-600/20 to-blue-600/20 hover:from-purple-600/40 hover:to-blue-600/40 text-slate-300 hover:text-white rounded-lg transition-all text-sm font-medium border border-purple-500/20 hover:border-purple-500/40">
                    View Profile
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Team Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {teamMembers.map((member) => (
          <div
            key={member.id}
            className="group bg-gradient-to-br from-slate-800/50 to-slate-900/50 rounded-2xl border border-slate-700/50 p-6 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/10"
          >
            {/* Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                  {member.avatar}
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white group-hover:text-purple-300 transition-colors">
                    {member.name}
                  </h3>
                  <p className="text-xs text-slate-400">{member.role}</p>
                </div>
              </div>
              <Star className="text-yellow-400" size={20} />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                <p className="text-sm font-bold text-slate-100">{member.tasksCompleted}</p>
                <p className="text-xs text-slate-400">Completed</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                <p className="text-sm font-bold text-purple-400">{member.points}</p>
                <p className="text-xs text-slate-400">Points</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                <p className="text-sm font-bold text-yellow-400">{member.streak} 🔥</p>
                <p className="text-xs text-slate-400">Streak</p>
              </div>
              <div className="bg-slate-700/30 rounded-lg p-3 text-center">
                <p className="text-sm font-bold text-red-400">{member.tasksDueToday}</p>
                <p className="text-xs text-slate-400">Due Today</p>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <p className="text-xs font-semibold text-slate-300">Contribution</p>
                <p className="text-xs font-bold text-purple-400">{member.contributionScore}</p>
              </div>
              <div className="w-full h-2 bg-slate-700/50 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-purple-500 to-blue-600 rounded-full"
                  style={{
                    width: `${(member.contributionScore / 3250) * 100}%`,
                  }}
                ></div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-2">
              <button className="flex-1 px-3 py-2 bg-slate-700/50 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                <Mail size={14} /> Message
              </button>
              <button className="flex-1 px-3 py-2 bg-gradient-to-r from-purple-600/30 to-blue-600/30 hover:from-purple-600/50 hover:to-blue-600/50 text-purple-300 rounded-lg text-xs font-medium transition-colors flex items-center justify-center gap-1">
                <Globe size={14} /> View
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;