import { Link } from 'react-router-dom'
import { Rocket, ArrowLeft } from 'lucide-react'
import { useSEO } from '@/hooks/useSEO'

export default function NotFound() {
  useSEO('Page Not Found', 'The page you are looking for does not exist.')
  return (
    <div className="cosmic-bg" style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', padding: 24 }}>
      <div>
        <Rocket size={48} style={{ color: '#8b5cf6', margin: '0 auto 24px' }} />
        <h1 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 72, fontWeight: 800, marginBottom: 8 }} className="text-gradient">404</h1>
        <p style={{ color: '#94a3b8', fontSize: 18, marginBottom: 32 }}>Lost in the cosmos. This page doesn't exist.</p>
        <Link to="/" className="btn-primary" style={{ fontSize: 16, padding: '14px 32px' }}>
          <ArrowLeft size={16} /> Back to Home
        </Link>
      </div>
    </div>
  )
}
