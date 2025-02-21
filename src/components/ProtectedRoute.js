'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '../utils/auth'

export default function ProtectedRoute({ children }) {
  const router = useRouter()

  useEffect(() => {
    checkAuth().then(({ authenticated }) => {
      if (!authenticated) {
        const nextUrl = encodeURIComponent(window.location.href)
        window.location.href = `http://localhost:8000/profile/login/?next=${nextUrl}`
      }
    })
  }, [router])

  return children
}