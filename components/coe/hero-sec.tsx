"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Locale } from "@/app/dictionaries";

interface HeroSecProps {
  dict: any;
  lang: Locale;
}

export const HeroSec = ({ dict, lang }: HeroSecProps) => {
  const isRtl = lang === "ar";

  const textVariants = {
    hidden: { opacity: 0, x: isRtl ? 50 : -50 },
    visible: { opacity: 1, x: 0 },
  };

  const imageVariants = {
    hidden: { opacity: 0, x: isRtl ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section className="relative w-full overflow-hidden bg-linear-to-br from-[#E6F7F8] via-[#F0F9FF] to-[#EFF8FF] pt-12 md:pt-16 lg:pt-24">
      {/* Background Blobs for Atmosphere */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-[#147072]/5 rounded-full blur-3xl" />
      <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-[#B8DDE1]/10 rounded-full blur-3xl" />

      <div className="container relative z-10 mx-auto px-6">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center lg:justify-between lg:gap-12">
          {/* Text Content */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={textVariants}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex max-w-2xl order-2 lg:order-1 flex-col text-start"
          >
            <h2 className="text-md font-mono text-[#388AA3] md:text-lg pb-3">
              {dict.subtitle}
            </h2>
            <h1 className="text-4xl font-medium text-[#063458] md:text-4xl lg:text-5xl pb-6">
              {dict.title}
            </h1>
            <p className="max-w-lg md:text-justify text-md font-mono leading-relaxed text-[#063458] md:text-lg pb-3">
              {dict.description}
            </p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="py-3"
            >
              <p className="text-md md:text-lg font-mono text-[#063458]">
                {dict.overview}
              </p>
            </motion.div>
          </motion.div>

          {/* Doctors Image */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={imageVariants}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="relative order-1 lg:order-2 mx-auto mt-8 w-full max-w-md overflow-hidden lg:overflow-visible lg:mt-0 lg:max-w-xl"
          >
            {/* Design Circle Behind Doctors */}
            <div className="absolute left-1/2 -z-10 -translate-x-1/2 bg-[#307BC4]/10 rounded-full w-full aspect-square -bottom-16 lg:top-3/4 lg:bottom-auto lg:-translate-y-1/2" />

            <div className="relative aspect-square w-full ">
              <Image
                src="/coe/doctors-hero.webp"
                alt="Badran Hospital Doctors"
                fill
                className="object-contain"
                priority
              />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
