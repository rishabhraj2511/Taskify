import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, ArrowLeft, Zap } from 'lucide-react';
import Card from '../components/Card';

export default function ForgotPassword() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!email) {
      setError('Please enter your email address');
      return;
    }

    const existingUsers = JSON.parse(localStorage.getItem('taskify.users') || '[]');
    const teamMembers = JSON.parse(localStorage.getItem('taskify.teamMembers') || '[]');
    
    const userExists = existingUsers.find(u => u.email === email) || 
                      teamMembers.find(m => m.email === email);

    if (!userExists) {
      setError('No account found with this email address');
      return;
    }

    // Generate reset token (mock)
    const resetToken = `reset_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const resetData = {
      email,
      token: resetToken,
      createdAt: new Date().toISOString(),
      expiresAt: new Date(Date.now() + 3600000).toISOString(), // 1 hour expiry
    };

    // Store reset request
    const resetRequests = JSON.parse(localStorage.getItem('taskify.resetRequests') || '[]');
    resetRequests.push(resetData);
    localStorage.setItem('taskify.resetRequests', JSON.stringify(resetRequests));

    setSubmitted(true);
    setMessage(`Reset link has been sent to ${email}. Check your email for password reset instructions.`);
    setError('');
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#020617', padding: '20px',
      position: 'relative'
    }}>
      {/* Background glow */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 40%)'
      }} />

      <Card style={{ maxWidth: '450px', width: '100%', padding: '40px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '30px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            marginBottom: '16px'
          }}>
            <Zap size={24} color="white" fill="white" />
          </div>
          <h1 style={{ fontSize: '1.6rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>
            Reset Password
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem', textAlign: 'center' }}>
            Enter your email address and we'll send you a link to reset your password
          </p>
        </div>

        {submitted ? (
          <div style={{
            padding: '24px',
            background: 'rgba(34, 197, 94, 0.1)',
            border: '1px solid rgba(34, 197, 94, 0.2)',
            borderRadius: '12px',
            textAlign: 'center',
            marginBottom: '24px'
          }}>
            <p style={{ color: '#86efac', fontSize: '0.9rem', fontWeight: 600, marginBottom: '12px' }}>
              ✓ Reset Link Sent
            </p>
            <p style={{ color: '#cbd5e1', fontSize: '0.85rem', marginBottom: '20px' }}>
              {message}
            </p>
            <button
              onClick={() => {
                localStorage.setItem('taskify.resetEmail', email);
                navigate(`/reset-password?token=${encodeURIComponent(email)}`);
              }}
              style={{
                padding: '10px 16px',
                background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 600,
                fontSize: '0.85rem',
              }}
            >
              Go to Reset Password
            </button>
          </div>
        ) : (
          <>
            {error && (
              <div style={{ padding: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '20px', textAlign: 'center' }}>
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Email Address</label>
                <div style={{ position: 'relative' }}>
                  <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
                  <input
                    type="email"
                    value={email}
                    onChange={e => {
                      setEmail(e.target.value);
                      setError('');
                    }}
                    placeholder="you@company.com"
                    style={{
                      width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px',
                      background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(30, 58, 95, 0.6)',
                      color: 'white', fontSize: '0.9rem', outline: 'none'
                    }}
                  />
                </div>
              </div>

              <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px', fontSize: '0.95rem' }}>
                Send Reset Link
              </button>
            </form>
          </>
        )}

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
