import { Suspense } from "react";
import SearchBar from "@/components/find-doctor/search-bar";
import DoctorCard, { Doctor } from "@/components/find-doctor/doctor-card";
import DoctorCardSkeleton from "@/components/find-doctor/doctor-card-skeleton";
import { fetchStrapi } from "@/lib/strapi";

async function fetchDoctors(
  locale: string,
  searchParams: { query?: string; specialty?: string },
): Promise<{ doctors: Doctor[]; error: boolean }> {
  try {
    const params: Record<string, string> = {
      locale,
      populate: "*",
      "filters[isFeatured][$eq]": "true",
      sort: "fullName:asc",
    };

    if (searchParams.query) {
      const q = searchParams.query;
      params["filters[$or][0][fullName][$containsi]"] = q;
      params["filters[$or][1][bio][$containsi]"] = q;
      params["filters[$or][2][specialties][$containsi]"] = q;
    }

    if (searchParams.specialty && searchParams.specialty !== "all") {
      params["filters[specialties][$containsi]"] = searchParams.specialty;
    }

    const data = await fetchStrapi("doctors", params);

    if (!data) {
      return { doctors: [], error: true };
    }

    return { doctors: data.data || [], error: false };
  } catch {
    return { doctors: [], error: true };
  }
}

async function DoctorsList({
  locale,
  search,
}: {
  locale: string;
  search: { query?: string; specialty?: string };
}) {
  const { doctors, error } = await fetchDoctors(locale, search);

  if (error) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#DCEEfa] mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-[#008CCF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
            />
          </svg>
        </div>
        <h2 className="text-2xl font-semibold text-[#063458] mb-3">
          {locale === "ar"
            ? "تعذّر تحميل قائمة الأطباء"
            : "Could not load doctors"}
        </h2>
        <p className="text-[#063458]/60 mb-8 max-w-md mx-auto">
          {locale === "ar"
            ? "حدث خطأ أثناء جلب بيانات الأطباء. يرجى المحاولة مرة أخرى لاحقاً."
            : "Something went wrong while fetching doctor data. Please try again later."}
        </p>
        {/* Skeleton placeholders */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 opacity-40">
          {[...Array(8)].map((_, i) => (
            <DoctorCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="text-center py-20">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#DCEEfa] mb-6">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-10 h-10 text-[#008CCF]"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 15.803M10.5 7.5v6m3-3h-6"
            />
          </svg>
        </div>
        <p className="text-lg text-[#063458]/70">
          {locale === "ar"
            ? "لا يوجد أطباء يطابقون معايير البحث."
            : "No doctors found matching your criteria."}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {doctors.map((doctor) => (
        <DoctorCard key={doctor.id} doctor={doctor} locale={locale} />
      ))}
    </div>
  );
}

function DoctorsListSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {[...Array(8)].map((_, i) => (
        <DoctorCardSkeleton key={i} />
      ))}
    </div>
  );
}

export default async function FindADoctorPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams: Promise<{ query?: string; specialty?: string }>;
}) {
  const { lang } = await params;
  const search = await searchParams;
  const locale = lang || "en";

  return (
    <div className="min-h-screen bg-[#F0F8FF] pt-16 md:pt-20">
      <div className="bg-[#DCEEfa] pt-16 pb-12 px-4 sm:px-6 lg:px-8 bg-opacity-50">
        <div className="max-w-6xl mx-auto space-y-4">
          <h1 className="text-3xl md:text-5xl font-medium text-[#063458]">
            {locale === "ar" ? "ابحث عن طبيب/تخصص" : "Find a Doctor/Speciality"}
          </h1>
          <p className="text-[#063458] text-md ">
            {locale === "ar"
              ? "ابحث عبر شبكتنا من المتخصصين في الرعاية الصحية ذوي الخبرة."
              : "Search from our network of experienced healthcare professionals."}
          </p>
          <div className="pt-8 w-full flex justify-center">
            <Suspense fallback={null}>
              <SearchBar locale={locale} />
            </Suspense>
          </div>
        </div>
      </div>
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <Suspense fallback={<DoctorsListSkeleton />}>
          <DoctorsList locale={locale} search={search} />
        </Suspense>
      </main>
    </div>
  );
}
