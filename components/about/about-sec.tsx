import Image from "next/image";

interface AboutSecProps {
  dict: {
    title: string;
    description: string;
  };
  lang?: string;
}

export function AboutSec({ dict, lang }: AboutSecProps) {
  return (
    <section className="py-16 md:py-24 bg-linear-to-r from-[#eaf4fb] to-[#d9e8f5]">
      <div className="container mx-auto px-2 max-w-7xl">
        <div className="flex flex-col md:flex-row items-center gap-12 lg:gap-20">
          <div className="flex-1 space-y-8">
            <h2 className="text-3xl md:text-[40px] font-semibold text-[#284B63] leading-tight">
              {dict.title}
            </h2>
            <p className="text-[#284B63] text-lg md:text-[20px] leading-[1.8] text-justify">
              {dict.description}
            </p>
          </div>
          <div className="flex-1 w-full max-w-lg lg:max-w-[600px] flex justify-center md:justify-end">
            <div className="relative w-full aspect-4/3 sm:aspect-4/3 md:w-[600px] md:h-[500px] bg-white rounded-xl shadow-[0_4px_20px_rgba(0,0,0,0.05)] overflow-hidden">
              <Image
                src="/dr.badran.webp"
                alt={dict.title}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                quality={90}
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
