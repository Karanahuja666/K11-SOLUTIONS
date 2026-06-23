import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'
import Home from '@/pages/Home'
import ServicesPage from '@/pages/ServicesPage'
import AboutPage from '@/pages/AboutPage'
import WorkPage from '@/pages/WorkPage'
import ReviewsPage from '@/pages/ReviewsPage'
import BlogPage from '@/pages/BlogPage'
import ContactPage from '@/pages/ContactPage'
import NotFound from '@/pages/NotFound'
import Admin from '@/pages/Admin'

function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main>{children}</main>
      <Footer />
    </>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Toaster position="bottom-right" toastOptions={{
        style: { background: '#1a1a2e', color: '#e2e8f0', border: '1px solid rgba(139,92,246,.2)', fontSize: '14px', fontFamily: 'Inter, sans-serif' },
      }} />
      <Routes>
        <Route path="/admin" element={<Admin />} />
        <Route path="/" element={<Layout><Home /></Layout>} />
        <Route path="/services" element={<Layout><ServicesPage /></Layout>} />
        <Route path="/about" element={<Layout><AboutPage /></Layout>} />
        <Route path="/work" element={<Layout><WorkPage /></Layout>} />
        <Route path="/reviews" element={<Layout><ReviewsPage /></Layout>} />
        <Route path="/blog" element={<Layout><BlogPage /></Layout>} />
        <Route path="/contact" element={<Layout><ContactPage /></Layout>} />
        <Route path="*" element={<Layout><NotFound /></Layout>} />
      </Routes>
    </BrowserRouter>
  )
}
