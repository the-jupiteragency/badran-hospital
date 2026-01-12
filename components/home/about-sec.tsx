import { Button } from "@/components/ui/button";

export function AboutSection() {
  return (
    <section
      id="about"
      className="py-12 md:py-24 bg-linear-to-b from-[#86BBF1]/50 to-[#D2EAEF]/50"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16 max-w-7xl mx-auto">
          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-2xl md:rounded-3xl overflow-hidden shadow-sm">
              <img
                src="/dr.badran.webp"
                alt="Dr. Badran"
                className="w-full h-auto object-cover md:min-h-[400px]"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-1/2 flex flex-col items-start gap-6 md:gap-8">
            <div className="relative">
              <p className="text-[#1A3C46] text-lg md:text-2xl lg:text-[26px] leading-relaxed font-medium">
                <span className="inline-block mr-2 align-top translate-y-1">
                  <img
                    src="/icons/open-quotes.png"
                    alt="open quote"
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                </span>
                From the very first day I founded Badran Hospital more than 45
                years ago, my vision was simple: to provide medical care that is
                professional, humane, and worthy of people's trust.
                <span className="text-[#0066A2]  ml-2 inline-flex items-center gap-2">
                  - Dr. Badran
                  <img
                    src="/icons/close-quotes.svg"
                    alt="close quote"
                    className="w-6 h-6 md:w-8 md:h-8"
                  />
                </span>
              </p>
            </div>

            <Button className="w-full md:w-auto bg-[#0499AB] text-white px-10 py-6 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg transition-transform ">
              About Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
