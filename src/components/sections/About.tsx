import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import { Gem, Rocket, Shield, Sparkles } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const STATS = [
  { num: 150, suffix: '+', label: 'Projects Delivered' },
  { num: 120, suffix: '+', label: 'Happy Clients' },
  { num: 6, suffix: '+', label: 'Years Experience' },
  { num: 30, suffix: '+', label: 'Technologies' },
]

const PILLARS = [
  { icon: Gem, title: 'Premium Quality', desc: 'Every project is crafted with pixel-perfect attention to detail and world-class design standards.', color: '#8b5cf6' },
  { icon: Rocket, title: 'Fast Delivery', desc: 'We ship projects on time without compromising quality — speed and excellence go hand in hand.', color: '#d946ef' },
  { icon: Shield, title: 'Reliable Support', desc: 'Dedicated post-launch support, maintenance, and updates to keep your business running smoothly.', color: '#06b6d4' },
  { icon: Sparkles, title: 'Innovation First', desc: 'We use the latest AI, automation, and design trends to give your business a competitive edge.', color: '#f59e0b' },
]

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const ref = useRef<HTMLSpanElement>(null)
  const [value, setValue] = useState(0)
  const [started, setStarted] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting && !started) { setStarted(true); obs.unobserve(el) } }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [started])

  useEffect(() => {
    if (!started) return
    let cur = 0
    const step = target / 60
    const t = setInterval(() => { cur += step; if (cur >= target) { cur = target; clearInterval(t) } setValue(Math.floor(cur)) }, 25)
    return () => clearInterval(t)
  }, [started, target])

  return <span ref={ref}>{value}{suffix}</span>
}

export default function About() {
  return (
    <section id="about" style={{ padding: '112px 0' }}>
      <div className="section-container">
        <SectionHeading label="Who We Are" title="About K11 Solutions" subtitle="We transform ideas into powerful digital products that define the future." />

        {/* About paragraph */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="cosmic-card"
          style={{ padding: 32, marginBottom: 64, textAlign: 'center', maxWidth: 800, marginLeft: 'auto', marginRight: 'auto' }}
        >
          <p style={{ color: '#cbd5e1', fontSize: 17, lineHeight: 1.8, fontStyle: 'italic' }}>
            K11 Solutions is a futuristic digital agency specializing in web development, AI-powered automation, and digital marketing.
            Founded with a vision to empower businesses of all sizes, we build everything from stunning wedding invitation websites to
            intelligent WhatsApp bots and full-scale e-commerce platforms. Our team combines creativity with cutting-edge technology
            to deliver solutions that don't just look beautiful — they drive real growth. With 150+ projects delivered and clients across
            India and beyond, we're not just building websites — we're building digital universes for businesses ready to dominate online.
          </p>
        </motion.div>

        <div className="grid-4" style={{ marginBottom: 80 }}>
          {PILLARS.map((p, i) => (
            <motion.div
              key={p.title}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="cosmic-card"
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div style={{ width: 56, height: 56, borderRadius: 16, margin: '0 auto 16px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${p.color}12`, border: `1px solid ${p.color}22` }}>
                <p.icon size={24} style={{ color: p.color }} />
              </div>
              <h3 style={{ color: '#fff', fontWeight: 600, marginBottom: 8 }}>{p.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14 }}>{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <div className="grid-4">
          {STATS.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="cosmic-card"
              style={{ padding: 24, textAlign: 'center' }}
            >
              <div className="text-gradient" style={{ fontSize: 36, fontWeight: 800, marginBottom: 8 }}>
                <Counter target={s.num} suffix={s.suffix} />
              </div>
              <p style={{ color: '#64748b', fontSize: 14 }}>{s.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
