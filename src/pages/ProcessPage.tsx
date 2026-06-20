import Process from '@/components/sections/Process'
import Testimonials from '@/components/sections/Testimonials'
import StarField from '@/components/ui/StarField'
import { useSEO } from '@/hooks/useSEO'

export default function ProcessPage() {
  useSEO('Our Process', 'How K11 Solutions works – from idea to launch. Our streamlined 5-step process ensures quality delivery every time.')
  return (
    <div className="cosmic-bg" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <StarField count={80} />
      <Process />
      <Testimonials />
    </div>
  )
}
