"use client"

import Image from "next/image"
import Link from "next/link"

interface ContactButtonProps {
  className?: string
}

export function ContactButton({ className }: ContactButtonProps) {
  return (
    <button
      className={`flex items-center justify-center bg-white rounded-full p-3 shadow-lg hover:scale-110 transition-transform duration-300 ${className}`}
      aria-label="Chat with AI Assistant"
      onClick={() => alert("Chatbot feature coming soon!")}
    >
      <Image
        src="/icons/chat.svg" // Using generic icon or specific chatbot icon if available. I'll assume standard chat icon or reuse one.
        alt="Chatbot"
        width={52}
        height={52}
      />
    </button>
  )
}
