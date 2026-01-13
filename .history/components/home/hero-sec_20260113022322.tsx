import HeroVideo from "@/videos/hero-sec.mp4";
import { SearchBar } from "./search-bar";
import BackgroundVideo from "next-video/background-video";

export function HeroSection({ dict, lang }: { dict: { searchPlaceholder: string; bookNow: string; speciality: string; doctor: string }; lang: string }) {
  return (
    <section className="relative min-h-[85vh] md:min-h-screen flex flex-col">
      {/* Background Video/Image */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <BackgroundVideo
          src={HeroVideo}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          controls={false}
        />
        <div className="absolute inset-0 bg-linear-to-b from-[#061F27]/55 via-transparent to-transparent pointer-events-none" />
      </div>

      {/* Content Container - Push search bar to bottom */}
      <div className="relative z-10 flex-1 flex flex-col justify-end container mx-auto px-4 md:px-6 pb-8 md:pb-16 pt-24">
        <div className="w-full max-w-5xl mx-auto">
          <SearchBar dict={dict} lang={lang} />
        </div>
      </div>
    </section>
  )
}
