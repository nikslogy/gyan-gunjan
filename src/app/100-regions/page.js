"use client"

import { NavBar } from "@/components/nav-bar"
import Image from "next/image"
import { Footer } from "@/components/footer"

function RegionsPage() {
  return (
    <main className={`min-h-screen bg-white transition-all duration-1000`}>
      <NavBar />

      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="max-w-5xl mx-auto space-y-16">
          
          {/* Page title */}
          <h1 className={`text-4xl font-bold text-[#7A2631] transition-all duration-700 delay-300`}>
            100 Regions
          </h1>

          {/* Content section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            
            {/* Image */}
            <div className="relative w-full h-[400px] lg:h-[500px]">
              <Image
                src="/images/map.png"
                alt="Map of India showing 100 regions"
                fill
                className="object-cover rounded-lg"
                priority
              />
            </div>
            
            {/* Text content */}
            <div className="space-y-6">
              <p className="text-justify text-black text-lg leading-relaxed">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
              </p>
              
              <p className="text-justify text-black text-lg leading-relaxed">
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.

              </p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </main>
  )
}

export default RegionsPage