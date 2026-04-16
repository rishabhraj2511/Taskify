import { Calendar, AlertTriangle, User, ArrowRight, Flame, Trash2 } from 'lucide-react';

function getDaysUntil(deadline) {
  const now = new Date();
  const d = new Date(deadline);
  return Math.ceil((d - now) / (1000 * 60 * 60 * 24));
}

function RiskBadge({ days }) {
  if (days < 0)  return <span style={{ fontSize: '0.68rem', color: '#f87171', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}><AlertTriangle size={11} /> Overdue</span>;
  if (days === 0) return <span style={{ fontSize: '0.68rem', color: '#fb923c', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}><Flame size={11} /> Due Today</span>;
  if (days === 1) return <span style={{ fontSize: '0.68rem', color: '#fbbf24', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '3px' }}><AlertTriangle size={11} /> Due Tomorrow</span>;
  if (days <= 3)  return <span style={{ fontSize: '0.68rem', color: '#facc15', fontWeight: 600 }}>⚡ High Risk</span>;
  return null;
}

export default function TaskCard({ task, column, onMove, onDelete }) {
  const columns = ['todo', 'inprogress', 'done'];
  const currentIdx = columns.indexOf(column);
  const canMoveLeft = currentIdx > 0;
  const canMoveRight = currentIdx < columns.length - 1;
  const daysLeft = getDaysUntil(task.deadline);
  const isUrgent = daysLeft <= 1;
  const isDone = column === 'done';

  const tagColors = ['rgba(124,58,237,0.15)', 'rgba(37,99,235,0.15)', 'rgba(6,182,212,0.15)', 'rgba(16,185,129,0.15)'];

  return (
    <div style={{
      background: isDone ? 'rgba(16,185,129,0.05)' : isUrgent ? 'rgba(239,68,68,0.05)' : 'rgba(10,22,40,0.7)',
      backdropFilter: 'blur(16px)',
      border: `1px solid ${isDone ? 'rgba(16,185,129,0.2)' : isUrgent ? 'rgba(239,68,68,0.2)' : 'rgba(30,58,95,0.5)'}`,
      borderRadius: '12px',
      padding: '14px',
      transition: 'all 0.25s ease',
      cursor: 'default',
      boxShadow: isUrgent && !isDone ? '0 0 15px rgba(239,68,68,0.1)' : '0 4px 16px rgba(0,0,0,0.3)',
      position: 'relative',
      overflow: 'hidden',
    }}
    onMouseEnter={e => {
      e.currentTarget.style.transform = 'translateY(-2px)';
      e.currentTarget.style.boxShadow = isUrgent && !isDone
        ? '0 8px 24px rgba(239,68,68,0.2)'
        : '0 8px 24px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.2)';
    }}
    onMouseLeave={e => {
      e.currentTarget.style.transform = '';
      e.currentTarget.style.boxShadow = isUrgent && !isDone ? '0 0 15px rgba(239,68,68,0.1)' : '0 4px 16px rgba(0,0,0,0.3)';
    }}
    >
      {/* Top row */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '10px' }}>
        <span className={`priority-${task.priority.toLowerCase()}`}>{task.priority}</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <RiskBadge days={daysLeft} />
          <button
            onClick={() => onDelete?.(task.id, column)}
            title="Delete task"
            style={{
              border: 'none',
              background: 'rgba(239,68,68,0.12)',
              color: '#f87171',
              width: '22px',
              height: '22px',
              borderRadius: '6px',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Trash2 size={12} />
          </button>
        </div>
      </div>

      {/* Title */}
      <h4 style={{
        fontSize: '0.85rem', fontWeight: 600, color: isDone ? '#94a3b8' : 'white',
        lineHeight: '1.3', marginBottom: '10px',
        textDecoration: isDone ? 'line-through' : 'none',
      }}>
        {task.title}
      </h4>

      {/* Tags */}
      {task.tags?.length > 0 && (
        <div style={{ display: 'flex', gap: '4px', flexWrap: 'wrap', marginBottom: '10px' }}>
          {task.tags.map((tag, i) => (
            <span key={tag} style={{
              fontSize: '0.65rem', fontWeight: 600, color: '#94a3b8',
              background: tagColors[i % tagColors.length],
              padding: '2px 6px', borderRadius: '4px',
              border: '1px solid rgba(255,255,255,0.06)',
            }}>
              {tag}
            </span>
          ))}
        </div>
      )}

      {/* Meta */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: daysLeft < 0 ? '#f87171' : daysLeft <= 3 ? '#fbbf24' : '#64748b', fontSize: '0.72rem' }}>
          <Calendar size={11} />
          {new Date(task.deadline).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', color: '#64748b', fontSize: '0.72rem' }}>
          <User size={11} />
          {task.assignee.split(' ')[0]}
        </div>
      </div>

      {/* Points */}
      <div style={{
        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
        paddingTop: '10px', borderTop: '1px solid rgba(30,58,95,0.35)',
      }}>
        <span style={{ fontSize: '0.68rem', color: '#a78bfa', fontWeight: 600 }}>⚡ {task.points} pts</span>
        <div style={{ display: 'flex', gap: '4px' }}>
          {canMoveLeft && (
            <button
              onClick={() => onMove(task.id, column, columns[currentIdx - 1])}
              style={{
                fontSize: '0.65rem', padding: '3px 8px', borderRadius: '6px',
                background: 'rgba(30,58,95,0.5)', border: '1px solid rgba(30,58,95,0.8)',
                color: '#94a3b8', cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: '2px',
              }}
              title="Move left"
            >
              ←
            </button>
          )}
          {canMoveRight && (
            <button
              onClick={() => onMove(task.id, column, columns[currentIdx + 1])}
              style={{
                fontSize: '0.65rem', padding: '3px 8px', borderRadius: '6px',
                background: 'linear-gradient(135deg, rgba(124,58,237,0.3), rgba(37,99,235,0.25))',
                border: '1px solid rgba(124,58,237,0.35)',
                color: '#a78bfa', cursor: 'pointer', transition: 'all 0.15s',
                display: 'flex', alignItems: 'center', gap: '2px',
              }}
              title="Move right"
            >
              <ArrowRight size={11} />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
