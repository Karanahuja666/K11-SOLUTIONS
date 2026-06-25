import { motion } from 'framer-motion'
import { Globe, Heart, Stethoscope, Coffee, QrCode, Plane, ExternalLink } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

const PROJECTS = [
  {
    id: '1', icon: Globe, color: '#3b82f6',
    title: 'Dynamic Travel Website',
    subtitle: 'ghumoduniya.fun',
    link: 'https://ghumoduniya.fun',
    description: 'Interactive travel platform showcasing destinations, tours, and packages with an engaging 3D globe interface. Built for travel businesses to captivate visitors and convert them into customers.',
    features: ['Interactive UI', 'Tour Listings', 'Enquiry Forms', 'SEO Optimized'],
    tech: ['HTML5', 'CSS3', 'JavaScript', 'D3.js'],
    impacts: ['3–5× more tour enquiries', 'Professional credibility', '24/7 package showcase', 'Automatic lead capture'],
  },
  {
    id: '2', icon: Heart, color: '#ec4899',
    title: 'Digital Invitation & Event Cards',
    subtitle: 'zingy-squirrel-afdd2b.netlify.app',
    link: 'https://zingy-squirrel-afdd2b.netlify.app',
    description: 'Stunning digital wedding, birthday, and event invitations that guests receive instantly — accessible on any device, shareable on WhatsApp, and memorable for a lifetime. Zero printing costs.',
    features: ['Wedding Cards', 'Birthday Invites', 'RSVP Tracking', 'Shareable Links'],
    tech: ['Web App', 'Netlify', 'Custom Design', 'Shareable'],
    impacts: ['100% printing cost savings', 'Instant mobile delivery', 'Eco-friendly & paperless', 'Higher open rates'],
  },
  {
    id: '3', icon: Stethoscope, color: '#10b981',
    title: 'Medical Appointment Booking System',
    subtitle: 'frontend-plum-ten-96.vercel.app',
    link: 'https://frontend-plum-ten-96.vercel.app',
    description: 'Purpose-built healthcare platform helping clinics and hospitals manage patient appointments effortlessly. Reduces phone queues, eliminates manual scheduling errors, and offers self-service booking.',
    features: ['Online Booking 24/7', 'Doctor Profiles', 'Smart Time Slots', 'Admin Panel'],
    tech: ['React', 'Vercel', 'Node.js', 'Database'],
    impacts: ['Reduced no-shows', '60% less admin workload', 'Better patient satisfaction', 'Multi-doctor scaling'],
  },
  {
    id: '4', icon: Coffee, color: '#f59e0b',
    title: 'Café & Restaurant Digital Presence',
    subtitle: 'v2com.netlify.app',
    link: 'https://v2com.netlify.app',
    description: 'A stunning café website that showcases menus beautifully, attracts new customers through search engines, and drives more dine-in and takeaway orders with an inviting digital storefront.',
    features: ['Visual Menu', 'Photo Gallery', 'Google Maps', 'Brand Story'],
    tech: ['HTML5', 'CSS3', 'Netlify', 'Google Maps'],
    impacts: ['More walk-ins via Google', 'Menu showcase for visitors', 'Brand loyalty building', 'Online inquiry capture'],
  },
  {
    id: '5', icon: QrCode, color: '#8b5cf6',
    title: 'QR Code Smart Menu System',
    subtitle: 'qr-menu-snowy-beta.vercel.app',
    link: 'https://qr-menu-snowy-beta.vercel.app',
    description: 'Contactless smart menu — guests scan a QR code and instantly access the full menu on their phone. No app download needed. Hygienic, modern, and instantly updatable.',
    features: ['QR Generation', 'No App Needed', 'Visual Menu', 'Real-time Updates'],
    tech: ['QR Tech', 'React', 'Vercel', 'Real-time'],
    impacts: ['Zero printing costs', 'Fewer staff trips per table', 'Hygienic dining solution', 'Real-time price updates'],
  },
  {
    id: '6', icon: Plane, color: '#f97316',
    title: 'Travel Agency Complete Portal',
    subtitle: 'prismatic-beignet-de15e1.netlify.app',
    link: 'https://prismatic-beignet-de15e1.netlify.app',
    description: 'Full-featured travel agency portal covering domestic & international flights, curated Umrah packages, visa assistance, and customized holiday tours. A trusted digital face for a complete travel business.',
    features: ['Flight Booking', 'Umrah Packages', 'Visa Services', 'Holiday Tours'],
    tech: ['HTML5', 'CSS3', 'Netlify', 'SEO'],
    impacts: ['24/7 online reach', 'Direct bookings vs OTAs', 'Professional trust building', 'Google search leads'],
  },
]

