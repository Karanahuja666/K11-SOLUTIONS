import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ExternalLink, Eye } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

interface Project {
  id: string; title: string; category: string; description: string; tech: string[]; image: string; link: string
}

const DEFAULT_PROJECTS: Project[] = [
  { id: '1', title: 'NeoVerse Platform', category: 'Web Application', description: 'AI-powered SaaS platform with real-time analytics dashboard and machine learning integration.', tech: ['React', 'Node.js', 'Python', 'AWS'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80', link: '#' },
  { id: '2', title: 'Luxe Commerce', category: 'E-Commerce', description: 'Premium e-commerce experience for a luxury fashion brand with 3D product visualization.', tech: ['Next.js', 'Stripe', 'Three.js', 'Prisma'], image: 'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80', link: '#' },
  { id: '3', title: 'QuantumPay', category: 'Fintech', description: 'Modern fintech app with biometric auth, real-time transactions, and crypto wallet integration.', tech: ['React Native', 'Firebase', 'Blockchain'], image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&q=80', link: '#' },
  { id: '4', title: 'Stellar Health', category: 'Healthcare', description: 'Telemedicine platform connecting patients with doctors via video, chat, and AI triage.', tech: ['Vue.js', 'Django', 'WebRTC', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80', link: '#' },
  { id: '5', title: 'EduSphere', category: 'EdTech', description: 'Interactive learning platform with gamification, progress tracking, and live classrooms.', tech: ['React', 'GraphQL', 'MongoDB', 'Socket.io'], image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=800&q=80', link: '#' },
  { id: '6', title: 'AeroTrack', category: 'Logistics', description: 'Real-time fleet management and logistics optimization with GPS tracking and route planning.', tech: ['Angular', 'Express', 'MapboxGL', 'Redis'], image: 'https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=800&q=80', link: '#' },
]

const CATEGORIES = ['All', 'Web Application', 'E-Commerce', 'Fintech', 'Healthcare', 'EdTech', 'Logistics']

export default function Portfolio() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filter, setFilter] = useState('All')

  useEffect(() => {
    const saved = localStorage.getItem('k11_projects')
    setProjects(saved ? JSON.parse(saved) : DEFAULT_PROJECTS)
  }, [])

  const filtered = filter === 'All' ? projects : projects.filter(p => p.category === filter)

  return (
    <section id="portfolio" style={{ padding: '112px 0' }}>
      <div className="section-container">
        <SectionHeading label="Our Work" title="Featured Projects" subtitle="A showcase of our finest digital creations and innovative solutions." />

        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 8, marginBottom: 48 }}>
          {CATEGORIES.map(c => (
            <button key={c} onClick={() => setFilter(c)}
              style={{
                padding: '10px 18px', borderRadius: 12, fontSize: 14, fontWeight: 500, cursor: 'pointer', fontFamily: 'Inter, sans-serif',
                minHeight: 44, WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' as const,
                transition: 'all .3s', border: 'none',
                background: filter === c ? 'rgba(139,92,246,.2)' : 'rgba(255,255,255,.03)',
                color: filter === c ? '#c4b5fd' : '#64748b',
                outline: filter === c ? '1px solid rgba(139,92,246,.4)' : '1px solid rgba(255,255,255,.06)',
              }}
            >{c}</button>
          ))}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={filter} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.3 }} className="grid-3">
            {filtered.map((p, i) => (
              <motion.div key={p.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.08 }} className="cosmic-card" style={{ overflow: 'hidden', textAlign: 'left' }}>
                <div style={{ position: 'relative', height: 208, overflow: 'hidden' }}>
                  <img src={p.image} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform .5s', display: 'block' }} />
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to top, #020617, transparent, transparent)' }} />
                  <span style={{ position: 'absolute', top: 12, left: 12, padding: '4px 12px', borderRadius: 8, fontSize: 12, fontWeight: 500, background: 'rgba(139,92,246,.2)', border: '1px solid rgba(139,92,246,.3)', color: '#c4b5fd' }}>{p.category}</span>
                </div>
                <div style={{ padding: 20 }}>
                  <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 18, marginBottom: 8 }}>{p.title}</h3>
                  <p style={{ color: '#64748b', fontSize: 14, marginBottom: 16, lineHeight: 1.6, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{p.description}</p>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ padding: '4px 10px', borderRadius: 6, fontSize: 12, background: 'rgba(255,255,255,.05)', color: '#94a3b8', border: '1px solid rgba(255,255,255,.05)' }}>{t}</span>
                    ))}
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
