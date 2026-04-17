import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, Zap } from 'lucide-react';
import Card from '../components/Card';

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError('Please fill in all fields');
      return;
    }
    
    // Check in users
    const existingUsers = JSON.parse(localStorage.getItem('taskify.users') || '[]');
    let user = existingUsers.find(u => u.email === email && u.password === password);

    // Check in team members if not found in users
    if (!user) {
      const teamMembers = JSON.parse(localStorage.getItem('taskify.teamMembers') || '[]');
      user = teamMembers.find(m => m.email === email && m.password === password);
    }

    if (user) {
      localStorage.setItem('taskify.user', JSON.stringify(user));
      navigate('/');
    } else {
      setError('Invalid email or password');
    }
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

      <Card style={{ maxWidth: '400px', width: '100%', padding: '40px', position: 'relative', zIndex: 10 }}>
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
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>Welcome Back</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Login to your Taskify account</p>
        </div>

        {error && (
          <div style={{ padding: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                placeholder="you@company.com"
                style={{
                  width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(30, 58, 95, 0.6)',
                  color: 'white', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                placeholder="••••••••"
                style={{
                  width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(30, 58, 95, 0.6)',
                  color: 'white', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', justifyContent: 'center', padding: '12px', marginTop: '10px', fontSize: '0.95rem' }}>
            Sign In
          </button>

          <Link to="/forgot-password" style={{ textAlign: 'center', color: '#a78bfa', textDecoration: 'none', fontWeight: 600, fontSize: '0.8rem' }}>
            Forgot password?
          </Link>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          Don't have an account? <Link to="/signup" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Create one</Link>
        </div>
      </Card>
    </div>
  );
}