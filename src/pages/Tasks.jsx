import { useOutletContext } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import {
  Plus,
  CheckCircle2,
  Clock,
  ListTodo,
  AlertTriangle,
  CalendarClock,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';
import Button from '../components/ui/Button';
import Modal from '../components/ui/Modal';
import TaskList from '../components/TaskList';

const MotionDiv = motion.div;

const COLUMNS = [
  { key: 'todo', label: 'To Do', icon: ListTodo, color: '#64748b', bg: 'rgba(100,116,139,0.1)', border: 'rgba(100,116,139,0.25)' },
  { key: 'inprogress', label: 'In Progress', icon: Clock, color: '#f59e0b', bg: 'rgba(245,158,11,0.08)', border: 'rgba(245,158,11,0.2)' },
  { key: 'done', label: 'Done', icon: CheckCircle2, color: '#10b981', bg: 'rgba(16,185,129,0.08)', border: 'rgba(16,185,129,0.2)' },
];

function AddTaskModal({ onClose, onAdd }) {
  const [form, setForm] = useState({ title: '', priority: 'Medium', deadline: '', assignee: '', tags: '' });
  const [error, setError] = useState('');

  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = () => {
    if (!form.title.trim()) {
      setError('Task title is required');
      return;
    }

    if (!form.deadline) {
      setError('Deadline is required');
      return;
    }

    onAdd({
      id: `task_${Date.now()}`,
      title: form.title.trim(),
      priority: form.priority,
      deadline: form.deadline,
      assignee: form.assignee.trim() || 'Unassigned',
      tags: form.tags ? form.tags.split(',').map(t => t.trim()).filter(Boolean) : [],
      points: form.priority === 'High' ? 40 : form.priority === 'Medium' ? 25 : 15,
    });
  };

  return (
    <Modal title="Create New Task" subtitle="Add a task with deadline, priority, and ownership" onClose={onClose}>
      {error && (
        <div style={{
          padding: '10px 12px',
          borderRadius: '10px',
          background: 'rgba(239,68,68,0.1)',
          border: '1px solid rgba(239,68,68,0.25)',
          color: '#f87171',
          fontSize: '0.8rem',
          marginBottom: '14px',
        }}>
          {error}
        </div>
      )}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '12px' }}>
        <div>
          <label style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px', fontWeight: 700 }}>Task Title</label>
          <input
            className="form-input"
            value={form.title}
            onChange={(e) => {
              setForm(prev => ({ ...prev, title: e.target.value }));
              setError('');
            }}
            placeholder="Ex: Prepare sprint retrospective notes"
          />
        </div>

        <div className="responsive-grid-2" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
          <div>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px', fontWeight: 700 }}>Priority</label>
            <select
              className="form-input"
              value={form.priority}
              onChange={(e) => setForm(prev => ({ ...prev, priority: e.target.value }))}
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px', fontWeight: 700 }}>Due Date</label>
            <input
              className="form-input"
              type="date"
              min={today}
              value={form.deadline}
              onChange={(e) => {
                setForm(prev => ({ ...prev, deadline: e.target.value }));
                setError('');
              }}
            />
          </div>
        </div>

        <div>
          <label style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px', fontWeight: 700 }}>Assignee</label>
          <input
            className="form-input"
            value={form.assignee}
            onChange={(e) => setForm(prev => ({ ...prev, assignee: e.target.value }))}
            placeholder="Ex: Sarah Miller"
          />
        </div>

        <div>
          <label style={{ fontSize: '0.74rem', color: 'var(--text-dim)', display: 'block', marginBottom: '6px', fontWeight: 700 }}>Tags</label>
          <input
            className="form-input"
            value={form.tags}
            onChange={(e) => setForm(prev => ({ ...prev, tags: e.target.value }))}
            placeholder="Ex: UX, Bug, Frontend"
          />
        </div>
      </div>

      <div style={{ display: 'flex', gap: '10px', marginTop: '18px' }}>
        <Button variant="ghost" style={{ flex: 1, justifyContent: 'center' }} onClick={onClose}>Cancel</Button>
        <Button style={{ flex: 2, justifyContent: 'center' }} onClick={handleSubmit}>
          <Plus size={14} /> Create Task
        </Button>
      </div>
    </Modal>
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
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const id = window.setTimeout(() => setIsLoading(false), 350);
    return () => window.clearTimeout(id);
  }, []);

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
  const totalTasks = tasks.todo.length + tasks.inprogress.length + tasks.done.length;
  const completionRate = totalTasks > 0 ? Math.round((tasks.done.length / totalTasks) * 100) : 0;
  const pendingCount = tasks.todo.length + tasks.inprogress.length;

  const overdueCount = [...tasks.todo, ...tasks.inprogress].filter(task => {
    const days = Math.ceil((new Date(task.deadline) - new Date()) / (1000 * 60 * 60 * 24));
    return days < 0;
  }).length;

  const smartHint = useMemo(() => {
    if (!preferences.enableAiHints) {
      return '';
    }

    if (pendingCount >= 8) {
      return 'You have too many pending tasks today. Try closing two high-priority items first.';
    }

    if (overdueCount > 0) {
      return `You have ${overdueCount} overdue task${overdueCount > 1 ? 's' : ''}. Prioritize deadlines before new work.`;
    }

    if (completionRate >= 75) {
      return 'Great momentum. Keep this pace to finish your sprint strongly.';
    }

    return 'Tip: Move one task from To Do to In Progress to start momentum.';
  }, [completionRate, overdueCount, pendingCount, preferences.enableAiHints]);

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr 1fr', gap: '12px', marginBottom: '16px' }}>
        <div className="glass-card" style={{ borderRadius: '14px', padding: '16px' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>Task Workspace</h2>
          <p style={{ color: 'var(--text-dim)', marginTop: '6px', fontSize: '0.82rem' }}>
            Card-based task board with smart prioritization and smooth transitions.
          </p>
          {smartHint && (
            <div style={{
              marginTop: '12px',
              display: 'flex',
              alignItems: 'flex-start',
              gap: '8px',
              borderRadius: '10px',
              border: '1px solid rgba(124,58,237,0.25)',
              background: 'rgba(124,58,237,0.1)',
              padding: '10px',
              color: '#c4b5fd',
              fontSize: '0.77rem',
              lineHeight: 1.45,
            }}>
              <Sparkles size={14} style={{ marginTop: '2px' }} />
              <span>{smartHint}</span>
            </div>
          )}
        </div>

        <div className="glass-card" style={{ borderRadius: '14px', padding: '16px' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Completion</div>
          <div style={{ marginTop: '10px', fontSize: '1.8rem', fontWeight: 800, color: 'var(--text-strong)' }}>{completionRate}%</div>
          <div className="progress-bar" style={{ marginTop: '10px' }}>
            <div className="progress-fill" style={{ width: `${completionRate}%`, background: 'linear-gradient(90deg, #10b981, #2563eb)' }} />
          </div>
        </div>

        <div className="glass-card" style={{ borderRadius: '14px', padding: '16px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div style={{ fontSize: '0.74rem', color: 'var(--text-dim)', fontWeight: 700, textTransform: 'uppercase' }}>Due Pressure</div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px', fontSize: '0.84rem' }}>
            <span style={{ color: 'var(--text-dim)' }}>Pending</span>
            <strong style={{ color: 'var(--text-strong)' }}>{pendingCount}</strong>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '6px', fontSize: '0.84rem' }}>
            <span style={{ color: '#f87171' }}>Overdue</span>
            <strong style={{ color: '#f87171' }}>{overdueCount}</strong>
          </div>
          <Button style={{ marginTop: '10px', justifyContent: 'center' }} onClick={() => setShowAddTask(true)}>
            <Plus size={14} /> Add Task
          </Button>
        </div>
      </div>

      <div style={{ marginBottom: '14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '10px', flexWrap: 'wrap' }}>
        <div style={{ display: 'flex', gap: '8px', alignItems: 'center', flexWrap: 'wrap' }}>
          {['All', 'High', 'Medium', 'Low'].map((value) => (
            <button
              key={value}
              onClick={() => setPriorityFilter(value)}
              style={{
                padding: '6px 10px',
                borderRadius: '8px',
                border: priorityFilter === value ? '1px solid rgba(124,58,237,0.35)' : '1px solid var(--border-main)',
                background: priorityFilter === value ? 'rgba(124,58,237,0.16)' : 'var(--bg-soft)',
                color: priorityFilter === value ? '#a78bfa' : 'var(--text-dim)',
                fontSize: '0.72rem',
                fontWeight: 600,
                cursor: 'pointer',
              }}
            >
              {value}
            </button>
          ))}
        </div>

        <div style={{ color: 'var(--text-dim)', fontSize: '0.74rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}>
          <CalendarClock size={14} />
          Showing {totalVisible} task{totalVisible === 1 ? '' : 's'}
        </div>
      </div>

      {isLoading ? (
        <div className="glass-card" style={{ borderRadius: '14px', padding: '22px', textAlign: 'center', color: 'var(--text-dim)' }}>
          Loading task board...
        </div>
      ) : (
        <div className="responsive-grid-3" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '16px', alignItems: 'start' }}>
          {COLUMNS.map((col) => {
            const Icon = col.icon;
            const columnTasks = filteredTasks[col.key];

            return (
              <MotionDiv
                key={col.key}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  background: col.bg,
                  border: `1px solid ${col.border}`,
                  borderRadius: '16px',
                  padding: preferences.compactCards ? '12px' : '16px',
                  minHeight: '420px',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Icon size={16} color={col.color} />
                    <span style={{ fontWeight: 700, color: col.color, fontSize: '0.87rem' }}>{col.label}</span>
                  </div>
                  <div style={{
                    minWidth: '24px',
                    height: '24px',
                    border: `1px solid ${col.border}`,
                    borderRadius: '6px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    color: col.color,
                    paddingInline: '6px',
                  }}>
                    {columnTasks.length}
                  </div>
                </div>

                {columnTasks.length === 0 ? (
                  <div style={{
                    textAlign: 'center',
                    padding: '28px 14px',
                    border: `2px dashed ${col.border}`,
                    borderRadius: '12px',
                    color: 'var(--text-dim)',
                  }}>
                    <Icon size={24} style={{ margin: '0 auto 8px', opacity: 0.45, display: 'block' }} color={col.color} />
                    <p style={{ fontSize: '0.78rem', lineHeight: 1.4 }}>
                      {normalizedSearch || priorityFilter !== 'All' ? 'No matching tasks found' : 'No tasks in this column'}
                    </p>
                    {col.key === 'todo' && (
                      <Button variant="ghost" style={{ marginTop: '10px' }} onClick={() => setShowAddTask(true)}>
                        <Plus size={12} /> Add Task
                      </Button>
                    )}
                  </div>
                ) : (
                  <TaskList
                    tasks={columnTasks}
                    column={col.key}
                    onMove={moveTask}
                    onDelete={deleteTask}
                  />
                )}

                {col.key === 'todo' && columnTasks.length > 0 && (
                  <Button variant="secondary" onClick={() => setShowAddTask(true)} style={{ width: '100%', marginTop: '10px' }}>
                    <Plus size={13} /> Add another task
                  </Button>
                )}
              </MotionDiv>
            );
          })}
        </div>
      )}

      {showAddTask && (
        <AddTaskModal
          onClose={() => setShowAddTask(false)}
          onAdd={(task) => {
            addTask(task);
            setShowAddTask(false);
          }}
        />
      )}

      {!isLoading && totalTasks === 0 && (
        <div className="glass-card" style={{ marginTop: '16px', borderRadius: '14px', padding: '24px', textAlign: 'center' }}>
          <AlertTriangle size={18} color="#a78bfa" style={{ marginBottom: '8px' }} />
          <h3 style={{ color: 'var(--text-strong)', fontSize: '0.98rem', fontWeight: 800 }}>No tasks yet</h3>
          <p style={{ color: 'var(--text-dim)', marginTop: '6px', fontSize: '0.84rem' }}>
            Start by creating your first task and assigning a due date.
          </p>
          <Button style={{ marginTop: '10px' }} onClick={() => setShowAddTask(true)}>
            <Plus size={14} /> Create first task
          </Button>
        </div>
      )}
    </div>
  );
}
