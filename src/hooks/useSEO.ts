import { useEffect } from 'react'

export function useSEO(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} – K11 Solutions`
    const meta = document.querySelector('meta[name="description"]')
    if (meta) meta.setAttribute('content', description)
  }, [title, description])
}
