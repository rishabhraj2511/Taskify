import { useOutletContext } from 'react-router-dom';
import { Bell, Zap, Shield, Palette } from 'lucide-react';
import Card from '../components/Card';

function Toggle({ checked, onChange, label }) {
  return (
    <label style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '14px 0',
      borderBottom: '1px solid rgba(30,58,95,0.3)',
    }}>
      <span style={{ fontSize: '0.85rem', color: 'white', fontWeight: 500 }}>{label}</span>
      <button
        onClick={() => onChange(!checked)}
        style={{
          width: '44px',
          height: '24px',
          borderRadius: '12px',
          background: checked ? 'linear-gradient(135deg, #7c3aed, #5b21b6)' : 'rgba(30,58,95,0.8)',
          border: 'none',
          cursor: 'pointer',
          position: 'relative',
          transition: 'background 0.2s',
        }}
      >
        <div style={{
          width: '18px',
          height: '18px',
          borderRadius: '50%',
          background: 'white',
          position: 'absolute',
          top: '3px',
          left: checked ? '23px' : '3px',
          transition: 'left 0.2s',
          boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
        }} />
      </button>
    </label>
  );
}

function SectionHeader({ icon, title }) {
  const Icon = icon;
  return (
    <div style={{
      display: 'flex',
      alignItems: 'center',
      gap: '10px',
      marginBottom: '16px',
      marginTop: '8px',
    }}>
      <div style={{
        width: '32px',
        height: '32px',
        borderRadius: '8px',
        background: 'rgba(124,58,237,0.15)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <Icon size={16} color="#a78bfa" />
      </div>
      <h3 style={{ fontSize: '0.9rem', fontWeight: 700, color: 'white' }}>{title}</h3>
    </div>
  );
}

function DangerButton({ onClick, label }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: '100%',
        padding: '12px',
        borderRadius: '10px',
        background: 'rgba(239,68,68,0.1)',
        border: '1px solid rgba(239,68,68,0.3)',
        color: '#fca5a5',
        fontSize: '0.82rem',
        fontWeight: 600,
        cursor: 'pointer',
        transition: 'all 0.2s',
        marginTop: '24px',
      }}
      onMouseOver={(e) => {
        e.currentTarget.style.background = 'rgba(239,68,68,0.2)';
      }}
      onMouseOut={(e) => {
        e.currentTarget.style.background = 'rgba(239,68,68,0.1)';
      }}
    >
      {label}
    </button>
  );
}

export default function Settings() {
  const { preferences, setPreferences } = useOutletContext();

  const updatePreference = (key, value) => {
    setPreferences(prev => ({
      ...prev,
      [key]: value,
    }));
  };

  const handleClearData = () => {
    if (window.confirm('Are you sure you want to clear all local data? This cannot be undone.')) {
      localStorage.removeItem('taskify.tasks.v1');
      localStorage.removeItem('taskify.prefs.v1');
      window.location.reload();
    }
  };

  return (
    <div style={{ animation: 'fadeIn 0.4s ease-out' }}>
      <div style={{ marginBottom: '24px' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.03em' }}>
          Settings
        </h2>
        <p style={{ color: '#64748b', fontSize: '0.875rem', marginTop: '4px' }}>
          Customize your Taskify experience
        </p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
        <Card style={{ padding: '20px' }}>
          <SectionHeader icon={Palette} title="Display" />
          <Toggle
            checked={preferences.compactCards}
            onChange={(val) => updatePreference('compactCards', val)}
            label="Compact Cards"
          />
          <p style={{ fontSize: '0.68rem', color: '#475569', marginTop: '-8px', paddingBottom: '8px' }}>
            Reduce padding in task cards for more content density
          </p>

          <div style={{ paddingTop: '8px' }}>
            <Toggle
              checked={preferences.enableAiHints}
              onChange={(val) => updatePreference('enableAiHints', val)}
              label="AI Hints & Suggestions"
            />
          </div>
        </Card>

        <Card style={{ padding: '20px' }}>
          <SectionHeader icon={Zap} title="Performance" />
          <Toggle
            checked={preferences.showBurnoutWarnings}
            onChange={(val) => updatePreference('showBurnoutWarnings', val)}
            label="Burnout Warnings"
          />
          <p style={{ fontSize: '0.68rem', color: '#475569', marginTop: '-8px', paddingBottom: '8px' }}>
            Get alerts when workload may cause burnout
          </p>
        </Card>

        <Card style={{ padding: '20px' }}>
          <SectionHeader icon={Bell} title="Notifications" />
          <Toggle
            checked={preferences.enableAiHints}
            onChange={(val) => updatePreference('enableAiHints', val)}
            label="Desktop Notifications"
          />
          <p style={{ fontSize: '0.68rem', color: '#475569', marginTop: '-8px', paddingBottom: '8px' }}>
            Receive browser notifications for important updates
          </p>
        </Card>

        <Card style={{ padding: '20px' }}>
          <SectionHeader icon={Shield} title="Data & Privacy" />
          <div style={{ paddingTop: '8px' }}>
            <p style={{ fontSize: '0.82rem', color: '#94a3b8', marginBottom: '12px' }}>
              Your data is stored locally in your browser. No data is sent to external servers.
            </p>
            <p style={{ fontSize: '0.72rem', color: '#475569' }}>
              Storage used: ~{Math.round(JSON.stringify(localStorage.getItem('taskify.tasks.v1') || '').length / 1024 * 10) / 10} KB
            </p>
          </div>
          <DangerButton onClick={handleClearData} label="Clear All Local Data" />
        </Card>
      </div>
    </div>
  );
}
