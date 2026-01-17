import { HeroSec } from "@/components/coe/hero-sec";
import { SpecialtiesSec } from "@/components/coe/specialties-sec";
import { getDictionary, hasLocale } from "@/app/dictionaries";
import { notFound } from "next/navigation";

export default async function CenterOfExcellencePage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <main>
      <HeroSec dict={dict.coePage.hero} lang={lang} />
      <SpecialtiesSec dict={dict.home} lang={lang} />
    </main>
  );
}
