import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Rocket, LayoutDashboard, FolderOpen, Mail, LogOut, Plus, Trash2, Edit3, Eye, X, Save } from 'lucide-react'
import toast from 'react-hot-toast'

interface Project {
  id: string; title: string; category: string; description: string; tech: string[]; image: string; link: string
}
interface Message {
  id: string; name: string; email: string; phone: string; message: string; date: string; read: boolean
}

const DEFAULT_PROJECTS: Project[] = [
  { id: '1', title: 'NeoVerse Platform', category: 'Web Application', description: 'AI-powered SaaS platform with real-time analytics.', tech: ['React', 'Node.js', 'Python', 'AWS'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', link: '#' },
  { id: '2', title: 'Luxe Commerce', category: 'E-Commerce', description: 'Premium e-commerce experience for luxury fashion.', tech: ['Next.js', 'Stripe', 'Three.js'], image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80', link: '#' },
  { id: '3', title: 'QuantumPay', category: 'Fintech', description: 'Modern fintech app with biometric auth.', tech: ['React Native', 'Firebase'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', link: '#' },
]

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [page, setPage] = useState<'dashboard' | 'projects' | 'messages' | 'add'>('dashboard')
  const [projects, setProjects] = useState<Project[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [form, setForm] = useState({ title: '', category: '', description: '', tech: '', image: '', link: '' })

  useEffect(() => {
    const p = localStorage.getItem('k11_projects')
    setProjects(p ? JSON.parse(p) : DEFAULT_PROJECTS)
    const m = localStorage.getItem('k11_messages')
    setMessages(m ? JSON.parse(m) : [])
  }, [])

  const saveProjects = (p: Project[]) => { setProjects(p); localStorage.setItem('k11_projects', JSON.stringify(p)) }

  const handleSave = () => {
    if (!form.title || !form.category) { toast.error('Title and category required'); return }
    const proj: Project = {
      id: editProject?.id || Date.now().toString(),
      title: form.title, category: form.category, description: form.description,
      tech: form.tech.split(',').map(t => t.trim()).filter(Boolean),
      image: form.image || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80',
      link: form.link || '#',
    }
    if (editProject) {
      saveProjects(projects.map(p => p.id === editProject.id ? proj : p))
      toast.success('Project updated!')
    } else {
      saveProjects([proj, ...projects])
      toast.success('Project added!')
    }
    setForm({ title: '', category: '', description: '', tech: '', image: '', link: '' })
    setEditProject(null)
    setPage('projects')
  }

  const deleteProject = (id: string) => { saveProjects(projects.filter(p => p.id !== id)); toast.success('Project deleted') }

  const startEdit = (p: Project) => {
    setEditProject(p)
    setForm({ title: p.title, category: p.category, description: p.description, tech: p.tech.join(', '), image: p.image, link: p.link })
    setPage('add')
  }

  const deleteMessage = (id: string) => {
    const updated = messages.filter(m => m.id !== id)
    setMessages(updated)
    localStorage.setItem('k11_messages', JSON.stringify(updated))
    toast.success('Message deleted')
  }

  const inputClass = 'w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-slate-600 outline-none focus:border-violet-500/50 transition-all font-[family-name:var(--font-sans)]'

  const NAV = [
    { id: 'dashboard' as const, icon: LayoutDashboard, label: 'Dashboard' },
    { id: 'projects' as const, icon: FolderOpen, label: 'Projects' },
    { id: 'messages' as const, icon: Mail, label: 'Messages' },
  ]

  return (
    <div className="min-h-screen flex cosmic-bg">
      {/* Sidebar */}
      <aside className="w-60 shrink-0 border-r border-white/5 bg-black/20 backdrop-blur-xl flex flex-col">
        <div className="p-5 border-b border-white/5 flex items-center gap-2.5">
          <Rocket className="text-violet-400" size={20} />
          <span className="font-[family-name:var(--font-display)] font-bold text-white text-sm">K11 Admin</span>
        </div>
        <nav className="flex-1 p-3 space-y-1">
          {NAV.map(n => (
            <button key={n.id} onClick={() => setPage(n.id)}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                page === n.id ? 'bg-violet-500/15 border border-violet-500/25 text-violet-300' : 'text-slate-500 hover:text-white hover:bg-white/5'
              }`}
            ><n.icon size={16} /> {n.label}
              {n.id === 'messages' && messages.length > 0 && <span className="ml-auto text-xs bg-violet-500 text-white rounded-full px-2 py-0.5">{messages.length}</span>}
            </button>
          ))}
        </nav>
        <div className="p-3 border-t border-white/5">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm text-red-400 hover:bg-red-500/10 transition-all">
            <LogOut size={16} /> Logout
          </button>
        </div>
      </aside>

      {/* Main */}
      <main className="flex-1 p-6 overflow-y-auto">
        {page === 'dashboard' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mb-6">Dashboard</h1>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 mb-8">
              {[
                { label: 'Total Projects', value: projects.length, color: '#8b5cf6' },
                { label: 'Messages', value: messages.length, color: '#d946ef' },
                { label: 'Visitors', value: '2.4K', color: '#06b6d4' },
              ].map(s => (
                <div key={s.label} className="cosmic-card p-6">
                  <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">{s.label}</p>
                  <p className="text-3xl font-bold text-white">{s.value}</p>
                </div>
              ))}
            </div>
            <div className="cosmic-card p-6">
              <h3 className="text-sm font-semibold text-white mb-4">Recent Projects</h3>
              {projects.slice(0, 5).map(p => (
                <div key={p.id} className="flex items-center gap-4 py-3 border-b border-white/5 last:border-0">
                  <img src={p.image} alt="" className="w-12 h-9 rounded-lg object-cover" />
                  <div className="flex-1"><p className="text-sm text-white font-medium">{p.title}</p><p className="text-xs text-slate-500">{p.category}</p></div>
                </div>
              ))}
            </div>
          </motion.div>
        )}

        {page === 'projects' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">Projects</h1>
              <button onClick={() => { setEditProject(null); setForm({ title: '', category: '', description: '', tech: '', image: '', link: '' }); setPage('add') }}
                className="btn-primary text-sm py-2.5 px-5"><Plus size={16} /> Add Project</button>
            </div>
            <div className="cosmic-card overflow-hidden">
              <table className="w-full">
                <thead><tr className="border-b border-white/5 bg-white/2">
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Project</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Category</th>
                  <th className="text-left px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Tech</th>
                  <th className="text-right px-5 py-3 text-xs font-semibold text-slate-500 uppercase tracking-wider">Actions</th>
                </tr></thead>
                <tbody>
                  {projects.map(p => (
                    <tr key={p.id} className="border-b border-white/5 hover:bg-white/2">
                      <td className="px-5 py-4 flex items-center gap-3">
                        <img src={p.image} alt="" className="w-10 h-7 rounded object-cover" />
                        <span className="text-sm text-white font-medium">{p.title}</span>
                      </td>
                      <td className="px-5 py-4"><span className="text-xs bg-violet-500/15 text-violet-300 px-2.5 py-1 rounded-lg">{p.category}</span></td>
                      <td className="px-5 py-4 text-xs text-slate-500">{p.tech.join(', ')}</td>
                      <td className="px-5 py-4 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button onClick={() => startEdit(p)} className="p-2 rounded-lg hover:bg-violet-500/10 text-violet-400"><Edit3 size={14} /></button>
                          <button onClick={() => deleteProject(p.id)} className="p-2 rounded-lg hover:bg-red-500/10 text-red-400"><Trash2 size={14} /></button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </motion.div>
        )}

        {page === 'messages' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)] mb-6">Messages</h1>
            {messages.length === 0 ? (
              <div className="cosmic-card p-12 text-center"><Mail className="mx-auto text-slate-600 mb-3" size={32} /><p className="text-slate-500">No messages yet</p></div>
            ) : (
              <div className="space-y-4">
                {messages.map(m => (
                  <div key={m.id} className="cosmic-card p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div><p className="text-white font-medium text-sm">{m.name}</p><p className="text-xs text-slate-500">{m.email} · {m.phone}</p></div>
                      <div className="flex items-center gap-2">
                        <span className="text-xs text-slate-600">{new Date(m.date).toLocaleDateString()}</span>
                        <button onClick={() => deleteMessage(m.id)} className="p-1.5 rounded-lg hover:bg-red-500/10 text-red-400"><Trash2 size={13} /></button>
                      </div>
                    </div>
                    <p className="text-sm text-slate-400">{m.message}</p>
                  </div>
                ))}
              </div>
            )}
          </motion.div>
        )}

        {page === 'add' && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <div className="flex items-center justify-between mb-6">
              <h1 className="text-2xl font-bold text-white font-[family-name:var(--font-display)]">{editProject ? 'Edit Project' : 'Add Project'}</h1>
              <button onClick={() => setPage('projects')} className="p-2 rounded-xl hover:bg-white/5 text-slate-400"><X size={20} /></button>
            </div>
            <div className="cosmic-card p-8 max-w-2xl">
              <div className="space-y-5">
                <div className="grid grid-cols-2 gap-5">
                  <div><label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Title *</label>
                    <input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} placeholder="Project name" className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Category *</label>
                    <input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} placeholder="Web Application" className={inputClass} /></div>
                </div>
                <div><label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Description</label>
                  <textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} placeholder="Project description..." className={inputClass + ' resize-none'} /></div>
                <div><label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Technologies (comma separated)</label>
                  <input value={form.tech} onChange={e => setForm({ ...form, tech: e.target.value })} placeholder="React, Node.js, AWS" className={inputClass} /></div>
                <div className="grid grid-cols-2 gap-5">
                  <div><label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Image URL</label>
                    <input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} placeholder="https://..." className={inputClass} /></div>
                  <div><label className="block text-xs font-medium text-slate-400 mb-2 uppercase tracking-wider">Live Link</label>
                    <input value={form.link} onChange={e => setForm({ ...form, link: e.target.value })} placeholder="https://..." className={inputClass} /></div>
                </div>
                {form.image && <img src={form.image} alt="preview" className="w-full h-40 object-cover rounded-xl border border-white/5" />}
                <div className="flex gap-3 pt-2">
                  <button onClick={handleSave} className="btn-primary py-3 px-6"><Save size={16} /> {editProject ? 'Update' : 'Save'} Project</button>
                  <button onClick={() => setPage('projects')} className="btn-ghost py-3 px-6">Cancel</button>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </main>
    </div>
  )
}
