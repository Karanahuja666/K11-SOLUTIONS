import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star, Send } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import toast from 'react-hot-toast'

interface Review {
  id: string; name: string; role: string; text: string; rating: number; date: string
}

const DEFAULT_REVIEWS: Review[] = [
  { id: '1', name: 'Arjun Mehta', role: 'CEO, TechVentures', text: 'K11 Solutions transformed our entire digital presence. The website they built is not just beautiful — it converts. Our leads increased 300% in 3 months.', rating: 5, date: '2025-01-15' },
  { id: '2', name: 'Priya Sharma', role: 'Founder, StyleHub', text: 'The e-commerce platform they built is incredible. Smooth checkout, stunning design, and our sales doubled. Best decision we made for our business.', rating: 5, date: '2025-02-20' },
  { id: '3', name: 'Rohit Kapoor', role: 'CTO, DataFlow', text: 'Their WhatsApp AI bot handles hundreds of customer queries daily. Our support team workload dropped by 60%. Absolutely game-changing technology.', rating: 5, date: '2025-03-10' },
  { id: '4', name: 'Neha Gupta', role: 'Bride, Wedding 2025', text: 'Our digital wedding invitation was stunning! Guests loved it — the RSVP feature, photo gallery, and countdown timer made everything so easy and elegant.', rating: 5, date: '2025-04-05' },
  { id: '5', name: 'Dr. Vikram Singh', role: 'Dentist, SmileCare Clinic', text: 'The appointment booking website they built streamlined our entire patient flow. Online bookings increased 5x and no-shows dropped dramatically.', rating: 5, date: '2025-05-12' },
]

export default function Reviews() {
  const [reviews, setReviews] = useState<Review[]>([])
  const [current, setCurrent] = useState(0)
  const [form, setForm] = useState({ name: '', role: '', text: '', rating: 5 })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const saved = localStorage.getItem('k11_reviews')
    setReviews(saved ? JSON.parse(saved) : DEFAULT_REVIEWS)
  }, [])

  const prev = () => setCurrent(c => (c - 1 + reviews.length) % reviews.length)
  const next = () => setCurrent(c => (c + 1) % reviews.length)
  const t = reviews[current]

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.text) { toast.error('Please enter your name and review'); return }
    setSubmitting(true)
    const newReview: Review = { id: Date.now().toString(), name: form.name, role: form.role || 'Client', text: form.text, rating: form.rating, date: new Date().toISOString().split('T')[0] }
    const updated = [...reviews, newReview]
    localStorage.setItem('k11_reviews', JSON.stringify(updated))
    setTimeout(() => {
      setReviews(updated)
      setForm({ name: '', role: '', text: '', rating: 5 })
      setSubmitting(false)
      toast.success('Thank you for your review!')
    }, 600)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)',
    borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#fff', outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color .3s',
  }

  if (!t) return null

  return (
    <section style={{ padding: '112px 0' }}>
      <div className="section-container" style={{ maxWidth: 896, marginLeft: 'auto', marginRight: 'auto' }}>
        <SectionHeading label="Reviews" title="What Our Clients Say" subtitle="Real feedback from businesses and individuals we've helped grow." />

        {/* Review carousel */}
        <div style={{ marginBottom: 80 }}>
          <AnimatePresence mode="wait">
            <motion.div key={current} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ duration: 0.4 }}
              className="cosmic-card" style={{ padding: 48, textAlign: 'center' }}>
              <div style={{ display: 'flex', justifyContent: 'center', gap: 4, marginBottom: 24 }}>
                {Array.from({ length: t.rating }, (_, i) => <Star key={i} size={18} style={{ color: '#facc15', fill: '#facc15' }} />)}
              </div>
              <p style={{ color: '#cbd5e1', fontSize: 18, lineHeight: 1.7, marginBottom: 32, fontStyle: 'italic' }}>"{t.text}"</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 16 }}>
                <div style={{ width: 48, height: 48, borderRadius: '50%', background: 'linear-gradient(135deg, #8b5cf6, #d946ef)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontSize: 14 }}>{t.name.split(' ').map(w => w[0]).join('')}</div>
                <div style={{ textAlign: 'left' }}>
                  <p style={{ color: '#fff', fontWeight: 600 }}>{t.name}</p>
                  <p style={{ color: '#64748b', fontSize: 14 }}>{t.role}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          <div style={{ display: 'flex', justifyContent: 'center', gap: 12, marginTop: 32, alignItems: 'center' }}>
            <button onClick={prev} className="glass" style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer', border: 'none', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
              <ChevronLeft size={18} />
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
              {reviews.map((_, i) => (
                <button key={i} onClick={() => setCurrent(i)} style={{ width: i === current ? 24 : 8, height: 8, borderRadius: 4, background: i === current ? '#8b5cf6' : 'rgba(255,255,255,.2)', border: 'none', cursor: 'pointer', transition: 'all .3s' }} />
              ))}
            </div>
            <button onClick={next} className="glass" style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#94a3b8', cursor: 'pointer', border: 'none', WebkitTapHighlightColor: 'transparent', touchAction: 'manipulation' }}>
              <ChevronRight size={18} />
            </button>
          </div>
        </div>

        {/* Write a review form */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}>
          <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 24, fontWeight: 700, color: '#fff', textAlign: 'center', marginBottom: 32 }}>Share Your Experience</h3>
          <div className="cosmic-card" style={{ padding: 32 }}>
            <form onSubmit={handleSubmit}>
              <div className="grid-form-row" style={{ marginBottom: 20 }}>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Your Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,.5)'} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Your Role / Company</label>
                  <input type="text" value={form.role} onChange={e => setForm({ ...form, role: e.target.value })} placeholder="CEO, Company Name" style={inputStyle}
                    onFocus={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,.5)'} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'} />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Rating</label>
                <div style={{ display: 'flex', gap: 8 }}>
                  {[1, 2, 3, 4, 5].map(n => (
                    <button key={n} type="button" onClick={() => setForm({ ...form, rating: n })}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, WebkitTapHighlightColor: 'transparent' }}>
                      <Star size={24} style={{ color: '#facc15', fill: n <= form.rating ? '#facc15' : 'transparent', transition: 'fill .2s' }} />
                    </button>
                  ))}
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }}>Your Review *</label>
                <textarea value={form.text} onChange={e => setForm({ ...form, text: e.target.value })} rows={4} placeholder="Tell us about your experience working with K11 Solutions..." style={{ ...inputStyle, resize: 'none' }}
                  onFocus={e => e.currentTarget.style.borderColor = 'rgba(139,92,246,.5)'} onBlur={e => e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'} />
              </div>
              <button type="submit" disabled={submitting} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 15 }}>
                {submitting ? 'Submitting...' : <><Send size={16} /> Submit Review</>}
              </button>
            </form>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
