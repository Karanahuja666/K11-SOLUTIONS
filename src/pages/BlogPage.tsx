import Blog from '@/components/sections/Blog'
import StarField from '@/components/ui/StarField'
import { useSEO } from '@/hooks/useSEO'

export default function BlogPage() {
  useSEO('Blog', 'Tips, trends, and insights on web development, AI, digital marketing, and business growth.')
  return (
    <div className="cosmic-bg" style={{ minHeight: '100vh', paddingTop: 80 }}>
      <StarField count={80} />
      <Blog />
    </div>
  )
}
