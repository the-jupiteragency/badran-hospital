"use client";

import Image from "next/image";
import { motion } from "framer-motion";

interface WeOfferItem {
  title: string;
  description: string;
}

interface WeOfferDict {
  subtitle: string;
  title: string;
  items: {
    costEffective: WeOfferItem;
    noWaiting: WeOfferItem;
    expertDoctors: WeOfferItem;
    primeLocation: WeOfferItem;
  };
}

export function WeOfferSec({
  dict,
  lang,
}: {
  dict: WeOfferDict;
  lang: string;
}) {
  const cards = [
    {
      id: "costEffective",
      icon: "/medical-tourism/icon-1.svg",
    },
    {
      id: "noWaiting",
      icon: "/medical-tourism/icon-2.svg",
    },
    {
      id: "expertDoctors",
      icon: "/medical-tourism/icon-3.svg",
    },
    {
      id: "primeLocation",
      icon: "/medical-tourism/icon-4.svg",
    },
  ] as const;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: lang === "ar" ? -50 : 50 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section
      dir={lang === "ar" ? "rtl" : "ltr"}
      className="py-16 md:py-24 relative overflow-hidden"
      style={{
        background:
          "radial-gradient(circle at center, #E6F3F9 0%, #FFFFFF 100%)",
      }}
    >
      <div className="container mx-auto px-4 md:px-2 relative z-10">
        {/* Header Section */}
        <div className="text-center mb-8 md:mb-12">
          <motion.span
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#388AA3] font-medium text-lg md:text-xl mb-2 block"
          >
            {dict.subtitle}
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-[#274760] text-3xl md:text-5xl lg:text-6xl font-medium  max-w-2xl mx-auto"
          >
            {dict.title}
          </motion.h2>
        </div>

        {/* Cards Section with Horizontal Motion on Mobile */}
        <div className="relative group">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-2 overflow-x-auto md:overflow-visible pb-8 md:pb-0 scrollbar-hide snap-x snap-mandatory -mx-4 px-4 md:mx-0 md:px-0"
          >
            {cards.map((card) => {
              const item = dict.items[card.id];
              return (
                <motion.div
                  key={card.id}
                  variants={itemVariants}
                  className="min-w-[290px] md:min-w-full snap-center bg-[#D1E9F6]/60 backdrop-blur-sm rounded-sm p-6 md:p-8 px-16 flex flex-col  hover:shadow-xl hover:-translate-y-1 transition-all duration-300 border border-white/40"
                >
                  <div className="w-8 h-8 relative shrink-0 mb-4">
                    <Image
                      src={card.icon}
                      alt={item.title}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="flex flex-col gap-4">
                    <h3 className="text-[#274760] text-xl md:text-xl font-extrabold">
                      {item.title}
                    </h3>
                    <p className="text-[#274760] text-base font-mono ">
                      {item.description}
                    </p>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>

      <style jsx global>{`
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </section>
  );
}
