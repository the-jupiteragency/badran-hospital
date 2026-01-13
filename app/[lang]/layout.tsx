import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "../globals.css";
import { Navbar } from "@/components/shared/header-bar";
import { Footer } from "@/components/shared/footer-sec";
import { CollapsibleBtn } from "@/components/shared/collapsible-btn";
import { getDictionary, hasLocale } from "@/app/dictionaries";
import { notFound } from "next/navigation";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export async function generateMetadata({
  params,
}: {
  params: Promise<{ lang: string }>;
}): Promise<Metadata> {
  const { lang } = await params;
  
  return {
    title: lang === "ar" 
      ? "مستشفى بدران - حيث تلتقي الخبرة بالرعاية المتقدمة"
      : "Badran Hospital - Where Expertise Meets Advanced Care",
    description: lang === "ar"
      ? "يقدم مستشفى بدران رعاية طبية احترافية وإنسانية مع أكثر من 45 عامًا من الخدمة الموثوقة. ابحث عن أفضل المتخصصين في أمراض القلب والأورام والعظام والمزيد."
      : "Badran Hospital provides professional, humane medical care with over 45 years of trusted service. Find top specialists in Cardiology, Oncology, Orthopedics, and more.",
  };
}

export async function generateStaticParams() {
  return [{ lang: "en" }, { lang: "ar" }];
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lang: string }>;
}) {
  const { lang } = await params;

  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);

  return (
    <html lang={lang} dir={lang === "ar" ? "rtl" : "ltr"}>
      <body className={`${poppins.variable} antialiased`}>
        <Navbar lang={lang} dict={dict.nav} />
        {children}
        <Footer dict={dict.footer} lang={lang} />
        <CollapsibleBtn lang={lang} />
      </body>
    </html>
  );
}
