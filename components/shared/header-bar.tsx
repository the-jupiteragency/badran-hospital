"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Menu, X, ChevronDown } from "lucide-react"
import Image from "next/image"

const navLinks = [
  { label: "About Us", href: "#about" },
  { label: "Center of Excellence", href: "#coe" },
  { label: "Find a Doctor/Speciality", href: "#doctors" },
  { label: "Medical Tourism", href: "#tourism" },
  { label: "Health Hub", href: "#health-hub" },
  { label: "Contact us", href: "#contact" },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "unset"
    }

    return () => {
      document.body.style.overflow = "unset"
    }
  }, [isOpen])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-1 ${
        isScrolled ? "bg-[#0E7C7B]/95 backdrop-blur-md shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center z-50 relative">
            <div className="flex flex-col items-center">
              <Image 
                src="/icons/logo.svg" 
                alt="Badran Hospital Logo" 
                width={160} 
                height={64}
                className="h-12 md:h-16 w-auto" 
                priority
              />
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-6 xl:gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-white text-sm font-medium hover:text-white/80 transition-colors"
                aria-label={link.label}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Selector - Desktop */}
          <div className="hidden lg:flex items-center gap-2 text-white">
            <span className="text-sm font-medium">EN</span>
            <ChevronDown className="w-4 h-4" />
          </div>

          {/* Mobile Menu Button */}
          <button 
            onClick={() => setIsOpen(!isOpen)} 
            className="lg:hidden text-white p-2 z-50 relative hover:bg-white/10 rounded-full transition-colors" 
            aria-label={isOpen ? "Close menu" : "Open menu"}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 z-60 lg:hidden transition-all duration-300 ${
          isOpen ? "visible" : "invisible delay-300"
        }`}
      >
        {/* Backdrop */}
        <div 
          className={`absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-300 ${
            isOpen ? "opacity-100" : "opacity-0"
          }`}
          onClick={() => setIsOpen(false)}
        />

        {/* Drawer */}
        <div 
          className={`absolute right-0 top-0 bottom-0 w-[85%] max-w-[360px] bg-[#0E7C7B]/95 backdrop-blur-sm shadow-2xl transform transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] ${
            isOpen ? "translate-x-0" : "translate-x-full"
          }`}
        >
          <div className="flex flex-col h-full">
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-6 border-b border-white/10">
               <div className="flex flex-col items-center">
                  <Image 
                    src="/icons/logo.svg" 
                    alt="Badran Hospital Logo" 
                    width={150}
                    height={75}
                    className="h-16 w-auto brightness-0 invert" 
                  />
               </div>
               <button 
                  onClick={() => setIsOpen(false)}
                  className="p-2 -mr-2 text-white hover:bg-white/10 rounded-full transition-colors"
                  aria-label="Close menu"
               >
                  <X className="w-6 h-6" />
               </button>
            </div>

            {/* Navigation */}
            <nav className="flex-1 overflow-y-auto px-6 py-4 flex flex-col space-y-1">
              {navLinks.map((link, idx) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-between py-4 border-b border-white/10 text-white font-medium text-lg hover:text-white/80 hover:pl-2 transition-all duration-200 group"
                  style={{ transitionDelay: `${idx * 50}ms` }}
                >
                  {link.label}
                  <ChevronDown className="w-5 h-5 -rotate-90 text-white/70 group-hover:text-white transition-colors" />
                </Link>
              ))}
            </nav>

            {/* Mobile Language Selector & Additional Info */}
            <div className="p-6 bg-[#0E7C7B] mt-auto space-y-6">
              <div className="flex items-center gap-3 text-white font-medium p-2 rounded-lg hover:bg-white/10 bg-white/20 w-fit cursor-pointer border border-transparent transition-all">
                <span>EN</span>
                <ChevronDown className="w-4 h-4" />
              </div>
              
              <div className="text-sm text-white/60">
                <p>© {new Date().getFullYear()} Badran Hospital</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
