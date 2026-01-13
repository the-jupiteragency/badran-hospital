type CtaDict = {
  title: string;
  subtitle: string;
  buttonText: string;
};

export function CtaSec({ dict }: { dict: CtaDict }) {
  return (
    <section className="w-full py-10 lg:py-20 bg-linear-to-br from-[#0066A2] to-[#79B3E6] md:bg-none md:bg-[#DCECF9]">
      <div className="max-w-7xl mx-auto px-4 md:px-6">
        <div className="w-full rounded-xl lg:rounded-md overflow-hidden relative md:bg-linear-to-br md:from-[#0066A2] md:to-[#79B3E6] px-6 py-12 lg:px-20 lg:py-24 text-center">
          <h2 className=" text-white font-medium text-2xl lg:text-6xl mb-6 text-nowrap">
            {dict.title}
          </h2>

          {/* Mobile/Desktop Subtitle */}
          <p className="text-white text-lg lg:text-xl leading-tight max-w-md mx-auto mb-8 lg:mb-10 font-medium ">
            {dict.subtitle}
          </p>

          <button className="bg-white text-[#0066A2] font-bold text-base lg:text-lg px-8 py-3 lg:px-10 lg:py-4 rounded-full hover:bg-gray-50 transition-colors shadow-sm">
            {dict.buttonText}
          </button>
        </div>
      </div>
    </section>
  );
}
