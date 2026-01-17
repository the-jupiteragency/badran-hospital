"use client";

import React from "react";
import Image from "next/image";
import { SideBar } from "./side-bar";
import { motion } from "framer-motion";

interface SpecialtiesSecProps {
  dict: any;
  lang: string;
}

const servicesIcons = {
  cardiology: [
    "/coe/icon-1.svg",
    "/coe/icon-2.svg",
    "/coe/icon-3.svg",
    "/coe/icon-4.svg",
    "/coe/icon-5.svg",
    "/coe/icon-6.svg",
    "/coe/icon-7.svg",
    "/coe/icon-8.svg",
    "/coe/icon-9.svg",
  ],
  oncology: [
    "/coe/icon-10.svg",
    "/coe/icon-11.svg",
    "/coe/icon-12.svg",
    "/coe/icon-13.svg",
    "/coe/icon-14.svg",
    "/coe/icon-15.svg",
    "/coe/icon-16.svg",
    "/coe/icon-17.svg",
    "/coe/icon-18.svg",
  ],
  gastroenterology: [
    "/coe/icon-19.svg",
    "/coe/icon-20.svg",
    "/coe/icon-21.svg",
    "/coe/icon-22.svg",
    "/coe/icon-23.svg",
    "/coe/icon-24.svg",
    "/coe/icon-25.svg",
    "/coe/icon-26.svg",
  ],
  generalSurgery: [
    "/coe/icon-27.svg",
    "/coe/icon-28.svg",
    "/coe/icon-29.svg",
    "/coe/icon-30.svg",
    "/coe/icon-31.svg",
    "/coe/icon-32.svg",
  ],
  oneDaySurgery: [
    "/coe/icon-33.svg",
    "/coe/icon-34.svg",
    "/coe/icon-35.svg",
    "/coe/icon-36.svg",
    "/coe/icon-37.svg",
    "/coe/icon-38.svg",
  ],
};

