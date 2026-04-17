import { Outlet } from 'react-router-dom';
import { useEffect, useMemo, useRef, useState } from 'react';
import Sidebar from '../components/Sidebar';
import Navbar from '../components/Navbar';
import { initialTasks, notifications as defaultNotifications } from '../data/dummyData';
import { getBurnoutByDeadline } from '../utils/teamInsights';

const TASKS_STORAGE_KEY = 'taskify.tasks.v1';
const PREFS_STORAGE_KEY = 'taskify.prefs.v1';

const defaultPreferences = {
  compactCards: false,
  enableAiHints: true,
  showBurnoutWarnings: true,
};

function buildDefaultNotifications() {
  return defaultNotifications.map((n, idx) => ({
    ...n,
    read: idx > 1,
  }));
}

function loadTasks() {
  try {
    const raw = localStorage.getItem(TASKS_STORAGE_KEY);
    if (!raw) {
      return initialTasks;
    }

    const parsed = JSON.parse(raw);
    if (!parsed || !parsed.todo || !parsed.inprogress || !parsed.done) {
      return initialTasks;
    }

    return parsed;
  } catch {
    return initialTasks;
  }
}

function loadPreferences() {
  try {
    const raw = localStorage.getItem(PREFS_STORAGE_KEY);
    if (!raw) {
      return defaultPreferences;
    }

    return {
      ...defaultPreferences,
      ...JSON.parse(raw),
    };
  } catch {
    return defaultPreferences;
  }
}

