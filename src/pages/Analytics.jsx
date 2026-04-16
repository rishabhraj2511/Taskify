import { useOutletContext } from 'react-router-dom';
import { TrendingUp, Zap, CheckCircle2, Activity, Target } from 'lucide-react';
import Card from '../components/Card';
import { teamMembers, weeklyData, projectStats } from '../data/dummyData';
import { buildLiveMemberStats } from '../utils/teamInsights';

function ProgressStat({ label, value, max, color, icon: Icon, sub }) {
  const pct = Math.min(100, Math.round((value / max) * 100));
  return (
    <div style={{ marginBottom: '18px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          {Icon && <Icon size={14} color={color} />}
          <span style={{ fontSize: '0.82rem', color: 'white', fontWeight: 600 }}>{label}</span>
          {sub && <span style={{ fontSize: '0.68rem', color: '#475569' }}>{sub}</span>}
        </div>
        <span style={{ fontSize: '0.9rem', fontWeight: 800, color }}>{pct}%</span>
      </div>
      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${pct}%`, background: color }} />
      </div>
    </div>
  );
}

export default function Analytics() {
  const { tasks } = useOutletContext();

  const totalTodo = tasks.todo.length;
  const totalIP = tasks.inprogress.length;
  const totalDone = tasks.done.length;
  const total = totalTodo + totalIP + totalDone;
  const completionRate = total > 0 ? Math.round((totalDone / total) * 100) : 0;

  const overdueTasks = [...tasks.todo, ...tasks.inprogress].filter(t => {
    return new Date(t.deadline) < new Date();
  });

  const liveMembers = buildLiveMemberStats(tasks, teamMembers);
  const avgTeamProductivity = liveMembers.length > 0
    ? Math.round(liveMembers.reduce((s, m) => s + m.liveProductivity, 0) / liveMembers.length)
    : 0;
  const totalPoints = liveMembers.reduce((s, m) => s + m.livePoints, 0);
  const maxBar = Math.max(...weeklyData.map(d => Math.max(d.completed, d.added)));

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
          Analytics
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>
          Team performance overview
        </p>
      </div>

      {/* KPI Row */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: '14px', marginBottom: '20px' }}>
        {[
          { label: 'Completion Rate', value: `${completionRate}%`, sub: 'All tasks', color: '#10b981', icon: CheckCircle2 },
          { label: 'Avg Productivity', value: `${avgTeamProductivity}%`, sub: 'Team avg', color: '#7c3aed', icon: TrendingUp },
          { label: 'Total Points', value: totalPoints.toLocaleString(), sub: 'Team earned', color: '#f59e0b', icon: Zap },
          { label: 'Overdue Tasks', value: overdueTasks.length, sub: 'Overdue', color: '#ef4444', icon: Activity },
        ].map(k => (
          <Card key={k.label} style={{ padding: '16px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
              <k.icon size={16} color={k.color} />
              <span style={{ fontSize: '0.65rem', color: '#475569' }}>{k.sub}</span>
            </div>
            <p style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>{k.value}</p>
            <p style={{ fontSize: '0.72rem', color: '#64748b', marginTop: '2px' }}>{k.label}</p>
          </Card>
        ))}
      </div>

      {/* Charts row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {/* Weekly Bar Chart */}
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Weekly Performance</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.68rem', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: 'linear-gradient(#7c3aed, #5b21b6)', display: 'inline-block' }} />Completed
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#1e3a5f', display: 'inline-block' }} />Added
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '6px', height: '130px' }}>
            {weeklyData.map(d => (
              <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '110px', width: '100%' }}>
                  <div style={{
                    flex: 1,
                    background: 'linear-gradient(180deg, #7c3aed, #4c1d95)',
                    height: `${(d.completed / maxBar) * 100}%`,
                    borderRadius: '4px 4px 0 0',
                    boxShadow: '0 0 8px rgba(124,58,237,0.35)',
                    transition: 'height 0.7s ease',
                  }} />
                  <div style={{
                    flex: 1,
                    background: 'rgba(30,58,95,0.7)',
                    height: `${(d.added / maxBar) * 100}%`,
                    borderRadius: '4px 4px 0 0',
                    transition: 'height 0.7s ease',
                  }} />
                </div>
                <span style={{ fontSize: '0.65rem', color: '#475569' }}>{d.day}</span>
              </div>
            ))}
          </div>
          {/* Summary */}
          <div style={{ display: 'flex', gap: '12px', marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(30,58,95,0.4)' }}>
            {[
              { label: 'Total Completed', value: weeklyData.reduce((s, d) => s + d.completed, 0) },
              { label: 'Total Added', value: weeklyData.reduce((s, d) => s + d.added, 0) },
              { label: 'Best Day', value: weeklyData.reduce((best, d) => d.completed > best.completed ? d : best).day },
            ].map(s => (
              <div key={s.label} style={{ flex: 1, textAlign: 'center', padding: '8px', background: 'rgba(30,58,95,0.2)', borderRadius: '8px' }}>
                <p style={{ fontSize: '1rem', fontWeight: 700, color: 'white' }}>{s.value}</p>
                <p style={{ fontSize: '0.62rem', color: '#475569', marginTop: '2px' }}>{s.label}</p>
              </div>
            ))}
          </div>
        </Card>

        {/* Donut-style completion */}
        <Card style={{ padding: '20px' }}>
          <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem', marginBottom: '20px' }}>Task Breakdown</h3>
          {/* Simulated donut */}
          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
            <div style={{ position: 'relative', width: '120px', height: '120px' }}>
              <svg viewBox="0 0 120 120" style={{ transform: 'rotate(-90deg)' }}>
                <circle cx="60" cy="60" r="48" fill="none" stroke="rgba(30,58,95,0.5)" strokeWidth="14" />
                <circle cx="60" cy="60" r="48" fill="none"
                  stroke="url(#g1)" strokeWidth="14"
                  strokeDasharray={`${completionRate * 3.016} 301.6`}
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="g1" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#10b981" />
                  </linearGradient>
                </defs>
              </svg>
              <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white' }}>{completionRate}%</span>
                <span style={{ fontSize: '0.6rem', color: '#64748b' }}>Done</span>
              </div>
            </div>
          </div>
          {[
            { label: 'To Do', count: totalTodo, color: '#64748b' },
            { label: 'In Progress', count: totalIP, color: '#f59e0b' },
            { label: 'Completed', count: totalDone, color: '#10b981' },
          ].map(s => (
            <div key={s.label} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: '1px solid rgba(30,58,95,0.25)' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: s.color, display: 'inline-block', boxShadow: `0 0 6px ${s.color}` }} />
                <span style={{ fontSize: '0.8rem', color: '#94a3b8' }}>{s.label}</span>
              </div>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{s.count}</span>
            </div>
          ))}
        </Card>
      </div>

      {/* Team + Projects row */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {/* Team productivity */}
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Team Productivity</h3>
            <Activity size={16} color="#64748b" />
          </div>
          {liveMembers.sort((a, b) => b.liveProductivity - a.liveProductivity).map(m => (
            <ProgressStat
              key={m.id}
              label={m.name}
              value={m.liveProductivity}
              max={100}
              color={`linear-gradient(90deg, ${m.color.replace('from-', '').replace(' to-', ', ')})`}
              sub={`· ${m.liveCompleted} done`}
            />
          ))}
        </Card>

        {/* Project Status */}
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Project Status</h3>
            <Target size={16} color="#64748b" />
          </div>
          {projectStats.map(p => (
            <ProgressStat
              key={p.name}
              label={p.name}
              value={p.progress}
              max={100}
              color={`linear-gradient(90deg, ${p.color.replace('from-', '').replace(' to-', ', ')})`}
              sub={`· ${p.tasks} tasks`}
            />
          ))}

          </Card>
      </div>
    </div>
  );
}
