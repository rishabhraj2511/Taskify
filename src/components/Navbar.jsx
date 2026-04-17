import { useLocation } from 'react-router-dom';
import { Search, Bell, Plus, Sparkles, TrendingUp, Moon, Sun, Menu } from 'lucide-react';
import { useState } from 'react';

const pageTitles = {
  '/':           { title: 'Dashboard',  subtitle: 'Welcome back — here\'s what\'s happening today' },
  '/tasks':      { title: 'Tasks',      subtitle: 'Manage your kanban board and track progress' },
  '/team':       { title: 'Team',       subtitle: 'Your team performance and leaderboard' },
  '/analytics':  { title: 'Analytics',  subtitle: 'Deep dive into productivity metrics' },
  '/notifications': { title: 'Notifications', subtitle: 'Review and manage recent alerts' },
  '/settings': { title: 'Settings', subtitle: 'Customize your workspace preferences' },
};

export default function Navbar({
  notifications = [],
  onAddTask,
  searchQuery = '',
  onSearchChange,
  onMarkAllNotificationsRead,
  onMarkNotificationRead,
  isMobile = false,
  onToggleSidebar,
  preferences,
  onThemeToggle,
}) {
  const location = useLocation();
  const [showNotifs, setShowNotifs] = useState(false);
  const page = pageTitles[location.pathname] || pageTitles['/'];
  const unread = notifications.filter(n => !n.read).length;

  const userRecord = JSON.parse(localStorage.getItem('taskify.user') || '{}');
  const userRole = userRecord.role || 'TEAM_MEMBER';
  const userName = userRecord.name || 'User';
  // Only leads, PMs and DMs can create tasks
  const canCreateTask = ['TEAM_LEAD', 'PROJECT_MANAGER', 'DELIVERY_MANAGER'].includes(userRole);

  const notifColors = {
    warning: { bg: 'rgba(245,158,11,0.12)', border: 'rgba(245,158,11,0.25)', dot: '#f59e0b' },
    danger:  { bg: 'rgba(239,68,68,0.12)',  border: 'rgba(239,68,68,0.25)',  dot: '#ef4444' },
    info:    { bg: 'rgba(37,99,235,0.12)',   border: 'rgba(37,99,235,0.25)',  dot: '#3b82f6' },
    success: { bg: 'rgba(16,185,129,0.12)', border: 'rgba(16,185,129,0.25)', dot: '#10b981' },
  };

  return (
    <header style={{
      position: 'fixed',
      top: 0,
      left: isMobile ? 0 : '240px',
      right: 0,
      height: isMobile ? '62px' : '64px',
      background: 'var(--bg-panel)',
      backdropFilter: 'blur(24px)',
      borderBottom: '1px solid var(--border-main)',
      display: 'flex',
      alignItems: 'center',
      paddingInline: isMobile ? '12px' : '24px',
      gap: isMobile ? '10px' : '16px',
      zIndex: 40,
    }}>
      {isMobile && (
        <button className="btn-ghost mobile-only" onClick={onToggleSidebar} style={{ padding: '8px 10px' }}>
          <Menu size={16} />
        </button>
      )}

      {/* Page Title */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <h1 style={{ fontSize: isMobile ? '0.98rem' : '1.1rem', fontWeight: 800, color: 'var(--text-strong)', letterSpacing: '-0.02em' }}>
            {page.title}
          </h1>
          <div className="desktop-only" style={{
            display: 'flex', alignItems: 'center', gap: '4px',
            background: 'rgba(124,58,237,0.12)',
            border: '1px solid rgba(124,58,237,0.2)',
            borderRadius: '6px', padding: '2px 8px',
          }}>
            <TrendingUp size={10} color="#a78bfa" />
            <span style={{ fontSize: '0.65rem', color: '#a78bfa', fontWeight: 600 }}>Live</span>
          </div>
        </div>
        {!isMobile && <p style={{ fontSize: '0.72rem', color: 'var(--text-dim)', marginTop: '1px' }}>{page.subtitle}</p>}
      </div>

      {/* Search Bar */}
      <div style={{
        display: isMobile ? 'none' : 'flex',
        alignItems: 'center', gap: '8px',
        background: 'var(--bg-soft)',
        border: '1px solid var(--border-main)',
        borderRadius: '10px', padding: '8px 14px',
        width: '220px',
        transition: 'all 0.2s',
      }}>
        <Search size={14} color="#475569" />
        <input
          value={searchQuery}
          onChange={(e) => onSearchChange?.(e.target.value)}
          placeholder="Search tasks..."
          style={{
            background: 'none', border: 'none', outline: 'none',
            color: 'var(--text-main)', fontSize: '0.8rem', width: '100%',
          }}
        />
      </div>

      {/* AI Insight chip */}
      <div className="desktop-only" style={{
        display: 'flex', alignItems: 'center', gap: '6px',
        background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.1))',
        border: '1px solid rgba(124,58,237,0.25)',
        borderRadius: '8px', padding: '6px 10px',
        cursor: 'pointer',
      }}>
        <Sparkles size={13} color="#a78bfa" />
        <span style={{ fontSize: '0.72rem', color: '#a78bfa', fontWeight: 600 }}>AI Insights</span>
      </div>

      <button className="btn-ghost" onClick={onThemeToggle} style={{ padding: '8px 10px' }} title="Toggle theme">
        {preferences?.theme === 'light' ? <Moon size={15} /> : <Sun size={15} />}
      </button>

      {/* Add Task Button */}
      {location.pathname === '/tasks' && canCreateTask && !isMobile && (
        <button className="btn-primary desktop-only" onClick={onAddTask} style={{ whiteSpace: 'nowrap' }}>
          <Plus size={15} />
          New Task
        </button>
      )}

      {/* Notifications */}
      <div style={{ position: 'relative' }}>
        <button
          onClick={() => setShowNotifs(v => !v)}
          style={{
            position: 'relative',
            width: '38px', height: '38px',
            borderRadius: '10px',
            background: showNotifs ? 'rgba(124,58,237,0.15)' : 'rgba(10,22,40,0.8)',
            border: `1px solid ${showNotifs ? 'rgba(124,58,237,0.35)' : 'rgba(30,58,95,0.6)'}`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
            transition: 'all 0.2s',
          }}
        >
          <Bell size={16} color={showNotifs ? '#a78bfa' : '#64748b'} />
          {unread > 0 && (
            <span style={{
              position: 'absolute', top: '-4px', right: '-4px',
              width: '17px', height: '17px',
              background: 'linear-gradient(135deg, #ef4444, #dc2626)',
              borderRadius: '50%',
              fontSize: '0.6rem', fontWeight: 700, color: 'white',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              boxShadow: '0 0 10px rgba(239,68,68,0.5)',
              border: '2px solid #020617',
            }}>
              {unread}
            </span>
          )}
        </button>

        {showNotifs && (
          <div style={{
            position: 'absolute', top: '46px', right: 0,
            width: '340px',
            background: 'rgba(5,12,26,0.97)',
            backdropFilter: 'blur(24px)',
            border: '1px solid rgba(30,58,95,0.6)',
            borderRadius: '16px',
            boxShadow: '0 20px 60px rgba(0,0,0,0.6)',
            padding: '0',
            zIndex: 100,
            animation: 'slideUp 0.2s ease-out',
          }}>
            <div style={{ padding: '16px', borderBottom: '1px solid rgba(30,58,95,0.4)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontWeight: 700, color: 'white', fontSize: '0.875rem' }}>Notifications</span>
              <button
                onClick={() => onMarkAllNotificationsRead?.()}
                style={{
                  fontSize: '0.7rem',
                  color: '#6366f1',
                  fontWeight: 600,
                  cursor: 'pointer',
                  background: 'none',
                  border: 'none',
                }}
              >
                Mark all read
              </button>
            </div>
            <div style={{ maxHeight: '320px', overflowY: 'auto' }}>
              {notifications.map(n => {
                const c = notifColors[n.type] || notifColors.info;
                return (
                  <button
                    key={n.id}
                    onClick={() => onMarkNotificationRead?.(n.id)}
                    style={{
                    padding: '12px 16px',
                    borderBottom: '1px solid rgba(30,58,95,0.2)',
                    background: n.read ? 'rgba(10,22,40,0.55)' : c.bg,
                    display: 'flex', gap: '10px',
                    transition: 'background 0.2s',
                    cursor: 'pointer',
                    width: '100%',
                    textAlign: 'left',
                    border: 'none',
                  }}
                  >
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: n.read ? '#334155' : c.dot, marginTop: '5px', flexShrink: 0, boxShadow: n.read ? 'none' : `0 0 6px ${c.dot}` }} />
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: '0.78rem', color: n.read ? '#64748b' : '#cbd5e1', lineHeight: '1.4' }}>{n.message}</p>
                      <p style={{ fontSize: '0.68rem', color: '#475569', marginTop: '4px' }}>{n.time}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        )}
      </div>

      <div className="desktop-only" style={{
        padding: '6px 10px',
        borderRadius: '10px',
        border: '1px solid var(--border-main)',
        background: 'var(--bg-soft)',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        minWidth: '130px',
      }}>
        <div style={{
          width: '26px',
          height: '26px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: 'white',
          fontWeight: 700,
          fontSize: '0.7rem',
        }}>
          {userName.slice(0, 2).toUpperCase()}
        </div>
        <div style={{ minWidth: 0 }}>
          <div style={{ fontSize: '0.76rem', fontWeight: 700, color: 'var(--text-strong)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{userName}</div>
          <div style={{ fontSize: '0.64rem', color: 'var(--text-dim)', textTransform: 'capitalize' }}>{userRole.toLowerCase().replace('_', ' ')}</div>
        </div>
      </div>
    </header>
  );
}
