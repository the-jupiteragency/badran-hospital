"use client";

import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { ArrowLeft, ArrowRight } from "lucide-react";

export interface CarouselPost {
  id: number;
  title: string;
  specialties: string | null | undefined;
  kind: string | null | undefined;
  imageUrl: string;
  date: string;
  href: string;
}

export function HealthHubCarousel({
  posts,
  dict,
  lang,
}: {
  posts: CarouselPost[];
  dict: { learnMore: string };
  lang: string;
}) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (scrollRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
      const maxScroll = scrollWidth - clientWidth;

      if (lang === "ar") {
        const isAtStart = Math.abs(scrollLeft) < 10;
        const isAtEnd = Math.abs(scrollLeft) >= maxScroll - 10;
        setCanScrollRight(!isAtStart);
        setCanScrollLeft(!isAtEnd);
      } else {
        const isAtStart = scrollLeft < 10;
        const isAtEnd = scrollLeft >= maxScroll - 10;
        setCanScrollLeft(!isAtStart);
        setCanScrollRight(!isAtEnd);
      }
    }
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, [lang]);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const clientWidth = scrollRef.current.clientWidth;
      const scrollAmount = clientWidth * 0.8;
      const delta = direction === "left" ? -scrollAmount : scrollAmount;
      scrollRef.current.scrollBy({
        left: delta,
        behavior: "smooth",
      });
      // We also update state after scrolling finishes
      setTimeout(checkScroll, 350);
    }
  };

  return (
    <div className="flex flex-col">
      <div className="relative">
        <div
          ref={scrollRef}
          onScroll={checkScroll}
          className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:gap-6 md:pb-6"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {posts.map((post) => (
            <Card
              key={post.id}
              className="shrink-0 w-[85vw] sm:w-[340px] snap-center p-0 gap-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border-none"
            >
              {/* Image */}
              <div className="relative h-[200px] md:h-[220px] overflow-hidden bg-gray-100">
                <Image
                  src={post.imageUrl || "/health-hub/post-1.webp"}
                  alt={post.title}
                  fill
                  sizes="(max-width: 640px) 85vw, 340px"
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                  priority={false}
                />
                {/* Category Badge */}
                {post.specialties && (
                  <div className="absolute bottom-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#388AA3] capitalize">
                    {post.specialties}
                  </div>
                )}
                {/* Kind Badge */}
                {post.kind && (
                  <div className="absolute top-4 right-4 bg-[#0FA5A1]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white uppercase">
                    {post.kind.toUpperCase()}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4 md:p-5 flex flex-col grow">
                {/* Date */}
                <span className="text-[#6B8D96] text-xs md:text-sm mb-3 block">
                  {post.date}
                </span>

                {/* Title */}
                <h3 className="text-[#12323A] font-semibold text-lg leading-tight mb-3 line-clamp-2 hover:text-[#0FA5A1] transition-colors">
                  <Link href={post.href}>{post.title}</Link>
                </h3>

                {/* Learn More */}
                <div className="mt-auto pt-2">
                  <Link
                    href={post.href}
                    className="text-[#12323A] text-sm font-medium underline hover:text-[#0FA5A1] transition-colors inline-flex items-center gap-1"
                  >
                    {dict.learnMore}
                  </Link>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="flex justify-center items-center gap-4 mt-2">
        <button
          onClick={() => scroll("left")}
          disabled={!canScrollLeft}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            canScrollLeft
              ? "bg-[#388AA3] text-white hover:bg-[#2B6A7D] hover:scale-105 cursor-pointer shadow-md"
              : "bg-[#B3CBCF] text-white/90 cursor-not-allowed opacity-80"
          }`}
          aria-label="Scroll left"
        >
          {lang === "ar" ? (
            <ArrowRight className="w-6 h-6" />
          ) : (
            <ArrowLeft className="w-6 h-6" />
          )}
        </button>
        <button
          onClick={() => scroll("right")}
          disabled={!canScrollRight}
          className={`w-12 h-12 rounded-full flex items-center justify-center transition-all ${
            canScrollRight
              ? "bg-[#388AA3] text-white hover:bg-[#2B6A7D] hover:scale-105 cursor-pointer shadow-md"
              : "bg-[#B3CBCF] text-white/90 cursor-not-allowed opacity-80"
          }`}
          aria-label="Scroll right"
        >
          {lang === "ar" ? (
            <ArrowLeft className="w-6 h-6" />
          ) : (
            <ArrowRight className="w-6 h-6" />
          )}
        </button>
      </div>
    </div>
  );
}
