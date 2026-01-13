import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export default function Loading() {
  return (
    <div
      className={`${poppins.variable} font-sans antialiased min-h-screen flex flex-col items-center justify-center bg-linear-to-b from-[#EDF6FF] to-[#DEEFFF] p-4 text-center`}
    >
      {/* Container for Loader Elements */}
      <div className="flex flex-col items-center gap-6">
        {/* Spinner */}
        <div className="relative w-20 h-20 md:w-24 md:h-24">
          <div className="absolute inset-0 border-4 border-[#cbd5e1] border-opacity-30 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#274760] border-t-transparent rounded-full animate-spin"></div>
        </div>

        {/* Text Content */}
        <div className="space-y-2">
          <h1 className="text-2xl md:text-3xl font-bold text-[#274760] tracking-tight">
            Loading...
          </h1>
          <p className="text-[#64748b] text-sm md:text-base font-medium">
            Please wait while we prepare your content
          </p>
        </div>

        {/* Bouncing Dots */}
        <div className="flex gap-2 mt-2">
          <div className="active-dot h-2.5 w-2.5 bg-[#4195A3] rounded-full animate-bounce [animation-delay:-0.3s]"></div>
          <div className="active-dot h-2.5 w-2.5 bg-[#4195A3] rounded-full animate-bounce [animation-delay:-0.15s]"></div>
          <div className="active-dot h-2.5 w-2.5 bg-[#4195A3] rounded-full animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
