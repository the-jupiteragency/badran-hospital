"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useQueryState } from "nuqs";
import { ChevronDown, Search } from "lucide-react";

interface SearchBarProps {
  locale: string;
}

export default function SearchBar({ locale }: SearchBarProps) {
  // nuqs hooks for URL state management
  const [query, setQuery] = useQueryState("query", {
    defaultValue: "",
    shallow: false, // Update URL and trigger server-side props/page re-render if needed (or client side effect)
    throttleMs: 500, // Debounce the URL update
  });

  const [selectedSpecialty, setSelectedSpecialty] = useQueryState("specialty", {
    defaultValue: "all",
    shallow: false,
  });

  const [specialties, setSpecialties] = useState<string[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    // Fetch unique specialties for the dropdown
    async function fetchSpecialties() {
      try {
        const res = await fetch(
          `/api/find-a-doctor?mode=specialties&locale=${locale}`,
        );
        if (!res.ok) {
          console.error("Failed to load specialties:", res.statusText);
          return;
        }
        const json = await res.json();
        // New API returns { specialties: string[] } directly
        if (Array.isArray(json.specialties)) {
          setSpecialties(json.specialties);
        }
      } catch (err) {
        console.error("Failed to load specialties", err);
      }
    }
    fetchSpecialties();
  }, [locale]);

  // Local state for immediate input feedback (optional, but nuqs handles it well)
  // We'll use the return from useQueryState directly.

  const isAr = locale === "ar";
  const placeholder = isAr
    ? "ابحث عن أطباء، تخصصات..."
    : "Search for doctors, Specializations...";
  const allSpecialtiesText = isAr ? "كل التخصصات" : "All Specialities";
  const searchButtonText = isAr ? "بحث" : "Search";

  return (
    <div className="w-full max-w-6xl mx-auto">
      {/* Desktop View */}
      <div className="hidden md:flex bg-white rounded-full shadow-sm border border-gray-100 p-2 items-center">
        {/* Search Input */}
        <div className="flex-1 flex items-center px-4 h-12">
          <Search
            className={`h-5 w-5 text-gray-400 ${isAr ? "ml-3" : "mr-3"}`}
          />
          <input
            type="text"
            placeholder={placeholder}
            className={`w-full text-gray-600 placeholder-gray-400 outline-none text-base ${
              isAr ? "text-right" : "text-left"
            }`}
            value={query || ""}
            onChange={(e) => setQuery(e.target.value || null)}
          />
        </div>

        {/* Divider */}
        <div className="w-px h-8 bg-gray-200 mx-2"></div>

        {/* Specialties Dropdown */}
        <div className="relative w-44 px-4 h-12 flex items-center z-20">
          <button
            className="flex items-center justify-between w-full text-gray-700 text-sm font-medium focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/icons/icon-1.svg"
                alt="Filter"
                width={20}
                height={20}
              />
              <span className="truncate">
                {selectedSpecialty === "all"
                  ? allSpecialtiesText
                  : selectedSpecialty}
              </span>
            </div>
            <ChevronDown className="opacity-50 h-4 w-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full right-0 mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-100 py-2 max-h-60 overflow-y-auto z-50">
              <button
                className={`w-full px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 ${
                  isAr ? "text-right" : "text-left"
                }`}
                onClick={() => {
                  setSelectedSpecialty(null);
                  setIsDropdownOpen(false);
                }}
              >
                {allSpecialtiesText}
              </button>
              {specialties.map((spec, i) => (
                <button
                  key={i}
                  className={`w-full px-4 py-2 hover:bg-gray-50 text-sm text-gray-700 ${
                    isAr ? "text-right" : "text-left"
                  }`}
                  onClick={() => {
                    setSelectedSpecialty(spec);
                    setIsDropdownOpen(false);
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <div className="w-32 p-1">
          <button className="w-full bg-[#2B95B8] hover:bg-[#237d9b] text-white rounded-full h-10 text-sm font-medium transition-colors flex items-center justify-center gap-2">
            {searchButtonText}
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={isAr ? "rotate-180" : ""}
            >
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile View */}
      <div className="md:hidden space-y-3">
        {/* Search Input */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-4">
          <div className="flex items-center">
            <Search
              className={`h-5 w-5 text-gray-400 ${isAr ? "ml-3" : "mr-3"}`}
            />
            <input
              type="text"
              placeholder={placeholder}
              className={`w-full text-gray-600 placeholder-gray-400 outline-none text-sm ${
                isAr ? "text-right" : "text-left"
              }`}
              value={query || ""}
              onChange={(e) => setQuery(e.target.value || null)}
            />
          </div>
        </div>

        {/* Specialties Dropdown */}
        <div className="relative bg-white rounded-2xl shadow-sm border border-gray-100 p-4 z-20">
          <button
            className="flex items-center justify-between w-full text-gray-700 text-sm font-medium focus:outline-none"
            onClick={() => setIsDropdownOpen(!isDropdownOpen)}
          >
            <div className="flex items-center gap-2">
              <Image
                src="/icons/icon-1.svg"
                alt="Filter"
                width={20}
                height={20}
              />
              <span className="truncate">
                {selectedSpecialty === "all"
                  ? allSpecialtiesText
                  : selectedSpecialty}
              </span>
            </div>
            <ChevronDown className="opacity-50 h-4 w-4" />
          </button>

          {isDropdownOpen && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-lg border border-gray-100 py-2 max-h-60 overflow-y-auto z-50">
              <button
                className={`w-full px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 ${
                  isAr ? "text-right" : "text-left"
                }`}
                onClick={() => {
                  setSelectedSpecialty(null);
                  setIsDropdownOpen(false);
                }}
              >
                {allSpecialtiesText}
              </button>
              {specialties.map((spec, i) => (
                <button
                  key={i}
                  className={`w-full px-4 py-3 hover:bg-gray-50 text-sm text-gray-700 ${
                    isAr ? "text-right" : "text-left"
                  }`}
                  onClick={() => {
                    setSelectedSpecialty(spec);
                    setIsDropdownOpen(false);
                  }}
                >
                  {spec}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Search Button */}
        <button className="w-full bg-[#2B95B8] hover:bg-[#237d9b] text-white rounded-2xl h-12 text-sm font-medium transition-colors flex items-center justify-center gap-2 shadow-sm">
          {searchButtonText}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={isAr ? "rotate-180" : ""}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
}
