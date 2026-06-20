import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Rocket } from 'lucide-react'

const NAV = [
  { label: 'Home', to: '/' },
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Work', to: '/work' },
  { label: 'Process', to: '/process' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', fn)
    return () => window.removeEventListener('scroll', fn)
  }, [])

  useEffect(() => { window.scrollTo(0, 0) }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-300 ${
          scrolled ? 'glass-strong shadow-lg shadow-black/20' : 'bg-transparent'
        }`}
      >
        <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none' }}>
            <Rocket style={{ width: 20, height: 20, color: '#a78bfa' }} />
            K11 SOLUTIONS
          </Link>

          <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none', margin: 0, padding: 0 }} className="hidden md:flex">
            {NAV.map(n => (
              <li key={n.to}>
                <Link to={n.to} style={{
                  fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color .3s',
                  color: location.pathname === n.to ? '#a78bfa' : '#94a3b8',
                }}
                  onMouseEnter={e => e.currentTarget.style.color = '#fff'}
                  onMouseLeave={e => e.currentTarget.style.color = location.pathname === n.to ? '#a78bfa' : '#94a3b8'}
                >
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>

          <div className="hidden md:flex" style={{ alignItems: 'center', gap: 12 }}>
            <Link to="/contact" className="btn-primary" style={{ fontSize: 14, padding: '10px 24px' }}>Start Project</Link>
          </div>

          <button className="md:hidden" style={{ color: '#fff', background: 'none', border: 'none', cursor: 'pointer' }} onClick={() => setOpen(!open)}>
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="glass-strong md:hidden"
            style={{ position: 'fixed', left: 0, right: 0, top: 64, zIndex: 99, padding: 24 }}
          >
            {NAV.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                style={{ display: 'block', padding: '12px 0', color: location.pathname === n.to ? '#a78bfa' : '#cbd5e1', fontWeight: 500, borderBottom: '1px solid rgba(255,255,255,.05)', textDecoration: 'none' }}
              >{n.label}</Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary" style={{ marginTop: 16, width: '100%', justifyContent: 'center', padding: '12px', textDecoration: 'none' }}>Start Project</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
