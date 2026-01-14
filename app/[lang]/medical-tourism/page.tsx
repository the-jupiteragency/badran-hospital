import { HeroSec } from "@/components/medical-tourism/hero-sec";
import { WeOfferSec } from "@/components/medical-tourism/we-offer-sec";
import { HealthStepSec } from "@/components/medical-tourism/health-step-sec";
import { ServicesSec } from "@/components/medical-tourism/services-sec";
import { CareSec } from "@/components/medical-tourism/care-sec";
import { CtaSec } from "@/components/medical-tourism/cta-sec";
import { getDictionary, hasLocale } from "@/app/dictionaries";
import { notFound } from "next/navigation";

export default async function MedicalTourismPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main>
      <HeroSec dict={dict.medicalTourism.hero} lang={lang} />
      <WeOfferSec dict={dict.medicalTourism.weOffer} lang={lang} />
      <HealthStepSec dict={dict.medicalTourism.steps} lang={lang} />
      <ServicesSec dict={dict.medicalTourism.services} lang={lang} />
      <CareSec dict={dict.medicalTourism.care} lang={lang} />
      <CtaSec dict={dict.medicalTourism.cta} lang={lang} />
    </main>
  );
}
