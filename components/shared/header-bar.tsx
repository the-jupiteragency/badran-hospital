"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronDown } from "lucide-react";

type NavDict = {
  aboutUs: string;
  coe: string;
  findDoctor: string;
  medicalTourism: string;
  healthHub: string;
  contact: string;
  language: string;
};

export function Navbar({ lang, dict }: { lang: string; dict: NavDict }) {
  const pathname = usePathname();

  const navLinks = [
    { label: dict.aboutUs, href: `/${lang}/about` },
    { label: dict.coe, href: `/${lang}/center-of-excellence` },
    { label: dict.findDoctor, href: `/${lang}/find-a-doctor` },
    { label: dict.medicalTourism, href: `/${lang}/medical-tourism` },
    { label: dict.healthHub, href: `/${lang}/health-hub` },
    { label: dict.contact, href: `/${lang}/contact` },
  ];

  const getLocalizedPath = (newLang: string) => {
    const pathWithoutLang = pathname.replace(/^\/(en|ar)/, "");
    return `/${newLang}${pathWithoutLang || ""}`;
  };
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
  }, [isOpen]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 py-1 ${
        isOpen
          ? "bg-[#0E7C7B]"
          : isScrolled
          ? "bg-[#0E7C7B]/95 backdrop-blur-sm shadow-lg "
          : "bg-[#E2F0F7]/95"
      }`}
    >
      <div className="container mx-auto px-4 md:px-6 relative z-50">
        <div className="flex items-center justify-between h-16 md:h-24">
          {/* Logo */}
          <Link href={`/${lang}`} className="flex items-center">
            <div className="flex flex-col items-center">
              <Image
                src={
                  isScrolled || isOpen ? "/icons/logo.svg" : "/icons/d-logo.svg"
                }
                alt="Badran Hospital Logo"
                width={64}
                height={64}
                className="h-12 md:h-20 w-auto"
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
                className={` text-sm md:text-md xl:text-lg font-semibold transition-colors whitespace-nowrap text-ellipsis ${
                  isScrolled
                    ? "text-white hover:text-white/80"
                    : " text-[#274760] hover:text-[#0066A2]/80"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Language Selector - Desktop */}
          <Link
            href={getLocalizedPath(lang === "en" ? "ar" : "en")}
            className={`hidden lg:flex items-center gap-2  ${
              isScrolled
                ? "text-white hover:text-white/80"
                : " text-[#274760] hover:text-[#0066A2]/80"
            }`}
          >
            <span className="text-sm font-medium">{dict.language}</span>
          </Link>

          {/* Mobile Actions */}
          <div className="flex items-center gap-4 lg:hidden">
            {/* Mobile Language Switcher */}
            <Link
              href={getLocalizedPath(lang === "en" ? "ar" : "en")}
              className={`text-sm font-bold transition-colors ${
                isScrolled || isOpen
                  ? "text-white hover:text-white/80"
                  : "text-[#274760] hover:text-[#0066A2]/80"
              }`}
            >
              {lang === "en" ? "AR" : "EN"}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 transition-colors ${
                isScrolled || isOpen ? "text-white" : "text-[#274760]"
              }`}
              aria-label="Toggle menu"
            >
              {isOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      {isOpen && (
        <div className="lg:hidden fixed inset-0 z-40 bg-[#0E7C7B] animate-in fade-in slide-in-from-top-5 duration-300">
          <div className="flex flex-col h-dvh pt-24 pb-8 overflow-y-auto">
            <nav className="container mx-auto px-4 flex flex-col gap-6 items-center justify-start flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="text-white text-2xl font-bold py-2 hover:text-white/80 transition-colors transform hover:scale-105 text-center"
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          </div>
        </div>
      )}
    </header>
  );
}
