import Portfolio from '@/components/sections/Portfolio'
import StarField from '@/components/ui/StarField'
import { useSEO } from '@/hooks/useSEO'

export default function WorkPage() {
  useSEO('Our Work', 'Explore the portfolio of K11 Solutions – web applications, e-commerce platforms, fintech apps, and more.')
  return (
    <div className="cosmic-bg" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <StarField count={80} />
      <Portfolio />
    </div>
  )
}
