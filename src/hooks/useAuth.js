"use client"

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { AUTH_CONFIG } from '@/config/auth'

export function useAuth() {
  const router = useRouter()

  useEffect(() => {
    const checkSession = () => {
      const isLoggedIn = localStorage.getItem('isLoggedIn')
      const loginTime = localStorage.getItem('loginTime')

      if (isLoggedIn === 'true' && loginTime) {
        const currentTime = new Date().getTime()
        const loginTimeStamp = parseInt(loginTime)
        const sessionDuration = AUTH_CONFIG.SESSION_DURATION * 60 * 1000 // Convert minutes to milliseconds

        if (currentTime - loginTimeStamp >= sessionDuration) {
          // Session expired
          localStorage.removeItem('isLoggedIn')
          localStorage.removeItem('loginTime')
          document.cookie = 'isLoggedIn=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;'
          router.push('/login')
        }
      }
    }

    // Check session immediately
    checkSession()

    // Set up interval to check session every 10 seconds
    const interval = setInterval(checkSession, 10000)

    // Clean up interval
    return () => clearInterval(interval)
  }, [router])
}