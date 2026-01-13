"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, MessageSquareText } from "lucide-react";
import { WhatsAppButton } from "./whatsapp-btn";
import { ContactButton } from "./contact-btn";

export function CollapsibleBtn({ lang }: { lang: string }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Handle click outside to close
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={`fixed bottom-6 z-50 flex flex-col gap-3 font-sans ${
        lang === "ar" ? "left-6 items-end" : "right-6 items-end"
      }`}
    >
      {/* Expanded Actions */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 origin-bottom ${
          isOpen
            ? "opacity-100 scale-100 translate-y-0"
            : "opacity-0 scale-95 translate-y-4 pointer-events-none"
        }`}
      >
        <div
          className={`flex items-center gap-2 ${
            lang === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <span className="bg-white/90 text-gray-700 text-xs py-1 px-2 rounded-md shadow-sm">
            WhatsApp
          </span>
          <WhatsAppButton className="shadow-lg rounded-full bg-white p-1" />
        </div>

        <div
          className={`flex items-center gap-2 ${
            lang === "ar" ? "flex-row-reverse" : ""
          }`}
        >
          <span className="bg-white/90 text-gray-700 text-xs py-1 px-2 rounded-md shadow-sm">
            Chatbot
          </span>
          <ContactButton className="w-[52px] h-[52px] p-0!" />
        </div>
      </div>

      {/* Main Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`w-[60px] h-[60px] rounded-full shadow-xl flex items-center justify-center transition-all duration-300 ${
          isOpen ? "bg-red-500 rotate-90" : "bg-[#0FA5A1] hover:scale-105"
        }`}
        aria-label="Toggle Support Menu"
      >
        {isOpen ? (
          <X className="w-8 h-8 text-white" />
        ) : (
          <MessageCircle className="w-8 h-8 text-white" />
        )}
      </button>
    </div>
  );
}
