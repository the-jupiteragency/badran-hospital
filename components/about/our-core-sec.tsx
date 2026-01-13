import Image from "next/image";

type CoreValuesDict = {
  subtitle: string;
  title: string;
  values: {
    patientFirst: { title: string; description: string };
    integrity: { title: string; description: string };
    excellence: { title: string; description: string };
    compassion: { title: string; description: string };
    teamwork: { title: string; description: string };
    innovation: { title: string; description: string };
  };
};

const getValues = (dict: CoreValuesDict) => [
  {
    icon: "/icons/value-1.svg",
    title: dict.values.patientFirst.title,
    description: dict.values.patientFirst.description,
  },
  {
    icon: "/icons/value-2.svg",
    title: dict.values.integrity.title,
    description: dict.values.integrity.description,
  },
  {
    icon: "/icons/value-3.svg",
    title: dict.values.excellence.title,
    description: dict.values.excellence.description,
  },
  {
    icon: "/icons/value-4.svg",
    title: dict.values.compassion.title,
    description: dict.values.compassion.description,
  },
  {
    icon: "/icons/value-5.svg",
    title: dict.values.teamwork.title,
    description: dict.values.teamwork.description,
  },
  {
    icon: "/icons/value-6.svg",
    title: dict.values.innovation.title,
    description: dict.values.innovation.description,
  },
];

export function OurCoreSec({ dict }: { dict: CoreValuesDict }) {
  const values = getValues(dict);
  return (
    <section className="w-full py-10 lg:py-20 bg-[#DCECF9]">
      <div className="max-w-7xl mx-auto px-2 md:px-4">
        {/* Header */}
        <div className="flex flex-col items-start lg:items-center mb-8 lg:mb-14">
          <span className="text-[#388AA3] font-medium text-lg lg:text-xl mb-2">
            {dict.subtitle}
          </span>
          <h2 className="text-[#274760] font-medium text-3xl lg:text-5xl">
            {dict.title}
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
