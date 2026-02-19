import { Button } from "@/components/ui/button";
import Link from "next/link";

export function AboutSection({
  dict,
  lang,
}: {
  dict: { quote: string; buttonText: string };
  lang: string;
}) {
  return (
    <section
      id="about"
      className="py-12 md:py-24 bg-linear-to-b from-[#86BBF1]/50 to-[#D2EAEF]/50"
    >
      <div className="container mx-auto px-4 md:px-8">
        <div
          className={
            "flex flex-col items-center gap-8 md:gap-16 max-w-7xl mx-auto md:flex-row"
          }
        >
          {/* Image Side */}
          <div className="w-full md:w-1/2">
            <div className="relative rounded-md overflow-hidden">
              <img
                src="/dr.badran.webp"
                alt="Dr. Badran"
                className="w-full h-auto object-contain md:min-h-[500px]"
              />
            </div>
          </div>

          {/* Text Side */}
          <div className="w-full md:w-[58%] flex flex-col items-center md:items-start gap-6 md:gap-8">
            <div className="relative">
              <p
                className={`text-[#063458] text-lg md:text-2xl lg:text-3xl leading-normal tracking-wide font-mono text-balance ${
                  lang === "ar" ? "md:text-right" : "md:text-left"
                }`}
              >
                {lang === "ar"
                  ? dict.quote
                  : `Professor Dr. Ibrahim Badran (1924–2015) was a pioneering Egyptian surgeon and academic. He served as Egypt’s Minister of Health (1976–1978) and President of Cairo University (1978–1980). Renowned as the “father of surgery in Egypt,” he authored seven books and over 120 scientific papers.`}
              </p>
            </div>

            <Button
              asChild
              className="w-full md:w-auto text-white px-10 py-6 rounded-full text-sm font-bold uppercase tracking-wide shadow-lg transition-all hover:-translate-y-0.5"
              style={{
                background: "linear-gradient(to right, #008DC3, #004268)",
              }}
            >
              <Link href={`/${lang}/about`}>{dict.buttonText}</Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
