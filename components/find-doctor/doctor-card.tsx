import React from "react";
import Image from "next/image";
import Link from "next/link";
import { getStrapiMediaUrl } from "@/lib/strapi";

export interface Doctor {
  id: number;
  documentId: string;
  fullName: string;
  bio: string;
  specialties: string;
  image?: {
    url: string;
    formats?: {
      thumbnail?: { url: string };
      small?: { url: string };
    };
  };
}

interface DoctorCardProps {
  doctor: Doctor;
  locale: string;
}

export default function DoctorCard({ doctor, locale }: DoctorCardProps) {
  const isAr = locale === "ar";
  const rawUrl =
    doctor.image?.formats?.thumbnail?.url ||
    doctor.image?.formats?.small?.url ||
    doctor.image?.url ||
    null;
  const imageUrl = getStrapiMediaUrl(rawUrl) || "/img-placeholder.jpg";
  return (
    <div className="bg-white rounded-[20px] shadow-sm hover:shadow-md transition-shadow duration-300 p-6 flex flex-col items-center text-center h-full border border-gray-100">
      <div className="relative w-32 h-32 mb-4">
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-gray-100 relative">
          <Image
            src={imageUrl}
            alt={doctor.fullName}
            fill
            sizes="128px"
            className="object-cover"
          />
        </div>
      </div>

      <h3 className="text-[#0E3A64] text-xl font-bold mb-2">
        {doctor.fullName}
      </h3>

      <p className="text-[#0E3A64]/80 text-sm mb-4 line-clamp-3 grow">
        {doctor.bio}
      </p>

      {doctor.specialties && (
        <div className="bg-[#008CCF] text-white text-xs font-semibold px-6 py-2 rounded-full mb-6 uppercase tracking-wider">
          {doctor.specialties}
        </div>
      )}

      <Link
        href={`https://wa.me/201029640837?text=${encodeURIComponent(`I would like to book an appointment with ${doctor.fullName}, ${doctor.specialties}`)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="w-full mt-auto"
      >
        <button className="w-full border border-[#D1D5DB] text-[#9CA3AF] hover:text-[#008CCF] hover:border-[#008CCF] rounded-full py-2.5 transition-colors duration-300 flex items-center justify-center gap-2 group">
          <span className="font-medium">
            {locale === "ar" ? "احجز الآن" : "Book Now"}
          </span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className={`group-hover:translate-x-1 transition-transform ${
              isAr ? "rotate-180" : ""
            }`}
          >
            <path d="M5 12h14" />
            <path d="m12 5 7 7-7 7" />
          </svg>
        </button>
      </Link>
    </div>
  );
}
