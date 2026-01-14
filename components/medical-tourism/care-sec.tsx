"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface CareSecProps {
  dict: {
    title: string;
    description: string;
    items: {
      travel: Item;
      accommodation: Item;
      language: Item;
      documentation: Item;
    };
  };
  lang: string;
}

interface Item {
  title: string;
  description: string;
}

export const CareSec = ({ dict, lang }: CareSecProps) => {
  const isAr = lang === "ar";
  const items = [
    { id: 1, key: "travel", icon: "/icons/number-1" },
    { id: 2, key: "accommodation", icon: "/icons/number-2" },
    { id: 3, key: "language", icon: "/icons/number-3" },
    { id: 4, key: "documentation", icon: "/icons/number-4" },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: isAr ? 20 : -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <section className="py-16 md:py-20 bg-[#E2F0F7]/30 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 items-center">
          {/* Content Side */}
          <div
            className={cn("order-2 lg:order-1", isAr ? "lg:pl-10" : "lg:pr-10")}
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="mb-8 text-center lg:text-start md:w-md"
            >
              <h2 className="text-3xl md:text-5xl font-medium text-[#274760] mb-4 leading-tight">
                {dict.title}
              </h2>
              <p className="text-[#274760]/70 text-lg leading-tight max-w-sm mx-auto lg:mx-0 text-justify">
                {dict.description}
              </p>
            </motion.div>

            <motion.div
              className="md:space-y-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              {items.map((item) => {
                const content = dict.items[item.key as keyof typeof dict.items];
                return (
                  <motion.div
                    key={item.id}
                    variants={itemVariants}
                    className="flex items-start gap-2 py-2 md:p-4 md:rounded-full md:bg-white/50 md:hover:bg-white/80 transition-colors duration-300 md:border md:border-white/60 md:shadow-sm"
                  >
                    <div className="shrink-0">
                      <Image
                        src={`${item.icon}${isAr ? "-ar" : ""}.svg`}
                        alt={`Step ${item.id}`}
                        width={48}
                        height={48}
                        className="w-16 h-16 pt-2"
                      />
                    </div>
                    <div className="pt-2">
                      <h3 className="text-lg font-extrabold text-[#274760]">
                        {content.title}
                      </h3>
                      <p className="text-[#274760]/70 text-md leading-tight">
                        {content.description}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </motion.div>
          </div>

          {/* Image Side */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-1 lg:order-2 relative"
          >
            <div className="relative w-full md:aspect-square aspect-4/3 md:rounded-sm rounded-xl overflow-hidden">
              <Image
                src="/MT.webp"
                alt="Medical Tourism Care"
                fill
                className="object-cover"
              />
              {/* Overlay Gradient */}
              <div className="absolute inset-0 bg-linear-to-t from-[#1A2B4B]/20 to-transparent pointer-events-none" />
            </div>
            {/* Decorative Element */}
            <div className="absolute -bottom-6 -right-6 w-24 h-24 bg-[#0E7C7B]/10 rounded-full blur-2xl -z-10" />
            <div className="absolute -top-6 -left-6 w-32 h-32 bg-[#388AA3]/10 rounded-full blur-2xl -z-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
};
