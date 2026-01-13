import { getDictionary, hasLocale } from "@/app/dictionaries";
import { notFound } from "next/navigation";

export default async function PrivacyPolicyPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const { privacyPolicy } = dict;

  return (
    <main className="min-h-screen bg-linear-to-b from-[#EDF6FF] to-[#DEEFFF] pt-32 pb-20 px-4 md:px-8">
      {/* Header Section */}
      <div className="max-w-4xl mx-auto text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-[#0E7C7B] mb-4 tracking-tight">
          {privacyPolicy.title}
        </h1>
        <div className="h-1.5 w-24 bg-[#4195A3] mx-auto rounded-full mb-6"></div>
        <p className="text-[#274760] text-lg max-w-2xl mx-auto leading-relaxed">
          {privacyPolicy.sections.intro}
        </p>
      </div>

      {/* Content Card */}
      <div className="max-w-4xl mx-auto bg-white/80 backdrop-blur-xs rounded-3xl shadow-xl p-8 md:p-12 border border-white/50">
        <div className="space-y-12">
          {/* Information Collection */}
          <section className="group">
            <h2 className="text-2xl font-bold text-[#0E7C7B] mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0E7C7B] text-sm font-bold">
                1
              </span>
              {privacyPolicy.sections.infoCollect.title}
            </h2>
            <div className="pl-11 border-l-2 border-[#E0F2FE] ml-4 group-hover:border-[#4195A3]/30 transition-colors duration-300">
              <p className="text-[#475569] leading-relaxed whitespace-pre-line ">
                {privacyPolicy.sections.infoCollect.content}
              </p>
            </div>
          </section>

          {/* How We Use Information */}
          <section className="group">
            <h2 className="text-2xl font-bold text-[#0E7C7B] mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0E7C7B] text-sm font-bold">
                2
              </span>
              {privacyPolicy.sections.howWeUse.title}
            </h2>
            <div className="pl-11 border-l-2 border-[#E0F2FE] ml-4 group-hover:border-[#4195A3]/30 transition-colors duration-300">
              <p className="text-[#475569] leading-relaxed whitespace-pre-line">
                {privacyPolicy.sections.howWeUse.content}
              </p>
            </div>
          </section>

          {/* Information Sharing */}
          <section className="group">
            <h2 className="text-2xl font-bold text-[#0E7C7B] mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0E7C7B] text-sm font-bold">
                3
              </span>
              {privacyPolicy.sections.infoSharing.title}
            </h2>
            <div className="pl-11 border-l-2 border-[#E0F2FE] ml-4 group-hover:border-[#4195A3]/30 transition-colors duration-300">
              <p className="text-[#475569] leading-relaxed whitespace-pre-line">
                {privacyPolicy.sections.infoSharing.content}
              </p>
            </div>
          </section>

          {/* Data Security */}
          <section className="group">
            <h2 className="text-2xl font-bold text-[#0E7C7B] mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0E7C7B] text-sm font-bold">
                4
              </span>
              {privacyPolicy.sections.dataSecurity.title}
            </h2>
            <div className="pl-11 border-l-2 border-[#E0F2FE] ml-4 group-hover:border-[#4195A3]/30 transition-colors duration-300">
              <p className="text-[#475569] leading-relaxed whitespace-pre-line">
                {privacyPolicy.sections.dataSecurity.content}
              </p>
            </div>
          </section>

          {/* Your Rights */}
          <section className="group">
            <h2 className="text-2xl font-bold text-[#0E7C7B] mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0E7C7B] text-sm font-bold">
                5
              </span>
              {privacyPolicy.sections.yourRights.title}
            </h2>
            <div className="pl-11 border-l-2 border-[#E0F2FE] ml-4 group-hover:border-[#4195A3]/30 transition-colors duration-300">
              <p className="text-[#475569] leading-relaxed whitespace-pre-line">
                {privacyPolicy.sections.yourRights.content}
              </p>
            </div>
          </section>

          {/* Changes to Policy */}
          <section className="group">
            <h2 className="text-2xl font-bold text-[#0E7C7B] mb-4 flex items-center gap-3">
              <span className="flex items-center justify-center w-8 h-8 rounded-full bg-[#E0F2FE] text-[#0E7C7B] text-sm font-bold">
                6
              </span>
              {privacyPolicy.sections.changes.title}
            </h2>
            <div className="pl-11 border-l-2 border-[#E0F2FE] ml-4 group-hover:border-[#4195A3]/30 transition-colors duration-300">
              <p className="text-[#475569] leading-relaxed whitespace-pre-line">
                {privacyPolicy.sections.changes.content}
              </p>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}
