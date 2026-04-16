import { useOutletContext } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Users } from 'lucide-react';
import Card from '../components/Card';
import { teamMembers } from '../data/dummyData';
import { buildLiveMemberStats } from '../utils/teamInsights';

function Rank({ rank }) {
  if (rank === 1) return <span style={{ fontSize: '1rem', fontWeight: 700, color: '#fbbf24' }}>1st</span>;
  if (rank === 2) return <span style={{ fontSize: '1rem', fontWeight: 700, color: '#94a3b8' }}>2nd</span>;
  if (rank === 3) return <span style={{ fontSize: '1rem', fontWeight: 700, color: '#cd7c2d' }}>3rd</span>;
  return <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#475569' }}>#{rank}</span>;
}

export default function Team() {
  const { tasks } = useOutletContext();
  const [sortBy, setSortBy] = useState('Points');

  const membersWithLiveStats = useMemo(
    () => buildLiveMemberStats(tasks, teamMembers),
    [tasks],
  );

  const sortedMembers = useMemo(() => {
    if (sortBy === 'Tasks') {
      return [...membersWithLiveStats].sort((a, b) => b.liveCompleted - a.liveCompleted);
    }

    if (sortBy === 'Score') {
      return [...membersWithLiveStats].sort((a, b) => b.liveContributionScore - a.liveContributionScore);
    }

    return [...membersWithLiveStats].sort((a, b) => b.livePoints - a.livePoints);
  }, [membersWithLiveStats, sortBy]);
  const totalTeamPoints = membersWithLiveStats.reduce((sum, m) => sum + m.livePoints, 0);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Header */}
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
          Team
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.8rem', marginTop: '4px' }}>
          {teamMembers.length} team members · {totalTeamPoints.toLocaleString()} total points
        </p>
      </div>

