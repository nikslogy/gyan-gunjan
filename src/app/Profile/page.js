'use client'

import { useEffect, useState } from 'react'
import ProtectedRoute from '../../components/ProtectedRoute'
import { checkAuth } from '../../utils/auth'

export default function ProfilePage() {
  const [user, setUser] = useState(null)

  return (
    <ProtectedRoute>
      <div>
        <h1>Profile</h1>
        <UserInfo />
      </div>
    </ProtectedRoute>
  )
}

function UserInfo() {
  const [user, setUser] = useState(null)

  useEffect(() => {
    checkAuth().then(data => {
      if (data.authenticated) setUser(data.username)
    })
  }, [])

  return user ? <p>Welcome {user}!</p> : <p>Loading...</p>
}