import Image from "next/image";

type JourneyDict = {
  subtitle: string;
  title: string;
  items: {
    founded: { title: string; description: string };
    growth: { title: string; description: string };
    leading: { title: string; description: string };
  };
};

export function OurJourney({
  dict,
  lang,
}: {
  dict: JourneyDict;
  lang: string;
}) {
  return (
    <section className="w-full py-10 lg:py-16 bg-[#DCECF9]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Image Section */}
          <div className="relative w-full aspect-square rounded-2rem overflow-hidden ">
            <Image
              src="/our-journey-img.webp"
              alt="Medical Team"
              fill
              className="object-contain"
            />
          </div>

          {/* Content Section */}
          <div className="flex flex-col ">
            <div>
              <h3 className="text-[#388AA3] font-mono text-lg lg:text-xl mb-2">
                {dict.subtitle}
              </h3>
              <h2 className="text-[#274760] font-medium text-3xl lg:text-5xl mb-4">
                {dict.title}
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {/* Item 1 */}
              <div className="flex gap-2 flex-row">
                <div className="shrink-0 relative w-14 h-14 lg:w-16 lg:h-16">
                  <Image
                    src={
                      lang === "ar"
                        ? "/icons/number-1-ar.svg"
                        : "/icons/number-1.svg"
                    }
                    alt="1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className={lang === "ar" ? "text-right" : "text-left"}>
                  <h4 className="text-[#274760] font-medium text-xl">
                    {dict.items.founded.title}
                  </h4>
                  <p className="text-[#274760] leading-relaxed font-light text-balance">
                    {dict.items.founded.description}
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-2 flex-row">
                <div className="shrink-0 relative w-14 h-14 lg:w-16 lg:h-16">
                  <Image
                    src={
                      lang === "ar"
                        ? "/icons/number-2-ar.svg"
                        : "/icons/number-2.svg"
                    }
                    alt="2"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className={lang === "ar" ? "text-right" : "text-left"}>
                  <h4 className="text-[#274760] font-medium text-xl">
                    {dict.items.growth.title}
                  </h4>
                  <p className="text-[#274760] leading-relaxed font-light text-balance">
                    {dict.items.growth.description}
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-2 flex-row">
                <div className="shrink-0 relative w-14 h-14 lg:w-16 lg:h-16">
                  <Image
                    src={
                      lang === "ar"
                        ? "/icons/number-3-ar.svg"
                        : "/icons/number-3.svg"
                    }
                    alt="3"
                    fill
                    className="object-contain"
                  />
                </div>
                <div className={lang === "ar" ? "text-right" : "text-left"}>
                  <h4 className="text-[#274760] font-medium text-xl">
                    {dict.items.leading.title}
                  </h4>
                  <p className="text-[#274760] leading-relaxed font-light text-balance">
                    {dict.items.leading.description}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
