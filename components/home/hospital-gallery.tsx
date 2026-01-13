"use client"

import * as React from "react"
import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel"
import Autoplay from "embla-carousel-autoplay"
import { cn } from "@/lib/utils"

type GalleryDict = {
  subtitle: string;
  title: string;
};

const galleryImages = [
  { src: "/hospital-gallery/image-1.webp", alt: "Hospital Facility 1" },
  { src: "/hospital-gallery/image-2.webp", alt: "Hospital Facility 2" },
  { src: "/hospital-gallery/image-3.webp", alt: "Hospital Facility 3" },
  { src: "/hospital-gallery/image-4.webp", alt: "Hospital Facility 4" },
  { src: "/hospital-gallery/image-6.webp", alt: "Hospital Facility 6" },
  { src: "/hospital-gallery/image-7.webp", alt: "Hospital Facility 7" },
  { src: "/hospital-gallery/image-8.webp", alt: "Hospital Facility 8" },
  { src: "/hospital-gallery/image-9.webp", alt: "Hospital Facility 9" },
  { src: "/hospital-gallery/image-10.webp", alt: "Hospital Facility 10" },
]

export function HospitalGallery({ dict, lang }: { dict: GalleryDict; lang: string }) {
  const plugin = React.useRef(
    Autoplay({ delay: 2000, stopOnInteraction: true })
  )
  const [api, setApi] = React.useState<CarouselApi>()
  const [current, setCurrent] = React.useState(0)

  React.useEffect(() => {
    if (!api) return

    setCurrent(api.selectedScrollSnap())

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap())
    })
  }, [api])

  const scrollTo = (index: number) => {
    api?.scrollTo(index)
  }

  return (
    <section className="py-9 md:py-20 bg-linear-to-b from-[#E0F7FA] to-[#B2EBF2]">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8 md:mb-12">
          <p className="text-[#388AA3] text-lg font-medium mb-2 uppercase tracking-wide">{dict.subtitle}</p>
          <h2 className="text-3xl md:text-5xl text-[#1A3B5C] text-balance leading-tight tracking-wide ">
            {dict.title}
          </h2>
        </div>

        {/* Main Carousel */}
        <div className="max-w-xl md:max-w-2xl lg:max-w-3xl xl:max-w-4xl 2xl:max-w-5xl mx-auto mb-6">
          <Carousel
            plugins={[plugin.current]}
            setApi={setApi}
            opts={{
              direction: lang === "ar" ? "rtl" : "ltr",
            }}
            className="w-full relative rounded-lg overflow-hidden shadow-2xl"
            onMouseEnter={plugin.current.stop}
            onMouseLeave={plugin.current.reset}
          >
            <CarouselContent>
              {galleryImages.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-4/3 md:aspect-video w-full bg-gray-100">
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            
            {/* Custom Navigation Buttons */}
            <div className="absolute top-1/2 left-4 -translate-y-1/2 z-10 hidden md:block">
              <CarouselPrevious className="relative left-0 top-0 translate-y-0 h-12 w-12 bg-white/90 hover:bg-white text-[#1A3B5C] border-none shadow-lg" />
            </div>
            <div className="absolute top-1/2 right-4 -translate-y-1/2 z-10 hidden md:block">
              <CarouselNext className="relative right-0 top-0 translate-y-0 h-12 w-12 bg-white/90 hover:bg-white text-[#1A3B5C] border-none shadow-lg" />
            </div>

            {/* Mobile Navigation Buttons (visible on small screens) */}
             <div className="absolute top-1/2 w-full flex justify-between px-2 -translate-y-1/2 z-10 md:hidden pointer-events-none">
                 <CarouselPrevious className="pointer-events-auto relative left-0 top-0 translate-y-0 h-10 w-10 bg-white/80 hover:bg-white text-[#1A3B5C] border-none shadow-md" />
                 <CarouselNext className="pointer-events-auto relative right-0 top-0 translate-y-0 h-10 w-10 bg-white/80 hover:bg-white text-[#1A3B5C] border-none shadow-md" />
             </div>
          </Carousel>
        </div>

        {/* Thumbnails */}
        <div className="max-w-4xl xl:max-w-5xl 2xl:max-w-7xl mx-auto overflow-hidden">
          <div className={`flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide py-4 px-0 md:px-0 ${
            lang === "ar" ? "justify-end md:justify-center" : "justify-start md:justify-center"
          }`}>
            {galleryImages.map((image, index) => (
              <button
                key={index}
                onClick={() => scrollTo(index)}
                className={cn(
                  "relative shrink-0 w-24  md:w-32 aspect-square rounded-lg overflow-hidden transition-all duration-300 border-2",
                  index === 0 && lang !== "ar" && "ml-1 md:ml-36",
                  index === 0 && lang === "ar" && "mr-1 md:mr-36",
                  current === index
                    ? "border-[#0097A7] scale-105 shadow-md ring-2 ring-[#0097A7]/20"
                    : "border-transparent opacity-60 hover:opacity-100"
                )}
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 768px) 96px, 128px"
                  className="object-cover"
                />
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
