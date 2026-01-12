import Image from "next/image";

export function MissionVisionSec() {
  return (
    <section className="w-full py-10 lg:py-16 bg-[#DCECF9]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col items-start lg:items-center mb-7 lg:mb-10">
          <span className="text-[#388AA3] font-medium text-lg lg:text-xl mb-2">
            Our Journey
          </span>
          <h2 className="text-[#274760] font-medium text-2xl lg:text-5xl">
            Mission & Vision
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
              Our Mission
            </h3>
            <p className="text-[#274760]/90 lg:text-[#335575] leading-tight text-balance lg:text-lg">
              To provide safe, high-quality, patient-centered healthcare
              delivered with compassion, professionalism, and integrity. We
              ensure every patient receives accurate diagnosis, effective
              treatment, and continuous support throughout their healing
              journey.
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
              Our Vision
            </h3>
            <p className="text-[#274760]/90 lg:text-[#335575] leading-tight text-balance lg:text-lg">
              To be the most trusted and accessible hospital in Dokki and
              Greater Cairo-recognized for medical excellence, modern healthcare
              solutions, and a commitment to improving the lives of our patients
              and community.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
