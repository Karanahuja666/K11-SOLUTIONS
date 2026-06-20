import Contact from '@/components/sections/Contact'
import StarField from '@/components/ui/StarField'
import { useSEO } from '@/hooks/useSEO'

export default function ContactPage() {
  useSEO('Contact Us', 'Get in touch with K11 Solutions. Start your project today – email, phone, or WhatsApp.')
  return (
    <div className="cosmic-bg" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <StarField count={80} />
      <Contact />
    </div>
  )
}
