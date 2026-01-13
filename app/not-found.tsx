import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Poppins } from "next/font/google"; // Import font to match layout
import "../app/globals.css"; // Ensure globals are applied if not implicitly

// Initialize font
const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function NotFound() {
  return (
    <html lang="en">
      <body className={`${poppins.variable} font-sans antialiased`}>
        <div className="min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#EDF6FF] to-[#DEEFFF] p-4 text-center">
          {/* Main Content Container */}
          <div className="max-w-3xl mx-auto flex flex-col items-center">
            {/* 404 Heading */}
            <h1 className="text-[8rem] md:text-[10rem] font-bold text-[#94a3b8] opacity-50 leading-none select-none">
              404
            </h1>

            {/* Sub-caption */}
            <div className="flex items-center gap-2 mb-6">
              <span className="w-1.5 h-1.5 rounded-full bg-[#64748b]"></span>
              <span className="text-sm md:text-base font-semibold text-[#274760] uppercase tracking-wide">
                Page Not Found
              </span>
            </div>

            {/* Main Title */}
            <h2 className="text-3xl md:text-5xl font-bold text-[#274760] mb-6 tracking-tight">
              Oops! We Can't Find <br className="hidden md:block" />
              That Page
            </h2>

            {/* Description */}
            <p className="text-[#274760] text-base md:text-lg max-w-xl mb-10 leading-relaxed">
              The page you're looking for might have been moved, deleted, or
              never existed. But don't worry-we're here to help you find your
              way.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 w-full md:w-auto mb-12 items-center">
              <Button
                asChild
                className="bg-[#4195A3] hover:bg-[#0B6261] text-white rounded-full w-[200px] py-9 text-lg shadow-lg hover:shadow-xl transition-all "
              >
                <Link href="/">
                  <ArrowLeft className="mr-2 h-5 w-5" />
                  Back to Home
                </Link>
              </Button>

              <Button
                asChild
                variant="outline"
                className="bg-[#E0F2FE] border-2 border-[#4195A3] text-[#0499AB] hover:bg-[#BAE6FD] rounded-full w-[200px] py-9 text-lg shadow-sm"
              >
                <Link href="/contact">Contact Support</Link>
              </Button>
            </div>

            {/* Popular Pages Section */}
            <div className="flex flex-col items-center gap-4">
              <p className="text-[#4094A2]/80 font-medium">
                Or explore these popular pages:
              </p>

              <div className="flex flex-col md:flex-row gap-3">
                {[
                  { label: "About Us", href: "/about" },
                  { label: "Medical Tourism", href: "/medical-tourism" },
                  { label: "Our Services", href: "/center-of-excellence" }, // Assuming path based on general structure
                  { label: "Contact Us", href: "/contact" },
                ].map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className="bg-[#3394A2] text-white hover:bg-[#257a79] px-6 py-3.5 rounded-full text-sm font-medium transition-colors shadow-md text-center min-w-[140px]"
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