export default function Portfolio() {
  return (
    <section id="portfolio" style={{ padding: '112px 0' }}>
      <div className="section-container">
        <SectionHeading label="Our Projects" title="Real Work, Real Results" subtitle="Live projects we've built and deployed — from travel platforms to smart menus." />

        <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
          {PROJECTS.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.08 }}
              className="cosmic-card"
              style={{ padding: 32, textAlign: 'left', overflow: 'hidden' }}
            >
              {/* Header */}
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
                <div style={{ width: 48, height: 48, borderRadius: 14, display: 'flex', alignItems: 'center', justifyContent: 'center', background: `${p.color}15`, border: `1px solid ${p.color}30`, flexShrink: 0 }}>
                  <p.icon size={22} style={{ color: p.color }} />
                </div>
                <div style={{ flex: 1, minWidth: 200 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, flexWrap: 'wrap' }}>
                    <h3 style={{ fontFamily: "'Space Grotesk', sans-serif", fontSize: 20, fontWeight: 700, color: '#fff' }}>{p.title}</h3>
                    <span style={{ fontSize: 12, padding: '3px 10px', borderRadius: 6, background: `${p.color}15`, border: `1px solid ${p.color}30`, color: p.color, fontWeight: 500 }}>SERVICE 0{p.id}</span>
                  </div>
                  <a href={p.link} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, color: p.color, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, marginTop: 4 }}>
                    {p.subtitle} <ExternalLink size={12} />
                  </a>
                </div>
                <a href={p.link} target="_blank" rel="noopener noreferrer" className="btn-primary" style={{ padding: '10px 20px', fontSize: 13, background: `linear-gradient(135deg, ${p.color}, ${p.color}cc)`, boxShadow: `0 4px 20px ${p.color}40`, flexShrink: 0 }}>
                  <ExternalLink size={14} /> Visit Live
                </a>
              </div>

              {/* Description */}
              <p style={{ color: '#94a3b8', fontSize: 15, lineHeight: 1.7, marginBottom: 24 }}>{p.description}</p>

              {/* Features grid */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))', gap: 10, marginBottom: 24 }}>
                {p.features.map(f => (
                  <div key={f} style={{ padding: '10px 14px', borderRadius: 10, background: 'rgba(255,255,255,.03)', border: '1px solid rgba(255,255,255,.06)', fontSize: 13, color: '#cbd5e1', fontWeight: 500 }}>
                    {f}
                  </div>
                ))}
              </div>

              {/* Bottom row: tech + impacts */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 24, justifyContent: 'space-between' }}>
                <div>
                  <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 8 }}>Built With</span>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {p.tech.map(t => (
                      <span key={t} style={{ padding: '4px 12px', borderRadius: 6, fontSize: 12, background: `${p.color}10`, border: `1px solid ${p.color}25`, color: p.color, fontWeight: 500 }}>{t}</span>
                    ))}
                  </div>
                </div>
                <div style={{ flex: 1, minWidth: 250 }}>
                  <span style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', letterSpacing: 1, display: 'block', marginBottom: 8 }}>Impact Highlights</span>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4px 16px' }}>
                    {p.impacts.map(imp => (
                      <span key={imp} style={{ fontSize: 13, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 6 }}>
                        <span style={{ width: 6, height: 6, borderRadius: '50%', background: p.color, flexShrink: 0 }} />
                        {imp}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
