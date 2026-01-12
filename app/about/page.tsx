import { HeroSec } from "@/components/about/hero-sec";
import { OurJourney } from "@/components/about/our-journey";
import { MissionVisionSec } from "@/components/about/mission-vision-sec";
import { OurCoreSec } from "@/components/about/our-core-sec";
import { CtaSec } from "@/components/about/cta-sec";

export default function AboutPage() {
  return (
    <main>
      <HeroSec />
      <OurJourney />
      <MissionVisionSec />
      <OurCoreSec />
      <CtaSec />
    </main>
  );
}
