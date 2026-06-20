import { motion } from 'framer-motion'
import { Globe, Layers, Palette, ShoppingCart, Search, Megaphone, Sparkles, Code2 } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const SERVICES = [
  { icon: Globe, title: 'Website Development', desc: 'Custom-built responsive websites with cutting-edge technology and pixel-perfect design.', color: '#8b5cf6' },
  { icon: Layers, title: 'Web Applications', desc: 'Scalable full-stack web applications with robust backends and seamless user experience.', color: '#d946ef' },
  { icon: Palette, title: 'UI/UX Design', desc: 'Intuitive, beautiful interfaces designed with user psychology and modern design principles.', color: '#06b6d4' },
  { icon: ShoppingCart, title: 'E-Commerce Development', desc: 'High-converting online stores with payment integration, inventory & analytics.', color: '#f59e0b' },
  { icon: Search, title: 'SEO Optimization', desc: 'Data-driven SEO strategies to boost your rankings and organic traffic growth.', color: '#10b981' },
  { icon: Sparkles, title: 'Branding', desc: 'Complete brand identity including logo, guidelines, and visual language design.', color: '#ec4899' },
  { icon: Megaphone, title: 'Digital Marketing', desc: 'Targeted campaigns across social, search, and display to maximize your ROI.', color: '#f97316' },
  { icon: Code2, title: 'Custom Software', desc: 'Bespoke software solutions tailored to your unique business requirements.', color: '#7c3aed' },
]

export default function Services() {
  return (
    <section id="services" style={{ padding: '112px 0' }}>
      <div className="section-container">
        <SectionHeading label="What We Do" title="Our Services" subtitle="Comprehensive digital solutions crafted with precision and futuristic vision." />
        <div className="grid-4">
          {SERVICES.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="cosmic-card"
              style={{ padding: 24, textAlign: 'left', cursor: 'pointer' }}
            >
              <div style={{ width: 48, height: 48, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20, background: `${s.color}15`, border: `1px solid ${s.color}25`, transition: 'transform .3s' }}>
                <s.icon size={22} style={{ color: s.color }} />
              </div>
              <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 16, marginBottom: 8 }}>{s.title}</h3>
              <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
