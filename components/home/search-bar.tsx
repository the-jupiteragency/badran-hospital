"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ArrowRight } from "lucide-react";

const MOCK_SPECIALTIES = [
  "Cardiology",
  "Neurology",
  "Orthopedics",
  "Pediatrics",
  "Dermatology",
  "General Surgery",
];

const MOCK_DOCTORS = [
  "Dr. Ahmed Hassan",
  "Dr. Sarah Johnson",
  "Dr. Mohamed Ali",
  "Dr. Emily Davis",
  "Dr. Karim Said",
];

export function SearchBar() {
  const [specialty, setSpecialty] = useState("Cardiology");
  const [doctor, setDoctor] = useState("Dr. Ahmed Hassan");

  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);

  const specRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (specRef.current && !specRef.current.contains(event.target as Node)) {
        setIsSpecOpen(false);
      }
      if (docRef.current && !docRef.current.contains(event.target as Node)) {
        setIsDocOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="w-full bg-linear-to-b from-[#0499AB] to-[#06646F] rounded-2xl p-4 md:p-5 shadow-xl opacity-85 relative">
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
      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-4 mt-4 md:mt-0 md:ml-4 relative z-20">
        {/* Filters Row */}
        <div className="grid grid-cols-2 md:flex md:items-center gap-2 md:gap-6 w-full md:w-auto">
          {/* Speciality Filter */}
          <div
            className="flex items-center gap-2 cursor-pointer group relative"
            ref={specRef}
            onClick={() => setIsSpecOpen(!isSpecOpen)}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shrink-0">
              <img
                src="/icons/icon-1.svg"
                alt="Speciality"
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white/70 text-xs md:text-md">
                Speciality
              </span>
              <div className="flex items-center gap-1">
                <span className="text-white font-semibold text-sm md:text-lg xl:text-xl whitespace-nowrap text-ellipsis max-w-[90px] md:max-w-[150px] overflow-hidden">
                  {specialty}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform ${
                    isSpecOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            {isSpecOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 overflow-hidden">
                {MOCK_SPECIALTIES.map((item) => (
                  <div
                    key={item}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#12323A] ${
                      specialty === item ? "font-bold bg-gray-50" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSpecialty(item);
                      setIsSpecOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Doctor Filter */}
          <div
            className="flex items-center gap-2 cursor-pointer group relative"
            ref={docRef}
            onClick={() => setIsDocOpen(!isDocOpen)}
          >
            <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center shrink-0">
              <img
                src="/icons/icon-2.svg"
                alt="Doctor"
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white/70 text-xs md:text-md">Doctor</span>
              <div className="flex items-center gap-1">
                <span className="text-white font-semibold text-sm md:text-lg xl:text-xl whitespace-nowrap text-ellipsis max-w-[90px] md:max-w-[150px] overflow-hidden">
                  {doctor}
                </span>
                <ChevronDown
                  className={`w-4 h-4 text-white transition-transform ${
                    isDocOpen ? "rotate-180" : ""
                  }`}
                />
              </div>
            </div>

            {/* Dropdown Menu */}
            {isDocOpen && (
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 overflow-hidden">
                {MOCK_DOCTORS.map((item) => (
                  <div
                    key={item}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#12323A] ${
                      doctor === item ? "font-bold bg-gray-50" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setDoctor(item);
                      setIsDocOpen(false);
                    }}
                  >
                    {item}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Book Now Button */}
        <button className="md:ml-auto w-full md:w-auto bg-white text-[#0FA5A1] font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:-translate-y-0.5 hover:shadow-lg">
          Book Now
          <ArrowRight className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
