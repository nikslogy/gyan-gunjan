"use client"

import { useState, useEffect, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from 'lucide-react'
import { useRouter, usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import { API_BASE_URL } from '@/utils/api'

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const router = useRouter()
  const pathname = usePathname()
  
  const langRef = useRef(null)


  // Use the auth hook
  useAuth()

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

  // Function to check if a path is active
  const isActivePath = (path) => {
    return pathname === path
  }

  useEffect(() => {
    const hideNavbar = () => setIsVisible(false);
    const showNavbar = () => setIsVisible(true);

    window.addEventListener('videoModalOpen', hideNavbar);
    window.addEventListener('videoModalClose', showNavbar);

    return () => {
      window.removeEventListener('videoModalOpen', hideNavbar);
      window.removeEventListener('videoModalClose', showNavbar);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      isScrolled ? 'nav-scrolled' : ''
    }`}>
      <nav className={`max-w-7xl rounded-custom transition-all duration-300 ${
        isScrolled 
          ? 'bg-[#c4deff]/80 hover:bg-[#c4deff] px-4 py-0 mt-2 mx-4 md:mx-auto' 
          : 'bg-[#c4deff] px-4 py-0 mt-4 mx-4 md:mx-auto'
      }`}>
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col items-start md:items-center gap-0.5 mr-auto md:w-auto">
            <div className={`relative transition-all duration-300 ${
              isScrolled ? 'w-32 md:w-40 h-24' : 'w-32 md:w-40 h-28'
            }`}>
              <Image
                src="/images/only_GG_Logo_Blue.png"
                alt="Gyan Gunjan Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
          </Link>

          {/* Desktop*/}
          <div className="hidden md:flex items-center gap-16 justify-center w-full">
            <Link 
              href="/about-project" 
              className={`font-inter text-[#1a365d] hover:text-gray-900 relative ${
                isActivePath('/about-project') ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-[#1a365d]' : ''
              }`}
            >
              About the Project
            </Link>
            <Link 
              href="/jeevan-darshan" 
              className={`text-[#1a365d] hover:text-gray-900 relative ${
                isActivePath('/jeevan-darshan') ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-[#1a365d]' : ''
              }`}
            >
              Jeevan Darshana
            </Link>
            <Link 
              href="/resources" 
              className={`text-[#1a365d] hover:text-gray-900 relative ${
                isActivePath('/resources') ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-[#1a365d]' : ''
              }`}
            >
              Resources
            </Link>
            <Link 
              href="/lets-collaborate"
              className={`text-[#1a365d] hover:text-gray-900 relative ${
                isActivePath('/lets-collaborate') ? 'after:content-[""] after:absolute after:left-0 after:bottom-[-4px] after:w-full after:h-0.5 after:bg-[#1a365d]' : ''
              }`}
            >
              Let's Collaborate
            </Link>
          </div>

          {/* Mobile */}
          <div className="md:hidden flex items-center gap-4">
            <button onClick={() => setIsOpen(!isOpen)} className="p-2">
              {isOpen ? (
                <X className="h-5 w-5 text-[#1a365d]" />
              ) : (
                <Menu className="h-5 w-5 text-[#1a365d]" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col gap-4">
              <Link
                href="/about-project"
                className={`text-[#1a365d] text-lg hover:text-gray-900 ${
                  isActivePath('/about-project') ? 'font-semibold border-b-2 border-[#1a365d]' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                About the Project
              </Link>
              <Link
                href="/jeevan-darshan"
                className={`text-[#1a365d] text-lg hover:text-gray-900 ${
                  isActivePath('/jeevan-darshan') ? 'font-semibold border-b-2 border-[#1a365d]' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Jeevan Darshan
              </Link>
              <Link
                href="/resources"
                className={`text-[#1a365d] text-lg hover:text-gray-900 ${
                  isActivePath('/resources') ? 'font-semibold border-b-2 border-[#1a365d]' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Resources
              </Link>
              <Link
                href="/lets-collaborate"
                className={`text-[#1a365d] text-lg hover:text-gray-900 mb-4 ${
                  isActivePath('/lets-collaborate') ? 'font-semibold border-b-2 border-[#1a365d]' : ''
                }`}
                onClick={() => setIsOpen(false)}
              >
                Let's Collaborate
              </Link>
              
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}