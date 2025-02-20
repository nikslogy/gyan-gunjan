
"use client"

import { useState, useEffect, Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { API_BASE_URL } from '@/utils/api'

function TermsOfUseContent() {
  const [mounted, setMounted] = useState(false)
  const [termsData, setTermsData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  // Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${API_BASE_URL}/api/terms-of-use/`)
        if (!response.ok) throw new Error('Failed to fetch data')
        const data = await response.json()
        if (data.length > 0) {
          setTermsData(data[0])
        }
      } catch (err) {
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Mount animation
  useEffect(() => {
    setMounted(true)
  }, [])

  if (loading) return <div className="min-h-screen bg-white flex items-center justify-center">Loading...</div>
  if (error) return <div className="min-h-screen bg-white flex items-center justify-center text-red-500">Error: {error}</div>
  if (!termsData) return null

  return (
    <div className="page-wrapper">
      <div className="navbar-wrapper">
        <NavBar />
      </div>
      <main className="content-wrapper">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Page Title */}
            <h1 className={`mt-10 text-3xl md:text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              {termsData.title || "Terms of Use"}
            </h1>

            {/* Terms Content */}
            <div className={`transition-all duration-700 delay-500 ${
              mounted ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-[20px]'
            }`}>
              <div className="prose max-w-none text-black">
                {/* Last Updated Date */}
                <p className="text-gray-600 mb-6">
                  Last Updated: {termsData.last_updated || new Date().toLocaleDateString()}
                </p>

                {/* Terms Sections */}
                <div className="space-y-6">
                  <div dangerouslySetInnerHTML={{ __html: termsData.content }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

// Main component with Suspense boundary
export default function TermsOfUse() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        Loading...
      </div>
    }>
      <TermsOfUseContent />
    </Suspense>
  )
}