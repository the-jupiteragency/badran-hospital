"use client"

import { useState, useRef } from "react"
import { ChevronLeft, ChevronRight, Instagram, Facebook, Twitter } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Card } from "@/components/ui/card"

const blogPosts = [
  {
    id: 1,
    title: "Why Surgeries will be Different in the Future",
    date: "May 1, 2024",
    image: "/health-hub/post-1.webp",
    category: "Surgery",
  },
  {
    id: 2,
    title: "Healthy Eating on a Budget: Tips and Strategies",
    date: "August 5, 2024",
    image: "/health-hub/post-2.webp",
    category: "Nutrition",
  },
  {
    id: 3,
    title: "The Importance of Regular Cancer Screenings and Early Detection",
    date: "August 24, 2024",
    image: "/health-hub/post-3.webp",
    category: "Oncology",
  },
  {
    id: 4,
    title: "Heart Health: Prevention Tips for a Stronger Heart",
    date: "September 10, 2024",
    image: "/health-hub/post-4.webp",
    category: "Cardiology",
  },
]

export function HealthHub() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const scrollRef = useRef<HTMLDivElement>(null)

  const scrollToIndex = (index: number) => {
    const newIndex = Math.max(0, Math.min(index, blogPosts.length - 1))
    setCurrentIndex(newIndex)
    if (scrollRef.current) {
      // Calculate scroll amount based on card width + gap
      const firstCard = scrollRef.current.firstElementChild as HTMLElement
      const cardWidth = firstCard ? firstCard.offsetWidth + 16 : 0 // 16px gap (approx)
      
      scrollRef.current.scrollTo({
        left: cardWidth * newIndex, 
        behavior: "smooth",
      })
    }
  }

  return (
    <section className="py-12 md:py-20  bg-linear-to-b from-[#86BBF1]/50 to-[#D2EAEF]/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col  mb-8 md:mb-10 relative">
           <div className="text-center md:text-start">
            <p className="text-[#388AA3] font-medium text-md mb-2">Read the latest</p>
            <h2 className="text-[#12323A] text-4xl md:text-3xl lg:text-4xl">Health Hub</h2>
          </div>
          
          <Link
            href="/health-hub"
            className="hidden md:flex absolute right-0 bottom-0 items-center gap-1 text-[#12323A] font-medium hover:text-[#0FA5A1] transition-colors"
          >
            View all
            <ChevronRight className="w-5 h-5" />
          </Link>
        </div>

        {/* Content Container */}
        <div className="relative">
          <div
            ref={scrollRef}
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide md:gap-6 md:pb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {blogPosts.map((post) => (
              <Card
                key={post.id}
                className="shrink-0 w-[85vw] sm:w-[340px] snap-center p-0 gap-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border-none"
              >
                {/* Image */}
                <div className="relative h-[200px] md:h-[220px] overflow-hidden">
                  <Image
                    src={post.image || "/placeholder.svg"}
                    alt={post.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm params-2 px-3 py-1 rounded-full text-xs font-semibold text-[#388AA3]">
                    {post.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-4 md:p-5 flex flex-col grow">
                  {/* Date and Social Icons */}
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[#6B8D96] text-xs md:text-sm">{post.date}</span>
                    <div className="flex items-center gap-2">
                       <div className="flex gap-2">
                          <Link href="#" className="text-[#6B8D96] hover:text-[#0FA5A1]"><Instagram className="w-4 h-4" /></Link>
                          <Link href="#" className="text-[#6B8D96] hover:text-[#0FA5A1]"><Facebook className="w-4 h-4" /></Link>
                          <Link href="#" className="text-[#6B8D96] hover:text-[#0FA5A1]"><Twitter className="w-4 h-4" /></Link>
                       </div>
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="text-[#12323A] font-semibold text-lg leading-tight mb-3 line-clamp-2 hover:text-[#0FA5A1] transition-colors">
                    <Link href={`/health-hub/${post.id}`}>
                        {post.title}
                    </Link>
                  </h3>
                  
                  {/* Learn More */}
                  <div className="mt-auto pt-2">
                     <Link
                        href={`/health-hub/${post.id}`}
                        className="text-[#12323A] text-sm font-medium underline hover:text-[#0FA5A1] transition-colors inline-flex items-center gap-1"
                      >
                        Learn more
                     </Link>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Navigation Arrows (Visible Desktop & Mobile) */}
        <div className="hidden md:flex justify-center gap-3 mt-6">
          <button
            onClick={() => scrollToIndex(currentIndex - 1)}
            disabled={currentIndex === 0}
            className="w-12 h-12 rounded-full bg-[#E5F5F4] text-[#0FA5A1] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0FA5A1] hover:text-white transition-colors"
            aria-label="Previous"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={() => scrollToIndex(currentIndex + 1)}
            disabled={currentIndex >= blogPosts.length - 1}
            className="w-12 h-12 rounded-full bg-[#E5F5F4] text-[#0FA5A1] flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-[#0FA5A1] hover:text-white transition-colors"
            aria-label="Next"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

      </div>
    </section>
  )
}
