"use client"

import { useState, useEffect, Suspense } from "react"
import { NavBar } from "@/components/nav-bar"
import { Footer } from "@/components/footer"
import { API_BASE_URL } from '@/utils/api'

function TermsOfUseContent() {
  const [mounted, setMounted] = useState(false)
  const [termsData, setTermsData] = useState(null)
  const [loading, setLoading] = useState(true)


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
        // Instead of setting error, we'll just set loading to false
        setLoading(false)
      }
    }
    fetchData()
  }, [])

  // Mount animation
  useEffect(() => {
    setMounted(true)
  }, [])

  return (
    <div className="page-wrapper min-h-screen flex flex-col">
      <div className="navbar-wrapper">
        <NavBar />
      </div>
      <main className="content-wrapper flex-grow">
        <div className="container mx-auto px-4 md:px-6 py-12">
          <div className="max-w-5xl mx-auto space-y-8">
            {/* Show loading or content */}
            {loading ? (
              <div className="flex items-center justify-center py-12">Loading...</div>
            ) : termsData ? (
              <>
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
                    <p className="text-gray-600 mb-6">
                      Last Updated: {termsData.last_updated || new Date().toLocaleDateString()}
                    </p>
                    <div className="space-y-6">
                      <div dangerouslySetInnerHTML={{ __html: termsData.content }} />
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex items-center justify-center py-12 text-2xl font-semibold text-gray-600">
                Coming Soon
              </div>
            )}
          </div>
        </div>
      </main>
      <div className="mt-auto mb-0">
        <Footer />
      </div>
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