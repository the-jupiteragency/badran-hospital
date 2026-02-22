import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { faqData } from "@/lib/faq-data";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ | Badran Hospital",
  description:
    "Frequently Asked Questions about Badran Hospital services, appointments, and facilities.",
};

export default async function FAQPage({
  params,
}: {
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;
  const isAr = lang === "ar";

  return (
    <div className="min-h-screen bg-[#F0F8FF] py-20 md:py-32 px-4 md:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-[#12323A]">
            {isAr ? "الأسئلة الشائعة" : "Frequently Asked Questions"}
          </h1>
          <p className="text-lg text-[#388AA3]">
            {isAr
              ? "إليك إجابات على أكثر الأسئلة شيوعاً حول خدماتنا ومرافقنا"
              : "Here are answers to the most common questions about our services and facilities"}
          </p>
        </div>

        {/* Accordion */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 md:p-10">
          <Accordion type="single" collapsible className="w-full space-y-4">
            {faqData.map((item) => (
              <AccordionItem
                key={item.id}
                value={item.id}
                className="border rounded-xl px-4 data-[state=open]:bg-gray-50/50 data-[state=open]:border-[#0FA5A1]/20 transition-all duration-200"
              >
                <AccordionTrigger className="text-[#12323A] hover:text-[#0FA5A1] text-lg font-medium py-4">
                  {isAr ? item.question.ar : item.question.en}
                </AccordionTrigger>
                <AccordionContent className="text-gray-600 leading-relaxed text-base pb-4 whitespace-pre-line">
                  {isAr ? item.answer.ar : item.answer.en}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Contact Info */}
        <div className="text-center pt-8 border-t border-gray-200/50">
          <h2 className="text-xl font-semibold text-[#12323A] mb-4">
            {isAr
              ? "لم تجد إجابة لسؤالك؟"
              : "Didn't find what you were looking for?"}
          </h2>
          <div className="flex flex-col md:flex-row justify-center items-center gap-4 text-[#388AA3]">
            <div className="flex items-center gap-2">
              <span className="font-bold">Hotline:</span> 19986
            </div>
            <div className="hidden md:block w-1.5 h-1.5 rounded-full bg-gray-300" />
            <div className="flex items-center gap-2">
              <span className="font-bold">WhatsApp:</span> 01029640837
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
