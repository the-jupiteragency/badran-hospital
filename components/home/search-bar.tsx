"use client";

import { useState, useRef, useEffect } from "react";
import { Search, ChevronDown, ArrowRight, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";

type SearchDict = {
  searchPlaceholder: string;
  bookNow: string;
  speciality: string;
  doctor: string;
};

export function SearchBar({ dict, lang }: { dict: SearchDict; lang: string }) {
  const router = useRouter();

  const [specialties, setSpecialties] = useState<string[]>([]);
  const [allDoctors, setAllDoctors] = useState<any[]>([]);
  const [filteredDoctors, setFilteredDoctors] = useState<string[]>([]);

  // Selection states
  // We'll use these specific states for the dropdowns
  const [selectedSpecialty, setSelectedSpecialty] = useState<string | null>(
    null,
  );
  const [selectedDoctor, setSelectedDoctor] = useState<string | null>(null);

  // We also need a query state for the text input potentially, or we just rely on params.
  // The design shows a text input. Let's treat it as a general query.
  const [query, setQuery] = useState("");

  const [isSpecOpen, setIsSpecOpen] = useState(false);
  const [isDocOpen, setIsDocOpen] = useState(false);

  const specRef = useRef<HTMLDivElement>(null);
  const docRef = useRef<HTMLDivElement>(null);

  // Helper text for current selection or default
  const specialtyDisplay =
    selectedSpecialty || (lang === "ar" ? "كل التخصصات" : "All Specialities");
  const doctorDisplay =
    selectedDoctor || (lang === "ar" ? "كل الأطباء" : "All Doctors");

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`/api/find-a-doctor?locale=${lang}`);
        const json = await res.json();

        if (json.data) {
          const docs = json.data;

          // Extract unique specialties
          // Handle both flattened and nested (attributes) structure just in case
          const specs = Array.from(
            new Set(
              docs
                .map(
                  (d: any) => d.specialties || d.attributes?.specialties || "",
                )
                .filter(Boolean),
            ),
          ) as string[];
          setSpecialties(specs);

          setAllDoctors(docs);

          const docNames = Array.from(
            new Set(
              docs
                .map((d: any) => d.fullName || d.attributes?.fullName || "")
                .filter(Boolean),
            ),
          ) as string[];
          setFilteredDoctors(docNames);
        }
      } catch (err) {
        console.error("Failed to fetch search data", err);
      }
    }
    fetchData();
  }, [lang]);

  useEffect(() => {
    if (selectedSpecialty) {
      const filtered = allDoctors
        .filter((d: any) => {
          const spec = d.specialties || d.attributes?.specialties || "";
          return spec === selectedSpecialty;
        })
        .map((d: any) => d.fullName || d.attributes?.fullName || "")
        .filter(Boolean);
      setFilteredDoctors(filtered);
      setSelectedDoctor(null);
    } else {
      const allNames = allDoctors
        .map((d: any) => d.fullName || d.attributes?.fullName || "")
        .filter(Boolean);
      setFilteredDoctors(allNames);
    }
  }, [selectedSpecialty, allDoctors]);

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

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (selectedSpecialty) params.set("specialty", selectedSpecialty);
    // If a doctor is selected from dropdown, we use that.
    // If text is typed, we use that as query?
    // Let's prioritizing the specific doctor selection if made, else query.
    if (selectedDoctor) {
      params.set("query", selectedDoctor);
    } else if (query) {
      params.set("query", query);
    }

    router.push(`/${lang}/find-a-doctor?${params.toString()}`);
  };

  return (
    <div
      className="w-full rounded-2xl p-4 md:p-5 shadow-xl opacity-85 relative"
      style={{ background: "linear-gradient(to right, #008DC3, #004268)" }}
    >
      {/* Search Input */}
      <div className="bg-white rounded-full flex items-center px-4 py-3 mb-6 md:mb-9 md:flex-1">
        <Search className="w-5 h-5 text-gray-400 mr-3 shrink-0" />
        <input
          type="text"
          placeholder={dict.searchPlaceholder}
          className="flex-1 bg-transparent text-[#12323A] placeholder:text-gray-400 text-sm md:text-base outline-none"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />
      </div>

      {/* Filters and Button */}
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
              <Image
                src="/icons/icon-1.svg"
                alt="Speciality"
                width={24}
                height={24}
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white/70 text-xs md:text-md">
                {dict.speciality}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-white font-semibold text-sm md:text-lg xl:text-xl whitespace-nowrap text-ellipsis max-w-22.5 md:max-w-37.5 overflow-hidden">
                  {specialtyDisplay}
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
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 overflow-hidden max-h-60 overflow-y-auto">
                <div
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#12323A] ${!selectedSpecialty ? "font-bold bg-gray-50" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedSpecialty(null);
                    setIsSpecOpen(false);
                  }}
                >
                  {lang === "ar" ? "كل التخصصات" : "All Specialities"}
                </div>
                {specialties.map((item) => (
                  <div
                    key={item}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#12323A] ${
                      selectedSpecialty === item ? "font-bold bg-gray-50" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedSpecialty(item);
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
              <Image
                src="/icons/icon-2.svg"
                alt="Doctor"
                width={24}
                height={24}
                className="w-6 h-6 md:w-7 md:h-7"
              />
            </div>
            <div className="flex flex-col min-w-0">
              <span className="text-white/70 text-xs md:text-md">
                {dict.doctor}
              </span>
              <div className="flex items-center gap-1">
                <span className="text-white font-semibold text-sm md:text-lg xl:text-xl whitespace-nowrap text-ellipsis max-w-22.5 md:max-w-37.5 overflow-hidden">
                  {doctorDisplay}
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
              <div className="absolute top-full left-0 mt-2 w-56 bg-white rounded-xl shadow-lg py-2 z-50 overflow-hidden max-h-60 overflow-y-auto">
                <div
                  className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#12323A] ${!selectedDoctor ? "font-bold bg-gray-50" : ""}`}
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedDoctor(null);
                    setIsDocOpen(false);
                  }}
                >
                  {lang === "ar" ? "كل الأطباء" : "All Doctors"}
                </div>
                {filteredDoctors.map((item) => (
                  <div
                    key={item}
                    className={`px-4 py-2 hover:bg-gray-100 cursor-pointer text-[#12323A] ${
                      selectedDoctor === item ? "font-bold bg-gray-50" : ""
                    }`}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedDoctor(item);
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
        <button
          className={`w-full md:w-auto bg-white text-[#0FA5A1] font-semibold px-6 py-3 rounded-full flex items-center justify-center gap-2 hover:bg-white/90 transition-all hover:-translate-y-0.5 hover:shadow-lg ${
            lang === "ar" ? "md:mr-auto" : "md:ml-auto"
          }`}
          onClick={handleSearch}
        >
          {dict.bookNow}
          {lang === "ar" && <ArrowLeft className="w-5 h-5" />}
          {lang !== "ar" && <ArrowRight className="w-5 h-5" />}
        </button>
      </div>
    </div>
  );
}
