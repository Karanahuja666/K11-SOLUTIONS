import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const TESTIMONIALS = [
  { name: 'Arjun Mehta', role: 'CEO, TechVentures', text: 'K11 Solutions transformed our entire digital presence. The website they built is not just beautiful — it converts. Our leads increased 300% in 3 months.', rating: 5, avatar: 'AM' },
  { name: 'Priya Sharma', role: 'Founder, StyleHub', text: 'The e-commerce platform they built is incredible. Smooth checkout, stunning design, and our sales doubled. Best decision we made for our business.', rating: 5, avatar: 'PS' },
  { name: 'Rohit Kapoor', role: 'CTO, DataFlow', text: 'Their technical expertise is unmatched. They built a complex real-time analytics dashboard that handles millions of data points seamlessly.', rating: 5, avatar: 'RK' },
  { name: 'Sarah Williams', role: 'Marketing Director, GrowthCo', text: 'The SEO and digital marketing strategy K11 implemented boosted our organic traffic by 400%. They truly understand growth.', rating: 5, avatar: 'SW' },
  { name: 'Vikram Singh', role: 'Founder, HealthFirst', text: 'Our telemedicine platform handles thousands of consultations daily without a hiccup. K11 built it to perfection.', rating: 5, avatar: 'VS' },
]

export default function Testimonials() {
  const [current, setCurrent] = useState(0)
  const prev = () => setCurrent(c => (c - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  const next = () => setCurrent(c => (c + 1) % TESTIMONIALS.length)
  const t = TESTIMONIALS[current]

  return (
    <section style={{ padding: '112px 0' }}>
      <div className="section-container" style={{ textAlign: 'center', maxWidth: 896 }}>
        <SectionHeading label="Reviews" title="What Clients Say" subtitle="Hear from the businesses we've helped transform." />

        <div style={{ position: 'relative' }}>
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.4 }}
              className="cosmic-card"
              style={{ padding: '48px', textAlign: 'center' }}
            >
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
                {Array.from({ length: t.rating }, (_, i) => (
                  <Star key={i} size={18} style={{ color: '#facc15', fill: '#facc15' }} />
                ))}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: 18, lineHeight: 1.7, marginBottom: 32, fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>{t.avatar}</div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ color: '#fff', fontWeight: 600 }}>{t.name}</p>
                  <p style={{ color: '#64748b', fontSize: 14 }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32, alignItems: 'center' }}>
            <button onClick={prev} className="glass" style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer', border: 'none' }}>
              <ChevronLeft size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {TESTIMONIALS.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? '#8b5cf6' : 'rgba(255,255,255,.2)', border: 'none', cursor: 'pointer', transition: 'all .3s' }} />
              ))}
            </div>
            <button onClick={next} className="glass" style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer', border: 'none' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
