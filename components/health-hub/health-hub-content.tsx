"use client";

import { useState, useMemo, useCallback, useRef, useEffect } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { Post, PostCard } from "@/components/health-hub/post-card";
import { SearchBar } from "@/components/health-hub/search-bar";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface Pagination {
  page: number;
  pageSize: number;
  pageCount: number;
  total: number;
}

interface HealthHubContentProps {
  initialPosts: Post[];
  specialties: string[];
  locale: string;
  dict: any;
  pagination: Pagination;
  currentPage: number;
}

export function HealthHubContent({
  initialPosts,
  specialties,
  locale,
  dict,
  pagination,
  currentPage,
}: HealthHubContentProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  const [searchQuery, setSearchQuery] = useState(
    searchParams.get("search") || "",
  );
  const [specialtyFilter, setSpecialtyFilter] = useState(
    searchParams.get("category") || "all",
  );

  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  // Sync state with URL if URL changes externally
  useEffect(() => {
    const search = searchParams.get("search") || "";
    const category = searchParams.get("category") || "all";
    if (search !== searchQuery && document.activeElement?.tagName !== "INPUT") {
      setSearchQuery(search);
    }
    if (category !== specialtyFilter) {
      setSpecialtyFilter(category);
    }
  }, [searchParams]);

  const updateUrl = useCallback(
    (search: string, category: string, page?: number) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        const params = new URLSearchParams(searchParams.toString());

        if (search) params.set("search", search);
        else params.delete("search");

        if (category && category !== "all" && category !== "")
          params.set("category", category);
        else params.delete("category");

        if (page && page > 1) params.set("page", String(page));
        else params.delete("page");

        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
      }, 500);
    },
    [searchParams, pathname, router],
  );

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchQuery(value);
    updateUrl(value, specialtyFilter, 1);
  };

  const handleSpecialtyChange = (value: string) => {
    setSpecialtyFilter(value);
    updateUrl(searchQuery, value, 1);
  };

  const handleReset = () => {
    setSearchQuery("");
    setSpecialtyFilter("all");
    updateUrl("", "all", 1);
  };

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    if (page > 1) params.set("page", String(page));
    else params.delete("page");
    router.push(`${pathname}?${params.toString()}`, { scroll: true });
  };

  // Client-side filter on the current page's posts
  const filteredPosts = useMemo(() => {
    if (!searchQuery && (!specialtyFilter || specialtyFilter === "all")) {
      return initialPosts;
    }
    return initialPosts.filter((post) => {
      const matchesSearch = searchQuery
        ? searchQuery
            .toLowerCase()
            .split(" ")
            .every((word) => {
              if (post.title.toLowerCase().includes(word)) return true;
              const hasText = (blocks: any[]): boolean => {
                return blocks.some((block) => {
                  if (block.type === "text" && block.text) {
                    return block.text.toLowerCase().includes(word);
                  }
                  if (block.children) {
                    return hasText(block.children);
                  }
                  return false;
                });
              };
              return post.body && hasText(post.body);
            })
        : true;

      const matchesSpecialty =
        specialtyFilter && specialtyFilter !== "all"
          ? post.specialties?.toLowerCase() === specialtyFilter.toLowerCase()
          : true;

      return matchesSearch && matchesSpecialty;
    });
  }, [initialPosts, searchQuery, specialtyFilter]);

  const isFiltering =
    searchQuery || (specialtyFilter && specialtyFilter !== "all");

  return (
    <div className="space-y-5 md:space-y-8">
      {/* Search Section */}
      <div className="max-w-7xl mx-auto">
        <SearchBar
          searchQuery={searchQuery}
          onSearchChange={handleSearchChange}
          specialtyFilter={specialtyFilter}
          onSpecialtyChange={handleSpecialtyChange}
          specialties={specialties}
          locale={locale}
          dict={{
            searchPlaceholder: dict.healthHub.searchPlaceholder,
            filterSpecialty: dict.healthHub.filterSpecialty,
          }}
          resetFilters={handleReset}
        />
      </div>

      {/* Results count */}
      {!isFiltering && (
        <p className="text-sm text-[#6B8D96]">
          {locale === "ar"
            ? `عرض ${filteredPosts.length} من ${pagination.total} مقال`
            : `Showing ${filteredPosts.length} of ${pagination.total} articles`}
        </p>
      )}

      {/* Results Grid */}
      {filteredPosts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-3 md:gap-6">
          {filteredPosts.map((post) => (
            <PostCard
              key={post.id}
              post={post}
              dict={{
                readMore: dict.healthHub.readMore,
                publishedOn: dict.healthHub.publishedOn,
              }}
              locale={locale}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-muted/20 rounded-lg border-2 border-dashed">
          <p className="text-lg text-muted-foreground">
            {locale === "ar"
              ? "لا توجد مقالات تطابق بحثك."
              : "No posts found matching your criteria."}
          </p>
        </div>
      )}

      {/* Pagination — only show when not filtering */}
      {!isFiltering && pagination.pageCount > 1 && (
        <div className="flex items-center justify-center gap-2 pt-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage <= 1}
            className="w-10 h-10 rounded-full bg-[#E5F5F4] text-[#0FA5A1] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0FA5A1] hover:text-white transition-colors"
            aria-label="Previous page"
          >
            {locale === "ar" ? (
              <ChevronRight className="w-5 h-5" />
            ) : (
              <ChevronLeft className="w-5 h-5" />
            )}
          </button>

          {/* Page numbers */}
          {Array.from({ length: pagination.pageCount }, (_, i) => i + 1).map(
            (page) => {
              const isActive = page === currentPage;
              const isNear =
                Math.abs(page - currentPage) <= 2 ||
                page === 1 ||
                page === pagination.pageCount;

              if (!isNear) {
                if (page === currentPage - 3 || page === currentPage + 3) {
                  return (
                    <span key={page} className="text-[#6B8D96] px-1">
                      …
                    </span>
                  );
                }
                return null;
              }

              return (
                <button
                  key={page}
                  onClick={() => handlePageChange(page)}
                  className={`w-10 h-10 rounded-full text-sm font-medium transition-colors ${
                    isActive
                      ? "bg-[#0FA5A1] text-white"
                      : "bg-[#E5F5F4] text-[#12323A] hover:bg-[#0FA5A1] hover:text-white"
                  }`}
                  aria-label={`Page ${page}`}
                  aria-current={isActive ? "page" : undefined}
                >
                  {page}
                </button>
              );
            },
          )}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage >= pagination.pageCount}
            className="w-10 h-10 rounded-full bg-[#E5F5F4] text-[#0FA5A1] flex items-center justify-center disabled:opacity-40 disabled:cursor-not-allowed hover:bg-[#0FA5A1] hover:text-white transition-colors"
            aria-label="Next page"
          >
            {locale === "ar" ? (
              <ChevronLeft className="w-5 h-5" />
            ) : (
              <ChevronRight className="w-5 h-5" />
            )}
          </button>
        </div>
      )}
    </div>
  );
}
