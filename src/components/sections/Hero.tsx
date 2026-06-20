import { lazy, Suspense, useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowRight, Play } from 'lucide-react'
import StarField from '@/components/ui/StarField'

const CosmicScene = lazy(() => import('@/components/three/CosmicScene'))

export default function Hero() {
  const [mouse, setMouse] = useState({ x: 0, y: 0 })

  const handleMouse = useCallback((e: MouseEvent) => {
    const cx = window.innerWidth / 2
    const cy = window.innerHeight / 2
    setMouse({ x: (e.clientX - cx) / cx, y: (e.clientY - cy) / cy })
  }, [])

  useEffect(() => {
    window.addEventListener('mousemove', handleMouse)
    return () => window.removeEventListener('mousemove', handleMouse)
  }, [handleMouse])

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Cosmic BG layers */}
      <div className="absolute inset-0 cosmic-bg" />
      <StarField count={150} />

      {/* Animated radial glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ transform: `translate(${mouse.x * 20}px, ${mouse.y * 20}px)` }}>
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-violet-600/10 rounded-full blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-fuchsia-600/8 rounded-full blur-[100px] animate-pulse-glow" style={{ animationDelay: '1.5s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-cyan-500/5 rounded-full blur-[150px]" />
      </div>

      {/* 3D Scene */}
      <Suspense fallback={null}>
        <CosmicScene />
      </Suspense>

      {/* Hero content */}
      <div style={{ position: 'relative', zIndex: 10, textAlign: 'center', width: '100%', maxWidth: 900, margin: '0 auto', padding: '0 24px', transform: `translate(${mouse.x * -8}px, ${mouse.y * -8}px)` }}>
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-medium bg-violet-500/10 border border-violet-500/20 text-violet-300 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-pulse" />
            Futuristic Digital Agency
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.15 }}
          className="font-[family-name:var(--font-display)] text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold tracking-tight mb-6"
        >
          Building Digital
          <br />
          <span className="text-gradient">Universes</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          style={{ color: '#94a3b8', fontSize: 18, maxWidth: 600, margin: '0 auto 40px', lineHeight: 1.7, textAlign: 'center' }}
        >
          We create futuristic websites, applications and digital experiences that push the boundaries of what's possible.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.45 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16 }}
        >
          <Link to="/contact" className="btn-primary hero-btn">
            Start Project <ArrowRight size={16} />
          </Link>
          <Link to="/work" className="btn-ghost hero-btn">
            <Play size={16} /> View Our Work
          </Link>
        </motion.div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#020617] to-transparent pointer-events-none z-10" />
    </section>
  )
}
