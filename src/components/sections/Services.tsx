import { motion } from 'framer-motion'
import { Globe, ShoppingCart, Mail, Users, Heart, Bot, Calendar, MessageSquare, Code, TrendingUp } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const SERVICES = [
  {
    category: 'Web Development',
    icon: Globe,
    color: '#8b5cf6',
    items: [
      { icon: Code, title: 'Static Websites', desc: 'Fast, lightweight business websites with modern design, SEO optimization, and mobile responsiveness.', color: '#a78bfa' },
      { icon: ShoppingCart, title: 'E-Commerce Websites', desc: 'Full-featured online stores with payment gateways, inventory management, and conversion-optimized checkout.', color: '#d946ef' },
    ]
  },
  {
    category: 'Digital Marketing',
    icon: TrendingUp,
    color: '#06b6d4',
    items: [
      { icon: Mail, title: 'Email Marketing', desc: 'Automated email campaigns, newsletters, drip sequences, and lead nurturing that drive engagement and sales.', color: '#06b6d4' },
      { icon: Users, title: 'Lead Generation', desc: 'Targeted strategies to attract qualified leads through landing pages, ads, funnels, and conversion optimization.', color: '#10b981' },
    ]
  },
  {
    category: 'Our Hit Services',
    icon: Heart,
    color: '#f43f5e',
    items: [
      { icon: Heart, title: 'Marriage Card Invitation Website', desc: 'Beautiful, personalized digital wedding invitation websites with RSVP, event details, photo galleries, and countdown timers.', color: '#f43f5e' },
      { icon: Bot, title: 'AI Chatbot', desc: 'Smart conversational AI bots for your website that handle customer queries 24/7, boost engagement, and automate support.', color: '#8b5cf6' },
      { icon: Calendar, title: 'Appointment Booking Website', desc: 'Professional booking platforms for doctors, salons, consultants — with calendar sync, reminders, and online payments.', color: '#f59e0b' },
      { icon: MessageSquare, title: 'WhatsApp AI Bots', desc: 'Automated WhatsApp bots that handle orders, bookings, FAQs, and customer support directly inside WhatsApp.', color: '#22c55e' },
    ]
  },
]

export default function Services() {
  let cardIndex = 0
  return (
    <section id="services" style={{ padding: '112px 0' }}>
      <div className="section-container">
        <SectionHeading label="What We Do" title="Our Services" subtitle="From stunning websites to intelligent AI bots — everything your business needs to grow online." />

        {SERVICES.map((cat, ci) => (
          <div key={cat.category} style={{ marginBottom: ci < SERVICES.length - 1 ? 64 : 0 }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24 }}
            >
              <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${cat.color}15`, border: `1px solid ${cat.color}30` }}>
                <cat.icon size={20} style={{ color: cat.color }} />
              </div>
              <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 22, fontWeight: 700, color: '#fff' }}>{cat.category}</h3>
            </motion.div>

            <div className={cat.items.length <= 2 ? 'grid-2' : 'grid-4'}>
              {cat.items.map((s) => {
                const idx = cardIndex++
                return (
                  <motion.div
                    key={s.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: (idx % 4) * 0.08 }}
                    className="cosmic-card"
                    style={{ padding: 24, textAlign: 'left', cursor: 'pointer' }}
                  >
                    <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                      <s.icon size={22} style={{ color: s.color }} />
                    </div>
                    <h4 style={{ color: '#fff', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{s.title}</h4>
                    <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
                  </motion.div>
                )
              })}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
