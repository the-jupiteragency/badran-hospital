"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface SideBarProps {
  specialties: { key: string; title: string }[];
  activeSpecialty: string;
  setActiveSpecialty: (key: string) => void;
  lang: string;
}

export const SideBar = ({
  specialties,
  activeSpecialty,
  setActiveSpecialty,
  lang,
}: SideBarProps) => {
  const scrollContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollContainerRef.current) {
      // Only scroll on mobile where the list is horizontal
      if (window.innerWidth >= 768) return;

      const activeBtn =
        scrollContainerRef.current.querySelector<HTMLButtonElement>(
          `[data-key="${activeSpecialty}"]`,
        );
      if (activeBtn) {
        activeBtn.scrollIntoView({
          behavior: "smooth",
          block: "nearest",
          inline: "center",
        });
      }
    }
  }, [activeSpecialty]);

  return (
    <div className="w-full md:w-72 shrink-0">
      <div
        ref={scrollContainerRef}
        className="flex flex-row md:flex-col overflow-x-auto md:overflow-visible gap-3 md:gap-2 pb-4 md:pb-0 scrollbar-hide md:border-l-[3px] md:border-gray-200/50 md:pl-0 rtl:md:border-l-0 rtl:md:border-r-[3px] rtl:md:pr-0"
      >
        {specialties.map((spec) => (
          <button
            key={spec.key}
            data-key={spec.key}
            onClick={() => setActiveSpecialty(spec.key)}
            className={cn(
              "whitespace-nowrap md:whitespace-normal px-5 py-3 md:py-2 md:px-6 rounded-xl md:rounded-l-none md:rounded-r-md text-sm md:text-2xl md:leading-[1.4] transition-all duration-300 ease-out border border-transparent shrink-0 relative ",
              lang === "ar" ? "text-right" : "text-left",
              "hover:scale-[1.02] active:scale-[0.98]",
              // Mobile Styles
              activeSpecialty === spec.key
                ? "bg-[#065A84] text-white md:bg-transparent md:text-[#065A84] font-extrabold shadow-md md:shadow-none scale-[1.02] md:scale-100"
                : "text-gray-500 bg-white md:bg-transparent md:text-[#065A84] md:opacity-40 md:font-medium hover:bg-gray-50 md:hover:bg-transparent md:hover:opacity-70 hover:text-[#065A84] hover:shadow-sm md:hover:shadow-none",
              // Desktop Active Indicator (Left Border) - with animation
              activeSpecialty === spec.key &&
                "md:before:content-[''] md:before:absolute md:before:left-[-3px] md:before:top-0 md:before:bottom-0 md:before:w-[3px] md:before:bg-[#065A84] md:before:transition-all md:before:duration-300 rtl:md:before:left-auto rtl:md:before:right-[-3px]",
            )}
          >
            {spec.title}
          </button>
        ))}
      </div>
    </div>
  );
};
