"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, Search, X, ChevronDown } from 'lucide-react'
import { useRouter } from 'next/navigation'

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isSearchOpen, setIsSearchOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [isScrolled, setIsScrolled] = useState(false)
  const router = useRouter()
  
  const langRef = useRef(null)

  useEffect(() => {
    function handleScroll() {
      if (window.scrollY > 0) {
        setIsScrolled(true)
      } else {
        setIsScrolled(false)
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    function handleClickOutside(event) {
      if (langRef.current && !langRef.current.contains(event.target)) {
        setIsLangOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = (e) => {
    if (e) e.preventDefault()
    // Add your search logic here
    console.log("Searching for:", searchQuery)
  }

  const handleNavigation = (e) => {
    // Prevent the black flash during navigation
    document.body.style.backgroundColor = 'white';
  };

  useEffect(() => {
    // Add navigation event listeners
    const links = document.querySelectorAll('a');
    links.forEach(link => {
      link.addEventListener('click', handleNavigation);
    });

    return () => {
      links.forEach(link => {
        link.removeEventListener('click', handleNavigation);
      });
    };
  }, []);

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'nav-scrolled' : ''
    }`}>
      <nav className={`max-w-7xl mx-auto rounded-custom transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#c4deff]/80 hover:bg-[#c4deff] px-4 py-0 mt-2 mx-4 shadow-md' 
          : 'bg-[#c4deff] px-4 py-0 mt-4 mx-4'
      }`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start md:items-center gap-0.5 mr-auto md:w-auto">
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-32 md:w-40 h-24' : 'w-48 md:w-64 h-36'
            }`}>
              <Image
                src="/images/GyanGunjan-Logo.png"
                alt="Gyan Gunjan Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop*/}
          <div className="hidden md:flex items-center gap-6 justify-center w-full">
            <Link href="/about-project" className="font-inter text-[#1a365d] hover:text-gray-900">
              About the Project
            </Link>
            <Link href="/jeevan-darshan" className="text-[#1a365d] hover:text-gray-900">
              Jeevan Darshan
            </Link>
            <Link href="/resources" className="text-[#1a365d] hover:text-gray-900">
              Resources
            </Link>
            <Link href="/lets-collaborate">
              <button className="bg-[#E7B24B] text-black hover:bg-[#f6a93d] rounded-custom2 px-4 py-1.5 font-medium">
                Let's Collaborate
              </button>
            </Link>
            
            {/* Desktop Search */}
            <div className="flex items-center">
              <button
                onClick={() => setIsSearchOpen(!isSearchOpen)}
                className={`p-1.5 hidden md:block transition-opacity duration-300 ${
                  isSearchOpen ? 'opacity-0' : 'opacity-100'
                }`}
              >
                <Search className="h-4 w-4 text-[#1a365d]" />
              </button>
              <form 
                onSubmit={handleSearch}
                className={`transition-all duration-300 ease-in-out overflow-hidden ${
                  isSearchOpen ? 'w-64 opacity-100' : 'w-0 opacity-0'
                }`}
              >
                <div className="flex">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search..."
                    className="w-full p-2 rounded-custom2 text-black border border-r-0 border-gray-300 focus:outline-none"
                  />
                  <button 
                    type="button"
                    onClick={() => {
                      setIsSearchOpen(false);
                      setSearchQuery("");
                    }}
                    className="p-2 border border-l-0 border-gray-300 hover:bg-gray-50"
                  >
                    <X className="h-4 w-4 text-[#1a365d]" />
                  </button>
                </div>
              </form>
            </div>

            <div className="relative" ref={langRef}>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-[#1a365d] text-base"
              >
                Eng <ChevronDown className="h-4 w-4" />
              </button>
              {isLangOpen && (
                <div className="absolute top-full left-0 mt-3 w-48 rounded-custom2 shadow-lg bg-[#F6B352] ring-1 ring-black ring-opacity-5 transition-all duration-200 ease-in-out opacity-100 transform scale-100 origin-top">
                  <div className="py-0" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100 rounded-custom2" role="menuitem">English</a>
                    <a href="#" className="block px-4 py-2 text-black hover:bg-gray-100 rounded-custom2" role="menuitem">Hindi (coming soon)</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="p-2">
              <Search className="h-5 w-5 text-[#1a365d]" />
            </button>
            
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <X className="h-5 w-5 text-[#1a365d]" />
              ) : (
                <Menu className="h-5 w-5 text-[#1a365d]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Search Bar - Moved outside the navigation items */}
        {isSearchOpen && (
          <div className="md:hidden mt-4 px-2">
            <form onSubmit={handleSearch} className="relative w-full">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
                className="w-full p-2 pr-10 rounded-custom2 text-black border border-gray-300 focus:outline-none"
              />
              <button 
                type="button"
                onClick={() => {
                  setIsSearchOpen(false);
                  setSearchQuery("");
                }}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 p-1"
              >
                <X className="h-5 w-5 text-[#1a365d]" />
              </button>
            </form>
          </div>
        )}

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/about-project"
                className="text-[#1a365d] text-lg hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                About the Project
              </Link>
              <Link
                href="/jeevan-darshan"
                className="text-[#1a365d] text-lg hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Jeevan Darshan
              </Link>
              <Link
                href="/resources"
                className="text-[#1a365d] text-lg hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link href="/lets-collaborate">
                <button
                  className="bg-[#F6B352] text-black hover:bg-[#f6a93d] rounded-custom px-6 py-2 font-medium w-full"
                  onClick={() => setIsOpen(false)}
                >
                  Let's Collaborate
                </button>
              </Link>
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center justify-between text-[#1a365d] text-lg hover:text-gray-900"
              >
                Eng <ChevronDown className="h-4 w-4" />
              </button>
              {isLangOpen && (
                <div className="pl-4">
                  <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">English</a>
                  <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">Hindi (coming soon)</a>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}