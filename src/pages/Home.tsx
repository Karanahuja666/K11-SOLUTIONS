import Hero from '@/components/sections/Hero'
import { useSEO } from '@/hooks/useSEO'

export default function Home() {
  useSEO('Building Digital Universes', 'K11 Solutions – Premium web development, UI/UX design, and digital solutions agency. We build futuristic websites and applications.')
  return <Hero />
}
