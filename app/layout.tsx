import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/shared/header-bar";
import { Footer } from "@/components/shared/footer-sec";
import { CollapsibleBtn } from "@/components/shared/collapsible-btn";

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.variable} antialiased`}>
        <Navbar />
        {children}
        <Footer />
        <CollapsibleBtn />
      </body>
    </html>
  );
}
