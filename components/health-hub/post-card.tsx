import Link from "next/link";
import Image from "next/image";
import { getStrapiMediaUrl } from "@/lib/strapi";

export interface Post {
  id: number;
  documentId: string;
  title: string;
  body: any[];
  createdAt: string;
  publishedAt: string;
  locale: string;
  specialties: string | null;
  slug: string | null;
  kind?: string | null;
  banner: {
    url: string;
    alternativeText: string | null;
    formats: {
      small?: { url: string };
      medium?: { url: string };
      thumbnail?: { url: string };
    };
  } | null;
  localizations?: {
    id: number;
    documentId: string;
    locale: string;
    slug: string | null;
  }[];
}

interface PostCardProps {
  post: Post;
  dict: {
    readMore: string;
    publishedOn: string;
  };
  locale: string;
}

export function PostCard({ post, dict, locale }: PostCardProps) {
  // Prefer medium format for performance, fall back to original URL
  const rawUrl =
    post.banner?.formats?.medium?.url ||
    post.banner?.formats?.small?.url ||
    post.banner?.url ||
    null;
  const imageUrl = getStrapiMediaUrl(rawUrl);

  // Date format: 08.08.2021
  const dateObj = post.publishedAt ? new Date(post.publishedAt) : null;
  const date = dateObj
    ? new Intl.DateTimeFormat(locale === "ar" ? "ar-EG" : "en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
        .format(dateObj)
        .replace(/\//g, ".")
    : "";

  // Extract a short excerpt from the body if possible (first non-empty paragraph)
  const paragraphBlock = post.body?.find(
    (block: any) =>
      block.type === "paragraph" && block.children?.[0]?.text?.trim(),
  );
  const excerptText = paragraphBlock?.children?.[0]?.text || "";
  const excerpt =
    excerptText.length > 120
      ? excerptText.substring(0, 120) + "…"
      : excerptText;

  return (
    <Link
      href={`/${locale}/health-hub/${post.slug || post.documentId}`}
      className="group block h-full"
    >
      <div className="h-full bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col group/card">
        {/* Image Container */}
        <div className="relative w-full aspect-4/3 bg-gray-100 overflow-hidden">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={post.banner?.alternativeText || post.title}
              fill
              className="object-cover transition-transform duration-700 group-hover/card:scale-105"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-muted-foreground bg-gray-50">
              <span className="text-gray-300">No Image</span>
            </div>
          )}

          {/* Kind Badge - Top Right */}
          {post.kind && (
            <div className="absolute top-4 right-4 z-10">
              <span className="bg-[#E0F7FA] text-[#006064] text-[10px] font-bold tracking-wider px-3 py-1 rounded-sm uppercase">
                {post.kind}
              </span>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-3 md:p-6 flex flex-col grow">
          <time className="text-[10px] md:text-xs text-[#6B7280] mb-2 md:mb-3 block font-medium">
            {date}
          </time>

          <h3 className="text-sm md:text-xl font-bold leading-snug md:leading-tight mb-2 md:mb-3 text-[#111827] group-hover/card:text-[#0FA5A1] transition-colors line-clamp-2">
            {post.title}
          </h3>

          <p className="hidden md:block text-sm text-[#4B5563] line-clamp-3 leading-relaxed mb-4">
            {excerpt}
          </p>
        </div>
      </div>
    </Link>
  );
}
