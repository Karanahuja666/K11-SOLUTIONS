import { useState } from 'react'
import { Rocket, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

const ADMIN_EMAIL = 'karanahuja5894@gmail.com'
const ADMIN_PASS = 'karanyo'

interface Props { onLogin: () => void }

export default function AdminLogin({ onLogin }: Props) {
  const [email, setEmail] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (email === ADMIN_EMAIL && pass === ADMIN_PASS) {
      localStorage.setItem('k11_admin_auth', 'true')
      localStorage.setItem('k11_admin_session', Date.now().toString())
      onLogin()
      toast.success('Welcome back, Admin!')
    } else {
      toast.error('Invalid email or password')
    }
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)',
    borderRadius: 12, padding: '14px 16px', fontSize: 14, color: '#fff', outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color .3s',
  }

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#020617', padding: 24 }}>
      <div className="cosmic-card" style={{ padding: 40, width: '100%', maxWidth: 420, textAlign: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, marginBottom: 8 }}>
          <Rocket size={28} style={{ color: '#a78bfa' }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: '#fff' }}>K11 SOLUTIONS</span>
        </div>
        <div style={{ display: 'inline-flex', alignItems: 'center', gap: 6, padding: '6px 14px', borderRadius: 20, background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.2)', color: '#a78bfa', fontSize: 12, fontWeight: 500, marginBottom: 32 }}>
          <Lock size={12} /> Admin Panel — Secure Access
        </div>

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: 20, textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Email</label>
            <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="admin@email.com" style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,.5)'} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'} />
          </div>
          <div style={{ marginBottom: 24, textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" style={inputStyle}
              onFocus={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,.5)'} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'} />
          </div>
          <button type="submit" className="btn-primary" style={{ width: '100%', padding: 14, fontSize: 15 }}>
            <Lock size={16} /> Sign In
          </button>
        </form>
      </div>
    </div>
  )
}
