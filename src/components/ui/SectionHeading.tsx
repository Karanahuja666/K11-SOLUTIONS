import { motion } from 'framer-motion'

interface Props {
  label: string
  title: string
  subtitle?: string
}

export default function SectionHeading({ label, title, subtitle }: Props) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
      style={{ textAlign: 'center', maxWidth: 720, margin: '0 auto 64px' }}
    >
      <span style={{
        display: 'inline-block', padding: '6px 16px', borderRadius: 999, fontSize: 12,
        fontWeight: 600, letterSpacing: 1, textTransform: 'uppercase',
        background: 'rgba(139,92,246,.1)', border: '1px solid rgba(139,92,246,.2)',
        color: '#a78bfa', marginBottom: 20,
      }}>
        {label}
      </span>
      <h2 style={{
        fontFamily: "'Space Grotesk', sans-serif", fontSize: 'clamp(28px, 5vw, 48px)',
        fontWeight: 700, color: '#fff', marginBottom: 16, lineHeight: 1.2,
      }}>
        {title}
      </h2>
      {subtitle && <p style={{ color: '#94a3b8', fontSize: 18, lineHeight: 1.7 }}>{subtitle}</p>}
    </motion.div>
  )
}
