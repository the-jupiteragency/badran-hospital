import Image from "next/image";

export function OurJourney() {
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
                Our Journey
              </h3>
              <h2 className="text-[#274760] font-medium text-3xl lg:text-5xl mb-4">
                45 Years of Trust & Care
              </h2>
            </div>

            <div className="flex flex-col gap-8">
              {/* Item 1 */}
              <div className="flex gap-2 items-start">
                <div className="shrink-0 relative w-14 h-14 lg:w-16 lg:h-16">
                  <Image
                    src="/icons/number-1.svg"
                    alt="1"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-[#274760] font-medium text-xl">
                    Founded in 1979
                  </h4>
                  <p className="text-[#274760] leading-relaxed font-light text-balance md:text-left">
                    Established as a private multi-specialty hospital to meet
                    the essential medical needs of the Dokki community.
                  </p>
                </div>
              </div>

              {/* Item 2 */}
              <div className="flex gap-2 items-start">
                <div className="shrink-0 relative w-14 h-14 lg:w-16 lg:h-16">
                  <Image
                    src="/icons/number-2.svg"
                    alt="2"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-[#274760] font-medium text-xl">
                    Continuous Growth
                  </h4>
                  <p className="text-[#335575] leading-relaxed text-balance md:text-left">
                    Expanded services, upgraded technologies, and developed new
                    departments while maintaining our core values.
                  </p>
                </div>
              </div>

              {/* Item 3 */}
              <div className="flex gap-2 items-start">
                <div className="shrink-0 relative w-14 h-14 lg:w-16 lg:h-16">
                  <Image
                    src="/icons/number-3.svg"
                    alt="3"
                    fill
                    className="object-contain"
                  />
                </div>
                <div>
                  <h4 className="text-[#274760] font-medium text-xl">
                    Leading Institution Today
                  </h4>
                  <p className="text-[#274760] leading-relaxed font-light text-balance md:text-left">
                    One of the most recognized medical institutions offering
                    complete continuum of care with advanced diagnostics and
                    specialized clinics.
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
