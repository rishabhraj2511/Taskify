import { useOutletContext } from 'react-router-dom';
import { CheckCircle2, Clock, TrendingUp, Users, BarChart2, Target } from 'lucide-react';
import Card from '../components/Card';
import { teamMembers, weeklyData, projectStats } from '../data/dummyData';
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
          boxShadow: `0 0 20px ${color.split(',')[0].replace('rgba(', '').split(')')[0]}`,
          flexShrink: 0,
        }}>
          <Icon size={20} color="white" />
        </div>
      </div>
    </Card>
  );
}

function MiniBar({ label, value, max, color }) {
  const pct = max > 0 ? Math.min(100, Math.round((value / max) * 100)) : 0;
  return (
    <div style={{ marginBottom: '12px' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '5px' }}>
        <span style={{ fontSize: '0.78rem', color: '#94a3b8' }}>{label}</span>
        <span style={{ fontSize: '0.78rem', color: 'white', fontWeight: 600 }}>{value}</span>
      </div>
      <div style={{ height: '6px', background: 'rgba(30,58,95,0.5)', borderRadius: '3px', overflow: 'hidden' }}>
        <div style={{ width: `${pct}%`, height: '100%', background: color, borderRadius: '3px', transition: 'width 0.3s' }} />
      </div>
    </div>
  );
}

export default function Dashboard() {
  const { tasks } = useOutletContext();

  const totalTodo = tasks.todo.length;
  const totalIP = tasks.inprogress.length;
  const totalDone = tasks.done.length;
  const totalTasks = totalTodo + totalIP + totalDone;
  const productivity = totalTasks > 0 ? Math.round((totalDone / totalTasks) * 100) : 0;

  const topPerformers = buildLiveMemberStats(tasks, teamMembers)
    .sort((a, b) => b.livePoints - a.livePoints)
    .slice(0, 3);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
          Dashboard
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
          {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}
        </p>
      </div>

      {/* Stat Cards */}
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

      {/* Main content grid */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '16px' }}>
        {/* Weekly Chart */}
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Weekly Activity</h3>
            <div style={{ display: 'flex', gap: '12px', fontSize: '0.7rem', color: '#64748b' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#7c3aed', display: 'inline-block' }} />
                Completed
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                <span style={{ width: '8px', height: '8px', borderRadius: '2px', background: '#1e3a5f', display: 'inline-block' }} />
                Added
              </span>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '8px', height: '100px' }}>
            {weeklyData.map((d) => {
              const maxVal = Math.max(...weeklyData.map(x => x.completed), 1);
              const pctCompleted = (d.completed / maxVal) * 100;
              const pctAdded = (d.added / maxVal) * 100;
              return (
                <div key={d.day} style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '4px' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-end', gap: '2px', height: '80px', width: '100%' }}>
                    <div style={{
                      flex: 1, background: 'linear-gradient(180deg, #7c3aed, #5b21b6)',
                      height: `${pctCompleted}%`, borderRadius: '4px 4px 0 0',
                    }} />
                    <div style={{
                      flex: 1, background: 'rgba(30,58,95,0.8)',
                      height: `${pctAdded}%`, borderRadius: '4px 4px 0 0',
                    }} />
                  </div>
                  <span style={{ fontSize: '0.65rem', color: '#475569' }}>{d.day}</span>
                </div>
              );
            })}
          </div>
        </Card>

        {/* Project Progress */}
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Project Progress</h3>
            <Target size={16} color="#64748b" />
          </div>
          <div>
            {projectStats.map(p => (
              <div key={p.name} style={{ marginBottom: '16px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '6px' }}>
                  <div>
                    <span style={{ fontSize: '0.82rem', color: 'white', fontWeight: 600 }}>{p.name}</span>
                    <span style={{ fontSize: '0.68rem', color: '#475569', marginLeft: '8px' }}>{p.tasks} tasks · {p.team} devs</span>
                  </div>
                  <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'white' }}>{p.progress}%</span>
                </div>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${p.progress}%`, background: `linear-gradient(90deg, ${p.color.replace('from-', '').replace(' to-', ', ')})` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Bottom row: Team members + Task distribution */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        {/* Team Overview */}
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Team Members</h3>
            <Users size={16} color="#64748b" />
          </div>
          {topPerformers.map((m, i) => (
            <div key={m.id} style={{
              display: 'flex', alignItems: 'center', gap: '12px',
              padding: '10px 0',
              borderBottom: i < 2 ? '1px solid rgba(30,58,95,0.3)' : 'none',
            }}>
              <div style={{
                width: '34px', height: '34px', borderRadius: '10px', flexShrink: 0,
                background: `linear-gradient(135deg, ${m.color.replace('from-', '').replace(' to-', ', ')})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.7rem', fontWeight: 700, color: 'white',
              }}>
                {m.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontSize: '0.82rem', fontWeight: 600, color: 'white' }}>{m.name}</p>
                <p style={{ fontSize: '0.68rem', color: '#64748b' }}>{m.role}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <p style={{ fontSize: '0.8rem', fontWeight: 700, color: '#10b981' }}>{m.liveCompleted}</p>
                <p style={{ fontSize: '0.65rem', color: '#64748b' }}>done</p>
              </div>
            </div>
          ))}
        </Card>

        {/* Quick Stats */}
        <Card style={{ padding: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
            <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Task Distribution</h3>
            <BarChart2 size={16} color="#64748b" />
          </div>
          <MiniBar label="To Do" value={totalTodo} max={totalTasks || 1} color="#64748b" />
          <MiniBar label="In Progress" value={totalIP} max={totalTasks || 1} color="#f59e0b" />
          <MiniBar label="Completed" value={totalDone} max={totalTasks || 1} color="#10b981" />

          <div style={{ marginTop: '16px', paddingTop: '16px', borderTop: '1px solid rgba(30,58,95,0.4)' }}>
            <div style={{ display: 'flex', gap: '12px' }}>
              <div style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: '10px', background: 'rgba(124,58,237,0.1)', border: '1px solid rgba(124,58,237,0.2)' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#a78bfa' }}>{totalTasks}</p>
                <p style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>Total Tasks</p>
              </div>
              <div style={{ flex: 1, textAlign: 'center', padding: '12px', borderRadius: '10px', background: 'rgba(16,185,129,0.1)', border: '1px solid rgba(16,185,129,0.2)' }}>
                <p style={{ fontSize: '1.4rem', fontWeight: 800, color: '#34d399' }}>{productivity}%</p>
                <p style={{ fontSize: '0.65rem', color: '#64748b', marginTop: '2px' }}>Done Rate</p>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
