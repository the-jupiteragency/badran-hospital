"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { cn } from "@/lib/utils";

interface ServicesSecProps {
  dict: {
    subtitle: string;
    title: string;
    items: {
      surgical: ServiceItem & { features: string[] };
      diagnostic: ServiceItem & { features: string[] };
      wellness: ServiceItem;
      chronicCare: ServiceItem;
      emergency: ServiceItem;
    };
  };
  lang: string;
}

interface ServiceItem {
  title: string;
  description: string;
}

export const ServicesSec = ({ dict, lang }: ServicesSecProps) => {
  const isAr = lang === "ar";

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
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  const services = [
    {
      id: "surgical",
      icon: "/medical-tourism/icon-5.svg",
      ...dict.items.surgical,
      isLarge: true,
    },
    {
      id: "diagnostic",
      icon: "/medical-tourism/icon-6.svg", // Assuming 6 based on 5-9 range
      ...dict.items.diagnostic,
      isLarge: true,
    },
    {
      id: "wellness",
      icon: "/medical-tourism/icon-7.svg",
      ...dict.items.wellness,
      isLarge: false,
    },
    {
      id: "chronicCare",
      icon: "/medical-tourism/icon-8.svg",
      ...dict.items.chronicCare,
      isLarge: false,
    },
    {
      id: "emergency",
      icon: "/medical-tourism/icon-9.svg",
      ...dict.items.emergency,
      isLarge: false,
    },
  ];

  return (
    <section className="py-16 md:py-24 bg-[#E2F0F7]/30 overflow-hidden">
      <div className="container px-4 md:px-6 mx-auto">
        <div className="text-center mb-12 space-y-4">
          <span className="text-[#388AA3] font-medium tracking-wide uppercase text-sm md:text-base">
            {dict.subtitle}
          </span>
          <h2 className="text-3xl md:text-5xl font-medium text-[#274760] max-w-2xl mx-auto">
            {dict.title}
          </h2>
        </div>

        <motion.div
          className="grid grid-cols-1 lg:grid-cols-6 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {services.map((service, index) => (
            <motion.div
              key={service.id}
              variants={itemVariants}
              className={cn(
                "bg-linear-to-br from-[#E6F3F9] to-[#D5EBF0]/50 p-8 rounded-sm hover:shadow-lg transition-all duration-300",
                service.isLarge ? "lg:col-span-3" : "lg:col-span-2"
              )}
            >
              {/* Icon */}
              <div className="mb-6 relative w-12 h-12">
                <Image
                  src={service.icon}
                  alt={service.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Title & Description */}
              <h3 className="text-xl md:text-2xl font-bold text-[#274760] mb-3">
                {service.title}
              </h3>
              <p className="text-[#274760] text-sm leading-relaxed mb-6">
                {service.description}
              </p>

              {/* Features List for Large Cards */}
              {service.isLarge && (service as any).features && (
                <ul className="space-y-3">
                  {(service as any).features.map(
                    (feature: string, i: number) => (
                      <li key={i} className="flex items-center gap-3">
                        <div className="shrink-0 relative flex items-center justify-center">
                          <Image
                            src="/medical-tourism/check.svg"
                            alt="check"
                            width={10}
                            height={10}
                            className="w-5 h-5"
                          />
                        </div>
                        <span className="text-sm text-[#274760] font-medium">
                          {feature}
                        </span>
                      </li>
                    )
                  )}
                </ul>
              )}
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};
