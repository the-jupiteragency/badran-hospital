import { Input } from "@/components/ui/input";
import Image from "next/image";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, RefreshCw } from "lucide-react";
import { Button } from "@/components/ui/button";

interface SearchBarProps {
  searchQuery: string;
  onSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  specialtyFilter: string;
  onSpecialtyChange: (value: string) => void;
  specialties: string[];
  locale?: string;
  dict: {
    searchPlaceholder: string;
    filterSpecialty: string;
  };
  resetFilters: () => void;
}

export function SearchBar({
  searchQuery,
  onSearchChange,
  specialtyFilter,
  onSpecialtyChange,
  specialties,
  locale,
  dict,
  resetFilters,
}: SearchBarProps) {
  const isRTL = locale === "ar";
  return (
    <div className="flex flex-col md:flex-row items-stretch md:items-center bg-white rounded-2xl md:rounded-full shadow-sm border border-[#E5E7EB] overflow-hidden mb-8 md:mb-10 w-full">
      {/* Search Input */}
      <div className="relative flex-1 flex items-center px-4 py-1 md:py-0">
        <Search className="h-5 w-5 text-[#9CA3AF] mr-3 shrink-0" />
        <Input
          placeholder={dict.searchPlaceholder}
          value={searchQuery}
          onChange={onSearchChange}
          className="w-full border-none shadow-none focus-visible:ring-0 text-sm md:text-base placeholder:text-[#9CA3AF] h-11 md:h-16 px-0"
        />
      </div>

      {/* Divider — horizontal on mobile, vertical on desktop */}
      <div className="h-px w-full md:h-8 md:w-px bg-[#E5E7EB] mx-0 md:mx-2" />

      {/* Specialty Filter + Reset Button — side by side on mobile */}
      <div className="flex flex-row justify-between border-t md:border-t-0 border-[#E5E7EB] md:contents">
        {/* Specialty Filter */}
        <div className="flex items-center gap-2 px-3 py-1 md:py-0 min-w-0 md:min-w-[100px]">
          <Image
            src="/icons/icon-1.svg"
            alt="Filter"
            width={18}
            height={18}
            className={isRTL ? "order-last ml-2 shrink-0" : "mr-1 shrink-0"}
          />
          <Select value={specialtyFilter} onValueChange={onSpecialtyChange}>
            <SelectTrigger className="flex-1 border-none shadow-none focus:ring-0 text-sm md:text-base font-medium h-11 px-0 gap-2 bg-transparent">
              <SelectValue placeholder={dict.filterSpecialty} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Specialties</SelectItem>
              {specialties.map((spec) => (
                <SelectItem key={spec} value={spec}>
                  {spec}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        {/* Reset Button */}
        <div className="flex items-center px-3 py-2 md:py-0">
          <Button
            variant="ghost"
            size="icon"
            onClick={resetFilters}
            className="rounded-full h-10 w-10 text-muted-foreground hover:text-[#0066A2] hover:bg-transparent"
            title="Reset Filters"
          >
            <RefreshCw className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </div>
  );
}
