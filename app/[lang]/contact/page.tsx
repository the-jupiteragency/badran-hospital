import { ContactForm } from "@/components/contact/contact-form";
import { getDictionary, Locale } from "@/app/dictionaries";
import MapWrapper from "@/components/contact/map-wrapper";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ lang: Locale }>;
}) {
  const { lang } = await params;
  const dict = await getDictionary(lang);

  const t = dict.contactPage;
  const tInfo = dict.contactPage.info;
  const tFooter = dict.footer.contact;

  return (
    <div className="min-h-screen bg-[#DCEEFA] pt-28 pb-16">
      <div className="container mx-auto px-4 max-w-6xl">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-24 items-start">
          {/* Left Column: Form Section */}
          <div>
            <h1 className="text-4xl md:text-5xl font-bold text-[#063458] mb-4">
              {t.title}
            </h1>
            <p className="text-[#388AA3] text-lg mb-8 max-w-md leading-relaxed">
              {t.subtitle}
            </p>
            <ContactForm dict={t.form} />
          </div>

          {/* Right Column: Map & Info */}
          <div className="space-y-8 mt-4 lg:mt-0">
            <div>
              <h2 className="text-2xl font-bold text-[#063458] mb-4">
                {tInfo.hospitalAddress}
              </h2>
              <MapWrapper />
            </div>

            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-bold text-[#063458]">
                  {tInfo.phone}
                </h3>
                <div className="flex flex-row gap-1 mt-1">
                  <a
                    href="tel:19986"
                    className="text-[#0FA5A1] text-lg font-medium hover:underline"
                  >
                    19986
                  </a>
                  <span className="text-[#0FA5A1] text-lg font-medium">/</span>
                  <a
                    href="tel:+20102964083"
                    className="text-[#0FA5A1] text-lg font-medium hover:underline"
                  >
                    +2 0102 964 0837
                  </a>
                </div>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#063458]">
                  {tInfo.email}
                </h3>
                <a
                  href={`mailto:${tFooter.email}`}
                  className="text-[#0FA5A1] mt-1 text-lg font-medium hover:underline block"
                >
                  {tFooter.email}
                </a>
              </div>

              <div>
                <h3 className="text-xl font-bold text-[#063458]">
                  {tInfo.location}
                </h3>
                <a
                  href="https://maps.app.goo.gl/wJN2wjtGVphsQcPh9"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#0FA5A1] mt-1 text-lg font-medium hover:underline block max-w-sm"
                >
                  {tFooter.address}
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
