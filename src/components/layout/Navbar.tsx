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
  const [isMobile, setIsMobile] = useState(false)
  const location = useLocation()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 50)
    const checkMobile = () => setIsMobile(window.innerWidth < 768)
    window.addEventListener('scroll', fn)
    window.addEventListener('resize', checkMobile)
    checkMobile()
    return () => { window.removeEventListener('scroll', fn); window.removeEventListener('resize', checkMobile) }
  }, [])

  useEffect(() => { window.scrollTo(0, 0); setOpen(false) }, [location.pathname])

  return (
    <>
      <motion.nav
        initial={{ y: -80 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        style={{
          position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
          transition: 'all .3s',
          background: scrolled ? 'rgba(255,255,255,.06)' : 'transparent',
          backdropFilter: scrolled ? 'blur(30px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(30px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,.1)' : '1px solid transparent',
        }}
      >
        <div className="section-container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', height: 64 }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 18, fontWeight: 700, color: '#fff', textDecoration: 'none', whiteSpace: 'nowrap' }}>
            <Rocket style={{ width: 20, height: 20, color: '#a78bfa' }} />
            K11 SOLUTIONS
          </Link>

          {/* Desktop nav */}
          {!isMobile && (
            <ul style={{ display: 'flex', alignItems: 'center', gap: 32, listStyle: 'none', margin: 0, padding: 0 }}>
              {NAV.map(n => (
                <li key={n.to}>
                  <Link to={n.to} style={{
                    fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'color .3s',
                    color: location.pathname === n.to ? '#a78bfa' : '#94a3b8',
                  }}>{n.label}</Link>
                </li>
              ))}
            </ul>
          )}

          {/* Desktop CTA */}
          {!isMobile && (
            <Link to="/contact" className="btn-primary" style={{ fontSize: 14, padding: '10px 24px', minHeight: 44 }}>Start Project</Link>
          )}

          {/* Mobile hamburger */}
          {isMobile && (
            <button onClick={() => setOpen(!open)} style={{
              color: '#fff', background: 'none', border: 'none', cursor: 'pointer',
              width: 44, height: 44, display: 'flex', alignItems: 'center', justifyContent: 'center',
              WebkitTapHighlightColor: 'transparent',
            }}>
              {open ? <X size={24} /> : <Menu size={24} />}
            </button>
          )}
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && isMobile && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            style={{
              position: 'fixed', left: 0, right: 0, top: 64, bottom: 0, zIndex: 99,
              background: 'rgba(2,6,23,.97)', backdropFilter: 'blur(30px)', WebkitBackdropFilter: 'blur(30px)',
              padding: '16px 24px', overflowY: 'auto',
            }}
          >
            {NAV.map(n => (
              <Link key={n.to} to={n.to} onClick={() => setOpen(false)}
                style={{
                  display: 'flex', alignItems: 'center', padding: '18px 0', fontSize: 18, fontWeight: 500,
                  color: location.pathname === n.to ? '#a78bfa' : '#cbd5e1',
                  borderBottom: '1px solid rgba(255,255,255,.05)', textDecoration: 'none',
                  WebkitTapHighlightColor: 'transparent',
                }}
              >{n.label}</Link>
            ))}
            <Link to="/contact" onClick={() => setOpen(false)} className="btn-primary"
              style={{ marginTop: 24, width: '100%', padding: '16px', fontSize: 16 }}
            >Start Project</Link>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