export default function MainLayout() {
  const [tasks, setTasks] = useState(loadTasks);
  const [notifications, setNotifications] = useState(buildDefaultNotifications);
  const [toasts, setToasts] = useState([]);
  const [showAddTask, setShowAddTask] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [preferences, setPreferences] = useState(loadPreferences);
  const lastAutoAlerts = useRef({ overdueKey: '', burnoutKey: '' });

  const unreadCount = useMemo(
    () => notifications.filter(n => !n.read).length,
    [notifications],
  );

  useEffect(() => {
    localStorage.setItem(TASKS_STORAGE_KEY, JSON.stringify(tasks));
  }, [tasks]);

  useEffect(() => {
    localStorage.setItem(PREFS_STORAGE_KEY, JSON.stringify(preferences));
  }, [preferences]);

  const pushToast = (message, tone = 'info') => {
    const id = `toast_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    setToasts(prev => [...prev, { id, message, tone }]);

    window.setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 2400);
  };

  const addNotification = (notification) => {
    setNotifications(prev => [{
      id: `n_${Date.now()}`,
      time: 'just now',
      read: false,
      ...notification,
    }, ...prev]);
  };

  useEffect(() => {
    const activeTasks = [...tasks.todo, ...tasks.inprogress];
    const overdueTasks = activeTasks.filter((task) => new Date(task.deadline) < new Date());

    const overdueKey = overdueTasks
      .map(task => task.id)
      .sort()
      .join('|');

    if (overdueKey && overdueKey !== lastAutoAlerts.current.overdueKey) {
      queueMicrotask(() => {
        addNotification({
          type: 'warning',
          message: `${overdueTasks.length} task${overdueTasks.length > 1 ? 's are' : ' is'} overdue.`,
        });
      });
      lastAutoAlerts.current.overdueKey = overdueKey;
    }

    const burnout = getBurnoutByDeadline(tasks);
    const burnoutKey = burnout.isBurnoutRisk ? `${burnout.peakDate}:${burnout.peakCount}` : '';

    if (burnoutKey && burnoutKey !== lastAutoAlerts.current.burnoutKey) {
      queueMicrotask(() => {
        addNotification({
          type: 'danger',
          message: `Burnout risk: ${burnout.peakCount} tasks due on ${new Date(burnout.peakDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}.`,
        });
      });
      lastAutoAlerts.current.burnoutKey = burnoutKey;
    }
  }, [tasks]);

  const markNotificationRead = (notificationId) => {
    setNotifications(prev => prev.map(n => (
      n.id === notificationId ? { ...n, read: true } : n
    )));
  };

  const markAllNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const moveTask = (taskId, fromCol, toCol) => {
    setTasks(prev => {
      const task = prev[fromCol].find(t => t.id === taskId);
      if (!task) return prev;

      if (toCol === 'done' && fromCol !== 'done') {
        addNotification({
          type: 'success',
          message: `Task "${task.title}" was completed. Great job!`,
        });
        pushToast(`Completed: ${task.title}`, 'success');
      } else {
        pushToast(`Moved: ${task.title}`, 'info');
      }

      return {
        ...prev,
        [fromCol]: prev[fromCol].filter(t => t.id !== taskId),
        [toCol]: [task, ...prev[toCol]],
      };
    });
  };

  const addTask = (newTask) => {
    setTasks(prev => ({
      ...prev,
      todo: [newTask, ...prev.todo],
    }));

    addNotification({
      type: 'info',
      message: `New task added: "${newTask.title}".`,
    });
    pushToast(`Created: ${newTask.title}`, 'success');
  };

  const deleteTask = (taskId, fromCol) => {
    setTasks(prev => {
      const task = prev[fromCol].find((t) => t.id === taskId);
      if (!task) {
        return prev;
      }

      addNotification({
        type: 'warning',
        message: `Task removed: "${task.title}".`,
      });
      pushToast(`Deleted: ${task.title}`, 'danger');

      return {
        ...prev,
        [fromCol]: prev[fromCol].filter((t) => t.id !== taskId),
      };
    });
  };

  return (
    <div style={{ display: 'flex', height: '100vh', background: '#020617', overflow: 'hidden' }}>
      {/* Ambient background glows */}
      <div style={{
        position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 0,
        background: 'radial-gradient(ellipse at 20% 50%, rgba(124,58,237,0.06) 0%, transparent 50%), radial-gradient(ellipse at 80% 20%, rgba(37,99,235,0.05) 0%, transparent 40%)',
      }} />

      <Sidebar unreadCount={unreadCount} />

      <div style={{ flex: 1, marginLeft: '240px', display: 'flex', flexDirection: 'column', overflow: 'hidden', position: 'relative', zIndex: 1 }}>
        <Navbar
          notifications={notifications}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
          onMarkAllNotificationsRead={markAllNotificationsRead}
          onMarkNotificationRead={markNotificationRead}
          onAddTask={() => setShowAddTask(true)}
        />

        <main style={{
          flex: 1,
          overflowY: 'auto',
          padding: '88px 24px 24px',
        }}>
          <Outlet context={{
            tasks,
            setTasks,
            moveTask,
            addTask,
            deleteTask,
            notifications,
            markNotificationRead,
            markAllNotificationsRead,
            showAddTask,
            setShowAddTask,
            searchQuery,
            setSearchQuery,
            preferences,
            setPreferences,
          }} />
        </main>
      </div>

      <div style={{
        position: 'fixed',
        right: '16px',
        bottom: '16px',
        zIndex: 220,
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
      }}>
        {toasts.map((toast) => {
          const tones = {
            info: { bg: 'rgba(37,99,235,0.15)', border: 'rgba(37,99,235,0.3)', color: '#93c5fd' },
            success: { bg: 'rgba(16,185,129,0.15)', border: 'rgba(16,185,129,0.3)', color: '#6ee7b7' },
            danger: { bg: 'rgba(239,68,68,0.15)', border: 'rgba(239,68,68,0.3)', color: '#fca5a5' },
          };
          const c = tones[toast.tone] || tones.info;

          return (
            <div key={toast.id} style={{
              minWidth: '220px',
              maxWidth: '320px',
              padding: '10px 12px',
              borderRadius: '10px',
              background: c.bg,
              border: `1px solid ${c.border}`,
              color: c.color,
              fontSize: '0.78rem',
              fontWeight: 600,
              animation: 'slideUp 0.2s ease-out',
              boxShadow: '0 8px 20px rgba(0,0,0,0.35)',
            }}>
              {toast.message}
            </div>
          );
        })}
      </div>
    </div>
  );
}
