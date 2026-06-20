import { motion } from 'framer-motion'
import { Lightbulb, PenTool, Code, TestTube, Rocket } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const STEPS = [
  { icon: Lightbulb, title: 'Idea', desc: 'We understand your vision, goals, and requirements through deep discovery sessions.', color: '#8b5cf6' },
  { icon: PenTool, title: 'Design', desc: 'Creating wireframes, prototypes, and visual designs that bring your vision to life.', color: '#d946ef' },
  { icon: Code, title: 'Development', desc: 'Building robust, scalable code with modern frameworks and best practices.', color: '#06b6d4' },
  { icon: TestTube, title: 'Testing', desc: 'Rigorous quality assurance to ensure flawless performance across all platforms.', color: '#f59e0b' },
  { icon: Rocket, title: 'Launch', desc: 'Deployment, optimization, and ongoing support to ensure your success.', color: '#10b981' },
]

export default function Process() {
  return (
    <section id="process" style={{ padding: '112px 0' }}>
      <div className="section-container" style={{ textAlign: 'center', maxWidth: 960 }}>
        <SectionHeading label="How We Work" title="Our Process" subtitle="A streamlined approach to bringing your digital vision from concept to reality." />

        <div style={{ position: 'relative' }}>
          {/* Timeline line */}
          <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-0.5px)', top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom, rgba(139,92,246,.4), rgba(217,70,239,.3), rgba(6,182,212,.2))' }} />

          {STEPS.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              style={{ position: 'relative', display: 'flex', alignItems: 'flex-start', gap: 24, marginBottom: i < STEPS.length - 1 ? 64 : 0, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}
            >
              {/* Dot */}
              <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', width: 16, height: 16, borderRadius: '50%', borderWidth: 2, borderStyle: 'solid', borderColor: s.color, background: '#020617', boxShadow: `0 0 16px ${s.color}60`, zIndex: 10 }} />

              {/* Card */}
              <div className="cosmic-card" style={{ width: '45%', padding: 24, textAlign: 'left', marginLeft: i % 2 === 0 ? 0 : 'auto', marginRight: i % 2 === 0 ? 'auto' : 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 12 }}>
                  <div style={{ width: 40, height: 40, borderRadius: 12, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${s.color}15`, border: `1px solid ${s.color}25` }}>
                    <s.icon size={20} style={{ color: s.color }} />
                  </div>
                  <div>
                    <span style={{ fontSize: 12, fontWeight: 500, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1 }}>Step {i + 1}</span>
                    <h3 style={{ color: '#fff', fontWeight: 600 }}>{s.title}</h3>
                  </div>
                </div>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6 }}>{s.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
