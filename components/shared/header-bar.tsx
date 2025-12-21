"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Menu, X, ChevronDown } from "lucide-react"

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

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-1 ${
        isScrolled ? "bg-[#0E7C7B]/95 backdrop-blur-sm shadow-lg" : "bg-transparent"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <div className="flex flex-col items-center">
              <Image 
                src="/icons/logo.svg" 
                alt="Badran Hospital Logo" 
                width={64}
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
          <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden text-white p-2" aria-label="Toggle menu">
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="lg:hidden bg-[#0E7C7B]/95 backdrop-blur-sm border-t border-white/10">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className="text-white text-base font-medium py-2 hover:text-white/80 transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <div className="flex items-center gap-2 text-white py-2 border-t border-white/10 mt-2">
              <span className="text-sm font-medium">EN</span>
              <ChevronDown className="w-4 h-4" />
            </div>
          </nav>
        </div>
      )}
    </header>
  )
}
