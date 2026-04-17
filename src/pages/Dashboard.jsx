import { useState, useMemo } from 'react';
import { useOutletContext } from 'react-router-dom';
import { CheckCircle2, Clock, TrendingUp, Users, Trophy, Briefcase } from 'lucide-react';
import Card from '../components/Card';
import { initialTeams, initialProjects, teamMembers } from '../data/dummyData';
import { buildLiveMemberStats } from '../utils/teamInsights';

function StatCard({ icon, label, value, sub, color, gradient = false }) {
  const Icon = icon;
  return (
    <Card gradient={gradient} style={{ padding: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <p style={{ fontSize: '0.72rem', color: '#64748b', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em', marginBottom: '8px' }}>{label}</p>
          <p style={{ fontSize: '2rem', fontWeight: 800, color: 'white', lineHeight: 1, letterSpacing: '-0.03em' }}>{value}</p>
          {sub && <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '6px' }}>{sub}</p>}
        </div>
        <div style={{
          width: '42px', height: '42px', borderRadius: '12px',
          background: `linear-gradient(135deg, ${color})`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: `0 0 20px ${color.split(',')[0].replace('rgba(', '').replace(')', '')}`,
          flexShrink: 0,
        }}>
          <Icon size={20} color="white" />
        </div>
      </div>
    </Card>
  );
}

function Rank({ rank }) {
  if (rank === 1) return <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#fbbf24' }}>🏆 1st</span>;
  if (rank === 2) return <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#94a3b8' }}>🥈 2nd</span>;
  if (rank === 3) return <span style={{ fontSize: '0.9rem', fontWeight: 700, color: '#cd7c2d' }}>🥉 3rd</span>;
  return null;
}

export default function Dashboard() {
  const context = useOutletContext() || {};
  const { tasks: outletTasks } = context;
  const [user] = useState(() => {
    try {
      const currentUser = JSON.parse(localStorage.getItem('taskify.user') || 'null');
      return currentUser && currentUser.role ? currentUser : null;
    } catch {
      return null;
    }
  });
  const [teams] = useState(() => {
    try {
      const allTeams = JSON.parse(localStorage.getItem('taskify.teams') || '[]');
      return allTeams.length > 0 ? allTeams : initialTeams;
    } catch {
      return initialTeams;
    }
  });
  const [projects] = useState(() => {
    try {
      const allProjects = JSON.parse(localStorage.getItem('taskify.projects') || '[]');
      return allProjects.length > 0 ? allProjects : initialProjects;
    } catch {
      return initialProjects;
    }
  });

  // Use outlet tasks or fallback to localStorage
  const tasks = outletTasks || (() => {
    const TASKS_STORAGE_KEY = 'taskify.tasks.v1';
    const stored = localStorage.getItem(TASKS_STORAGE_KEY);
    try {
      return stored ? JSON.parse(stored) : { todo: [], inprogress: [], done: [] };
    } catch {
      return { todo: [], inprogress: [], done: [] };
    }
  })();

  // Calculate stats
  const totalTodo = tasks?.todo?.length || 0;
  const totalIP = tasks?.inprogress?.length || 0;
  const totalDone = tasks?.done?.length || 0;
  const totalTasks = totalTodo + totalIP + totalDone;
  const productivity = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

  // Get top performers
  const topMembers = useMemo(() => {
    return buildLiveMemberStats(tasks, teamMembers)
      .sort((a, b) => b.livePoints - a.livePoints)
      .slice(0, 3);
  }, [tasks]);

  // Get top teams
  const topTeams = useMemo(() => {
    return [...teams]
      .sort((a, b) => b.performanceScore - a.performanceScore)
      .slice(0, 3);
  }, [teams]);

  // Get team lead data
  const teamLeadTeam = useMemo(() => {
    if (user?.role === 'TEAM_LEAD') {
      return teams.find(t => t.leadDetails?.email === user?.email);
    }
    return null;
  }, [user, teams]);

  const teamLeadMembers = useMemo(() => {
    if (teamLeadTeam) {
      const teamMemberIds = teamLeadTeam.members || [];
      const members = teamMembers.filter(m => teamMemberIds.includes(m.id));
      return buildLiveMemberStats(tasks, members)
        .sort((a, b) => b.livePoints - a.livePoints)
        .slice(0, 3);
    }
    return [];
  }, [teamLeadTeam, tasks]);

  if (!user) {
    return <div style={{ color: '#94a3b8' }}>Loading...</div>;
  }

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
          {user.role === 'MANAGER' ? 'Manager Dashboard' : user.role === 'TEAM_LEAD' ? 'Team Lead Dashboard' : 'My Dashboard'}
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
          Welcome, {user.name} • {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* ─── MANAGER VIEW ─── */}
      {user.role === 'MANAGER' && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <StatCard
              icon={Users}
              label="Total Teams"
              value={teams.length}
              sub={`${projects.length} projects`}
              color="rgba(124,58,237,0.7), rgba(37,99,235,0.9)"
              gradient
            />
            <StatCard
              icon={Briefcase}
              label="Active Projects"
              value={projects.filter(p => p.status === 'in-progress').length}
              sub={`${projects.length} total`}
              color="rgba(59,130,246,0.7), rgba(29,78,216,0.9)"
            />
            <StatCard
              icon={CheckCircle2}
              label="Completed Tasks"
              value={totalDone}
              sub={`${productivity}% rate`}
              color="rgba(16,185,129,0.7), rgba(5,150,105,0.9)"
            />
            <StatCard
              icon={TrendingUp}
              label="Avg Performance"
              value={`${Math.round((teams.reduce((sum, t) => sum + t.performanceScore, 0) / teams.length) || 0)}%`}
              sub="Team average"
              color="rgba(245,158,11,0.7), rgba(217,119,6,0.9)"
            />
          </div>

          {/* Top 3 Teams */}
          <Card style={{ padding: '24px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Trophy size={20} color="#fbbf24" />
              <h3 style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>Top 3 Performing Teams</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {topTeams.map((team, idx) => (
                <div key={team.id} style={{
                  background: 'rgba(10,22,40,0.8)',
                  border: '1px solid rgba(30,58,95,0.5)',
                  borderRadius: '12px',
                  padding: '16px',
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Rank rank={idx + 1} />
                  </div>
                  <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '8px' }}>{team.name}</h4>
                  <p style={{ fontSize: '0.85rem', color: '#94a3b8', marginBottom: '12px' }}>
                    Lead: {team.leadDetails?.name}
                  </p>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
                    fontSize: '0.8rem', color: '#cbd5e1',
                  }}>
                    <div>Tasks: <span style={{ color: '#a78bfa', fontWeight: 700 }}>{team.tasksCompleted}</span></div>
                    <div>Score: <span style={{ color: '#7c3aed', fontWeight: 700 }}>{team.performanceScore}%</span></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* ─── TEAM LEAD VIEW ─── */}
      {user.role === 'TEAM_LEAD' && teamLeadTeam && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <StatCard
              icon={Users}
              label="Team Members"
              value={teamLeadTeam.members?.length || 0}
              sub={`In ${teamLeadTeam.name}`}
              color="rgba(124,58,237,0.7), rgba(37,99,235,0.9)"
              gradient
            />
            <StatCard
              icon={CheckCircle2}
              label="Tasks Done"
              value={teamLeadTeam.tasksCompleted}
              sub="This period"
              color="rgba(16,185,129,0.7), rgba(5,150,105,0.9)"
            />
            <StatCard
              icon={TrendingUp}
              label="Team Performance"
              value={`${teamLeadTeam.performanceScore}%`}
              sub="Overall score"
              color="rgba(245,158,11,0.7), rgba(217,119,6,0.9)"
            />
            <StatCard
              icon={Briefcase}
              label="Total Points"
              value={teamLeadTeam.totalPoints?.toLocaleString()}
              sub="Contribution"
              color="rgba(168,85,247,0.7), rgba(126,34,206,0.9)"
            />
          </div>

          {/* Top 3 Team Members */}
          <Card style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Trophy size={20} color="#fbbf24" />
              <h3 style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>Top 3 Team Members</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {teamLeadMembers.map((member, idx) => (
                <div key={member.id} style={{
                  background: 'rgba(10,22,40,0.8)',
                  border: '1px solid rgba(30,58,95,0.5)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Rank rank={idx + 1} />
                  </div>
                  <div style={{
                    width: '48px', height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${member.color})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '1rem',
                    margin: '0 auto 12px',
                  }}>
                    {member.avatar}
                  </div>
                  <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '4px' }}>{member.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>{member.role}</p>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
                    fontSize: '0.8rem', color: '#cbd5e1',
                  }}>
                    <div>Points: <span style={{ color: '#60a5fa', fontWeight: 700 }}>{member.livePoints}</span></div>
                    <div>Tasks: <span style={{ color: '#34d399', fontWeight: 700 }}>{member.liveCompleted}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}

      {/* ─── TEAM MEMBER & PROJECT MANAGER VIEW ─── */}
      {(user.role === 'TEAM_MEMBER' || user.role === 'PROJECT_MANAGER') && (
        <>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', marginBottom: '24px' }}>
            <StatCard
              icon={CheckCircle2}
              label="Completed"
              value={totalDone}
              sub={`+${Math.max(0, totalDone - 5)} this week`}
              color="rgba(16,185,129,0.7), rgba(5,150,105,0.9)"
            />
            <StatCard
              icon={Clock}
              label="Pending"
              value={totalTodo + totalIP}
              sub={`${totalIP} in progress`}
              color="rgba(245,158,11,0.7), rgba(217,119,6,0.9)"
            />
            <StatCard
              icon={TrendingUp}
              label="Productivity"
              value={`${productivity}%`}
              sub="Completion rate"
              color="rgba(124,58,237,0.7), rgba(37,99,235,0.9)"
              gradient
            />
          </div>

          {/* Top Performers */}
          <Card style={{ padding: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
              <Trophy size={20} color="#fbbf24" />
              <h3 style={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>Top Performers</h3>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px' }}>
              {topMembers.map((member, idx) => (
                <div key={member.id} style={{
                  background: 'rgba(10,22,40,0.8)',
                  border: '1px solid rgba(30,58,95,0.5)',
                  borderRadius: '12px',
                  padding: '16px',
                  textAlign: 'center',
                }}>
                  <div style={{ marginBottom: '12px' }}>
                    <Rank rank={idx + 1} />
                  </div>
                  <div style={{
                    width: '48px', height: '48px',
                    borderRadius: '12px',
                    background: `linear-gradient(135deg, ${member.color})`,
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'white', fontWeight: 700, fontSize: '1rem',
                    margin: '0 auto 12px',
                  }}>
                    {member.avatar}
                  </div>
                  <h4 style={{ color: 'white', fontWeight: 700, marginBottom: '4px' }}>{member.name}</h4>
                  <p style={{ fontSize: '0.8rem', color: '#94a3b8', marginBottom: '12px' }}>{member.role}</p>
                  <div style={{
                    display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px',
                    fontSize: '0.8rem', color: '#cbd5e1',
                  }}>
                    <div>Points: <span style={{ color: '#60a5fa', fontWeight: 700 }}>{member.livePoints}</span></div>
                    <div>Tasks: <span style={{ color: '#34d399', fontWeight: 700 }}>{member.liveCompleted}</span></div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </>
      )}
    </div>
  );
}