{/* Top 3 Podium */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.15fr 1fr', gap: '12px', marginBottom: '24px', alignItems: 'end' }}>
        {[sortedMembers[1], sortedMembers[0], sortedMembers[2]].map((m, i) => {
          const rank = i === 0 ? 2 : i === 1 ? 1 : 3;
          const heights = ['140px', '180px', '120px'];
          const isFirst = rank === 1;
          return (
            <div key={m.id} style={{
              background: isFirst
                ? 'linear-gradient(135deg, rgba(124,58,237,0.2), rgba(37,99,235,0.15))'
                : 'rgba(10,22,40,0.7)',
              border: `1px solid ${isFirst ? 'rgba(124,58,237,0.4)' : 'rgba(30,58,95,0.5)'}`,
              borderRadius: '16px',
              padding: '20px 16px',
              textAlign: 'center',
              minHeight: heights[i],
              display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', alignItems: 'center',
            }}>
              <div style={{ marginBottom: '4px' }}><Rank rank={rank} /></div>
              <div style={{
                width: isFirst ? '52px' : '44px', height: isFirst ? '52px' : '44px',
                borderRadius: '14px',
                background: `linear-gradient(135deg, ${m.color.replace('from-', '').replace(' to-', ', ')})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: isFirst ? '1rem' : '0.85rem', fontWeight: 700, color: 'white',
                margin: '0 auto 10px',
              }}>
                {m.avatar}
              </div>
              <p style={{ fontWeight: 700, color: 'white', fontSize: isFirst ? '0.9rem' : '0.82rem' }}>{m.name}</p>
              <p style={{ fontSize: '0.7rem', color: '#64748b', marginBottom: '8px' }}>{m.role}</p>
              <div style={{
                padding: '4px 12px', borderRadius: '8px',
                background: isFirst ? 'rgba(124,58,237,0.2)' : 'rgba(30,58,95,0.4)',
              }}>
                <span style={{ fontSize: '0.85rem', fontWeight: 800, color: isFirst ? '#a78bfa' : '#94a3b8' }}>
                  {m.livePoints.toLocaleString()}
                </span>
                <span style={{ fontSize: '0.65rem', color: '#475569', marginLeft: '3px' }}>pts</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <Card style={{ padding: '0', overflow: 'hidden', marginBottom: '16px' }}>
        <div style={{ padding: '16px 20px', borderBottom: '1px solid rgba(30,58,95,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h3 style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>Team Rankings</h3>
          <div style={{ display: 'flex', gap: '4px' }}>
            {['Points', 'Tasks', 'Score'].map(tab => (
              <button
                key={tab}
                onClick={() => setSortBy(tab)}
                style={{
                  fontSize: '0.7rem',
                  padding: '4px 10px',
                  borderRadius: '6px',
                  background: tab === sortBy ? 'rgba(124,58,237,0.2)' : 'transparent',
                  color: tab === sortBy ? '#a78bfa' : '#475569',
                  cursor: 'pointer',
                  fontWeight: 600,
                  border: 'none',
                }}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>

        {sortedMembers.map((m, i) => {
          const topPoints = sortedMembers[0]?.livePoints || 1;
          const pct = Math.round((m.livePoints / topPoints) * 100);
          return (
            <div key={m.id} style={{
              padding: '16px 20px',
              borderBottom: i < sortedMembers.length - 1 ? '1px solid rgba(30,58,95,0.25)' : 'none',
              display: 'flex', alignItems: 'center', gap: '16px',
            }}>
              <div style={{ width: '32px', textAlign: 'center', flexShrink: 0 }}><Rank rank={i + 1} /></div>

              <div style={{
                width: '40px', height: '40px', borderRadius: '12px', flexShrink: 0,
                background: `linear-gradient(135deg, ${m.color.replace('from-', '').replace(' to-', ', ')})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.78rem', fontWeight: 700, color: 'white',
              }}>
                {m.avatar}
              </div>

              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                  <span style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem' }}>{m.name}</span>
                  <span style={{ fontSize: '0.65rem', color: '#475569', background: 'rgba(30,58,95,0.4)', padding: '2px 6px', borderRadius: '4px' }}>{m.role}</span>
                </div>
                <div style={{ height: '4px', background: 'rgba(30,58,95,0.5)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${pct}%`, height: '100%', background: m.color.replace('from-', '').replace(' to-', ', ').split(',')[0] }} />
                </div>
              </div>

              <div style={{ display: 'flex', gap: '20px', flexShrink: 0 }}>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{m.liveCompleted}</p>
                  <p style={{ fontSize: '0.62rem', color: '#475569' }}>Done</p>
                </div>
                <div style={{ textAlign: 'center' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 700, color: '#a78bfa' }}>{m.liveProductivity}%</p>
                  <p style={{ fontSize: '0.62rem', color: '#475569' }}>Efficiency</p>
                </div>
                <div style={{ textAlign: 'center', minWidth: '60px' }}>
                  <p style={{ fontSize: '0.9rem', fontWeight: 800, color: 'white' }}>{m.livePoints.toLocaleString()}</p>
                  <p style={{ fontSize: '0.62rem', color: '#475569' }}>Points</p>
                </div>
              </div>
            </div>
          );
        })}
      </Card>

      {/* Member Detail Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '16px' }}>
        {sortedMembers.map(m => (
          <Card key={m.id} style={{ padding: '20px' }}>
            <div style={{ display: 'flex', gap: '14px', marginBottom: '14px' }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '14px', flexShrink: 0,
                background: `linear-gradient(135deg, ${m.color.replace('from-', '').replace(' to-', ', ')})`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                fontSize: '0.9rem', fontWeight: 700, color: 'white',
              }}>
                {m.avatar}
              </div>
              <div style={{ flex: 1 }}>
                <p style={{ fontWeight: 700, color: 'white', fontSize: '0.9rem' }}>{m.name}</p>
                <p style={{ fontSize: '0.72rem', color: '#64748b' }}>{m.role}</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#a78bfa' }}>{m.livePoints.toLocaleString()}</div>
                <div style={{ fontSize: '0.65rem', color: '#475569' }}>points</div>
              </div>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px' }}>
              {[
                { label: 'Done', value: m.liveCompleted, color: '#10b981' },
                { label: 'Active', value: m.liveInProgress, color: '#f59e0b' },
                { label: 'Score', value: m.liveContributionScore, color: '#7c3aed' },
              ].map(s => (
                <div key={s.label} style={{
                  textAlign: 'center', padding: '8px 4px',
                  background: 'rgba(30,58,95,0.2)',
                  borderRadius: '8px',
                }}>
                  <p style={{ fontSize: '1rem', fontWeight: 700, color: s.color }}>{s.value}</p>
                  <p style={{ fontSize: '0.62rem', color: '#475569' }}>{s.label}</p>
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}
