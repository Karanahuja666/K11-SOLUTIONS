import { useState, useEffect } from 'react'
import AdminLogin from '@/admin/AdminLogin'
import AdminDashboard from '@/admin/AdminDashboard'

export default function Admin() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    setAuthed(localStorage.getItem('k11_auth') === 'true')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('k11_auth')
    setAuthed(false)
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />
  return <AdminDashboard onLogout={handleLogout} />
}
