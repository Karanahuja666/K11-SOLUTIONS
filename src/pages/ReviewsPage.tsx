import Reviews from '@/components/sections/Reviews'
import StarField from '@/components/ui/StarField'
import { useSEO } from '@/hooks/useSEO'

export default function ReviewsPage() {
  useSEO('Reviews', 'Read real client reviews and share your experience with K11 Solutions.')
  return (
    <div className="cosmic-bg" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <StarField count={80} />
      <Reviews />
    </div>
  )
}
