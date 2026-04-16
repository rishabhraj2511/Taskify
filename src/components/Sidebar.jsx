import { NavLink, useLocation } from 'react-router-dom';
import {
  LayoutDashboard, CheckSquare, Users, BarChart3,
  Zap, Bell, Settings, ChevronRight, Sparkles
} from 'lucide-react';

const navItems = [
  { to: '/',          icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks',     icon: CheckSquare,     label: 'Tasks'     },
  { to: '/team',      icon: Users,           label: 'Team'      },
  { to: '/analytics', icon: BarChart3,       label: 'Analytics' },
  { to: '/notifications', icon: Bell,        label: 'Notifications' },
  { to: '/settings', icon: Settings,         label: 'Settings' },
];

export default function Sidebar({ unreadCount = 0 }) {
  const location = useLocation();

  return (
    <aside
      style={{
        width: '240px',
        minWidth: '240px',
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        background: 'rgba(5, 12, 26, 0.95)',
        backdropFilter: 'blur(24px)',
        borderRight: '1px solid rgba(30, 58, 95, 0.5)',
        display: 'flex',
        flexDirection: 'column',
        zIndex: 50,
        padding: '0',
      }}
    >
      {/* Logo */}
      <div style={{ padding: '24px 20px 20px', borderBottom: '1px solid rgba(30,58,95,0.4)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <div style={{
            width: '36px', height: '36px', borderRadius: '10px',
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)',
          }}>
            <Zap size={18} color="white" fill="white" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.1rem', color: 'white', letterSpacing: '-0.02em' }}>
              Taskify
            </div>
            <div style={{ fontSize: '0.65rem', color: '#6366f1', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
              AI Workspace
            </div>
          </div>
        </div>

        {/* AI Badge */}
        <div style={{
          marginTop: '12px',
          padding: '6px 10px',
          borderRadius: '8px',
          background: 'linear-gradient(135deg, rgba(124,58,237,0.15), rgba(37,99,235,0.1))',
          border: '1px solid rgba(124,58,237,0.25)',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
        }}>
          <Sparkles size={12} color="#a78bfa" />
          <span style={{ fontSize: '0.7rem', color: '#a78bfa', fontWeight: 600 }}>AI-Powered Insights Active</span>
        </div>
      </div>

      {/* Navigation */}
      <nav style={{ flex: 1, padding: '16px 12px', display: 'flex', flexDirection: 'column', gap: '4px' }}>
        <div style={{ fontSize: '0.65rem', fontWeight: 700, color: '#475569', letterSpacing: '0.12em', textTransform: 'uppercase', padding: '0 8px', marginBottom: '8px' }}>
          Navigation
        </div>
        {navItems.map(({ to, icon, label }) => {
          const Icon = icon;
          const isActive = to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(to);
          return (
            <NavLink
              key={to}
              to={to}
              end={to === '/'}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon size={17} />
              <span style={{ flex: 1 }}>{label}</span>
              {isActive && <ChevronRight size={14} style={{ opacity: 0.5 }} />}
            </NavLink>
          );
        })}
      </nav>

      <div style={{ padding: '12px', borderTop: '1px solid rgba(30,58,95,0.4)' }}>
        {/* User profile */}
        <div style={{
          marginTop: '12px',
          padding: '10px',
          borderRadius: '12px',
          background: 'rgba(30,58,95,0.3)',
          border: '1px solid rgba(30,58,95,0.5)',
          display: 'flex',
          alignItems: 'center',
          gap: '10px',
          cursor: 'pointer',
          transition: 'all 0.2s',
        }}>
          <div style={{
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: '0.75rem', fontWeight: 700, color: 'white',
          }}>
            YO
          </div>
          <div style={{ flex: 1, minWidth: 0 }}>
            <div style={{ fontSize: '0.8rem', fontWeight: 600, color: 'white', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
              You
            </div>
            <div style={{ fontSize: '0.68rem', color: '#64748b' }}>Admin</div>
          </div>
        </div>

        {unreadCount > 0 && (
          <div style={{
            marginTop: '10px',
            padding: '8px 10px',
            borderRadius: '8px',
            background: 'rgba(239,68,68,0.1)',
            border: '1px solid rgba(239,68,68,0.2)',
            color: '#fca5a5',
            fontSize: '0.7rem',
            fontWeight: 600,
            textAlign: 'center',
          }}>
            {unreadCount} unread notification{unreadCount > 1 ? 's' : ''}
          </div>
        )}
      </div>
    </aside>
  );
}
