"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface HealthStepSecProps {
  dict: {
    subtitle: string;
    title: string;
    items: {
      step1: Item;
      step2: Item;
      step3: Item;
      step4: Item;
      step5: Item;
    };
  };
  lang: string;
}

interface Item {
  title: string;
  description: string;
}

export const HealthStepSec = ({ dict, lang }: HealthStepSecProps) => {
  const isAr = lang === "ar";
  const steps = [
    { id: 1, key: "step1" as const },
    { id: 2, key: "step2" as const },
    { id: 3, key: "step3" as const },
    { id: 4, key: "step4" as const },
    { id: 5, key: "step5" as const },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const lineVariants = {
    hidden: { width: 0 },
    visible: {
      width: "100%",
      transition: {
        duration: 1.5,
        ease: "easeInOut" as const,
        delay: 0.5,
      },
    },
  };

  return (
    <section
      className="py-8 md:py-12 overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, #E6F3F9 0%, #FFFFFF 100%)",
      }}
    >
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-16 space-y-4">
          <span className="text-[#388AA3] font-medium tracking-wide uppercase text-sm md:text-base">
            {dict.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-medium  max-w-2xl mx-auto text-[#274760]">
            {dict.title}
          </h2>
        </div>

        {/* Desktop View */}
        <div className="hidden lg:block relative">
          <motion.div
            className="grid grid-cols-5 gap-2 relative"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {/* Connection Line Container */}
            <div
              className={cn(
                "absolute top-[30px] h-full pointer-events-none z-0",
                isAr
                  ? "right-[48px] left-[calc(20%-48px)]"
                  : "left-[70px] right-[calc(20%-48px)]"
              )}
            >
              {/* Animated Line */}
              <motion.div
                variants={lineVariants}
                className={cn(
                  "absolute top-0 h-[2px] bg-[#0499AB]",
                  isAr ? "right-0" : "left-0"
                )}
              />
            </div>

            {steps.map((step, index) => {
              const item = dict.items[step.key];

              return (
                <motion.div
                  key={step.id}
                  variants={itemVariants}
                  className="relative flex flex-col py-20 px-10  bg-[#D1E9F6]/60 rounded-lg group hover:bg-[#D5EBF0]/50 transition-colors duration-300"
                >
                  {/* Number Icon */}
                  <div
                    className={cn(
                      "absolute top-2 w-[64px] h-[64px] z-10 ",
                      isAr ? "right-4" : "left-4"
                    )}
                  >
                    <Image
                      src={`/medical-tourism/number-${step.id}${
                        isAr ? "-ar" : ""
                      }.svg`}
                      alt={`Step ${step.id}`}
                      width={64}
                      height={64}
                      className="w-[64px] h-[64px]"
                    />
                  </div>

                  {/* Content */}
                  <div className="space-y-2 ">
                    <h3 className="text-lg font-extrabold text-[#274760] ">
                      {item.title}
                    </h3>
                    <p className="text-[#274760] text-sm leading-relaxed text-balance ">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>

        {/* Mobile View */}
        <div className="lg:hidden flex flex-col gap-6">
          {steps.map((step, index) => {
            const item = dict.items[step.key];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: isAr ? 20 : -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="flex items-start gap-2"
              >
                <div className="shrink-0">
                  <Image
                    src={`/medical-tourism/number-${step.id}${
                      isAr ? "-ar" : ""
                    }.svg`}
                    alt={`Step ${step.id}`}
                    width={64}
                    height={64}
                    className="w-16 h-16 drop-shadow-md"
                  />
                </div>
                <div className="pt-2">
                  <h3 className="text-lg font-bold text-[#1A2B4B] mb-2">
                    {item.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
