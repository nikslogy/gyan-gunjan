"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'
import { AUTH_CONFIG } from '@/config/auth'

export default function Login() {
  const [credentials, setCredentials] = useState({ username: '', password: '' })
  const [error, setError] = useState('')
  const router = useRouter()

  // Check if already logged in
  useEffect(() => {
    const isLoggedIn = localStorage.getItem('isLoggedIn')
    const loginTime = localStorage.getItem('loginTime')
    
    if (isLoggedIn === 'true' && loginTime) {
      const currentTime = new Date().getTime()
      const loginTimeStamp = parseInt(loginTime)
      const sessionDuration = AUTH_CONFIG.SESSION_DURATION * 60 * 1000
      
      if (currentTime - loginTimeStamp < sessionDuration) {
        router.push('/')
      }
    }
  }, [router])

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    try {
      // Simple hardcoded credentials check
      if (credentials.username === 'Ramanujan' && credentials.password === '1729') {
        // Set both localStorage and cookie with current timestamp
        localStorage.setItem('isLoggedIn', 'true')
        localStorage.setItem('loginTime', new Date().getTime().toString())
        document.cookie = 'isLoggedIn=true; path=/'
        
        // Force a page reload to ensure middleware picks up the new cookie
        window.location.href = '/'
      } else {
        setError('Invalid credentials')
      }
    } catch (error) {
      console.error('Login error:', error)
      setError('An error occurred during login')
    }
  }

  return (
    <div className="min-h-screen flex">
      {/* Left side - Image */}
      <div className="hidden lg:block lg:w-2/4 relative">
        <Image
          src="/images/login_image.png"
          alt="Login background"
          fill
          sizes="(max-width: 1024px) 0vw, 66vw"
          className="object-cover object-center"
          style={{ objectPosition: 'center center' }}
          priority
        />
      </div>

      {/* Right side - Login Form */}
      <div className="w-full lg:w-1/3 flex items-center justify-center px-8">
        <div className="max-w-md w-full space-y-8">
          <div>
            <h2 className="text-3xl text-black font-bold font-inter">Sign In</h2>
          </div>

          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium font-inter text-gray-700">
                  Username
                </label>
                <input
                  type="text"
                  required
                  className="mt-1 block w-full px-3 py-2 border font-inter border-gray-300 rounded-custom2 text-gray-900 placeholder-gray-400"
                  placeholder="Enter your username"
                  value={credentials.username}
                  onChange={(e) => setCredentials({...credentials, username: e.target.value})}
                />
              </div>

              <div>
                <label className="block text-sm font-medium font-inter text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  required
                  className="mt-1 block w-full px-3 py-2 border font-inter border-gray-300 rounded-custom2 text-gray-900 placeholder-gray-400"
                  placeholder="Please enter your password"
                  value={credentials.password}
                  onChange={(e) => setCredentials({...credentials, password: e.target.value})}
                />
              </div>
            </div>

            {error && (
              <div className="text-red-500 text-sm text-center">{error}</div>
            )}

            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border font-inter border-transparent rounded-custom2 shadow-sm text-sm font-medium text-white bg-[#0A4392] hover:bg-[#0B4392]"
            >
              Sign in
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}