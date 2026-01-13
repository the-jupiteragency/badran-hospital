import { HeroSec } from "@/components/about/hero-sec";
import { OurJourney } from "@/components/about/our-journey";
import { MissionVisionSec } from "@/components/about/mission-vision-sec";
import { OurCoreSec } from "@/components/about/our-core-sec";
import { CtaSec } from "@/components/about/cta-sec";
import { getDictionary, hasLocale } from "@/app/dictionaries";
import { notFound } from "next/navigation";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main>
      <HeroSec dict={dict.about.hero} lang={lang} />
      <OurJourney dict={dict.about.journey} lang={lang} />
      <MissionVisionSec dict={dict.about.missionVision} />
      <OurCoreSec dict={dict.about.coreValues} />
      <CtaSec dict={dict.about.cta} />
    </main>
  );
}
