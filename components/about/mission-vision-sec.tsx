import Image from "next/image";

type MissionVisionDict = {
  subtitle: string;
  title: string;
  mission: { title: string; description: string };
  vision: { title: string; description: string };
};

export function MissionVisionSec({ dict }: { dict: MissionVisionDict }) {
  return (
    <section className="w-full py-10 lg:py-16 bg-[#DCECF9]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-start lg:items-center mb-7 lg:mb-10">
          <span className="text-[#388AA3] font-medium text-lg lg:text-xl mb-2">
            {dict.subtitle}
          </span>
          <h2 className="text-[#274760] font-medium text-2xl lg:text-5xl">
            {dict.title}
          </h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-8">
          {/* Mission Block */}
          <div className="flex flex-col p-0 lg:p-12 lg:bg-[#CFE4F2] rounded-none lg:rounded-md transition-colors">
            {/* Icon - Desktop Only */}
            <div className="hidden lg:block relative w-10 h-10 mb-3">
              <Image
                src="/icons/mission-icon.svg"
                alt="Mission Icon"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-[#274760] font-medium text-xl lg:text-2xl mb-2">
              {dict.mission.title}
            </h3>
            <p className="text-[#274760]/90 lg:text-[#335575] leading-tight text-balance lg:text-lg">
              {dict.mission.description}
            </p>
          </div>

          {/* Vision Block */}
          <div className="flex flex-col p-0 lg:p-12 lg:bg-[#CFE4F2] rounded-none lg:rounded-lg transition-colors">
            {/* Icon - Desktop Only */}
            <div className="hidden lg:block relative w-10 h-10 mb-3">
              <Image
                src="/icons/vision-icon.svg"
                alt="Vision Icon"
                fill
                className="object-contain"
              />
            </div>

            <h3 className="text-[#274760] font-medium text-xl lg:text-2xl mb-2 ">
              {dict.vision.title}
            </h3>
            <p className="text-[#274760]/90 lg:text-[#335575] leading-tight text-balance lg:text-lg">
              {dict.vision.description}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
