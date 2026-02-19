import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "@/components/ui/card";
import { fetchStrapi, getStrapiMediaUrl } from "@/lib/strapi";

type HealthHubDict = {
  subtitle: string;
  title: string;
  viewAll: string;
  learnMore: string;
};

interface StrapiPost {
  id: number;
  documentId: string;
  title: string;
  specialties: string | null;
  kind?: string | null;
  slug: string | null;
  publishedAt: string;
  banner: {
    url: string;
    formats?: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  } | null;
}

// Fallback placeholder posts when Strapi is unavailable
const PLACEHOLDER_POSTS: StrapiPost[] = [
  {
    id: 1,
    documentId: "placeholder-1",
    title: "Early Signs of Breast Cancer Every Woman Should Know",
    specialties: "oncology",
    kind: "HEALTH TIPS",
    slug: "early-signs-of-breast-cancer",
    publishedAt: "2026-02-16T20:13:36.344Z",
    banner: null,
  },
  {
    id: 2,
    documentId: "placeholder-2",
    title: "What Is a Silent Heart Attack?",
    specialties: "cardiology",
    kind: "ARTICLE",
    slug: "silent-heart-attack-symptoms",
    publishedAt: "2026-02-16T20:22:20.672Z",
    banner: null,
  },
  {
    id: 3,
    documentId: "placeholder-3",
    title: "The Importance of Dermatology in Modern Healthcare",
    specialties: "dermatology",
    kind: "HEALTH TIPS",
    slug: "the-importance-of-dermatology-in-modern-healthcare",
    publishedAt: "2026-02-16T19:43:19.801Z",
    banner: null,
  },
  {
    id: 4,
    documentId: "placeholder-4",
    title: "Understanding Orthopedic Care",
    specialties: "orthopedics",
    kind: "ARTICLE",
    slug: "understanding-orthopedic-care",
    publishedAt: "2026-02-16T19:43:19.801Z",
    banner: null,
  },
  {
    id: 5,
    documentId: "placeholder-5",
    title: "How to Manage Diabetes Through Diet and Exercise",
    specialties: "endocrinology",
    kind: "HEALTH TIPS",
    slug: "manage-diabetes-diet-exercise",
    publishedAt: "2026-02-15T10:00:00.000Z",
    banner: null,
  },
  {
    id: 6,
    documentId: "placeholder-6",
    title: "Children's Eye Health: What Parents Should Know",
    specialties: "ophthalmology",
    kind: "ARTICLE",
    slug: "childrens-eye-health",
    publishedAt: "2026-02-14T10:00:00.000Z",
    banner: null,
  },
  {
    id: 7,
    documentId: "placeholder-7",
    title: "The Role of Physiotherapy in Recovery",
    specialties: "physiotherapy",
    kind: "HEALTH TIPS",
    slug: "role-of-physiotherapy-in-recovery",
    publishedAt: "2026-02-13T10:00:00.000Z",
    banner: null,
  },
  {
    id: 8,
    documentId: "placeholder-8",
    title: "Mental Health Awareness: Breaking the Stigma",
    specialties: "psychiatry",
    kind: "ARTICLE",
    slug: "mental-health-awareness",
    publishedAt: "2026-02-12T10:00:00.000Z",
    banner: null,
  },
];

function formatDate(dateStr: string, locale: string): string {
  try {
    return new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
      day: "2-digit",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  } catch {
    return dateStr;
  }
}

export async function HealthHub({
  dict,
  lang,
}: {
  dict: HealthHubDict;
  lang: string;
}) {
  // Fetch latest 6 posts from Strapi (server component)
  const strapiData = await fetchStrapi("health-hubs", {
    populate: "banner",
    locale: lang,
    sort: "publishedAt:desc",
    "pagination[pageSize]": "8",
  });

  const posts: StrapiPost[] =
    strapiData?.data && strapiData.data.length > 0
      ? strapiData.data
      : PLACEHOLDER_POSTS;

  return (
    <section className="py-12 md:py-20 bg-linear-to-b from-[#86BBF1]/50 to-[#D2EAEF]/50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex flex-col mb-8 md:mb-10 relative">
          <div className="text-center md:text-start">
            <h2 className="text-[#12323A] text-4xl md:text-3xl lg:text-4xl">
              {dict.title}
            </h2>
          </div>

          <Link
            href={`/${lang}/health-hub`}
            className={`hidden md:flex absolute bottom-0 items-center gap-1 text-[#12323A] font-medium hover:text-[#0FA5A1] transition-colors ${
              lang === "ar" ? "left-0" : "right-0"
            }`}
          >
            {dict.viewAll}
            {lang === "ar" ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </Link>
        </div>

        {/* Scrollable Cards */}
        <div className="relative">
          <div
            className="flex gap-4 overflow-x-auto pb-4 snap-x snap-mandatory md:gap-6 md:pb-6"
            style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          >
            {posts.map((post) => {
              const imageUrl =
                getStrapiMediaUrl(
                  post.banner?.formats?.medium?.url || post.banner?.url || null,
                ) || "/health-hub/post-1.webp";

              const date = formatDate(post.publishedAt, lang);
              const href = `/${lang}/health-hub/${post.slug || post.documentId}`;

              return (
                <Card
                  key={post.id}
                  className="shrink-0 w-[85vw] sm:w-[340px] snap-center p-0 gap-0 overflow-hidden shadow-sm hover:shadow-md transition-shadow group flex flex-col h-full border-none"
                >
                  {/* Image */}
                  <div className="relative h-[200px] md:h-[220px] overflow-hidden bg-gray-100">
                    <Image
                      src={imageUrl || "/health-hub/post-1.webp"}
                      alt={post.title}
                      fill
                      sizes="(max-width: 640px) 85vw, 340px"
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                      priority={false}
                    />
                    {/* Category Badge */}
                    {post.specialties && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-semibold text-[#388AA3] capitalize">
                        {post.specialties}
                      </div>
                    )}
                    {/* Kind Badge */}
                    {post.kind && (
                      <div className="absolute top-4 right-4 bg-[#0FA5A1]/90 backdrop-blur-sm px-3 py-1 rounded-full text-[10px] font-bold tracking-widest text-white uppercase">
                        {post.kind.toUpperCase()}
                      </div>
                    )}
                  </div>

                  {/* Content */}
                  <div className="p-4 md:p-5 flex flex-col grow">
                    {/* Date */}
                    <span className="text-[#6B8D96] text-xs md:text-sm mb-3 block">
                      {date}
                    </span>

                    {/* Title */}
                    <h3 className="text-[#12323A] font-semibold text-lg leading-tight mb-3 line-clamp-2 hover:text-[#0FA5A1] transition-colors">
                      <Link href={href}>{post.title}</Link>
                    </h3>

                    {/* Learn More */}
                    <div className="mt-auto pt-2">
                      <Link
                        href={href}
                        className="text-[#12323A] text-sm font-medium underline hover:text-[#0FA5A1] transition-colors inline-flex items-center gap-1"
                      >
                        {dict.learnMore}
                      </Link>
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
