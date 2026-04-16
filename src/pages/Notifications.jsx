import { useOutletContext } from 'react-router-dom';
import { Bell, CheckCheck, Info, AlertTriangle, CheckCircle2, Trash2 } from 'lucide-react';
import Card from '../components/Card';

function NotificationItem({ notification, onMarkRead, onDelete }) {
  const icons = {
    info: <Info size={16} color="#3b82f6" />,
    success: <CheckCircle2 size={16} color="#10b981" />,
    warning: <AlertTriangle size={16} color="#f59e0b" />,
    danger: <AlertTriangle size={16} color="#ef4444" />,
  };

  const colors = {
    info: '#1e3a5f',
    success: 'rgba(16,185,129,0.1)',
    warning: 'rgba(245,158,11,0.1)',
    danger: 'rgba(239,68,68,0.1)',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'flex-start',
        gap: '12px',
        padding: '14px 16px',
        background: notification.read ? 'transparent' : colors[notification.type] || colors.info,
        borderRadius: '12px',
        border: `1px solid ${notification.read ? 'rgba(30,58,95,0.3)' : 'rgba(30,58,95,0.6)'}`,
        transition: 'all 0.2s',
      }}
    >
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'rgba(30,58,95,0.5)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}>
        {icons[notification.type] || icons.info}
      </div>

      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{
          fontSize: '0.82rem',
          color: notification.read ? '#64748b' : 'white',
          fontWeight: notification.read ? 400 : 600,
          marginBottom: '4px',
        }}>
          {notification.message}
        </p>
        <p style={{ fontSize: '0.68rem', color: '#475569' }}>{notification.time}</p>
      </div>

      <div style={{ display: 'flex', gap: '8px', flexShrink: 0 }}>
        {!notification.read && (
          <button
            onClick={() => onMarkRead(notification.id)}
            style={{
              width: '28px',
              height: '28px',
              borderRadius: '6px',
              background: 'rgba(30,58,95,0.5)',
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              transition: 'background 0.2s',
            }}
            onMouseOver={(e) => e.currentTarget.style.background = 'rgba(37,99,235,0.3)'}
            onMouseOut={(e) => e.currentTarget.style.background = 'rgba(30,58,95,0.5)'}
          >
            <CheckCheck size={14} color="#93c5fd" />
          </button>
        )}
        <button
          onClick={() => onDelete(notification.id)}
          style={{
            width: '28px',
            height: '28px',
            borderRadius: '6px',
            background: 'rgba(30,58,95,0.5)',
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'background 0.2s',
          }}
          onMouseOver={(e) => e.currentTarget.style.background = 'rgba(239,68,68,0.3)'}
          onMouseOut={(e) => e.currentTarget.style.background = 'rgba(30,58,95,0.5)'}
        >
          <Trash2 size={14} color="#fca5a5" />
        </button>
      </div>
    </div>
  );
}

export default function Notifications() {
  const { notifications, markNotificationRead, markAllNotificationsRead } = useOutletContext();

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <div>
          <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
            Notifications
          </h2>
          <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
            {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
          </p>
        </div>
        {unreadCount > 0 && (
          <button
            onClick={markAllNotificationsRead}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '6px',
              padding: '8px 14px',
              borderRadius: '8px',
              background: 'rgba(37,99,235,0.15)',
              border: '1px solid rgba(37,99,235,0.3)',
              color: '#93c5fd',
              fontSize: '0.78rem',
              fontWeight: 600,
              cursor: 'pointer',
              transition: 'all 0.2s',
            }}
            onMouseOver={(e) => {
              e.currentTarget.style.background = 'rgba(37,99,235,0.25)';
            }}
            onMouseOut={(e) => {
              e.currentTarget.style.background = 'rgba(37,99,235,0.15)';
            }}
          >
            <CheckCheck size={14} />
            Mark all read
          </button>
        )}
      </div>

      {notifications.length === 0 ? (
        <Card style={{ padding: '40px', textAlign: 'center' }}>
          <div style={{
            width: '56px',
            height: '56px',
            borderRadius: '16px',
            background: 'rgba(30,58,95,0.5)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 16px',
          }}>
            <Bell size={24} color="#64748b" />
          </div>
          <p style={{ fontSize: '0.9rem', color: '#64748b' }}>No notifications yet</p>
        </Card>
      ) : (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {notifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              onMarkRead={markNotificationRead}
              onDelete={() => {}}
            />
          ))}
        </div>
      )}
    </div>
  );
}
