import { Link } from 'react-router-dom'
import { Rocket, Globe, ExternalLink, Hash, AtSign, Mail, Phone, MapPin } from 'lucide-react'

const SERVICES = [
  { label: 'Web Development', to: '/services' },
  { label: 'Web Applications', to: '/services' },
  { label: 'UI/UX Design', to: '/services' },
  { label: 'E-Commerce', to: '/services' },
  { label: 'SEO Optimization', to: '/services' },
  { label: 'Digital Marketing', to: '/services' },
]

const COMPANY = [
  { label: 'About Us', to: '/about' },
  { label: 'Our Work', to: '/work' },
  { label: 'Reviews', to: '/reviews' },
  { label: 'Blog', to: '/blog' },
  { label: 'Contact', to: '/contact' },
]

export default function Footer() {
  return (
    <footer style={{ position: 'relative', borderTop: '1px solid rgba(255,255,255,.05)' }}>
      <div className="cosmic-bg" style={{ position: 'absolute', inset: 0, opacity: .5 }} />
      <div className="section-container" style={{ position: 'relative', paddingTop: 80, paddingBottom: 32 }}>
        <div className="grid-footer" style={{ marginBottom: 64 }}>
          <div>
            <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: 10, fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: '#fff', textDecoration: 'none', marginBottom: 16 }}>
              <Rocket style={{ width: 24, height: 24, color: '#a78bfa' }} />
              K11 SOLUTIONS
            </Link>
            <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.7, marginBottom: 24 }}>Building digital universes. We create futuristic websites, applications and digital experiences.</p>
            <div style={{ display: 'flex', gap: 12 }}>
              {[Globe, Hash, AtSign, ExternalLink].map((Icon, i) => (
                <a key={i} href="#" aria-label="Social link" style={{ width: 36, height: 36, borderRadius: 8, background: 'rgba(255,255,255,.05)', border: '1px solid rgba(255,255,255,.08)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#64748b', transition: 'all .3s', textDecoration: 'none' }}>
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>Services</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {SERVICES.map(s => (
                <li key={s.label} style={{ marginBottom: 12 }}>
                  <Link to={s.to} style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', transition: 'color .3s' }}>{s.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>Company</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {COMPANY.map(c => (
                <li key={c.label} style={{ marginBottom: 12 }}>
                  <Link to={c.to} style={{ fontSize: 14, color: '#64748b', textDecoration: 'none', transition: 'color .3s' }}>{c.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 style={{ fontSize: 13, fontWeight: 600, color: '#fff', textTransform: 'uppercase', letterSpacing: 1.5, marginBottom: 20 }}>Contact</h4>
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#64748b', marginBottom: 16 }}><Mail size={15} style={{ color: '#8b5cf6', flexShrink: 0 }} /> hello@k11solutions.com</li>
              <li style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: '#64748b', marginBottom: 16 }}><Phone size={15} style={{ color: '#8b5cf6', flexShrink: 0 }} /> +91 98765 43210</li>
              <li style={{ display: 'flex', alignItems: 'flex-start', gap: 12, fontSize: 14, color: '#64748b' }}><MapPin size={15} style={{ color: '#8b5cf6', flexShrink: 0, marginTop: 2 }} /> Chandigarh, India</li>
            </ul>
          </div>
        </div>

        <div style={{ borderTop: '1px solid rgba(255,255,255,.05)', paddingTop: 32, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#475569' }}>&copy; {new Date().getFullYear()} K11 Solutions. All rights reserved.</p>
          <div style={{ display: 'flex', gap: 24 }}>
            <a href="#" style={{ fontSize: 12, color: '#475569', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#" style={{ fontSize: 12, color: '#475569', textDecoration: 'none' }}>Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  )
}
