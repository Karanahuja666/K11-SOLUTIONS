import Services from '@/components/sections/Services'
import StarField from '@/components/ui/StarField'
import { useSEO } from '@/hooks/useSEO'

export default function ServicesPage() {
  useSEO('Our Services', 'Web development, UI/UX design, e-commerce, SEO, branding, digital marketing and custom software solutions by K11 Solutions.')
  return (
    <div className="cosmic-bg" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <StarField count={80} />
      <Services />
    </div>
  )
}