export const SpecialtiesSec = ({ dict, lang }: SpecialtiesSecProps) => {
  const [activeSpecialty, setActiveSpecialty] = React.useState("cardiology");
  const [isManualScrolling, setIsManualScrolling] = React.useState(false);
  const scrollTimeoutRef = React.useRef<NodeJS.Timeout | null>(null);

  const specialtiesList = [
    { key: "cardiology", title: dict.coe.specialties.cardiology.title },
    { key: "oncology", title: dict.coe.specialties.oncology.title },
    {
      key: "gastroenterology",
      title: dict.coe.specialties.gastroenterology.title,
    },
    { key: "generalSurgery", title: dict.coe.specialties.generalSurgery.title },
    { key: "oneDaySurgery", title: dict.coe.specialties.oneDaySurgery.title },
  ];

  const handleScrollTo = React.useCallback((key: string) => {
    // Clear any pending timeout
    if (scrollTimeoutRef.current) {
      clearTimeout(scrollTimeoutRef.current);
    }

    setIsManualScrolling(true);
    setActiveSpecialty(key);

    const element = document.getElementById(key);
    if (element) {
      // Calculate precise offset based on viewport
      const isMobile = window.innerWidth < 768;
      // Desktop: account for header (~80px) + margin (~40px) = 120px
      // Mobile: account for header only (~80px) + small margin (~40px) = 120px
      const yOffset = -120;

      const y =
        element.getBoundingClientRect().top + window.pageYOffset + yOffset;

      window.scrollTo({ top: y, behavior: "smooth" });

      // Debounced unlock - detect when scroll actually stops
      const detectScrollEnd = () => {
        if (scrollTimeoutRef.current) {
          clearTimeout(scrollTimeoutRef.current);
        }

        scrollTimeoutRef.current = setTimeout(() => {
          setIsManualScrolling(false);
        }, 150);
      };

      // Listen for scroll events to detect completion
      const onScroll = () => {
        detectScrollEnd();
      };

      window.addEventListener("scroll", onScroll, { passive: true });

      // Cleanup and fallback timeout
      setTimeout(() => {
        window.removeEventListener("scroll", onScroll);
        setIsManualScrolling(false);
      }, 1500);
    }
  }, []);

  // Handle hash navigation on page load
  React.useEffect(() => {
    // Check if there's a hash in the URL
    const hash = window.location.hash.substring(1); // Remove the '#'

    if (hash && specialtiesList.some((spec) => spec.key === hash)) {
      // Small delay to ensure the page has rendered
      setTimeout(() => {
        handleScrollTo(hash);
      }, 300);
    }
  }, [handleScrollTo, specialtiesList]);

  return (
    <section className="py-12 md:py-24 bg-linear-to-b from-[#EAF6F8] to-[#F1F8F9] min-h-screen">
      <div className="container mx-auto px-4 md:px-12 max-w-[1400px]">
        <div className="flex flex-col md:flex-row gap-12 md:gap-24 items-start relative">
          {/* Side Bar - Sticky */}
          <div className="hidden md:block md:w-64 shrink-0 sticky top-0 md:top-32 z-40 bg-[#EAF6F8]/95 backdrop-blur-sm md:backdrop-blur-none md:bg-transparent py-4 md:py-0 transition-all shadow-sm md:shadow-none">
            <SideBar
              specialties={specialtiesList}
              activeSpecialty={activeSpecialty}
              setActiveSpecialty={handleScrollTo}
              lang={lang}
            />
          </div>

          {/* Content Area */}
          <div className="flex-1 w-full min-w-0">
            {specialtiesList.map((spec, sectionIndex) => {
              const itemsKey =
                spec.key === "oncology"
                  ? "oncology"
                  : spec.key === "gastroenterology"
                  ? "gastroenterology"
                  : spec.key === "generalSurgery"
                  ? "generalSurgery"
                  : spec.key === "oneDaySurgery"
                  ? "oneDaySurgery"
                  : spec.key === "cardiology"
                  ? "cardiology"
                  : "cardiology";
              const icons = (servicesIcons as any)[itemsKey] || [];

              // Fallback icons if specific set not defined but needed for visual placeholder
              const displayIcons =
                icons.length > 0 ? icons : servicesIcons.cardiology;

              const activeData =
                dict.coe.specialties[
                  spec.key as keyof typeof dict.coe.specialties
                ];
              const services = activeData.services || [];

              return (
                <motion.div
                  key={spec.key}
                  id={spec.key}
                  initial={{ opacity: 1, y: 0 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: false, amount: 0.3, margin: "-20%" }}
                  transition={{ duration: 0.6 }}
                  className="scroll-mt-36 border-b m-3 mb-7 m:mb-10 border-gray-300 last:border-0"
                  onViewportEnter={() => {
                    if (!isManualScrolling) {
                      setActiveSpecialty(spec.key);
                    }
                  }}
                >
                  <div className="space-y-8 md:space-y-10 pb-16 md:pb-24 relative">
                    {/* Text Content */}
                    <div className="max-w-4xl space-y-8">
                      {/* Title */}
                      <h2 className="text-xl md:text-2xl font-bold text-[#0F3556] leading-tight md:leading-snug">
                        {activeData.description}
                      </h2>

                      {/* Paragragh */}
                      {activeData.subDescription && (
                        <p className="text-base md:text-lg font-mono text-[#324B62] leading-snug">
                          {activeData.subDescription}
                        </p>
                      )}
                    </div>

                    {/* Services Grid */}
                    {services.length > 0 && (
                      <div className="space-y-8 pt-4">
                        <h3 className="text-lg md:text-xl font-bold text-[#0F3556]">
                          {activeData.servicesTitle || "Our Services:"}
                        </h3>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-x-12 md:gap-x-1 gap-y-10 md:gap-y-12">
                          {services.map((service: string, index: number) => (
                            <div
                              key={index}
                              className="flex flex-col items-start gap-4 group"
                            >
                              {/* Icon - No box, just the icon content */}
                              <div className="relative shrink-0 w-10 h-10 flex items-center justify-start">
                                {displayIcons[index % displayIcons.length] && (
                                  <Image
                                    src={
                                      displayIcons[index % displayIcons.length]
                                    }
                                    alt="icon"
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-contain"
                                  />
                                )}
                              </div>

                              {/* Service Title */}
                              <p
                                className="text-[#0F3556] text-base md:text-[17px] font-mono leading-snug max-w-[120px] md:max-w-[200px]"
                                dangerouslySetInnerHTML={{ __html: service }}
                              />
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Empty State */}
                    {services.length === 0 && (
                      <div className="py-12 text-gray-400 italic">
                        Content for {activeData.title} is coming soon.
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
