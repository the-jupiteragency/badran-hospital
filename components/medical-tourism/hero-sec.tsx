import Image from "next/image";

type HeroDict = {
  title: string;
  subtitle: string;
};

export function HeroSec({ dict, lang }: { dict: HeroDict; lang: string }) {
  return (
    <section className="relative w-full min-h-[64vh] flex flex-col lg:flex-row items-center overflow-hidden bg-linear-to-r from-[#D2EAEF] to-[#86BBF1] pt-20 md:pt-24 mt-12 md:mt-20">
      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div
          className={`flex flex-col items-center gap-12 lg:gap-0 ${
            lang === "ar" ? "lg:flex-row" : "lg:flex-row"
          }`}
        >
          {/* Text Content */}
          <div
            className={"w-full lg:w-2/3 flex flex-col gap-8 z-10 items-start"}
          >
            <div
              className={`space-y-8 w-full md:w-2/3 ${
                lang === "ar" ? "text-right" : "text-left"
              }`}
            >
              <h1 className="text-[#063458] text-4xl md:text-5xl lg:text-6xl font-medium m:pb-2">
                {dict.title}
              </h1>
              <span className="text-[#063458] font-mono block md:text-xl leading-tight">
                {dict.subtitle}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image - Absolute Positioned for Melt Effect */}
      <div
        className={`relative w-full mt-8 lg:mt-0 lg:absolute lg:top-0 lg:w-[58%] lg:h-full ${
          lang === "ar" ? "lg:left-0" : "lg:right-0"
        }`}
      >
        <div
          className={`relative w-full h-[50vh] lg:h-full mask-[linear-gradient(to_bottom,transparent,black_20%)] [-webkit-mask-image:linear-gradient(to_bottom,transparent,black_20%)] ${
            lang === "ar"
              ? "lg:mask-[linear-gradient(to_left,transparent_0%,black_30%)] lg:[-webkit-mask-image:linear-gradient(to_left,transparent_0%,black_30%)]"
              : "lg:mask-[linear-gradient(to_right,transparent_0%,black_30%)] lg:[-webkit-mask-image:linear-gradient(to_right,transparent_0%,black_30%)]"
          }`}
        >
          <Image
            src="/MT-image-hero.webp"
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
