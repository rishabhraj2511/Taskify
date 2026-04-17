import { X } from 'lucide-react';

export default function Modal({ title, subtitle, onClose, children, width = '520px' }) {
  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 220,
        background: 'rgba(2, 6, 23, 0.7)',
        backdropFilter: 'blur(8px)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '18px',
      }}
      onClick={(event) => {
        if (event.target === event.currentTarget) {
          onClose();
        }
      }}
    >
      <div
        className="glass-card"
        style={{
          width: '100%',
          maxWidth: width,
          borderRadius: '20px',
          borderColor: 'var(--border-strong)',
          boxShadow: '0 24px 80px rgba(2, 6, 23, 0.45)',
          padding: '24px',
        }}
      >
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', marginBottom: '14px' }}>
          <div>
            <h2 style={{ fontWeight: 800, color: 'var(--text-strong)', fontSize: '1.08rem' }}>{title}</h2>
            {subtitle && (
              <p style={{ marginTop: '4px', color: 'var(--text-dim)', fontSize: '0.78rem' }}>{subtitle}</p>
            )}
          </div>
          <button
            onClick={onClose}
            style={{
              width: '32px',
              height: '32px',
              borderRadius: '9px',
              border: '1px solid var(--border-main)',
              background: 'var(--bg-soft)',
              color: 'var(--text-dim)',
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <X size={15} />
          </button>
        </div>

        {children}
      </div>
    </div>
  );
}
