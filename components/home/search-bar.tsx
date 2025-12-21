"use client"

import { Search, ChevronDown, ArrowRight } from "lucide-react"

export function SearchBar() {
  return (
    <div className="w-full§ bg-linear-to-b from-[#0499AB] to-[#06646F] rounded-2xl p-4 md:p-5 shadow-xl opacity-85">
      {/* Search Input */}
      <div className="bg-white rounded-full flex items-center px-4 py-3 mb-6 md:mb-9 md:flex-1">
        <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
        <input
          type="text"
          placeholder="Search for doctors, Specializations..."
          className="flex-1 bg-transparent text-[#12323A] placeholder:text-gray-400 text-sm md:text-base outline-none"
        />
      </div>

      {/* Filters and Button - Stack on mobile, inline on desktop */}
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mt-4 md:mt-0 md:ml-4">
        {/* Filters Row */}
        <div className="flex items-center gap-4 md:gap-6">
          {/* Speciality Filter */}
          <div className="flex items-center gap-2 cursor-pointer group">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <img src="/icons/icon-1.svg" alt="Speciality" className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/70 text-xs">Speciality</span>
              <div className="flex items-center gap-1">
                <span className="text-white font-semibold text-sm">Cardiology</span>
                <ChevronDown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>

          {/* Doctor Filter */}
          <div className="flex items-center gap-2 cursor-pointer group ">
            <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
              <img src="/icons/icon-2.svg" alt="Doctor" className="w-5 h-5" />
            </div>
            <div className="flex flex-col">
              <span className="text-white/70 text-xs">Doctor</span>
              <div className="flex items-center gap-1">
                <span className="text-white font-semibold text-sm">Dr. Ahmed Hassan</span>
                <ChevronDown className="w-4 h-4 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Book Now Button */}
        <button className="md:ml-auto w-full md:w-auto bg-white text-[#0FA5A1] font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:-translate-y-0.5 hover:shadow-lg">
          Book Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  )
}
