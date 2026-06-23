import { useState, useEffect } from 'react'
import { Rocket, LayoutDashboard, FolderOpen, Mail, LogOut, Plus, Trash2, Edit3, X, Save, Star, FileText, MessageSquare } from 'lucide-react'
import toast from 'react-hot-toast'

interface Project { id: string; title: string; category: string; description: string; tech: string[]; image: string }
interface Message { id: string; name: string; email: string; phone: string; message: string; date: string; read: boolean }
interface BlogPost { id: string; title: string; excerpt: string; content: string; author: string; date: string; image: string; category: string }
interface Review { id: string; name: string; role: string; text: string; rating: number; date: string }

const TABS = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'projects', label: 'Projects', icon: FolderOpen },
  { id: 'blog', label: 'Blog', icon: FileText },
  { id: 'reviews', label: 'Reviews', icon: Star },
  { id: 'messages', label: 'Messages', icon: Mail },
]

const inputStyle: React.CSSProperties = {
  width: '100%', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)',
  borderRadius: 10, padding: '10px 14px', fontSize: 14, color: '#fff', outline: 'none', fontFamily: 'Inter, sans-serif',
}
const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 6, textTransform: 'uppercase', letterSpacing: 1 }

export default function AdminDashboard({ onLogout }: { onLogout: () => void }) {
  const [tab, setTab] = useState('dashboard')
  const [projects, setProjects] = useState<Project[]>([])
  const [messages, setMessages] = useState<Message[]>([])
  const [blog, setBlog] = useState<BlogPost[]>([])
  const [reviews, setReviews] = useState<Review[]>([])
  const [editProject, setEditProject] = useState<Project | null>(null)
  const [editBlog, setEditBlog] = useState<BlogPost | null>(null)
  const [showProjectForm, setShowProjectForm] = useState(false)
  const [showBlogForm, setShowBlogForm] = useState(false)

  useEffect(() => {
    setProjects(JSON.parse(localStorage.getItem('k11_projects') || '[]'))
    setMessages(JSON.parse(localStorage.getItem('k11_messages') || '[]'))
    setBlog(JSON.parse(localStorage.getItem('k11_blog') || '[]'))
    setReviews(JSON.parse(localStorage.getItem('k11_reviews') || '[]'))
  }, [])

  const saveProjects = (p: Project[]) => { setProjects(p); localStorage.setItem('k11_projects', JSON.stringify(p)) }
  const saveBlog = (b: BlogPost[]) => { setBlog(b); localStorage.setItem('k11_blog', JSON.stringify(b)) }
  const saveReviews = (r: Review[]) => { setReviews(r); localStorage.setItem('k11_reviews', JSON.stringify(r)) }

  const deleteProject = (id: string) => { saveProjects(projects.filter(p => p.id !== id)); toast.success('Project deleted') }
  const deleteBlog = (id: string) => { saveBlog(blog.filter(b => b.id !== id)); toast.success('Post deleted') }
  const deleteReview = (id: string) => { saveReviews(reviews.filter(r => r.id !== id)); toast.success('Review deleted') }
  const deleteMessage = (id: string) => { const m = messages.filter(m => m.id !== id); setMessages(m); localStorage.setItem('k11_messages', JSON.stringify(m)); toast.success('Message deleted') }

  return (
    <div style={{ display: 'flex', minHeight: '100vh', background: '#020617' }}>
      {/* Sidebar */}
      <div style={{ width: 240, background: 'rgba(255,255,255,.02)', borderRight: '1px solid rgba(255,255,255,.06)', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
        <div style={{ padding: '20px 16px', borderBottom: '1px solid rgba(255,255,255,.06)', display: 'flex', alignItems: 'center', gap: 10 }}>
          <Rocket size={20} style={{ color: '#a78bfa' }} />
          <span style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 16, fontWeight: 700, color: '#fff' }}>K11 Admin</span>
        </div>
        <div style={{ padding: 12, flex: 1 }}>
          {TABS.map(t => (
            <button key={t.id} onClick={() => setTab(t.id)}
              style={{
                display: 'flex', alignItems: 'center', gap: 10, width: '100%', padding: '10px 12px', borderRadius: 10,
                border: 'none', cursor: 'pointer', fontSize: 14, fontWeight: 500, marginBottom: 4, fontFamily: 'Inter, sans-serif',
                background: tab === t.id ? 'rgba(139,92,246,.12)' : 'transparent',
                color: tab === t.id ? '#a78bfa' : '#94a3b8',
                transition: 'all .2s',
              }}>
              <t.icon size={16} /> {t.label}
              {t.id === 'messages' && messages.length > 0 && (
                <span style={{ marginLeft: 'auto', background: '#8b5cf6', color: '#fff', borderRadius: 10, padding: '1px 7px', fontSize: 11 }}>{messages.length}</span>
              )}
            </button>
          ))}
        </div>
        <div style={{ padding: 16, borderTop: '1px solid rgba(255,255,255,.06)' }}>
          <button onClick={onLogout} style={{ display: 'flex', alignItems: 'center', gap: 8, width: '100%', padding: '10px 12px', borderRadius: 10, border: '1px solid rgba(248,113,113,.2)', background: 'none', color: '#f87171', cursor: 'pointer', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>
            <LogOut size={16} /> Logout
          </button>
        </div>
      </div>

      {/* Main content */}
      <div style={{ flex: 1, padding: 28, overflowY: 'auto' }}>

        {/* DASHBOARD */}
        {tab === 'dashboard' && (
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Dashboard</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 16, marginBottom: 32 }}>
              {[
                { label: 'Projects', count: projects.length, color: '#8b5cf6' },
                { label: 'Blog Posts', count: blog.length, color: '#06b6d4' },
                { label: 'Reviews', count: reviews.length, color: '#f59e0b' },
                { label: 'Messages', count: messages.length, color: '#10b981' },
              ].map(s => (
                <div key={s.label} className="cosmic-card" style={{ padding: 20, textAlign: 'center' }}>
                  <div style={{ fontSize: 32, fontWeight: 800, color: s.color, marginBottom: 4 }}>{s.count}</div>
                  <div style={{ fontSize: 14, color: '#64748b' }}>{s.label}</div>
                </div>
              ))}
            </div>
            <div className="cosmic-card" style={{ padding: 20 }}>
              <h3 style={{ fontSize: 16, fontWeight: 600, color: '#fff', marginBottom: 16 }}>Recent Messages</h3>
              {messages.length === 0 ? <p style={{ color: '#64748b', fontSize: 14 }}>No messages yet.</p> :
                messages.slice(0, 5).map(m => (
                  <div key={m.id} style={{ padding: '12px 0', borderBottom: '1px solid rgba(255,255,255,.05)', display: 'flex', justifyContent: 'space-between' }}>
                    <div><strong style={{ color: '#fff' }}>{m.name}</strong> <span style={{ color: '#64748b', fontSize: 13 }}>— {m.message.slice(0, 60)}...</span></div>
                    <span style={{ color: '#64748b', fontSize: 12, whiteSpace: 'nowrap' }}>{new Date(m.date).toLocaleDateString()}</span>
                  </div>
                ))
              }
            </div>
          </div>
        )}

        {/* PROJECTS */}
        {tab === 'projects' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: '#fff' }}>Projects</h2>
              <button className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }} onClick={() => { setEditProject(null); setShowProjectForm(true) }}><Plus size={16} /> Add Project</button>
            </div>
            {showProjectForm && <ProjectForm project={editProject} onSave={(p) => {
              if (editProject) { saveProjects(projects.map(x => x.id === p.id ? p : x)) } else { saveProjects([p, ...projects]) }
              setShowProjectForm(false); setEditProject(null); toast.success(editProject ? 'Updated!' : 'Added!')
            }} onCancel={() => { setShowProjectForm(false); setEditProject(null) }} />}
            <div style={{ display: 'grid', gap: 12 }}>
              {projects.map(p => (
                <div key={p.id} className="cosmic-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <img src={p.image} alt={p.title} style={{ width: 60, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{p.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13 }}>{p.category}</div>
                  </div>
                  <button onClick={() => { setEditProject(p); setShowProjectForm(true) }} style={{ background: 'none', border: '1px solid rgba(139,92,246,.3)', color: '#a78bfa', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter' }}><Edit3 size={14} /></button>
                  <button onClick={() => deleteProject(p.id)} style={{ background: 'none', border: '1px solid rgba(248,113,113,.3)', color: '#f87171', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter' }}><Trash2 size={14} /></button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* BLOG */}
        {tab === 'blog' && (
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24 }}>
              <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: '#fff' }}>Blog Posts</h2>
              <button className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }} onClick={() => { setEditBlog(null); setShowBlogForm(true) }}><Plus size={16} /> Add Post</button>
            </div>
            {showBlogForm && <BlogForm post={editBlog} onSave={(p) => {
              if (editBlog) { saveBlog(blog.map(x => x.id === p.id ? p : x)) } else { saveBlog([p, ...blog]) }
              setShowBlogForm(false); setEditBlog(null); toast.success(editBlog ? 'Updated!' : 'Published!')
            }} onCancel={() => { setShowBlogForm(false); setEditBlog(null) }} />}
            <div style={{ display: 'grid', gap: 12 }}>
              {blog.map(p => (
                <div key={p.id} className="cosmic-card" style={{ padding: 16, display: 'flex', alignItems: 'center', gap: 16 }}>
                  <img src={p.image} alt={p.title} style={{ width: 60, height: 44, borderRadius: 8, objectFit: 'cover' }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ color: '#fff', fontWeight: 600, fontSize: 15 }}>{p.title}</div>
                    <div style={{ color: '#64748b', fontSize: 13 }}>{p.category} · {new Date(p.date).toLocaleDateString()}</div>
                  </div>
                  <button onClick={() => { setEditBlog(p); setShowBlogForm(true) }} style={{ background: 'none', border: '1px solid rgba(139,92,246,.3)', color: '#a78bfa', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter' }}><Edit3 size={14} /></button>
                  <button onClick={() => deleteBlog(p.id)} style={{ background: 'none', border: '1px solid rgba(248,113,113,.3)', color: '#f87171', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter' }}><Trash2 size={14} /></button>
                </div>
              ))}
              {blog.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', padding: 40 }}>No blog posts yet. Click "Add Post" to create one.</p>}
            </div>
          </div>
        )}

        {/* REVIEWS */}
        {tab === 'reviews' && (
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Reviews</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {reviews.map(r => (
                <div key={r.id} className="cosmic-card" style={{ padding: 16, display: 'flex', alignItems: 'flex-start', gap: 16 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 13, flexShrink: 0 }}>{r.name.split(' ').map(w => w[0]).join('')}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 4 }}>
                      <strong style={{ color: '#fff' }}>{r.name}</strong>
                      <span style={{ color: '#64748b', fontSize: 13 }}>{r.role}</span>
                      <div style={{ marginLeft: 'auto', display: 'flex', gap: 2 }}>
                        {Array.from({ length: r.rating }, (_, i) => <Star key={i} size={12} style={{ color: '#facc15', fill: '#facc15' }} />)}
                      </div>
                    </div>
                    <p style={{ color: '#94a3b8', fontSize: 14, lineHeight: 1.6 }}>"{r.text}"</p>
                    <span style={{ color: '#475569', fontSize: 12, marginTop: 4, display: 'block' }}>{new Date(r.date).toLocaleDateString()}</span>
                  </div>
                  <button onClick={() => deleteReview(r.id)} style={{ background: 'none', border: '1px solid rgba(248,113,113,.3)', color: '#f87171', borderRadius: 8, padding: '6px 12px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter', flexShrink: 0 }}><Trash2 size={14} /></button>
                </div>
              ))}
              {reviews.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', padding: 40 }}>No reviews yet.</p>}
            </div>
          </div>
        )}

        {/* MESSAGES */}
        {tab === 'messages' && (
          <div>
            <h2 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: '#fff', marginBottom: 24 }}>Messages ({messages.length})</h2>
            <div style={{ display: 'grid', gap: 12 }}>
              {messages.map(m => (
                <div key={m.id} className="cosmic-card" style={{ padding: 20 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
                    <div><strong style={{ color: '#fff', fontSize: 15 }}>{m.name}</strong> <span style={{ color: '#64748b', fontSize: 13 }}>({m.email})</span></div>
                    <span style={{ color: '#64748b', fontSize: 12 }}>{new Date(m.date).toLocaleDateString()}</span>
                  </div>
                  {m.phone && <div style={{ color: '#64748b', fontSize: 13, marginBottom: 8 }}>📞 {m.phone}</div>}
                  <p style={{ color: '#cbd5e1', fontSize: 14, lineHeight: 1.6, marginBottom: 12 }}>{m.message}</p>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <a href={`mailto:${m.email}`} className="btn-primary" style={{ padding: '6px 16px', fontSize: 12 }}><MessageSquare size={12} /> Reply</a>
                    <button onClick={() => deleteMessage(m.id)} style={{ background: 'none', border: '1px solid rgba(248,113,113,.3)', color: '#f87171', borderRadius: 8, padding: '6px 16px', cursor: 'pointer', fontSize: 12, fontFamily: 'Inter' }}><Trash2 size={12} /> Delete</button>
                  </div>
                </div>
              ))}
              {messages.length === 0 && <p style={{ color: '#64748b', textAlign: 'center', padding: 40 }}>No messages yet.</p>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

/* Project Form */
function ProjectForm({ project, onSave, onCancel }: { project: Project | null; onSave: (p: Project) => void; onCancel: () => void }) {
  const [form, setForm] = useState<Project>(project || { id: Date.now().toString(), title: '', category: '', description: '', tech: [], image: '' })
  const [techInput, setTechInput] = useState(project ? project.tech.join(', ') : '')

  return (
    <div className="cosmic-card" style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ color: '#fff', fontWeight: 600 }}>{project ? 'Edit Project' : 'Add Project'}</h3>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={18} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div><label style={labelStyle}>Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} placeholder="Project name" /></div>
        <div><label style={labelStyle}>Category</label><input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle} placeholder="e.g. E-Commerce" /></div>
      </div>
      <div style={{ marginBottom: 16 }}><label style={labelStyle}>Image URL</label><input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={inputStyle} placeholder="https://..." /></div>
      <div style={{ marginBottom: 16 }}><label style={labelStyle}>Description</label><textarea value={form.description} onChange={e => setForm({ ...form, description: e.target.value })} rows={3} style={{ ...inputStyle, resize: 'none' }} placeholder="Project description" /></div>
      <div style={{ marginBottom: 16 }}><label style={labelStyle}>Technologies (comma-separated)</label><input value={techInput} onChange={e => setTechInput(e.target.value)} style={inputStyle} placeholder="React, Node.js, MongoDB" /></div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }} onClick={() => onSave({ ...form, tech: techInput.split(',').map(t => t.trim()).filter(Boolean) })}><Save size={14} /> Save</button>
        <button onClick={onCancel} style={{ background: 'none', border: '1px solid rgba(255,255,255,.1)', color: '#94a3b8', borderRadius: 10, padding: '8px 20px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter' }}>Cancel</button>
      </div>
    </div>
  )
}

/* Blog Form */
function BlogForm({ post, onSave, onCancel }: { post: BlogPost | null; onSave: (p: BlogPost) => void; onCancel: () => void }) {
  const [form, setForm] = useState<BlogPost>(post || { id: Date.now().toString(), title: '', excerpt: '', content: '', author: 'K11 Team', date: new Date().toISOString().split('T')[0], image: '', category: '' })

  return (
    <div className="cosmic-card" style={{ padding: 24, marginBottom: 24 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
        <h3 style={{ color: '#fff', fontWeight: 600 }}>{post ? 'Edit Post' : 'New Blog Post'}</h3>
        <button onClick={onCancel} style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer' }}><X size={18} /></button>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginBottom: 16 }}>
        <div><label style={labelStyle}>Title</label><input value={form.title} onChange={e => setForm({ ...form, title: e.target.value })} style={inputStyle} placeholder="Blog title" /></div>
        <div><label style={labelStyle}>Category</label><input value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} style={inputStyle} placeholder="e.g. Business, AI, Trends" /></div>
      </div>
      <div style={{ marginBottom: 16 }}><label style={labelStyle}>Image URL</label><input value={form.image} onChange={e => setForm({ ...form, image: e.target.value })} style={inputStyle} placeholder="https://..." /></div>
      <div style={{ marginBottom: 16 }}><label style={labelStyle}>Excerpt (short preview)</label><textarea value={form.excerpt} onChange={e => setForm({ ...form, excerpt: e.target.value })} rows={2} style={{ ...inputStyle, resize: 'none' }} placeholder="Brief summary shown on cards" /></div>
      <div style={{ marginBottom: 16 }}><label style={labelStyle}>Full Content</label><textarea value={form.content} onChange={e => setForm({ ...form, content: e.target.value })} rows={6} style={{ ...inputStyle, resize: 'none' }} placeholder="Full blog post content..." /></div>
      <div style={{ display: 'flex', gap: 8 }}>
        <button className="btn-primary" style={{ padding: '8px 20px', fontSize: 13 }} onClick={() => { if (!form.title || !form.excerpt) { toast.error('Title and excerpt required'); return } onSave(form) }}><Save size={14} /> Publish</button>
        <button onClick={onCancel} style={{ background: 'none', border: '1px solid rgba(255,255,255,.1)', color: '#94a3b8', borderRadius: 10, padding: '8px 20px', cursor: 'pointer', fontSize: 13, fontFamily: 'Inter' }}>Cancel</button>
      </div>
    </div>
  )
}
