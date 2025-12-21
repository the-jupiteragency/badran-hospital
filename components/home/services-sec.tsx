import Image from "next/image"
import { Card } from "@/components/ui/card"

const services = [
  {
    title: "Surgery Department",
    description:
      "Our surgical team combines decades of experience with advanced techniques to ensure safe, successful procedures.",
    icon: "/icons/icon-8.svg",
  },
  {
    title: "Intensive Care Unit (ICU)",
    description:
      "Equipped with state-of-the-art monitoring systems, our ICU provides 24/7 critical care for patients who need continuous observation and specialized medical attention.",
    icon: "/icons/icon-9.svg",
  },
  {
    title: "Inpatient Clinics",
    description:
      "Safe, comfortable, and closely monitored recovery. Our inpatient department provides 24/7 medical supervision and a supportive healing environment for patients who require extended care or post-surgery recovery.",
    icon: "/icons/icon-10.svg",
  },
  {
    title: "Outpatient Clinics",
    description:
      "Our clinics bring together leading specialists across multiple fields to provide accurate diagnosis, follow-up, and personalized treatment for every patient.",
    icon: "/icons/icon-11.svg",
  },
  {
    title: "Laboratory Services",
    description:
      "Our fully equipped lab delivers reliable test results with precision and speed, supporting doctors in accurate diagnosis and treatment planning.",
    icon: "/icons/icon-14.svg",
  },
  {
    title: "Emergency Department (ER)",
    description:
      "Our emergency unit operates 24/7 with a dedicated medical team ready to respond quickly to urgent and critical cases.",
    icon: "/icons/icon-15.svg",
  },
  {
    title: "Day Case Unit",
    description:
      "For procedures that require no overnight stay, our Day Case Unit ensures comfort, safety, and a quick recovery that allowing patients to return home the same day.",
    icon: "/icons/icon-16.svg",
  },
  {
    title: "Radiology Department",
    description:
      "Using advanced imaging technologies such as CT, MRI, and digital X-ray, our radiology department supports fast and precise diagnosis for all medical conditions.",
    icon: "/icons/icon-17.svg",
  },
]

export function MedicalServices() {
  return (
    <section className="py-12 md:py-20 bg-linear-to-b from-[#86BBF1]/50 to-[#D2EAEF]/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="text-center max-w-sm md:max-w-2xl mx-auto mb-8 md:mb-12">
          <p className="text-[#388AA3] font-medium text-md md:text-base mb-2">Comprehensive Care for Every Need</p>
          <h2 className="text-[#12323A] text-3xl md:text-4xl lg:text-5xl  mb-4 text-balance">
            Our Medical Services
          </h2>
          <p className=" text-md md:text-base font-light">
            At Badran Hospital, we offer a full range of medical services designed to provide accurate diagnosis,
            effective treatment, and continuous care. From emergency response to advanced surgeries, our departments
            work together to ensure every patient receives the highest standard of medical attention and comfort.
          </p>
        </div>

        {/* Services Grid / Mobile Carousel */}
        {/* Mobile: Horizontal Scroll Snap | Desktop: Grid 4 columns */}
        <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 -mx-4 px-4 md:grid md:grid-cols-4 md:gap-5 md:overflow-visible md:pb-0 md:mx-0 md:px-0 [&::-webkit-scrollbar]:hidden">
          {services.map((service, index) => (
            <Card
              key={service.title}
              className="snap-center shrink-0 w-[65vw] md:w-auto flex flex-col items-center justify-center p-6 gap-4 shadow-sm hover:shadow-md transition-all duration-300 border-none bg-white rounded-xl h-full"
            >
              {/* Icon */}
              <div className="shrink-0 mb-2">
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={64}
                  height={64}
                  className="w-16 h-16 object-contain"
                />
              </div>

              <div className="flex flex-col gap-3 items-center text-center">
                {/* Title */}
                <h3 className="text-[#12323A] font-bold text-lg md:text-base whitespace-nowrap">
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
  )
}
