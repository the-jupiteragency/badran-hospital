import Image from "next/image";

const stats = [
  {
    title: "ISO Certified",
    subtitle: "Medical Excellence",
  },
  {
    title: "45+",
    subtitle: "Years",
  },
  {
    title: "15+",
    subtitle: "Specialities",
  },
  {
    title: "24/7",
    subtitle: "Care",
  },
];

export function HeroSec() {
  return (
    <section className="relative w-full min-h-[85vh] flex flex-col lg:flex-row items-center overflow-hidden bg-linear-to-r from-[#D2EAEF] to-[#86BBF1] pt-20 md:pt-24 mt-12 md:mt-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-0">
          {/* Text Content */}
          <div className="w-full lg:w-2/3 flex flex-col gap-8 z-10">
            <div className="space-y-4">
              <span className="text-[#388AA3] font-mono hidden md:block md:text-xl tracking-wide ">
                Where expertise meets advanced care.
              </span>
              <h1 className="text-[#063458] text-4xl md:text-5xl lg:text-6xl font-medium">
                Excellence of Healthcare
              </h1>
              <p className="text-[#063458] text-lg md:text-xl max-w-lg text-balance">
                Badran Hospital delivers trusted medical care with clinical
                excellence and personalized attention in the heart of Dokki,
                Cairo.
              </p>
            </div>

            {/* Stats Pills */}
            <div className="flex flex-wrap gap-2 md:gap-4 mt-2 w-[350px] lg:w-auto">
              {stats.map((stat, index) => (
                <div
                  key={index}
                  className="bg-white rounded-full p-2 pr-4 md:pr-6 shadow-sm flex items-center gap-2 md:gap-3 w-fit transition-transform hover:scale-105 duration-300"
                >
                  <div className="shrink-0 flex items-center justify-center w-8 h-8 md:w-12 md:h-12">
                    <Image
                      src="/icons/check.svg"
                      alt="Check"
                      width={48}
                      height={48}
                      className="w-full h-full"
                    />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-[#0066A2] font-extrabold text-sm md:text-lg leading-none">
                      {stat.title}
                    </span>
                    <span className="text-[#0066A2] text-[10px] md:text-sm font-medium tracking-tight whitespace-nowrap mt-0.5">
                      {stat.subtitle}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image - Absolute Positioned for Melt Effect */}
      <div className="relative w-full lg:absolute lg:right-0 lg:top-0 lg:w-[55%] lg:h-full mt-8 lg:mt-0">
        <div className="relative w-full h-[50vh] lg:h-full mask-[linear-gradient(to_bottom,transparent,black_20%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%)] lg:mask-[linear-gradient(to_right,transparent_0%,black_30%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_30%)]">
          <Image
            src="/about-hero-img.webp"
            alt="Doctor comforting a child patient"
            fill
            className="object-cover object-center"
            priority
          />
        </div>
      </div>
    </section>
  );
}
