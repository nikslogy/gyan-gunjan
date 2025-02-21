'use client'

import { useEffect, useState } from 'react'
import { checkAuth } from '../../utils/auth'

export default function AdminPage() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkAuth().then(data => {
      if (data.authenticated) setUser(data.username)
    })
  }, [])

  return (
    <div>
      <h1>Admin Dashboard</h1>
      {user ? <p>Welcome, {user}!</p> : <p>Loading...</p>}
    </div>
  )
}