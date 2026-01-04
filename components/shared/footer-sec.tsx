"use client";

import type React from "react";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { MapPin, Phone, Mail, ArrowRight } from "lucide-react";

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
};

const socialLinks = [
  { icon: "/icons/facebook.svg", href: "https://facebook.com/DrBadranhospital/", label: "Facebook" },
  { icon: "/icons/Instagram.svg", href: "https://www.instagram.com/badran.hospital/", label: "Instagram" },
  { icon: "/icons/Linkedin.svg", href: "https://www.linkedin.com/company/badran-hospital-eg/", label: "LinkedIn" },
]

export function Footer() {
  return (
    <footer className="bg-linear-to-b from-[#B2EBF2] to-[#80DEEA]">
      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-10 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 ">
          {/* Column 1: Logo & Description */}
          <div className="space-y-6">
            <Image
              src="/icons/d-logo.svg"
              alt="Badran Hospital"
              width={180}
              height={90}
              className="h-24 w-auto"
            />
            <p className="text-[#1A3B5C] text-sm md:text-base leading-relaxed font-light text-balance">
              Badran Hospital delivers trusted medical care with clinical excellence and personalized attention in the
              heart of Dokki, Cairo.
            </p>
          </div>

          {/* Column 2: Contact Info */}
          <div className="space-y-4 lg:pt-2">
            <Link
              href="https://maps.app.goo.gl/wJN2wjtGVphsQcPh9"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-start gap-3 group"
            >
              <Image
                src="/icons/icon-12.svg"
                alt="Location"
                width={26}
                height={26}
                className="mt-1 shrink-0"
              />
              <span className="text-[#1A3B5C] leading-relaxed group-hover:text-[#0097A7] transition-colors whitespace-nowrap">
                123 Dokki Street, Mohandessein, Egypt.
              </span>
            </Link>
            <Link href="tel:19986" className="flex items-center gap-3 group">
              <Image
                src="/icons/icon-13.svg"
                alt="Phone"
                width={26}
                height={26}
                className="shrink-0"
              />
              <span className="text-[#1A3B5C] group-hover:text-[#0097A7] transition-colors">Hotline: 19986</span>
            </Link>
            <Link href="mailto:info@badranhospital.com" className="flex items-center gap-3 group">
              <Image
                src="/icons/icon-18.svg"
                alt="Email"
                width={26}
                height={26}
                className="shrink-0"
              />
              <span className="text-[#1A3B5C] group-hover:text-[#0097A7] transition-colors whitespace-nowrap">
                info@badranhospital.com
              </span>
            </Link>
          </div>

          {/* Navigation Links - Mobile: Side-by-side, Desktop: Standard Columns with Spacing */}
          <div className="col-span-1 md:col-span-2 lg:col-span-2 grid grid-cols-2 gap-4 lg:pl-20">
            {/* Column 3: Navigation Links 1 */}
            <div className="lg:pt-2">
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
            </div>

            {/* Column 4: Navigation Links 2 */}
            <div className="lg:pt-2">
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
