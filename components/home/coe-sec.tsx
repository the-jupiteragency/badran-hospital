"use client";

import { useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

type CoeDict = {
  subtitle: string;
  title: string;
  description: string;
  buttonText: string;
  specialties: {
    cardiology: { title: string; description: string };
    oncology: { title: string; description: string };
    plasticSurgery: { title: string; description: string };
    orthopedics: { title: string; description: string };
    gastroenterology: { title: string; description: string };
  };
};

export function CenterOfExcellence({ dict }: { dict: CoeDict }) {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeCardIndex, setActiveCardIndex] = useState<number | null>(null);

  const specialties = [
    {
      title: dict.specialties.cardiology.title,
      icon: "/icons/icon-3.svg",
      description: dict.specialties.cardiology.description,
    },
    {
      title: dict.specialties.oncology.title,
      icon: "/icons/icon-4.svg",
      description: dict.specialties.oncology.description,
    },
    {
      title: dict.specialties.plasticSurgery.title,
      icon: "/icons/icon-5.svg",
      description: dict.specialties.plasticSurgery.description,
    },
    {
      title: dict.specialties.orthopedics.title,
      icon: "/icons/icon-6.svg",
      description: dict.specialties.orthopedics.description,
    },
    {
      title: dict.specialties.gastroenterology.title,
      icon: "/icons/icon-7.svg",
      description: dict.specialties.gastroenterology.description,
    },
  ];

  return (
    <section
      id="coe"
      className="py-12 md:py-24 bg-linear-to-b from-[#86BBF1]/50 to-[#D2EAEF]/50"
    >
      <div className="container mx-auto px-4 md:px-8">
        {/* Header */}
        <div className="text-center max-w-4xl mx-auto mb-8 md:mb-10">
          <p className="text-[#388AA3] font-medium text-sm md:text-lg mb-3 tracking-wide">
            {dict.subtitle}
          </p>
          <h2 className="text-[#0E2E3B] text-3xl md:text-5xl font-light mb-6">
            {dict.title}
          </h2>
          <p className=" text-sm md:text-lg leading-relaxed max-w-xl font-light mx-auto">
            {dict.description}
          </p>
        </div>

        {/* Desktop Button (Above Cards) */}
        <div className="hidden md:flex justify-center mb-12">
          <Button className="bg-[#0499AB] text-white px-10 py-6 rounded-full text-sm font-bold uppercase tracking-wider shadow-md transition-all hover:-translate-y-0.5">
            {dict.buttonText}
          </Button>
        </div>

        {/* Cards Container */}
        <div
          ref={scrollRef}
          className="flex md:grid md:grid-cols-5 gap-4 md:gap-5 overflow-x-auto pb-6 md:pb-0 snap-x snap-mandatory scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {specialties.map((specialty, index) => {
            const isActive = activeCardIndex === index;
            return (
              <Card
                key={specialty.title}
                onClick={() =>
                  setActiveCardIndex(index === activeCardIndex ? null : index)
                }
                onMouseLeave={() => setActiveCardIndex(null)}
                className="shrink-0 w-[200px] md:w-auto snap-center group relative aspect-4/5 rounded-2xl overflow-hidden cursor-pointer transition-all duration-500 ease-in-out border-0 p-0 shadow-none select-none"
              >
                {/* Background & Base Color */}
                <div
                  className={`absolute inset-0 bg-[#007F80] transition-colors duration-500 ease-in-out md:group-hover:bg-[#005C5D] group-active:bg-[#005C5D] ${
                    isActive ? "bg-[#005C5D]" : ""
                  }`}
                />

                {/* Default State Content */}
                <div
                  className={`absolute inset-0 p-6 md:p-4 flex flex-col justify-between transition-opacity duration-500 ease-in-out md:group-hover:opacity-0 group-active:opacity-0 ${
                    isActive ? "opacity-0" : ""
                  }`}
                >
                  {/* Icon Top Left */}
                  <div>
                    <img
                      src={specialty.icon}
                      alt={specialty.title}
                      className="w-16 h-16 md:w-20 md:h-20 brightness-0 invert pointer-events-none"
                    />
                  </div>
                  {/* Title Bottom Left */}
                  <h3 className="text-white font-bold text-sm md:text-lg xl:text-xl whitespace-nowrap text-ellipsis">
                    {specialty.title}
                  </h3>
                </div>

                {/* Hover State Content */}
                <div
                  className={`absolute inset-0 p-6 md:p-4 flex flex-col transition-opacity duration-500 ease-in-out opacity-0 md:group-hover:opacity-100 group-active:opacity-100 ${
                    isActive ? "opacity-100" : ""
                  }`}
                >
                  {/* Watermark Icon */}
                  <div className="absolute right-[1%] bottom-[1%] opacity-10 pointer-events-none transform  scale-120">
                    <img
                      src={specialty.icon}
                      alt="icon"
                      className="w-64 h-64 brightness-0 invert"
                    />
                  </div>

                  {/* Header Row: Title + Arrow */}
                  <div className="flex justify-between items-start w-full mb-auto relative z-10">
                    <h3 className="text-white font-bold text-md md:text-lg xl:text-xl">
                      {specialty.title}
                    </h3>
                  </div>

                  {/* Description Bottom */}
                  <p className="text-white text-sm md:text-md xl:text-lg leading-relaxed font-medium relative z-10">
                    {specialty.description}
                  </p>
                </div>
              </Card>
            );
          })}
        </div>

        {/* Mobile Button (Below Cards) */}
        <div className="flex md:hidden justify-center mt-8">
          <Button className="w-full bg-[#0499AB] text-white py-6 rounded-full text-sm font-bold uppercase tracking-wider shadow-md">
            {dict.buttonText}
          </Button>
        </div>
      </div>
    </section>
  );
}
