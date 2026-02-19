import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";

import { fetchStrapi, getStrapiMediaUrl } from "@/lib/strapi";
import { getDictionary, hasLocale } from "@/app/dictionaries";
import { BlocksRenderer } from "@/components/health-hub/blocks-renderer";
import { Button } from "@/components/ui/button";

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ lang: string; slug: string }>;
}) {
  const { lang, slug } = await params;

  if (!hasLocale(lang)) {
    notFound();
  }

  const dict = await getDictionary(lang);

  // 1. Fetch the Post using the English slug (as canonical identifier)
  // We explicitly fetch locale='en' first to find the "base" post.
  const enData = await fetchStrapi("health-hubs", {
    "filters[slug][$eq]": slug,
    populate: "*",
    locale: "en",
  });

  if (!enData?.data || enData.data.length === 0) {
    // If English post not found, 404.
    notFound();
  }

  const enPost = enData.data[0];
  let post = enPost;

  // 2. If the user requested 'ar', we need to find the Arabic version OF this post.
  if (lang === "ar") {
    // Check if this English post has an Arabic localization
    const arLocalization = enPost.localizations?.find(
      (loc: any) => loc.locale === "ar",
    );

    if (arLocalization) {
      // Great, we found the AR version ID. Now fetch its full content.
      // We use the ID to be precise.
      // Strapi v4/v5 difference: use filters[id] or filters[documentId].
      // Let's rely on filters[documentId] if present in localization object, else id.

      const filterKey = arLocalization.documentId
        ? "filters[documentId][$eq]"
        : "filters[id][$eq]";
      const filterVal = arLocalization.documentId || arLocalization.id;

      const arData = await fetchStrapi("health-hubs", {
        [filterKey]: filterVal,
        populate: "*",
        locale: "ar",
      });

      if (arData?.data && arData.data.length > 0) {
        post = arData.data[0];
      } else {
        // Fallback: localization exists but fetch failed? Rare.
        // Maybe API token permissions issue for localized content?
        // Should we show EN content? Probaly not, 404 is safer or custom error.
        notFound();
      }
    } else {
      // Requested AR but no AR translation exists for this EN post.
      notFound();
    }
  }

  const imageUrl = getStrapiMediaUrl(
    post.banner?.formats?.large?.url || post.banner?.url || null,
  );

  // Format Date using Intl
  const date = post.publishedAt
    ? new Intl.DateTimeFormat(lang, {
        year: "numeric",
        month: "long",
        day: "numeric",
      }).format(new Date(post.publishedAt))
    : "";

  return (
    <div className="min-h-screen bg-linear-to-b from-[#86BBF1]/30 to-[#D2EAEF]/30 pt-28 pb-16 px-4">
      <div className="container mx-auto max-w-4xl">
        {/* Back Link - Outside the card */}
        <div className="mb-6">
          <Button
            variant="ghost"
            asChild
            className=" text-[#12323A]/70 hover:text-[#0FA5A1] hover:bg-transparent transition-colors"
          >
            <Link href={`/${lang}/health-hub`}>
              <ArrowLeft
                className={`h-4 w-4 ${lang === "ar" ? "ml-1 rotate-180" : "mr-1"}`}
              />
              {dict.nav?.healthHub || "Back to Health Hub"}
            </Link>
          </Button>
        </div>

        {/* White Post Card */}
        <article className="bg-white rounded-md shadow-sm p-6 md:p-12 animate-in fade-in duration-500 border border-gray-100/50">
          {/* Header */}
          <header className="mb-10 space-y-4">
            {post.specialties && (
              <span className="inline-flex items-center rounded-full bg-[#0FA5A1]/10 px-3 py-1 text-xs font-bold tracking-wider text-[#0FA5A1] uppercase">
                {post.specialties}
              </span>
            )}

            <h1 className="scroll-m-20 text-3xl font-bold tracking-tight lg:text-5xl leading-[1.2] text-[#12323A]">
              {post.title}
            </h1>

            <div className="flex items-center text-sm text-[#6B8D96] font-medium">
              {dict.healthHub?.publishedOn}{" "}
              <time dateTime={post.publishedAt} className="ml-1">
                {date}
              </time>
            </div>
          </header>

          {/* Featured Image */}
          {imageUrl && (
            <div className="relative aspect-video w-full overflow-hidden rounded-2xl mb-12 bg-gray-100">
              <Image
                src={imageUrl}
                alt={post.banner?.alternativeText || post.title}
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 90vw, 1200px"
              />
            </div>
          )}

          {/* Content */}
          <BlocksRenderer blocks={post.body} />
        </article>
      </div>
    </div>
  );
}
