import { getDictionary, hasLocale } from "@/app/dictionaries";
import { notFound } from "next/navigation";
import { HealthHubContent } from "@/components/health-hub/health-hub-content";
import { fetchStrapi } from "@/lib/strapi";
import { PostSkeleton } from "@/components/health-hub/post-skeleton";

const PAGE_SIZE = 25;

export default async function HealthHubPage({
  params,
  searchParams,
}: {
  params: Promise<{ lang: string }>;
  searchParams?: Promise<{ page?: string }>;
}) {
  const { lang } = await params;
  if (!hasLocale(lang)) notFound();

  const dict = await getDictionary(lang);
  const resolvedSearch = await searchParams;
  const currentPage = Math.max(1, parseInt(resolvedSearch?.page || "1", 10));

  // Fetch posts from Strapi with server-side pagination
  const strapiData = await fetchStrapi("health-hubs", {
    populate: "*",
    locale: lang,
    sort: "publishedAt:desc",
    "pagination[page]": String(currentPage),
    "pagination[pageSize]": String(PAGE_SIZE),
  });

  // Handle fetch failure gracefully
  const fetchFailed = strapiData === null;
  let posts = strapiData?.data || [];
  const pagination = strapiData?.meta?.pagination || {
    page: currentPage,
    pageSize: PAGE_SIZE,
    pageCount: 1,
    total: 0,
  };

  // If language is Arabic, use the English slug for the URL
  if (lang === "ar") {
    posts = posts.map((post: any) => {
      const enLocalization = post.localizations?.find(
        (loc: any) => loc.locale === "en",
      );
      return {
        ...post,
        slug: enLocalization?.slug || post.slug,
      };
    });
  }

  // Extract unique specialties from posts
  const specialtiesData = await fetchStrapi("health-hubs", {
    locale: lang,
    "fields[0]": "specialties",
    "pagination[pageSize]": "200",
  });

  const allPosts = specialtiesData?.data || posts;
  const specialties = Array.from(
    new Set(allPosts.map((post: any) => post.specialties).filter(Boolean)),
  ).sort() as string[];

  return (
    <div className="min-h-screen pt-16 md:pt-20 bg-[#DCEEFA]">
      {/* Hero Header */}
      <div className="pt-10 md:pt-20 lg:px-12 ">
        <div className="mx-auto max-w-6xl px-4 md:px-2 ">
          <h1 className="text-3xl md:text-5xl font-bold mb-3 md:mb-4 text-[#063458]">
            {dict.healthHub.title}
          </h1>
          <p className="text-base md:text-lg text-[#388AA3] max-w-5xl">
            {dict.healthHub.subtitle}
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 md:px-2 lg:px-12 py-6 md:py-12">
        {fetchFailed ? (
          /* Error Placeholder */
          <div className="text-center py-20">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-[#E5F5F4] mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-10 h-10 text-[#0FA5A1]"
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
            <h2 className="text-2xl font-semibold text-[#12323A] mb-3">
              {lang === "ar"
                ? "تعذّر تحميل المقالات"
                : "Could not load articles"}
            </h2>
            <p className="text-[#6B8D96] mb-8 max-w-md mx-auto">
              {lang === "ar"
                ? "حدث خطأ أثناء جلب المقالات. يرجى المحاولة مرة أخرى لاحقاً."
                : "Something went wrong while fetching articles. Please try again later."}
            </p>
            {/* Skeleton placeholders */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-8 opacity-40">
              {[...Array(8)].map((_, i) => (
                <PostSkeleton key={i} />
              ))}
            </div>
          </div>
        ) : (
          <HealthHubContent
            initialPosts={posts}
            specialties={specialties}
            locale={lang}
            dict={dict}
            pagination={pagination}
            currentPage={currentPage}
          />
        )}
      </div>
    </div>
  );
}
