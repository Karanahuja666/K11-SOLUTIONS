import { useState } from 'react'
import { Rocket, Lock } from 'lucide-react'
import toast from 'react-hot-toast'

interface Props { onLogin: () => void }

export default function AdminLogin({ onLogin }: Props) {
  const [user, setUser] = useState('')
  const [pass, setPass] = useState('')

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (user === 'admin' && pass === 'k11admin') {
      localStorage.setItem('k11_auth', 'true')
      onLogin()
      toast.success('Welcome back, Admin!')
    } else {
      toast.error('Invalid credentials')
    }
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 transition-all'

  return (
    <div className="min-h-screen flex items-center justify-center cosmic-bg px-6">
      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-violet-600/8 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/4 w-72 h-72 bg-fuchsia-600/6 rounded-full blur-[100px]" />
      </div>

      <div className="relative cosmic-card p-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 rounded-2xl bg-violet-500/15 border border-violet-500/25 flex items-center justify-center mx-auto mb-4">
            <Rocket className="text-violet-400" size={24} />
          </div>
          <h1 className="text-xl font-bold text-white font-[family-name:var(--font-display)]">K11 Admin</h1>
          <p className="text-slate-500 text-sm mt-1">Sign in to manage your dashboard</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Username</label>
            <input type="text" value={user} onChange={e => setUser(e.target.value)} placeholder="admin" className={inputClass} />
          </div>
          <div>
            <label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Password</label>
            <input type="password" value={pass} onChange={e => setPass(e.target.value)} placeholder="••••••••" className={inputClass} />
          </div>
          <button type="submit" className="btn-primary w-full justify-center py-3.5 mt-2">
            <Lock size={16} /> Sign In
          </button>
        </form>
        <p className="text-center text-xs text-slate-600 mt-6">Default: admin / k11admin</p>
      </div>
    </div>
  )
}
