export default function Card({ children, className = '', gradient = false, style = {} }) {
  const baseStyle = {
    borderRadius: '16px',
    padding: '20px',
    position: 'relative',
    overflow: 'hidden',
    ...style,
  };

  if (gradient) {
    return (
      <div style={{
        ...baseStyle,
        background: 'linear-gradient(135deg, rgba(124,58,237,0.25) 0%, rgba(37,99,235,0.2) 50%, rgba(6,182,212,0.15) 100%)',
        border: '1px solid rgba(124,58,237,0.3)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px rgba(124,58,237,0.1), inset 0 1px 0 rgba(255,255,255,0.08)',
      }} className={className}>
        {/* Glow overlay */}
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse at top left, rgba(124,58,237,0.15) 0%, transparent 60%)',
        }} />
        <div style={{ position: 'relative', zIndex: 1 }}>{children}</div>
      </div>
    );
  }

  return (
    <div className={`glass-card-hover ${className}`} style={baseStyle}>
      {children}
    </div>
  );
}
