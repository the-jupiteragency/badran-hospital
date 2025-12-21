"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react"

const footerLinks = {
  column1: [
    { label: "About Us", href: "/about" },
    { label: "Health Hub", href: "/health-hub" },
    { label: "Find a Doctor", href: "/doctors" },
    { label: "Find a speciality", href: "/specialities" },
    { label: "Medical Tourism", href: "/medical-tourism" },
  ],
  column2: [
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
    { label: "FAQs", href: "/faqs" },
    { label: "Privacy Policy", href: "/privacy" },
    { label: "Terms and Conditions", href: "/terms" },
  ],
}

const socialLinks = [
  { icon: "/icons/facebook.svg", href: "#", label: "Facebook" },
  { icon: "/icons/Instagram.svg", href: "#", label: "Instagram" },
  { icon: "/icons/Linkedin.svg", href: "#", label: "LinkedIn" },
  { icon: "/icons/youtube.svg", href: "#", label: "YouTube" },
]

export function Footer() {
  const [email, setEmail] = useState("")
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle")
  const [message, setMessage] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setStatus("loading")

    try {
      const res = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      })

      const data = await res.json()

      if (res.ok) {
        setStatus("success")
        setMessage(data.message)
        setEmail("")
      } else {
        setStatus("error")
        setMessage(data.error)
      }
    } catch {
      setStatus("error")
      setMessage("Something went wrong")
    }

    setTimeout(() => setStatus("idle"), 3000)
  }

  return (
    <footer className="bg-linear-to-b from-[#B2EBF2] to-[#80DEEA]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-[1.2fr_0.8fr_0.8fr_1.2fr] gap-8 lg:gap-12">
          {/* Logo & Contact Info */}
          <div className="space-y-6">
            <Image
              src="/icons/logo.svg"
              alt="Badran Hospital"
              width={180}
              height={90}
              className="h-20 w-auto"
            />
            <div className="space-y-4">
              <Link
                href="https://goo.gl/maps/placeholder"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-start gap-3 group"
              >
                <Image src="/icons/icon-12.svg" alt="Location" width={20} height={20} className="mt-1 shrink-0" />
                <span className="text-[#1A3B5C] leading-relaxed group-hover:text-[#0097A7] transition-colors">
                  123 Dokki Street, Mohandessein, Egypt.
                </span>
              </Link>
              <Link href="tel:1234567890" className="flex items-center gap-3 group">
                <Image src="/icons/icon-13.svg" alt="Phone" width={20} height={20} className="shrink-0" />
                <span className="text-[#1A3B5C] group-hover:text-[#0097A7] transition-colors">123-456-7890</span>
              </Link>
              <Link href="mailto:info@badranhospital.com" className="flex items-center gap-3 group">
                <Image src="/icons/icon-18.svg" alt="Email" width={20} height={20} className="shrink-0" />
                <span className="text-[#1A3B5C] group-hover:text-[#0097A7] transition-colors">
                  info@badranhospital.com
                </span>
              </Link>
            </div>
          </div>

          {/* Navigation Links - Mobile: 2 columns, Desktop: 2 separate columns */}
          <div className="grid grid-cols-2 gap-4 md:contents border-y border-[#0097A7]/20 py-6 ">
            <nav className="space-y-3">
              {footerLinks.column1.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[#1A3B5C] hover:text-[#0097A7] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
            <nav className="space-y-3">
              {footerLinks.column2.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  className="block text-[#1A3B5C] hover:text-[#0097A7] transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Newsletter */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold text-[#1A3B5C]">Subscribe to our newsletter</h3>
            <p className="text-[#1A3B5C]/80">to get the latest news about health from our experts</p>
            <form onSubmit={handleSubmit} className="relative">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="example@email.com"
                className="w-full px-4 py-3 pr-28 rounded-full bg-white text-[#1A3B5C] placeholder:text-[#1A3B5C]/50 focus:outline-none focus:ring-2 focus:ring-[#0097A7]"
                required
              />
              <button
                type="submit"
                disabled={status === "loading"}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 px-3 py-1.5 bg-[#0097A7] text-white rounded-full text-sm font-medium flex items-center gap-1 hover:bg-[#00838F] transition-colors disabled:opacity-50"
              >
                {status === "loading" ? "..." : "Submit"}
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </form>
            {message && (
              <p className={`text-sm ${status === "success" ? "text-green-600" : "text-red-600"}`}>{message}</p>
            )}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-[#0097A7]/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-[#1A3B5C] font-medium">Follow Us</span>
              <div className="flex items-center gap-3">
                {socialLinks.map((social) => (
                  <Link
                    key={social.label}
                    href={social.href}
                    className="hover:scale-110 transition-transform duration-200"
                    aria-label={social.label}
                  >
                    <Image
                      src={social.icon || "/placeholder.svg"}
                      alt={social.label}
                      width={24}
                      height={24}
                      className="w-6 h-6"
                    />
                  </Link>
                ))}
              </div>
            </div>

            {/* Copyright */}
            <p className="text-[#1A3B5C] text-sm text-center md:text-right">
              Copyright © {new Date().getFullYear()} Badran Hospital. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}
