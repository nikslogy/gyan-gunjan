// src/components/AuthWrapper.js
'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { checkAuth } from '../utils/auth'

export default function AuthWrapper({ children }) {
  const router = useRouter()

  useEffect(() => {
    async function verifyAuth() {
      const { authenticated } = await checkAuth()
      if (!authenticated) {
        const nextUrl = encodeURIComponent(window.location.href)
        window.location.href = `http://143.244.132.118/profile/login/?next=${nextUrl}`
      }
    }
    verifyAuth()
  }, [router])

  return children
}