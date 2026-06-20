import About from '@/components/sections/About'
import StarField from '@/components/ui/StarField'
import { useSEO } from '@/hooks/useSEO'

export default function AboutPage() {
  useSEO('About Us', 'Learn about K11 Solutions – 6+ years of experience, 150+ projects completed, transforming ideas into powerful digital products.')
  return (
    <div className="cosmic-bg" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <StarField count={80} />
      <About />
    </div>
  )
}
