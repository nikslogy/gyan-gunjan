"use client"

import { useState } from "react"
import Link from "next/link"
import { ChevronDown, Menu, Search, X } from 'lucide-react'

export function NavBar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isResourcesOpen, setIsResourcesOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)

  return (
    <div className="px-4 py-6">
      <nav className="max-w-7xl mx-auto bg-[#c4deff] px-4 md:px-6 py-3" // Reduced width, padding
        style={{ borderRadius: "3rem 0 3rem 0" }}
      >
        <div className="flex items-center justify-between">
          <Link href="/" className="flex flex-col items-center gap-0.5"> {/* Reduced gap */}
            <div className="w-10 h-12"> {/* Smaller logo */}
              <svg viewBox="0 0 48 48" className="w-full h-full fill-[#1a365d]">
                <path d="M24 4c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                <path d="M34 16c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                <path d="M14 16c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
                <path d="M24 28c-2.8 0-5 2.2-5 5s2.2 5 5 5 5-2.2 5-5-2.2-5-5-5zm0 8c-1.7 0-3-1.3-3-3s1.3-3 3-3 3 1.3 3 3-1.3 3-3 3z"/>
              </svg>
            </div>
            <div className="text-[#1a365d] text-xs font-semibold tracking-wider"> {/* Smaller text */}
              <div>GYAN</div>
              <div>GUNJAN</div>
            </div>
          </Link>

          {/* Desktop*/}
          <div className="hidden md:flex items-center gap-6 justify-center w-full">
            <Link href="/about" className="text-[#1a365d] hover:text-gray-900">
              About the Project
            </Link>
            <Link href="/darshan" className="text-[#1a365d]  hover:text-gray-900">
              Jeevan Darshan
            </Link>
            <div className="relative">
              <button 
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="flex items-center gap-1 text-[#1a365d] text-base hover:text-gray-900"
              >
                Resources <ChevronDown className="h-4 w-4" />
              </button>
              {isResourcesOpen && (
                <div className="absolute top-full left-0 mt-3 w-48 rounded-custom shadow-lg bg-[#F6B352] ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-custom" role="menuitem">Resource 1</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-custom" role="menuitem">Resource 2</a>
                    <a href="#" className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-custom" role="menuitem">Resource 3</a>
                  </div>
                </div>
              )}
            </div>
            <button 
              className="bg-[#F6B352] text-black hover:bg-[#f6a93d] rounded-custom px-4 py-1.5 font-medium" // Smaller button
            >
              Let's Collaborate
            </button>
            <button className="p-1.5"> {/* Smaller padding */}
              <Search className="h-4 w-4 text-[#1a365d]" /> {/* Smaller icon */}
            </button>
            <div className="relative">
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center gap-1 text-[#1a365d] text-base"
              >
                Eng <ChevronDown className="h-4 w-4" />
              </button>
              {isLangOpen && (
                <div className="absolute top-full right-0 mt-3 w-48 rounded-custom shadow-lg bg-[#F6B352] ring-1 ring-black ring-opacity-5">
                  <div className="py-1" role="menu" aria-orientation="vertical" aria-labelledby="options-menu">
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-custom" role="menuitem">English</a>
                    <a href="#" className="block px-4 py-2 text-gray-700 hover:bg-gray-100 rounded-custom" role="menuitem">Hindi</a>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Mobile*/}
          <div className="md:hidden flex items-center gap-4">
            <button className="p-2">
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

        {/* Mobile Menu Content */}
        {isOpen && (
          <div className="md:hidden mt-4">
            <div className="flex flex-col gap-4">
              <Link 
                href="/about" 
                className="text-[#1a365d] text-lg hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                About the Project
              </Link>
              <Link 
                href="/darshan" 
                className="text-[#1a365d] text-lg hover:text-gray-900"
                onClick={() => setIsOpen(false)}
              >
                Jeevan Darshan
              </Link>
              <button 
                onClick={() => setIsResourcesOpen(!isResourcesOpen)}
                className="flex items-center justify-between text-[#1a365d] text-lg hover:text-gray-900"
              >
                Resources <ChevronDown className="h-4 w-4" />
              </button>
              {isResourcesOpen && (
                <div className="pl-4">
                  <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">Resource 1</a>
                  <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">Resource 2</a>
                  <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">Resource 3</a>
                </div>
              )}
              <button 
                className="bg-[#F6B352] text-black hover:bg-[#f6a93d] rounded-custom px-6 py-2 font-medium w-full"
                onClick={() => setIsOpen(false)}
              >
                Let's Collaborate
              </button>
              <button 
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="flex items-center justify-between text-[#1a365d] text-lg hover:text-gray-900"
              >
                Eng <ChevronDown className="h-4 w-4" />
              </button>
              {isLangOpen && (
                <div className="pl-4">
                  <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">English</a>
                  <a href="#" className="block py-2 text-sm text-gray-700 hover:text-gray-900">Hindi</a>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  )
}
