import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, Mail, Phone, MapPin, MessageCircle } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'
import toast from 'react-hot-toast'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' })
  const [sending, setSending] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) { toast.error('Please fill in required fields'); return }
    setSending(true)
    const msgs = JSON.parse(localStorage.getItem('k11_messages') || '[]')
    msgs.push({ ...form, id: Date.now().toString(), date: new Date().toISOString(), read: false })
    localStorage.setItem('k11_messages', JSON.stringify(msgs))
    setTimeout(() => {
      setSending(false)
      setForm({ name: '', email: '', phone: '', message: '' })
      toast.success('Message sent! We\'ll get back to you soon.')
    }, 800)
  }

  const inputStyle: React.CSSProperties = {
    width: '100%', background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.08)',
    borderRadius: 12, padding: '12px 16px', fontSize: 14, color: '#fff', outline: 'none',
    fontFamily: 'Inter, sans-serif', transition: 'border-color .3s',
  }
  const labelStyle: React.CSSProperties = { display: 'block', fontSize: 12, fontWeight: 500, color: '#94a3b8', marginBottom: 8, textTransform: 'uppercase', letterSpacing: 1 }
  const focusHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => e.currentTarget.style.borderColor = 'rgba(139,92,246,.5)'
  const blurHandler = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => e.currentTarget.style.borderColor = 'rgba(255,255,255,.08)'

  return (
    <section id="contact" style={{ padding: '112px 0' }}>
      <div className="section-container">
        <SectionHeading label="Get In Touch" title="Let's Build Together" subtitle="Ready to bring your vision to life? Drop us a message." />

        <div className="grid-contact">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            className="cosmic-card" style={{ padding: 32, textAlign: 'left' }}>
            <form onSubmit={handleSubmit}>
              <div className="grid-form-row" style={{ marginBottom: 20 }}>
                <div>
                  <label style={labelStyle}>Name *</label>
                  <input type="text" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} placeholder="John Smith" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
                <div>
                  <label style={labelStyle}>Email *</label>
                  <input type="email" value={form.email} onChange={e => setForm({ ...form, email: e.target.value })} placeholder="john@example.com" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
                </div>
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Phone</label>
                <input type="tel" value={form.phone} onChange={e => setForm({ ...form, phone: e.target.value })} placeholder="+91 98765 43210" style={inputStyle} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <div style={{ marginBottom: 20 }}>
                <label style={labelStyle}>Message *</label>
                <textarea value={form.message} onChange={e => setForm({ ...form, message: e.target.value })} rows={5} placeholder="Tell us about your project..." style={{ ...inputStyle, resize: 'none' }} onFocus={focusHandler} onBlur={blurHandler} />
              </div>
              <button type="submit" disabled={sending} className="btn-primary" style={{ width: '100%', padding: 16, fontSize: 15 }}>
                {sending ? 'Sending...' : <><Send size={16} /> Send Message</>}
              </button>
            </form>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
            style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
            {[
              { icon: Mail, label: 'Email Us', value: 'hello@k11solutions.com', href: 'mailto:hello@k11solutions.com' },
              { icon: Phone, label: 'Call Us', value: '+91 98765 43210', href: 'tel:+919876543210' },
              { icon: MessageCircle, label: 'WhatsApp', value: 'Chat with us', href: 'https://wa.me/919876543210' },
              { icon: MapPin, label: 'Location', value: 'Chandigarh, India', href: '#' },
            ].map((c, i) => (
              <a key={i} href={c.href} target={c.href.startsWith('http') ? '_blank' : undefined} rel={c.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="cosmic-card" style={{ padding: 20, display: 'flex', alignItems: 'center', gap: 16, textDecoration: 'none', color: 'inherit', textAlign: 'left' }}>
                <div style={{ width: 44, height: 44, borderRadius: 12, background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.2)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <c.icon size={18} style={{ color: '#8b5cf6' }} />
                </div>
                <div>
                  <p style={{ fontSize: 12, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>{c.label}</p>
                  <p style={{ color: '#fff', fontWeight: 500, fontSize: 14, marginTop: 2 }}>{c.value}</p>
                </div>
              </a>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
