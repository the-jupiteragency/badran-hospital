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

export const metadata: Metadata = {
  title: "Badran Hospital - Where Expertise Meets Advanced Care",
  description:
    "Badran Hospital provides professional, humane medical care with over 45 years of trusted service. Find top specialists in Cardiology, Oncology, Orthopedics, and more.",
};

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
