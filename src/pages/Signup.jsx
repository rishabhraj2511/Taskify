import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, User, Briefcase, Zap } from 'lucide-react';
import Card from '../components/Card';

const roles = [
  { id: 'MANAGER', label: 'Manager', desc: 'To manage teams and projects' },
  { id: 'TEAM_LEAD', label: 'Team Lead', desc: 'To manage team tasks' },
  { id: 'TEAM_MEMBER', label: 'Team Member', desc: 'To do tasks' },
  { id: 'PROJECT_MANAGER', label: 'Project Manager', desc: 'To oversee projects' },
  { id: 'DELIVERY_MANAGER', label: 'Delivery Manager', desc: 'To coordinate deliveries' }
];

export default function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    role: 'TEAM_MEMBER'
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSignup = (e) => {
    e.preventDefault();
    const { name, email, password, role } = formData;
    
    if (!name || !email || !password || !role) {
      setError('Please fill in all fields');
      return;
    }

    // Check in both users and team members
    const existingUsers = JSON.parse(localStorage.getItem('taskify.users') || '[]');
    const existingMembers = JSON.parse(localStorage.getItem('taskify.teamMembers') || '[]');

    if (existingUsers.some(u => u.email === email) || existingMembers.some(m => m.email === email)) {
      setError('An account with this email already exists');
      return;
    }

    // Generate avatar
    const avatar = name.split(' ').map(n => n[0]).join('').toUpperCase();
    const colors = [
      'from-violet-500 to-purple-600',
      'from-blue-500 to-cyan-600',
      'from-pink-500 to-rose-600',
      'from-emerald-500 to-teal-600',
      'from-amber-500 to-orange-600',
      'from-indigo-500 to-blue-600',
    ];
    const color = colors[Math.floor(Math.random() * colors.length)];

    if (role === 'MANAGER') {
      // Store managers in users
      const newUser = { 
        id: `u_${Date.now()}`, 
        name, 
        email, 
        password, 
        role,
        avatar,
        color,
      };
      localStorage.setItem('taskify.users', JSON.stringify([...existingUsers, newUser]));
    } else {
      // Store team leads, members, etc. in team members
      const newMember = { 
        id: `m_${Date.now()}`, 
        name, 
        email, 
        password, 
        role,
        avatar,
        color,
        tasksCompleted: 0,
        tasksInProgress: 0,
        contributionScore: 0,
        points: 0,
        productivity: 0,
      };
      localStorage.setItem('taskify.teamMembers', JSON.stringify([...existingMembers, newMember]));
    }
    
    // Redirect to login
    navigate('/login');
  };

  return (
    <div style={{
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      minHeight: '100vh', background: '#020617', padding: '20px',
      position: 'relative'
    }}>
      {/* Background */}
      <div style={{
        position: 'absolute', inset: 0, pointerEvents: 'none',
        background: 'radial-gradient(circle at 50% 50%, rgba(37,99,235,0.15) 0%, transparent 40%)'
      }} />

      <Card style={{ maxWidth: '440px', width: '100%', padding: '40px', position: 'relative', zIndex: 10 }}>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginBottom: '24px' }}>
          <div style={{
            width: '48px', height: '48px', borderRadius: '14px',
            background: 'linear-gradient(135deg, #7c3aed, #2563eb)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 0 20px rgba(124,58,237,0.4)',
            marginBottom: '16px'
          }}>
            <Zap size={24} color="white" fill="white" />
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, color: 'white', letterSpacing: '-0.02em', marginBottom: '8px' }}>Join Taskify</h1>
          <p style={{ color: '#64748b', fontSize: '0.85rem' }}>Create an account to get started</p>
        </div>

        {error && (
          <div style={{ padding: '10px', background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)', color: '#fca5a5', borderRadius: '8px', fontSize: '0.8rem', marginBottom: '20px', textAlign: 'center' }}>
            {error}
          </div>
        )}

        <form onSubmit={handleSignup} style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Full Name</label>
            <div style={{ position: 'relative' }}>
              <User size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                style={{
                  width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(30, 58, 95, 0.6)',
                  color: 'white', fontSize: '0.9rem', outline: 'none'
                }}
              />
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Email Address</label>
            <div style={{ position: 'relative' }}>
              <Mail size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
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
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Your Role</label>
            <div style={{ position: 'relative' }}>
              <Briefcase size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <select
                name="role"
                value={formData.role}
                onChange={handleChange}
                style={{
                  width: '100%', padding: '10px 10px 10px 38px', borderRadius: '8px',
                  background: 'rgba(15, 23, 42, 0.6)', border: '1px solid rgba(30, 58, 95, 0.6)',
                  color: 'white', fontSize: '0.9rem', outline: 'none', appearance: 'none', cursor: 'pointer'
                }}
              >
                {roles.map(r => (
                  <option key={r.id} value={r.id} style={{ background: '#0f172a', color: 'white' }}>
                    {r.label} - {r.desc}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 600, color: '#94a3b8', marginBottom: '8px' }}>Password</label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} color="#64748b" style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)' }} />
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
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
            Create Account
          </button>
        </form>

        <div style={{ marginTop: '24px', textAlign: 'center', fontSize: '0.85rem', color: '#64748b' }}>
          Already have an account? <Link to="/login" style={{ color: '#a78bfa', textDecoration: 'none', fontWeight: 600 }}>Sign in</Link>
        </div>
      </Card>
    </div>
  );
}