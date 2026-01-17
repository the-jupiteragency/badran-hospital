import Image from "next/image";
import { Card } from "@/components/ui/card";

type ServicesDict = {
  subtitle: string;
  title: string;
  description: string;
  items: {
    surgery: { title: string; description: string };
    icu: { title: string; description: string };
    inpatient: { title: string; description: string };
    outpatient: { title: string; description: string };
    laboratory: { title: string; description: string };
    emergency: { title: string; description: string };
    dayCase: { title: string; description: string };
    radiology: { title: string; description: string };
  };
};

export function MedicalServices({ dict }: { dict: ServicesDict }) {
  const services = [
    {
      title: dict.items.surgery.title,
      description: dict.items.surgery.description,
      icon: "/icons/icon-8.svg",
    },
    {
      title: dict.items.icu.title,
      description: dict.items.icu.description,
      icon: "/icons/icon-9.svg",
    },
    {
      title: dict.items.inpatient.title,
      description: dict.items.inpatient.description,
      icon: "/icons/icon-10.svg",
    },
    {
      title: dict.items.outpatient.title,
      description: dict.items.outpatient.description,
      icon: "/icons/icon-11.svg",
    },
    {
      title: dict.items.laboratory.title,
      description: dict.items.laboratory.description,
      icon: "/icons/icon-10.svg",
    },
    {
      title: dict.items.emergency.title,
      description: dict.items.emergency.description,
      icon: "/icons/icon-15.svg",
    },
    {
      title: dict.items.dayCase.title,
      description: dict.items.dayCase.description,
      icon: "/icons/icon-16.svg",
    },
    {
      title: dict.items.radiology.title,
      description: dict.items.radiology.description,
      icon: "/icons/icon-17.svg",
    },
  ];
  return (
    <section className="py-12 md:py-20 bg-linear-to-b from-[#86BBF1]/50 to-[#D2EAEF]/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-sm md:max-w-2xl mx-auto mb-8 md:mb-12">
          <p className="text-[#388AA3] font-medium text-md md:text-base mb-2">
            {dict.subtitle}
          </p>
          <h2 className="text-[#12323A] text-3xl md:text-4xl lg:text-5xl  mb-4 text-balance">
            {dict.title}
          </h2>
          <p className=" text-md md:text-base font-light">{dict.description}</p>
        </div>

        {/* Services Grid / Mobile Carousel */}
        {/* Mobile: Horizontal Scroll Snap | Desktop: Grid 4 columns */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="snap-center shrink-0 w-[65vw] md:w-auto flex flex-col items-center justify-start p-4 gap-0 md:gap-2 shadow-sm hover:shadow-md transition-all duration-300 border-none bg-white rounded-xl h-full"
            >
              {/* Icon */}
              <div className="shrink-0 ">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="flex flex-col gap-1 items-center text-center w-full">
                {/* Title */}
                <h3 className="text-[#12323A] font-bold text-lg md:text-base text-balance min-h-12 flex items-center justify-center whitespace-nowrap text-ellipsis">
                  {service.title}
                </h3>

                {/* Description */}
                <p className=" text-base md:text-sm font-light line-clamp-4 md:line-clamp-none">
                  {service.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
