import { motion } from 'framer-motion'
import SectionHeading from '@/components/ui/SectionHeading'

interface Project {
  id: string; title: string; category: string; description: string; tech: string[]; image: string
}

const HIT_PROJECTS: Project[] = [
  { id: '1', title: 'Royal Wedding Invitation', category: 'Marriage Card', description: 'Elegant digital wedding invitation with RSVP, event timeline, photo gallery, location maps, and animated countdown timer.', tech: ['React', 'Framer Motion', 'Tailwind'], image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80' },
  { id: '2', title: 'TechCorp Business Site', category: 'Static Website', description: 'Professional corporate website with modern design, service pages, team section, testimonials, and contact forms.', tech: ['React', 'Vite', 'Tailwind CSS'], image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&q=80' },
  { id: '3', title: 'ShopNest E-Commerce', category: 'E-Commerce', description: 'Full-featured online store with product catalog, cart, Stripe payments, order tracking, and admin inventory dashboard.', tech: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'], image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&q=80' },
  { id: '4', title: 'Dr. Care Appointments', category: 'Appointment Website', description: 'Doctor appointment booking platform with calendar scheduling, patient portal, video consultation, and automated reminders.', tech: ['React', 'Node.js', 'MongoDB', 'Twilio'], image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=800&q=80' },
  { id: '5', title: 'SmartAssist AI Bot', category: 'AI Chatbot', description: 'Intelligent website chatbot powered by GPT that handles customer queries, product recommendations, and support tickets 24/7.', tech: ['Python', 'OpenAI', 'React', 'FastAPI'], image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80' },
  { id: '6', title: 'BizBot WhatsApp AI', category: 'WhatsApp AI Bot', description: 'WhatsApp automation bot for order booking, appointment scheduling, FAQ handling, and broadcast messaging for businesses.', tech: ['Node.js', 'WhatsApp API', 'OpenAI', 'MongoDB'], image: 'https://images.unsplash.com/photo-1611746872915-64382b5c76da?w=800&q=80' },
]

export default function Portfolio() {
  return (
    <section id="portfolio" style={{ padding: '112px 0' }}>
      <div className="section-container">
        <SectionHeading label="Our Work" title="Hit Samples" subtitle="Real projects we've built — from wedding cards to AI bots." />

        <div className="grid-3">
          {HIT_PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08 }}
              className="cosmic-card"
              style={{ overflow: 'hidden', textAlign: 'left' }}
            >
              <div style={{ position: 'relative', height: 208, overflow: 'hidden' }}>
                <img src={p.image} alt={p.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
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
        </div>
      </div>
    </section>
  )
}
