import { useOutletContext } from 'react-router-dom';
import { useMemo, useState } from 'react';
import { Plus, X, CheckCircle2, Clock, ListTodo, AlertTriangle } from 'lucide-react';
import TaskCard from '../components/TaskCard';

const COLUMNS = [
  { key: 'todo',       label: 'To Do',       icon: ListTodo,    color: '#64748b', bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.25)' },
  { key: 'inprogress', label: 'In Progress',  icon: Clock,       color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  { key: 'done',       label: 'Done',         icon: CheckCircle2,color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
];

function AddTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', priority: 'Medium', deadline: '', assignee: '', tags: '' });
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!form.title.trim()) { setError('Task title is required'); return; }
    if (!form.deadline) { setError('Deadline is required'); return; }
    onAdd({
      id: 'task_' + Date.now(),
      title: form.title.trim(),
      priority: form.priority,
      deadline: form.deadline,
      assignee: form.assignee.trim() || 'Unassigned',
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      points: form.priority === 'High' ? 40 : form.priority === 'Medium' ? 25 : 15,
    });
    onClose();
  };

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.75)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      padding: '20px',
      animation: 'fadeIn 0.2s ease-out',
    }} onClick={e => { if (e.target === e.currentTarget) onClose(); }}>
      <div style={{
        width: '100%', maxWidth: '480px',
        background: 'rgba(5,12,26,0.98)',
        border: '1px solid rgba(124,58,237,0.3)',
        borderRadius: '20px',
        padding: '28px',
        boxShadow: '0 24px 80px rgba(0,0,0,0.7), 0 0 0 1px rgba(124,58,237,0.15)',
        animation: 'slideUp 0.3s ease-out',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <div>
            <h2 style={{ fontWeight: 800, color: 'white', fontSize: '1.1rem' }}>Create New Task</h2>
            <p style={{ fontSize: '0.72rem', color: '#475569', marginTop: '2px' }}>Add task to your kanban board</p>
          </div>
          <button onClick={onClose} style={{ background: 'rgba(30,58,95,0.4)', border: '1px solid rgba(30,58,95,0.6)', color: '#94a3b8', borderRadius: '8px', width: '32px', height: '32px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}>
            <X size={16} />
          </button>
        </div>

        {error && (
          <div style={{ padding: '10px 14px', borderRadius: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)', color: '#f87171', fontSize: '0.8rem', marginBottom: '16px' }}>
            {error}
          </div>
        )}

        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          {/* Title */}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Task Title *</label>
            <input
              value={form.title}
              onChange={e => { setForm(f => ({...f, title: e.target.value})); setError(''); }}
              placeholder="e.g., Redesign landing page hero section"
              style={{
                width: '100%', padding: '10px 14px', borderRadius: '10px',
                background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.7)',
                color: 'white', fontSize: '0.875rem', outline: 'none',
              }}
              autoFocus
            />
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
            {/* Priority */}
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Priority</label>
              <select
                value={form.priority}
                onChange={e => setForm(f => ({...f, priority: e.target.value}))}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.7)', color: 'white', fontSize: '0.875rem', outline: 'none', cursor: 'pointer' }}
              >
                <option value="High">🔴 High</option>
                <option value="Medium">🟡 Medium</option>
                <option value="Low">🟢 Low</option>
              </select>
            </div>
            {/* Deadline */}
            <div>
              <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Deadline *</label>
              <input
                type="date"
                value={form.deadline}
                min={today}
                onChange={e => { setForm(f => ({...f, deadline: e.target.value})); setError(''); }}
                style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.7)', color: 'white', fontSize: '0.875rem', outline: 'none' }}
              />
            </div>
          </div>

          {/* Assignee */}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Assignee</label>
            <input
              value={form.assignee}
              onChange={e => setForm(f => ({...f, assignee: e.target.value}))}
              placeholder="e.g., Aria Chen"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.7)', color: 'white', fontSize: '0.875rem', outline: 'none' }}
            />
          </div>

          {/* Tags */}
          <div>
            <label style={{ fontSize: '0.75rem', color: '#94a3b8', fontWeight: 600, display: 'block', marginBottom: '6px', textTransform: 'uppercase', letterSpacing: '0.06em' }}>Tags (comma-separated)</label>
            <input
              value={form.tags}
              onChange={e => setForm(f => ({...f, tags: e.target.value}))}
              placeholder="e.g., Frontend, Bug, Design"
              style={{ width: '100%', padding: '10px 14px', borderRadius: '10px', background: 'rgba(10,22,40,0.8)', border: '1px solid rgba(30,58,95,0.7)', color: 'white', fontSize: '0.875rem', outline: 'none' }}
            />
          </div>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '24px' }}>
          <button className="btn-ghost" onClick={onClose} style={{ flex: 1, justifyContent: 'center' }}>Cancel</button>
          <button className="btn-primary" onClick={handleSubmit} style={{ flex: 2, justifyContent: 'center' }}>
            <Plus size={16} />
            Create Task
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Tasks() {
  const {
    tasks,
    moveTask,
    addTask,
    deleteTask,
    showAddTask,
    setShowAddTask,
    searchQuery,
    preferences,
  } = useOutletContext();
  const [priorityFilter, setPriorityFilter] = useState('All');

  const normalizedSearch = searchQuery.trim().toLowerCase();

  const filteredTasks = useMemo(() => {
    const shouldKeep = (task) => {
      const matchesSearch = !normalizedSearch
        || task.title.toLowerCase().includes(normalizedSearch)
        || task.assignee.toLowerCase().includes(normalizedSearch)
        || task.tags?.some(tag => tag.toLowerCase().includes(normalizedSearch));

      const matchesPriority = priorityFilter === 'All' || task.priority === priorityFilter;

      return matchesSearch && matchesPriority;
    };

    return {
      todo: tasks.todo.filter(shouldKeep),
      inprogress: tasks.inprogress.filter(shouldKeep),
      done: tasks.done.filter(shouldKeep),
    };
  }, [tasks, normalizedSearch, priorityFilter]);

  const totalVisible = filteredTasks.todo.length + filteredTasks.inprogress.length + filteredTasks.done.length;

  // Count overdue tasks
  const overdueCount = [...tasks.todo, ...tasks.inprogress].filter(t => {
    const days = Math.ceil((new Date(t.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return days < 0;
  }).length;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
        <div>
          <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
            Kanban Board
          </h2>
          <div style={{ display: 'flex', gap: '16px', marginTop: '6px' }}>
            {COLUMNS.map(col => (
              <span key={col.key} style={{ fontSize: '0.75rem', color: col.color, fontWeight: 600 }}>
                {tasks[col.key].length} {col.label}
              </span>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          {overdueCount > 0 && (
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px 12px', borderRadius: '8px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.25)' }}>
              <AlertTriangle size={13} color="#f87171" />
              <span style={{ fontSize: '0.75rem', color: '#f87171', fontWeight: 600 }}>{overdueCount} Overdue</span>
            </div>
          )}
          <button className="btn-primary" onClick={() => setShowAddTask(true)}>
            <Plus size={15} />
            Add Task
          </button>
        </div>
      </div>

      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
          {['All', 'High', 'Medium', 'Low'].map((value) => (
            <button
              key={value}
              onClick={() => setPriorityFilter(value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: priorityFilter === value ? '1px solid rgba(124,58,237,0.35)' : '1px solid rgba(30,58,95,0.55)',
                background: priorityFilter === value ? 'rgba(124,58,237,0.16)' : 'rgba(10,22,40,0.65)',
                color: priorityFilter === value ? '#a78bfa' : '#94a3b8',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {value}
            </button>
          ))}
        </div>

        <div style={{ color: '#64748b', fontSize: '0.74rem', fontWeight: 600 }}>
          Showing {totalVisible} task{totalVisible === 1 ? '' : 's'}
        </div>
      </div>

      {/* Kanban Columns */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'start' }}>
        {COLUMNS.map(col => {
          const Icon = col.icon;
          return (
            <div key={col.key} style={{
              background: col.bg,
              border: `1px solid ${col.border}`,
              borderRadius: '16px',
                padding: preferences.compactCards ? '12px' : '16px',
              minHeight: '500px',
            }}>
              {/* Column header */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Icon size={16} color={col.color} />
                  <span style={{ fontWeight: 700, color: col.color, fontSize: '0.875rem' }}>{col.label}</span>
                </div>
                <div style={{
                  minWidth: '24px', height: '24px',
                  background: col.bg, border: `1px solid ${col.border}`,
                  borderRadius: '6px',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '0.72rem', fontWeight: 700, color: col.color, padding: '0 6px',
                }}>
                  {filteredTasks[col.key].length}
                </div>
              </div>

              {/* Task cards */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                {filteredTasks[col.key].length === 0 ? (
                  <div style={{
                    textAlign: 'center', padding: '32px 16px',
                    border: `2px dashed ${col.border}`, borderRadius: '12px',
                    color: '#334155',
                  }}>
                    <Icon size={24} style={{ margin: '0 auto 8px', opacity: 0.4, display: 'block' }} color={col.color} />
                    <p style={{ fontSize: '0.78rem', color: '#475569' }}>
                      {normalizedSearch || priorityFilter !== 'All' ? 'No matching tasks' : 'No tasks here'}
                    </p>
                    {col.key === 'todo' && (
                      <button
                        className="btn-ghost"
                        onClick={() => setShowAddTask(true)}
                        style={{ marginTop: '12px', fontSize: '0.72rem', padding: '6px 12px' }}
                      >
                        <Plus size={12} /> Add Task
                      </button>
                    )}
                  </div>
                ) : (
                  filteredTasks[col.key].map(task => (
                    <TaskCard
                      key={task.id}
                      task={task}
                      column={col.key}
                      onMove={moveTask}
                      onDelete={deleteTask}
                    />
                  ))
                )}
              </div>

              {/* Add task button per column */}
              {col.key === 'todo' && filteredTasks[col.key].length > 0 && (
                <button
                  onClick={() => setShowAddTask(true)}
                  style={{
                    width: '100%', marginTop: '10px',
                    padding: '8px', borderRadius: '10px',
                    background: 'rgba(124,58,237,0.08)',
                    border: '1px dashed rgba(124,58,237,0.3)',
                    color: '#7c3aed', fontSize: '0.78rem', fontWeight: 600,
                    cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '4px',
                    transition: 'all 0.2s',
                  }}
                >
                  <Plus size={13} /> Add Task
                </button>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Task Modal */}
      {showAddTask && (
        <AddTaskModal
          onClose={() => setShowAddTask(false)}
          onAdd={(task) => { addTask(task); setShowAddTask(false); }}
        />
      )}
    </div>
  );
}
