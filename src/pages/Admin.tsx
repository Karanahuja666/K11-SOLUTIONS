import { useState, useEffect } from 'react'
import AdminLogin from '@/admin/AdminLogin'
import AdminDashboard from '@/admin/AdminDashboard'

export default function Admin() {
  const [authed, setAuthed] = useState(false)

  useEffect(() => {
    setAuthed(localStorage.getItem('k11_admin_auth') === 'true')
  }, [])

  const handleLogout = () => {
    localStorage.removeItem('k11_admin_auth')
    localStorage.removeItem('k11_admin_session')
    setAuthed(false)
  }

  if (!authed) return <AdminLogin onLogin={() => setAuthed(true)} />
  return <AdminDashboard onLogout={handleLogout} />
}
