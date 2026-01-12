import Image from "next/image";

const values = [
  {
    icon: "/icons/value-1.svg",
    title: "Patient First",
    description:
      "We place patient safety, comfort, and well-being at the center of everything we do.",
  },
  {
    icon: "/icons/value-2.svg",
    title: "Medical Integrity",
    description:
      "We practice medicine with honesty, transparency, and the highest ethical standards.",
  },
  {
    icon: "/icons/value-3.svg",
    title: "Clinical Excellence",
    description:
      "We are committed to delivering high-quality care through continuous improvement and adherence to best medical practices.",
  },
  {
    icon: "/icons/value-4.svg",
    title: "Compassionate Care",
    description:
      "We treat every patient with empathy, respect, and genuine human care.",
  },
  {
    icon: "/icons/value-5.svg",
    title: "Teamwork & Collaboration",
    description:
      "We believe that strong collaboration among healthcare professionals leads to better patient outcomes.",
  },
  {
    icon: "/icons/value-6.svg",
    title: "Innovation",
    description:
      "We embrace modern medical technologies and innovative approaches to enhance diagnosis, treatment, and patient experience.",
  },
];

export function OurCoreSec() {
  return (
    <section className="w-full py-10 lg:py-20 bg-[#DCECF9]">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        {/* Header */}
        <div className="flex flex-col items-start lg:items-center mb-8 lg:mb-14">
          <span className="text-[#388AA3] font-medium text-lg lg:text-xl mb-2">
            What We Stand For
          </span>
          <h2 className="text-[#274760] font-medium text-3xl lg:text-5xl">
            Our Core Values
          </h2>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-5">
          {values.map((value, index) => (
            <div
              key={index}
              className="flex flex-col p-4 lg:p-6 md:bg-[#CFE5F5] rounded-md md:hover:bg-[#c4def3] transition-colors"
            >
              {/* Icon */}
              <div className="relative w-10 h-10 lg:w-12 lg:h-12 mb-2">
                <Image
                  src={value.icon}
                  alt={value.title}
                  fill
                  className="object-contain"
                />
              </div>

              {/* Text */}
              <h3 className="text-[#274760] font-extrabold text-xl mb-2">
                {value.title}
              </h3>
              <p className="text-[#274760] font-mono leading-tight text-balance">
                {value.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
