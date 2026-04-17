import { useMemo, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Lock, ArrowLeft, Zap, Eye, EyeOff } from 'lucide-react';
import Card from '../components/Card';

export default function ResetPassword() {
  const navigate = useNavigate();
  const resetState = useMemo(() => {
    const storedEmail = localStorage.getItem('taskify.resetEmail');
    if (!storedEmail) {
      return {
        email: '',
        isValid: false,
        error: 'Invalid reset link. Please request a new password reset.',
      };
    }

    const resetRequests = JSON.parse(localStorage.getItem('taskify.resetRequests') || '[]');
    const validRequest = resetRequests.find(
      r => r.email === storedEmail && new Date(r.expiresAt) > new Date()
    );

    if (!validRequest) {
      return {
        email: '',
        isValid: false,
        error: 'Reset link has expired. Please request a new password reset.',
      };
    }

    return {
      email: storedEmail,
      isValid: true,
      error: '',
    };
  }, []);

  const [email] = useState(resetState.email);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState(resetState.error);
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [isValid] = useState(resetState.isValid);

  const handleReset = (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    // Update user password
    const existingUsers = JSON.parse(localStorage.getItem('taskify.users') || '[]');
    const teamMembers = JSON.parse(localStorage.getItem('taskify.teamMembers') || '[]');

    let updated = false;

    // Check in users
    const userIndex = existingUsers.findIndex(u => u.email === email);
    if (userIndex > -1) {
      existingUsers[userIndex].password = password;
      localStorage.setItem('taskify.users', JSON.stringify(existingUsers));
      updated = true;
    }

    // Check in team members
    const memberIndex = teamMembers.findIndex(m => m.email === email);
    if (memberIndex > -1) {
      teamMembers[memberIndex].password = password;
      localStorage.setItem('taskify.teamMembers', JSON.stringify(teamMembers));
      updated = true;
    }

    if (updated) {
      // Clear reset request
      const resetRequests = JSON.parse(localStorage.getItem('taskify.resetRequests') || '[]');
      const filtered = resetRequests.filter(r => r.email !== email);
      localStorage.setItem('taskify.resetRequests', JSON.stringify(filtered));
      
      // Clear stored email
      localStorage.removeItem('taskify.resetEmail');

      setMessage('Password has been reset successfully!');
      setError('');
      
      setTimeout(() => {
        navigate('/login');
      }, 2000);
    } else {
      setError('Failed to update password. Please try again.');
    }
  };

  if (!isValid) {
    return (
      <div style={{
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        minHeight: '100vh', background: '#020617', padding: '20px',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(circle at 50% 50%, rgba(124,58,237,0.15) 0%, transparent 40%)'
        }} />

        <Card style={{ maxWidth: '450px', width: '100%', padding: '40px', position: 'relative', zIndex: 10, textAlign: 'center' }}>
          <div style={{ marginBottom: '24px', color: '#ef4444', fontSize: '3rem' }}>×</div>
          <h2 style={{ color: 'white', fontSize: '1.3rem', fontWeight: 800, marginBottom: '12px' }}>
            Invalid Reset Link
          </h2>
          <p style={{ color: '#94a3b8', fontSize: '0.9rem', marginBottom: '24px' }}>
            {error}
          </p>
          <Link to="/login" className="btn-primary" style={{ display: 'inline-block', padding: '10px 24px', textDecoration: 'none' }}>
            Return to Login
          </Link>
        </Card>
      </div>
    );
  }

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#020617', padding: '20px',
      position: 'relative'
    }}>
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
            Create New Password
          </h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>
            Enter your new password below
          </p>
        </div>

        {message && (
          <div style={{ padding: '10px', background: 'rgba(34, 197, 94, 0.1)', border: '1px solid rgba(34, 197, 94, 0.2)', color: '#86efac', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '20px', textAlign: 'center' }}>
            {message}
          </div>
        )}

        {error && (
          <div style={{ padding: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleReset} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>New Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={e => {
                  setPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 38px 10px 38px', borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(30, 58, 95, 0.6)',
                  color: 'white', fontSize: '0.9rem', outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Confirm Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type={showConfirm ? 'text' : 'password'}
                value={confirmPassword}
                onChange={e => {
                  setConfirmPassword(e.target.value);
                  setError('');
                }}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 38px 10px 38px', borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(30, 58, 95, 0.6)',
                  color: 'white', fontSize: '0.9rem', outline: 'none'
                }}
              />
              <button
                type="button"
                onClick={() => setShowConfirm(!showConfirm)}
                style={{ position: 'absolute', right: '12px', top: '50%', transform: 'translateY(-50%)', background: 'none', border: 'none', cursor: 'pointer', color: '#64748b' }}
              >
                {showConfirm ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px', fontSize: '0.95rem' }}>
            Reset Password
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
          <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '4px' }}>
            <ArrowLeft size={14} /> Back to Login
          </Link>
        </div>
      </Card>
    </div>
  );
}
