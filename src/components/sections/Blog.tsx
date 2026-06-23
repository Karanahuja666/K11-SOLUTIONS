import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Calendar, User, ArrowRight } from 'lucide-react'
import SectionHeading from '@/components/ui/SectionHeading'

interface BlogPost {
  id: string; title: string; excerpt: string; content: string; author: string; date: string; image: string; category: string
}

const DEFAULT_POSTS: BlogPost[] = [
  { id: '1', title: 'Why Every Business Needs a Website in 2025', excerpt: 'In the digital age, not having a website is like not having a business card. Here\'s why it matters more than ever.', content: '', author: 'K11 Team', date: '2025-06-15', image: 'https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=800&q=80', category: 'Business' },
  { id: '2', title: 'How AI Chatbots Can 10x Your Customer Support', excerpt: 'AI chatbots aren\'t just a trend — they\'re a revolution. Learn how businesses are saving hours daily with smart automation.', content: '', author: 'K11 Team', date: '2025-06-10', image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&q=80', category: 'AI' },
  { id: '3', title: 'Digital Wedding Invitations: The Modern Way to Invite', excerpt: 'Paper invites are out. Beautiful, interactive digital wedding cards are in. Here\'s why couples are making the switch.', content: '', author: 'K11 Team', date: '2025-06-05', image: 'https://images.unsplash.com/photo-1519741497674-611481863552?w=800&q=80', category: 'Trends' },
]

export default function Blog() {
  const [posts, setPosts] = useState<BlogPost[]>([])

  useEffect(() => {
    const saved = localStorage.getItem('k11_blog')
    setPosts(saved ? JSON.parse(saved) : DEFAULT_POSTS)
  }, [])

  return (
    <section id="blog" style={{ padding: '112px 0' }}>
      <div className="section-container">
        <SectionHeading label="Blog" title="Latest Insights" subtitle="Tips, trends, and insights to help your business grow online." />

        <div className="grid-3">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="cosmic-card"
              style={{ overflow: 'hidden', textAlign: 'left', cursor: 'pointer' }}
            >
              <div style={{ height: 200, overflow: 'hidden' }}>
                <img src={post.image} alt={post.title} loading="lazy" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
              </div>
              <div style={{ padding: 20 }}>
                <span style={{ fontSize: 12, fontWeight: 500, color: '#a78bfa', background: 'rgba(139,92,246,.1)', padding: '4px 10px', borderRadius: 6, border: '1px solid rgba(139,92,246,.2)' }}>{post.category}</span>
                <h3 style={{ color: '#fff', fontWeight: 600, fontSize: 17, marginTop: 12, marginBottom: 8, lineHeight: 1.4 }}>{post.title}</h3>
                <p style={{ color: '#64748b', fontSize: 14, lineHeight: 1.6, marginBottom: 16, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.excerpt}</p>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 12, color: '#64748b' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><User size={12} /> {post.author}</span>
                    <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><Calendar size={12} /> {new Date(post.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</span>
                  </div>
                  <ArrowRight size={16} style={{ color: '#8b5cf6' }} />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
